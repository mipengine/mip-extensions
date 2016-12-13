# mip-a5-loadmore

mip-a5-loadmore 是a5创业网逻辑组件。

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-a5-loadmore/mip-a5-loadmore.js

## 示例

### 基本使用



```html
<mip-a5-loadmore options="{'url':'###'}">
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

### options

说明：参数配置  
必选项：是  
类型：字符串  
取值范围：json格式  
默认值：
```json
"{  
    url: '/',
    page: 2,
    btn: '.loadBtn',
    moreList: '.moreList',
    status: {
        init: '<i></i>加载更多',
        loading: '<i></i>加载中',
        ending: '<i></i>没有了',
        error: '<i></i>网络错误'
    },
    scrollPage: -1,
    pageParam: 'page'
}"
```
参数说明：  
参数|类型|说明  
----|----|----
url|string|指定url
page|int|第一次加载的页码
btn|string|点击加载的按钮
moreList|string|列表，获取其子元素，并append到其中
status|obj|按钮显示的内容，init表示初始化和加载完成，loading正在加载，ending没有更多数据了，error错误
scroll|int|滚动到底部自动加载页数，-1：不自动加载,0：一直加载，>0：加载的次数
