# mip-audio 音频播放

音频播放组件，支持src播放，source播放，进度拖动功能。

标题|内容
----|----
类型|通用
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-audio/mip-audio.js

## 示例

### 基本示例
mip-audio 使用方法同 audio 标签。

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
### 使用source定义多音频源

``` html
<mip-audio 
    src="https://mip-doc.bj.bcebos.com/guitar.mp3"
    controls
    loop
    width="320">
    <source src="https://mip-doc.bj.bcebos.com/horse.mp3">
    <source src="https://mip-doc.bj.bcebos.com/horse.ogg">
</mip-audio>
```
-->


### 自定义控件皮肤
使用 customControls 属性指向自定义交互控件。可以更改DOM位置，通过增加class及css为控件添加皮肤。  

下列class涉及到事件绑定，请务必保留：

- mip-audio-play-pause 开始/暂停按钮
- mip-audio-stopped-icon 图标，暂停时显示的三角图标
- mip-audio-playing-icon 图标，播放时显示的双竖杠图标
- mip-audio-time-current 当前播放时间
- mip-audio-seekbar 进度条
- mip-audio-seekbar-fill 进度条中已播放，具有特殊颜色
- mip-audio-seekbar-btn 进度条拖动按钮
- mip-audio-time-total 音频总时长

[notice] mip-audio-play-pause 等 class请务必保留，开发时请关注控制台（console），避免组件报错。

``` html
<mip-audio 
    src="https://mip-doc.bj.bcebos.com/guitar.mp3"
    controls
    customControls = ".mip-audio-controller"
    width="320">
    <div class="mip-audio-controller bg-color-pink">
    	<i class="mip-audio-play-pause mip-audio-stopped-icon"></i>
    	<div class="mip-audio-time-current color-gray">00:00</div>
    	<div class="mip-audio-seekbar">
        	<div class="mip-audio-seekbar-fill bg-color-pink2"></div>
            <div class="mip-audio-seekbar-btn bg-color-pink3"></div>
        </div>
        <div class="mip-audio-time-total color-gray">--:--</div>
    </div>
</mip-audio>
```

### 不显示播放控件
添加`controls="no"`可以禁止播放控件显示，但需要注意，如果不添加autoplay，音频就不会播放。

```
<mip-audio 
    src="https://mip-doc.bj.bcebos.com/guitar.mp3"
    loop
    autoplay
    controls="no"
    width="320">
</mip-audio>
```

## 属性

### customControls
说明：音频交互控件  
是否必填：否  
示例：".mip-audio-controller"  
格式：使用document.querySelector()可选择到的值  

### controls
说明：音频交互控件  
是否必填：否  
默认值：无 （存在交互控件）
其它可选值：controls 显示交互控件，controls="no"不显示交互控件 

### src loop autoplay 等  
说明：audio 属性在mip-audio标签上可以直接使用  
使用限制：属性名和使用方法以[MDN文档-audio标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)为准
