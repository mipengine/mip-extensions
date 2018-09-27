# mip-gzpd-alert

提示组件

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-___/mip-___.js

## 示例

### 基本使用

```html
<meta charset="utf-8"> 
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<script id="mip-gzpd-alert-data" type="application/json">
{
    "id": 105,
    "kefu": "kefu-8002",
    "alert": {
        "title": "用户服务",
        "art": "登陆并支付后使用",
        "detail": ["", ""],
        "btn": "跳转查看"
    },
    "alertWx": {
        "title": "付费提醒",
        "detail": ["微信支付:", "9.9元"]
    },
    "alertOk": {
        "title": "支付成功",
        "detail": ["获得使用权限"]
    },
    "alertCopy": {
        "title": "执行成功"
    }
}
</script>
<mip-gzpd-alert>
    <div class="content">
        <h1>文章标题</h1>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
        <p>bala bala bala... bala bala bala... bala bala bala...</p>
    </div>
</mip-gzpd-alert>
```
