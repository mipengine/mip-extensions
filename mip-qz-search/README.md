# mip-qz-search

前瞻网搜索组件

标题|内容
----|----
类型|定制,业务
支持布局|container
所需脚本|http://mipcache.bdstatic.com/static/mip-qz-search/latest/mip-qz-search.js

## 示例

### 基本用法
```html
<link type="text/css" rel="Stylesheet" href="http://img1.qianzhan123.com/2016/css/xw_common.css?v=20160101"> <!--测试用-->
<mip-qz-search class="search" action="http://xw.qianzhan.com/search?q={0}" >
    <input type="text" class="txt" placeholder="请输入关键词" value="" >
    <input type="button" class="sbt i-search icon" >
</mip-qz-search>
```

## 属性

### action

说明：搜索响应url {0}替换为搜索关键字
必选项：是
类型：字符
默认值：""

## 注意事项

