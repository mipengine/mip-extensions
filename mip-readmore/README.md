# mip-readmore

mip-readmore 组件说明

标题|内容
----|----
类型|文章类
支持布局|container
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-readmore/mip-readmore.js

## 示例

### 基本用法
```html
<mip-readmore maxHeight="600" pageClass="paging" id="readmore" imgHref="http://m.cndzys.com/jiankangtoutiao/tongyong/">
    自定义内容，可以嵌套其他组件
</mip-readmore>
```

## 属性

### maxHeight

说明：设置文章允许的最大高度，超过即隐藏
必选项：是
类型：integer
取值范围：>0
单位：px

### pageClass

说明：设置分页class，如果分页class内为空则使用隐藏功能，如果不为空则不启用该组件
必选项：是
类型：string

### id

说明：设置组件id 以便使用dom元素
必选项：是
类型：string

### imgHref

说明：为文章内提供提供一个a标签
必选项：否
类型：string
