/**
 * @file 回顶gototop
 *
 * @author wangpei07
 * @date 2016-11-29
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');
    const YOFFSET = 200;

    /**
     * [showGoTop 是否显示回顶按钮]
     *
     * @param  {[type]} element   [回顶按钮对象]
     * @param  {[type]} scrollTop [滚动条位置]
     * @param  {[type]} threshold [按钮显示时，页面滚出可视区的阈值]
     */
    function showGoTop(element, scrollTop, threshold) {
        if (scrollTop > threshold) {
            util.css(element, {opacity: 1});
        }
        else {
            util.css(element, {opacity: 0});
        }
    }

    /**
     * build 组件build
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var threshold = element.getAttribute('threshold') || YOFFSET;

        viewport.on('scroll', function () {
            showGoTop(element, viewport.getScrollTop(), threshold);
        });

        element.addEventListener('touchend', function () {
            viewport.setScrollTop(0);
        }, false);
    };

    return customElement;

});
