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
    rec-video='[{"recTitle":"测试测试测试测试测试测试测试测试测试测试测试","recUrl":"http://vodcdn.idongde.com/provider/2/2017/8/29/114758q1iea4kuyv5dor49rudi/hd/3ed5dd514f4d48fdaa38a0fd6c9bca0e.mp4","recThumb":"https://i2.hdslb.com/bfs/archive/0916a87aa47f7953a914670395e3c409e19d0f0b.jpg@320w_200h.webp"},{"recTitle":"测试测试测试测试测试测试测试测试测试测试测试","recUrl":"http://vodcdn.idongde.com/provider/2/2017/8/29/114758q1iea4kuyv5dor49rudi/hd/3ed5dd514f4d48fdaa38a0fd6c9bca0e.mp4","recThumb":"https://i2.hdslb.com/bfs/archive/0916a87aa47f7953a914670395e3c409e19d0f0b.jpg@320w_200h.webp"}]'>
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
