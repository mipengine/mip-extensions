/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Audio = require('./audio');
    var BACKGROUND_AUDIO = 'background-audio';

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
        var ele = e.target;
        if (ele.hasAttribute('muted')) {
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


    customElement.prototype.setActive = function (status, muted, load, eventEmiter) {
        this.muted = muted;
        this.parentEmiter = eventEmiter;
        if (status) {
            this.element.setAttribute('active', '');
            this.maybeStartAnimation();
            this.resumeAllMedia(load);
            this.muted ? this.muteAllMedia() : this.unMuteAllMedia();
        }
        else {
            this.element.removeAttribute('active');
            this.maybeClearAutoAdvance();
            this.pauseAllMedia();
            this.maybeClearAnimation();
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
            this.maybeSetAutoAdvance();
        }
    };

    customElement.prototype.maybeClearAnimation = function() {
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
        var node = self.element.parentNode;
        self.parentElement = node.customElement;
        var advancment = el.getAttribute('auto-advancement-after');
        if (advancment && validateAdvance(advancment)) {
            self.timer = setTimeout(function () {
                self.parentEmiter.trigger('switchpage', {status: 1});
            }, +advancment);
        }

    };
    customElement.prototype.initView = function () {
        this.audio = new Audio();
        var node = this.element.parentNode;
        if (!node.hasAttribute(BACKGROUND_AUDIO)) {
            var audioSrc = this.element.getAttribute(BACKGROUND_AUDIO);
            this.audio.build(this.element, audioSrc);
        }
    };

    function validateAdvance (val) {
        var reg = /^[0-9]+$/;
        return reg.test(val);
    }
    customElement.prototype.firstInviewCallback = function () {
        this.initView();
        this.pauseAllMedia();
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-view', customElement);

    return customElement;
});
