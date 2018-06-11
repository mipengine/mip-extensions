/**
 * @file mip-story-slider 组件
 * @author
 */

define(function (require) {
    'use strict';

    var storyContain = [];
    var emitter;
    var viewport = require('viewport');
    var CURRENT = 'current';
    var ACTIVE = 'active';
    var STYLE = 'style';
    var screenWidth = viewport.getWidth();
    var screenHeight = viewport.getHeight();
    // 左右翻页的阀值
    var SWITCHPAGE_THRESHOLD = viewport.getWidth() * 0.15;
    // 上下翻页的阀值
    var SWITCHPAGE_THRESHOLD_HEIGHT = viewport.getHeight() * 0.1;
    var SWITCHTYPES = {};
    var switchPageType = '';
    var initViewForSwitchCB;
    var sliderStartCB;
    var resetSlideEndViewCB;
    var showDampingCB;

    var util = require('util');
    var dm = util.dom;

    var SLIDEMOVING = 'slideMoving';
    var storyInstance;
    var storyInstanceEle;
    var sliderTime = 200;
    var reboundTime = 80;
    var recommend;

    var DIRECTIONMAP = {
        back: 'back',
        goto: 'goto'
    };
    var directionMap = {
        back: 'back',
        goto: 'goto'
    };

    function MIPStorySlider(param) {
        // story的实例
        storyInstance = param.storyInstance;
        switchPageType = param.switchPageType;
        SWITCHTYPES = param.SWITCHTYPES;
        initViewForSwitchCB = param.initfirstViewStatus;
        sliderStartCB = param.openAutoplay;
        resetSlideEndViewCB = param.resetSlideEndView;
        showDampingCB = param.showDamping;
        // 小故事实例ele
        storyInstanceEle = storyInstance.element;
        // story中每个页面包括分享页
        storyContain = storyInstance.storyContain;
        // story的自定义事件监控器
        emitter = storyInstance.emitter;
        // 翻页的交互类型
        // 翻页的页面state
        this.currentIndex = this.preIndex = this.nextIndex = 0;
        this.touchstartX = this.touchendX = 0;
        this.moveFlag = false;
    }

    function enableScroll(ele) {
        if (ele && ele.addEventListener) {
            ele.addEventListener('touchstart', function () {
                if (ele.scrollTop == 0) {
                    ele.scrollTop = 1;
                }

            });

            ele.addEventListener('touchmove', function (e) {
                if (ele.scrollTop > 0) {
                    e.stopPropagation();
                }

            }, false);
        }
    }

    function isPositionChange(index) {
        var currentEle = storyContain[index];
        var transformMatrix = currentEle.style.transform;
        var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
        if (matrix[0] == 0) {
            return false;
        }

        return true;
    }

    function setSliderPosition(ele, isPre, changemove) {
        var width = isPre ? -screenWidth : screenWidth;
        var height = isPre ? -screenHeight : screenHeight;
        if (ele == null) {
            return;
        }

        // 根据手指位移而修改位移
        if (changemove != null) {
            if (switchPageType == SWITCHTYPES.slideX) {
                ele.style.transform = 'translate(' + changemove + 'px, 0)';
            }
            else {
                ele.style.transform = 'translate(0, ' + changemove + 'px)';
            }
        }
        // 设置翻页前的前一页和后一页的位置
        else {
            if (switchPageType == SWITCHTYPES.slideX) {
                ele.style.transform = 'translate(' + width + 'px, 0)';
            }
            else {
                ele.style.transform = 'translate(0, ' + height + 'px)';
            }
        }
    }

    function setTransitionDuration(ele, time) {
        ele.style.transition = 'transform ' + time + 'ms ease';
    }

    MIPStorySlider.prototype.build = function () {
        // 禁止橡皮筋效果
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, {
            passive: false
        });
        // 初始化段落布局
        this.initViewForSlider();
        this.bindEvent();
        recommend = document.querySelector('.recommend');
    };
    MIPStorySlider.prototype.bindEvent = function () {
        // 开始滑动
        this.sliderStart();
        // 滑动中
        this.sliding();
        // 结束滑动
        this.sliderEnd();
    };

    // 初始化view的最初排布
    MIPStorySlider.prototype.initViewForSlider = function () {
        this.preIndex = this.currentIndex = this.nextIndex = 0;
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        // 添加current状态
        this.setCurrentPage();
        // 清除当前所有view已有的样式
        this.clearStyle();
        if (storyContain.length >= 2) {
            this.nextIndex = this.currentIndex + 1;
            nextEle = storyContain[this.nextIndex];
            this.setViewStatus(true, ACTIVE, nextEle);
            // 初始化下一页的位置
            setSliderPosition(nextEle, false);
        }

        initViewForSwitchCB({
            preIndex: this.preIndex,
            currentIndex: this.currentIndex,
            nextIndex: this.nextIndex
        });
    };

    MIPStorySlider.prototype.sliderStart = function () {
        var self = this;
        var currentEle = storyContain[this.currentIndex];
        // 对story进行手势的监控
        storyInstanceEle.addEventListener('touchstart', function (e) {
            // 如果正处于翻页状态跳出
            if (self.moveFlag) {
                return;
            }

            var touch = e.targetTouches[0];
            self.touchstartX = touch.pageX;
            self.touchstartY = touch.pageY;
            sliderStartCB(e);
        });
    };

    MIPStorySlider.prototype.sliding = function () {
        var self = this;
        // 对story进行手势的监控
        storyInstanceEle.addEventListener('touchmove', function (e) {
            // 特殊处理，分享页更多小故事滚动，禁止翻页滚动
            if (dm.contains(recommend, e.target)) {
                return;
            }

            // 如果正处于翻页状态跳出
            if (self.moveFlag) {
                return;
            }

            self.slideMoving(e);
        });
    };

    MIPStorySlider.prototype.sliderEnd = function () {
        var self = this;
        // 对story进行手势的监控
        storyInstanceEle.addEventListener('touchend', function (e) {
            // 特殊处理，分享页更多小故事滚动，禁止翻页滚动
            if (dm.contains(recommend, e.target)) {
                return;
            }

            // 如果正处于翻页状态跳出
            if (self.moveFlag) {
                return;
            }

            var touch = e.changedTouches[0];
            self.touchendX = touch.pageX;
            self.touchendY = touch.pageY;
            // 只是点击当前页面的内容
            if (self.touchendX == self.touchstartX && self.touchendY == self.touchstartY) {
                self.moveFlag = false;
                return;
            }
            else {
                // 关闭其他滑动事件
                self.moveFlag = true;
                // 翻页
                self.setMovingEnd(e);
                // 还原state
                self.touchstartX = self.touchendX = 0;
            }
        });
    };
    MIPStorySlider.prototype.setMovingEnd = function (e) {
        var data = this.getMoveData(e);
        var move = data.move;
        var preActiveMove = data.preActiveMove;
        var nextActiveMove = data.nextActiveMove;
        var threshold = data.threshold;
        // 首先判断边界值
        if (this.setConfineEle(e)) {
            if (isPositionChange(this.currentIndex)) {
                this.setRebound();
            }

            return;
        }

        // 判断滑动的距离小于阀值-弹回
        if (Math.abs(move) <= threshold) {
            this.setRebound();
            // 恢复原状的事件处理
            this.resetReboundEndStatus();
        }
        // 判断滑动的距离大于阀值-翻页
        else {
            this.switchEnd(e);
        }
    };

    MIPStorySlider.prototype.resetMovingEndStatus = function (direction) {
        var self = this;
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        // 翻页结束后，重设页面状态
        setTimeout(function () {
            self.moveFlag = false;
            self.resetViewForSwitch(direction);
        }, +sliderTime);
    };

    MIPStorySlider.prototype.resetViewForSwitch = function (direction) {
        // 往后翻页
        var isPre = false;
        switch (direction) {
            case DIRECTIONMAP.back:
                this.nextIndex = this.currentIndex;
                this.currentIndex = this.preIndex;
                this.preIndex = this.preIndex - 1 < 0 ? this.preIndex : this.preIndex - 1;
                break;
            case DIRECTIONMAP.goto:
                isPre = true;
                this.preIndex = this.currentIndex;
                this.currentIndex = this.currentIndex + 1;
                this.nextIndex = this.currentIndex + 1 >= storyContain.length ? this.currentIndex : this.currentIndex + 1;
                break;
            default:
                break;
        }
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        // 添加current状态
        this.setCurrentPage();
        // 清除当前所有view已有的样式
        this.clearStyle();
        var preChangeIndex;
        if (this.preIndex != this.currentIndex) {
            this.setViewStatus(true, ACTIVE, preEle);
            setSliderPosition(preEle, isPre, null);
        }

        if (this.nextIndex != this.currentIndex) {
            this.setViewStatus(true, ACTIVE, nextEle);
            setSliderPosition(nextEle, !isPre, null);
        }

        this.setViewStatus(true, CURRENT, currentEle);
        setSliderPosition(currentEle, null, 0);
        var index = {
            preIndex: this.preIndex,
            currentIndex: this.currentIndex,
            nextIndex: this.nextIndex
        };
        resetSlideEndViewCB(index);
    };

    MIPStorySlider.prototype.getSwitchDirection = function (e) {
        var direction = DIRECTIONMAP.goto;
        if (e) {
            var data = this.getMoveData(e);
            var move = data.move;
            if (move >= 0) {
                direction = DIRECTIONMAP.back;
            }
        }

        return direction;
    };

    MIPStorySlider.prototype.switchEnd = function (e) {
        var self = this;
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        var isPre = false;
        var direction = this.getSwitchDirection(e);
        switch (direction) {
            case DIRECTIONMAP.back:
                setSliderPosition(preEle, null, 0);
                setTransitionDuration(preEle, sliderTime);
                break;
            case DIRECTIONMAP.goto:
                isPre = true;
                setSliderPosition(nextEle, null, 0);
                setTransitionDuration(nextEle, sliderTime);
                break;
            default:
                break;
        }
        setSliderPosition(currentEle, isPre, null);
        setTransitionDuration(currentEle, sliderTime);
        // 重新设置页面状态
        this.resetMovingEndStatus(direction);
    };

    MIPStorySlider.prototype.resetReboundEndStatus = function () {
        var self = this;
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        // 未翻页成功，页面回弹后重设页面状态
        setTimeout(function () {
            self.moveFlag = false;
            self.resetViewStyle();
        }, reboundTime);
    };

    MIPStorySlider.prototype.resetViewStyle = function () {
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        if (this.preIndex != this.currentIndex) {
            preEle.removeAttribute('style');
            setSliderPosition(preEle, true);
        }

        if (this.nextIndex != this.currentIndex) {
            nextEle.removeAttribute('style');
            setSliderPosition(nextEle, false);
        }

        currentEle.removeAttribute('style');
        if (this.currentIndex == storyContain.length - 1) {
            enableScroll(document.querySelector('.mip-backend-outer'));
            enableScroll(document.getElementsByTagName('mip-scrollbox'));
        }

    };

    MIPStorySlider.prototype.setConfineEle = function (e) {
        var data = this.getMoveData(e);
        var move = data.move;
        var isConfineEle = false;
        // 判断边界值
        // 第一页往前滑动
        if (this.currentIndex <= 0 && move > 0) {
            this.moveFlag = false;
            // 展示蒙层告知不可滑动
            showDampingCB();
            isConfineEle = true;
        }

        // 最后一页往后滑动
        if (this.currentIndex + 1 >= storyContain.length && move <= 0) {
            this.moveFlag = false;
            isConfineEle = true;
        }

        return isConfineEle;
    };

    MIPStorySlider.prototype.slideMoving = function (e) {
        var data = this.getMoveData(e);
        var move = data.move;
        var preActiveMove = data.preActiveMove;
        var nextActiveMove = data.nextActiveMove;
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        // 首先判断边界值
        if (this.setConfineEle(e)) {
            return;
        }

        // 页面的滑动
        if (this.currentIndex != this.preIndex) {
            setSliderPosition(preEle, null, preActiveMove);
        }

        if (this.currentIndex != this.nextIndex) {
            setSliderPosition(nextEle, null, nextActiveMove);
        }

        setSliderPosition(currentEle, null, move);
    };

    MIPStorySlider.prototype.getMoveData = function (e) {
        var touch = e.targetTouches[0] || e.changedTouches[0];
        var moveX = touch.pageX - this.touchstartX;
        var moveY = touch.pageY - this.touchstartY;
        var move = moveX;
        var preActiveMove = -screenWidth + moveX;
        var nextActiveMove = screenWidth + moveX;
        var threshold = SWITCHPAGE_THRESHOLD;
        if (switchPageType === SWITCHTYPES.slideY) {
            move = moveY;
            preActiveMove = -screenHeight + moveY;
            nextActiveMove = screenHeight + moveY;
            threshold = SWITCHPAGE_THRESHOLD_HEIGHT;
        }

        var data = {
            move: move,
            preActiveMove: preActiveMove,
            nextActiveMove: nextActiveMove,
            threshold: threshold
        };
        return data;
    };

    MIPStorySlider.prototype.setRebound = function (e) {
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        if (this.preIndex !== this.currentIndex) {
            setSliderPosition(preEle, true);
            setTransitionDuration(preEle, reboundTime);
        }

        if (this.nextIndex !== this.currentIndex) {
            setSliderPosition(nextEle, false);
            setTransitionDuration(nextEle, reboundTime);
        }

        setSliderPosition(currentEle, null, 0);
        setTransitionDuration(currentEle, reboundTime);
    };

    MIPStorySlider.prototype.setCurrentPage = function (status) {
        for (var i = 0; i < storyContain.length; i++) {
            if (i === this.currentIndex) {
                // 设置当前页面为current状态
                this.setViewStatus(true, CURRENT, storyContain[i]);
            }
            else {
                // 清除非当前页的current状态，确保只有一个current页
                this.setViewStatus(false, CURRENT, storyContain[i]);
            }
            // 如果当前页面原先为active状态则清除
            if (this.hasStatus(ACTIVE, storyContain[i])) {
                this.setViewStatus(false, ACTIVE, storyContain[i]);
            }

        }
    };

    MIPStorySlider.prototype.clearStyle = function () {
        for (var i = 0; i < storyContain.length; i++) {
            if (this.hasStatus(STYLE, storyContain[i])) {
                this.setViewStatus(false, STYLE, storyContain[i]);
                storyContain[i].removeAttribute(STYLE);
            }

        }
    };

    // 用来判断当前ele是否有要判断的status，例如style/current/active的状态
    MIPStorySlider.prototype.hasStatus = function (viewStatue, viewEle) {
        if (viewStatue && viewEle) {
            return viewEle.hasAttribute(viewStatue);
        }

    };

    MIPStorySlider.prototype.setViewStatus = function (isSetStatus, viewStatue, viewEle) {
        if (viewEle && viewStatue) {
            if (isSetStatus) {
                viewEle.setAttribute(viewStatue, '');
            }
            else {
                viewEle.removeAttribute(viewStatue);
            }
        }

    };

    return MIPStorySlider;
});
