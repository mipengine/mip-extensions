/**
 * @file mip-changyan 组件
 * @author 点点
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var e = this.element;
        var appid = e.getAttribute('appid');
        var conf = e.getAttribute('conf');
        var d = document.createElement('script');
        d.charset = 'utf-8';
        d.id = 'changyan_mobile_js';
        d.type = 'text/javascript';
        d.src = 'https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id='
        + appid + '&conf=' + conf;
        e.appendChild(d);
    };
    return customElement;
});
