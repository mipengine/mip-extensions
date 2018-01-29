/**
 * @file 横向滑动组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');

    /**
     * 默认配置
     *
     * @const
     * @type {Object}
     */
    var DEFAULTS = {
        rate: 97 / 1140 * 100,
        right: 24 / 97 * 100,
        type: null
    };

    /**
     * 验证元素节点
     */
    customElement.prototype.init = function () {
        var self = this;
        var element = self.element;

        [
            '[data-wrapper]',
            '[data-inner]',
            '[data-scroller]',
            '[data-item]'
        ].forEach(function (key) {
            if (!element.querySelectorAll(key).length) {
                self.warn('组件必须包含属性元素 `' + key + '` 。', element);
                self.build = function () {};
            }
        });
    };

    /**
     * 打印警告日志
     */
    customElement.prototype.warn = function () {
        var args = [].slice.call(arguments);
        args.unshift('<mip-scrollbox>:');
        console.warn.apply(console, args);
    };

    /**
     * 提前执行，因为要设置元素的宽度
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var config = util.fn.extend({}, DEFAULTS, element.dataset);
        var updateView = util.fn.throttle(function () {
            viewport.trigger('changed');
        }, 200);

        // 绑定滚动事件触发更新视图
        element.querySelector('[data-inner]').addEventListener('scroll', updateView);

        if (config.type !== 'row') {
            return;
        }

        var nodes = element.querySelectorAll('[data-item]');
        var width = 0;
        var cols = 0;

        [].slice.call(nodes).forEach(function (node) {
            var col = node.dataset.col || 3;
            width += col * config.rate;
            cols += col - 0;
        });

        [].slice.call(nodes).forEach(function (node) {
            node.style.width = (node.dataset.col || 3) * config.rate / width * 100 + '%';
            node.style.paddingRight = config.right / cols + '%';
        });
        element.querySelector('[data-scroller]').style.width = width + '%';
    };

    return customElement;
});
