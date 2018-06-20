/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var MIP_I_STORY_STANDALONE = 'mip-i-story-standalone';

    var customElement = require('customElement').create();
    require('./mip-story-view');
    require('./mip-story-layer');
    var Audio = require('./audio');
    var ShareLayer = require('./mip-story-share');
    var HintLayer = require('./mip-story-hint');
    var BookEnd = require('./mip-story-bookend');
    var animatePreset = require('./animate-preset');
    var util = require('util');
    var dm = util.dom;
    var EventEmitter = util.EventEmitter;
    var Gesture = util.Gesture;
    var Progress = require('./mip-progress');
    var storyViews = [];
    var storyContain = [];
    var viewport = require('viewport');
    var $ = require('zepto');
    var SWITCHPAGE_THRESHOLD = viewport.getWidth() * 0.15;
    var SWITCHPAGE_THRESHOLD_Height = viewport.getHeight() * 0.4;
    var Service = require('./mip-story-service');
    var service;
    var isCssCplor = require('./mip-story-util').isCssCplor;

    function MIPStory(element) {
        this.element = element;
        this.win = window;
        this.storyViews = [];
        this.storyContain = [];
    }

    MIPStory.prototype.getConfigData = function () {

        var configData = this.element.querySelector('mip-story > script[type="application/json"]');

        try {
            return JSON.parse(configData.innerText);
        }
        catch (e) {
            console.error(e);
        }
        return {};
    };

    MIPStory.prototype.initAudio = function () {
        var au = this.element.getAttribute('background-audio');
        if (au) {
            this.audio = new Audio().build(this.element, au);
        }

        this.muted = false;
        this.viewMuted = !!(this.muted || this.audio);
    };

    MIPStory.prototype.initBookend = function (storyConfig) {
        this.bookEnd = new BookEnd(storyConfig);
        var html = dm.create(this.bookEnd.build());
        this.element.appendChild(html);
    };

    MIPStory.prototype.initStoryViews = function () {
        this.storyViews = this.element.querySelectorAll('mip-story-view');
    };

    MIPStory.prototype.initStoryContain = function () {
        this.bookEndContainer = document.querySelector('.mip-backend');
        for (var index = 0; index < this.storyViews.length; index++) {
            this.storyContain.push(this.storyViews[index].customElement.element);
        }
        this.storyContain.push(this.bookEndContainer);
    };

    MIPStory.prototype.initHintLayer = function (element) {
        this.hint = new HintLayer(element);
        var html = dm.create(this.hint.build());
        this.element.appendChild(html);
    };

    MIPStory.prototype.initShare = function (storyConfig, element) {
        var shareConfig = storyConfig.share || {};
        this.share = new ShareLayer(shareConfig, element);
        var html = dm.create(this.share.build());
        this.element.appendChild(html);
    };

    MIPStory.prototype.initService = function () {
        service = new Service(this);
        service.build();
    };

    MIPStory.prototype.initProgress = function () {
        if (this.progress) {
            return;
        }

        var audioHide = this.element.hasAttribute('audio-hide');
        this.progress = new Progress(this.element, this.storyViews, audioHide);
        var html = dm.create(this.progress.build());
        this.element.appendChild(html);
        this.progress.updateProgress(0, 1);
    };

    MIPStory.prototype.setSubjectColor = function () {
        var subjectColor =  this.element.getAttribute('background') || '';
        if (subjectColor && isCssCplor(subjectColor)) {
            this.element.style.backgroundColor = subjectColor;
        }
    }

    // story组件的初始化
    MIPStory.prototype.init = function () {
        var element = this.element;
        var html = this.win.document.documentElement;
        var mipStoryConfigData = this.getConfigData();
        // 设置小故事的主题色
        this.setSubjectColor();
        html.setAttribute('id', MIP_I_STORY_STANDALONE);
        // 初始化音频
        this.initAudio();
        // 初始化结尾页
        this.initBookend(mipStoryConfigData);
        // 保存 story-views到storyViews中便于后期操作
        this.initStoryViews();
        // 保存包括封底页面在内的所有结果页
        this.initStoryContain();
        // 初始化引导页
        this.initHintLayer(element);
        // 初始化分享页面
        this.initShare(mipStoryConfigData, element);
        // 初始化导航
        this.initProgress();
        // 初始化story的Slider
        this.initService();
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var mipStory = new MIPStory(this.element);
        require('./web-animation');
        mipStory.init();
    };

    return customElement;
});
