# mip-qf-loadingscroll

mip-qf-loadingscroll 当用户滚动到页面底部时，异步加载更多数据，可配合湖南七风的下载逻辑组件一起使用。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|
https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br/>
https://c.mipcdn.com/static/v1/mip-qf-loadingscroll/mip-qf-loadingscroll.js<br/>

## 示例

获取排行榜数据，初始化下载按钮相关逻辑，节点插入页面。

- `data-url` jsonp 请求 url。
- `gap` (可选)触发滚动回调的距离，单位px。
- `timeout` (可选) jsonp 超时时间。
- `txt-completed` (可选) 加载完毕按钮文本。
- `txt-failed` (可选) 加载失败按钮文本。
- `txt-loading` (可选) 正在加载按钮文本。

```html
<mip-qf-loadingscroll data-url="https://mtest.119you.com/fgame/game/ranking" gap="200" timeout="5">
    <script type="application/json">
        {
            "columns": "downloadlink,name",
            "pageSize": 10,
            "siteId": 124,
            "type": 1
        }
    </script>
    <template type="mip-mustache">
        <li>
            <span>{{itemnum}} {{name}}</span><br>
            <span>apk：{{apkHref}}</span><br>
            <span>ipa: {{ipaHref}}</span>
            <mip-img src="https://mip.119you.com/upload/resources/image/2018/09/10/369221_120x120.jpg?1536573125000"></mip-img>
        </li>
    </template>
    <ul>
        <li>
            <span>第一个节点元素为lili， itemNum 计数‘li’标签<span>
        </li>
        <p>与第一个节点非同名元素标签：itemNum 不计数</p>
    </ul>
    <div class="mip-qf-loadingscroll-buffer"></div>
    <button class="mip-qf-loadingscroll-btn" txt-completed="已加载全部" txt-failed="加载失败，点击重新加载" txt-loading="努力加载中...">加载更多</button>
</mip-qf-loadingscroll>
```

## 参数

### columns

说明：接口将根据此属性返回对应的数据.
必选项：否
类型：String
取值范围：接口返回数据的键名
默认值：''

### rankCode

说明：自定义榜单编码.
必选项：否
类型：String
取值范围：无
默认值：''

### pageIndex

说明：数据页数.
必选项：否
类型：Number
取值范围：[0, +∞)
默认值：0

### publishTarget

说明：无.
必选项：否
类型：String
取值范围：['Html5', 'pc']
默认值：'Html5'

### siteId

说明：站点ID.
必选项：否
类型：Number
取值范围：无
默认值：无

### type

说明：排行榜类型.1、热门；7、自定义
必选项：否
类型：Number
取值范围：[0, +∞)
默认值：无

## 注意事项

