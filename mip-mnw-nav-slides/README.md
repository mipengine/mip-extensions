# mip-mnw-nav-slides

导航显示隐藏组件

描述|注册点击事件
----|----
类型|事件
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-mnw-nav-slides/mip-mnw-nav-slides.js

## 示例

### 导航切换

```
<mip-mnw-nav-slides>
	<div class="header-wrapper">
        <header class="home-header" id="home-header">
            <div class="logo">
                <mip-link href=""><span>LOGO</span></mip-link>
            </div>
            <span class="imenu" id="imenu">导航按钮</span>
        </header>
        <div class="nav-global" id="nav-global" style="display:none;">
            <div class="nav-list">
                <mip-link href="">新闻1</mip-link>
                <mip-link href="">新闻2</mip-link>
                <mip-link href="">新闻3</mip-link>
                <mip-link href="">新闻4</mip-link>
                <mip-link href="">新闻5</mip-link>
            </div>
            <div class="nav-list">
                <mip-link href="">娱乐</mip-link>
                <mip-link href="">游戏</mip-link>
                <mip-link href="">科技</mip-link>
                <mip-link href="">教育</mip-link>
                <mip-link href="">美图</mip-link>
            </div>
        </div>
    </div>
</mip-mnw-nav-slides>
```


