/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var MIP_STORY_SHARE_SHOW = 'mip-story-share-show';

    function MIPStoryHint() {
    }

    MIPStoryHint.prototype.build = function () {
        var shareCancelStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '小故事分享取消', '点击', window.location.href]
            })
        );
        var shareUrl = util.parseCacheUrl(location.href);
        var html = '<aside class="mip-story-share">'
            +   '<div class="mip-share-container">'
            +   '    <mip-share url="' + shareUrl + '"></mip-share>'
            +   '</div>'
            +   '<span class="mip-story-share-cancel" data-stats-baidu-obj="' + shareCancelStats + '">取消</span>'
            + '</aside>';
        return html;
    };

    MIPStoryHint.prototype.showShareLayer = function () {
        var ele = document.querySelector('.mip-story-share');
        ele.classList.add(MIP_STORY_SHARE_SHOW);
    };

    MIPStoryHint.prototype.hideShareLayer = function () {
        var ele = document.querySelector('.mip-story-share');
        ele.classList.remove(MIP_STORY_SHARE_SHOW);
    };

    return MIPStoryHint;
});
