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
        $(video).css('width', window.innerWidth + 'px');

        $element[0].appendChild(video);
        
        showReplayPageWithRecommend()
        //showReplayPage()
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
            if($element.attr('data-recommend')){
                var data_recommend = $element.attr('data-recommend');
                var dataRecommend = JSON.parse(data_recommend);
                var recSrc = dataRecommend.recSrc;
                var recTitle = dataRecommend.recTitle;
                var recPoster = dataRecommend.recPoster;
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
            $(videoMask).show()
            //监听事件
            eventListener()
        }
        function showReplayPageWithRecommend(){
            //创建有推荐视频和重播的DOM
            createDocumentFragmentWithRecommend()
            $('.rec-video-wrapper').show()
            eventListener()
            //获取推荐视频信息
            // getData()
        }

        function createDocumentFragmentWithRecommend(){
            var html = `<div class="rec-video-wrapper">
                            <div class="left-container">
                                <div class="rec-video-container">
                                    <div class="rec-video">
                                        <div class="video-poster">
                                            <img src="https://i2.hdslb.com/bfs/archive/c76dc118dd8bac3c0b5f1837972f55e12b01b245.jpg@160w_100h.webp" alt="">
                                        </div>
                                        <p class="video-title">视频标题</p>
                                        <div class="play-button">
                                            <i class="play-icon">&#8634;</i>
                                        </div>
                                        <div class="video-mask"></div>
                                    </div>
                                </div>
                                <div class="rec-video-container">
                                    <div class="rec-video">
                                        <div class="video-poster">
                                            <img src="https://i2.hdslb.com/bfs/archive/c76dc118dd8bac3c0b5f1837972f55e12b01b245.jpg@160w_100h.webp" alt="">
                                        </div>
                                        <p class="video-title">视频标题</p>
                                        <div class="play-button">
                                            <i class="play-icon">&#8634;</i>
                                        </div>
                                        <div class="video-mask"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="right-container">
                                <div class="replay-button">
                                    <i class="replay-icon">&#8634;</i>
                                </div>
                            </div>
                            <div class="rec-video-wrap-mask"></div>
                        </div>`
            $element.append(html);
            $('.rec-video-wrapper').css('width', window.innerWidth + 'px');
            
        }
        function createDocumentFragment(){
            var fragment = new DocumentFragment();
            var replayButton = document.createElement('div');
            var replayIcon = document.createElement('i');
            //设置class和属性
            $(videoMask).addClass('video-mask');
            $(replayButton).addClass('video-replay-button');
            $(replayIcon).addClass('iconfont');
            $(replayIcon).html('&#8634;');
            $(videoMask).css('width', window.innerWidth + 'px');
            //添加节点
            replayButton.appendChild(replayIcon);
            videoMask.appendChild(replayButton);
            fragment.appendChild(videoMask);
            $element[0].appendChild(fragment);
        }

        function eventListener(){
            $('.video-replay-button').on('click', function(){
                $(videoMask).hide()
                //  如果有片头并且非IOS上的QQ浏览器 则播放片头
                if (vSrc && ! (platform.isIos() && platform.isQQ()) ) {
                    video.src = vSrc;
                    curIndex = 1;
                } else {  //  否则直接播放内容
                    video.src = targetSrc;
                    curIndex = 2;
                }
                video.play();
            })
        }

        function getData(){

        }
    };

    return customElem;
});






