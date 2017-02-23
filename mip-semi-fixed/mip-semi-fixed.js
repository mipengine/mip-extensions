/**
 * @file mip-semi-fixed 组件
 * @author
 */

define(function (require) {
	var util = require('util');
	var viewport = require('viewport');
    var customElement = require('customElement').create();
	const YOFFSET = 100;
    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var self = this;
        var element = self.element;  
        var threshold = element.getAttribute('threshold') || YOFFSET; //获取滚动高度
        var seminormal = document.getElementById('semi-normal');  //滚动前div

        viewport.on('scroll', function () {
            var scrollTop = viewport.getScrollTop();
            if (scrollTop > threshold) {
               util.css(element, 'display', 'block');
               util.css(seminormal, 'display', 'none');
            }
            else {
                util.css(element, 'display', 'none');
                util.css(seminormal, 'display', 'block');
            }
        });
    };

    return customElement;
});
