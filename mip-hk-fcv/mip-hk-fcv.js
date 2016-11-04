/**
 * 百度好看凤巢视频落地页
 */
define('mip-hk-fcvideo', ['require', 'customElement', 'zepto'], function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    customElem.prototype.build = function () {
        var element = this.element;

        var videoObj = $('#J_d_title').find('video');

        if (typeof videoObj !== 'undefined') {
            videoObj[0].addEventListener('timeupdate', function () {
                var videoDuration = videoObj[0].duration;
                var maxVideoTimes = 30;
                if (videoDuration < 60) {
                    maxVideoTimes = Math.round(videoDuration*0.5);
                }
                if (videoObj[0].currentTime > maxVideoTimes) {
                    videoObj[0].pause();
                    videoObj.hide();
                    $('#J_video_fc_dl').show();
                }
            }, false);
        }
    };

    return customElem;
});
require(['mip-hk-fcvideo'], function (plugindemo) {
    MIP.registerMipElement('mip-hk-fcvideo', plugindemo);
});
