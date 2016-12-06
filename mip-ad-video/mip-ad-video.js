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
        var adTime = $element.attr('ad-time');
        var poster = $element.attr("poster");

        //  初始化播放器
        var video = document.createElement('video');
        //  广告剩余时间提醒
        var spanAdTime = document.createElement('span');
        spanAdTime.innerHTML = adTime + '';

        //  初始化video的属性
        $(video).attr({
            'playsinline': '',
            'webkit-playsinline': '',
            'controls':'',
            "poster": poster
        });

        //  如果是IOS则设置为自动播放
        if(platform.isIos()){
            $(video).attr({
                'autoPlay': ''
            });
        }

        $element[0].appendChild(video);

        //  如果有广告并且非IOS上的QQ浏览器 则播放广告
        if (adSrc && !(platform.isIos() && platform.isQQ())) {
            $element[0].appendChild(spanAdTime);
            video.src = adSrc;

            //  当开始播放 或者点击播放的时候 进行广告倒计时
            video.onplay = video.onclick = function () {
                video.onplay = video.onclick = null;
                var timeId = setInterval(function () {
                    adTime--;
                    //  刷新显示的广告秒
                    spanAdTime.innerHTML = adTime;
                    //  广告播放完毕
                    if (adTime <= 0) {
                        spanAdTime.style.display = 'none';
                        clearInterval(timeId);
                        video.setAttribute("src", targetSrc);
                        video.autoplay = true;
                        // video.reload();
                    }
                }, 1000);
            };
        } else {  //  否则直接播放内容
            video.src = targetSrc;
            video.setAttribute('controls', '');
        }
    };

    return customElem;
});
