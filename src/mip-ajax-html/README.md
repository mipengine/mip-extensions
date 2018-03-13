# mip-ajax-html

mip-ajax-html 页面加载完成或是指定事件来触发元素ajax异步加载数据到指定容器

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ajax-html/mip-ajax-html.js

## 示例

### 通过 mip-ajax-html标签来指定触发加载容器指定异步内容追加容器以及其他参数来异步加载内容
```html
<mip-ajax-html mip-ajax-params="{'url':'http://3g.ali213.net/news/ajax/mipdemoloading?callback=?','containerclass':'ajaxcontainer1','action':'click'}">
    <span class="add-handle">点击我加载</span>
</mip-ajax-html>
<div class="ajaxcontainer1">我下面是点击加载的</div>
<mip-ajax-html mip-ajax-params="{'url':'http://3g.ali213.net/news/ajax/mipdemoloading?type=0&id=[markplaceholder]&callback=?','containerclass':'ajaxcontainer2'}">
    <span>页面加载完成后加载</span>
</mip-ajax-html>
<div class="ajaxcontainer2">我下面是页面加载完成后加载的</div>
```

## 属性

### mip-ajax-params

说明：此异步加载所需要的参数   
必选项：是   
类型：数组格式的字符串   
取值范围：   需要配置异步加载的url ,   containerclass异步内容存放的容器的class,    action触发加载的动作（click，touchstart等，若无则页面加载完成后加载）   
单位：无   
默认值：无   

   

## 注意事项
为了适应更多的情况，通过jsonp异步加载来的json里面必须包含html这个key（一段html内容），mip-ajax-html内必须包含一个类名为“add-handle”的子节点，用来作为事件源。
