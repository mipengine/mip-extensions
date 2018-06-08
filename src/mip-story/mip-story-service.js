/**
 * @file mip-story-service 组件
 * @author
 */

define(function (require) {
    'use strict';

    var storyContain = [];
    var storyViews = [];
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
    var SWITCHPAGE_THRESHOLD_Height = viewport.getHeight() * 0.4;
    var SWITCHTYPES = {
        click: 'click',
        slideX: 'slideX',
        slideY: 'slideY',
        autoPlay: 'autoPlay'
    };
    var switchPageType = SWITCHTYPES.slideX;
    var Slider = require('./mip-story-slider');
    var slider;

    var ClickSwitch = require('./mip-story-clickSwitch');
    var clickSwitch;

    var util = require('util');
    var dm = util.dom;
    var EventEmitter = util.EventEmitter;

    var OPENAUTOPLAY = 'openAutoplay';
    var UNMUTE = 'unmute';
    var MUTE = 'mute';
    var TAPNAVIGATION = 'tapnavigation';
    var REPLAY = 'replay';
    var VISIBILITYCHANGE = 'visibilitychange';
    var CREATSLIDER = 'creatSlider';
    var CLICKSWITCH = 'clickSwitch';
    var SWITCHPAGE = 'switchPage';
    var reload;


    function MIPStoryService(storyInstance) {
        // story的实例
        this.storyInstance = storyInstance;
        this.audio = storyInstance.audio;
        this.share = storyInstance.share;
        this.viewMuted = storyInstance.viewMuted;
        this.bookEnd = storyInstance.bookEnd;
        this.progress = storyInstance.progress;
        this.hint = storyInstance.hint;
        // story中每个页面包括分享页
        storyContain = storyInstance.storyContain;
        storyViews = storyInstance.storyViews;
        this.preIndex = this.currentIndex = this.nextIndex = 0;
        this.preEle = storyViews[this.preIndex].customElement;
        this.currentEle = storyViews[this.currentIndex].customElement;
        this.nextEle = storyViews[this.nextIndex].customElement;
    }

    MIPStoryService.prototype.build = function () {
        // 初始化滑动组件
        var self = this;
        reload = this.storyInstance.element.hasAttribute('audio-reload');
        // 进行事件的监听；
        this.bindEvent();
        // 左右或者上下翻页
        if (switchPageType == SWITCHTYPES.slideX || switchPageType == SWITCHTYPES.slideY) {
            self.emitter.trigger(CREATSLIDER);
        }
        // 点击翻页
        else if (switchPageType == SWITCHTYPES.click) {
            self.emitter.trigger(CLICKSWITCH);
        }
        // 页面切换到后台
        document.addEventListener(VISIBILITYCHANGE, function (e) {
            self.emitter.trigger(VISIBILITYCHANGE, e);
        });
        this.storyInstance.element.addEventListener('click', function (e) {
            self.emitter.trigger(TAPNAVIGATION, e);
        });
    };

    MIPStoryService.prototype.clickSwitch = function () {
        var self = this;
        var clickSwitchParam = {
            storyInstance: this.storyInstance,
            showDamping: this.showDamping.bind(this),
            clickSwitchEnd: this.clickSwitchEnd.bind(this),
            isShowSwitchLayer: this.isShowSwitchLayer.bind(this)
        }
        clickSwitch = new ClickSwitch(clickSwitchParam);
        clickSwitch.build();
    };

    MIPStoryService.prototype.clickSwitchEnd = function (data) {
        this.preIndex = data.preIndex;
        this.currentIndex = data.currentIndex;
        if (this.currentIndex !== this.preIndex) {
            storyViews[this.preIndex].customElement.setAllMedia(false, this.viewMuted, reload, this.emitter);
        }
        storyViews[this.currentIndex].customElement.setAllMedia(true, this.viewMuted, reload, this.emitter);
        this.progress.updateProgress(this.currentIndex, data.status);
    }

    MIPStoryService.prototype.isShowSwitchLayer = function (data) {
        if (data.status === 1) {
            this.hint.showPageSwitchLayer();
        }
        else {
            this.hint.hidePageSwitchLayer();
        }
    }

    MIPStoryService.prototype.creatSlider = function () {
        var self = this;
        var sliderParam = {
            storyInstance: this.storyInstance,
            switchPageType: switchPageType,
            SWITCHTYPES: SWITCHTYPES,
            initfirstViewStatus: this.initfirstViewStatus.bind(this),
            openAutoplay: this.openAutoplay.bind(this),
            resetSlideEndView: this.resetSlideEndView.bind(this),
            showDamping: this.showDamping.bind(this)
        };
        slider = new Slider(sliderParam);
        slider.build();
    }

    MIPStoryService.prototype.showDamping = function () {
        this.hint.showDamping();
    }
    MIPStoryService.prototype.resetSlideEndView = function (index) {
        this.preIndex = index.preIndex;
        this.currentIndex = index.currentIndex;
        this.nextIndex = index.nextIndex;
        if (this.preIndex != this.currentIndex) {
            storyViews[this.preIndex].customElement.setPreActive(this.emitter);
            storyViews[this.preIndex].customElement.setAllMedia(false, this.viewMuted, reload, this.emitter);
        }
        if (this.nextIndex != this.currentIndex && this.nextIndex <= storyViews.length - 1) {
            storyViews[this.nextIndex].customElement.setPreActive(this.emitter);
            storyViews[this.nextIndex].customElement.setAllMedia(false, this.viewMuted, reload, this.emitter);
        }
        if (this.currentIndex + 1 < storyContain.length) {
            storyViews[this.currentIndex].customElement.setAllMedia(true, this.viewMuted, reload, this.emitter);
            storyViews[this.currentIndex].customElement.setCssMedia(true, this.viewMuted, this.emitter);
            this.progress.updateProgress(this.currentIndex, 1);
        }
        this.clearCssMedia();
    }

    MIPStoryService.prototype.initfirstViewStatus = function (index) {
        this.preIndex = index.preIndex;
        this.currentIndex = index.currentIndex;
        this.nextIndex = index.nextIndex;
        // 激活当前页的的多媒体
        storyViews[this.currentIndex].customElement.setAllMedia(true, this.viewMuted, reload, this.emitter);
        storyViews[this.currentIndex].customElement.setCssMedia(true, this.viewMuted, this.emitter);
        // 初始化下一页的动画效果
        storyViews[this.nextIndex].customElement.setPreActive(this.emitter);
        // 清除其余所有页面的动画
        this.clearCssMedia();
    }

    MIPStoryService.prototype.clearCssMedia = function () {
        for (var i = 0; i < storyViews.length; i++) {
            if (i != this.preIndex && i != this.currentIndex && i != this.nextIndex) {
                // 由于CSS3中动画效果在翻页过程中会丢掉第一帧，此处的动画控制放到view的组件中控制
                storyViews[i].customElement.clearCssMedia();
            }
        }
    }

    MIPStoryService.prototype.bindEvent = function () {
        this.emitter = new EventEmitter();
        this.emitter.on(OPENAUTOPLAY, this.openAutoplay.bind(this));
        this.emitter.on(MUTE, this.mute.bind(this));
        this.emitter.on(UNMUTE, this.unmute.bind(this));
        this.emitter.on(TAPNAVIGATION, this.tapnavigation.bind(this));
        this.emitter.on(REPLAY, this.replay.bind(this));
        this.emitter.on(VISIBILITYCHANGE, this.visibilitychange.bind(this));
        this.emitter.on(CREATSLIDER, this.creatSlider.bind(this));
        this.emitter.on(CLICKSWITCH, this.clickSwitch.bind(this));
        this.emitter.on(SWITCHPAGE, this.switchPage.bind(this));
    };

    MIPStoryService.prototype.switchPage = function (param) {
        if (switchPageType == SWITCHTYPES.click && clickSwitch) {
            clickSwitch.switchTo(param);
        }
        if (switchPageType != SWITCHTYPES.click && slider) {
            slider.switchEnd();
        }
    }

    MIPStoryService.prototype.tapnavigation = function (e) {
        e.stopPropagation();
        var backend = document.querySelector('.mip-backend');
        var replay = document.querySelector('.mip-backend-preview');
        var shareBtn = document.querySelector('.mip-backend-share');
        var shareArea = document.querySelector('.mip-story-share');
        var cancelBtn = document.querySelector('.mip-story-share-cancel');
        var back = 'mip-story-close';
        var audio = document.querySelector('.mip-stoy-audio');
        var recommend = document.querySelector('.recommend');
        var shareAreaShow = document.querySelector('.mip-story-share-show');
        if (!dm.contains(shareArea, e.target) && shareAreaShow) {
            this.share.hideShareLayer();
            return;
        }
        // 推荐
        if (dm.contains(recommend, e.target)) {
            var ele = document.querySelector('.item-from');
            var src = e.target.getAttribute('data-src');
            if (e.target.nodeName.toLocaleLowerCase() === 'a' && ele != e.target) {
                var href = e.target.getAttribute('href');
                e.preventDefault();
                window.top.location.href = href;
                return;
            }
            if (ele === e.target && src) {
                e.preventDefault();
                window.top.location.href = src;
            }
            return;
        }
        // 返回上一页
        if (this.hasClass(e, back)) {
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
            this.progress.updateProgress(0, 1);
            return;
        }
        // 结尾页点击逻辑
        else if (dm.contains(backend, e.target)) {
            // 弹出分享
            if (dm.contains(shareBtn, e.target)) {
                this.share.showShareLayer();
            }
            // 关闭结尾页-只有点击交互的时候触发
            else if (switchPageType == SWITCHTYPES.click) {
                clickSwitch.goback();
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
        // 如果视频/音频不能 autoplay，则主动触发
        if (!this.muted) {
            this.emitter.trigger(UNMUTE, e);
        }
        // 点击翻页的逻辑处理
        if (switchPageType == SWITCHTYPES.click && clickSwitch) {
            var self = this;
            clickSwitch.switchPage(e);
        }
    };

    MIPStoryService.prototype.hasClass = function (e, clsName) {
        var reg = new RegExp('\\s*' + clsName + '\\s*');
        return !!reg.exec(e.target.className);
    };

    MIPStoryService.prototype.replay = function () {
        var self = this;
        if (switchPageType == SWITCHTYPES.click) {
            clickSwitch = null;
            clickSwitch = new ClickSwitch(this.storyInstance);
            clickSwitch.initViewForSwitch(function (activeType, data) {
                self.clickSwitchTo(activeType, data);
            });
            clickSwitch.closebookend();
            this.share.hideShareLayer();
            return;
        }
        slider.initViewForSwitch(function (preIndex, currentIndex, nextIndex) {
            self.initfirstViewStatus(preIndex, currentIndex, nextIndex);
        });
        this.replayBookEnd();
    };

    MIPStoryService.prototype.replayBookEnd = function () {
        this.share.hideShareLayer();
    };

    MIPStoryService.prototype.openAutoplay = function (e) {
        // 如果视频/音频不能 autoplay，则主动触发
        if (!this.muted) {
            // 打开全局音频
            this.unMuteGlobalAudio();
            this.playGlobalAudio();
            e.target.removeAttribute('muted');
            // 初始化下一页的音频或者视频
            // 暂停下一页的视频
            if (this.nextIndex <= storyViews.length - 1) {
                storyViews[this.nextIndex].customElement.muteAllMedia();
            }
            if (this.preIndex != this.currentIndex) {
                storyViews[this.preIndex].customElement.muteAllMedia();
            }
        }
    }

    MIPStoryService.prototype.unmute = function (e) {
        this.muted = false;
        this.viewMuted = false;
        this.unMuteGlobalAudio();
        this.playGlobalAudio();
        if (this.currentIndex <= storyViews.length - 1) {
            var ele = storyViews[this.currentIndex];
            ele.customElement.toggleAllMedia(e, this.viewMuted);
        }
        e.target.removeAttribute('muted');
    };

    MIPStoryService.prototype.mute = function (e) {
        this.muted = true;
        this.viewMuted = true;
        this.muteGlobalAudio();
        if (this.currentIndex <= storyViews.length - 1) {
            var ele = storyViews[this.currentIndex];
            ele.customElement.toggleAllMedia(e, this.viewMuted);
        }
        e.target.setAttribute('muted', '');
    };

    MIPStoryService.prototype.muteGlobalAudio = function () {
        if (this.audio) {
            this.audio.pause();
            this.audio.muted = true;
        }
    };

    MIPStoryService.prototype.unMuteGlobalAudio = function () {
        if (this.audio) {
            this.audio.play();
            this.audio.muted = false;
        }
    };

    MIPStoryService.prototype.playGlobalAudio = function () {
        if (this.audio && !this.muted) {
            this.audio.play();
        }
    };

    MIPStoryService.prototype.visibilitychange = function (e) {
        var hiddenProperty = 'hidden' in document ? 'hidden'
            : 'webkitHidden' in document ? 'webkitHidden'
                : 'mozHidden' in document ? 'mozHidden' : null;
        if (this.currentIndex <= storyViews.length - 1) {
            var currentEle = storyViews[this.currentIndex];
            if (document[hiddenProperty]) {
                this.pauseGlobalAudio();
                currentEle.customElement.pauseAllMedia();
            }
            else {
                this.playGlobalAudio();
                currentEle.customElement.resumeAllMedia();
            }
        }
    };

    MIPStoryService.prototype.pauseGlobalAudio = function () {
        if (this.audio) {
            this.audio.pause();
        }
    };


    return MIPStoryService;
});
