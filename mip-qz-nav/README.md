# mip-qz-nav

前瞻网页面导航组件

描述|前瞻网页面导航组件
----|----
类型|定制,业务
支持布局| container
所需脚本|https://mipcache.bdstatic.com/static/latest/mip-qz-nav.js

## 示例

### 基本用法
```html
<mip-qz-nav class="nav-wrap" rawurl="/">
	<p class="nav-tit">选择栏目</p>
	<nav class="nav">
		<ul class="clf" style="width:2000px;position:relative;">
			<li class="cur"><a href="/">首页</a></li>
			<li><a href="/t/kuaixun/">快讯</a></li>
			<li><a href="/t/fengkou/">风口</a></li>                                
			<li><a href="/t/daka/">大咖</a></li>
			<li><a href="http://qiye.qianzhan.com/show" target="_blank">企业说</a></li>
			<li><a href="/report/" class="orange">研究</a></li>                
			<li><a href="/t/">科技</a></li>
			<li><a href="/huodong/">活动</a></li>
			<li><a href="/military/">看点</a></li>
			<li><a href="/ent/">娱乐</a></li>
			<li><a href="/survey/">调查</a></li>
			<li><a href="/analyst/">经济学人</a></li>                
			<li><a href="/health/">健康</a></li>
			<li><a href="/photo/">图片</a></li>
			<li><a href="/news/audiolist/">音频</a></li>
			<li><a href="/xdata/">数据库</a></li>
			<li><a href="/ent/stars/">明星库</a></li>
			<li><a href="/ent/movies/">电影库</a></li>
			<li><a href="/meeting/exhlist/">展会库</a></li>
			<li><a href="/weibao/">小镇微报</a></li>
		</ul>
		<div class="sel"><i class="i-tarrow1 icon"></i></div>
	</nav>
	<div class="close"><i class="i-close icon"></i></div>
	<div class="sel2"><i class="i-darrow icon"></i></div>
</mip-qz-nav>
```

## 属性

### rawurl
说明：当前页面的rawurl 如果rawurl包含li a的href属性 li添加class="cur"
必填：是
格式：字符
取值：字符串
默认值："/"



