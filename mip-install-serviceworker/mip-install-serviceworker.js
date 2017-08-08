/**
 * @file mip-install-serviceworker 组件
 * @author
 */

define(function (require) {

    var mipUtil = require('util');
    var viewer = require('viewer');

    var util = require('./util');
    // shortcut
    var parseUrl = util.parseUrl;

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 如果 Service Worker 不支持，那就没必要继续往下了
        if (!window.navigator.serviceWorker) {
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
    };

    /**
     * 插入 iframe
     *
     * @param {string} src iframe 链接
     */
    customElement.prototype.registerIframe = function (src) {
        // 如果当前页面不在可视区，不插入 iframe
        if (!this.isInView) {
            return;
        }

        var div = document.createElement('div');
        div.innerHTML = ''
            + '<mip-iframe '
                + 'src="' + src + '" '
                + 'sandbox="allow-same-origin allow-scripts"'
                + 'width="0" '
                + 'height="0">'
            + '</mip-iframe>';
        this.element.appendChild(div.children[0]);
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

    return customElement;
});
