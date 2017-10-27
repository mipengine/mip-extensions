# mip-bind

mip-bind 数据驱动组件，可以允许开发者在页面中动态操作数据，进行双向数据绑定，进而实现业务功能。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js

## 示例

### 基本用法
```html
<mip-data>
	<script type="application/json">
	{
		name: 'Jackson',
		company: 'Baidu'
	}
	</script>
</mip-data>
<div on="tap:MIP.setstate({age: 25})"></div>
```

## 属性

## 注意事项
