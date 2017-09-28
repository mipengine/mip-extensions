# MIP 组件

MIP 组件包括官方组件和开发者自定义组件，是用于定制站点需求的必备功能。

## 官方组件

### 使用方式

使用组件前，需在页面中引入对应脚本，引用地址如下：

mip-extensions 仓库：https://mipcache.bdstatic.com/static/v1/{组件名}/{组件名}.js
mip-extension-platform 仓库：https://mipcache.bdstatic.com/extensions/platform/v1/{组件名}/{组件名}.js

示例

```
<script async src="https://mipcache.bdstatic.com/static/v1/mip-form/mip-form.js"></script>
```

其中官方组件库列表如下：

#### 1. 内置组件

内置组件是包含在 mip.js 中的组件，可直接使用，无需另外引入js脚本。

<span class="minw-125">内置组件</span>|<span class="minw-60">中文</span>|描述
----|----|----
<mip-link href=//www.mipengine.org/examples/mip/mip-carousel.html>mip-carousel</mip-link>|多图轮播|mip-carousel 用来支持 mip 中图片的一种展示方式，支出多图轮播。
<mip-link href=//www.mipengine.org/examples/mip/mip-iframe.html>mip-iframe</mip-link>|-|mip-iframe 是用来支持在 mip 中嵌入第三方内容的一种方式，需要注意的是：所嵌入的内容强制是符合https协议的。
<mip-link href=//www.mipengine.org/examples/mip/mip-img.html>mip-img</mip-link>|图片|mip-img 用来支持在 mip 中增加图片内容。
<mip-link href=//www.mipengine.org/examples/mip/mip-pix.html>mip-pix</mip-link>|统计|将 mip-pix 组件直接引入，可发送带有自定义参数的请求，用于统计页面访问情况。这些参数主要包括页面打开时间点，页面title和当面页面地址。
<mip-link href=//www.mipengine.org/examples/mip/mip-video.html>mip-video</mip-link>|-|mip-video 用来支持在 mip 中增加视频内容，是HTML `<video>`的直接包装。功能与兼容性与HTML5`<video>`一致。

#### 2. 个性化组件

个性化组件是满足于特定需求的组件，包括交互，统计等需求。需要引入对应的 js 脚本。

