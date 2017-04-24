# mip-ruizhiqi-pagination

mip-ruizhiqi-pagination 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ruizhiqi-pagination/mip-ruizhiqi-pagination.js

## 示例

### 基本用法
```html
<mip-ruizhiqi-pagination sitename="yuanyangguandao" receiveid="003" pagename="product" pageCount="10" current="2" showCount="3">
    <div class="pages pro-pagination">
	<div id="Pagination" class="tcdPageCode"></div>
    </div>
</mip-ruizhiqi-pagination>
```

## 属性

### sitename

说明：网站名称
必选项：是
类型：字符串

### receiveid

说明：栏目ID
必选项：是
类型：字符串

### pagename

说明：页面名称
必选项：是
类型：字符串

### pageCount

说明：页面显示数量
必选项：是
类型：字符串

### current

说明：页面当前页
必选项：是
类型：字符串

### showCount

说明：分页条显示个数
必选项：是
类型：字符串

## 注意事项

