# mip-xinshijue-script

mip-xinshijue-script 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-xinshijue-script/mip-xinshijue-script.js

## 示例

### 基本用法
```html
<mip-xinshijue-script id="xsj"></mip-xinshijue-script>
<div class="wrapper" data-sitepath="/" data-siteaid="10" data-sitetid="11" data-siteid="12"> 自定义内容，可以嵌套其他组件</div>
<div class="searchPop">这是搜索框</div>
<button type="button" on="tap:xsj.search_display(show)">显示搜索</button>
<br />
<button type="button" on="tap:xsj.search_display(hide)">隐藏搜索</button>
<br />
<br />
<button type="button" on="tap:xsj.moremenu_display">显示菜单</button>
<br />
<br />
<div class="header">
	<div class="headerMenuMore">更多菜单</div>
</div>
<button on="tap:xsj.goto_top">返回顶部</button>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

