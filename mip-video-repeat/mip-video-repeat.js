/**
 * @file mip-video-repeat 带有片头片尾和重播的视频播放组件主文件
 * @author idongde
 */

define(function (require) {
    var $ = require('jquery');
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
        var adSrcEnd = $element.attr('ad-src-end');
        var targetSrc = $element.attr('target-src');
        var poster = $element.attr('poster');
        var videoMask = document.createElement('div');
        var replayButton = document.createElement('div');
        var replayIcon = document.createElement('i');
        var curIndex;

        //  初始化播放器
        var video = document.createElement('video');

        //  初始化video的属性
        $(video).attr({
            'playsinline': '',
            'webkit-playsinline': '',
            'controls': '',
            'poster': poster,
            'preload': 'no'
        });

        //  初始化video的尺寸大小
        $(video).css('width', window.innerWidth + 'px');

        $element[0].appendChild(video);
        showReplayPage()
        //  当前视频播放完毕
        video.onended = function () {
            curIndex += 1;
            whichShouldPlay()
        };

        //  如果有广告并且非IOS上的QQ浏览器 则播放广告
        if (adSrc && ! (platform.isIos() && platform.isQQ()) ) {
            video.src = adSrc;
            curIndex = 1;
        } else {  //  否则直接播放内容
            video.src = targetSrc;
            curIndex = 2;
        }

        //判断是否连续播放，到片尾广告结束停止
        function whichShouldPlay(){
            switch(curIndex) {
                case 1:
                    video.src = adSrc;
                    video.play();
                    break;
                case 2: 
                    video.src = targetSrc;
                    video.play();
                    break;
                case 3:
                    video.src = adSrcEnd;
                    video.play();
                    break;
                case 4:
                    curIndex = 1;
                    showReplayPage()
                    break;
                default:
                    break;
            }
        }

        //播放结束遮罩层
        function showReplayPage(){
            createDocumentFragment()
            $(videoMask).show()
            eventListener()
        }
        function createDocumentFragment(){
            //创建DOM片段
            var fragment = new DocumentFragment();
            //设置class和属性
            $(videoMask).addClass('video-mask');
            $(replayButton).addClass('video-replay-button');
            $(replayIcon).addClass('iconfont');
            $(replayIcon).html('&#8634;');
            $(videoMask).css('width', window.innerWidth + 'px');

            replayButton.appendChild(replayIcon);
            videoMask.appendChild(replayButton);
            fragment.appendChild(videoMask);
            $element[0].appendChild(fragment);
        }
        function eventListener(){
            $(replayButton).on('click', function(){
                $(videoMask).hide()
                //  如果有广告并且非IOS上的QQ浏览器 则播放广告
                if (adSrc && ! (platform.isIos() && platform.isQQ()) ) {
                    video.src = adSrc;
                    curIndex = 1;
                } else {  //  否则直接播放内容
                    video.src = targetSrc;
                    curIndex = 2;
                }
                video.play();
            })
        }
    };

    return customElem;
});
