/**
 * @file mip-story-slider 组件
 * @author
 */

define(function (require) {
    'use strict';

    var storyContain = [];
    var emitter;
    var viewport = require('viewport');
    var constConfig = require('./mip-story-config');
    var PAGE_ROLE = constConfig.PAGE_ROLE;
    var DIRECTIONMAP = constConfig.DIRECTIONMAP;
    var SWITCHPAGE_THRESHOLD = constConfig.SWITCHPAGE_THRESHOLD;
    var CURRENT = constConfig.PAGE_STATE.current;
    var ACTIVE = constConfig.PAGE_STATE.active;
    var storyState = require('./mip-story-state');
    var STYLE = 'style';
    var screenWidth = viewport.getWidth();
    var screenHeight = viewport.getHeight();
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

    // 翻页埋点 
    var pageViewed = [0];
    var isPageOneViewed = false;
    var pageViewedData = {
        'category': '_trackEvent',
        'action': '翻页进度',
        'optLabel': '滑动',
        'optValue': '翻了1页'
    };

    // 分享页展示次数  这里以后可能会改成推荐小故事的展示量
    var sharePageIndex = 1;
    var isSharePageViewed = false;
    var sharePagedData = {
        'category': '_trackEvent',
        'action': '翻页进度',
        'optLabel': '滑动',
        'optValue': '翻到了分享页'
    };

    // 兼容 touch 、 mouse 事件
    var dragStartBind = null;
    var dragMoveBind = null;
    var dragEndBind = null;
    var hasTouch = 'ontouchstart' in window;

    /**
     * 拖动开始
     *
     * @param {Event} e 事件对象 
     */
    function dragStart(e) {
        // 如果正处于翻页状态跳出
        if (this.moveFlag) {
            return;
        }
        var touch = hasTouch ? e.targetTouches[0] || e.changedTouches[0] : e;
        this.touchstartX = touch.pageX;
        this.touchstartY = touch.pageY;
        sliderStartCB(e);

        // 绑定事件
        storyInstanceEle.addEventListener('mousemove', dragMoveBind);
        storyInstanceEle.addEventListener('mouseup', dragEndBind);
        storyInstanceEle.addEventListener('mouseout', dragEndBind);
    }

    /**
     * 拖动中
     *
     * @param {Event} e 事件对象 
     */
    function dragMove(e) {
        // 特殊处理，分享页更多小故事滚动，禁止翻页滚动
        if (dm.contains(recommend, e.target)) {
            return;
        }

        // 如果正处于翻页状态跳出
        if (self.moveFlag) {
            return;
        }

        this.slideMoving(e);
    }

    /**
     * 拖动结束
     *
     * @param {Event} e 事件对象 
     */
    function dragEnd(e) {
        // 解绑事件
        storyInstanceEle.removeEventListener('mousemove', dragMoveBind)
        storyInstanceEle.removeEventListener('mouseup', dragEndBind);
        storyInstanceEle.removeEventListener('mouseout', dragEndBind);

        // 特殊处理，分享页更多小故事滚动，禁止翻页滚动
        if (dm.contains(recommend, e.target)) {
            return;
        }

        // 如果正处于翻页状态跳出
        if (this.moveFlag) {
            return;
        }

        var touch = hasTouch ? e.targetTouches[0] || e.changedTouches[0] : e;
        this.touchendX = touch.pageX;
        this.touchendY = touch.pageY;

        // 只是点击当前页面的内容
        if (this.touchendX == this.touchstartX && this.touchendY == this.touchstartY) {
            this.moveFlag = false;
            return;
        }

        // 关闭其他滑动事件
        this.moveFlag = true;
        // 翻页
        this.setMovingEnd(e);
        // 还原state
        this.touchstartX = this.touchendX = 0;
    }

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
        sharePageIndex = storyContain.length - 1;
        // story的自定义事件监控器
        emitter = storyInstance.emitter;
        // 翻页的交互类型
        // 翻页的页面state
        this.viewLength = storyContain.length - 1;
        var pageState = storyState.getPageStateIndex(this.viewLength);
        this.hasPreload = storyState.getPreloadIndex(this.viewLength);
        this.preIndex = pageState[0];
        this.currentIndex = pageState[1];
        this.nextIndex = pageState[2];

        var index = {
            preIndex: this.preIndex,
            currentIndex: this.currentIndex,
            nextIndex: this.nextIndex,
            direction: this.direction === DIRECTIONMAP.back ? 0 : 1
        };
        resetSlideEndViewCB(index);

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
                ele.style.webkitTransform = 'translate(' + changemove + 'px, 0)';
            } else {
                ele.style.transform = 'translate(0, ' + changemove + 'px)';
                ele.style.webkitTransform = 'translate(0, ' + changemove + 'px)';
            }
        }
        // 设置翻页前的前一页和后一页的位置
        else {
            if (switchPageType == SWITCHTYPES.slideX) {
                ele.style.transform = 'translate(' + width + 'px, 0)';
                ele.style.webkitTransform = 'translate(' + width + 'px, 0)';
            } else {
                ele.style.webkitTransform = 'translate(0, ' + height + 'px)';
            }
        }
    }

    function setTransitionDuration(ele, time) {
        ele.style.transition = 'transform ' + time + 'ms ease';
        ele.style.webkitTransition = 'transform ' + time + 'ms ease';
    }

    MIPStorySlider.prototype.build = function () {
        // 初始化段落布局
        this.initViewForSlider();
        this.bindEvent();
        recommend = storyInstanceEle.querySelector('.recommend');
    };
    MIPStorySlider.prototype.bindEvent = function () {
        // 绑定this对象
        dragStartBind = dragStart.bind(this);
        dragMoveBind = dragMove.bind(this);
        dragEndBind = dragEnd.bind(this);

        // 开始滑动
        this.sliderStart();
        // 滑动中
        this.sliding();
        // 结束滑动
        this.sliderEnd();
    };

    // 初始化view的最初排布
    MIPStorySlider.prototype.initViewForSlider = function () {
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        // 添加current状态
        this.setCurrentPage();
        // 清除当前所有view已有的样式
        this.clearStyle();
        if (storyContain.length >= 2) {
            nextEle = storyContain[this.nextIndex];
            preEle = storyContain[this.preIndex];
            this.setViewStatus(true, ACTIVE, nextEle);
            this.setViewStatus(true, ACTIVE, preEle);
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
        if (hasTouch) {
            storyInstanceEle.addEventListener('touchstart', dragStartBind);
        } else {
            storyInstanceEle.classList.add('mip-story-pc');
            storyInstanceEle.addEventListener('mousedown', dragStartBind);
        }
    };

    MIPStorySlider.prototype.sliding = function () {
        var self = this;
        // 对story进行手势的监控
        storyInstanceEle.addEventListener('touchmove', dragMoveBind);
    };

    MIPStorySlider.prototype.sliderEnd = function () {
        var self = this;
        // 对story进行手势的监控
        storyInstanceEle.addEventListener('touchend', dragEndBind);
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
            self.resetViewForSwitch(direction || DIRECTIONMAP.goto);
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
            nextIndex: this.nextIndex,
            direction: this.direction === DIRECTIONMAP.back ? 0 : 1
        };
        resetSlideEndViewCB(index);
    };

    MIPStorySlider.prototype.getSwitchDirection = function (e) {
        this.direction = DIRECTIONMAP.goto;
        if (e) {
            var data = this.getMoveData(e);
            var move = data.move;
            if (move >= 0) {
                this.direction = DIRECTIONMAP.back;
            }
        }

        // return direction;
    };

    MIPStorySlider.prototype.switchEnd = function (e) {
        var self = this;
        var preEle = storyContain[this.preIndex];
        var currentEle = storyContain[this.currentIndex];
        var nextEle = storyContain[this.nextIndex];
        var isPre = false;
        this.getSwitchDirection(e);
        switch (self.direction) {
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
        this.resetMovingEndStatus(self.direction);
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
        if (this.currentIndex === storyContain.length - 1) {
            // 安卓下 有问题，这段逻辑去掉了
            // enableScroll(storyInstanceEle.querySelector('.mip-backend-outer'));
            // enableScroll(storyInstanceEle.getElementsByTagName('mip-scrollbox'));
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
        var touch = hasTouch ? e.targetTouches[0] || e.changedTouches[0] : e;

        var moveX = touch.pageX - this.touchstartX;
        var moveY = touch.pageY - this.touchstartY;
        var move = moveX;
        var preActiveMove = -screenWidth + moveX;
        var nextActiveMove = screenWidth + moveX;
        var threshold = SWITCHPAGE_THRESHOLD.horizontal;
        if (switchPageType === SWITCHTYPES.slideY) {
            move = moveY;
            preActiveMove = -screenHeight + moveY;
            nextActiveMove = screenHeight + moveY;
            threshold = SWITCHPAGE_THRESHOLD.vertical;
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
        var storyContainLength = storyContain.length;
        for (var i = 0; i < storyContainLength; i++) {
            var currentPage = storyContain[i];
            if (i === this.currentIndex) {
                storyState.setState(i);
                // 埋点
                if (window._hmt && pageViewed.indexOf(i) === -1) {
                    var pageRole = currentPage.getAttribute('page-role');
                    this.triggerStats(i, pageRole);
                }
                this.setPreload(i);
                // 设置当前页面为current状态
                this.setViewStatus(true, CURRENT, currentPage);
            } else {
                // 清除非当前页的current状态，确保只有一个current页
                this.setViewStatus(false, CURRENT, currentPage);
            }
            // 如果当前页面原先为active状态则清除
            if (this.hasStatus(ACTIVE, currentPage)) {
                this.setViewStatus(false, ACTIVE, currentPage);
            }
            
        }
    };

    // 设置预加载
    MIPStorySlider.prototype.setPreload = function (index) {
        var loaded = this.hasPreload;
        var maxIndex = loaded[loaded.length - 1];
        var minIndex = loaded[0];

        if (maxIndex >= this.viewLength - 2) {
            var storyImgs = storyContain[this.viewLength].querySelectorAll('mip-story-img');
            for (var index = 0; index < storyImgs.length; index++) {
                storyImgs[index].setAttribute('preload', '');
            }
        }

        if (!this.direction) {
            return;
        }

        if (this.direction === 'goto' && maxIndex < this.viewLength - 1) {
            var nextIndex = maxIndex + 1;
            if (loaded.indexOf(nextIndex) !== -1) {
                return;
            }
            storyContain[nextIndex].setAttribute('preload', '');
            this.hasPreload.push(nextIndex);
            return;
        } 

        if (minIndex > 0) {
            var preIndex = minIndex - 1;
            storyContain[preIndex].setAttribute('preload', '');
            this.hasPreload.splice(0, 0, preIndex);
            return;
        }

        return;
    }

    /**
     * 处理翻页统计逻辑
     *
     * @param {Number} pageIndex 页数下标
     */
    MIPStorySlider.prototype.triggerStats = function (pageIndex, role) {
        // 分享页单独统计
        if (role === PAGE_ROLE.sharePage && !isSharePageViewed) {
            isSharePageViewed = true;
            return this.trackEvent(sharePagedData);
        }

        // 这里主要是 保证第一页发送的时机
        if (!isPageOneViewed) {
            isPageOneViewed = true;
            this.trackEvent(pageViewedData);
        }

        // 分享页不计入翻页
        if (role === PAGE_ROLE.sharePage) {
            return;
        }
        pageViewed.push(pageIndex);
        var pageViewedInfo = '翻了' + (+pageViewed[pageIndex] + 1) + '页';
        pageViewedData.optValue = pageViewedInfo;
        this.trackEvent(pageViewedData);
    }

    /**
     * 判断当前也是否为分享页
     *
     * @param {Number} pageIndex 页数下标
     * @return {boolean} 是否为分享页 
     */
    MIPStorySlider.prototype.isSharePage = function (pageIndex) {
      return pageIndex === sharePageIndex ? true : false
    }

    /**
     * 百度统计 自定义事件
     *
     * @param {Object} obj  统计事件对象
     */
    MIPStorySlider.prototype.trackEvent = function (obj) {
        var label = obj.optLabel || '';
        var value = obj.optValue || '';
        window._hmt.push([obj.category, obj.action, label, value]);
    }

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
            } else {
                viewEle.removeAttribute(viewStatue);
            }
        }

    };

    return MIPStorySlider;
});
