/**
 * @file mip-story-jsmpeg 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var JSMpeg = require('./jsmpeg/jsmpeg');
    var util = require('util');
    var Detector = require('./video-detector');
    var css = util.css;
    var dm = util.dom;

    customElement.prototype.initStoryVideoElement = function () {

        var sourceList = [];

        this.attributes = getAttributeSet(this.element.attributes);
        this.sourceDoms = this.element.querySelectorAll('source');

        Array.prototype.slice.apply(this.sourceDoms).forEach(function (node) {
            sourceList[node.type] = node.src;
        });

        this.sourceList = sourceList;

        if (Detector.isRenderVideoElement()) {
            this.isVideo = true;
            this.renderVideoElement();
        } else {
            this.isVideo = false;
            this.renderJSMpeg();
        }

    };

    /**
     * [renderVideoElement 渲染video标签用于播放]
     *
     */
    customElement.prototype.renderVideoElement = function () {

        var poster = this.attributes.poster;
        var height =  this.attributes.height;
        var width  =  this.attributes.width;
        var sourceHTML = this.element.innerHTML;
        var html = '<mip-video layout="responsive" loop autoplay height="' + height +'" width="' + width + '" poster="' + poster + '">'
                + sourceHTML
                + '</mip-video>';
        var videoElement = dm.create(html);

        this.element.parentNode.insertBefore(videoElement, this.element);
        this.player = videoElement.querySelector('video');

    };

    /**
     * [renderJSMpeg 创建 jsMpege播放器]
     */
    customElement.prototype.renderJSMpeg = function () {
        var self = this;

        var posterEl = document.createElement('div');
        var canvas = document.createElement('canvas');
        css(canvas, {position: 'absolute', opacity: '0'});

        var tsUrl = this.sourceList['video/ts'];

        if (!tsUrl) {
            console.error('ts file is require');
            return;
        }
        // 渲染poster;

        if (this.attributes.poster) {

            posterEl.style.backgroundImage = 'url(' + this.attributes.poster + ')';
            posterEl.style.backgroundSize = 'cover';
            posterEl.style.height = '100%';
            posterEl.style.width = '100%';
            posterEl.style.position = 'absolute';

            this.element.appendChild(posterEl);
        }


        this.attributes.canvas = canvas;
        this.element.appendChild(canvas);
        this.player = new JSMpeg.Player(tsUrl, this.attributes);
        this.player.on('playing', function () {
            var event = new Event('playing');
            // 开始播放时展示canvas
            css(canvas, {opacity: '1'});
            self.element.dispatchEvent(event);
        });

        this.player.on('play', function () {
            var event = new Event('play');
            self.element.dispatchEvent(event);
        });

        this.player.on('end', function () {
            var event = new Event('end');
            self.element.dispatchEvent(event);
        });

        this.stop();
    };

    customElement.prototype.play = function () {
        if (!this.isVideo) {
            this.player.play();
            this.unlockAudio();
        }
    };

    customElement.prototype.unlockAudio = function () {
        this.player.audioOut.unlock();
    };

    customElement.prototype.stop = function () {
        if (!this.isVideo) {
            this.player.stop();
        }
    };

    customElement.prototype.pause = function () {
        if (!this.isVideo) {
            this.this.player.pause();
        }
    };

    customElement.prototype.attributeChangedCallback = function () {
        if (this.element.hasAttribute('preload') && !this.loaded) {
            this.initStoryVideoElement();
            this.loaded = true;
        }
    };

    customElement.prototype.firstInviewCallback = function () {
        this.loaded = false;
        // this.initStoryVideoElement();
    };

    function getAttributeSet(attributes) {
        var attrs = {};

        Array.prototype.slice.apply(attributes).forEach(function (attr) {
            attrs[attr.name] = attr.value;
        });
        return attrs;
    }

    /* eslint-disable */
    MIP.registerMipElement('mip-story-video', customElement);

    return customElement;
});