<span class="minw-125">个性化组件</span>|<span class="minw-60">中文</span>|描述
----|----|----
<a href=//www.mipengine.org/examples/mip-extensions/mip-accordion.html>mip-accordion</a>|折叠节点|折叠隐藏节点(可记录用户上次行为)。
<a href=//www.mipengine.org/examples/mip-extensions/mip-analytics.html>mip-analytics</a>|统计框架|提供统计发送接口，由使用方决定在什么时候发送什么参数，到什么地方。
<a href=//www.mipengine.org/examples/mip-extensions/mip-anim.html>mip-anim</a>|动图|用来支持在 MIP 页中 gif 图的使用。
<a href=//www.mipengine.org/examples/mip-extensions/mip-app-banner.html>mip-app-banner</a>|App 吊起组件|用于吊起 App。
<a href=//www.mipengine.org/examples/mip-extensions/mip-appdl.html>mip-appdl</a>|App 下载|App 下载，可区分安卓和 iOS。
<a href=//www.mipengine.org/examples/mip-extensions/mip-audio.html>mip-audio</a>|音频播放|提供了一个音频播放组件
<a href=//www.mipengine.org/examples/mip-extensions/mip-experiment.html>mip-experiment</a>|前端抽样实验|mip-experiment 组件用于前端抽样实验。  可用于按钮，banner，广告等前端可控元素的改版实验，与mip-pix，可配合使用。
<a href=//www.mipengine.org/examples/mip-extensions/mip-filter.html>mip-filter</a>|筛选组件|筛选组件，自适应pc和wise宽度。mipengine.org有引用
<a href=//www.mipengine.org/examples/mip-extensions/mip-fixed.html>mip-fixed</a>|悬浮布局|悬浮元素整体使用方案。
<a href=//www.mipengine.org/examples/mip-extensions/mip-form.html>mip-form</a>|表单|表单提交。
<a href=//www.mipengine.org/examples/mip-extensions/mip-gototop.html>mip-gototop</a>|快速回顶|添加快速回顶按钮，点击回到页面顶部。
<a href=//www.mipengine.org/examples/mip-extensions/mip-history.html>mip-history</a>|历史记录|封装了对历史记录的操作，实现页面间前进后退的功能。
<a href=//www.mipengine.org/examples/mip-extensions/mip-html-os.html>mip-html-os</a>|操作系统|元素区分操作系统显示内容，支持 Andriod 和 iOS。
<a href=//www.mipengine.org/examples/mip-extensions/mip-infinitescroll.html>mip-infinitescroll</a>|无限滚动|当用户滚动到页面底部时，加载更多。
<a href=//www.mipengine.org/examples/mip-extensions/mip-lightbox.html>mip-lightbox</a>|弹出层|由用户控制展现或关闭的全屏浮层组件，组件全屏覆盖，组件里的元素超出屏幕会被隐藏，不能滑动。
<a href=//www.mipengine.org/examples/mip-extensions/mip-link.html>mip-link</a>|跳转链接|实现两个 MIP 页面之间互相跳转的功能。
<a href=//www.mipengine.org/examples/mip-extensions/mip-list.html>mip-list</a>|列表组件|可以渲染同步数据，或者异步请求数据后渲染。
<a href=//www.mipengine.org/examples/mip-extensions/mip-nav-slidedown.html>mip-nav-slidedown</a>|菜单|响应式菜单，在mip官网有引用。
<a href=//www.mipengine.org/examples/mip-extensions/mip-semi-fixed.html>mip-semi-fixed</a>|滑动悬浮组件 |position:sticky的js兼容版本。页面元素滑动到顶部时自动贴顶。
<a href=//www.mipengine.org/examples/mip-extensions/mip-share.html>mip-share</a>|分享|提供页面内分享按钮功能，默认分享当前网址。
<a href=//www.mipengine.org/examples/mip-extensions/mip-showmore.html>mip-showmore</a>|显示更多|隐藏过长的文章，点击按钮显示更多内容。
<a href=//www.mipengine.org/examples/mip-extensions/mip-sidebar.html>mip-sidebar</a>|侧边栏|侧边栏组件，点击按钮，侧边栏滑入屏幕。
<a href=//www.mipengine.org/examples/mip-extensions/mip-stats-baidu.html>mip-stats-baidu</a>|百度统计|添加百度统计。
<a href=//www.mipengine.org/examples/mip-extensions/mip-stats-tianrun.html>mip-stats-tianrun</a>|天润统计|添加天润统计。
<a href=//www.mipengine.org/examples/mip-extensions/mip-vd-tabs.html>mip-vd-tabs</a>|tab 切换组件|在网页中显示标签。标签页内元素较多时不建议使用,会影响页面性能.

#### 3. 广告组件

广告组件主要满足各类广告的投放，需要引入对应的 js 脚本。阅读[广告文档](//www.mipengine.org/examples/mip-ad/mip-ad.html)来确定 MIP 广告类型.

<span class="minw-125">广告组件</span>|<span class="minw-60">中文</span>|描述
----|----|----
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad.html>mip-ad</mip-link>|广告|mip-ad 用于在MIP页中引入广告脚本，投放广告。
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad-comm.html>mip-ad-comm</mip-link>|通用广告|mip-ad 的一种类型：通用广告。
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad-baidu.html>mip-ad-baidu</mip-link>|网盟广告|mip-ad 的一种类型：网盟广告。
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad-baidussp.html>mip-ad-baidussp</mip-link>|ssp直投广告|mip-ad 的一种类型：ssp直投广告。
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad-imageplus.html>mip-ad-imageplus</mip-link>|图加广告|mip-ad 的一种类型: 图加广告。
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad-qwang.html>mip-ad-qwang</mip-link>|全网推荐|mip-ad 的一种类型：全网推荐。
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-ad-ssp.html>mip-ad-ssp</mip-link>|内容联盟广告|mip-ad 的一种类型：内容联盟广告.
<mip-link href=//www.mipengine.org/examples/mip-ad/mip-baidu-wm-ext.html>mip-baidu-wm-ext</mip-link>|网盟扩展广告|mip-ad 的一种类型：网盟扩展广告。