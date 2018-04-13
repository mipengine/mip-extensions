/**
 * @file 动画的管理逻辑
 * @author xiongwenjie@baidu.com
 * @description
 */

define(function (require) {
    'use strict';

    var animatePreset = require('./animate-preset');
    var AnimationRunner = require('./animation-runner');
    var util = require('util');
    var extend = util.fn.extend;
    var css = util.css;
    var MIP_STORY_ANIMATE_IN_ATTR = 'animate-in';
    var MIP_STORY_ANIMATE_IN_DURATION_ATTR = 'animate-in-duration';
    var MIP_STORY_ANIMATE_IN_DELAY_ATTR = 'animate-in-delay';
    var MIP_STORY_ANIMATE_IN_AFTER_ATTR = 'animate-in-after';
    var MIP_STORY_ANIMATE_IN_SELECROR = '[animate-in]';

    // @class
    function AnimationManager(page) {
        this.page = page;
        // [
        //     {
        //         id: xxx,
        //         runner: runner
        //     }
        // ]
        this.sequence = [];
        this.init();
    }

    AnimationManager.prototype.init = function () {
        var self = this;
        var EventEmitter = util.EventEmitter;
        var currentEle = this.page;
        var $animate = currentEle.querySelectorAll(MIP_STORY_ANIMATE_IN_SELECROR);

        this.emitter = new EventEmitter();
        [].slice.call($animate).forEach(function (el) {
            var runner = buildRuner(el);
            var player = {
                runner: runner
            };

            if (el.id) {
                player.id = el.id;
            }

            self.sequence.push(player);
        });
    };

    AnimationManager.prototype.runAllAnimate = function () {
        var self = this;
        var startAfterId;
        this.sequence.forEach(function (player) {
            startAfterId = player.runner.animationDef.startAfterId;
            if (startAfterId && self.getRunnerById(startAfterId)) {
                self.waitAndStart(self.getRunnerById(startAfterId), player);
            } else {
                player.runner.play();
            }
        });
    };

    AnimationManager.prototype.paintFirstFrame = function () {
        this.sequence.forEach(function (player) {
            css(player.runner.el, player.runner.animationDef.keyframes[0]);
        });
    };

    AnimationManager.prototype.getRunnerById = function (id) {
        var runner = null;
        if (id) {
            this.sequence.forEach(function (val) {
                if (val.id === id && val.runner && val.runner.isRunner) {
                    runner = val.runner;
                }
            });
        }
        return runner;
    };

    AnimationManager.prototype.cancelAllAnimate = function () {
        this.sequence.forEach(function (player) {
            player.runner.cancel();
        });
    };

    AnimationManager.prototype.waitAndStart = function (prevPlayer, player) {
        var self = this;
        if (prevPlayer.runner && player.runner) {
            self.emitter.on(prevPlayer.el.id, function () {
                player.runner.play();
            });
            prevPlayer.runner.onfinish = function () {
                self.emitter.trigger(prevPlayer.el.id);
            };
        }
    };

    function hasAnimations(element) {
        return !!element.querySelectorAll(MIP_STORY_ANIMATE_IN_SELECROR).length;
    }

    function createAnimationDef(el) {
        var keyframes;
        var easing;

        var offset = el.getBoundingClientRect();
        var animationDef = getPreset(el);
        var duration = el.getAttribute(MIP_STORY_ANIMATE_IN_DURATION_ATTR);
        var delay = el.getAttribute(MIP_STORY_ANIMATE_IN_DELAY_ATTR);
        var after = el.getAttribute(MIP_STORY_ANIMATE_IN_AFTER_ATTR);

        offset.pageHeight = window.innerHeight;
        offset.pageWidth = window.innerWidth;

        // 处理动画的keyframes
        if (animationDef && animationDef.keyframes) {
            if (typeof animationDef.keyframes === 'function') {
                keyframes = animationDef.keyframes(offset);
            } else {
                keyframes = animationDef.keyframes;
            }
        }

        easing = {
            'duration': +duration || animationDef.duration
        };

        if (+delay) {
            animationDef.delay = delay;
        }
        animationDef.easing = easing;
        animationDef.keyframes = keyframes;

        if (after) {
            animationDef.startAfterId = after;
        }

        return animationDef;
    }

    function getPreset(el) {
        var animationDef = {};
        var name = (String(el.getAttribute(MIP_STORY_ANIMATE_IN_ATTR)).split(/\s+/))[0];
        extend(animationDef, animatePreset[name]);
        return animationDef;
    }

    function buildRuner(el) {
        var runner;
        var animationDef = createAnimationDef(el);
        runner = new AnimationRunner(el, animationDef);
        return runner;
    }

    return {
        AnimationManager: AnimationManager,
        hasAnimations: hasAnimations
    };
});
