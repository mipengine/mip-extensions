/**
 * @file mip-qf-fixedbox 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var hideClass = component.getAttribute('data-slide'); // 获取显示悬浮框类名
        var rootSize = parseFloat($('html').css('font-size')); // 根元素尺寸
        var flag = component.getAttribute('hide-distance') * rootSize; // 设定固定距离

        if (!flag) {
            flag = 0;
        }

        $(window).on('scroll', function () {
            $(window).scrollTop() > flag ? component.classList.add(hideClass) : component.classList.remove(hideClass);
        });
    };

    return customElement;
});
