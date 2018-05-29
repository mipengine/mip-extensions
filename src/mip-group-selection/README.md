# mip-group-selection 分组选择

mip-group-selection 分组选择组件，可用于城市分组，英文名分组，颜色分组等。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-group-selection/mip-group-selection.js<br>
https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js

## 示例

### 基本用法

按照如下示例配置城市数据。

```html
<mip-group-selection class="mip-hidden">
	<!-- 在 application/json 中配置全部城市 -->
	<script type="application/json">
    {"list": [
    	{   "key" :"热门", 
    		"cities": [
	        	{ "city": "北京", "pinyin": "beijing", "code": "1"},
	        	{ "city": "上海", "pinyin": "shanghai", "code": "2"},
	    },{	"key" :"A", 
        	"cities": [
				{ "city": "澳门", "pinyin": "aomen", "code": "7"},
				{ "city": "安庆", "pinyin": "anqing", "code": "8"},
		},{ "key" :"B", 
			"cities": [
				{ "city": "宝清", "pinyin": "baoqing", "code": "10"},
		},{
			"key":"C",
			"cities": [
				{ "city": "重庆", "pinyin": "chongqing", "code": "13"},
		},{
			"key":"D",
			"cities": [
				{ "city": "大庆", "pinyin": "daqing", "code": "16"},
		},{
			"key":"E",
			"cities": [
				{ "city": "鄂尔多斯", "pinyin": "eerduosi", "code": "19"},
		},{
			"key":"F",
			"cities": [
				{ "city": "阜阳", "pinyin": "fuyang", "code": "21"},
		},{
			"key":"G",
			"cities": [
				{ "city": "广州", "pinyin": "guangzhou", "code": "24"},
		}
	]}
    </script>
    <!-- 城市选择组件依赖的 DOM 结构，不建议自行删除结构 -->
    <div class="mip-group-selection-wrapper">
    	<template type="mip-mustache">
		    <div class="mip-group-selection-content">
		    	{{#list}}
		        <div class="mip-group-selection-group mip-group-selection-part-letter">
		            <div class="mip-group-selection-title" data-anchor="{{key}}">{{key}}</div>
		            {{#cities}}
		            <a class="mip-group-selection-item" href="#" data-code="{{code}}" data-pinyin="{{pinyin}}">{{city}}</a>
		            {{/cities}}
		        </div>
		       {{/list}}
		    </div>
	    	<mip-fixed class="mip-group-selection-sidebar-wrapper">
	    		<div class="mip-group-selection-sidebar">
			    	{{#list}}
			        <div class="mip-group-selection-item" data-code="{{code}}" data-pinyin="{{pinyin}}">{{city}}</div>
			        {{/list}}
		        </div>
		    </mip-fixed>
		</template>
	</div>
</mip-group-selection>
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
<!--侧边栏布局依赖mip-fixed组件提供样式-->
<script src="https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js"></script>
```

### 基本用法

按照如下示例配置城市数据。

[notice]`data-src`属于前后端交互请求。由于 MIP-Cache 为 HTTPs 环境，`data-src` 要求支持 HTTPs.

```html
<mip-group-selection class="mip-hidden" data-src="https://xxx/cities.json">
    <!--存在 data-src 时，本地数据配置不生效-->
    <!-- 城市选择组件依赖的 DOM 结构，不建议自行删除结构 -->
    <div class="mip-group-selection-wrapper">
        <template type="mip-mustache">
            <div class="mip-group-selection-content">
                {{#list}}
                <div class="mip-group-selection-group mip-group-selection-part-letter">
                    <div class="mip-group-selection-title" data-anchor="{{key}}">{{key}}</div>
                    {{#cities}}
                    <div class="mip-group-selection-item" data-code="{{code}}" data-pinyin="{{pinyin}}">{{city}}</div>
                    {{/cities}}
                </div>
               {{/list}}
            </div>
            <mip-fixed class="mip-group-selection-sidebar-wrapper">
                <div class="mip-group-selection-sidebar">
                    {{#list}}
                    <a class="mip-group-selection-link" data-target-anchor="{{key}}">{{key}}</a>
                    {{/list}}
                </div>
            </mip-fixed>
        </template>
    </div>
</mip-group-selection>
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
<!--侧边栏布局依赖mip-fixed组件提供样式-->
<script src="https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js"></script>
```

