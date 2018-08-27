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
<mip-product-form  fetch-url="http://laravel51.com/postData">
    <input name="wode" value="">
    <div submit-fail>
        <template type="mip-mustache">
            {{failmsg}} 
        </template>
    </div>
    <div submit-error>
        <template type="mip-mustache">
            服务错误，请稍后重试
        </template>
    </div>
    <button type="submit">提交</button>
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






