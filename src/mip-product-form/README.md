# mip-product-form

fetch请求

标题|内容
----|----
类型|通用
支持布局|N/S
## 示例

### 基本使用

```html
<script type="text/javascript" src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js
"></script>
<button type="button" on="tap:quoteForm.reload(500)">测试</button>
<mip-product-form method="post" id="quoteForm" fetch-url="http://laravel51.com/postData" on="success:quoteForm.reload(500)">
    <ul>
        <input type="hidden" name="purchase_id" value="321" id="q_purchase_id">
        <input type="hidden" name="login_uid" value="2222" id="q_login_uid">
        <li>报价产品：产品名</li>
        <li class="pr">
            <input class="input" type="text" name="price" value="12" validatetarget="price" validatetype="custom" validatereg="^[1-9]+(\.\d{0,2})?$|^0(\.\d{0,2})?$|^[1-9]+[0-9]*(\.\d{0,2})?$" placeholder="产品报价"><span class="price">元/件</span>
            <div class="error" target="price">请填写正确的金额</div>
        </li>
        <li>
            <input class="input" type="text" name="mobile" value="13333333333" validatetarget="mobile" validatetype="custom" validatereg="^1[345789]\d{9}$" placeholder="联系方式">
            <div class="error" target="mobile">请填写正确的手机号</div>
        </li>
        <li>
            <input class="input" type="text" name="contact" value="我的哥" validatetarget="contact" validatetype="custom" validatereg="^[a-zA-Z0-9\u4e00-\u9fff\w]{2,8}$" placeholder="联系人">
            <div class="error" target="contact">联系人为2-8位数字字母或中文</div>
        </li>
    </ul>
    <div submit-fail>
        <template type="mip-mustache">
             {{failmsg}} 
        </template>
    </div>
    <button type="submit"  class="btn Themebg">提交</button>
 </mip-product-form>
```
### url

说明：必须是 HTTP(S) 或 // 开头的地址   
必选项: 是  

### method
说明：请求方法  ,默认post  
必选项: 无  

### on 

说明：可以被触发的事件  
必选项: 否  
服务端返回的数据格式 :  
{  
    status: 1,  
    msg: '',  
    data: [],  
}  
status -1  代表服务器响应成功,但处理结果为失败。可以触发使用fail事件  
status 1 代表服务器响应成功,处理结果为成功。可以触发使用success事件  
若服务器异常，则触发error事件  






