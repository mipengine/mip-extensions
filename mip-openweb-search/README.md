# mip-openweb-search

mip-openweb-search 配置ghost rss搜索, 事件绑定

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-openweb-search/mip-openweb-search.js

## 示例

### 基本用法

```html
<mip-form>
	<input placeholder="输入搜索词" name="search">
	<mip-openweb-search
		rss="https://a.com/rss.xml"
		resultsDom="#results">
		触发事件
	</mip-openweb-search>
</mip-form>
<div id="results"></div>
```

## 属性

### rss

说明：指向搜索的rss地址, 要求填写全路径地址，不可以跨域
必选项：是
类型：字符串

### resultsDom

说明：指向存放搜索结果的DOM，要求使用$()可以选择到
必选项：是
类型：字符串

## 注意事项
由于在MIP-Cache中，rss参数不能（SHOULD NOT）直接写/rss/, 要（MUST）写全路径地址, 
