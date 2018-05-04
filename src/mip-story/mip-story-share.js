/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var MIP_STORY_SHARE_SHOW = 'mip-story-share-show';
    var viewer = require('viewer');

    function MIPStoryShare(shareConfig) {
        this.shareConfig = shareConfig;
    }

    MIPStoryShare.prototype.build = function () {
        var shareCancelStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '小故事分享取消', '点击', window.location.href]
            })
        );
        var shareData = this.shareConfig;
        var shareConfig = {
            title: shareData.title,
            titleDefault: document.title,
            content: shareData.desc || document.title,
            contentDefault: '我发现了一个精彩的小故事，一起来看吧',
            iconUrl: shareData.thumbnail,
            iconUrlDefault: ''
        };
        // 微信小故事分享配置
        viewer.sendMessage('wxshare_config', shareConfig);
        var shareUrl = util.parseCacheUrl(location.href);
        /* eslint-disable max-len */
        var html = ''
            + '<aside class="mip-story-share">'
            +   '<div class="mip-share-container">'
            +       '<mip-share url="' + shareUrl + '" title="'+ shareData.title + '" content="' + shareData.desc + '" iconUrl="' + shareData.thumbnail + '"></mip-share>'
            +   '</div>'
            +   '<span class="mip-story-share-cancel" data-stats-baidu-obj="' + shareCancelStats + '">取消</span>'
            + '</aside>';
        /* eslint-enable max-len */
        return html;
    };

    MIPStoryShare.prototype.showShareLayer = function () {
        var ele = document.querySelector('.mip-story-share');
        ele.classList.add(MIP_STORY_SHARE_SHOW);
    };

    MIPStoryShare.prototype.hideShareLayer = function () {
        var ele = document.querySelector('.mip-story-share');
        ele.classList.remove(MIP_STORY_SHARE_SHOW);
    };

    return MIPStoryShare;
});
