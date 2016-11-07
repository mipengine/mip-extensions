# 类型: ad-baidu-wm-ext

网盟扩展广告。

## 示例

```html
<mip-embed 
    type="baidu-wm-ext" 
    domain="dup.lovedword.com" 
    token="3a1ec097f7cbf63edb0e7f98eff238f950e6ca0b29e67fe1103c" 
>
	<div id="3a1ec097f7cbf63edb0e7f98eff238f950e6ca0b29e67fe1103c"></div>
</mip-embed>
```
## 属性

### type



说明：广告类型  
必选项：是  
类型：字符串  
取值：baidu-wm-ext   
默认值：无

### domain

说明：主域 
必选项：是  
类型：URL  
取值：不能带http 或 https 不带 `//` ,结尾不带 `/` 
默认值：无

### token

说明：主域  
必选项：是   
类型：字符串   
默认值：无

### 子节点`div`

说明：广告容器   
必选：是   
类型：html 节点   
取值：id与token保持一致   
单位：无     
默认值：无   
