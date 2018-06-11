/**
 * @file mip-story-clickswitch 组件
 * @author
 */
define(function (require) {
    'use strict';

    var CURRENT = 'current';
    var storyContain;
    var storyViews;
    var util = require('util');
    var Gesture = util.Gesture;
    var dm = util.dom;
    var storyInstance;
    var showDampingCB;
    var resetClickEndStatusCB;
    var isShowSwitchLayerCB;

    function MIPStoryClickSwitch(param) {
        // story的实例
        storyInstance = param.storyInstance;
        this.hint = storyInstance.hint;
        // story中每个页面包括分享页
        storyContain = storyInstance.storyContain;
        storyViews = storyInstance.storyViews;
        showDampingCB = param.showDamping;
        resetClickEndStatusCB = param.resetClickEndStatus;
        isShowSwitchLayerCB = param.isShowSwitchLayer;
        this.preIndex = this.currentIndex = this.nextIndex = 0;
    }

    MIPStoryClickSwitch.prototype.build = function () {
        this.initViewForSwitch();
        this.swipe();
    };

    // 初始化第一页
    MIPStoryClickSwitch.prototype.initViewForSwitch = function () {
        this.switchTo({status: 1, notIncrease: 1});
    };

    // 点击翻页
    MIPStoryClickSwitch.prototype.switchPage = function (e) {
        // 翻页逻辑
        var centerX = (storyInstance.element.offsetLeft + storyInstance.element.offsetWidth) / 2;
        // 向右切换
        if (e.pageX > centerX) {
            this.switchTo({e: e, status: 1});
        }
        // 向左切换
        else {
            this.switchTo({e: e, status: 0});
        }
    };
    MIPStoryClickSwitch.prototype.swipe = function () {
        var gesture = new Gesture(storyInstance.element, {
            preventX: false
        });
        var self = this;
        // 绑定点击事件
        gesture.on('swipe', function (e, data) {
            if (data.swipeDirection === 'left'
                || data.swipeDirection === 'right') {
                var backend = document.querySelector('.mip-backend');
                if (dm.contains(backend, e.target)) {
                    return;
                }

                self.hint.toggleSystemLater();
            }

        });
    };
    MIPStoryClickSwitch.prototype.switchTo = function (data) {
        this.hint.hideDamping();
        this.hint.hideSystemLater();
        if (data.status === 0 && this.currentIndex <= 0) {
            showDampingCB();
            return;
        }
        else if (!data.notIncrease && data.status === 1
            && this.currentIndex + 1 >= storyViews.length) {
            this.setViewStatue(false, CURRENT, storyViews[this.currentIndex]);
            this.showBookEnd();
            return;
        }

        if (!data.notIncrease) {
            data.status === 1 ? this.currentIndex++ : this.currentIndex--;
        }

        var currentEle = storyViews[this.currentIndex];
        var preEle = storyViews[this.preIndex];
        if (this.currentIndex !== this.preIndex) {
            this.setViewStatue(false, CURRENT, preEle);
        }

        this.setViewStatue(true, CURRENT, currentEle);
        var index = {
            preIndex: this.preIndex,
            currentIndex: this.currentIndex,
            status: data.status
        };
        resetClickEndStatusCB(index);
        this.preIndex = this.currentIndex;
        // 右翻
        if (!data.notIncrease) {
            isShowSwitchLayerCB(data.status);
        }

    };

    MIPStoryClickSwitch.prototype.showBookEnd = function () {
        var ele = storyContain[storyContain.length - 1];
        this.setViewStatue(true, CURRENT, ele);
        var eleAnimation = ele.animate([
            {transform: 'translate3D(0, 100%, 0)', opacity: 0},
            {transform: 'translate3D(0, 0, 0)', opacity: 1}
        ], {
            fill: 'forwards',
            easing: 'ease-in',
            duration: 280
        });
        eleAnimation.play();
    };

    MIPStoryClickSwitch.prototype.goBack = function () {
        this.setViewStatue(true, CURRENT, storyViews[this.currentIndex]);
        this.closeBookEnd();
    };

    MIPStoryClickSwitch.prototype.closeBookEnd = function () {
        var ele = storyContain[storyContain.length - 1];
        this.setViewStatue(true, CURRENT, ele);
        var eleAnimation = ele.animate([
            {transform: 'translate3D(0, 0, 0)', opacity: 1},
            {transform: 'translate3D(0, 100%, 0)', opacity: 0}
        ], {
            fill: 'forwards',
            easing: 'ease-out',
            duration: 280
        });
        eleAnimation.play();
    };

    MIPStoryClickSwitch.prototype.setViewStatue = function (isSetStatus, viewStatue, viewEle) {
        if (viewEle && viewStatue) {
            if (isSetStatus) {
                viewEle.setAttribute(viewStatue, '');
            }
            else {
                viewEle.removeAttribute(viewStatue);
            }
        }

    };

    MIPStoryClickSwitch.prototype.swip = function (e) {
        if (e.data.swipeDirection === 'left'
            || e.data.swipeDirection === 'right') {
            var backend = document.querySelector('.mip-backend');
            if (dm.contains(backend, e.target)) {
                return;
            }

            this.hint.toggleSystemLater();
        }

    };

    return MIPStoryClickSwitch;
});
