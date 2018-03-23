# mip-story

`<mip-story>` 的诞生，使得正在经历消费升级的移动互联网时代，可以引入更好质量和多元化的内容，不但可以提升用户体验，同时也帮助用户寻找到更丰富的资源和交互方式。

`<mip-story>` 具有三个基本概念：段落（view），层（layer）和元素（element）。

![](https://mip-extensions.bj.bcebos.com/mip-story/intro-view-layer-element.jpg)

- 每个小故事可以包含多个段落（view），每个段落充满屏幕。用户操作翻页后，会看到下一个段落。
- 每个段落又可以包含多个层（layer），单个层可以设置布局模式，如多行布局，左右布局，图片拉伸布局等。
- 元素（element）是资源素材，如背景图，主标题，详细描述等。在 `<h1>`、`<p>`、`<mip-img>` 等标签中声明。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-story/mip-story.js<br>https://c.mipcdn.com/static/v1/mip-share/mip-share.js<br>https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js

## 示例

### 基本用法
```html
<mip-story standalone>
    <script type="application/json">
    {
        "share": {
            "thumbnail": "https://mip-extensions.bj.bcebos.com/oscar/cover.jpg",
            "background": "https://mip-extensions.bj.bcebos.com/oscar/p8.png",
            "title": "第90届奥斯卡颁奖典礼回顾",
            "from": "小故事"
        }
    }
    </script>
    <mip-story-view>
        <mip-story-layer template="fill">
            <mip-img width="480" class="fade-in-scale" height="720" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>
        </mip-story-layer>
        <mip-story-layer>
            <h1>小故事是什么？</h1>
            <p>快用 MIP 小故事开发很多丰富的交互效果吧！</p>
            <a href="https://www.baidu.com">普通跳转链接</a>
        </mip-story-layer>
    </mip-story-view>
    <mip-story-view>
        <mip-story-layer template="fill">
            <mip-img width="480" class="fade-in-scale" height="720" src="https://www.mipengine.org/static/img/sample_02.jpg"></mip-img>
        </mip-story-layer>
        <mip-story-layer>
            <h1>用 MIP 来讲述你的故事！</h1>
        </mip-story-layer>
    </mip-story-view>
</mip-story>
```

## 数据配置
为提供给用户更多信息和传播渠道，在 `<mip-story>` 段落最后提供了专门用于展示分享及小故事更多相关信息的页面。当用户在最后一个段落继续向后点击时候，即会出现。其中该页面内容需要通过开发者进行配置，具体配置参数如下：

- share：share 字段下包含的是分享相关的数据：
  - thumbnail：预览小故事的缩略图地址。
  - background：结尾页背景图片地址。
  - title：小故事标题。
  - from：资源的来源信息。

## 属性

## mip-story

### background-audio

用于配置全局播放的音频地址，需要使用 HTTPS 协议。

## mip-story-view

### background-audio

用于配置在每个段落播放的音频地址，切换段落后，前一个段落的音频会终止。需要使用 HTTPS 协议。如果同时配置了全局和局部音频，则只会播放全局音频。

### mip-story-layer

该元素表示“层”的概念，在每一个 `<mip-story-view>` 元素里面可以有多个 layer 作为段落内容，如视频、图片、文字等。

#### template

说明：`template` 表示一个 layer 的布局方式，可以分为以下几种布局方式：
- `fill`：填充布局，该布局方式会将当前 `<mip-story-layer>` 中的第一个元素进行填充布局，其他元素均隐藏。适合于将图片、视频作为背景展示的场景。
- `vertical`：`<mip-story-layer>` 中的元素沿 `y` 轴排列，`x` 轴方向填充布局。
- `horizontal`：`<mip-story-layer>` 中的元素沿 `x` 轴排列，`y` 轴方向填充。

[notice] 页面中使用视频时，请注意两点：一、视频不建议作为背景填充，因为在 Android 中视频播放器优先级较高会遮住页面内容，导致用户操作不能正常进行。二、视频作为每个段落内容时，不建议设置自动播放，即添加 `autoplay` 属性，因为 iOS 下的部分浏览器会直接弹出系统的视频播放器，影响用户体验。如果需要播放视频，可以暂时使用 GIF + `background-audio` 进行设置。

默认情况下会按照正常布局进行展示。   

必选项：否
