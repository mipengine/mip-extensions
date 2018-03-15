# mip-search-video

mip-search-video 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-search-video/mip-search-video.js

## 示例

### 基本用法
```html
<mip-search-video width="640" height="360"
	src="http://mip-doc.bj.bcebos.com/MIPSampleVideo.mp4" 
	poster="https://mip-doc.bj.bcebos.com/mip-video-poster.jpg"
	controls>
</mip-search-video>
```

## 属性

下面是的<mip--search-video>属性。

### {src}

说明：{视频源地址，必须是 HTTPS 资源}
必选项：{否}
类型：{字符串}
取值范围：{URL}
默认值：{无}

### {poster}

说明：{封面图地址，为了保证视频载入过程中仍然有很好的呈现效果，请设置该字段}
必选项：{否}
类型：{字符串}
取值范围：{URL}
默认值：{无}

### {controls}

说明：{是否显示视频控制控件，包括开始/暂停按钮、全屏按钮、音量按钮等。对于非自动播放视频，请务必设置该属性。}
必选项：{否}
类型：{字符串}
取值范围：{任何}
默认值：{无}

### {autoplay}

说明：{是否自动播放。移动端部分浏览器会忽视 autoplay 参数，禁止自动播放，（[developer.apple.com 从用户体验角度的解释](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html)）}
必选项：{否}
类型：{字符串}
取值范围：{任何}
默认值：{无}

### height 

说明：{高度} 
必选项：{是} 
类型：{数字} 
默认值：{无}

### loop 

说明：{是否循环播放} 
必选项：{否} 
类型：{字符串}
默认值：{无}

### preload 

说明：{是否执行预加载，此属性在原生安卓或者iOS上均无效，会在部分安卓浏览器上有效} 
必选项：{否} 
类型：{枚举（none, metadata, auto）}
默认值：{none}

### width 

说明：{宽度} 
必选项：{是} 
类型：{数字} 
默认值：{无}

## muted 

说明：{是否静音} 
必选项：{否} 
类型：{字符串} 
默认值：{无}

## 注意事项

* 为防止视频加载造成页面抖动，指定视频的高度和宽度是一个好习惯。MIP 中，指定宽高是强制的。
* 如果定义了 layout 属性，width 和 height 属性将配合 layout 进行缩放。

