# mip-ck-ad 

mip-ck-ad 是康网的问答详情页面的直投广告组件

标题|内容
----|----
类型|业务,广告
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-ck-ad/mip-ck-ad.js

## 示例

### 基本使用

```html
<mip-ck-ad ck-ad-pid="53"></mip-ck-ad>
```

### 不采用懒加载

```html
<mip-ck-ad ck-ad-pid="53" lazy="false"></mip-ck-ad>
```

### 固定位置

```html
<mip-fixed  type="bottom" id="ck-ad-52">
    <mip-ck-ad ck-ad-pid="52"></mip-ck-ad>
</mip-fixed>
```

## 属性

### ck-ad-pid

说明：指定康网直投广告位唯一ID  
必填：是  
格式：数字  
单位：无  
默认值：无  

### ck-ad-cateid

说明：康网直投广告关键词组,多词用，如果没有指定则直接获取`#tags`的`data-cateid`  
必填：否   
格式：字符串  
取值："瘦身","性病","减肥"    
单位：无   
默认值：`#tags`的`data-cateid`   

### lazy

说明：加载广告的方式,控制是否执行懒加载,取false则表示加载渲染页面时,直接加载对应的直投广告   
必填：否   
格式：布尔   
取值：true,false   
单位：无   
默认值：true   
