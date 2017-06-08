# mip-access

mip-access 能够允许发布者对页面内容进行访问权限的控制，通过内容标记和用户访问情况进行综合评价，从而实现对付费墙和订阅功能的支持。

标题|内容
----|----
类型|通用
支持布局|不使用布局
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-access/mip-access.js

## 示例

### 正常标签
```html
<div class="left">
    自定义内容
</div>
```

### ACCESS标签
```html
<div mip-access='access AND login' mip-access-hide>
    自定义内容
</div>
```

## 属性

### mip-access

说明：控制DOM元素展示或隐藏
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无