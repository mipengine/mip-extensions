# mip-99down-dropload

mip-99down-dropload 用来支持页面下拉加载

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-99down-dropload/mip-99down-dropload.js

## 示例

```html
<mip-99down-dropload mip-dropload-params="{'url':'http://www.******.com/index.php?siteid=1&modelid={$modelid}&pagesize=20&id={$id}&catid={$catid}', 'isclick':iscroll}">
<section id="moreList" class="list">
    <p class="bt"><b>相关下载</b></p>
        <ul>
		<li><a href="http://m.99down.com/android/1579.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0308/20170308021951618.jpg" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1579.html" target="_blank">画吧</a><em class="lstar5"></em><span>社交聊天<u>16 MB</u></span></p><a href="http://m.99down.com/android/1579.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/421.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2016/0614/20160614041320748.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/421.html" target="_blank">斗鱼tv</a><em class="lstar5"></em><span>社交聊天<u>59.4 MB</u></span></p><a href="http://m.99down.com/android/421.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1559.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0307/20170307051847871.jpg" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1559.html" target="_blank">秀觅</a><em class="lstar5"></em><span>社交聊天<u>21.3 MB</u></span></p><a href="http://m.99down.com/android/1559.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1550.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0307/20170307112940108.jpg" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1550.html" target="_blank">遇见</a><em class="lstar5"></em><span>社交聊天<u>21.5 MB</u></span></p><a href="http://m.99down.com/android/1550.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/890.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0306/20170306093040103.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/890.html" target="_blank">微信多开助手</a><em class="lstar5"></em><span>社交聊天<u>6.52 MB</u></span></p><a href="http://m.99down.com/android/890.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1278.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0223/20170223090004306.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1278.html" target="_blank">Snapcha阅后即焚</a><em class="lstar5"></em><span>社交聊天<u>72.8 MB</u></span></p><a href="http://m.99down.com/android/1278.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1487.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0303/20170303112243596.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1487.html" target="_blank">微信电话本</a><em class="lstar5"></em><span>社交聊天<u>14.5 MB</u></span></p><a href="http://m.99down.com/android/1487.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1484.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0303/20170303105907900.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1484.html" target="_blank">校园聊吧</a><em class="lstar5"></em><span>社交聊天<u>12 MB</u></span></p><a href="http://m.99down.com/android/1484.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1480.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0303/20170303100405974.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1480.html" target="_blank">假装情侣</a><em class="lstar5"></em><span>社交聊天<u>25.4 MB</u></span></p><a href="http://m.99down.com/android/1480.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1450.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0302/20170302093223306.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1450.html" target="_blank">久伴</a><em class="lstar5"></em><span>社交聊天<u>13.8 MB</u></span></p><a href="http://m.99down.com/android/1450.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1444.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0301/20170301042537781.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1444.html" target="_blank">阿里通电话</a><em class="lstar5"></em><span>社交聊天<u>9.12 MB</u></span></p><a href="http://m.99down.com/android/1444.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1437.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0301/20170301015351832.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1437.html" target="_blank">抱抱</a><em class="lstar5"></em><span>社交聊天<u>43.6 MB</u></span></p><a href="http://m.99down.com/android/1437.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/420.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2016/0614/20160614040711491.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/420.html" target="_blank">触宝电话</a><em class="lstar5"></em><span>社交聊天<u>20.5 MB</u></span></p><a href="http://m.99down.com/android/420.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1413.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0228/20170228031717285.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1413.html" target="_blank">云高高尔夫</a><em class="lstar5"></em><span>社交聊天<u>25.4 MB</u></span></p><a href="http://m.99down.com/android/1413.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1406.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0228/20170228014611374.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1406.html" target="_blank">纹身大咖</a><em class="lstar5"></em><span>社交聊天<u>20.3 MB</u></span></p><a href="http://m.99down.com/android/1406.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/866.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2016/1115/20161115015854830.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/866.html" target="_blank">腾讯TIM</a><em class="lstar5"></em><span>社交聊天<u>47.3 MB</u></span></p><a href="http://m.99down.com/android/866.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1378.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0227/20170227032628348.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1378.html" target="_blank">乐视社区</a><em class="lstar5"></em><span>社交聊天<u>28.4 MB</u></span></p><a href="http://m.99down.com/android/1378.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1254.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0222/20170222111017601.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1254.html" target="_blank">连我Line</a><em class="lstar5"></em><span>社交聊天<u>43.9 MB</u></span></p><a href="http://m.99down.com/android/1254.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/1359.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2017/0227/20170227093122171.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/1359.html" target="_blank">女性私语</a><em class="lstar5"></em><span>社交聊天<u>14.8 MB</u></span></p><a href="http://m.99down.com/android/1359.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
	            <li><a href="http://m.99down.com/android/797.html" class="img" target="_blank"><mip-img src="http://www.99down.com/uploadfile/2016/1102/20161102010734669.png" width="60" height="60"></mip-img></a><p><a href="http://m.99down.com/android/797.html" target="_blank">贝聊</a><em class="lstar5"></em><span>社交聊天<u>13.3 MB</u></span></p><a href="http://m.99down.com/android/797.html" class="btn" target="_blank"><em class="bg"></em>下载</a></li>
    </ul>
	<p class="button-footer"><span id="getMore" data-modelid="1" data-id="109066" data-catid="696">上拉或点击查看更多...</span></p>
</section>
</mip-99down-dropload>
```
## 属性

### mip-dropload-params

说明：ajax请求参数
必选项：是   
类型：数组格式的字符串   
取值范围：请求url（包含数据）， iscroll是否需要滚动加载（Boolean）  
单位：无   
默认值：无   
