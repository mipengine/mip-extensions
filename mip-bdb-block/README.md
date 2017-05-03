# mip-bdb-block 

mip-bdb-block 用来支持bendibao.com自定义内容版块显示

|描述|调取自定义版块|
|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本|https://mipcache.bdstatic.com/static/v1/mip-bdb-block/mip-bdb-block.js|

## 示例

### 自定义内容版块
在MIP HTML中,直接使用标签, 用于正常显示自定义内容版块。示例如下:

```html
   <mip-bdb-block 
	loadjs="http://wh.bendibao.com/weixin_right.js?type=mobile" 
	url="http://wh.bendibao.com/"
	title="武汉本地宝"
	>
	</mip-bdb-block>

```


# 属性

### loadjs

说明：加载js,需要加载的内容组件js
必填：是


### url

说明：当前调用页面的网址
必填：是

### title

说明: 当前调用页面的标题
必填: 是
    