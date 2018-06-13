/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Audio = require('./audio');
    var BACKGROUND_AUDIO = 'background-audio';
    var timeStrFormat = require('./animation-util').timeStrFormat;
    var AnimationManager = require('./animation').AnimationManager;
    var hasAnimations = require('./animation').hasAnimations;
    var css = require('util').css;
    customElement.prototype.resumeAllMedia = function (load) {
        var self = this;
        self.whenAllMediaElements(function (ele) {
            if (ele.tagName.toLowerCase() === 'audio' && load) {
                !self.muted ? ele.load() : ele.load() && ele.pause();
            }
            else {
                !self.muted && ele.play();
            }
        });
    };

    customElement.prototype.pauseAllMedia = function () {
        this.whenAllMediaElements(function (ele) {
            ele.pause();
        });
    };

    customElement.prototype.muteAllMedia = function () {
        this.whenAllMediaElements(function (ele) {
            ele.muted = true;
            ele.pause();
        });
    };

    customElement.prototype.toggleAllMedia = function (e, muted) {
        this.muted = muted;
        var ele = e.target || null;
        if (ele && ele.hasAttribute && ele.hasAttribute('muted')) {
            !this.muted && this.resumeAllMedia();
            !this.muted && this.unMuteAllMedia();
        }
        else {
            this.muteAllMedia();
        }
    };

    customElement.prototype.unMuteAllMedia = function () {
        this.whenAllMediaElements(function (ele) {
            ele.muted = false;
            ele.play();
        });
    };

    customElement.prototype.getAllMedia = function () {
        return this.element.querySelectorAll('audio, video');
    };

    customElement.prototype.whenAllMediaElements = function (cb) {
        var mediaSet = this.getAllMedia();
        Array.prototype.map.call(mediaSet, function (mediaEl) {
            return cb(mediaEl);
        });
    };

    customElement.prototype.setPreActive = function (eventEmiter) {
        this.parentEmiter = eventEmiter;
        this.animationElements = [];
        this.initAnimationFirstFrame();
        // css-获取有动画的节点，并且放到数组中便于修改display
        this.findAnimationNodes(this.element);
        // css-修改每个有动画节点的display
        this.initFirstFrameStyle(false);
    };

    // 监控CSS中是否有动画
    function hasCssAnimation(obj) {
        var ani = null;
        try {
            ani = document.defaultView.getComputedStyle(obj)['animationName']
                || document.defaultView.getComputedStyle(obj)['-webkit-animationName'];
        } catch (e) {
        }
        if (ani && ani != 'none') {
            return true;
        }
        return false;
    }

    customElement.prototype.findAnimationNodes = function (parent) {
        if (parent == null) return;
        var subNodes = parent.children;
        for (var index = 0; index < subNodes.length; index++) {
            if (hasCssAnimation(subNodes[index])) {
                this.animationElements.push(subNodes[index]);
            }
            if (subNodes[index].children.length > 0) {
                this.findAnimationNodes(subNodes[index]);
            }
        }
    };

    function toggleDisplay(obj, disp) {
        if (disp) {
            obj.setAttribute('style', 'display: ' + obj.getAttribute("originDisplay"));
        } else {
            var originDisplay = document.defaultView.getComputedStyle(obj)['display'];
            obj.setAttribute('originDisplay', originDisplay);
            obj.setAttribute('style', 'display: none');
        }
    }

    customElement.prototype.initFirstFrameStyle = function (disp) {
        if (this.animationElements != null) {
            for (var index = 0; index < this.animationElements.length; index++) {
                toggleDisplay(this.animationElements[index], disp);
            }
        }
    };

    customElement.prototype.setAllMedia = function (status, muted, load, eventEmiter, viewType) {
        this.muted = muted;
        this.parentEmiter = eventEmiter;
        if (status) {
            this.initAnimationFirstFrame();
            this.maybeStartAnimation();
            this.resumeAllMedia(load);
            this.muted ? this.muteAllMedia() : this.unMuteAllMedia();
            this.maybeSetAutoAdvance();
        }
        else {
            this.maybeClearAutoAdvance();
            this.pauseAllMedia();
            this.maybeClearAnimation();
        }
    };
    customElement.prototype.setCssMedia = function (status, muted, eventEmiter) {
        this.muted = muted;
        this.parentEmiter = eventEmiter;
        if (status) {
            this.initFirstFrameStyle(true);
        }
        else {
            this.initFirstFrameStyle(false);
        }
    };

    customElement.prototype.clearCssMedia = function (status, muted, eventEmiter) {
        if (this.animationElements != null) {
            for (var index = 0; index < this.animationElements.length; index++) {
                toggleDisplay(this.animationElements[index], true);
                this.animationElements[index].removeAttribute('originDisplay')
            }
        }
    };
    customElement.prototype.initAnimationFirstFrame = function () {
        if (hasAnimations(this.element)) {
            css(this.element, {visibility: 'hidden'});
            if (!this.animationManager) {
                this.animationManager = new AnimationManager(this.element);
            }
            this.animationManager.paintFirstFrame();
            css(this.element, {visibility: ''});
        }
    };

    customElement.prototype.maybeStartAnimation = function () {
        if (hasAnimations(this.element)) {
            css(this.element, {visibility: 'hidden'});
            if (!this.animationManager) {
                this.animationManager = new AnimationManager(this.element);
            }
            this.animationManager.paintFirstFrame();
            css(this.element, {visibility: ''});
            this.animationManager.runAllAnimate();
        }

    };

    customElement.prototype.maybeClearAnimation = function () {
        if (this.animationManager) {
            this.animationManager.cancelAllAnimate();
        }
    };

    customElement.prototype.maybeClearAutoAdvance = function () {
        var self = this;
        self.timer && clearTimeout(self.timer);
    };

    customElement.prototype.maybeSetAutoAdvance = function () {
        var self = this;
        var el = self.element;

        var advancment = el.getAttribute('auto-advancement-after');
        var duration = timeStrFormat(advancment);
        if (duration) {
            self.timer = setTimeout(function () {
                self.parentEmiter.trigger('switchPage', {status: 1});
            }, duration);
        }

    };
    customElement.prototype.initView = function () {
        this.audio = new Audio();
        var node = this.element.parentNode;
        this.animationElements = [];
        if (!node.hasAttribute(BACKGROUND_AUDIO)) {
            var audioSrc = this.element.getAttribute(BACKGROUND_AUDIO);
            this.audio.build(this.element, audioSrc);
        }
    };

    customElement.prototype.firstInviewCallback = function () {
        this.initView();
        this.pauseAllMedia();
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-view', customElement);

    return customElement;
});
