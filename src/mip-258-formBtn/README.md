# mip-258-formBtn ajax请求

ajax请求

标题|内容
----|----
类型|通用
支持布局|N/S
## 示例

### 基本使用

```html
<mip-258-formBtn method="post" url="http://laravel51.com/postData" redirect="" reload="false">
	<input type="text" name="user_id" value="1111">
	<span class="success" style="display: none;">请求成功,一秒后跳转</span>
	<span class="error" style="display: none;">字段格式不正确</span>
	<button type="button">确定</button>
</mip-258-formBtn>

```
### url

说明：必须是 HTTP(S) 或 // 开头的地址   
必选项: 是  

### method

说明：请求方法  
必选项: 是  

### redirect

说明：必须是 HTTP(S) 或 // 开头的地址   
必选项: 否  

### reload

说明：boolean值 默认false, 请求成功后是否页面刷新
必选项: 否  





