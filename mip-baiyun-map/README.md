# mip-baiyun-map

mip-baiyun-map 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/mip-baiyun-map/{版本号}/mip-baiyun-map.js

## 示例

### 基本用法
```html
<mip-baiyun-map data-x="116.404" data-y="39.915" data-zoom="16" data-way="1" data-ak="密钥">
	<div id="allmap" class="map"><!-- 必须 --></div>
	<div id="way" class="way">
		<div id="tip" class="tip">
			<button data-id="1" class="cur">公交</button>
			<button data-id="2" class="">驾车</button>
		</div>
		<div id="con" class="con">
			<span id="l-fail" class="fail">未找到，请输入起点详细地址（城市街名号）</span>
			<div>
				起点：<input type="text" id="l-start" name="l-start" value="">
			</div>
			<div>
				终点：<input type="text" id="l-end" name="l-end" value="">
			</div>
			<div id="l-result"><!-- 公交路线必须 --></div>
			<button id="l-confirm" class="l-confirm">确定</button>
		</div>
	</div>
</mip-baiyun-map>
```

## 属性 

### data-x

说明：地图需要标注的位置的经度  
必选项：是  
类型：string  

### data-y

说明：地图需要标注的位置的纬度  
必选项：是  
类型：string  

### data-zoom

说明：地图初始化显示的比例  
必选项：否  
类型：string  
默认值：16  

### data-way

说明：地图公交驾车线路查询，如果为1的时候必须保留way的文档结构  
必选项：否  
类型：string  
默认值：0  

### data-ak

说明：密钥  
必选项：是  

### data-id

说明：地图线路查询方式  
必选项：是  


## 注意事项
  
- ID: allmap 地图容器ID必须唯一  
- ID: l-result 公交路线ID必须唯一  
- 元素结构固定  
  
![](https://cloud.githubusercontent.com/assets/13213114/22011830/f882e586-dccb-11e6-9f05-657f88cd925f.gif)