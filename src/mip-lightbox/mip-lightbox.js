/**
 * @file: mip-lightbox.js
 *
 * @author: wangpei07@baidu.com
 * @date: 2016-11-02
 */

define(function (require) {
    var customElement = require('customElement').create();
    var fixedElement = require('fixed-element');
    var util = require('util');
    var Gesture = util.Gesture;
    var scrollTop = {
        body: 0,
        documentElement: 0,
        offset: 0
    };

    /**
     * render
     *
     */
    function render() {

        var self = this;
        self.open = false;
        self.id = this.element.id;
        self.scroll = this.element.hasAttribute('content-scroll');
        // bottom 不能为0，不然会覆盖遮盖曾，导致无法关闭lightbox
        util.css(self.element, {
            'position': 'fixed',
            'z-index': 10001,
            'top': 0,
            'right': 0,
            'left': 0,
            'transition': 'opacity 0.1s ease-in'
        });


        changeParentNode.call(self);

        // 事件注册
        self.addEventAction('close', function (event) {
            close.call(self, event);
        });
        self.addEventAction('open', function (event) {
            open.call(self, event);
        });
        self.addEventAction('toggle', function (event) {
            toggle.call(self, event);
        });

    }
     // 自动关闭弹层
    function autoClose() {
        var self = this;
        var count = self.element.getAttribute('autoclosetime');
        var seconds = self.element.querySelector('.mip-lightbox-seconds');
        // 判断是否有 autoclose 和 seconds
        if (Number(count) && seconds) {
            // 取出用户自定义的 time 值
            var time = Math.abs(Math.ceil(count));
            // 倒计时
            seconds.innerHTML = time;
            this.interval = setInterval(function () {
                time -= 1;
                seconds.innerHTML = time;
                if (time <= 0) {
                    close.call(self);
                }
            }, 1000);
        }
    }
    function changeParentNode() {
        var self = this;
        var nodes = [];
        var index = 0;
        const CHILDRENS = self.element.childNodes;

        for (index = 0; index < CHILDRENS.length; index++) {
            if (CHILDRENS[index].nodeType === 1) {
                nodes.push(CHILDRENS[index]);
            }
        }

        self.container = document.createElement('div');
        self.applyFillContent(self.container);
        self.element.appendChild(self.container);

        for (index = 0; index < nodes.length; index++) {
            self.container.appendChild(nodes[index]);
        }
    }

    /**
     * [toggle description]
     *
     * @param  {Object} event [事件对象]
     */
    function toggle(event) {
        isOpen.call(this) ? close.call(this, event) : open.call(this, event);
    }

    /**
     * [open 打开 sidebar]
     *
     * @param  {Object} event [事件对象]
     */
    function open(event) {

        var self = this;

        if (self.open) {
            return;
        }

        fixedElement.hideFixedLayer(fixedElement._fixedLayer);
        event.preventDefault();

        if (!self.scroll) {
            new Gesture(self.element, {
                preventY: true
            });
        }

        self.open = true;
        util.css(self.element, {display: 'block'});
        // 保存页面当前滚动状态，因为设置overflow:hidden后页面会滚动到顶部
        scrollTop.body = document.body.scrollTop;
        scrollTop.documentElement = document.documentElement.scrollTop;
        scrollTop.offset = window.pageYOffset;
        document.documentElement.classList.add('mip-no-scroll');

        openMask.call(self);
        autoClose.call(self);

    }


    /**
     * [close 关闭 sidebar]
     *
     * @param  {Object} event [事件对象]
     */
    function close(event) {
        var self = this;

        if (!self.open) {
            return;
        }
        fixedElement.showFixedLayer(fixedElement._fixedLayer);
        if (event) {
            event.preventDefault();
        }

        self.open = false;

        closeMask.call(self);
        util.css(self.element, {display: 'none'});
        document.documentElement.classList.remove('mip-no-scroll');

        // 恢复页面滚动状态到lightbox打开之前
        if (typeof (document.body.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.body.scrollTo方法
            document.body.scrollTo(0, scrollTop.body);
        }
        if (typeof (document.documentElement.scrollTo) === 'function') {
            // 先判断存在，因为safari浏览器没有document.documentElement.scrollTo方法
            document.documentElement.scrollTo(0, scrollTop.documentElement);
        }
        window.scrollTo(0, scrollTop.offset);
    }

    /**
     * [isOpen description]
     *
     * @return {boolean} [是否打开标志]
     */
    function isOpen() {

        return this.open;

    }


    /**
     * [openMask 打开浮层]
     */
    function openMask() {

        var self = this;

        // 不存在遮盖层时先创建
        if (!self.maskElement) {

            const mask = document.createElement('div');
            mask.id = 'MIP-LLIGTBOX-MASK';
            mask.setAttribute('on', 'tap:' + self.id + '.close');
            mask.style.display = 'block';

            // 与mip-lightbox 同级dom
            self.element.parentNode.appendChild(mask);
            if (!self.scroll) {
                mask.addEventListener('touchmove', function (evt) {
                    evt.preventDefault();
                }, false);
            }
            self.maskElement = mask;

        }

        // 样式设置
        util.css(self.maskElement, {display: 'block'});

    }

    /**
     * [closeMask 关闭遮盖层]
     *
     */
    function closeMask() {
        if (this.maskElement) {
            util.css(this.maskElement, {display: 'none'});
            clearInterval(this.interval);
        }
    }

    /**
     * 初始化
     *
     */
    customElement.prototype.build = render;
    customElement.prototype.detachedCallback = function () {
        clearInterval(this.interval);
        document.documentElement.classList.remove('mip-no-scroll');
    };
    return customElement;
});