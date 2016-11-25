/**
 * @file 百度统计插件
 *
 * @author menglingjun
 * From: mip-stats-baidu
*/

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function () {

        var elem = this.element;

        var token = elem.getAttribute('token');

        window._hmt = window._hmt || [];

        var hm = document.createElement("script");

        hm.src = '//hm.baidu.com/hm.js?' + token;

        $(elem).append(hm);

    }

    return customElement;
});