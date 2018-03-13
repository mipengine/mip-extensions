/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var ACTIVE = 'mip-story-page-progress-bar-active';
    var util = require('util');

    function Audio() {
    }

    Audio.prototype.build = function (ele, audioSrc) {
        if (audioSrc) {
            var audioEl = document.createElement('audio');
            audioEl.setAttribute('src', audioSrc);
            audioEl.setAttribute('preload', 'auto');
            audioEl.setAttribute('loop', '');
            audioEl.setAttribute('autoplay', '');
            audioEl.setAttribute('muted', '');
            util.css(audioEl, {display: 'hidden'});
            ele.appendChild(audioEl);
        }
    };

    return Audio;
});
