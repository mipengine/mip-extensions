# mip-story

`<mip-story>` 的诞生，使得正在经历消费升级的移动互联网时代，可以引入更好质量和多元化的内容，不但可以提升用户体验，同时也帮助用户寻找到更丰富的资源和交互方式。

`<mip-story>` 具有三个基本概念：段落（view），层（layer）和元素（element）。

![](https://mip-extensions.bj.bcebos.com/mip-story/intro-view-layer-element.jpg)

- 每个小故事可以包含多个段落（view），每个段落充满屏幕。用户操作翻页后，会看到下一个段落。
- 每个段落又可以包含多个层（layer），单个层可以设置布局模式，如多行布局，左右布局，图片拉伸布局等。
- 元素（element）是资源素材，如背景图，主标题，详细描述等。在 `<h1>`、`<p>`、`<mip-img>` 等标签中声明。

| 标题   | 内容                                       |
| ---- | ---------------------------------------- |
| 类型   | 通用                                       |
| 支持布局 | responsive,fixed-height,fill,container,fixed |

| 所需脚本|https://c.mipcdn.com/static/v1/mip-story/mip-story.js<br>https://c.mipcdn.com/static/v1/mip-share/mip-share.js<br>https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js<br>https://c.mipcdn.com/static/v1/mip-scrollbox/mip-scrollbox.js<br>https://c.mipcdn.com/static/v1/mip-scrollbox/mip-scrollbox.js
## 示例
```html
<style mip-custom>
    mip-story-view {
        color: #fff;
        padding: 0 !important;
    }
    h1 {
        text-align: center;
    }
    mip-story {
        display: none;
    }
</style>
<mip-story standalone>
    <script type="application/json">
    {
        "xzh_info": {
          "appid": 12344567890
        },
        "share": {
            "thumbnail": "https://mip-extensions.bj.bcebos.com/oscar/cover.jpg",
            "background": "https://mip-extensions.bj.bcebos.com/oscar/p8.png",
            "title": "第90届奥斯卡颁奖典礼回顾",
            "desc": "一分钟带你了解第90届奥斯卡颁奖典礼",
            "from": "小故事"
        },
        "recommend": {
            "url": "https://www.example.com/",
            "items": [
                {
                    "cover": "https://img6.bdstatic.com/img/image/public/ribenshangying3.jpg",
                    "url": "http://shxingtuan.com/jp_sakura/index.html",
                    "title": "日本赏樱推荐",
                    "from": "百度",
                    "fromUrl": "m.baidu.com"
                },
                {
                    "cover": "https://img6.bdstatic.com/img/image/public/shangyingmeitu.jpg",
                    "url": "https://m.baidu.com/sf/vsearch?pd=image_content&word=%E8%B5%8F%E6%A8%B1&tn=vsearch&sa=vs_tab&lid=9813145669733695291&ms=1&atn=page&fr=tab&ssid=2e3d6e69757a696e616e6e616ece0f",
                    "title": "往年樱花美图欣赏",
                    "from": "百度",
                    "fromUrl": "m.baidu.com"
                }
            ]
        }
    }
    </script>
    <mip-story-view auto-advancement-after="3s">
        <mip-story-layer template="fill" animate-in="scale-in" animate-in-duration="3s">
            <mip-img width="480" class="fade-in-scale" height="720" src="https://www.mipengine.org/static/img/sample_02.jpg"></mip-img>
        </mip-story-layer>
        <mip-story-layer>
            <h1 animate-in="fade-in-right">用 MIP 来讲述你的故事！</h1>
        </mip-story-layer>
    </mip-story-view>
    <mip-story-view>
        <mip-story-layer template="fill" animate-in="scale-in" animate-in-duration="3s">
            <mip-img width="480" class="fade-in-scale" height="720" src="https://www.mipengine.org/static/img/sample_02.jpg"></mip-img>
        </mip-story-layer>
        <mip-story-layer>
            <h1 animate-in="fade-in-right">用 MIP 来讲述你的故事！</h1>
        </mip-story-layer>
    </mip-story-view>
</mip-story>
```

## 数据配置
为提供给用户更多信息和传播渠道，在 `<mip-story>` 段落最后提供了专门用于展示分享及小故事更多相关信息的页面。当用户在最后一个段落继续向后点击时候，即会出现。其中该页面内容需要通过开发者进行配置，具体配置参数如下：

- xzh_info 选填，显示熊掌号信息
    - appid: 熊掌号id，必须与预留地址相对应
- share: share 字段下包含的是分享相关的数据。
- share.thumbnail: 预览小故事的缩略图地址。
- share.background: 结尾页背景图片地址。
- share.decs: 小故事的描述内容
- share.title: 小故事标题。
- share.from: 资源的来源信息。
- recommend: 小故事推荐相关的信息。
- recommend.items: 推荐小故事列表，它是一个数组，包含了所有推荐的小故事数据。
    - cover: 推荐的小故事背景图片。
    - url: 推荐的小故事跳转地址。
    - title: 推荐的小故事标题。
    - from: 推荐的小故事来源信息。
    - fromUrl: 推荐的小故事来源跳转地址。

## 为元素添加动画

在小故事中，我们提供了一些内置的动画，小故事页面元素在进场的时候变得更生动有趣；

### 基本用法

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

### 更多动画配置

`animate-in`: 元素入场的动画类型，小故事提供以下预设动画

| animate-in        | 说明     |
| ----------------- | ------ |
| `fade-in`         | 淡入     |
| `fly-in-top`      | 上侧飞入   |
| `fly-in-bottom`   | 下侧飞入   |
| `fly-in-left`     | 左侧飞入   |
| `fly-in-right`    | 右侧飞入   |
| `fade-in-top`     | 上侧淡入  |
| `fade-in-bottom`  | 下侧淡入  |
| `fade-in-left`    | 左侧淡入  |
| `fade-in-right`   | 右侧淡入  |
| `twirl-in`        | 旋转进入   |
| `whoosh-in-left`  | 左侧放大飞入 |
| `whoosh-in-right` | 右侧放大飞入 |
| `rotate-in-left`  | 左侧旋转飞入 |
| `rotate-in-right` | 右侧旋转飞入 |

`animate-in-duration` : 元素动画的持续时间，默认单位为毫秒，可取值为300、300ms、0.3s，以上都代表动画持续时间为300ms；

`animate-in-delay` : 元素动画开始前的延迟时间，默认单位为毫秒，可取值为300、300ms、0.3s，以上都代表动画开始前延迟时间为300ms；

`animate-in-after` ：指定动画在另一个元素动画结束之后触发；可以的取值为带有动画元素的id

```html

<mip-story-layer>
    <!-- 以fade-in的形式入场，动画时间持续1000ms, 动画开始前延迟1000ms-->
    <h1 animate-in="fade-in" animate-in-duration="1000" animate-in-delay="1000"  id="first-animate">最佳影片</h1>
    <!--在id为 first-animate 的元素动画动画结束之后开始执行-->
    <p animate-in="fly-in-left" animate-in-after="first-animate">钢铁侠是一部非常好的科幻片。</p>
</mip-story-layer>

```



## 属性

## mip-story

### background-audio

用于配置全局播放的音频地址，需要使用 HTTPS 协议。

### audio-reload

如果包含该属性，拥有音频的段落在切换后返回，音频会重新从头播放。

### audio-hide

如果包含该属性，音频按钮会默认隐藏。

## mip-story-view

### background-audio

用于配置在每个段落播放的音频地址，切换段落后，前一个段落的音频会终止。需要使用 HTTPS 协议。如果同时配置了全局和局部音频，则只会播放全局音频。

### mip-story-layer

该元素表示“层”的概念，在每一个 `<mip-story-view>` 元素里面可以有多个 layer 作为段落内容，如视频、图片、文字等。

#### template

说明：`template` 表示一个 layer 的布局方式，可以分为以下几种布局方式：
- `fill`: 填充布局，该布局方式会将当前 `<mip-story-layer>` 中的第一个元素进行填充布局，其他元素均隐藏。适合于将图片、视频作为背景展示的场景。
- `vertical`: `<mip-story-layer>` 中的元素沿 `y` 轴排列，`x` 轴方向填充布局。
- `horizontal`: `<mip-story-layer>` 中的元素沿 `x` 轴排列，`y` 轴方向填充。
- `thirds`：支持上中下三列布局，在使用该布局时，内部的元素需要同时加入对应的属性，包括：
    - `flex-area='upper-third'`: 元素位于三等分布局的上部；
    - `flex-area='middle-third'`: 元素位于三等分布局的中部；
    - `flex-area='lower-third'`: 元素位于三等分布局的下部；

[notice] 使用 thirds 布局时，内部的第一次子元素必须使用 `flex-area` 进行声明，并且每个类型的 `flex-area` 只能使用一次，否则会导致元素不能正常展示。

[notice] 页面中使用视频时，请注意两点：一、视频不建议作为背景填充，因为在 Android 中视频播放器优先级较高会遮住页面内容，导致用户操作不能正常进行。二、视频作为每个段落内容时，不建议设置自动播放，即添加 `autoplay` 属性，因为 iOS 下的部分浏览器会直接弹出系统的视频播放器，影响用户体验。如果需要播放视频，可以暂时使用 GIF + `background-audio` 进行设置。

默认情况下会按照正常布局进行展示。

必选项：否
