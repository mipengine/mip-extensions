/**
 * @author: yoyoyoo
 * @date: 2016-12-12
 * @file: mip-ck-browser.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var getLocation = require('./ck-location').get;
    var $ = require('zepto');
    var $body = $('body');

    function setHtmlLocation(elem, locationsType) {
        getLocation(function (data) {

            var len = locationsType.length;
            var i = 0;
            var locationType = '';
            var converse = elem.getAttribute('converse');
            var locationClass = locationsType.join('-');
            var converseClass = '';

            if (converse !== null) {
                converseClass = '-' + 'converse';
            }

            for (i; i < len; i++) {
                locationType = +(locationsType[i]);

                var flag = false;

                // 判断元素是否有浏览器取反
                if (converse === null) {
                    if (locationType === data) { // 判断浏览器类型
                        flag = true;
                        break;
                    }
                }
                else {
                    if (locationType === data) {
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
                $body.addClass('v-mip-ck-location-' + locationClass + converseClass);
            }
            else {
                // 假 移除元素
                elem.parentNode.removeChild(elem);
            }
        });
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var self = this;

        var locationType = self.element.getAttribute('location') || '';
        var locationsType = locationType.split(',') || [];

        setHtmlLocation(self.element, locationsType);
    };

    return customElem;
});

