/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');

    function Audio() {
    }

    Audio.prototype.build = function (ele, audioSrc) {
        if (audioSrc) {
            var audioEl = document.createElement('audio');
            audioEl.setAttribute('src', audioSrc);
            audioEl.setAttribute('preload', 'auto');
            audioEl.setAttribute('loop', '');
            // audioEl.setAttribute('autoplay', '');
            // audioEl.setAttribute('muted', '');
            util.css(audioEl, {display: 'hidden'});
            ele.appendChild(audioEl);
            return audioEl;
        }
    };

    return Audio;
});
