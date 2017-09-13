# mip-ajax-data

mip-ajax-data 用来触发元素ajax异步加载数据到指定容器，也可以下拉加载

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ajax-data/mip-ajax-data.js

## 示例

### 通过 mip-ajax-data标签来指定触发加载容器指定异步内容追加容器以及其他参数来异步加载内容
```html
<mip-ajax-data mip-ajax-params="{'url':'http://3g.ali213.net/news/ajax/mipdemoloading?callback=?','containerclass':'ajaxcontainer1','action':'click'}">
    <span>下载中<mip-img src="http://3g.ali213.net/images/ajax_loading.gif"></mip-img></span>
</mip-ajax-data>
<div class="ajaxcontainer1">1111</div>
<div class="ajaxcontainer2">2222</div>
<mip-ajax-data mip-ajax-params="{'url':'http://3g.ali213.net/news/ajax/mipdemoloading?type=0&id=[markplaceholder]&callback=?','containerclass':'ajaxcontainer2','action':'roll','length':'6'}" mip-ajax-mark="0">
    <span>下载中<mip-img src="http://3g.ali213.net/images/ajax_loading.gif"></mip-img></span>
</mip-ajax-data>
```

## 属性

### mip-ajax-params

说明：此异步加载所需要的参数   
必选项：是   
类型：数组格式的字符串   
取值范围：   需要配置异步加载的url （如果是类似于下拉形式多次加载 需要指定markplaceholder，即在网址中会变的量，比如page或者id，并且需要设置mip-ajax-mark属性，还要设置步长length，length和后端数据一致）,   containerclass异步内容存放的容器的class,    action触发加载的动作（click，roll）   
单位：无   
默认值：无   

### mip-ajax-mark

说明：选填项，用来记录加载多少页或者加载到多少id了，此属性有，说明是多次加载   
必选项：否   
类型：一般是表示page或者id的整形数字   
取值范围：数字或者其他   
单位：无   
默认值：无   

## 注意事项
为了适应更多的情况，通过jsonp异步加载来的json里面必须包含html这个key（一段html内容），   如果是多次加载，还得有mip-ajax-mark这个key，表示下一次从哪一个page或者id开始，   还有length表示每次加载的记录数
