# mip-link

mip-link 用来支持在 mip 页面跳转，解决类似 iframe 嵌套情况下不能跳出父级的问题

标题|内容
----|----
类型|通用
支持布局|不使用布局
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-link/mip-link.js

## 示例

```html
<style type="text/css">
	mip-link {
		padding: 20px;
		margin:10px;
		background: #eee;
	}
	mip-link:active {
		background: #ddd;
	}
</style>
<mip-link href="http://m.baidu.com">链接文字</mip-link>
<mip-link history="go, -1">go, -1</mip-link>
<mip-link history="go, -2">go, -2</mip-link>
<mip-link history="go, 1">go, 1</mip-link>
<mip-link history="back">back</mip-link>
<mip-link history="forward">forward</mip-link>
```

## 属性

### url

说明：目标网址  
必选项：是  
类型：字符串  
取值范围：`https?://.*`, `mailto:.*`, `tel:.*`

### title

说明：目标页面标题  
必选项：否  
类型：字符串  
取值范围：任何  

### history
说明：对 window.history 的操作  
必选项：否  
类型：字符串  
取值范围：'go, -1(任何数字)', 'back', 'forward'  

