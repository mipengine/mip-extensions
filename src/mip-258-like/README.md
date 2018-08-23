# mip-258-like

mip-258-like 组件说明

标题|内容
----|----
类型|通用
支持布局|fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-like/mip-258-like.js

## 示例

### 基本用法

```html
<mip-258-like width="50" height="50" id="like" on="tap:like.toggle" data-method="get" fetch-url="http://gl.beta.data.258.com/web/get_token">
    <div class="iconfont icon-like"></div>
</mip-258-like>
```

## 属性

### data-method

说明：标明请求方式
必选项：是
类型：字符串
取值范围：get post
默认值：无

### fetch-url

说明：请求接口地址
必选项：是
类型：字符串
取值范围：无
默认值：无

## 注意事项

