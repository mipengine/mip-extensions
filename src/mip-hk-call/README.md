# mip-hk-call

好看调起客户端

|标题|内容|
|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-hk-call/mip-hk-call.js|

## 示例

在MIP HTML中，直接使用标签, 用于调起好看客户端。

```html
<mip-hk-call class="haokan-dl-link-w" type="article" urlKey="http://news.yesky.com/focus/145/106124645.shtml" apk="5" page="erji_detail_news" act="top">
    <a target="_blank" href="###" class="J_app_call">立即下载</i></a>
</mip-hk-call>
```

## 属性

### type

说明：客户端对应页面类型
必选项：是
类型：字符串
取值范围：article,topic,video,gallery,beauty,activity

### urlKey

说明：客户端所需参数
必选项：是
类型：字符串

### apk

说明：不同位置对应不同下载渠道
必选项：否
类型：数字

### page

说明：不同页面对应不同统计参数
必选项：否
类型：字符串

### act

说明：不同位置对应不同统计参数
必选项：否
类型：字符串
