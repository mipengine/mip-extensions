# mip-close-dom

mip-close-dom 关闭组件，点击关闭外层dom

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-close-dom/mip-close-dom.js

## 示例

### 基本用法
```html
<section class="close-section">
    <mip-close-dom class="close-btn" target="outer">
        自定义内容，可以嵌套其他组件，zhoushengzhe
    </mip-close-dom>
</section>
```

## 属性

### target

说明：指向需要关闭的dom, 支持queryselector
必选项：是
类型：字符串
取值范围：'outer' queryselector内容
默认值：outer
