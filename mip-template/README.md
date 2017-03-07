# mip-template

mip-template 前端模板，异步加载数据渲染页面

标题|内容
----|----
类型|通用
支持布局|responsive,container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-template/mip-template.js

## 示例


```
	<mip-template src="http://cre.dp.sina.cn/api/v3/get?wap_force=1&cateid=sina_all&dedup=32&merge=3&statics=1&this_page=1&rfunc=105&cre=weibofsx&mod=r&length=17&pageurl=http%3A%2F%2Fent.sina.com.cn%2Fm%2Fc%2F2016-12-06%2Fdoc-ifxyiayq2530999.shtml&_=1481527600292" jsonp=true css-href="http://mjs.sinaimg.cn/wap/h5/cms/feed/channel_feed/201605051130/css/style.min.css">
		<div class="recommend_template" style="display:none">  
			<a soda-repeat="item in data"  href="{{item.url}}">  
				<dl soda-if="{{item.mthumbs.length <= 1}}" class="carditems_list">  
					<dt class="carditems_list_dt" data-src="{{item.surl}}" data-lazy-uid={{item.uuid}}>  
						<template-mip-img src={{item.thumb}} layout="responsive" height="60" width="80"></template-mip-img>
					</dt>  
					<dd class="carditems_list_dd">  
						<h3 class="carditems_list_h3">{{item.title}}</h3>  
						<h4 class="carditems_list_h4">{{item.short_intro}}</h4>  
						<p soda-if="{{item.comment_count != 0}}" class="carditems_list_opright">			
							<span class="op_ico num_ico fr">{{item.comment_count}}</span>		
						</p>
					</dd>  
				</dl>  
				<dl soda-if="{{item.mthumbs.length > 1}}" class="carditems_list" data-imgdelay="1">
					<dd class="carditems_list_dd"><h3 class="carditems_list_h3">{{item.title}}</h3>
						<ul class="carditems_list_pics">
							<li soda-repeat="ele in item.mthumbs" >  
								<span><template-mip-img src="{{ele}}" data-src="{{ele}}" alt="{{item.title}}"  layout="fixed" height="70" width="94"></template-mip-img></span>  
							</li>
						</ul>
						<p soda-if="{{item.comment_count != 0}}" class="carditems_list_op"><span class="op_ico num_ico fr">{{item.comment_count}}</span></p>  
					</dd>
				</dl>				
			</a>  
		</div>
		<div class="recommend_container">

		</div>
	</mip-template>
```

## 属性

### src

说明：数据源url  
必选项：是  
类型：string  
默认值：''  

### jsonp

说明：是否跨域  
必选项：否  
类型：boolean  
默认值：false  

### css-href

说明：css文件url  
必选项：否  
类型：string  
默认值：''

### 模板容器 div class="recommend_template" style="display:none"

说明：模板容器，模板必须写在 ".recommend_template" 结构中，display:none防止闪烁
必选项：是  
类型：HTML  
默认值：'' 

### 显示容器 div class="recommend_container" 

说明：显示容器  必须写在".recommend_container"结构中
必选项：是  
类型：HTML  
默认值：'' 

## 注意事项

1. 与后端接口默认res.status.code == 0表示响应成功， 响应的全部元素传递给前端模板
2. 前端模板使用了SodaRender https://github.com/AlloyTeam/SodaRender ，使用方法可对其进行参考，在soda-if上做了修改，使之能支持表达式