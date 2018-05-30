# mip-share 分享

提供页面内分享按钮功能，默认分享当前网址。

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-share/mip-share.js


## 示例

### 基本使用

```html
<div class="mip-share-container">
    <mip-share></mip-share>
</div>
```

### `fixed` 布局

```html
<div class="mip-share-container">
    <mip-share 
        layout="fixed"
        width="200"
        height="158">
    </mip-share>
</div>
```

### 自定义分享参数

```html
<div class="mip-share-container">
    <mip-share 
        title="分享标题" 
        content="分享内容" 
        icon="https://m.baidu.com/se/static/pmd/pmd/share/images/bdu.jpg" 
        wechatAPI="//xx.yy.com/getToken"
        layout="responsive"
        width="414"
        height="158">
    </mip-share>
</div>
```

## 属性

### url

说明：分享出去的网址  
必选项：否  
类型：字符串  
取值范围：URL    
默认值：当前页面的 URL  

### title

说明：分享出去的标题  
必选项：否  
类型：字符串

### content

说明：分享出去的内容  
必选项：否  
类型：字符串

### icon

说明：分享出去的图标  
必选项：否  
类型：字符串  
取值范围：URL

### wechatAPI

说明：获取微信动态签名接口  
必选项：否  
类型：字符串  
取值范围：URL

## 注意事项
    
分享到微信好友和微信朋友圈，在手机百度和 QQ 浏览器上显示是因为 `<mip-share>` 组件调用浏览器的 API，在其他浏览器上没有可用 API，所以分享按钮不显示或显示不全。

## 获取微信动态签名接口返回数据格式参考
```js
{
    "errno": 0,
    "errmsg": "SUCCESS",
    "data": {
        "appId": "wxadc1a0c6b9096e89",
        "nonceStr": "PwBOsf46ZVkUvlWN",
        "timestamp": 1527676437,
        "url": null,
        "signature": "503771ae35c3b301ce61b3ef1791128cf68fe14e"
    },
    "time": 1527676437,
    "hasFlush": true,
    "format": "jsonp"
}
```
其中，动态签名**必须**包含在`data`下