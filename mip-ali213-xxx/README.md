# mip-gototop

mip-gototop 提供了一个用来支持网页快速回顶按钮，用来支持网页快速回顶功能。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-gototop.js

## 示例

mip-gototop 按钮

```html
<style mip-custom>
    /* 示例css */
    .container {
        height: 1000px;
    }
    .gototop {
        background: #000;
        position: absolute;
        width: 100px;
        height: 100px;
        bottom: 0;
    }
</style>
<div class="container">
    <mip-gototop class="gototop"></mip-gototop>
</div>
```
