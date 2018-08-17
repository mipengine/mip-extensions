/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var MIP_STORY_SHARE_SHOW = 'mip-story-share-show';
    var viewer = require('viewer');

    function MIPStoryShare(shareConfig, root) {
        this.shareConfig = shareConfig;
        this.root = root;
    }

    MIPStoryShare.prototype.build = function () {
        var shareCancelStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '小故事分享取消', '点击', window.location.href]
            })
        );
        this.shareData = {
            title: this.shareConfig.title,
            titleDefault: document.title,
            content: this.shareConfig.desc || this.shareConfig.content || document.title,
            contentDefault: '我发现了一个精彩的小故事，一起来看吧',
            iconUrl: this.shareConfig.thumbnail,
            iconUrlDefault: ''
        };
        // 微信小故事分享配置
        viewer.sendMessage('wxshare_config', this.shareData);
        this.shareUrl = util.parseCacheUrl(location.href);
        /* eslint-disable max-len */
        var html = ''
            + '<aside class="mip-story-share">'
            +   '<div class="mip-share-container">'
            +       '<mip-share url="' + this.shareUrl + '" title="'+ this.shareData.title + '" content="' + this.shareData.content + '" iconUrl="' + this.shareData.iconUrl + '"></mip-share>'
            +   '</div>'
            +   '<span class="mip-story-share-cancel" data-stats-baidu-obj="' + shareCancelStats + '">取消</span>'
            + '</aside>';
        /* eslint-enable max-len */
        return html;
    };

    MIPStoryShare.prototype.showShareLayer = function () {
        var scSupport = this.supportCraft();
        // 适配简单搜索，简单没有给出单独调用微信等渠道的api, 所以在这里拦截一下；
        if (scSupport.support) {
            this.callSearchCraftShare(scSupport.os);
            return;
        }

        var ele = this.root.querySelector('.mip-story-share');
        ele.classList.add(MIP_STORY_SHARE_SHOW);
    };

    /**
     * callSearchCraftShare 吊起简单搜索的分享组件；
     * @param {Boolean} osAndroid 是否是安卓端，对安卓有特殊的处理
     */

    MIPStoryShare.prototype.callSearchCraftShare = function (osAndroid) {
        var message = {
            func: 'callNativeShare',
            options: {
                'type': 'url',
                'imgurl': this.shareData.iconUrl,
                'title': this.shareData.title,
                'describe': this.shareData.content,
                'url': this.shareUrl || window.location.href
            }
        };

        if (osAndroid) {
            message = JSON.stringify(message);
        }

        try {
            window.Viaduct.postMessage(message);
        } catch (e) {
            // 错误处理
        }

    };
    /**
     * supportCraft 检测当前运行环境是否支持简单搜索的分享吊起
     * @return {Object}
     */
    MIPStoryShare.prototype.supportCraft = function () {
        // 简单搜索ua判断 detect无法判断简单搜索故手动检测
        var shareUa = typeof navigator !== 'undefined' ? navigator.userAgent : '';
        var craft = /SearchCraft/i.test(shareUa);
        var shareosAndroid = /Android/i.test(shareUa);
        var shareV = craft && shareUa.match(/SearchCraft\/([\d.]*)/);
        var hostName = util.parseCacheUrl(location.hostname);
        // 在安卓机型内，如果简搜支持且为百度域的可吊起简搜，由于简搜会对非百度域的分享做特殊处理；
        var supportAnd = ((shareosAndroid && parseFloat(shareV[1]) > 1.5) && hostName.indexOf('baidu.com') !== -1);
        var supportIos = (!shareosAndroid && (parseFloat(shareV[1])) > 1.11);
        var support = craft && (supportAnd || supportIos);
        return {
            os: shareosAndroid,
            support: support
        };
    };

    MIPStoryShare.prototype.hideShareLayer = function () {
        var ele = this.root.querySelector('.mip-story-share');
        ele.classList.remove(MIP_STORY_SHARE_SHOW);
    };

    return MIPStoryShare;
});
