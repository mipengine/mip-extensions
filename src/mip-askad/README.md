# mip-askad

120askad广告组件

标题|内容
----|----
类型|广告
支持布局| N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-askad/mip-askad.js

## 示例

只需要一个`<mip-39ad>`标签，无须其他填充dom

```
- yw-class

- yw-keyword

- yw-other

<mip-askad 
	type="yw-other" 
	paramsid="1706" 
	otherparamkey="7" 
	otherparamvalue="1307" 
	cboptions="[{'type':'hide','target':'#ask_baidu_ad'}]"
></mip-askad>	
```

## 属性

### type

说明：广告类型
必填：是
格式：字符
取值：yw-*
默认值：yw-other

### paramsid

说明：广告id
必填：是
格式：数字

### otherparamkey

说明：其他关键字
必填：是
格式：字符串

### otherparamvalue

说明：其他属性值
必填：是
格式：字符串

### cboptions
说明：样式配置
必填：是
格式：json串


