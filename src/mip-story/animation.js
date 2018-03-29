/**
 * @file 动画的管理逻辑
 * @author xiongwenjie@baidu.com
 * @description
 */
define(function(require) {
    'use strict';
    var util = require('util');
    var animatePreset = require('./animate-preset');
    var MIP_STORY_ANIMATE_IN_ATTR = 'animate-in';
    var MIP_STORY_ANIMATE_IN_DURATION_ATTR = 'animate-in-duration';
    var MIP_STORY_ANIMATE_IN_DELAY_ATTR = 'animate-in-delay';
    var MIP_STORY_ANIMATE_IN_AFTER_ATTR = 'animate-in-after';
    var MIP_STORY_ANIMATE_IN_SELECROR = '[animate-in]';

    var naboo = util.naboo;
    function AnimationManager (page) {
        this.page = page;
        this.quene = [];
        this.init();
    }

    /**
     * [init] 初始化 AnimationmAnager
     * @return {[type]} [description]
     */
    AnimationManager.prototype.init = function () {
        var currentEle = this.page;
        var $animate = currentEle.querySelectorAll('[animate-in]');
        var self = this;
        [].slice.call($animate).forEach(function (el) {
            var runner = buildRuner(el);
            self.quene.push(runner);
        });
    };

    AnimationManager.prototype.runAllAnimate = function () {
        this.quene.forEach(function (val) {
            val.play();
        });
    }
    AnimationManager.prototype.cancelAllAnimate = function () {
        this.quene.forEach(function (val) {
            val.cancel();
        });
    }

    /**
     * [hasAnimations description]
     * @param  {[type]}  element [description]
     * @return {Boolean}         [description]
     */
    function hasAnimations(element) {
        return !!element.querySelectorAll(MIP_STORY_ANIMATE_IN_SELECROR).length;
    }

    /**
     * [cancelCallBack description]
     * @param  {[type]} runner [description]
     * @return {[type]}        [description]
     */
    function cancelCallBack(runner) {

    };

    /**
     * [createAnimationDef description]
     * @param  {[type]} el     [description]
     * @param  {[type]} preset [description]
     * @return {[type]}        [description]
     */
    function createAnimationDef (el) {
        var offset = el.getBoundingClientRect();
        var keyframes;
        offset.pageHeight = window.innerHeight;
        offset.pageWidth = window.innerWidth;

        var animationType = getPreset(el);
        // 处理动画的keyframes
        if (animationType && animationType.keyframes) {
            if (typeof animationType.keyframes === 'function') {
                keyframes = animationType.keyframes(offset);
            } else {
                keyframes = animationType.keyframes;
            }
        }

        return keyframes;

    }

    /**
     * [getPreset description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    function getPreset(el) {
        var name = (String(el.getAttribute('animate-in')).split(/\s+/))[0];
        return animatePreset[name];
    }

    /**
     * [getEasing description]
     * @param  {[type]} el     [description]
     * @param  {[type]} easing [description]
     * @return {[type]}        [description]
     */
    function getEasing(el) {
        var easeDef = getPreset(el);
        var ease = el.getAttribute('animate-in-ease');
        var duration = el.getAttribute('animate-in-duration');
        var delay = el.getAttribute('animate-in-delay');
        var after = el.getAttribute('animate-in-after');
        var easing = {
            'easing': ease || easeDef.easing,
            'duration': duration || easeDef.duration,
            'delay': delay || 0
        };
        return easing;

    }
    /**
     * [buildRuner description]
     * @param  {[type]} animateDef [description]
     * @return {[type]}            [description]
     */
    function buildRuner(el) {
        var player;
        var animateDef = createAnimationDef(el);
        var easing = getEasing(el);
        player = el.animate(animateDef, easing);
        player.pause();
        return player;
    }
    /**
     * [getAnimationStatus description]
     * @param  {[type]} runner [description]
     * @return {[type]}        [description]
     */
    function getAnimationStatus(runner) {

    };

    return {
        AnimationManager: AnimationManager,
        hasAnimations: hasAnimations
    };
});