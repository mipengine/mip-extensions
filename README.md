# MIP 组件

MIP 组件包括官方组件和开发者自定义组件，是用于定制站点需求的必备功能。

## 官方组件

### 使用方式

使用组件前，需在页面中引入对应脚本，引用脚本格式如下：

mip-extensions 仓库：`https://mipcache.bdstatic.com/static/v1/{组件名}/{组件名}.js`

mip-extension-platform 仓库：`https://mipcache.bdstatic.com/extensions/platform/v1/{组件名}/{组件名}.js`

### 示例

```
<script async src="https://mipcache.bdstatic.com/static/v1/mip-form/mip-form.js"></script>
```

### 官方组件库列表

#### 1. 内置组件

内置组件是包含在 mip.js 中的组件，可直接使用，无需另外引入js脚本。

| 内置组件 | 描述 |
| --------- | ----------- |
| [`mip-carousel`](https://github.com/mipengine/mip/blob/master/src/components/mip-carousel.js) | mip-carousel 用来支持 mip 中图片的一种展示方式，支出多图轮播 |
| [`mip-iframe`](https://github.com/mipengine/mip/blob/master/src/components/mip-iframe.js) | mip-iframe 是用来支持在 mip 中嵌入第三方内容的一种方式，需要注意的是：所嵌入的内容强制是符合https协议的 |
| [`mip-img`](https://github.com/mipengine/mip/blob/master/src/components/mip-img.js) | mip-img 用来支持在 mip 中增加图片内容 |
| [`mip-pix`](https://github.com/mipengine/mip/blob/master/src/components/mip-pix.js) | 将 mip-pix 组件直接引入，可发送带有自定义参数的请求，用于统计页面访问情况。这些参数主要包括页面打开时间点，页面title和当面页面地址 |
| [`mip-video`](https://github.com/mipengine/mip/blob/master/src/components/mip-video.js) | mip-video 用来支持在 mip 中增加视频内容，是HTML `<video>`的直接包装。功能与兼容性与HTML5`<video>`一致 |

#### 2. 个性化组件

个性化组件是满足于特定需求的组件，包括交互，统计等需求。需要引入对应的 js 脚本。

| 个性化组件 | 描述 |
| --------- | ----------- |
| [`mip-accordion`](https://github.com/mipengine/mip-extensions/tree/master/mip-accordion) | 折叠隐藏节点(可记录用户上次行为) |
| [`mip-analytics`](https://github.com/mipengine/mip-extensions/tree/master/mip-analytics) | 提供统计发送接口，由使用方决定在什么时候发送什么参数，到什么地方 |
| [`mip-anim`](https://github.com/mipengine/mip-extensions/tree/master/mip-anim) | 用来支持在 MIP 页中 gif 图的使用 |
| [`mip-app-banner`](https://github.com/mipengine/mip-extensions/tree/master/mip-app-banner) | 用于吊起 App |
| [`mip-appdl`](https://github.com/mipengine/mip-extensions/tree/master/mip-appdl) | App 下载，可区分安卓和 iOS |
| [`mip-audio`](https://github.com/mipengine/mip-extensions/tree/master/mip-audio) | 提供了一个音频播放组件 |
| [`mip-experiment`](https://github.com/mipengine/mip-extensions/tree/master/mip-experiment) | mip-experiment 组件用于前端抽样实验。  可用于按钮，banner，广告等前端可控元素的改版实验，与mip-pix，可配合使用 |
| [`mip-filter`](https://github.com/mipengine/mip-extensions/tree/master/mip-filter) | 筛选组件，自适应pc和wise宽度。mipengine.org有引用 |
| [`mip-fixed`](https://github.com/mipengine/mip-extensions/tree/master/mip-fixed) | 悬浮元素整体使用方案 |
| [`mip-form`](https://github.com/mipengine/mip-extensions/tree/master/mip-form) | 表单提交 |
| [`mip-gototop`](https://github.com/mipengine/mip-extensions/tree/master/mip-gototop) | 添加快速回顶按钮，点击回到页面顶部 |
| [`mip-history`](https://github.com/mipengine/mip-extensions/tree/master/mip-history) | 封装了对历史记录的操作，实现页面间前进后退的功能 |
| [`mip-html-os`](https://github.com/mipengine/mip-extensions/tree/master/mip-html-os) | 元素区分操作系统显示内容，支持 Andriod 和 iOS |
| [`mip-infinitescroll`](https://github.com/mipengine/mip-extensions/tree/master/mip-infinitescroll) | 当用户滚动到页面底部时，加载更多 |
| [`mip-lightbox`](https://github.com/mipengine/mip-extensions/tree/master/mip-lightbox) | 由用户控制展现或关闭的全屏浮层组件，组件全屏覆盖，组件里的元素超出屏幕会被隐藏，不能滑动 |
| [`mip-link`](https://github.com/mipengine/mip-extensions/tree/master/mip-link) | 实现两个 MIP 页面之间互相跳转的功能 |
| [`mip-list`](https://github.com/mipengine/mip-extensions/tree/master/mip-list) | 可以渲染同步数据，或者异步请求数据后渲染 |
| [`mip-nav-slidedown`](https://github.com/mipengine/mip-extensions/tree/master/mip-nav-slidedown) | 响应式菜单，在mip官网有引用 |
| [`mip-semi-fixed`](https://github.com/mipengine/mip-extensions/tree/master/mip-semi-fixed) | position:sticky的js兼容版本。页面元素滑动到顶部时自动贴顶 |
| [`mip-share`](https://github.com/mipengine/mip-extensions/tree/master/mip-share) | 提供页面内分享按钮功能，默认分享当前网址 |
| [`mip-showmore`](https://github.com/mipengine/mip-extensions/tree/master/mip-showmore) | mip-showmore隐藏过长的文章，点击按钮显示更多内容 |
| [`mip-sidebar`](https://github.com/mipengine/mip-extensions/tree/master/mip-sidebar) | mip-sidebar侧边栏组件，点击按钮，侧边栏滑入屏幕 |
| [`mip-stats-baidu`](https://github.com/mipengine/mip-extensions/tree/master/mip-stats-baidu) | mip-stats-baidu添加百度统计 |
| [`mip-stats-tianrun`](https://github.com/mipengine/mip-extensions/tree/master/mip-stats-tianrun) | mip-stats-tianrun添加天润统计 |
| [`mip-vd-tabs`](https://github.com/mipengine/mip-extensions/tree/master/mip-vd-tabs) | mip-vd-tabs在网页中显示标签。标签页内元素较多时不建议使用,会影响页面性能 |

#### 3. 广告组件

广告组件主要满足各类广告的投放，需要引入对应的 js 脚本。阅读[广告文档](//www.mipengine.org/examples/mip-ad/mip-ad.html)来确定 MIP 广告类型.

| 广告组件 | 描述 |
| --------- | ----------- |
| [`mip-ad`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad) | mip-ad 用于在MIP页中引入广告脚本，投放广告 |
| [`mip-ad-comm`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad-comm) | mip-ad 的一种类型：通用广告 |
| [`mip-ad-baidu`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad-baidu) | mip-ad 的一种类型：网盟广告 |
| [`mip-ad-baidussp`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad-baidussp) | mip-ad 的一种类型：ssp直投广告 |
| [`mip-ad-imageplus`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad-imageplus) | mip-ad 的一种类型: 图加广告 |
| [`mip-ad-qwang`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad-qwang) | mip-ad 的一种类型：全网推荐 |
| [`mip-ad-ssp`](https://github.com/mipengine/mip-extensions/tree/master/mip-ad-ssp) | mip-ad 的一种类型：内容联盟广告 |
| [`mip-baidu-wm-ext`](https://github.com/mipengine/mip-extensions/tree/master/mip-baidu-wm-ext) | mip-ad 的一种类型：网盟扩展广告 |