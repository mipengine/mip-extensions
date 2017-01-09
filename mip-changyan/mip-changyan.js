/**
 * @file
 * 畅言插件
 * @author smileU
 * @version 1.0.1
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
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('charset', 'UTF-8');
        if (width < criWidth) {
            scriptTag.id = 'changyan_mobile_js';
            scriptTag.setAttribute('src', 'http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf);
        }
        else {
            scriptTag.src = 'http://changyan.sohu.com/upload/changyan.js?client_id=' + appid + '&conf=' + conf;
        }
    };
    return customElement;
});

