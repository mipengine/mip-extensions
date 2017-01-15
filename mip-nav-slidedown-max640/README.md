# mip-nav-slidedown-max640

依照[mip-nav-slidedown](https://github.com/mipengine/mip-extensions/tree/master/mip-nav-slidedown)修改为符合 `Baiyun` 使用的版本  

## 示例
```html
<div class="mip-nav-wrapper">
<mip-nav-slidedown-max640 data-id="bs-navbar" class="mip-element-sidebar container" data-showbrand="1">
    <input type="hidden" name="logo" data-layout="responsive" data-width="640" data-height="70" value="//miplocal.dev/uploadfile/2015/0929/20150929043952688.jpg">
    <!-- <input type="hidden" name="logo" data-type="text" value="公司名称"> -->
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
                <a target="_blank" href="//www.cnblogs.com/mipengine/" target="_blank">博客</a>
            </li>
            <li class="navbar-wise-close">
                <span id="navbar-wise-close-btn"></span>
            </li>
        </ul>
    </nav>
</mip-nav-slidedown-max640>
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
类型：字符串，0（不显示），1（显示）  
默认值：1

### data-brandhref  
说明：左上角图标跳转链接，在data-showbrand为1时有效  
必选项：否  
类型：url  
默认：'/'

## logo

```html
<input type="hidden" name="logo" data-type="image" value="//miplocal.dev/uploadfile/2015/0929/20150929043952688.jpg">
```
### name
说明：头部logo显示  
必选项：是  
类型：字符串  
默认值：logo  

### data-type
说明：文本类型  
必选项：否  
类型：字符串，text（文本），image（图片）  
默认值：image  

### data-layout
说明：同mip-img的layout  
必选项：data-type为image时可选  

### data-width
说明：同mip-img的width  
必选项：data-type为image时必选  

### data-height
说明：同mip-img的height  
必选项：data-type为image时必选  