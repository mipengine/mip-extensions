# mip-code-button

标题|内容
----|----
类型|通用
支持布局|N/S
## 示例

### 基本使用

```html
<mip-code-button id="myCodeBtn" url="http://laravel51.com/postData" timeout="60" fail-info-id="fail-info-id">
    <div class="codeBoxBtn Themebg">
        <button type="button" fetch-button>获取验证码</button>
        <div time-count><span></span>秒后重新获取</div>
    </div>
</mip-code-button>
```
### url

说明： 必须是 HTTP(S) 或 // 开头的地址   
必选项: 是  

### fetch-button

说明：提交触发选择器属性 
必选项: 是 

### time-count
说明： 时间倒计时选择器属性
必选项: 是 
注意: 时间数值必须包裹在firstElementChild里面

### timeout
说明 ： 倒计时超时时间
默认值: 60
必选项: 否

### fail-info-id
说明 ： 获取失败错误信息提示元素
必选项: 否






