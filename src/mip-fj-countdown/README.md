# mip-fj-countdown 倒计时

表单提交。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-fj-countdown/mip-fj-countdown.js

## 示例

### 基本使用（Y-m-d H:i:s格式结束时间）

```html
<mip-fj-countdown endtime="2017-12-30 12:11:55">
</mip-fj-countdown>
```

### 时间戳格式结束时间

```html
<mip-fj-countdown unixendtime="1511557556">
</mip-fj-countdown>
```

### 自定义元素

```html
<mip-fj-countdown endtime="2017-12-25 11:06:00">
    <span class="countdown-left-day"></span>天
    <span class="countdown-left-hour"></span>时
    <span class="countdown-left-minute"></span>分
    <span class="countdown-left-second"></span>秒
</mip-fj-countdown>
```

### 自定义结束标签

```html
<mip-fj-countdown endtime="2017-10-30 12:11:55" endtip="已经结束了">
</mip-fj-countdown>
```

## 属性

### endtime

说明：倒计时结束时间（Y-m-d H:i:s格式）  
必选项：否（endtime || unixendtime 二择一）  

### unixendtime

说明：倒计时结束时间（时间戳格式 精确到秒数或者毫秒数）  
必选项：否（endtime || unixendtime 二择一）  

### endtip

说明：倒计时结束时的提示文字  
必选项：否

## 注意事项

1. 
