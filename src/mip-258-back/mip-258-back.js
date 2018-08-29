/**
 * @file mip-back 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = $(this.element);
        element.click(function () {
            window.top.history.go(-1);
        });
    };
    return customElement;
});
