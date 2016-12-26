# 类型: ad-qwang 全网推荐

全网推荐  
如果广告配置了悬浮，需要使用添加 cpro_pstype="suspend" 参数。

## 支持布局

- fixed-height
- fixed 

## 示例

### 基本使用

```html
<mip-ad 
	type="ad-qwang" 
	cpro_psid="u2619809" 
	cpro_pswidth="auto" 
	cpro_psheight="230">
</mip-ad>
```

### 组件 layout="fixed" 布局

```html
<mip-ad 
	layout="fixed" 
	width="414" 
	height="80" 
	type="ad-qwang" 
	cpro_psid="u2619809" 
	cpro_pswidth="auto" 
	cpro_psheight="230">
</mip-ad>
```


### 悬浮广告 position="fixed” 布局

如果在广告配置时选择了`单行文字悬浮`、`双行文字悬浮`、`图文悬浮`，则应该将`<mip-ad>`嵌入在`<mip-fixed>`中使用，[mip-fixed使用文档](https://www.mipengine.org/doc/3-widget/3-customize-widget/fixed-widget.html)。

mip-ad的height对应[组件布局](https://www.mipengine.org/doc/3-widget/11-widget-layout.html)的fixed-height，需要根据广告真实高度填写

```html
<mip-fixed type="bottom">
	<mip-ad 
		type="ad-qwang" 
		cpro_psid="u2619809" 
		cpro_pstype="suspend"
		height="90"
		>
	</mip-ad>
</mip-fixed>
```

## 属性

### type

说明：广告类型  
必选项：是  
类型：字符串  
取值：ad-qwang 
默认值：无

### cpro_psid

说明：广告投放id  
必选项：是  
类型：字符串  
默认值：无

### cpro_pswidth

说明：宽度  
必选项：否  
类型：数字  
默认值：auto

### cpro_psheight

说明：宽度  
必选项：否  
类型：数字  
默认值：230

### cpro_pstype
说明：全网推荐广告配置中的悬浮类型  
必选项：否  
类型：字符串  
默认值：embed
取值：embed/suspend