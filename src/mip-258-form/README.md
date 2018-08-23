# mip-258-form

mip-258-form 表单组件

标题|内容
----|----
类型|通用
支持布局|fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-form/mip-258-form.js

## 示例
### 基本使用

```html
<mip-258-form method="get" fetch-url="http://m.v2.258.com/testapi">
    <input type="number" name="mobile" validatetarget="mobile" validatetype="must" placeholder="姓名" id="inquiryMobile">
    <div class="btnCode" id="getInquiryCode" btn-url="http://m.258.com/Common/sendMobileCode">获取验证码</div>
    <div class="" id='waitInquiryCode' style="display:none;"><span id='waitInquiry'>59</span>秒后重新获取</div>
    <div class="error" target="mobile">姓名不能为空</div>
    <input type="number" name="age" validatetarget="age" validatetype="must" placeholder="年龄">
    <div class="error" target="age">年龄不能为空</div>
    <input type="submit" value="提交">
</mip-258-form>
```
## 属性

### method

说明：表单提交方法  
必选项：是  

### url

说明：必须是 HTTP(S) 或 // 开头的地址   
必选项: 是  

### validatetarget

说明:  验证提示对应 tag，用于对应错误时的提示显示元素的查找    
必选项：否   

### validatetype

说明：验证类型, 用于支持简单的验证。目前提供 `email`, `phone`, `idcar`, `custom`。当为 `custom` 时则需要填写 `validatereg`    
必选项：否   

### validatereg

说明: 自定义验证，补充站长个性化的验证规则。如果 `validatetype` 为 `custom` 时需填写相应验证规则  
必选项：否

### fetch-url

说明: 有此属性则可以开启异步请求数据逻辑，组件会并根据数据返回状态来按`submit-success`，`submit-error`块中的模板刷新局部信息。
需要注意的几个点：

- 方法支持。
- 请求结果请返回 JSON 对象。
- 数据状态只有在成功（2xx）的时候触发 `submit-success` 的逻辑，其他的均触发 `submit-error` 逻辑。

必选项：否  

## 注意事项

1. 表单提交方法如果为 `post`，应使用 HTTPS 地址。避免 MIP-Cache HTTPS 环境提交到 HTTP，导致浏览器报错。
2. 使用 fetch 功能时，请求使用 cors 时不能配置为 *。
