# mip-qf-fixedbox

mip-qf-fixedbox 页面滚动固定距离出现悬浮框

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-fixedbox/mip-qf-fixedbox.js

## 示例

### 基本用法
```html
<mip-qf-fixedbox hide-distance="10" data-slide="fixed-box-show" class="fixed-box">
</mip-qf-fixedbox>
```

## 属性

### hide-distance

说明：自定义是否出现悬浮框的判定高度
必选项：是
类型：Number
取值范围：正整数
单位：无
默认值：0

### data-slide

说明：悬浮框显示的样式类名
必选项：是
类型：字符串

## 注意事项

hide-distance的单位是rem，请进行详尽计算

