# mip-ad-video
mip-ad-video1 实现了一个简单的广告+视频的播放器+遮罩

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ad-video1/mip-ad-video.js

## 示例

### 带广告的播放
```html
<div class="shipin">
<mip-ad-video id="video" ad-src="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    ad-src-end="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    poster="http://upload.vodjk.com/2016/0930/1475202927645.jpg"
    target-src="http://dianbo.vodjk.com/vod/xinma/jbl/wgk/2016/04/20/499DBA6FFCD74fc195C4C59859BDA08C.mp4">
</mip-ad-video>
    <div class="box2 hide">
               <div class="tuijian">
                  <p>向您推荐</p>
                  <p class="close"><a>关闭</a><b></b></p>
               </div>
               <div class="picqu">
                   <a class="pic" href="http://m.youlai.cn/video/article/272742.html">
                       <mip-img class="gaodu" id="gaodu1" src="http://file.youlai.cn/cnkfile1/M00/00/0E/ooYBAFdfLiGAKRKPAAFPJnnRsBs14.jpeg">
                   </a>
                   <a class="pic juli" href="http://m.youlai.cn/video/article/272742.html">
                      <mip-img class="gaodu" src="http://file.youlai.cn/cnkfile1/M00/00/0E/ooYBAFdfLiGAKRKPAAFPJnnRsBs14.jpeg">
                   </a>
               </div>
               <div class="neirong">
                  <a href="http://m.youlai.cn/video/article/272742.html"></a>
                  <a class="juli" href="http://m.youlai.cn/video/article/272742.html"></a>
               </div>
     </div>
     <div class="play hide">继续播放</div>
</div>
``` 
```style
<style mip-custom>
	 mip-ad-video {
	  width: 100%;
	  position: relative;
	 }
	  video {
		width: 100%;
		height: 214px !important;
		display: block;
		background-color: rgb(0, 0, 0);
	  }
	  #video{height:214px;}
	  .shipin{position:relative; height:214px;}
	  .box2{width:100%; height:214px; position:absolute; background-color:#000000;z-index:5500000000; top:0;opacity: 0.85;}
		.tuijian{ width:100%; height:45px;}
		.tuijian p{color:#FFF; font-size:18px; width:30%; float:left; margin-left:15px; line-height:40px;}
		.tuijian .close{font-size:15px; text-align:center;width: 55px; height: 25px;
		  margin-top: 10px; margin-right:20px; float:right; line-height:25px;
		  border: 1px solid rgba(255, 255, 255, 0.3);border-radius:2px;}
		.tuijian .close b{display:inline-block; width:12px; height:2px; background:#fff; font-size:0; line-height:0;
		  vertical-align:middle;-webkit-transform: rotate(45deg); margin-left:3px;}
		.tuijian .close a{color:#fff !important;}
		.tuijian .close b:after{content:'.'; display:block; width:12px; height:2px;
		  background:#fff;-webkit-transform: rotate(-90deg);}
		.picqu{ width:90%; margin:0 auto;}
		.pic{width: 46.7%;  display:inline-block;}
		.juli{margin-left: 5.2%;}
		.gaodu{height:95px;}
		.neirong{width:90%; height:20px; margin:0 auto; margin-top:3px; font-size:14px;}
		.neirong a{color:#fff; width: 46.7%;  display:inline-block;}
		.play{width:80px; height:30px; background-color:#e2480e; border-radius:15px; bottom:9px;
		text-align:center; line-height:28px; color:#fff; margin:0 auto; position:absolute; left:50%;
		margin-left:-40px; z-index:5500000001;}
		.hide{display:none;}
</style>

## 属性

### ad-src
说明：广告视频的url地址  
必选项：是
类型：string

### ad-src-end
说明：目标视频播放完毕之后的广告url地址
必选项：否
类型：string

### target-src
说明：视频的url地址    
必选项：是  
类型：string

### poster
说明：视频的封面图片    
必选项：是  
类型：string

## 注意事项  
不带广告的播放器,请使用 mip-video
