/**
 * @file 动画管理调度模块
 * @author xiongwenjie@baidu.com
 * @description
 */
define(function (require) {
    'use strict';

    var css = require('util').css;
    function AnimationRunner(el, animationDef) {
        this.el = el;
        this.animationDef = animationDef;
        this.isRunner = 1;
        this.create();
        this.isStart = 0;
    }

    AnimationRunner.prototype.create = function () {
        var animationDef = this.animationDef;
        animationDef.easing.fill = 'forwards';
        this.runner = this.el.animate(animationDef.keyframes, animationDef.easing);
        this.pause();
    };

    AnimationRunner.prototype.play = function () {
        var self = this;
        if (!self.isStart) {
            // delay属性会造成无法渲染第一帧，所以使用setTimeout来代替delay
            if (self.animationDef.delay) {
                self.timer = setTimeout(function () {
                    css(self.el, {visibility: ''});
                    self.runner.play();
                }, self.animationDef.delay);
            } else {
                css(self.el, {visibility: ''});
                self.runner.play();
            }
            self.isStart = 1;
        }
    };

    AnimationRunner.prototype.pause = function () {
        this.runner.pause();
    };

    AnimationRunner.prototype.cancel = function () {
        var self = this;
        clearTimeout(self.timer);
        this.isStart = 0;
        this.runner.cancel();
    };

    return AnimationRunner;
});
