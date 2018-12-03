# mip-qf-loadingscroll

mip-qf-loadingscroll 当用户滚动到页面底部时，异步加载更多数据，可配合湖南七风的下载逻辑组件一起使用。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-loadingscroll/mip-qf-loadingscroll.js,https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js

## 示例
```html
<mip-qf-loadingscroll data-url="https://mtest.119you.com/fgame/game/ranking" gap="200" timeout="5">
    <script type="application/json">
        {
            "columns": "downloadlink,name",
            "pageSize": 10,
            "siteId": 124,
            "type": 3
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
            <span>第一个元素节点为 li，itemNum 计数'li'标签</span><br>
        </li>
        <p>p 标签:itemnum 不计数</p>
    </ul>
    <div class="mip-qf-loadingscroll-buffer"></div>
    <button class="mip-qf-loadingscroll-btn" txt-completed="已加载全部" txt-failed="加载失败，点击重新加载" txt-loading="努力加载中...">加载更多</button>
</mip-qf-loadingscroll>
```
## 属性

### data-url

说明：请求接口地址
必选项： 是
类型：String
默认值：无

### gap

说明：触发滚动回调的距离
必选项：否
类型：Number
单位：px

### timeout

说明：jsonp超时时间
必选项：否
类型：Number
单位：ms

### txt-completed

说明：加载完毕按钮文案
必选项： 否
类型：String
默认值：已加载全部

### txt-failed

说明：加载失败按钮文案
必选项：否
类型：String
默认值：加载失败，点击重新加载

### txt-loading

说明：正在加载按钮文案
必选项：否
类型：String
默认值：努力加载中...

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

