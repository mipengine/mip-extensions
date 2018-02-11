# mip-xem-dropdowns

mip-xem-dropdowns 自用dropdowns组件。

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xem-dropdowns/mip-xem-dropdowns.js

## 示例

### 基本使用
```html
<mip-xem-dropdowns>
	<ul class="nav nav-pills nav-justified">
		<li role="presentation" class="dropdown active"> <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false" target="_blank"> 一级菜单 <span class="caret"></span> </a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="#" target="_blank">二级菜单</a></li>
				<li><a href="#" target="_blank">二级菜单</a></li>
				<li><a href="#" target="_blank">二级菜单</a></li>
				<li><a href="#" target="_blank">二级菜单</a></li>
			</ul>
		</li>
		<li role="presentation" class="dropdown"> <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false" target="_blank"> 一级菜单 <span class="caret"></span> </a>
			<ul class="dropdown-menu" role="menu">
				<li><a href="#" target="_blank">二级菜单</a></li>
				<li><a href="#" target="_blank">二级菜单</a></li>
				<li><a href="#" target="_blank">二级菜单</a></li>
				<li><a href="#" target="_blank">二级菜单</a></li>
			</ul>
		</li>
	</ul>
</mip-xem-dropdowns>
```
