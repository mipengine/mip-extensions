# mip-form 表单

mip-form 用来支持 mip 中的表单提交。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-form/mip-form.js

## 示例

### 基本使用

```html
<mip-form method="post" url="www.baidu.com">
     <input type="input" name="username" validatetarget="username" validatetype="must" placeholder="姓名">
     <div class="mip-form-target" target="username">姓名不能为空</div>
     <input type="input" name="email" validatetarget="email" validatetype="email" placeholder="邮件">
     <div class="mip-form-target" target="email">填写正确的email</div>
     <input type="input" name="phone" validatetarget="phone" validatetype="phone" placeholder="电话">
     <div class="mip-form-target" target="phone">填写正确的电话格式</div>
     <input type="input" name="customnumber" validatetarget="custom" validatetype="custom" validatereg=^[0-9]*$ placeholder="我是自定义验证规则数字">
     <div class="mip-form-target" target="custom">请输入正确的数字</div>
     <input type="submit" value="提交">
 </mip-form>
```
### 加清空按钮

```html
<mip-form method="post" url="xxx" clear="true">
    <input type="input" name="username" validatetarget="username" validatetype="must" placeholder="姓名">
    <div target="username">姓名不能为空</div>
    <input type="input" name="email" validatetarget="email" validatetype="email" placeholder="邮件">
    <div target="email">填写正确的email</div>
    <input type="submit" value="提交">
</mip-form>
```

## 属性

### method

说明：表单提交方法  
必选项：是  

### url

说明：表单提交url   
必选项: 是  

### validatetarget

说明:  验证提示对应tag,用于对应错误时的提示显示元素的查找    
必选项：否   

### validatetype

说明：验证类型, 用于支持简单的验证。目前提供email、phone、idcar、custom。当为custom时则需要填写validatereg    
必选项：否   

### validatereg

说明: 自定义验证，补充站长个性化的验证规则。如果validatetype为custom时需填写相应验证规则  
必选项：否

### clear

说明: 表单中input清空按钮开关 
必选项：否  
