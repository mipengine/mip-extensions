/**
 * @file mip-258-imgclickrefresh 组件
 * @author hongzequan
 * @mail hongzequan@258.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    var obj = $('#mip-img');
    obj.click(function () {
        if (obj) {
            var src = obj.attr('src');
            obj.attr('src', '');
            obj.attr('src', src);
        }
    });
    customElement.prototype.firstInviewCallback = function () {

    };
    return customElement;
});
