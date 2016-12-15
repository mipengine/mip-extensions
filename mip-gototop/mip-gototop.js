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
     * build 组件build
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var threshold = element.getAttribute('threshold') || YOFFSET;

        viewport.on('scroll', function () {
            var scrollTop = viewport.getScrollTop();
            if (scrollTop > threshold) {
                util.css(element, {opacity: 1});
            }
            else {
                util.css(element, {opacity: 0});
            }
        });

        element.addEventListener('touchend', function () {
            viewport.setScrollTop(0);
        }, false);
    };

    return customElement;

});
