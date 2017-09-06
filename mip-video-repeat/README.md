# mip-video-repeat
mip-video-repeat 实现了带片头片尾和重播功能的视频组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-video-repeat/mip-video-repeat.js

## 示例

### 带广告的播放
```html
<mip-video-repeat v-src="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    v-src-end="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    target-src="http://dianbo.vodjk.com/vod/xinma/jbl/wgk/2016/04/20/499DBA6FFCD74fc195C4C59859BDA08C.mp4"
    >
</mip-video-repeat>
``` 

## 属性

### v-src
说明：片头视频的url地址  
必选项：是
类型：string

### v-src-end
说明：目标视频播放完毕之后的片头url地址
必选项：是
类型：string

### target-src
说明：视频的url地址    
必选项：是  
类型：string

## 注意事项  
不带广告的播放器,请使用 mip-video
