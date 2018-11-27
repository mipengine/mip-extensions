# mip-ad:baidu-wm-ext 百度联盟广告反屏蔽

`<mip-ad>` 的一种类型：百度联盟广告反屏蔽。产品介绍见[具体文档](http://yingxiao.baidu.com/zhichi/knowledge/detail.action?channelId=4&classId=13484&knowledgeId=15198)。

标题|内容
----|----
类型|通用
支持布局|fixed-height, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ad/mip-ad.js


网盟扩展广告，接入要求反屏蔽域名支持 HTTPS，接入说明：[说明文档](http://yingxiao.baidu.com/zhichi/knowledge/detail.action?channelId=4&classId=13484&knowledgeId=15198)  

## 示例

```html
<!--domain="dup.lovedword.com"为示例，需要填写在网盟申请的domain-->
<mip-ad 
    type="baidu-wm-ext" 
    domain="dup.lovedword.com" 
    token="ezrwfrowb">
	<div id="ezrwfrowb"></div>
</mip-ad>
```
## 属性

### type

说明：广告类型  
必选项：是  
类型：字符串  
取值：`baidu-wm-ext`   
默认值：无

### domain

说明：反屏蔽域名，填在百度网盟申请的域名  
必选项：是  
类型：URL  
取值：不能带 HTTP 或 HTTPS 不带 `//` ,结尾不带 `/`  
默认值：无

### token

说明：在网盟申请的 `token` 值  
必选项：是   
类型：字符串   
默认值：无

### 子节点 `<div>`

说明：广告容器   
必选：是   
类型：HTML 节点   
取值：`id` 与 `token` 保持一致   
单位：无     
默认值：无   

## 注意事项

- union 平台获取投放代码样例如下 &lt;script type="text/javascript" src="http://<font color="yellowgreen">dup.media.com</font>/site/js/jy1c5t.js?<font color="red">ezrwf=rowb</font>"&gt;&lt;/script &gt;，绿色区域对应 MIP 投放代码 domain，红色区域<font color="red">去掉“=”</font>的结果（ezrwfrowb）为 MIP 投放代码 `token` 和 `<div>` `id`。

- 联盟反屏蔽接入要求反屏蔽域名支持 HTTPS，可参见[接入说明文档](http://yingxiao.baidu.com/zhichi/knowledge/detail.action?channelId=4&classId=13484&knowledgeId=15198)。
