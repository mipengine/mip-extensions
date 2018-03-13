/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Audio = require('./audio');

    customElement.prototype.resumeAllMedia = function () {
        this.whenAllMediaElements(function (ele) {
            ele.play();
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
        });
    };

    customElement.prototype.toggleAllMedia = function (e) {
        var ele = e.target;
        if (ele.hasAttribute('muted')) {
            this.unMuteAllMedia();
            ele.removeAttribute('muted');
        }
        else {
            this.muteAllMedia();
            ele.setAttribute('muted', '');
        }
    };

    customElement.prototype.unMuteAllMedia = function () {
        this.whenAllMediaElements(function (ele) {
            ele.muted = false;
        });
    };

    customElement.prototype.upgradeBackgroundAudio = function () {
        var audioSrc = this.element.getAttribute('background-audio');    
        if (audioSrc) {
            var audioEl = document.createElement('audio');
            audioEl.setAttribute('src', audioSrc);
            audioEl.setAttribute('preload', 'auto');
            audioEl.setAttribute('loop', '');
            audioEl.setAttribute('autoplay', '');
            audioEl.setAttribute('muted', '');
            audioEl.muted = true;
            audioEl.style.disply = 'hidden';
            this.element.appendChild(audioEl);
        }
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
        if (status) {
            this.element.setAttribute('active', '');
            this.resumeAllMedia();
            muted ? this.muteAllMedia() : this.unMuteAllMedia();
        }
        else {
            this.element.removeAttribute('active');
            this.pauseAllMedia();
        }
    };

    customElement.prototype.firstInviewCallback = function () {        
        this.upgradeBackgroundAudio();
        this.pauseAllMedia();        
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-view', customElement);

    return customElement;
});
