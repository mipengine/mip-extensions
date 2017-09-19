/**
 * @file mip-vd-baidu 组件
 * @author lilangbo111@gmail.com
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var server = 'http://nj03-mip-data.nj03.baidu.com:8003/getvideo';

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this;
        // 获得组件的 dom 对象
        var element = that.element;
        var videoData = {
            'src_url': util.parseCacheUrl(location.href),
            'video_url': element.getAttribute('src'),
            'poster': element.getAttribute('poster'),
            'title': element.getAttribute('title')
        };
        var vSrc = videoData.video_url;
        var notHttps = (location.protocol === 'http:' && vSrc.indexOf('//') === 0)
            || vSrc.indexOf('http://') === 0;
        // 处理 poster 被改写的情况，还原 url
        if (videoData.poster && videoData.poster.indexOf('/i/') === 0) {
            var prefixLen = 3;
            var protocol = 'http://';
            if (videoData.poster.indexOf('/i/s/') === 0) {
                prefixLen = 5;
                protocol = 'https://';
            }
            videoData.poster = protocol + videoData.poster.substring(prefixLen);
        }
        if (notHttps) {
            fetch(that._makeUrl(server, videoData)).then(function (res) {
                return res.text();
            }).then(function (text) {
                if (text.status && text.status === 1) {
                    // 如果成功，替换成新的视频 url
                    var key = 'video_url';
                    videoData[key] = text.url;
                }
                that._useMipVideo(videoData);
            }).catch(function (e) {
                // 请求失败后的容灾
                that._useMipVideo(videoData);
            });
        }
        else {
            // 是 https，直接在当前页播放
            that._useMipVideo(videoData);
        }

    };

    // 生成 fetch 的 url
    customElement.prototype._makeUrl = function (server, urlParams) {
        if (!urlParams) {
            return server;
        }
        var firstKey = true;
        for (var key in urlParams) {
            if (urlParams.hasOwnProperty(key)) {
                server += (!firstKey ? '&' : '') + key + '=' + encodeURIComponent(urlParams[key]);
                firstKey = false;
            }
        }
        return server;
    };

    // 使用 mip-video 进行播放， notice：目前没有强引组件 js，如果从内置组件移出，得考虑这块
    customElement.prototype._useMipVideo = function (urlParams) {
        if (!urlParams || !urlParams.src_url) {
            return;
        }
        var vd = document.createElement('mip-video');
        // 继承 mip-vd-baidu 的 layout
        vd.setAttribute('layout', this.element.getAttribute('layout'));
        vd.setAttribute('width', this.element.getAttribute('width'));
        vd.setAttribute('height', this.element.getAttribute('height'));
        // 设置组件需要的参数
        vd.setAttribute('src', urlParams.video_url);
        vd.setAttribute('poster', urlParams.poster);
        vd.setAttribute('controls', '');
        // 将 mip-video 直接替换 mip-vd-baidu
        this.element.parentNode.replaceChild(vd, this.element);
    };

    return customElement;
});
