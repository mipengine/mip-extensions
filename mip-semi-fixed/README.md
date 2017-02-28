# mip-semi-fixed

mip-semi-fixed 滚动页面到一定高度时后再实现悬浮定位，回滚复位

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-semi-fixed/mip-semi-fixed.js

## 示例

### 基本用法

```html
 <mip-semi-fixed>
    <div static>
        MIP-SEMI-FIXEDMIP-SEMI-FIXED
    </div>
    <div semifixed>
        MIP-SEMI-FIXED
    </div>
 </mip-semi-fixed>
```

### 设置 fixed 时距离页面顶部的阈值

```html
 <mip-semi-fixed threshold="100">
    <div static>
        MIP-SEMI-FIXEDMIP-SEMI-FIXED
    </div>
    <div semifixed>
        MIP-SEMI-FIXED
    </div>
 </mip-semi-fixed>
```

## 属性

### threshold

说明：元素 fixed 状态时距离页面顶部的距离
必选项：否
类型：整数
取值范围：无
单位：无
默认值：0

## 子节点

### div[static]

说明：滚动状态时内容容器，必须是具有 `static` 属性的 `div` 标签
必选项：是
类型：DOM 节点
取值范围：无
单位：无
默认值：div[static]

### div[semifixed]

说明：fixed 状态时内容容器，必须是具有 `semifixed` 属性的 `div` 标签
必选项：是
类型：DOM 节点
取值范围：无
单位：无
默认值：div[semifixed]

