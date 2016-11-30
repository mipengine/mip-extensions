# mip-nav-slidedown

mip-nav-slidedown 实现响应式的菜单，在mip官网有引用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-nav-slidedown/mip-nav-slidedown.js

## 示例
```html
<div class="mip-nav-wrapper">
<mip-nav-slidedown data-id="bs-navbar" class="mip-element-sidebar container" data-showbrand="1">
    <nav id="bs-navbar" class="navbar-collapse collapse navbar navbar-static-top">
        <ul class="nav navbar-nav navbar-right">
            <li class="index-body">
                <a target="_blank" href="//www.mipengine.org/">首页</a>
            </li>
            <li class="doc-body">
                <a target="_blank" href="//www.mipengine.org/doc/00-mip-101.html">教程</a>
            </li>
            <li class="timeline-body">
                <a target="_blank" href="//www.mipengine.org/timeline.html">动态</a>
            </li>
            <li class="">
                <a target="_blank" href="http://www.cnblogs.com/mipengine/" target="_blank">博客</a>
            </li>
            <li class="navbar-wise-close">
                <span id="navbar-wise-close-btn"></span>
            </li>
        </ul>
    </nav>
</mip-nav-slidedown>
</div>
```

## 属性

### data-id  
说明：内部菜单id  
必选项：是  
类型：字符串  

### data-showbrand  
说明：是否需要左上角显示可点击图标  
必选项：否  
类型：0（不显示），1（显示）  
默认值：1

### data-brandhref  
说明：左上角图标跳转链接，在data-showbrand为1时有效  
必选项：否  
类型：url  
默认：'/'