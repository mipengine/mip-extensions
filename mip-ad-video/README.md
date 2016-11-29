# mip-ad-video
mip-ad-video 实现了一个简单的广告+视频的播放器

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ad-video/mip-ad-video.js

## 示例

### 使用方式
```html
<mip-ad-video ad-src="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    ad-time="5"
    target-src="http://dianbo.vodjk.com:80/vod/xinma/jbl/wgk/2016/04/20/499DBA6FFCD74fc195C4C59859BDA08C.mp4">
</mip-ad-video>
``` 

## 属性

### ad-src
说明：广告视频的url地址 
必选项：否  
类型：string

### ad-time
说明：广告视频的播放时长
必选项：否  
类型：int

### target-src
说明：视频的url地址  
必选项：是
类型：string
