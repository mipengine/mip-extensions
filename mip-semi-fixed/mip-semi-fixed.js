/**
 * @file mip-semi-fixed 组件
 * @author
 */

define(function (require) {

    /**
     * [util 引入工具类]
     * @type {Object}
     */
    var util = require('util');

    /**
     * [viewport 引入视图类]
     * @type {Object}
     */
    var viewport = require('viewport');

    /**
     * [fixedElement 引入 fixed 元素类]
     * @type {Object}
     */
    var fixedElement = require('fixed-element');

    var customElement = require('customElement').create();

    /**
     * [YOFFSET 默认fixed top 的距离]
     * @type {integer}
     */
    var YOFFSET = 0;

    /**
     * firstInviewCallback
     */
    customElement.prototype.build = function () {

        var self = this;
        var element = self.element;
        var layer = fixedElement._fixedLayer;

        var scrollTop = viewport.getScrollTop();
        var offsetTop = element.offsetTop;
        var threshold = element.getAttribute('threshold') || YOFFSET;
        var idx = document.querySelectorAll('mip-fixed').length;

        // 获取 fixed 元素，和滚动元素容器
        self.staticDiv = element.querySelector('div[mip-semi-fixed="static"]');
        self.mipFixed = element.querySelector('div[mip-semi-fixed="semifixed"]');

        // 结果页打开，移动到 fixed layer
        if (layer) {
            var data = {
                element: self.mipFixed,
                id: 'Fixed' + idx
            };
            fixedElement.moveToFixedLayer(data, parseInt(idx, 10));
        }

        // 组件初始时 样式设置
        util.css(self.mipFixed, {
            position: 'fixed',
            top: threshold + 'px',
            zIndex: 10000 - idx
        });

        // 如果页面已经滚动了一定位置，则直接固定
        if (offsetTop - scrollTop <= threshold) {

            util.css(self.mipFixed, {
                opacity: 1,
                position: 'fixed',
                top: threshold + 'px',
                zIndex: 10000 - idx
            });

            util.css(self.staticDiv, {
                opacity: 0
            });
        }

        // 监听resize
        window.onresize = function () {
            scrollTop = viewport.getScrollTop();
            offsetTop = element.offsetTop;
        };

        // 监听滚动事件
        viewport.on('scroll', function () {

            scrollTop = viewport.getScrollTop();
            offsetTop = element.offsetTop;

            if (offsetTop - scrollTop <= threshold) {
                util.css(self.mipFixed, 'opacity', '1');
                util.css(self.staticDiv, 'opacity', '0');
            }
            else {
                util.css(self.mipFixed, 'opacity', '0');
                util.css(self.staticDiv, 'opacity', '1');
            }
        });
    };

    return customElement;
});
