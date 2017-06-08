# mip-ys137-ad

mip-ys137-ad 管理页面上的所有广告位

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ys137-ad/mip-ys137-ad.js

## 示例

### 普通广告
```html
<mip-ys137-ad id="1">
</mip-ys137-ad>
```

### lazy广告
```html
<div style="height:1000px;">
</div>
<mip-ys137-ad id="2" lazy="true">
</mip-ys137-ad>
```

### 直接投放百度广告
```html
<mip-ys137-ad tu="nbdqx58bef">
</mip-ys137-ad>
```

## 属性

### id

说明：广告ID
必选项：是
类型：数字
取值范围：>0
默认值：0

### lazy

说明：默认不加载代码，当用户滚动到代码位时才加载
必选项：否
类型：布尔
取值范围：true,false
默认值：false

### tu

说明：百度代码位反屏蔽代码
必选项：否
类型：字符串
取值范围：无
默认值：''