### 配合数据绑定
当选择某个元素，如`{ "city": "广州", "pinyin": "guangzhou", "code": "24"}`时，页面中数据会发生变化，配合 [mip-bind 数据绑定组件](https://www.mipengine.org/examples/mip-extensions/mip-bind.html) 可以将数据显示出来。

```html
<h3>这里使用了mip-bind组件</h3>
<mip-data>
    <script type="application/json">
        {
            "code": "",
            "pinyin": "",
            "city": ""
        }
    </script>
</mip-data>
<p class="selected-p">
    城市代号：<span m-text="code" class="selected-text"></span>，
    城市拼音：<span m-text="pinyin" class="selected-text"></span>，
    城市中文：<span m-text="city" class="selected-text"></span>
</p>

<mip-group-selection class="mip-hidden">
    <script type="application/json">
    {
        "list": [{
            "key": "热门",
            "cities": [
                { "city": "北京", "pinyin": "beijing", "code": "1" },
                { "city": "上海", "pinyin": "shanghai", "code": "2" },
                { "city": "广州", "pinyin": "guangzhou", "code": "3" },
                { "city": "深圳", "pinyin": "shenzhen", "code": "4" },
                { "city": "重庆", "pinyin": "chongqing", "code": "5" }
            ]
        }, {
            "key": "A",
            "cities": [
                { "city": "澳门", "pinyin": "aomen", "code": "7" },
                { "city": "安庆", "pinyin": "anqing", "code": "8" },
                { "city": "安泽", "pinyin": "anze", "code": "9" }
            ]
        }, {
            "key": "B",
            "cities": [
                { "city": "宝清", "pinyin": "baoqing", "code": "10" },
                { "city": "宝鸡", "pinyin": "baoji", "code": "11" },
                { "city": "巴东", "pinyin": "badong", "code": "12" }
            ]
        }, {
            "key": "C",
            "cities": [
                { "city": "重庆", "pinyin": "chongqing", "code": "13" },
                { "city": "成都", "pinyin": "chengdu", "code": "14" },
                { "city": "苍山", "pinyin": "cangshan", "code": "15" }
            ]
        }, {
            "key": "D",
            "cities": [
                { "city": "大庆", "pinyin": "daqing", "code": "16" },
                { "city": "大理", "pinyin": "dali", "code": "17" },
                { "city": "东莞", "pinyin": "dongguan", "code": "18" }
            ]
        }, {
            "key": "E",
            "cities": [
                { "city": "鄂尔多斯", "pinyin": "eerduosi", "code": "19" },
                { "city": "峨眉山", "pinyin": "emeishan", "code": "20" }
            ]
        }, {
            "key": "F",
            "cities": [
                { "city": "阜阳", "pinyin": "fuyang", "code": "21" },
                { "city": "福州", "pinyin": "fuzhou", "code": "22" },
                { "city": "防城港", "pinyin": "fangchenggang", "code": "23" }
            ]
        }, {
            "key": "G",
            "cities": [
                { "city": "广州", "pinyin": "guangzhou", "code": "24" },
                { "city": "贵阳", "pinyin": "guiyang", "code": "25" }
            ]
        }]
    }
    </script>
    <div class="mip-group-selection-wrapper">
        <template type="mip-mustache">
            <div class="mip-group-selection-content">
                {{#list}}
                <div class="mip-group-selection-group mip-group-selection-part-letter">
                    <div class="mip-group-selection-title" data-anchor="{{key}}">{{key}}</div>
                    {{#cities}}
                    <div class="mip-group-selection-item" data-code="{{code}}" data-pinyin="{{pinyin}}">{{city}}</div>
                    {{/cities}}
                </div>
                {{/list}}
            </div>
            <mip-fixed class="mip-group-selection-sidebar-wrapper">
                <div class="mip-group-selection-sidebar">
                    {{#list}}
                    <a class="mip-group-selection-link" data-target-anchor="{{key}}">{{key}}</a>
                    {{/list}}
                </div>
            </mip-fixed>
        </template>
    </div>
</mip-group-selection>
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
<!--侧边栏布局依赖mip-fixed组件提供样式-->
<script src="https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js"></script>
<!--数据绑定组件-->
<script src="https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js"></script>
```

### 配合事件绑定
当用户选择某个元素时，分组选择组件会抛出名为 `selected` 的事件(event)，使用组件[事件通信机制](https://www.mipengine.org/doc/3-widget/6-help/3-mip-normal.html)可以监听这个事件，并与其他组件/数据交互（action）。

如下方示例，当分组选择组件`mip-group-selection`中`selected`事件(event)被触发时，调用 id 为`mygototop01`组件的`gototop`作为响应（action）。

```html
<mip-group-selection
	class="mip-hidden"
	on="selected:mygototop01.gototop"
	>
	<!--内容略-->
</mip-group-selection>

<mip-fixed type="gototop">
    <mip-gototop id="mygototop01"></mip-gototop>
</mip-fixed>
```

## 属性说明
### data-src
说明：用于指向远程数据地址，异步加载并渲染。指明`data-src`后，配置在`<script type="application/json">`本地的数据不再生效。
使用限制：异步加载数据属于前后端交互请求。由于 MIP-Cache 为 HTTPs 环境，`data-src` 要求支持 HTTPs.


## 注意事项
- mip-group-selection 分组选择组件依赖`mip-fixed`，`mip-mustache`，必须引用对应的 javascript 脚本。