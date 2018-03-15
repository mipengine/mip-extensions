/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Audio = require('./audio');
    var BACKGROUND_AUDIO = 'background-audio';

    customElement.prototype.resumeAllMedia = function () {
        var self = this;
        self.whenAllMediaElements(function (ele) {
            !self.muted && ele.play();
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

    customElement.prototype.setActive = function (status, muted) {
        this.muted = muted;
        if (status) {
            this.element.setAttribute('active', '');
            this.resumeAllMedia();
            this.muted ? this.muteAllMedia() : this.unMuteAllMedia();
        }
        else {
            this.element.removeAttribute('active');
            this.pauseAllMedia();
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

    customElement.prototype.firstInviewCallback = function () {
        this.initView();
        this.pauseAllMedia();
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-view', customElement);

    return customElement;
});
