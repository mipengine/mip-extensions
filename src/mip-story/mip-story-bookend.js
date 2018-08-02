/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var viewer = require('viewer');
    var platform = util.platform;
    var naboo = util.naboo;

    function MIPStoryBackEnd(storyConfig) {
        this.storyConfig = storyConfig || {};
    }

    /**
     * 使得数组满足最低个数要求，不满足个数时则用默认数组填充
     *
     * @param {Array} customArr 用户自定义数组
     * @param {Array} defaultArr 默认数组
     * @param {Number} n 最少展示的数组
     * @returns {Array} 符合要求的数组
     */
    function fillArr(customArr, defaultArr, n) {
        var cusLen = customArr.length;

        if (cusLen >= n) {
            return customArr;
        }

        return customArr.concat(defaultArr.slice(0, n - cusLen));
    }

    // 默认的推荐数据 & 最低数量
    var minRecommend = 4;
    var defaultRecommend =[
        {
            "cover": "https://mipstatic.baidu.com/static/mip-static/mip-story/static/img/rec1.jpg",
            "url": "https://m.baidu.com/paw/c/m.news18a.com/special/mobile/special_1031.shtml?story=1&word=%E8%BF%88%E5%B7%B4%E8%B5%AB%E6%A6%82%E5%BF%B5%E8%BD%A6&title=%E8%BF%88%E5%B7%B4%E8%B5%AB%E6%A6%82%E5%BF%B5%E8%BD%A6&lid=8305767886715286272&referlid=8305767886715286272&ms=1&frsrcid=37224&frorder=2",
            "title": "未来汽车新概念：我真的心动了",
            "from": "网通社汽车",
            "fromUrl": ""
        },
        {
            "cover": "https://mipstatic.baidu.com/static/mip-static/mip-story/static/img/rec2.jpg",
            "url": "http://story.soogif.com/story/access/41",
            "title": "梅西丢球：盘点世界杯十大罚球时刻",
            "from": "SOOGIF",
            "fromUrl": ""
        },
        {
            "cover": "https://mipstatic.baidu.com/static/mip-static/mip-story/static/img/rec3.jpg",
            "url": "https://mipstatic.baidu.com/static/mip-static/mip-story/story-heritage/heritage.html",
            "title": "你所不知道的中国非物质文化遗产",
            "from": "百度公益",
            "fromUrl": ""
        },
        {
            "cover": "https://mipstatic.baidu.com/static/mip-static/mip-story/static/img/rec4.jpg",
            "url": "https://zqmfcdn.huanhuba.com/app_static/baiduStory/index.html",
            "title": "梅西VSC罗：原来差距在这里",
            "from": "足球魔方",
            "fromUrl": ""
        }
    ]
    
    MIPStoryBackEnd.prototype.build = function () {
        var data = this.storyConfig;
        var replayStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '小故事重播', '点击', window.location.href]
            })
        );
        var shareStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '小故事分享', '点击', window.location.href]
            })
        );
        var share = data.share;
        var recommend = data.recommend;
        var items = recommend && recommend.items ? recommend.items : [];
        var recTpl = '';
        items = fillArr(items, defaultRecommend, minRecommend);
        if (items && items.length) {
            var innerTpl = '';
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                innerTpl += ''
                    +    '<a href="' + item.url
                    +       '" class="recommend-item">'
                    +       '<div class="mip-backend-preview" style="background-image:url('
                    +       (item.cover || '') + ');"></div>'
                    +       '<div class="recommend-detail">'
                    +           '<span>' + (item.title || '') + '</span>'
                    +           '<span data-src="' + item.fromUrl + '">' + (item.from || '') + '</span>'
                    +        '</div>'
                    +    '</a>';
            }
            recTpl = ''
                + '<div class="recommend-wrap">'
                +     '<p class="readmore">更多阅读</p>'
                +        '<div class="recommend-container">'
                +             innerTpl
                +        '</div>'
                + '</div>';
        }
        var shareTpl = this.showShareBtn() ? ''
                + '<span class="mip-backend-share" data-stats-baidu-obj="' + shareStats + '">'
                +   '<span class="mip-backend-preview-share-btn"></span>'
                + '</span>' : '';
        var historyTpl = history.length > 1 ? '<span class="mip-story-close mip-backend-close"></span>' : '';
        var html = ''
                + '<aside class="mip-backend">'
                +     '<mip-fixed type="top" class="mip-backend-control">'
                +         historyTpl
                +         shareTpl
                +     '</mip-fixed>'
                + '<div class="mip-backend-outer "style="background-image: url(' + share.background + ')">'
                +         '<div class="recommend-item recommend-now">'
                +            '<div class="mip-backend-preview"'
                +             'style="background-position:center;background-size:cover;background-image:url('
                +             share.thumbnail + ')" data-stats-baidu-obj="' + replayStats + '">'
                +               '<div class="mip-backend-preview-mask"></div>'
                +               '<div class="mip-backend-preview-thumbnail">'
                +                   '<span class="mip-backend-preview-replay-btn"></span>'
                +               '</div>'
                +           '</div>'
                +            '<div class="recommend-detail">'
                +             '<span class="mip-backend-description">' + share.title + '</span>'
                +             '<span class="mip-backend-info">'
                +                 '<a href="' + share.fromUrl + '">' + share.from + '</a>'
                +             '</span>'
                +           '</div>'
                +         '</div>'
                +        recTpl
                +    '</div>'
                + '</aside>';
        return html;
    };

    /**
     *
     * 由于分享在手百下有域名限制，除去百度域的源站不能分享，所以如果是源站并且手百下，隐藏分享
     *
     * @return {boolean} 是否展示分享按钮
     */
    MIPStoryBackEnd.prototype.showShareBtn = function () {
        var hostName = util.parseCacheUrl(location.hostname);
        if (platform.isBaiduApp() && !viewer.isIframed && hostName.indexOf('baidu.com') === -1) {
            return false;
        }
        return true;
    };

    MIPStoryBackEnd.prototype.show = function () {
        var eleAnimation = document.querySelector('.mip-backend').animate([
            { transform: 'translate3D(0, 100%, 0)', opacity: 0 },
            { transform: 'translate3D(0, 0, 0)', opacity: 1 }
        ], {
                fill: 'forwards',
                easing: 'ease-in',
                duration: 280
            });
        eleAnimation.play();
    };

    MIPStoryBackEnd.prototype.hide = function () {
        var eleAnimation = document.querySelector('.mip-backend').animate([
            { transform: 'translate3D(0, 0, 0)', opacity: 1 },
            { transform: 'translate3D(0, 100%, 0)', opacity: 0 }
        ], {
                fill: 'forwards',
                easing: 'ease-out',
                duration: 280
            });
        eleAnimation.play();
    };

    return MIPStoryBackEnd;
});
