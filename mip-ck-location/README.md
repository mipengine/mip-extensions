# mip-ck-location

mip-ck-location 根据不同地区展示不同的内容

|描述|脚本mip改造|
|---|---|
|类型|脚本|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-ck-location/mip-ck-location.js|

## 示例


```html
<style mip-custom>
    .mip-ck-location, mip-ck-browser {display: none;}
    .mip-ck-location p {text-align: center;}
</style>

<mip-ck-location location="1" class="mip-ck-location">
    <p>this is content at beijing area</p>
</mip-ck-location>

<mip-ck-location location="1" class="mip-ck-location">
    <mip-ck-browser browser="UC">
        <p>this is content at beijing area in uc browser</p>
    </mip-ck-browser>
</mip-ck-location>

<mip-ck-location location="1" converse class="mip-ck-location">
    <p>this is content not at beijing area</p>
</mip-ck-location>
<script defer src="/local-extension-loader?name=mip-ck-browser"></script>
```

## 属性

### location

说明：选择地区 
必选项：是  
类型：字符串  
取值范围：地区编码:1, 2, 3, 4.... (1 => 北京)，匹配多个浏览器使用,分开

### converse 

说明：排除area属性提供的浏览器环境 
必选项：否 
类型：字符串  
取值范围：converse, true
