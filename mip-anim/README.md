# mip-anim 动图

用来支持在 MIP 页中 gif 图的使用。

标题|内容
----|----
类型|通用
支持布局| responsive, fixed-height, fixed, container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-anim/mip-anim.js

## 示例

### 带placeholder的加载方式

```html
<mip-anim layout="fixed" width=210 height=210 src="https://raw.githubusercontent.com/mipengine/mip-blog/master/img/mip-anim.gif" alt="an animation">
   <mip-img class="background" layout="fixed-height" width=210 height=210 src="https://www.mipengine.org/static/img/mip_logo_white_8c902ec.png"></mip-img>
</mip-anim>
```

### 只有gif图

```html
<mip-anim layout="fixed" width=210 height=210 src="https://raw.githubusercontent.com/mipengine/mip-blog/master/img/mip-anim.gif" alt="an animation"></mip-anim>
```

## 属性

### src

说明：图片路径  
必选项：是  
类型：字符串  
取值范围：URL

