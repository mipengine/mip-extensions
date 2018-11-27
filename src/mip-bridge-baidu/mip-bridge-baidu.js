/**
 * @file 百度商桥
 *
 * @author mdingdong    
 * From: mip-bridge-baidu
 */
/* global MIP */
define(function (require) {
    var bridgeRoot = '//p.qiao.baidu.com/cps/b.js?siteId=';
    var statsRoot = 'https://hm.baidu.com/hm.js?';

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var me = this;
        var element = me.element;
        var siteId = element.getAttribute('siteId');
        var token = element.getAttribute('token');
        var hm = document.createElement('script');
        if (siteId) {
            hm.src = bridgeRoot + encodeURIComponent(siteId);
        }
        else if (token) {
            hm.src = statsRoot + encodeURIComponent(token);
        }

        if (hm.src) {
            element.appendChild(hm);
        }
    };

    return customElement;
});
