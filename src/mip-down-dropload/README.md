# mip-down-dropload

mip-down-dropload 用来支持页面下拉加载

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-down-dropload/mip-down-dropload.js

## 示例

```html
<mip-down-dropload mip-dropload-params="{'url':'http://www.******.com/ajax.asp?action=29&siteid=1&type=1&row=20&id={$id}&cid={$catalogid}', 'isclick':iscroll}">
<section id="moreList" class="list">
    <p class="bt"><b>相关下载</b></p>
        <ul>
		<li><a href="http://m.pc6.com/s/78938" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2015-6/201561711238_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://thumb.jfcdns.com/thumb/up/2015-6/201561711238_100_100.png"></mip-img></a><p><a href="http://m.pc6.com/s/78938" target="_blank">魔与道ol</a><em class="lstar3"></em><span>卡牌游戏<u>21.3M</u>v4.00.01</span></p><a href="http://m.pc6.com/s/78938" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
		<li><a href="http://m.pc6.com/s/151631" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2016-10/201610121412216637546_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://thumb.jfcdns.com/thumb/up/2016-10/201610121412216637546_100_100.png"></mip-img></a><p><a href="http://m.pc6.com/s/151631" target="_blank">道友请留步手游</a><em class="lstar4"></em><span>卡牌游戏<u>138.6M</u>v0.985.1009</span></p><a href="http://m.pc6.com/s/151631" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
		<li><a href="http://m.pc6.com/s/282567" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2016-5/2016516102412_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://thumb.jfcdns.com/thumb/up/2016-5/2016516102412_100_100.png"></mip-img></a><p><a href="http://m.pc6.com/s/282567" target="_blank">小冰冰传奇</a><em class="lstar4"></em><span>卡牌游戏<u>273.3M</u>v5.0.002</span></p><a href="http://m.pc6.com/s/282567" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
		<li><a href="http://m.pc6.com/s/183523" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2016-4/201646195633_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://thumb.jfcdns.com/thumb/up/2016-4/201646195633_100_100.png"></mip-img></a><p><a href="http://m.pc6.com/s/183523" target="_blank">东方不败手游</a><em class="lstar4"></em><span>卡牌游戏<u>429.8M</u>v1.0.6</span></p><a href="http://m.pc6.com/s/183523" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
		<li><a href="http://m.pc6.com/s/86200" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2016-1/2016120183835_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://thumb.jfcdns.com/thumb/up/2016-1/2016120183835_100_100.png"></mip-img></a><p><a href="http://m.pc6.com/s/86200" target="_blank">我叫MT Online</a><em class="lstar6"></em><span>卡牌游戏<u>117.6M</u>v6.1.0.0</span></p><a href="http://m.pc6.com/s/86200" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
		<li><a href="http://m.pc6.com/s/100704" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2015-10/20151030143717_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" style="width: 60px; height: 60px;"><img class="mip-fill-content mip-replaced-content" src="http://thumb.jfcdns.com/thumb/up/2015-10/20151030143717_100_100.png"></mip-img></a><p><a href="http://m.pc6.com/s/100704" target="_blank">我是火影</a><em class="lstar5"></em><span>卡牌游戏<u>97.7M</u>v4.0</span></p><a href="http://m.pc6.com/s/100704" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
		<li><a href="http://m.pc6.com/s/118667" class="img" target="_blank"><mip-img src="http://thumb.jfcdns.com/thumb/up/2015-2/2015219222339_100_100.png" width="60" height="60" class="mip-element mip-layout-fixed mip-layout-size-defined" style="width: 60px; height: 60px;"></mip-img></a><p><a href="http://m.pc6.com/s/118667" target="_blank">变形金刚崛起</a><em class="lstar5"></em><span>卡牌游戏<u>131.1M</u>v1.3.0</span></p><a href="http://m.pc6.com/s/118667" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
    </ul>
	<p class="button-footer"><span id="getMore" data-type="1" data-id="109066" data-cid="696">上拉或点击查看更多...</span></p>
</section>
</mip-down-dropload>
```
## 属性

### mip-dropload-params

说明：ajax请求参数
必选项：是   
类型：数组格式的字符串   
取值范围：请求url（包含数据）， iscroll是否需要滚动加载（Boolean）  
单位：无   
默认值：无   