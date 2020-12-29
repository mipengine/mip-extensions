/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    require('./mip-story-view');
    require('./mip-story-layer');
    var TcLog = require('./mip-story-log');
    var constConfig = require('./mip-story-config');
    var MIP_I_STORY_STANDALONE = constConfig.MIP_I_STORY_STANDALONE;
    var Audio = require('./audio');
    var ShareLayer = require('./mip-story-share');
    var HintLayer = require('./mip-story-hint');
    var BookEnd = require('./mip-story-bookend');
    var animatePreset = require('./animate-preset');
    var util = require('util');
    var platform = util.platform;
    var dm = util.dom;
    var EventEmitter = util.EventEmitter;
    var Gesture = util.Gesture;
    var Progress = require('./mip-progress');
    var storyViews = [];
    var storyContain = [];
    var viewport = require('viewport');
    var viewer = require('viewer');
    var $ = require('zepto');
    var Service = require('./mip-story-service');
    var service;
    var isCssColor = require('./mip-story-util').isCssColor;

    function MIPStory(element) {
        this.element = element;
        this.win = window;
        this.storyViews = [];
        this.storyContain = [];
    }

    function loadScript (url) {
        var d = document;
        var s = d.createElement('script');
        s.src = url;
        (d.body || d.documentElement).appendChild(s)
    };

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

    MIPStory.prototype.initBaseTcData = function () {
        var data = {};
        data.pageLen = this.storyViews.length;
        data.originUrl = util.getOriginalUrl(window.location.href).split('?')[0].split('#')[0];
        data.reffer = encodeURIComponent(window.document.referrer);
        var tcLog = new TcLog()
        tcLog.initBaseData(data);
    }
    
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
        this.hint.generateQRCode();
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

    MIPStory.prototype.initProgress = function (storyConfig) {
        if (this.progress) {
            return;
        }

        var audioHide = this.element.hasAttribute('audio-hide');
        this.progress = new Progress(this.element, this.storyViews, audioHide, storyConfig);
        var html = dm.create(this.progress.build());
        this.element.appendChild(html);

        // 状态保持
        var storyState = require('./mip-story-state');
        var currentPageIndex = storyState.currentPageIndex;
        this.pageStateIndex = storyState.getPageStateIndex(this.storyViews.length);
        this.preloadPages = storyState.getPreloadIndex(this.storyViews.length)
        // 初始化预加载
        this.initPreload();

        for (var p = 0; p <= currentPageIndex; p++) {
            this.progress.updateProgress(p, 1);
        }

    };

    MIPStory.prototype.setSubjectColor = function () {
        var subjectColor =  this.element.getAttribute('background') || '';
        if (subjectColor && isCssColor(subjectColor)) {
            this.element.style.backgroundColor = subjectColor;
        }
    }

    MIPStory.prototype.insertScript = function () {
        loadScript('https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js')
    }

    // 处理滑动
    MIPStory.prototype.resolveSwipe = function () {
        // 禁止橡皮筋效果
        for(var i = 0; i < this.storyViews.length; i++) {
            this.storyViews[i].addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, {
                passive: false
            });
        }
        var isSimpleSearch = navigator.userAgent.toLowerCase().indexOf('searchcraft');
        // 手百下外层容器不能设置阻挡默认事件
        if (!platform.isBaiduApp() && !platform.isQQApp() && !isSimpleSearch) {
            var backOuter = this.element.querySelector('.mip-backend')
            backOuter.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, {
                passive: false
            });
        }
        var recommendWrap = this.element.querySelector('.recommend-wrap')
        recommendWrap.addEventListener('touchmove', function (e) {
            e.stopPropagation();
        }, {
            passive: true
        });
    }

    // 预加载相关
    MIPStory.prototype.initPreload = function () {
        var storyViewData = this.storyViews;
        var pages = this.preloadPages;
        for (var i = 0; i < pages.length; i++) {
            var loadIndex = pages[i];
            storyViewData[loadIndex].setAttribute('preload','');
        }
    };
    
    // story组件的初始化
    MIPStory.prototype.init = function () {
        var element = this.element;
        var html = this.win.document.documentElement;
        var mipStoryConfigData = this.getConfigData();
        // 引入js
        this.insertScript()
        // 设置小故事的主题色
        this.setSubjectColor();
        html.setAttribute('id', MIP_I_STORY_STANDALONE);
        // 初始化音频
        this.initAudio();
        // 初始化结尾页
        this.initBookend(mipStoryConfigData);
        // 保存 story-views到storyViews中便于后期操作
        this.initStoryViews();
        // 初始化打点基本数据
        this.initBaseTcData();
        // 保存包括封底页面在内的所有结果页
        this.initStoryContain();
        // 初始化引导页
        this.initHintLayer(element);
        // 初始化分享页面
        this.initShare(mipStoryConfigData, element);
        // 初始化导航
        this.initProgress(mipStoryConfigData);
        // 初始化story的Slider
        this.initService();
        // 处理滑动问题
        this.resolveSwipe();
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
