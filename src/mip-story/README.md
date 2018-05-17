## 小故事组件的介绍

## 组件介绍

### 1、小故事的介绍

 	小故事是基于[mip](https://www.mipengine.org/)技术的一个产品，小故事的组件也是MIP组件，主要是三个组件一起使用，构成小故事的整体结构，其中故事组件为`mip-story`，段落为`mip-story-view`，层为`mip-story-layer`。


| **描述**       | 丰富的视觉故事形式。                                         |
| -------------- | ------------------------------------------------------------ |
| **可用性**     | 可用                                                         |
| **必需的脚本** | `<script src="https://c.mipcdn.com/static/v1/mip-share//mip-story.js"></script>` |
| **支持的布局** | 没有                                                         |
| **例子**       | 请参阅MIP的小故事实力。从“ [创建视觉MIP故事](https://www.mipengine.org/examples/mip-extensions/mip-story.html)教程”中学习。 |

展现形式如下：

![story-demo](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/oscar5.gif)

小故事的组织结构为：

​	小故事主要由 [mip-story 组件](/examples/mip-extensions/mip-story.html) 承载，充当小故事中所有段落的容器，按照段落个数自动生成段落导航，返回链接，段落播放完的重播和分享功能。

小故事具有三个基本概念：段落（view），层（layer）和元素（element）.

- 每个小故事可以包含多个段落（view），每个段落充满屏幕。用户操作翻页后，会看到下一个段落。
- 每个段落又可以包含多个层（layer），单个层可以设置布局模式，如多行布局，左右布局，图片拉伸布局等。
- 元素（element）是资源素材，如背景图，主标题，详细描述等。在 `<h1>`、`<p>`、`<mip-img>` 等标签中声明。

![intro-view-layer-element (1)](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/intro-view-layer-element%20(1).jpg)

​	这里的每一个组件都是一个mip组件，其中故事组件为`mip-story`，段落为`mip-story-view`，层为`mip-story-layer`，元素为资源素材，如背景图，主标题，详细描述等。在 `<h1>`、`<p>`、`<mip-img>` 等标签中声明。

![mip-story-tag-hierarchy](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/demo-story1.png)

代码结构：

```html
<!DOCTYPE html>
<html mip>
<head>
    <meta charset="utf-8">
    <title>小故事内置动画效果示意图</title>
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=no">
    <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
    <link rel="canonical" href="http://www.1905.com/mip/oscar">
    <style mip-custom>
        * {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <mip-story>
        <script type="application/json">
        {
            "share": {
                "thumbnail": "./1.jpg",
                "background": "./1.jpg",
                "title": "The art of an organized refrigerator",
                "from": "mic.com"
            }
        }
        </script>
        <mip-story-view>
            <mip-story-layer template="fill">
                <mip-img src="cover.jpg"></mip-img>
            </mip-story-layer>
            <mip-story-layer template="fill">
                <h1>Hello, mip-story!</h1>
            </mip-story-layer>
        </mip-story-view>
        <mip-story-view>
            <mip-story-layer template="fill">
                <mip-img src="second.jpg"></mip-img>
            </mip-story-layer>
            <mip-story-layer template="fill">
                <h1>The End!</h1>
            </mip-story-layer>
        </mip-story-view>
	</mip-story>
    <!-- MIP 运行环境 -->
    <script src="https://c.mipcdn.com/static/v1/mip.js"></script>
    <!-- 小故事依赖脚本 -->
    <script src="https://c.mipcdn.com/static/v1/mip-share/mip-share.js"></script>
    <script src="https://c.mipcdn.com/static/v1/mip-story/mip-story.js"></script>
    <script src="https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js"></script>
    <script src="https://c.mipcdn.com/static/v1/mip-scrollbox/mip-scrollbox.js"></script>
</body>
</html>
```

以上的详细内容您可以查看[开发小故事前期准备](https://github.com/mipengine/www.mipengine.org/blob/master/source/doc/story/index.md)和[小故事的组织结构]()了解基础信息；

### 2、各个组件的介绍

#### 2.1  `mip-story`组件

##### 属性：

| 属性               | 是否必须 | 取值范围           | 描述                                           |
| ------------------ | -------- | ------------------ | ---------------------------------------------- |
| `background-audio` | 否       | string（音频地址） | 全局播放的音频地址                             |
| `audio-reload`     | 否       | 存在/不存在        | 拥有音频的段落在切换后返回，音频会重新从头播放 |
| `audio-hide`       | 否       | 存在/不存在        | 音频按钮是否显示                               |
| 数据配置           | 否       | json               | 用来配置小故事分享页面的内容                   |

- 以下是每个属性的详细使用方法

  - background-audio：用于配置全局播放的音频地址，需要使用 HTTPS 协议。

    示例

    ```html
    <mip-story background-audio="https://example.com/example.mp3">
    	...
    </mip-story>
    ```

  - audio-reload：如果包含该属性，拥有音频的段落在切换后返回，音频会重新从头播放。

    示例

    ```html
    <mip-story background-audio="https://example.com/example.mp3" audio-reload>
    	...
    </mip-story>
    ```

  - audio-hide：如果包含该属性，音频按钮会默认隐藏。

    示例

    ```html
    <mip-story background-audio="https://example.com/example.mp3" audio-hide>
    	...
    </mip-story>
    ```

  - 数据配置

    ​	为提供给用户更多信息和传播渠道，在 `<mip-story>` 段落最后提供了专门用于展示分享及小故事更多相关信息的页面。当用户在最后一个段落继续向后点击时候，即会出现。其中该页面内容需要通过开发者进行配置，具体配置参数如下：

    - share: share 字段下包含的是分享相关的数据。
    - share.thumbnail: 预览小故事的缩略图地址。
    - share.background: 结尾页背景图片地址。
    - share.title: 小故事标题。
    - share.from: 资源的来源信息。
    - recommend: 小故事推荐相关的信息。
    - recommend.items: 推荐小故事列表，它是一个数组，包含了所有推荐的小故事数据。
      - cover: 推荐的小故事背景图片。
      - url: 推荐的小故事跳转地址。
      - title: 推荐的小故事标题。
      - from: 推荐的小故事来源信息。
      - fromUrl: 推荐的小故事来源跳转地址。

    ```html
    <mip-story>
        <script type="application/json">
            {
                "share": {
                    "thumbnail": "https://mip-extensions.bj.bcebos.com/oscar/cover.jpg",
                    "background": "https://mip-extensions.bj.bcebos.com/oscar/p8.png",
                    "title": "第90届奥斯卡颁奖典礼回顾",
                    "from": "小故事"
                },
                "recommend": {
                    "url": "https://www.example.com/",
                    "items": [
                        {
                            "cover": "https://www.example.com/static/img/mip-story/p5.png",
                            "url": "https://www.example.com/",
                            "title": "第80届奥斯卡颁奖典礼",
                            "from": "example",
                            "fromUrl": "http://example.com/from"
                        },
                        {
                            "cover": "https://www.example.com/static/img/mip-story/p5.png",
                            "url": "https://www.example.com/",
                            "title": "第80届奥斯卡颁奖典礼",
                            "from": "example",
                            "fromUrl": "http://www.example.com/from"
                        }
                    ]
                }
            }
    	</script>
        <mip-story-view>
            <mip-story-layer template="fill">
            </mip-story-layer>
        </mip-story-view>
    </mip-story>
    ```

    实际页面效果如下：

    ![share](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/share.jpeg)

    目前，我们支持分享到朋友圈、微信好友、QQ空间、新浪微博；

#### 2.2  `mip-story-view`

##### 属性：

| 属性               | 是否必须 | 取值范围           | 描述                   |
| ------------------ | -------- | ------------------ | ---------------------- |
| `id`               | 是       | 该段落特有的ID     | 用于对当前段落进行定位 |
| `background-audio` | 否       | string（音频地址） | 每个段落播放的音频地址 |

- 以下是每个属性的详细使用方法

  - background-audio：用于配置在每个段落播放的音频地址，切换段落后，前一个段落的音频会终止。需要使用 HTTPS 协议。如果同时配置了全局和局部音频，则只会播放全局音频。

    示例

    ```html
    <mip-story>
    	<mip-story-view id="first-page" background-audio="https://example.com/example.mp3">
            ...
    	</mip-story-view>
    </mip-story>
    ```

#### 2.3 `mip-story-layer`

​	该元素表示“层”的概念，在每一个 `<mip-story-view>` 元素里面可以有多个 layer 作为段落内容，如视频、图片、文字等。

##### 属性：

| 属性       | 是否必须 | 取值范围                                   | 描述             |
| ---------- | -------- | ------------------------------------------ | ---------------- |
| `template` | 否       | `fill`、`vertical`、`horizontal`、`thirds` | layer 的布局方式 |

- template：表示一个 layer 的布局方式。

  示例

  ```html
  <mip-story>
    <mip-story-view>
      <mip-story-layer template="fill">
        ...
      </mip-story-layer>
    </mip-story-view>
  </mip-story>
  ```

可以分为以下几种布局方式：

- `template="fill"`：填充布局，该布局方式会将当前 `<mip-story-layer>` 中的第一个元素进行填充布局，其他元素均隐藏。适合于将图片、视频作为背景展示的场景。如图：

```html
<mip-story-layer template="fill">
    <mip-img src="./cover.jpg)"></mip-img>
</mip-story-layer>
```

![layer-fill](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/cover-2.png)

- `template="vertical"`：`<mip-story-layer>` 中的元素沿 `y` 轴排列，`x` 轴方向填充布局。

```html
<mip-story-layer template="vertical">
  <p>element 1</p>
  <p>element 2</p>
  <p>element 3</p>
</mip-story-layer>
```

![layer-vertical](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/cover-3.png)

- `template="horizontal"`：`<mip-story-layer>` 中的元素沿 `x` 轴排列，`y` 轴方向填充。

```html
<mip-story-layer template="horizontal">
  <p>element 1</p>
  <p>element 2</p>
  <p>element 3</p>
</mip-story-layer>
```

![layer-horizontal](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/cover-4.png)

- `template="thirds"`：支持上中下三列布局，在使用该布局时，内部的元素需要同时加入对应的属性，包括：
  - `flex-area='upper-third'`: 元素位于三等分布局的上部；
  - `flex-area='middle-third'`: 元素位于三等分布局的中部；
  - `flex-area='lower-third'`: 元素位于三等分布局的下部；


```html
<mip-story-layer template="thirds">
  <h1 flex-area="upper-third">element 1</h1>
  <p flex-area="middle-third"></p>
  <p flex-area="lower-third">element 2</p>
</mip-story-layer>
```

![layer-thirds](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/cover-5.png)

- **注意：**

**使用 thirds 布局时，内部的第一次子元素必须使用 `flex-area` 进行声明，并且每个类型的 `flex-area` 只能使用一次，否则会导致元素不能正常展示。**

**页面中使用视频时，请注意两点：一、视频不建议作为背景填充，因为在 Android 中视频播放器优先级较高会遮住页面内容，导致用户操作不能正常进行。二、视频作为每个段落内容时，不建议设置自动播放，即添加 `autoplay` 属性，因为 iOS 下的部分浏览器会直接弹出系统的视频播放器，影响用户体验。如果需要播放视频，可以暂时使用 GIF + `background-audio` 进行设置。**

默认情况下会按照正常布局进行展示。

#### 内置动画

​	在小故事的层（layer）中可以添加 HTML 元素来完成页面展示，在 HTML 元素中添加 `animate-in` 属性来完成指定的动画效果，例如：可以让标题从左侧滑入、文字淡入出现等。

**属性：**

| 属性                  | 是否必须 | 取值范围                                  | 描述                                 |
| --------------------- | -------- | ----------------------------------------- | ------------------------------------ |
| `animate-in`          | 否       | `fade-in`、`fly-in-top`、`fly-in-bottom`… | 内置动画的类型                       |
| `animate-in-duration` | 否       | ms                                        | 元素动画的持续事件                   |
| `animate-in-delay`    | 否       | ms                                        | 元素动画开始前的延迟时间             |
| `animate-in-after`    | 否       | ms                                        | 指定动画在另一个元素动画结束之后触发 |

​	基本用法：

```html
<style mip-custom>
    mip-story-view {
        color: #fff;
    }
    h1 {
        text-align: center;
    }
    .box {
        width: 100px;
        height: 100px;
        background-color: #09f;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
    }
    </style>
<mip-story>
    <mip-story-view>
        <mip-story-layer template="vertical">
              <h1>fade-in</h1>
              <div animate-in="fade-in" class="box"></div>
        </mip-story-layer>
	</mip-story-view>
</mip-story>
```

小故事提供以下预设动画：

| animate-in        | 默认动画时间（ms） | 默认延迟时间（ms） | 说明         |
| ----------------- | ------------------ | ------------------ | ------------ |
| `fade-in`         | 500                | 0                  | 淡入         |
| `fly-in-top`      | 500                | 0                  | 上侧滑入     |
| `fly-in-bottom`   | 500                | 0                  | 下侧滑入     |
| `fly-in-left`     | 500                | 0                  | 左侧滑入     |
| `fly-in-right`    | 500                | 0                  | 右侧滑入     |
| `twirl-in`        | 1000               | 0                  | 旋转进入     |
| `whoosh-in-left`  | 500                | 0                  | 左侧飞入     |
| `whoosh-in-right` | 500                | 0                  | 右侧飞入     |
| `rotate-in-left`  | 700                | 0                  | 左侧旋转飞入 |
| `rotate-in-right` | 700                | 0                  | 右侧旋转飞入 |

##### 更多的动画配置

`animate-in-duration` : 元素动画的持续事件；可以取得值为正整数，单位为毫秒；

`animate-in-delay` : 元素动画开始前的延迟时间，可以取得值为正整数，单位为毫秒

`animate-in-after` ：指定动画在另一个元素动画结束之后触发；可以的取值为带有动画元素的id

- 示例

```html
<mip-story-layer>
      <!-- 以fade-in的形式入场，动画时间持续1000ms, 动画开始前延迟1000ms-->
    <h1 animate-in="fade-in" animate-in-duration="1000" animate-in-delay="1000"  id="first-animate">最佳影片</h1>
      <!--在id为 first-animate 的元素动画动画结束之后开始执行-->
    <p animate-in="fly-in-left" animate-in-after="first-animate">钢铁侠是一部非常好的科幻片。</p>
</mip-story-layer>
```

- 实际动画示意图如下：

![小故事内置动画](http://mipstatic.baidu.com/static/mip-static/mip-story/demo/static/%E5%B0%8F%E6%95%85%E4%BA%8B%E5%86%85%E7%BD%AE%E5%8A%A8%E7%94%BB.gif)

​	以上内容为整个小故事组件的介绍，如果您在开始发中遇到任何问题，可以在[issue](https://github.com/mipengine/mip-extensions/issues)上给我们提相关问题，我们会第一时间给您反馈。