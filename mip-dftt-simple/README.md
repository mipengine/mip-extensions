# mip-dftt-simple

mip-dftt-simple 加载东方头条数据到指定容器，也可以上拉刷新、下拉加载

标题|内容
----|----
类型|业务
支持布局|responsive,container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-dftt-simple/mip-dftt-simple.js

## 示例
```html
<header>
        <mip-fixed type="top">
            <mip-vd-tabs allow-scroll>
                <section id="J_top_menu" class="top-menu-list" data-param='{"urls":{"refreshUrl":"http://123.59.62.164/toutiao_h5/RefreshJP","pullDownUrl":"http://123.59.62.164/toutiao_h5/pulldown","pullUpUrl":"http://123.59.62.164/toutiao_h5/NextJP","vrefreshUrl": "https://toutiao.eastday.com/toutiao_h5/videopool","vpullDownUrl": "https://toutiao.eastday.com/toutiao_h5/videopool","vpullUpUrl": "https://toutiao.eastday.com/toutiao_h5/videopool", "prefreshUrl": "https://toutiao.eastday.com/toutiao_h5/picnewspool","ppullUpUrl": "https://toutiao.eastday.com/toutiao_h5/picnewspool","ppullDownUrl": "https://toutiao.eastday.com/toutiao_h5/picnewspool","bannerUrl":"https://softwords.dftoutiao.com/partner/banner","dspUrl":"http://123.59.62.164/partner/list"},"params":{"newsType":"toutiao","vnewsType":"vtuijian","pnewsType":"pbolan"}}'>
                    <li data-type="toutiao">
                        <mip-dftt-simple data-type="toutiao">
                            <span>
                                头条
                            </span>
                        </mip-dftt-simple>
                    </li>
                    <li data-type="shipin">
                        <mip-dftt-simple data-type="shipin">
                            <span>
                                视频
                            </span>
                        </mip-dftt-simple>
                    </li>
                    <li data-type="weikandian">
                        <mip-dftt-simple data-type="weikandian">
                            <span>
                                滚动
                            </span>
                        </mip-dftt-simple>
                    </li>
                    <li data-type="tupian">
                        <mip-dftt-simple data-type="tupian">
                            <span>
                                图片
                            </span>
                        </mip-dftt-simple>
                    </li>
                    <li data-type="guonei">
                        <mip-dftt-simple data-type="guonei">
                            <span>
                                国内
                            </span>
                        </mip-dftt-simple>
                    </li>
                    <li data-type="guoji">
                        <mip-dftt-simple data-type="guoji" >
                            <span>
                                国际
                            </span>
                        </mip-dftt-simple>
                    </li>
                </section>
            </mip-vd-tabs>
        </mip-fixed>
    </header>
    <div id="J_content" class="news-list">
        <div id="J_news_list" class="news-list-wrap">
        </div>
        <div id="J_loading" class="loading">
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
            <p class="txt">数据加载中</p>
        </div>
    </div>
```

## 属性

### data-type
说明：此异步加载所需要的参数 新闻类型  
必选项：是   
类型：字符串   
取值范围："toutiao","yule","weikandian",...
单位：无   
默认值：无 

### data-param
说明：传递给组件接口地址和一些自定义的接口参数，分为urls和params两个小对象。urls传递接口地址，params传递可以自定义的接口参数
必选项：是   
类型：字符串
设置参考：
{
  "urls": {
    "refreshUrl": "http://123.59.62.164/toutiao_h5/RefreshJP",
    "pullDownUrl": "http://123.59.62.164/toutiao_h5/pulldown",
    "pullUpUrl": "http://123.59.62.164/toutiao_h5/NextJP",
    "vrefreshUrl": "https://toutiao.eastday.com/toutiao_h5/videopool",
    "vpullDownUrl": "https://toutiao.eastday.com/toutiao_h5/videopool",
    "vpullUpUrl": "https://toutiao.eastday.com/toutiao_h5/videopool", 
    "prefreshUrl": "https://toutiao.eastday.com/toutiao_h5/picnewspool",  
    "ppullUpUrl": "https://toutiao.eastday.com/toutiao_h5/picnewspool", 
    "ppullDownUrl": "https://toutiao.eastday.com/toutiao_h5/picnewspool",
    "bannerUrl": "https://softwords.dftoutiao.com/partner/banner",
  },
  "params": {
    "newsType": "toutiao",
    "vnewsType": "vtuijian",
    "pnewsType": "pbolan"
  }
}
#### urls
必选项：是   
类型：对象
参数说明：
refreshUrl：必填。刷新数据接口
pullUpUrl：必填。上拉加载
pullDownUrl：必填。下拉加载
vrefreshUrl：视频频道刷新接口
vpullDownUrl：视频频道下拉接口
vpullUpUrl：视频频道上拉接口
prefreshUrl：图片频道刷新接口
ppullDownUrl：图片频道下拉接口
ppullUpUrl：图片频道上拉接口
bannerUrl：必填。banner广告接口
#### params
必选项：是   
类型：对象
参数说明：
newsType：必填。默认新闻类别
vnewsType：必填。
pnewsType：必填。

## 注意事项
1.页面中必须有"<div id="J_content" class="news-list"><div id="J_news_list" class="news-list-wrap"></div></div>"，它是加载内容的容器。
2.页面中必须有id为J_top_menu的元素。接口链接，一些参数设置在此元素的data-param属性上

