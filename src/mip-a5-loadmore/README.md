# mip-a5-loadmore

mip-a5-loadmore 是a5创业网逻辑组件,也适应于其他相似业务。

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-a5-loadmore/mip-a5-loadmore.js

## 示例

### 基本使用

```html
<mip-a5-loadmore options="{'url':'###'}">
    <script type="application/json">
    {  
        "url": "#",
        "page": 2,
        "btn": ".loadBtn",
        "moreList": ".moreList",
        "status": {
            "init": "<i></i>加载更多",
            "loading": "<i></i>加载中",
            "ending": "<i></i>没有了",
            "error": "<i></i>网络错误"
        },
        "scrollPage": -1,
        "pageParam": "page"
    }
    </script>

    <ul class="moreList">
        <li><a href="###">1</a></li>
        <li><a href="###">2</a></li>
        <li><a href="###">3</a></li>
    </ul>
    <div>
        <button class="loadBtn"><i></i>加载更多</button>
    </div>
</mip-a5-loadmore>
```

## 属性

### 配置
在组件script标签内配置相关设置，script中必须是json格式，参数说明如下： 
参数|类型|默认值|说明
----|----|----|----
url|string|"#"|指定获取数据url
page|int|2|第一次加载的页码
btn|string|".loadBtn"|点击加载的按钮
moreList|string|".moreList"|列表容器，每次加载获取其子元素，并append到其中
status|json|{<br>"init": "<i></i>加载更多",<br>"loading": "<i></i>加载中",<br>"ending": "<i></i>没有了",<br>"error": "<i></i>网络错误"<br>}|按钮显示的提示内容，init表示初始化和加载完成，loading正在加载，ending没有更多数据了，error错误
scroll|int|-1|页面滚动到底部自动加载页数，-1：不自动加载,0：一直加载，>0：加载的次数
pageParam|string|"page"|页码参数名称
