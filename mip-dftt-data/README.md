# mip-dftt-data

mip-dftt-data 加载东方头条数据到指定容器，也可以上拉刷新、下拉加载

标题|内容
----|----
类型|业务
支持布局|responsive,container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-dftt-data/mip-dftt-data.js

## 示例
```html
<header>
        <mip-fixed type="top">
            <mip-vd-tabs allow-scroll>
                <section id="J_top_menu" class="top-menu-list">
                    <li data-type="toutiao">
                        <mip-dftt-data data-type="toutiao">
                            <span>
                                头条
                            </span>
                        </mip-dftt-data>
                    </li>
                    <li data-type="yule">
                        <mip-dftt-data data-type="yule">
                            <span>
                                娱乐
                            </span>
                        </mip-dftt-data>
                    </li>
                    <li data-type="weikandian">
                        <mip-dftt-data data-type="weikandian">
                            <span>
                                滚动
                            </span>
                        </mip-dftt-data>
                    </li>
                    <li data-type="shehui">
                        <mip-dftt-data data-type="shehui">
                            <span>
                                社会
                            </span>
                        </mip-dftt-data>
                    </li>
                    <li data-type="guonei">
                        <mip-dftt-data data-type="guonei">
                            <span>
                                国内
                            </span>
                        </mip-dftt-data>
                    </li>
                    <li data-type="guoji">
                        <mip-dftt-data data-type="guoji" >
                            <span>
                                国际
                            </span>
                        </mip-dftt-data>
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

## 注意事项
数据仅为测试数据，使用需谨慎。
页面中必须有"<div id="J_content" class="news-list"><div id="J_news_list" class="news-list-wrap"></div></div>"，它是加载内容的容器。

