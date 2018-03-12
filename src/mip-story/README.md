# mip-story

`<mip-story>` 的诞生，使得正在经历消费升级的移动互联网时代，可以引入更好质量和多元化的内容，不但可以提升用户体验，同时也帮助用户寻找到更丰富的资源和交互方式。

在一个页面中，通过 `<mip-story>` 组件作为内容总体的框架，用于处理页面全局功能，如事件监听、手势处理、初始化 UI 等。在 `<mip-story>` 中可以插入多个 `<mip-story-view>`，每个 view 都会作为一个全屏页面（宽高都为 100%）进行展示，多个页面之间通过左右切换来进行显示交互，并在页面顶部显示页面导航栏。与此同时，每一个 `<mip-story-view>` 中可以包含多个 `<mip-story-layer>`，顾名思义，layer 组件充当着“层”的作用，每个页面都可以包含多个层，来实现页面内容的摆放，这里也是需要开发者真正着手开发的地方，如在一个 `<mip-story-view>` 里定义两个 `<mip-story-layer>`，一个用于放置全屏的图片背景，一个用于放置需要在图片之上展示的文案，这样就可以轻松的构造出一个简单的单页应用。

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
        <mip-story-layer template="fill">
            <span>小故事是什么？</span>
            <span>快用 MIP 小故事开发很多丰富的交互效果吧！</span>
        </mip-story-layer>
    </mip-story-view>
    <mip-story-view>
        <mip-story-layer template="fill">
            <mip-img width="480" class="fade-in-scale" height="720" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>
        </mip-story-layer>
        <mip-story-layer template="fill">
            <span>小故事是什么？</span>
            <span>快用 MIP 小故事开发很多丰富的交互效果吧！</span>
        </mip-story-layer>
    </mip-story-view>
</mip-story>
```

## 数据配置
为提供给用户更多信息和传播渠道，在 `<mip-story>` 页面最后提供了专门用于展示分享及页面更多相关信息的页面。当用户在最后一个页面继续向后点击时候，即会出现。其中该页面内容需要通过开发者进行配置，具体配置参数如下：

- share

share 字段下包含的是分享相关的数据。

	- thumbnail：预览小故事的缩略图地址；
	- background：结尾页背景图片地址；
	- title：小故事标题；
	- from：资源的来源信息；

## 属性

### mip-story

#### standalone

说明：用于标示页面是 `<mip-story>` 类型的页面    
必选项：是

### mip-story-layer

该元素表示“层”的概念，在每一个 `<mip-story-view>` 元素里面可以有多个 layer 作为页面内容，如视频、图片、文字等。

#### template

说明：`template` 表示一个 layer 的布局方式，可以分为以下几种布局方式：
	
	- `fill`：填充布局，该布局方式会将当前 `<mip-story-layer>` 中的第一个元素进行填充布局，其他元素均隐藏。适合于将图片、视频作为背景展示的场景。
	- `vertical`：`<mip-story-layer>` 中的元素沿 `y` 轴排列，`x` 轴方向填充布局。
	- `horizontal`：`<mip-story-layer>` 中的元素沿 `x` 轴排列，`y` 轴方向填充。

默认情况下会按照正常布局进行展示。	

必选项：否
