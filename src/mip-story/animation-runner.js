/**
 * @file 动画管理调度模块
 * @author xiongwenjie@baidu.com
 * @description
 */
define(function (require) {
    'use strict';

    var css = require('util').css;
    function AnimationRunner(el, animationDef) {
        this.animationType = animationDef.animationType;
        this.animationName = animationDef.animationName;
        this.duration = animationDef.duration;
        this.delay = animationDef.delay;
        this.el = el;
        this.animationDef = animationDef;
        this.isRunner = 1;
        this.create();
        this.isStart = 0;
    }

    AnimationRunner.prototype.create = function () {
        if (this.animationType === 'CSS_ANIMATION') {
            var self = this;
            this.el.classList.add('mip-story-hidden')
            if (self.delay) {
                css(self.el, {
                    'animation-delay': self.delay + 'ms'
                });
            }

            if (self.duration) {
                css(self.el, {
                    'animation-duration': self.duration + 'ms'
                });
            }
            this.runner = {
                el: self.el
            };
        } else {
            var animationDef = this.animationDef;
            animationDef.easing.fill = 'forwards';
            this.runner = this.el.animate(animationDef.keyframes, animationDef.easing);
            this.pause();
        }
    };

    AnimationRunner.prototype.play = function () {
        var self = this;
        if (this.animationType === 'CSS_ANIMATION') {
            this.el.classList.add('animated', self.animationName);
            this.el.classList.remove('mip-story-hidden');
        } else {
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
        } 
    };

    AnimationRunner.prototype.pause = function () {
        if (this.animationType === 'CSS_ANIMATION') {
        } else {
            this.runner.pause();
        }
    };

    AnimationRunner.prototype.cancel = function () {
        if (this.animationType === 'CSS_ANIMATION') {
            this.el.classList.remove('animated');
            this.el.classList.add('mip-story-hidden');
        } else {
            var self = this;
            clearTimeout(self.timer);
            this.isStart = 0;
            this.runner.cancel();
        }
    };

    return AnimationRunner;
});
