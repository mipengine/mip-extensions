/**
 * @author: yoyoyoo
 * @date: 2016-12-12
 * @file: mip-ck-browser.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var device = require('./ck-browser');
    var browser = device.browser;
    var $ = require('zepto');
    var $body = $('body');

    function setHtmlBrowser(elem, browsersType) {
        var len = browsersType.length;
        var i = 0;
        var browserType = '';
        var converse = elem.getAttribute('converse');
        var browserClass = browsersType.join('-');
        var converseClass = '';

        if (converse !== null) {
            converseClass = '-' + 'converse';
        }

        for (i; i < len; i++) {
            browserType = browsersType[i].toLocaleUpperCase();

            var flag = false;

            // 判断元素是否有浏览器取反
            if (converse === null) {
                if (browserType === browser) { // 判断浏览器类型
                    flag = true;
                    break;
                }
            }
            else {
                if (browserType === browser) {
                    flag = false;
                    break;
                }
                else {
                    flag = true;
                }
            }
        }

        if (flag) {
            // 真 显示元素
            elem.style.display = 'block';
            $body.addClass('v-mip-ck-browser-' + browserClass + converseClass);
        }
        else {
            // 假 移除元素
            elem.parentNode.removeChild(elem);
        }
    }
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var self = this;

        var browserType = self.element.getAttribute('browser') || '';
        var browsersType = browserType.split(',') || [];

        setHtmlBrowser(self.element, browsersType);
    };

    return customElem;
});

