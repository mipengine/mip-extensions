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
     * 控制 gototop 元素展示
     *
     * @param {boolean} show 是否展示
     */
    customElement.prototype.toggle = function (show) {
        if (show) {
            this.element.classList.add('mip-gototop-show');
            this.element.classList.remove('mip-gototop-hide');
        }
        else {
            this.element.classList.add('mip-gototop-hide');
            this.element.classList.remove('mip-gototop-show');
        }
    };

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
                self.toggle(1);
                if (delay) {
                    clearTimeout(timmer);
                    timmer = setTimeout(function () {
                        self.toggle();
                    }, delay);
                }
            }
            else {
                self.toggle();
            }
        });

        element.addEventListener('click', function () {
            viewport.setScrollTop(0);
        }, false);
    };

    return customElement;

});
