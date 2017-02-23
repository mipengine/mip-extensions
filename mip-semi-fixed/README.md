# mip-semi-fixed

mip-semi-fixed 滚动页面到一定高度时后再实现悬浮固定定位，回滚恢复初始状态

标题|内容
----|----
类型|通用
支持布局|不使用布局
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-semi-fixed/mip-semi-fixed.js

## 示例

### 基本用法
```html
<div id="semi-normal">
    自定义内容，可以嵌套其他组件或标签
</div>
<mip-semi-fixed id="semi-fixed"  threshold="100">
    自定义内容，可以嵌套其他组件或标签
</mip-semi-fixed>
```


## 属性

### threshold

说明：组件显示悬浮切换时页面已经滚动的高度
必选项：否
取值范围：数值
单位：无
默认值：100

## 注意事项
- mip-semi-fixed 默认是隐藏的。
- mip-semi-fixed 组件内元素的悬浮定位的位置由用户根据需求，通过css自行控制位置或是样式。
- mip-semi-fixed 内部可任意修改或添加其他标签和内容，使用灵活。