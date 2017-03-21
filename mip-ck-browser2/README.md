# mip-ck-browser

mip-ck-browser用于改造中医详情页面的js脚本代码

|描述|脚本mip改造|
|---|---|
|类型|脚本|
|支持布局|N/S|
|所需脚本|https://mipcache.bdstatic.com/static/v1/mip-ck-browser/mip-ck-browser.js|

## 示例


```html
<style mip-custom>
    .mip-ck-browser {display: none;}
    .mip-ck-browser p {text-align: center;}
</style>

<mip-ck-browser browser="QQ,UC" class="mip-ck-browser">
    <p>this is content in UC Browser and QQ Browser</p>
</mip-ck-browser>
<mip-ck-browser browser="QQ,UC" converse class="mip-ck-browser">
    <p>this is content not in (UC Browser and QQ Browser)</p>
</mip-ck-browser>
<mip-ck-browser browser="UC" class="mip-ck-browser">
    <p>this is content in UC Browser</p>
</mip-ck-browser>
<mip-ck-browser browser="QQ" class="mip-ck-browser">
    <p>this is content in QQ Browser</p>
</mip-ck-browser>
<mip-ck-browser browser="QQ" converse class="mip-ck-browser">
    <p>this is content not in QQ Browser</p>
</mip-ck-browser>

<mip-ck-browser browser="UC" converse class="mip-ck-browser">
    <p>this is content not in UC Browser</p>
</mip-ck-browser>
```

## 属性

### browser

说明：选择浏览器环境 
必选项：是  
类型：字符串  
取值范围：UC,QQ,Safari，匹配多个浏览器使用,分开

### converse 

说明：排除browser属性提供的浏览器环境 
必选项：否 
类型：字符串  
取值范围：converse, true
