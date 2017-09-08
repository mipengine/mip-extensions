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
        var vSrc = $element.attr('v-src');
        var vSrcEnd = $element.attr('v-src-end');
        var targetSrc = $element.attr('target-src');
        var videoMask = document.createElement('div');
        var curIndex;

        //  初始化播放器
        var video = document.createElement('video');

        //  初始化video的属性
        $(video).attr({
            'playsinline': '',
            'webkit-playsinline': '',
            'controls': '',
            'preload': 'no'
        });

        //  初始化video的尺寸大小
        $(video).css('width',window.innerWidth + 'px');

        $element[0].appendChild(video);
        
        // showReplayPageWithRecommend()
        // showReplayPage()
        //  当前视频播放完毕
        video.onended = function () {
            curIndex += 1;
            whichShouldPlay()
        };

        //  如果有片头并且非IOS上的QQ浏览器 则播放片头
        if (vSrc && ! (platform.isIos() && platform.isQQ()) ) {
            video.src = vSrc;
            curIndex = 1;
        } else {  //  否则直接播放内容
            video.src = targetSrc;
            curIndex = 2;
        }

        //判断是否连续播放，到片尾结束停止
        function whichShouldPlay(){
            switch(curIndex) {
                case 1:
                    video.src = vSrc;
                    video.play();
                    break;
                case 2: 
                    video.src = targetSrc;
                    video.play();
                    break;
                case 3:
                    video.src = vSrcEnd;
                    video.play();
                    break;
                case 4:
                    curIndex = 1;
                    //判断显示哪个遮罩层
                    showWhichReplayPage()
                    break;
                default:
                    break;
            }
        }
        
        function showWhichReplayPage(){
            //判断是否有data-recommend属性
            if($element.attr('rec-video')){
                //显示带有推荐视频和重播的遮罩层
                showReplayPageWithRecommend()
            }else{
                //显示只有重播的遮罩的界面
                showReplayPage() 
            }
        }

        function showReplayPage(){
            //创建只有重播的DOM
            createDocumentFragment()
            $('video-mask').show()
            //监听事件
            replayEvent()
        }
        function showReplayPageWithRecommend(){
            //创建有推荐视频和重播的DOM
            createDocumentFragmentWithRecommend()
            $('.rec-video-wrapper').show()
            //获取推荐视频信息
            getRecVideoData()
            replayEvent()
            bindClickNewVideo()
        }

        function createDocumentFragmentWithRecommend(){
            var html = `<div class="rec-video-wrapper">
                            <div class="left-container">
                                <div class="rec-video-container">
                                    <a class="rec-video" href="#">
                                        <div class="video-thumb">
                                            <img src="" alt="">
                                        </div>
                                        <p class="video-title"></p>
                                    </a>
                                </div>
                                <div class="rec-video-container">
                                    <a class="rec-video" href="#">
                                        <div class="video-thumb">
                                            <img src="" alt="">
                                        </div>
                                        <p class="video-title"></p>
                                    </a>
                                </div>
                            </div>
                            <div class="right-container">
                                <div class="video-replay-button">
                                    <span class="replay-icon">&#8634;</span>
                                    <span class="title">重播</span>
                                </div>
                            </div>
                        </div>`
            $element.append(html); 
        }

        function createDocumentFragment(){
            var html = `<div class="video-mask">
                            <div class="video-replay-button">
                                <span class="iconfont">&#8634;</span>
                            </div>
                        </div>`
            $element.append(html);
        }

        function replayEvent(){
            $('.video-replay-button').on('click', function(){
                $('.rec-video-wrapper').hide()
                $('.video-mask').hide()
                //  如果有片头并且非IOS上的QQ浏览器 则播放片头
                if (vSrc && ! (platform.isIos() && platform.isQQ()) ) {
                    video.src = vSrc;
                    curIndex = 1;
                } else {  //  否则直接播放内容
                    video.src = targetSrc;
                    curIndex = 2;
                }
                removeNode('.rec-video-wrapper')
                removeNode('.video-mask')
                video.play();
            })
        }

        function getRecVideoData(){
            var recVideoData = JSON.parse($element.attr('rec-video'));

            for (var i = 0; i < recVideoData.length; i++) {
                var title = recVideoData[i].recTitle;
                var thumb = recVideoData[i].recThumb;
                var url  = recVideoData[i].recUrl;
                var recVideo = $('.rec-video');
                recVideo.eq(i).find('img').attr('src',thumb);
                recVideo.eq(i).find('.video-title').text(title);
                recVideo.eq(i).attr('href',url);
            }
        }

        function bindClickNewVideo(){
            $('.rec-video').on('click',function(e){
                event.preventDefault()
                var newUrl = $(e.currentTarget).attr('href');
                targetSrc = newUrl
                $element.attr('target-src',targetSrc)
                //  如果有片头并且非IOS上的QQ浏览器 则播放片头
                if (vSrc && ! (platform.isIos() && platform.isQQ()) ) {
                    video.src = vSrc;
                    curIndex = 1;
                } else {  //  否则直接播放内容
                    video.src = targetSrc;
                    curIndex = 2;
                }
                $('.rec-video-wrapper').hide()
                removeNode('.rec-video-wrapper')
                video.play();
            })
        }
        function removeNode(node){
            $(node).remove()
        }
    };

    return customElem;
});






