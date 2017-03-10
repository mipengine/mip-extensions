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
     * [customElement 组件元素]
     * @type {Object}
     */
    var customElement = require('customElement').create();

    /**
     * [YOFFSET 默认fixed top 的距离]
     * @type {integer}
     */
    var YOFFSET = 0;

    /**
     * [fixedElement 引入 fixed 元素类]
     * @type {Object}
     */
    var fixedElement = require('fixed-element');

    /**
     * [viewer 窗口]
     * @type {Object}
     */
    var viewer = require('viewer');

    /**
     * [STATUS 状态标记对象
     * @type {Object}
     */
    var STATUS = {
        STATUS_FIXED: 'mip-semi-fixed-fixedSatus',
        STATUS_SCROLL: 'mip-semi-fixed-scrollSatus'
    };

    /**
     * [onScroll mip 页面滑动事件]
     *
     * @param  {Object} viewport 视图
     */
    function onScroll(viewport) {
        var element = this.element;
        var container = this.container;
        var threshold = this.threshold;
        var fixedClassNames = this.fixedClassNames;
        var scrollTop = viewport.getScrollTop();
        var offsetTop = element.offsetTop;

        if (offsetTop - scrollTop <= threshold) {
            if (container.className.indexOf(fixedClassNames) < 0) {
                container.className += fixedClassNames;
            }
            container.setAttribute(STATUS.STATUS_FIXED, '');
            util.css(container, 'top', threshold + 'px');

        }
        else {
            container.className = container.className.replace(fixedClassNames, '');
            container.removeAttribute(STATUS.STATUS_FIXED);
            util.css(container, 'top', '');
        }
    }

    /**
     * [onIframeScroll iframe 下 mip 页面滑动事件]
     *
     * @param  {Object} viewport 视图
     */
    function onIframeScroll(viewport) {

        var element = this.element;
        var scrollTop = viewport.getScrollTop();
        var offsetTop = element.offsetTop;

        if (offsetTop - scrollTop <= this.threshold) {
            util.css(this.fixedContainer, {opacity: 1});
            util.css(this.container, {opacity: 0});
        }
        else {
            util.css(this.fixedContainer, {opacity: 0});
            util.css(this.container, {opacity: 1});
        }
    }

    /**
     * build
     */
    customElement.prototype.build = function () {

        var self = this;
        var element = self.element;
        self.container = element.querySelector('div[mip-semi-fixed-container]');
        if (!self.container) {
            console.error('必须有 <div mip-semi-fixed-container> 子节点');
            return;
        }

        self.threshold = element.getAttribute('threshold') || YOFFSET;
        self.fixedClassNames = ' ' + element.getAttribute('fixedClassNames');
        self.container.setAttribute(STATUS.STATUS_SCROLL, '');

        // 初始状态为 fixed 时
        if (element.offsetTop - viewport.getScrollTop() <= self.threshold) {
            if (self.container.className.indexOf(self.fixedClassNames) < 0) {
                self.container.className += self.fixedClassNames;
            }
            self.container.setAttribute(STATUS.STATUS_FIXED, '');
            util.css(self.container, 'top', self.threshold + 'px');
        }

        // iframe 中
        if (viewer.isIframed) {
            self.fixedContainer = self.container.cloneNode(true);
            self.fixedContainer.className += self.fixedClassNames;
            self.fixedContainer.setAttribute(STATUS.STATUS_FIXED, '');
            util.css(self.fixedContainer, {
                top: self.threshold + 'px',
                opacity: 0
            });
            element.appendChild(self.fixedContainer);

            var idx = document.querySelectorAll('mip-fixed').length || 0;

            // 结果页打开，移动到 fixed layer
            if (fixedElement._fixedLayer) {
                var data = {
                    element: self.fixedContainer,
                    id: 'Fixed' + idx
                };
                fixedElement.moveToFixedLayer(data, parseInt(idx, 10));
            }

            viewport.on('scroll', function () {
                onIframeScroll.call(self, viewport);
            });
            document.body.addEventListener('touchmove', function (event) {
                onIframeScroll.call(self, viewport);
            });

        }
        else {
            // 监听滚动事件和 touchmove 事件
            viewport.on('scroll', function () {
                onScroll.call(self, viewport);
            });
            document.body.addEventListener('touchmove', function (event) {
                onScroll.call(self, viewport);
            });

        }
    };

    return customElement;
});
