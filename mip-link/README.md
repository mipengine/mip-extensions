# mip-link 跳转链接

实现两个 MIP 页面之间互相跳转的功能。

标题|内容
----|----
类型|通用
支持布局|不使用布局
所需脚本|无

## 升级说明

由于 mip-link 的标签不利于 spider 识别，故将 mip-link 的自定义标签升级成 a 标签上直接扩展，使用方法见下文。之前的方式还是能够正常使用

## 示例

```html
<a data-type="mip" data-title="目标页面标题" href="https://www.mipengine.org/doc/00-mip-101.html">链接文字</a>
```

## 属性

### url

说明：目标网址  
必选项：是  
类型：字符串  
取值范围：`https?://.*`, `mailto:.*`, `tel:.*`

### data-title

说明：目标页面标题  
必选项：否  
类型：字符串  
取值范围：任何  
默认值：`""`

### mip-link 标签使用的方式(不推荐)

1、引入脚本：https://mipcache.bdstatic.com/static/v1/mip-link/mip-link.js

2、添加代码:
```html
<mip-link title="目标页面标题" href="https://www.mipengine.org/doc/00-mip-101.html">链接文字</mip-link>
```

