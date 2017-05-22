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
<style mip-custom>
	div{
		width:100%;
		height:300px;
		background-color: pink;
		border-bottom: 100px;
	}
</style>
<div>这</div>
<div>里</div>
<div>是</div>
<div>占</div>
<div>位</div>
<div>符</div>
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
<style mip-custom>
	div{
		width:100%;
		height:300px;
		background-color: pink;
		border-bottom: 100px;
	}
</style>
<div>这</div>
<div>里</div>
<div>是</div>
<div>占</div>
<div>位</div>
<div>符</div>
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
