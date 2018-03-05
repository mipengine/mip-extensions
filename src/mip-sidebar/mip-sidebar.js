/**
 * @file 侧边栏组件
 *
 * @author wangpei07@baidu.com, liangjiaying
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * [toggle 打开或关闭 sidebar 入口]
     */
    function toggle(event) {

        isOpen.call(this) ? close.call(this, event) : open.call(this);

    }

    /**
     * [open 打开 sidebar]
     */
    function open() {

        var self = this;
        if (self.runing) {
            return;
        }
        self.runing = true;

        if (isOpen.call(this)) {
            return;
        }

        util.css(self.element, {display: 'block'});
        openMask.call(self);


        self.bodyOverflow = getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        // 动画效果
        var openTimer = setTimeout(function () {

            self.element.setAttribute('open', '');
            self.element.setAttribute('aria-hidden', 'false');
            clearTimeout(openTimer);

        }, self.ANIMATION_TIMEOUT);

    }

    /**
     * [close 关闭 sidebar]
     *
     * @param  {Object} event 点击事件
     */
    function close(event) {

        var self = this;
        if (self.runing) {
            return;
        }
        self.runing = true;
        event.preventDefault();

        self.element.removeAttribute('open');
        self.element.setAttribute('aria-hidden', 'true');

        closeMask.call(self);

        document.body.style.overflow = self.bodyOverflow;

        // 动画效果
        var closeTimer = setTimeout(function () {

            util.css(self.element, {display: 'none'});
            clearTimeout(closeTimer);

        }, self.ANIMATION_TIMEOUT);

    }

    /**
     * [openMask 打开遮盖层]
     */
    function openMask() {

        var self = this;

        // 不存在遮盖层时先创建
        if (!self.maskElement) {

            const mask = document.createElement('div');
            mask.id = 'MIP-' + self.id.toUpperCase() + '-MASK';
            mask.className = 'MIP-SIDEBAR-MASK';
            mask.setAttribute('data-side', self.side);

            // 与mip-sidebar 同级dom
            self.element.parentNode.appendChild(mask);
            mask.addEventListener('touchmove', function (evt) {
                evt.preventDefault();
            }, false);

            self.maskElement = mask;
        }

        self.maskElement.setAttribute('on', 'tap:' + self.id + '.close');

        self.maskElement.style.display = 'block';

        // 触发重绘
        self.maskElement.offsetWidth;
        self.maskElement.setAttribute('open', '');
        setTimeout(function () {
            self.runing = false;
        }, 500);
    }

    /**
     * [closeMask 关闭遮盖层]
     */
    function closeMask() {
        var self = this;
        if (self.maskElement) {
            self.maskElement.removeAttribute('open');
            setTimeout(function () {
                self.maskElement.style.display = 'none';
                self.runing = false;
            }, 500);
        }
    }

    /**
     * [isOpen sidebar 状态判断]
     *
     * @return {boolean}
     */
    function isOpen() {

        return this.element.hasAttribute('open');

    }

    /**
     * build
     *
     */
    function build() {

        var self = this;
        self.maskElement = false;
        self.id = self.element.id;
        self.side = self.element.getAttribute('side');
        self.ANIMATION_TIMEOUT = 100;

        if (self.side !== 'left' && self.side !== 'right') {
            self.side = 'left';
            self.element.setAttribute('side', self.side);
        }

        if (isOpen.call(self)) {
            open.call(self);
        }
        else {
            self.element.setAttribute('aria-hidden', 'true');
        }


        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                close.call(self, event);
            }
        }, false);

        self.addEventAction('toggle', function (event) {
            toggle.call(self, event);
        });
        self.addEventAction('open', function () {
            open.call(self);
        });
        self.addEventAction('close', function (event) {
            close.call(self, event);
        });

    }

    customElement.prototype.build = build;
    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});

