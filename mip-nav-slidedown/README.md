# mip-nav-slidedown

mip-nav-slidedown 实现响应式的菜单，在mip官网有引用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-nav-slidedown/mip-nav-slidedown.js

## 示例

按如下格式添加内容，`<a>`可以替换为`<mip-link>`

```html
<div class="mip-nav-wrapper">
<mip-nav-slidedown data-id="bs-navbar" class="mip-element-sidebar container" >
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

## 注意事项  

1、具体样式设置可以参考mip官网
