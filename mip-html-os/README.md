# mip-html-os

mip-html-os 用来支持页面内容元素区分OS显示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-html-os/mip-html-os.js

## 示例

```html
<mip-html-os os="android" class="mip-html-os"><p>This Is Android</p></mip-html-os>
<mip-html-os os="ios" class="mip-html-os"><p>This Is Ios</p></mip-html-os>
```

## 属性

### os

说明：选择操作系统  
必选项：是  
类型：字符串  
取值范围：android, ios  

