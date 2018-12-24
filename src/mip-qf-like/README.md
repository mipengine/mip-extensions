# mip-qf-like

mip-qf-like 湖南七风119游评论点赞功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-like/mip-qf-like.js

## 示例

### 基本用法
```html
<mip-qf-like data-commentid="" class="div-praise-active" like-url="https://www.easy-mock.com/mock/5c0f88505324d050e6ab19fa/m.119you.com/api/simplecomment/support" removelike-url="https://www.easy-mock.com/mock/5c0f88505324d050e6ab19fa/m.119you.com/api/simplecomment/cancelsupport">
    <span class="text">1</span>
    <i class="icon icon-ic-praise"></i>
</mip-qf-like>
```

## 属性

### data-commentid

说明：POST请求参数(游戏id)
必选项：否
类型：Number
默认值：无

### like-url

说明：点赞功能接口地址
必选项：否
类型：URL
默认值：'https://m.119you.com/api/simplecomment/support'

### removelike-url

说明：取消点赞功能接口地址
必选项：否
类型：URL
默认值：'https://m.119you.com/api/simplecomment/cancelsupport'

## 注意事项

