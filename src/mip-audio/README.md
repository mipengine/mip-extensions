# mip-audio 音频播放

音频播放组件，支持src播放，source播放，进度拖动功能。

标题|内容
----|----
类型|通用
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-audio/mip-audio.js

## 简单示例

``` html
<mip-audio 
    src="https://mip-doc.bj.bcebos.com/guitar.mp3"
    controls
    loop
    width="320">
</mip-audio>
```

<!--
升级校验中, 预计2018年开放使用。
## 使用source定义多音频源

``` html
<mip-audio 
    src="https://mip-doc.bj.bcebos.com/guitar.mp3"
    controls
    loop
    width="320">
    <source src="https://mip-doc.bj.bcebos.com/horse.mp3">
    <source src="https://mip-doc.bj.bcebos.com/horse.ogg">
</mip-audio>
``` -->
## 属性

### src

说明：音频地址  
格式：url    
使用限制：必须是https的  

### loop autoplay 等  
说明：audio 属性在mip-audio标签上可以直接使用  
使用限制：属性名和使用方法以[MDN文档-audio标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)为准
