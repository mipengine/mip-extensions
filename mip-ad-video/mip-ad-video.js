/**
 * @file mip-ad-video 带有广告的视频播放组件主文件
 * @author vodjk
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;

    var customElem = require('customElement').create();

    /**
     * build
     */
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var adSrc = $element.attr('ad-src');
        var targetSrc = $element.attr('target-src');
        var poster = $element.attr('poster');

        //  初始化播放器
        var video = document.createElement('video');

        //  初始化video的属性
        $(video).attr({
            'playsinline': '',
            'webkit-playsinline': '',
            'controls': '',
            'poster': poster
        });

        //  初始化video的尺寸大小
        $(video).css('height', window.innerWidth / 16 * 9 + 'px');

        //  如果是IOS则设置为自动播放
        if (platform.isIos()) {
            video.autoplay = true;
        }

        $element[0].appendChild(video);

        //  如果有广告并且非IOS上的QQ浏览器 则播放广告
        if (adSrc && !(platform.isIos() && platform.isQQ())) {
            video.src = adSrc;

            //  广告播放完毕
            video.onended = function () {
                video.src =  targetSrc;
                video.autoplay = true;
                video.load();
                video.play();
            };
        } else {  //  否则直接播放内容
            video.src = targetSrc;
        }
    };

    return customElem;
});
