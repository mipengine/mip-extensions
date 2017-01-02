/**
 * @file
* 畅言插件
* @author smileU
* @version 1.0.0
*/
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var ele = this.element;
        var appid = ele.getAttribute('appid');
        var conf = ele.getAttribute('conf');
        var criWidth = ele.getAttribute('critical-width');
        var viewport = require('viewport');
        var width = viewport.getWidth();
        if (criWidth != null && width < criWidth) {
            var html = '<script id="changyan_mobile_js" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>';
            window.document.write(html);
        }
        else {
            var loadJs = function (srcStr, fn) {
                var htmlTag = document.getElementsByTagName('head')[0] || document.head || document.documentElement;
                var scriptTag = document.createElement('script');
                scriptTag.setAttribute('type', 'text/javascript');
                scriptTag.setAttribute('charset', 'UTF-8');
                scriptTag.setAttribute('src', srcStr);
                if (typeof fn === 'function') {
                    if (window.attachEvent) {
                        scriptTag.onreadystatechange = function () {
                            var e = scriptTag.readyState;
                            if (e === 'loaded' || e === 'complete') {
                                scriptTag.onreadystatechange = null;
                                fn();
                            }
                        };
                    }
                    else {
                        scriptTag.onload = fn;
                    }
                }
                htmlTag.appendChild(scriptTag);
            };
            loadJs('https://changyan.sohu.com/upload/changyan.js', function () {
                window.changyan.api.config({
                    appid: appid,
                    conf: conf
                });
            });
        }
    };
    return customElement;
});

