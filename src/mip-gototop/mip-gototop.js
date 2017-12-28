/**
 * @file 回顶gototop
 *
 * @author wangpei07
 * @date 2016-11-29
 */

define(function (require) {
    var customElement = require('customElement').create();
    var viewport = require('viewport');
    var yOffset = 200;

    /**
     * build 组件build
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var threshold = element.getAttribute('threshold') || yOffset;
        var delay = parseInt(element.getAttribute('delay'), 10) || 0;
        var timmer;

        viewport.on('scroll', function () {
            var scrollTop = viewport.getScrollTop();
            if (scrollTop > threshold) {
                element.classList.add('mip-gototop-show');
                if (delay) {
                    clearTimeout(timmer);
                    timmer = setTimeout(function () {
                        element.classList.remove('mip-gototop-show');
                    }, delay);
                }
            }
            else {
                element.classList.remove('mip-gototop-show');
            }
        });

        element.addEventListener('click', function () {
            viewport.setScrollTop(0);
        }, false);
    };

    return customElement;

});
