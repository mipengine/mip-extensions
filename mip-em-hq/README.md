# mip-em-hq

mip-em-hq 东方财富行情单页组件

标题|东方财富行情单页组件
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-em-hq/mip-em-hq.js

示例
----
```html
    <mip-em-hq>
        <div id="share_wx_bg"></div>
        <div id="share_wx_div">
            <div id="share_wx_msg">
                <div class="share_wx_sj">
                    <div class="i1">◆</div>
                </div>
                <div class="share_wx_txt">
                    请点击右上角&nbsp;<span>···</span>&nbsp;图标，分享行情给您的好友
                </div>
                <div class="share_wx_close"></div>
            </div>
        </div>
        <div class="phone-top">
            <header id="commonHead">
                <div id="slideHeader" class="slideRight">

                    <a target="_blank" href="http://stattg.eastmoney.com/10095">
                        <div class="header_center">

                            <p class="word_big word">东方财富网手机版</p>

                        </div>
                    </a>
                    <div class="header_right">

                    </div>
                </div>
            </header>
        </div>

        <div class="phone-wrapper" id="phone-wrapper">
            <div class="quote_nav">
                <a href="http://wap.eastmoney.com/3g/center/default.shtml" class="quote_center" target="_blank">行情中心</a>
                <a href="http://m2.quote.eastmoney.com/MStock/GoToFavor" target="_blank"> 自选股</a>|
                <a href="http://m.1234567.com.cn/m/fund/favor.shtml#1" target="_blank">自选基金</a>|
                <a href="http://wap.eastmoney.com/3g/zjlx/"
                    target="_blank">资金流向</a>
            </div>
            <div id="s_stock_content" class="s_stock_content">
                <div class="content_top">
                    <div class="s_stock_name"><span class="name">东方财富(300059)</span><span id="stock_status" class="font_red"></span></div>
                    <span class="s_stock_setting btnRef">刷 新</span>
                </div>
                <div class="content_infos">
                    <table id="s_stock_table1" class="s_stock_table" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                            <td id="xj_box"><span class="xj">-</span></td>
                            <td>高:<span class="zgj">-</span></td>
                            <td>开:<span class="jkj">-</span></td>
                            <td>量:<span class="cjl">-</span></td>
                        </tr>
                        <tr>
                            <td id="zd_box"><span class="zdf">-</span>　<span class="zde">-</span></td>
                            <td>低:<span class="zdj">-</span></td>
                            <td>换:<span class="hsl">-</span></td>
                            <td>额:<span class="cje">-</span></td>
                        </tr>
                    </table>
                </div>
                <table id="pic_plans_box" class="stock_nav_bar_table" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td id="tab-0" target="emchart-0" class="hover"><span tab="Timeplan">分时</span></td>
                        <td id="tab-1" target="emchart-1"><span tab="DailyK">日K</span></td>
                        <td id="tab-2" target="emchart-2"><span tab="WeekK">周K</span></td>
                        <td id="tab-3" target="emchart-3"><span tab="MonthK">月K</span></td>
                    </tr>
                </table>
                <div class="content_canvas more" id="wdmxContainer">
                    <div class="canvas-name"><span class="name">东方财富(300059)</span></div>
                    <div class="emchart">
                        <div id="emchart-0" class="em-tab">
                        </div>
                        <div id="emchart-1" class="em-tab">
                        </div>
                        <div id="emchart-2" class="em-tab">
                        </div>
                        <div id="emchart-3" class="em-tab">
                        </div>
                    </div>
                </div>

            </div>

            <div id="s_stock_content_more" class="s_stock_content_more">
                <table id="stock_infos_nav" class="stock_nav_bar_table" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td><span tab="">盘口</span></td>
                    </tr>
                </table>
                <div class="stock_more_infos">
                    <ul id="stock_infos_list" class="stock_infos_list">
                        <li class="on">
                            <div class="infos_list_1">
                                <div class="s_infos_bar">行情报价</div>
                                <table class="hqbj_data" cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <th>最新：</th>
                                        <td class="xj">-</td>
                                        <th>涨幅：</th>
                                        <td class="zdf">-</td>
                                    </tr>
                                    <tr>
                                        <th>涨跌：</th>
                                        <td class="zde">-</td>
                                        <th>换手：</th>
                                        <td class="hsl">-</td>
                                    </tr>
                                    <tr>
                                        <th>最高：</th>
                                        <td class="zgj">-</td>
                                        <th>最低：</th>
                                        <td class="zdj">-</td>
                                    </tr>
                                    <tr>
                                        <th>成交量：</th>
                                        <td class="cjl_1">-</td>
                                        <th>成交额：</th>
                                        <td class="cje_1">-</td>
                                    </tr>
                                    <tr>
                                        <th>涨停：</th>
                                        <td class="ztj font_red">-</td>
                                        <th>跌停：</th>
                                        <td class="dtj font_green">-</td>
                                    </tr>
                                    <tr>
                                        <th>昨收：</th>
                                        <td class="zsj">-</td>
                                        <th>现手：</th>
                                        <td class="xs">-</td>
                                    </tr>
                                    <tr>
                                        <th>外盘：</th>
                                        <td class="wp font_red">-</td>
                                        <th>内盘：</th>
                                        <td class="np font_green">-</td>
                                    </tr>
                                    <tr>
                                        <th>量比：</th>
                                        <td class="lb">-</td>
                                        <th>收益<span class="mgsysj"></span>：</th>
                                        <td class="mgsy">-</td>
                                    </tr>
                                    <tr>
                                        <th>市盈(动)：</th>
                                        <td class="syl">-</td>
                                        <th>市盈(静)：</th>
                                        <td class="sylj">-</td>
                                    </tr>
                                    <tr>
                                        <th>净资产：</th>
                                        <td class="jzc">-</td>
                                        <th>市净率：</th>
                                        <td class="sjl">-</td>
                                    </tr>
                                    <tr>
                                        <th>总股本：</th>
                                        <td class="zgb">-</td>
                                        <th>总市值：</th>
                                        <td class="zsz">-</td>
                                    </tr>
                                    <tr>
                                        <th>流通股本：</th>
                                        <td class="ltgb">-</td>
                                        <th>流通市值：</th>
                                        <td class="ltsz">-</td>
                                    </tr>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="live-upload" id="live-upload">
            </div>
            <table id="fixedTable" class="stock_nav_bar_table" cellpadding="0" cellspacing="0" border="0">
                <tr></tr>
            </table>
            <footer>
                <div class="phone-link">
                    <nav>
                        <ul class="navitems">
                            <li><a href="http://wap.eastmoney.com//3g/channel/Finance.shtml" target="_blank">财经</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Stock.shtml" target="_blank">股票</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Market.shtml" target="_blank">行情</a></li>
                            <li><a href="http://m.1234567.com.cn/3g/channel/fund.shtml" target="_blank">基金</a></li>
                            <li><a href="http://m.guba.eastmoney.com/" target="_blank">股吧</a></li>
                            <li><a href="http://wap.eastmoney.com//ScrollNews.aspx" target="_blank">滚动</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/NewStock.shtml" target="_blank">新股</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Global.shtml" target="_blank">全球</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/HongGong.shtml" target="_blank">港股</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Gold.shtml" target="_blank">黄金</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Futures.shtml" target="_blank">期货</a></li>
                            <li class="gd">更多<b class="arrows_rb"></b></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Forex.shtml" target="_blank">外汇</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Money.shtml" target="_blank">理财</a></li>
                            <li><a href="http://wap.eastmoney.com//3g/channel/Blog.shtml" target="_blank">博客</a></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li class="sq">收起<b class="arrows_rt"></b></li>
                        </ul>
                    </nav>
                </div>
                <ul class="foo clearfix">
                    <li><a href="http://wap.eastmoney.com/Default.aspx?vt=1" target="_blank">彩版</a></li>
                    <li class="on">触版</li>
                    <li><a href="http://www.eastmoney.com/go.php?p=www" target="_blank">PC版</a></li>
                </ul>
                <div class="feedback">
                    <a href="http://wap.eastmoney.com/YiJian.aspx?url=http%3a%2f%2fm.quote.eastmoney.com%2fstock%2c300059.shtml%3fcoop_s%3d"
                        target="_blank">意见反馈</a>
                </div>
            </footer>
        </div>
    </mip-em-hq>
```


## 注意事项

1.定制js 东方财富行情单页使用
