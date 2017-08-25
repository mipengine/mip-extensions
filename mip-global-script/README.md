# mip-global-script

mip-global-script 页面逻辑公共脚本

标题|内容
----|----
类型|业务
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-global-script/mip-global-script.js

## 示例

### 基本用法
```html
<script type="application/json">
    [{
		"lff":{
			"hmToken":"58ca8f8a68d893aa08befe6eb5237a34",
			"xtime":"2015/8/31"
		},
		"hxb":{
			"hmToken":"7c9a22609a0017275f143d3b1af47740"
		},
		"gongmin":{
			"hmToken":"0de7b5f7e443add55367defe1b3d292c"
		},
		"zxy":{
			"hmToken":"37b5bba0728480a528bdca94eeccfefb"
		},
		"caixin":{
			"hmToken":"e0f150614f0f01e194bba3fcdc018f66"
		}
    }]
</script>
<mip-global-script></mip-global-script>
```

## 注意事项
运行需要html中的json数据支持，如上所示；在对应编辑名下，hmToken为必填项对应该编辑mip-stats-baidu的token值，xtime为选填值，如果只统计某时间节点后的数据就加上“年/月/日”格式的日期。

