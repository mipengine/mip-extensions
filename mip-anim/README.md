# mip-anim

mip-anim 用来支持在 mip中gif图的使用

标题|内容
----|----
类型|通用
支持布局| responsive, fixed-height, fixed, container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-anim/mip-anim.js

## 示例

### 带placeholder的加载方式

```html
<mip-anim layout="fixed" width=210 height=210 src="xxx" alt="an animation">
   <mip-img layout="fixed-height" width=210 height=210 src="xxxx"></mip-img>
</mip-anim>
```

### 只有gif图

```html
<mip-anim layout="fixed" width=210 height=210 src="xxx" alt="an animation"></mip-anim>
```

## 属性

### src

说明：图片路径  
必选项：是  
类型：字符串  
取值范围：URL

