# mip-cncrk-dropload

mip-cncrk-dropload 用来支持页面下拉加载

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-cncrk-dropload/mip-cncrk-dropload.js

#http://www.99down.com/index.php?m=content&c=index&a=mip_json&siteid=1&modelid=12&pagesize=20&id=1390&catid=160&page=10
#http://www.99down.com/index.php?m=content&amp;c=index&amp;a=mip_json&amp;siteid=1&amp;modelid=12&amp;pagesize=20&amp;id=1390&amp;catid=160&amp;page=10
#http://m.cncrk.com/mip/dropdown.asp?m=content&amp;c=index&amp;a=mip_json&amp;siteid=1&amp;modelid=12&amp;pagesize=20&amp;id=1390&amp;catid=160
## 示例

```html
<mip-cncrk-dropload mip-dropload-params="{'url':'http://m.cncrk.com/mip/dropdown.asp?m=content&amp;c=index&amp;a=mip_json&amp;siteid=1&amp;modelid=12&amp;pagesize=20&amp;id=1390&amp;catid=160', 'isclick':true}" class="mip-element mip-layout-container">
<section id="moreList" class="list">
    <p class="bt"><b>相关下载</b></p>
		<ul>
			<li><a href="http://m.99down.com/android/1584.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0308/20170308040553310.jpg" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://www.99down.com/uploadfile/2017/0308/20170308040553310.jpg"></mip-img></a><p><a href="http://m.99down.com/android/1584.html" target="_blank">千帆直播</a><em class="lstar5"></em><span>影音图像<u>38.3 MB</u></span></p><a href="http://m.99down.com/android/1584.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	    </ul>
	<p class="button-footer"><span class="getMore" data-modelid="{$modelid]" data-id="1390" data-catid="160">上拉或点击查看更多...</span></p>
</section>
</mip-cncrk-dropload>
```
## 属性

### mip-dropload-params

说明：ajax请求参数
必选项：是   
类型：数组格式的字符串   
取值范围：请求url（包含数据）， iscroll是否需要滚动加载（Boolean）  
单位：无   
默认值：无   

