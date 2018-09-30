# mip-258-tool

ajax请求

标题|内容
----|----
类型|通用
支持布局|N/S
## 示例

### 基本使用

```html
<button type="button" on="tap:258-tool.redirect(http://www.baidu.com,2000)">测试</button>
<mip-258-tool id="258-tool"></mip-258-tool>
```
### on

说明：goback事件对应window.history.back()事件  
reload(100)事件对应window.reload()事件，传入毫秒数，用于刷新等待  
alert()事件对应window.alert()事件  
redirect('url,time_wait') 对应window.location.href事件
必选项: 否  








