# mip-gototop

mip-gototop 提供了一个用来支持网页快速回顶按钮，用来支持网页快速回顶功能。

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-gototop/mip-gototop.js

## 示例

### 基本使用

```html
<mip-fixed type="gototop">
    <mip-gototop></mip-gototop>
</mip-fixed>
```


```html-example
<!--组件预览使用-->
<style mip-custom>
	.placeholder{
		width:100%;
		height:300px;
		border-bottom: 1px solid #ccc;
	}
</style>
<div class="placeholder">这</div>
<div class="placeholder">里</div>
<div class="placeholder">是</div>
<div class="placeholder">占</div>
<div class="placeholder">位</div>
<div class="placeholder">符</div>
<mip-fixed type="gototop">
    <mip-gototop></mip-gototop>
</mip-fixed>
```

### 设置阈值

```html
<mip-fixed type="gototop">
    <mip-gototop threshold='300'></mip-gototop>
</mip-fixed>
```

```html-example
<!--组件预览使用-->
<style mip-custom>
	.placeholder {
		width:100%;
		height:300px;
		border-bottom: 1px solid #ccc;
	}
</style>
<div class="placeholder">这</div>
<div class="placeholder">里</div>
<div class="placeholder">是</div>
<div class="placeholder">占</div>
<div class="placeholder">位</div>
<div class="placeholder">符</div>
<mip-fixed type="gototop">
    <mip-gototop threshold='300'></mip-gototop>
</mip-fixed>
```


## 属性

说明：显示按钮时页面已经滚动的高度    
必选项: 否  
取值范围：数值
单位：无     
默认值：200
