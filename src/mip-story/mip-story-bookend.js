/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var naboo = util.naboo;

    function MIPStoryBackEnd() {
    }

    MIPStoryBackEnd.prototype.getData = function () {
        var mipStory = document.querySelector('mip-story > script[type="application/json"]');
        return JSON.parse(mipStory.innerText);
    };

    MIPStoryBackEnd.prototype.build = function () {
        var data = this.getData().share;
        var replayStats = encodeURIComponent(
            JSON.stringify({"type":"click",
                "data":["_trackEvent", "小故事重播", "点击", window.location.href]
            })
        );
        var shareStats = encodeURIComponent(
            JSON.stringify({
                "type":"click",
                "data":["_trackEvent", "小故事分享", "点击", window.location.href]
            })
        );
        var html = '<aside class="mip-backend">'
                + '<div class="mip-backend-outer">'
                +    '<div class="mip-backend-preview"'
                +       'style="background-position:center;background-size:cover;background-image:url('
                +       data.img + ')" data-stats-baidu-obj="' + replayStats + '">'
                +        '<div class="mip-backend-preview-mask"></div>'
                +        '<div class="mip-backend-preview-thumbnail">'
                +            '<span class="mip-backend-preview-replay-btn"></span>'
                +            '<span>重播</span>'
                +        '</div>'
                +    '</div>'
                +    '<span class="mip-backend-description">' + data.title + '</span>'
                +    '<span class="mip-backend-info">'
                +        '<span>' + data.from + '</span>'
                +    '</span>'
                +    '<span class="mip-backend-share" data-stats-baidu-obj="' + shareStats + '">'
                +        '<span class="mip-backend-preview-share-btn"></span>'
                +        '<span class="mip-backend-share-btn">分享</span>'
                +    '</span>'
                + '</div>'
            + '</aside>';
        return html;
    };

    MIPStoryBackEnd.prototype.show = function () {
        var ele = document.querySelector('.mip-backend');
        naboo.animate(ele, {
            transform: 'translateY(0)'
        }).start();
    };

    MIPStoryBackEnd.prototype.hide = function () {
        var ele = document.querySelector('.mip-backend');
        naboo.animate(ele, {
            transform: 'translateY(1000%)'
        }).start();
    };

    return MIPStoryBackEnd;
});
