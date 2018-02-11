# mip-fixed 悬浮布局

悬浮元素整体使用方案。

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js

## 示例

### 顶部悬浮

```html
<mip-fixed type="top">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 底部悬浮

```html
<mip-fixed type="bottom">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 左边悬浮

规则：属性 `bottom` 或 `top` 必须有一个

```html
<mip-fixed type="left" bottom="50px">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 右边悬浮

规则：属性 `bottom` 或 `top` 必须有一个

```html
<mip-fixed type="right" top="50px">
    自定义内容，可以嵌套其他组件
</mip-fixed>
```

### 支持 `<mip-gototop>`

```html
<mip-fixed type="gototop">
    <mip-gototop></mip-gototop>
</mip-fixed>
```

### 关闭悬浮元素的方法

1. 给 `<mip-fixed>` 标签添加一个自定义的 `id=customid`。

2. 给需要点击关闭悬浮元素的标签添加属性 `on="tap:customid.close"`。

```html
<mip-fixed type="top" id="customid">
  <div>我是顶部的fixed</div>
  <div  class="btn_style" on="tap:customid.close">我是关闭按钮</div>
</mip-fixed>
```

## 属性

### type

说明：悬浮类型  
必选项：是  
类型：字符串  
取值范围：`top/bottom/right/left`

### top

说明：距离屏幕顶部距离  
必选项: 否  
类型：字符串  
取值范围：数值+单位，例如：`50(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)`  
默认值：`auto`

### bottom

说明：距离屏幕底部距离  
必选项: 否  
取值范围：数值+单位，例如：`50(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)`  
默认值：`auto`


## 注意事项

### 悬浮类型

- `type` 为 `top`, `bottom` 类别不需要添加属性：`top/bottom`。

- `type` 为 `left`, `right` 类别需要至少添加一个 `top/bottom` 属性，优先用 `bottom`。

- `type` 为 `gototop` 类别不需要任何属性。
