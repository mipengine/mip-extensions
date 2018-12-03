/**
 * @file mip-qf-loadingscorll 组件
 * @author 9-lives
 */

define(function (require) {
    var mustache = require('templates');
    var util = require('util');
    var utils = require('./utils');

    var customElement = require('customElement').create();
    var component; // 组件元素
    var params; // jsonp 参数
    var properties; // HTML 属性
    var itemNum = 0; // 当前数据序号

    var scroll = {};

    var btn; // 加载按钮
    var ul; // 挂载对象

    // 按钮相关
    var btnLoading = {
        // 增加点击事件监听
        addHandler: function () {
            btn.addEventListener('click', btnLoading.handler, false);
        },
        // 点击事件监听
        handler: function () {
            // 增加滚动监听
            scroll.addHandler();
            // 移除按钮点击事件监听
            btn.removeEventListener('click', btnLoading.handler);
            scroll.trigger();
        },
        // 移除点击事件监听
        rmHandler: function () {
            btn.removeEventListener('click', btnLoading.handler, false);
        }
    };

    // 加载相关
    var loading = {
        // 加载失败回调
        failure: function () {
            if (btn) {
                btn.innerText = properties.failedTxt;
                // 移除滚动监听
                scroll.rmHandler();
                // 增加按钮点击事件监听
                btnLoading.addHandler();
            }

            loading.finally();
        },
        // 最终加载回调，无论成功或失败均会执行
        finally: function () {
            loading.isLoading = false;
        },
        // 加载状态
        isLoading: false,
        // 加载
        load: function () {
            loading.isLoading = true;
            if (btn) {
                btn.innerText = properties.loadingTxt;
            }

            utils.getDataByJsonp({
                failure: loading.failure,
                success: loading.success,
                timeout: properties.timeout,
                url: utils.setUrlParams(properties.url, params)
            });
        },
        // 加载成功回调
        success: function (data) {
            params.pageIndex++;

            if (!data || (data instanceof Array && data.length === 0)) {
                // 无数据返回，加载完毕
                return window.removeEventListener('scroll', scroll.handler);
            }

            // 处理数据
            for (var i = 0; i < data.length; i++) {
                // 下载链接
                if (!util.platform.isWechatApp() && data[i].downloadlink) {
                    var dHref = utils.parsePackInfo(data[i].downloadlink);

                    data[i].apkHref = dHref.apk;
                    data[i].ipaHref = dHref.ipa;
                }

                // 序号
                if (!data[i].itemnum) {
                    data[i].itemnum = ++itemNum - 1;
                }
            }

            mustache.render(component.element, data)
                .then(function (rs) {
                    if (rs instanceof Array) {
                        rs = rs.join('');
                    }

                    var el = document.createElement('ul');
                    var frag = document.createDocumentFragment();

                    el.innerHTML = rs;

                    while (el.children.length !== 0) {
                        frag.appendChild(el.children[0]);
                    }

                    ul.appendChild(frag);
                });

            loading.finally();
        }
    };

    // 滚动相关
    scroll = {
        // 增加滚动事件监听
        addHandler: function () {
            window.addEventListener('scroll', scroll.handler, utils.isPassiveEvtSupport() ? {
                passive: true
            } : false);
        },
        // 滚动事件监听
        handler: function () {
            utils.rqFrame.call(window, scroll.trigger);
        },
        // 移除滚动事件监听
        rmHandler: function () {
            window.removeEventListener('scroll', scroll.handler);
        },
        // 触发器
        trigger: function () {
            if (loading.isLoading) {
                // 正在加载，不重复触发
                return;
            }

            var y = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
            var btmPos = window.innerHeight + y; // 视口底部到文档顶部高度
            var limitHt = component.element.offsetTop - properties.gap;

            if (btmPos > limitHt) {
                loading.load();
            }
        }
    };

    customElement.prototype.firstInviewCallback = function () {
        component = this;
        btn = component.element.querySelector('.mip-qf-loadingscroll-btn');
        ul = component.element.querySelector('ul');

        if (!ul || !btn) {
            throw new Error('DOM element not found');
        }

        params = utils.getCustomParams(this.element);
        properties = utils.getHtmlProperties(this.element, btn);

        if (!params || !properties) {
            return;
        }

        mustache.render(component.element, {})
        .then(function (rs) {
            var el = document.createElement('ul');

            el.innerHTML = rs;

            // 以首个元素节点标签名为参照
            var nName = el.children[0].nodeName.toLowerCase();

            // 初始化 itemnum
            if (el.children.length > 0) {
                var i = 0;
                while (i <= el.children.length - 1) {
                    if (el.children[i].nodeName.toLowerCase() === nName) {
                        itemNum++;
                    }

                    i++;
                }
            }

            scroll.handler();
            scroll.addHandler();
        });
    };

    customElement.prototype.detachedCallback = function () {
        scroll.rmHandler();
    };

    return customElement;
});