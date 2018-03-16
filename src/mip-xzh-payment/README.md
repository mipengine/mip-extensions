# mip-xzh-payment

提供给接入了熊掌号的站点的支付功能

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-xzh-payment/mip-xzh-payment.js

## 说明

整体流程为：

第三方mip页提供商品数据 --> 支付组件将商品数据发送给第三方server --> 第三方server调用[熊掌号调起收银台](http://xiongzhang.baidu.com/open/wiki/chapter7/section4.3.1.html?t=1520320862240)接口获取`收银台的页面地址` --> 将地址回传给支付组件 --> 支付组件根据地址跳转到收银台页面

支付组件不处理页面里的商品数据，只是透传，第三方应自己约定好前后端所需的数据格式。

支付组件的视觉效果为`按钮`。


## 示例

引入支付按钮组件，传入需要的配置

### MIP 插件引入
```html
<mip-xzh-payment btn-text="按钮上的文字">
    <script type="application/json">
        {
            "url": "第三方支付请求接口"
        }
    </script>
</mip-xzh-payment>
```

### 支付按钮状态

提供了按钮的默认和禁用状态。在向第三方支付接口请求的过程中，按钮状态切换为`禁用`，收到响应后恢复到默认状态。

可自定义默认和禁用状态的组件样式，下方为各状态时组件的class名称

默认状态： `mip-xzh-pay-btn`

禁用状态： `mip-xzh-pay-disabled`

### 获取商品数据

在点击支付按钮时，将获取页面DOM上所有 `data-xzh-pay-param`属性的值作为商品数据，合并后发送到支付接口。


<font color="red">[warning]</font> `data-xzh-pay-param` 要求配置外层为单引号，内层为双引号。或按照下文 **`data-xzh-pay-param` 双引号配置方法** 处理。

```
<div data-xzh-pay-param='{"goods":[{"id": 123, "number": 2}, {"id": 124, "number": 1}]}'>
    自定义内容
</div>
<div data-xzh-pay-param='{"address": "haidian street", "user": "lucy"}'>
    自定义内容
</div>

```


## 属性

### url

说明：支付请求接口url。点击按钮时，会将页面内的获取到的商品数据发送给该接口。接口的规范要求请参照下文**`支付接口约定`**。
必选项：是
类型：字符串
默认值：''

### btn-text

说明：按钮上的文字。
必选项：是
类型：字符串
默认值：''

### 商品数据

属性: `data-xzh-pay-param`

说明：提交到支付接口的商品数据。该属性的值完全自定义，支付组件只负责透传，页面内可同时存在多个`data-xzh-pay-param`，会将值进行merge。
必选项：是
类型：对象
默认值：{}

## 注意事项

#### 支付接口约定

1. 支持JSONP跨域请求
2. 接口的返回数据需符合如下格式

```
{
    code: 0, // number，接口响应状态，0-正常，非0 异常
    msg: '', // string，与code对应的消息提示
    data: {
        cashier_url: '' // string，收银台页面的url地址
    }
}
```

#### data-xzh-pay-param 双引号配置方法

`data-xzh-pay-param` 值必须 `encodeURIComponent` 处理, 方法如下：

```
// 理想配置
{"address": "haidian street", "user": "lucy", "goods":[{"id": 123, "number": 2}, {"id": 124, "number": 1}]}

// 处理配置方法
encodeURIComponent(JSON.stringify({address: "haidian street", user: "lucy", goods:[{id: 123, number: 2}, {id: 124, number: 1}]}))

// 最终DOM配置效果
data-xzh-pay-param="%7B%22address%22%3A%22haidian%20street%22%2C%22user%22%3A%22lucy%22%2C%22goods%22%3A%5B%7B%22id%22%3A123%2C%22number%22%3A2%7D%2C%7B%22id%22%3A124%2C%22number%22%3A1%7D%5D%7D"
```

