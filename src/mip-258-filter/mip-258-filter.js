/**
 * @file mip-258-filter 筛选组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    var viewer = require('viewer');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = $(this.element);
        $(element).find('.mip-cityA .mip-btn').click(function () {
            var other = $(this).siblings();
            var data = $(this).attr('data-num');
            other.removeClass('mip-active');
            $(this).addClass('mip-active');
            other.eq(0).val(data);
        });

        /**
         * 重置按钮事件
         * @param {HTMLElement} mip-reset 组件节点
         */
        $(element).find('.mip-reset').click(function () {
            $(element).find('input[type="hidden"]').val();
            $(element).find('.mip-btn').removeClass('mip-active');
        });
    };
    return customElement;
});
