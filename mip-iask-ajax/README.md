# mip-iask-ajax

mip-iask-ajax iask—ajax请求

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://c.mipcdn.com/static/v1/mip-iask-ajax/mip-iask-ajax.js

## 示例

### 基本用法
```html
<span class="btn-goods-02" id="id">1</span>
<mip-iask-ajax url="http://m.iask.sina.com.cn/answer/praised" data="{'answerId' : 'id'}" isLogin="true" click="id" type="1" div="#id" >
</mip-iask-ajax>
```

## 属性

### url

说明：ajax请求路径
必选项：是
类型：字符串
## 注意事项

### data

说明：ajax请求所需参数
必选项：是
类型：json

### isLogin

说明：是否需要登录验证
必选项：是
类型：true false

### type

说明：根据业务设置
必选项：否
类型：字符串  1 ：点赞

### div

说明：div的id或者class等
必选项：否
类型：字符串
