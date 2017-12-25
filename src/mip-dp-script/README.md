# mip-dp-script 

mip-dp-script 用来支持www.lz55.cn业务交互和广告显示

|描述|业务交互和广告展示|
|---|---|
|类型|广告|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-dp-script/mip-dp-script.js|

## 示例

### 固定位广告
在MIP HTML中,直接使用标签, 用于正常显示固定位广告。示例如下:

```html
   <section class="adwraper" id="topad"></section>
   <mip-dp-script 
	loadjs="http://soft.lz55.cn/s_wap_index_index.js"
	>
	</mip-dp-script>

```

### 非固定位广告
在MIP HTML中,直接使用mip-dp-script标签。示例如下:

```html
	<mip-dp-script 
	loadjs="http://soft.lz55.cn/s_wap_index_index.js"
	adtag="footerscript,footertongji"
	>
	</mip-dp-script>
	
```

# 属性

### 固定广告位置

说明：样式名 ”adwraper“ 固定，id ”topad1“ 为广告位标签
必填：否


### loadjs

说明：加载js,需要加载的交互组件js、广告js
必填：否

### adtag

说明: 广告位标签列表,多个用,分隔例:`adtag="footer,tongji,topad"`, 如果没有指定则不显示
必填: 否
    