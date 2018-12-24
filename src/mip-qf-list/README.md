# mip-qf-list

mip-qf-list 湖南七风119游戏主页评论列表组件，配合湖南七风119游戏主页发表评论组件使用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|
https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br/>
https://c.mipcdn.com/static/v1/mip-qf-list/mip-qf-list.js

## 示例

### 基本用法
```html
<mip-qf-list 
    template="mip-template-id"
    src="https://www.easy-mock.com/mock/5c0f88505324d050e6ab19fa/m.119you.com/api/simplecomment/data"
    id="mip-list"
    has-more
    pnName="pageindex"
    pn=0
    relaid="165234"
    columns=""
    pageSize=""
    timeout="3000">
    <template type="mip-mustache" id="mip-template-id">
        <div>
            <li style="font-size: 24px;height:20px;">{{id}}: {{content}}</li>
        </div>
    </template>
</mip-qf-list>
<div on="tap:mip-list.more" id="btn-more"> 点击查看更多 </div>
```

## 属性

### src

说明：接口请求URL
必选项：是
类型：URL
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

### has-more

说明：点击查看更多标识
必选项：是
单位：无
默认值：无

### pnName

说明：翻页参数名
必选项：否
类型：String
默认值：pageindex

### pn

说明：页码参数
必选项：否
类型：Number
取值范围：自然数
默认值：1

### relaid

说明：游戏id参数
必选项：是
类型：Number
默认值：无

### columns

说明：请求参数
必选项：否
类型：String
默认值：'id,member,content,support'

### pageSize

说明：单页容纳元素数量
必选项：否
类型：Number
默认值：10

## 注意事项

