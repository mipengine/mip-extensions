# mip-inno-nav

根据mip-nav-slidedown修改，增加两个属性， 实现innotopia的个性化响应式的菜单

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-inno-nav/mip-inno-nav.js

## 示例
```html
<div class="mip-nav-wrapper">
<mip-inno-nav data-id="bs-navbar" class="mip-element-sidebar container" data-showbrand="1" data-btn-pos="left" data-bg-color="#f69927" data-fg-color="#fff">
    <nav id="bs-navbar" class="navbar-collapse collapse navbar navbar-static-top">
        <ul class="nav navbar-nav navbar-right">
            <li class="index-body">
                <a target="_blank" href="//www.mipengine.org/">首页</a>
            </li>
            <li class="doc-body">
                <a target="_blank" href="//www.mipengine.org/doc/00-mip-101.html">产品</a>
            </li>
            <li class="timeline-body">
                <a target="_blank" href="//www.mipengine.org/timeline.html">案例</a>
            </li>
            <li class="">
                <a target="_blank" href="http://www.cnblogs.com/mipengine/" target="_blank">博客</a>
            </li>
            <li class="navbar-wise-close">
                <span id="navbar-wise-close-btn"></span>
            </li>
        </ul>
    </nav>
</mip-inno-nav>
</div>
```

## 属性

### data-id  
说明：内部菜单id  
必选项：是  
类型：字符串  

### data-showbrand  
说明：是否需要左上角显示可点击区域  
必选项：否  
类型：数字  
取值：0（不显示），1（显示）  
默认值：1

### data-brandname  
说明：左上角显示可点击区域文字，仅在data-showbrand=1时显示  
必选项：否  
类型：字符串，如"MIP官网"  

### data-brandhref
说明：左上角图标跳转链接，在data-showbrand为1时有效
必选项：否
类型：url
默认：'/'

### data-bg-color
说明：菜单的背景颜色
必选项：否
类型：字符串
默认：'white'

### data-fg-color
说明：菜单项文字颜色
必选项：否
类型：字符串
默认：'black'