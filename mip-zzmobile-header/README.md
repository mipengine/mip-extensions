# mip-zzmobile-header

header 组件

标题|内容
----|----
类型|业务，定制
支持布局|不使用布局
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zzmobile-header/mip-zzmobile-header.js

## 示例

```html
<mip-zzmobile-header class="clearfix">
    <mip-img 
        layout="fixed" 
        width="173"
        height="31"
        src="/static/zzmobile/image/common/logo_mobile.png">
    </mip-img>
    <div class="login">
        <a href="/login/passlogin?url=/" class="login-text" target="_blank">登录</a>
        <a href="/user/index" class="username" target="_blank"></a>
    </div>
</mip-zzmobile-header>
```