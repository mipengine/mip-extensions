/**
 * @file mip-install-serviceworker 组件
 * @author
 */

define(function (require) {

    var mipUtil = require('util');
    var viewer = require('viewer');
    var UrlRewriter = require('./urlRewriter');
    var util = require('./util');
    // shortcut
    var parseUrl = util.parseUrl;

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {

        // 如果 Service Worker 不支持，可以通过浏览器缓存来实现 shell 效果
        if (!window.navigator.serviceWorker) {
            this.maybeInstallUrlRewrite();
            return;
        }

        var element = this.element;

        if (viewer.isIframed) {
            // 在 mip 环境中，通过嵌入 iframe 的方式给目标页面提前注册 sw

            var iframeSrc = element.getAttribute('data-iframe-src');

            // 如果没有设置 data-iframe-src 或者 iframeSrc 并非安全地址，则不注册
            if (!iframeSrc || !util.isSecureUrl(iframeSrc)) {
                return;
            }

            // 如果 iframe 的 origin 和 mip 原页面 origin 不一样，则不注册
            if (parseUrl(mipUtil.parseCacheUrl(window.location.href)).origin !== parseUrl(iframeSrc).origin) {
                return;
            }

            var me = this;
            // 如果用户在当前页面时间超过 15s，才插入 iframe，安装 ServiceWorker
            this._iframeTimer = setTimeout(function () {
                // 注册 iframe
                me.registerIframe(iframeSrc);
            }, 15000);
        }
        else {
            // 不在 mip 环境中，直接注册 sw

            var src = element.getAttribute('src');

            // 如果 sw 的 origin 和当前页面的 origin 不相等，则不注册
            if (parseUrl(window.location.href).origin !== parseUrl(src).origin) {
                return;
            }

            if (window.document && window.document.readyState === 'complete') {
                registerServiceWorker(src);
            }
            else {
                window.addEventListener('load', function () {
                    registerServiceWorker(src);
                });
            }
        }

    };

    /**
     * 进入或离开可视区回调，每次状态变化都会执行
     *
     * @param {boolean} isInView 是否离开可视区，true 进入可视区, false 离开可视区
     */
    customElement.prototype.viewportCallback = function (isInView) {
        this.isInView = isInView;
    };

    /**
     * 从文档中移除节点的时候，对定时器做清除
     */
    customElement.prototype.detachedCallback = function () {
        clearTimeout(this._iframeTimer);
        clearTimeout(this._preloadTimer);
    };

    /**
     * 插入 iframe
     *
     * @param {string} src iframe 链接
     * @param {string} type iframe 的类型
     */
    customElement.prototype.registerIframe = function (src, type) {
        // 如果当前页面不在可视区，不插入 iframe
        if (!this.isInView) {
            return;
        }

        var iframe = document.createElement('iframe');

        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
        iframe.src = src + (type ? ('#' + type) : '');

        // TODO@zoumiaojiang: 由于 mip-iframe 组件暂时没支持 onload 机制，先使用原声的 iframe, 后续再改过来

        // var div = document.createElement('div');
        // div.innerHTML = ''
        //     + '<mip-iframe '
        //         + 'src="' + src + (type ? ('#' + type) : '') + '" '
        //         + 'sandbox="allow-same-origin allow-scripts"'
        //         + 'width="0" '
        //         + 'height="0">'
        //     + '</mip-iframe>';

        // var iframe = div.children[0];

        iframe.style.display = 'none';

        // 一旦 iframe 加载完成就将 iframe 的 dom 删除掉
        iframe.onload = function () {
            iframe.parentElement.removeChild(iframe);
        };

        this.element.appendChild(iframe);
    };

    /**
     * 注册 Service Worker
     *
     * @param {string} src Service Worker 的地址
     */
    function registerServiceWorker(src) {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register(src).catch(function (err) {
                /* eslint-disable no-console */
                console.error(err);
                /* eslint-enable no-console */
            });
        }
    }

    /**
     * 如果当前环境不支持 service worker 的话，可以安装 url rewrite
     */
    customElement.prototype.maybeInstallUrlRewrite = function () {
        var me = this;
        var element = me.element;

        // 读取 url-rewrite 的配置
        var urlMatch = element.getAttribute('data-no-service-worker-fallback-url-match');
        var shellUrl = element.getAttribute('data-no-service-worker-fallback-shell-url');

        if (!urlMatch && !shellUrl) {
            return;
        }

        shellUrl = util.removeFragment(shellUrl);

        if (shellUrl && util.isSecureUrl(shellUrl)) {
            var urlMatchExpr;

            try {
                urlMatchExpr = new RegExp(urlMatch);
            }
            catch (e) {
                throw new Error('Invalid "data-no-service-worker-fallback-url-match" expression', e);
            }

            // 安装 URL rewriter.
            new UrlRewriter(viewer, urlMatchExpr, shellUrl);
            me._preloadTimer = setTimeout(function () {
                me.registerIframe(shellUrl, 'preload');
            });
        }
    };

    return customElement;
});
