# mip-qqtn-tags

mip-qqtn-tags 用来支持下载详情页显示tags内容

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/mip-qqtn-tags/v1/mip-qqtn-tags.js

## 示例

### 基本用法
```html
<mip-qqtn-tags>
<div class="g-tags-box">
	<strong>其它版本</strong>    
    <ul class="m-tags-android">        
    	<li data-system="Android" data-id="341844"><a href="/x/341844"><i></i><p>权力与荣耀手游v1.0.4</p><b>下载</b></a></li>
    </ul>
    <ul class="m-tags-ios">        
    	<li data-system="苹果iOS" data-id="353983"><a href="/x/353983"><i></i><p>权力与荣耀手游ios版v1.0iPhone版</p><b>下载</b></a></li>
    </ul>
</div>
</mip-qqtn-tags>
```