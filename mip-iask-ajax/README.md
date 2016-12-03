# mip-iask-ajax

爱问ajax插件

|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本|https://mipcache.bdstatic.com/static/v1/mip-iask-ajax/mip-iask-ajax.js|

## 示例

在MIP HTML中，直接使用标签。

```html
<span class="btn-goods-02" id="id">1</span>
<mip-iask-ajax url="http://m.iask.sina.com.cn/answer/praised" data="{'answerId' : 'id'}" isLogin="true" click="id" callback="var txt = $('#id');txt.text(parseInt(txt.text())+1);" >
</mip-iask-ajax>
```

## 属性

### url

说明：ajax请求路径
必选项：是
类型：字符串

### data

说明：ajax请求所需参数
必选项：是
类型：json

### isLogin

说明：是否需要登录验证
必选项：是
类型：true false

### callback

说明：根据业务设置
必选项：否
类型：字符串
