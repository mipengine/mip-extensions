# mip-hk-keep

好看详情页下载app安装打开对应详情页接口

|标题|内容|
|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-hk-keep/mip-hk-keep.js|

## 示例

在MIP HTML中,直接使用标签, 详情页下载app安装打开对应详情页接口。

```html
 <mip-hk-keep type="video" urlKey="http://www.internal.video.baidu.com/23f7c713a6de54bf80d13a6e1f49c1a3.html"></mip-hk-keep>
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
