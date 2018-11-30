# mip-qf-marktip

mip-qf-marktip 根据客户端现实收藏提示框

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-marktip/mip-qf-marktip.js

## 示例

### 基本用法
```html
<mip-qf-marktip>
    <div class="ios-tip" tip-ios-img="https://m.119you.com/images/v2/img-other.png"></div>
    <div class="android-tip" tip-android-img="https://m.119you.com/images/v2/img-add-page2.png"></div>
</mip-qf-marktip>
```

## 属性

### os

说明：客户端类型
必选项：是
类型：字符串
取值范围：{ios|android}
默认值：null

### tip-ios-img

说明：ios提示图片
必选项：是
类型：URL类型

### tip-android-img

说明：android提示图片
必选项：是
类型：URL类型

## 注意事项

