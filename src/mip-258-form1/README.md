# mip-258-form1

mip-258-form1 表单组件

标题|内容
----|----
类型|通用
支持布局|fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-form1/mip-258-form1.js

## 示例
### 基本使用

```html
<mip-258-form1 method="get" fetch-url="http://laravel51.com/postData" from="comment" id="test" >
    <input type="number" name="mobile" validatetarget="mobile" validatetype="phone" placeholder="电话号码" class="inquiryMobile" value="13950186826">
    <div class="btnCode getInquiryCode" btn-url="http://m.258.com/Common/sendMobileCode">获取验证码</div>
    <div class='waitInquiryCode hide'><span class='waitInquiry'>59</span>秒后重新获取</div>
    <div class="error" target="mobile">请输入正确的电话</div>
    <input type="number" validatetarget="age" validatetype="must" name="age" placeholder="年龄" value="123">
    <div class="error" target="age">年龄不能为空</div>
    <div submit-success>
        <template type="mip-mustache">
            {{aaa}}
        </template>
    </div>
    <div submit-fail class="error">
        <template type="mip-mustache">
            {{failinfo}}
        </template>
    </div>
    <div submit-error>
        <template type="mip-mustache">
            Error!.
        </template>
    </div>
    <input type="submit" class="submit" value="提交">
</mip-258-form1>
```
## 属性

### method

说明：表单提交方法  
必选项：是 

### controlId

说明：需要控制的id 
必选项：否  

### from

说明：来自那张表单  
必选项：否  

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

### pid

说明: 用来绑定产品id
必选项: 否

### cid

说明: 用来绑定公司id
必选项: 否

- 方法支持。
- 请求结果请返回 JSON 对象。
- 数据状态只有在成功（2xx）的时候触发 `submit-success` 的逻辑，其他的均触发 `submit-error` 逻辑。

必选项：否  

### on

说明: 添加事件清空表单
必选项: 否


## 注意事项

1. 表单提交方法如果为 `post`，应使用 HTTPS 地址。避免 MIP-Cache HTTPS 环境提交到 HTTP，导致浏览器报错。
2. 使用 fetch 功能时，请求使用 cors 时不能配置为 *。