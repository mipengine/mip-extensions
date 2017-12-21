# mip-jjpz

mip-jjpz  自有业务详情页整体交互组件

标题|内容
----|----
类型|业务，定制
支持布局|responsive,fill,container
所需脚本|https://c.mipcdn.com/static/v1/mip-jjpz/mip-jjpz.js

## 示例

```html
<mip-jjpz>
 <header>
   <div class="icon">
    <div class="title">
     <h1>天天基金网</h1>
   </div>
 </div>
</header>
<section class="pageContent1">
 <div class="ui_outer">
  <div class="ui_inner ui-grid-row ui_h2 ui_inner_m15">
   <div class="header1">
    <span class="Fname"></span>
    <span class="coder fundcode"></span>
  </div>
  <div class="ui_gray header2"></div>
  <div class="ui-grid-5">
    <p class="ui_m ui_gray Fearnings">最新净值（<span class="numberFont">11-02</span>）</p>
    <p class="txtBig FearningsN1"></p>
  </div>
  <div class="ui-grid-5 rzfLeftBorder">
    <p class="ui_m ui_gray FearningsDay">日涨幅</p>
    <p class="txtBig FearningsN2"></p>
  </div>
</div>
<div class="ui_m ui-grid-row ui_h2 ui_inner_m15 Fevaluation">
 <span class="ui_gray font-MS">盘中估值：</span>
 <span class="padding-right5px numberFont"></span>
 <span class="padding-right5px numberFont"></span>
 <span class="ui_gray numberFont "></span>
</div>
</div>
<div class="ui_outer padding-r10">
  <div class="Info_url ui_inner ui-grid-row ui_h2 ui_inner_m15 paddingRight1 ui_arr iconfont  border-topnone">
   <div class="ui-grid-5">
    <p class="ui_m ui_gray"><font>今年来：</font><span class="numberFont"></span></p>
  </div>
  <div class="ui-grid-5">
    <p class="ui_m ui_gray"><font>近1月：</font><span class="numberFont"></span></p>
  </div>
  <div class="ui-grid-5">
    <p class="ui_m ui_gray"><font>近6月：</font><span class="numberFont"></span></p>
  </div>
  <div class="ui-grid-5">
    <p class="ui_m ui_gray"><font>近1年：</font><span class="numberFont"></span></p>
  </div>
</div>
</div>
<a href="http://js1.eastmoney.com/tg.aspx?ID=4815" target="_blank">
  <mip-img class="mip-img margintop10" alt="" src="https://img.1234567.com.cn/trade/2016091316393040.gif"></mip-img></a>
  <div class="ui_outer  ui_blank buyInfo_url">
    <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding">
     <div class="ui-grid fundName">
      购买信息
    </div>
    <div class="ui-grid ui_arr iconfont">
      <p class="ui_alignRight ui_gray ui_m"><span class="ui_black">购买手续费：</span><span class="ui_black numberFont"></span></p>
    </div>
  </div>
</div>
<div class="ui_outer  ui_blank tabp" data-map="gzt">
  <div class="tab ui-clear">
 </div>
 <div class="tabContent  loading">
 </div>
</div>
<div class="tuiguang_xz height60">
  <span><a href="http://js1.eastmoney.com/tg.aspx?ID=3908" target="_blank" class="fontBlue">&nbsp; 天天基金app查基金 方便又快捷</a></span>&nbsp;
  <span class="red"><a href="http://js1.eastmoney.com/tg.aspx?ID=3908" target="_blank"> 立即打开</a></span>
  <br />
  <span><a href="http://js1.eastmoney.com/tg.aspx?ID=3925" target="_blank">&nbsp; 天天基金网基金买入费率1折！</a></span>&nbsp;
  <span class="red"><a href="http://js1.eastmoney.com/tg.aspx?ID=3925" target="_blank"> 立即查看</a></span>
  <br />
</div>
<div class="ui_outer  ui_blank gotoLSSYL">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15">
   <div class="ui-grid-8">
    历史净值
  </div>
  <div class="ui-grid-2 iconfont ui_fold"></div>
</div>
</div>
<div class="ui_outer ui_blank baseInfo_url">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding">
   <p class="ui-grid-4 ui-grid-3">基本信息</p>
   <div class="ui-grid-6 ui-grid-7 ui_arr iconfont">
    <div class="ui_m ui_gray jjxx-h"></div>
  </div>
</div>
</div>
<div class="ui_outer gotoJBCC">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15">
   <div class="ui-grid-8">
    <p>基金持仓<span class="cjjzri"></span></p>
  </div>
  <div class="ui-grid-2 ui_unfold iconfont"></div>
</div>
</div>
<div class="fold_content hidden">
  <div class="jbcc_scroll">
   <table class="ui-table">
    <thead>
     <tr>
      <th>股票名称</th>
      <th>持仓占比</th>
      <th>涨跌幅</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
</div>
<p class="tip"></p>
</div>
<div class="ui_outer  gotoFHPS">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15">
   <div class="ui-grid-8">
    <p>分红配送</p>
  </div>
  <div class="ui-grid-2 ui_unfold iconfont"></div>
</div>
</div>
<div class="fold_content "></div>
<div class="ui_outer gotoJJJL ">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15">
   <div class="ui-grid-8">
    <p>基金经理</p>
  </div>
  <div class="ui-grid-2 ui_unfold iconfont"></div>
</div>
</div>
<div class="fold_content hidden">
  <div class="jjjlContent">
   <h3>基金经理变动一览</h3>
   <div class="gotoJJJL_scroll overflow-x">
    <table class="ui-table">
     <thead>
      <tr>
       <th>起始期</th>
       <th>截止期</th>
       <th>基金经理</th>
       <th>任期时间</th>
       <th>任期回报</th>
     </tr>
   </thead>
   <tbody></tbody>
 </table>
</div>
<h3>现任基金经理简介</h3>
<div class="gotoJJJL_detail"></div>
</div>
</div>
<div class="ui_outer gotoJJGG ">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15">
   <div class="ui-grid-8">
    <p>基金公告</p>
  </div>
  <div class="ui-grid-2 ui_unfold iconfont"></div>
</div>
</div>
<div class="fold_content "></div>
</section>
<a class="discussLink" href="http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of000001" target="_blank">查看与本基金有关的<span></span>个讨论帖</a>
<section class="pageContentTgsqxjj">
 <div class="ui_outer ui_blank tgsqxjj_url" data-href="http://m.1234567.com.cn/m/fund/jjjz.shtml?companyid=80000224#1">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding">
   <p class="ui-grid-4 ">同公司旗下基金</p>
   <div class="ui-grid-6 ui_arr iconfont">
    <div class="ui_gray ui-right pddingRight15">
     共
     <span class="numberFont">60</span>只基金
   </div>
 </div>
</div>
</div>
<ul class="fund-list">
  <li class="fund-item"><a href="http://m.1234567.com.cn/m/fund/funddetail/" target="_blank">
    <table class="fund-tbl">
     <tbody>
      <tr>
       <td class="left" colspan="4">
        <div class="fund-title  ui_arr1 iconfont">
         <a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode=000001" class="fund-detail font17" target="_blank"></a>
         <span class="ui_gray fund_minsg paddingR15"><span class="numberFont"></span>元起购</span>
       </div></td>
     </tr>
     <tr>
       <td class="left col_1"><b class="profit font22"></b><span class="profit-title"></span></td>
       <td class="left col_1">
        <div>
         <span class="fund-fl font15"></span>
         <span class="fund-fl font15W"></span>
         <span class="profit-title">购买手续费</span>
       </div></td>
       <td></td>
       <td class="right col_2 align-bottom"><a class="fund-buy" href="https://tradewap.1234567.com.cn/buyfund.html" target="_blank">购买</a></td>
     </tr>
   </tbody>
 </table></a></li>
</ul>
</section>
<section class="pageContentTljjzf">
 <div class="ui_outer ui_blank tljjzf_url" data-href="http://m.1234567.com.cn/m/fund/jjph.shtml#8">
  <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding">
   <p class="ui-grid-4 ">同类基金涨幅</p>
   <div class="ui-grid-6 ui_arr iconfont">
    <div class="ui_gray ui-right pddingRight15">
     共
     <span class="numberFont">76</span>只基金
   </div>
 </div>
</div>
</div>
<ul class="fund-list">
  <li class="fund-item"><a href="http://m.1234567.com.cn/m/fund/funddetail/" target="_blank">
    <table class="fund-tbl">
     <tbody>
      <tr>
       <td class="left" colspan="4">
        <div class="fund-title  ui_arr1 iconfont">
         <a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode=000523" class="fund-detail font17" target="_blank"></a>
         <span class="ui_gray fund_minsg paddingR15"><span class="numberFont"></span>元起购</span>
       </div></td>
     </tr>
     <tr>
       <td class="left col_1"><b class="profit font22"></b><span class="profit-title"></span></td>
       <td class="left col_1">
        <div>
         <span class="fund-fl font15"></span>
         <span class="fund-fl font15W"></span>
         <span class="profit-title">购买手续费</span>
       </div></td>
       <td></td>
       <td class="right col_2 align-bottom"><a class="fund-buy" href="https://tradewap.1234567.com.cn/buyfund.html" target="_blank">购买</a></td>
     </tr>
   </tbody>
 </table></a></li>
</ul>
</section>
<footer>
 <ul class="foot_href">
  <li><a href="http://m.1234567.com.cn/m/fund/favor.shtml" target="_blank">自选</a></li>
  <li><a href="http://m.1234567.com.cn/m/fund/jjjz.shtml" target="_blank">净值</a></li>
  <li><a href="http://m.1234567.com.cn/m/fund/jjgz.shtml" target="_blank">估值</a></li>
  <li><a href="http://m.1234567.com.cn/m/fund/jjph.shtml" target="_blank">排行</a></li>
  <li><a href="http://m.1234567.com.cn/NewsList.aspx?m=12&amp;c=590" target="_blank">要闻</a></li>
  <li><a href="http://m.1234567.com.cn/NewsList.aspx?m=12&amp;c=591" target="_blank">观点</a></li>
  <li><a href="http://jjbmob.eastmoney.com/app/index.html" target="_blank">基金吧</a></li>
</ul>
<ul class="foot_about">
  <li class="item"><a href="http://m.1234567.com.cn/m/channel/about" target="_blank">关于我们</a></li>
  <li class="split">|</li>
  <li class="item"><a href="http://m.1234567.com.cn/m/channel/contact" target="_blank">联系我们</a></li>
  <li class="split">|</li>
  <li class="item"><a href="http://m.1234567.com.cn/m/channel/yijian" target="_blank">意见反馈</a></li>
</ul>
<div class="foot_download">
  <a href="http://js1.eastmoney.com/tg.aspx?ID=3887" target="_blank">点此下载APP , 看资讯 , 买基金</a>
</div>
<div class="foot_desc">
  <p class="foot_title">客服热线：<a href="tel:400-9918-918">400-9918-918</a>/<a href="tel:400-1818-188">400-1818-188</a></p>
  <p class="foot_time">工作日：<span class="foot_time_s">7:30-21:30</span> 双休日：<span class="foot_time_s">9:00-21:00</span></p>
</div>
</footer>
<div class="fixContent animfooter">
 <div class="ui-grid-row ui_h2">
  <div class="ui-grid-3">
   <div class="ui-btn btn-inline ui-btn-orange buyJJ">
    立即购买
  </div>
</div>
<div class="ui-grid-7">
 <span class="gotopinglun">评论</span>
 <span class="shareInfo">分享</span>
 <span class="addFavor">加自选</span>
 <div class="flexShare hide">
  <ul>
    <li data-type="sina">新浪微博</li>
    <li data-type="qq">QQ微博</li>
    <li data-type="qzone">QQ空间</li>
  </ul>
</div>
</div>
</div>
</div>
</mip-jjpz>
```

