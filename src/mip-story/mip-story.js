/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var MUTE = 'mute';
    var SWIP = 'swip';
    var UNMUTE = 'unmute';
    var REPLAY = 'replay';
    var SWITCHPAGE = 'switchpage';
    var SHOWBOOKEND = 'showbookend';
    var CLOSEBOOKEND = 'closebookend';
    var TAPNAVIGATION = 'tapnavigation';
    var SHOWNOPREVIOUSPAGEHELP = 'shownopreviouspagehelp';
    var VISIBILITYCHANGE = 'visibilitychange';
    var MIP_I_STORY_STANDALONE = 'mip-i-story-standalone';

    require('./mip-story-view');
    require('./mip-story-layer');
    var Audio = require('./audio');
    var ShareLayer = require('./mip-story-share');
    var HintLayer = require('./mip-story-hint');
    var BookEnd = require('./mip-story-bookend');
    var customElement = require('customElement').create();
    var util = require('util');
    var dm = util.dom;
    var EventEmitter = util.EventEmitter;
    var Gesture = util.Gesture;
    var Progress = require('./mip-progress');
    var storyViews = [];

    function MIPStory(element) {
        this.element = element;
        this.win = window;
        this.muted = true;
        this.currentIndex = this.preInex = 0;
    }

    MIPStory.prototype.init = function () {
        var html = this.win.document.documentElement;
        html.setAttribute('id', MIP_I_STORY_STANDALONE);
        // 初始化音频
        this.initAudio();
        // 保存 story views
        this.initStoryViews();
        // 初始化进度条
        this.initProgress();
        // 初始化结尾页
        this.initBookend();
        // // 初始化引导页
        this.initHintLayer();
        // 初始化分享页面
        this.initShare();
        // 绑定事件
        this.initEvent();
        // 切换到第一页
        this.switchTo({status: 1, notIncrease: 1});
    };

    MIPStory.prototype.initAudio = function () {
        var au = this.element.getAttribute('background-audio');
        if (au) {
            this.audio = new Audio().build(this.element, au);
        }
    };

    MIPStory.prototype.initShare = function () {
        this.share = new ShareLayer();
        var html = dm.create(this.share.build());
        this.element.appendChild(html);
    };

    MIPStory.prototype.initHintLayer = function () {
        this.hint = new HintLayer();
        var html = dm.create(this.hint.build());
        this.element.appendChild(html);
    };

    MIPStory.prototype.initEvent = function () {
        var self = this;
        var gesture = new Gesture(this.element, {});
        // 绑定点击事件
        this.element.addEventListener('click', function (e) {
            self.emitter.trigger(TAPNAVIGATION, e);
        });
        // 页面切换到后台
        document.addEventListener(VISIBILITYCHANGE, function (e) {
            self.emitter.trigger(VISIBILITYCHANGE, e);
        });
        // 绑定点击事件
        gesture.on('swipe', function (e, data) {
            if (data.swipeDirection === 'left') {
                self.emitter.trigger(SWITCHPAGE, {e: e, status: 1});
            }
            else if (data.swipeDirection === 'right') {
                self.emitter.trigger(SWITCHPAGE, {e: e, status: 0});
            }
        });

        // 阻止在尾页时滑动切换
        new Gesture(this.element.querySelector('.mip-backend'), {}).on('swipe', function (event) {
            event.stopPropagation();
        });

        // 初始化自定义事件
        self.bindEvent();
    };

    MIPStory.prototype.visibilitychange = function (e) {
        var hiddenProperty = 'hidden' in document ? 'hidden'
            : 'webkitHidden' in document ? 'webkitHidden'
            : 'mozHidden' in document ? 'mozHidden' : null;
        var currentEle = storyViews[this.currentIndex];
        if (document[hiddenProperty]) {
            this.pauseGlobalAudio();
            currentEle.customElement.pauseAllMedia();
        }
        else {
            this.playGlobalAudio();
            currentEle.customElement.resumeAllMedia();
        }
    };

    MIPStory.prototype.initBookend = function () {
        this.bookEnd = new BookEnd();
        var html = dm.create(this.bookEnd.build());
        this.element.appendChild(html);
    };

    MIPStory.prototype.initProgress = function () {
        if (this.progress) {
            return;
        }
        this.progress = new Progress(this.element, storyViews);
        var html = dm.create(this.progress.build());
        this.element.appendChild(html);
        this.progress.updateProgress(0, 1);
    };

    MIPStory.prototype.initStoryViews = function () {
        storyViews = this.element.querySelectorAll('mip-story-view');
    };

    MIPStory.prototype.bindEvent = function () {
        this.emitter = new EventEmitter();
        this.emitter.on(MUTE, this.mute.bind(this));
        // this.emitter.on(SWIP, this.swip.bind(this));
        this.emitter.on(UNMUTE, this.unmute.bind(this));
        this.emitter.on(REPLAY, this.replay.bind(this));
        this.emitter.on(TAPNAVIGATION, this.tapnavigation.bind(this));
        this.emitter.on(SWITCHPAGE, this.switchTo.bind(this));
        this.emitter.on(SHOWBOOKEND, this.showbookend.bind(this));
        this.emitter.on(CLOSEBOOKEND, this.closebookend.bind(this));
        this.emitter.on(VISIBILITYCHANGE, this.visibilitychange.bind(this));
        this.emitter.on(SHOWNOPREVIOUSPAGEHELP, this.shownopreviouspagehelp.bind(this));
    };

    // MIPStory.prototype.swip = function (e) {
    //     if (e.data.swipeDirection === 'left'
    //         || e.data.swipeDirection === 'right') {
    //         var backend = document.querySelector('.mip-backend');
    //         if (dm.contains(backend, e.target)) {
    //             return;
    //         }
    //         this.hint.toggleSystemLater();
    //     }
    // };

    MIPStory.prototype.tapnavigation = function (e) {
        e.stopPropagation();
        var backend = document.querySelector('.mip-backend');
        var replay = document.querySelector('.mip-backend-preview');
        var shareBtn = document.querySelector('.mip-backend-share');
        var shareArea = document.querySelector('.mip-story-share');
        var cancelBtn = document.querySelector('.mip-story-share-cancel');
        var back = document.querySelector('.mip-story-close');
        var audio = document.querySelector('.mip-stoy-audio');
        // 返回上一页
        if (e.target === back) {
            history.back();
            return;
        }
        // 静音控制
        if (e.target === audio) {
            var enabled = audio.hasAttribute('muted');
            enabled ? this.emitter.trigger(UNMUTE, e)
                : this.emitter.trigger(MUTE, e);
            return;
        }
        // 重头开始播放
        if (dm.contains(replay, e.target)) {
            this.emitter.trigger(REPLAY);
            return;
        }
        // 结尾页点击逻辑
        else if (dm.contains(backend, e.target)) {
            // 弹出分享
            if (dm.contains(shareBtn, e.target)) {
                this.share.showShareLayer();
            }
            // 关闭结尾页
            else {
                this.emitter.trigger(CLOSEBOOKEND);
            }
            return;
        }
        // 分享点击
        else if (dm.contains(shareArea, e.target)) {
            // 关闭分享界面
            if (e.target === cancelBtn) {
                this.share.hideShareLayer();
            }
            return;
        }

        // 翻页逻辑
        // var centerX = (this.element.offsetLeft + this.element.offsetWidth) / 2;
        // // 向右切换
        // if (e.pageX > centerX) {
        //     this.emitter.trigger(SWITCHPAGE, {e: e, status: 1});
        // }
        // // 向左切换
        // else {
        //     this.emitter.trigger(SWITCHPAGE, {e: e, status: 0});
        // }
    };

    MIPStory.prototype.setActive = function (status) {
        for (var i = 0; i < storyViews.length; i++) {
            if (i === this.currentIndex) {
                storyViews[i].setAttribute('active', '');
            }
            else {
                storyViews[i].removeAttribute('active');
            }
        }
    };

    MIPStory.prototype.switchTo = function (data) {
        this.hint.hideDamping();
        this.hint.hideSystemLater();

        if (data.status === 0 && this.currentIndex <= 0) {
            this.emitter.trigger(SHOWNOPREVIOUSPAGEHELP);
            return;
        }
        else if (!data.notIncrease && data.status === 1
            && this.currentIndex + 1 >= storyViews.length) {
            this.emitter.trigger(SHOWBOOKEND);
            return;
        }
        if (!data.notIncrease) {
            data.status === 1 ? this.currentIndex++ : this.currentIndex--;
        }
        var currentEle = storyViews[this.currentIndex];
        var preEle = storyViews[this.preInex];
        if (this.currentIndex !== this.preInex) {
            preEle.customElement.setActive(false, this.muted);
        }
        currentEle.customElement.setActive(true, this.muted);
        this.progress.updateProgress(this.currentIndex, data.status);
        this.preInex = this.currentIndex;

        // 右翻
        if (!data.notIncrease) {
            if (data.status === 1) {
                this.hint.showPageSwitchLayer();
            }
            else {
                this.hint.hidePageSwitchLayer();
            }
        }
    };

    MIPStory.prototype.showbookend = function () {
        this.bookEnd.show();
    };

    MIPStory.prototype.closebookend = function () {
        this.bookEnd.hide();
        this.share.hideShareLayer();
    };

    MIPStory.prototype.muteGlobalAudio = function () {
        if (this.audio) {
            this.audio.pause();
            this.audio.muted = true;
        }
    };

    MIPStory.prototype.unMuteGlobalAudio = function () {
        if (this.audio) {
            this.audio.play();
            this.audio.muted = false;
        }
    };

    MIPStory.prototype.playGlobalAudio = function () {        
        if (this.audio && !this.muted) {
            this.audio.play();
        }
    };

    MIPStory.prototype.pauseGlobalAudio = function () {
        if (this.audio) {
            this.audio.pause();
        }
    };

    MIPStory.prototype.mute = function (e) {
        this.muted = true;
        this.muteGlobalAudio();
        var ele = storyViews[this.currentIndex];
        ele.customElement.toggleAllMedia(e, this.muted);
        e.target.setAttribute('muted', '');
    };

    MIPStory.prototype.unmute = function (e) {
        this.muted = false;
        this.unMuteGlobalAudio();
        this.playGlobalAudio();
        var ele = storyViews[this.currentIndex];
        ele.customElement.toggleAllMedia(e, this.muted);
        e.target.removeAttribute('muted');
    };

    MIPStory.prototype.replay = function () {
        this.currentIndex = 0;
        this.preInex = storyViews.length - 1;
        this.switchTo({status: 1, notIncrease: 1});
        this.emitter.trigger(CLOSEBOOKEND);
    };

    MIPStory.prototype.shownopreviouspagehelp = function () {
        this.hint.showDamping();
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var mipStory = new MIPStory(this.element);
        mipStory.init();
    };

    return customElement;
});
