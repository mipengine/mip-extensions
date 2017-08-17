# mip-news-script

mip-news-script 页面逻辑脚本集合

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-news-script/mip-news-script.js

## 示例

```
<mip-news-script>
<section class="historyver bottom_bor" id="historyver">
<!--showDownRes:ID in ({$dhistoryVer}) And ID != {$id}|charindex(','+ltrim(ID)+',', ',{$dhistoryVer},') asc|6|34|<p><a href="http://m.pc6.com/s/{id}"><span>{softname}<em>{softver}</em></span><i><font>大小：{softsize}</font>时间：{updatetime}</i></a><a href="http://m.pc6.com/s/{id}" class="cir_btn">下载</a></p>||0-->
    <div class="lookmore" id="lookmore" data-show='3'><span>展开全部</span><i></i></div>
</section>
<section class="xgwz bottom_bor p10">
<p class="dtit"><b>相关文章</b></p>
<ul>
<!--showCmsRes: id in({$mutualitycms})|DateAndTime desc|6|46|<li><em></em><a href="http://m.pc6.com/mipa/{id}.html" target="_blank">{title}</a></li>||0-->
</ul>
</section>
<section id="tcsyy" class="bottom_bor pictxt p10">
<p class="dtit"><span><a href="http://m.pc6.com/company/{$dUserClass}.html" class="dtit_r">更多+</a></span><b>相同厂商</b></p>
<div id="tags-main1">
        <div class="tags-main-ul"><!--showDownRes:UserClass={$dUserClass} and rootid in(465,469) and UserClass <> 0|HitsTotal desc|32|40|<li><a href="http://m.pc6.com/s/{id}"><img src="{thumb_100_100}" /><span>{softname}</span><em>下载</em></a></li>||-->
    </div></div>
     <div class="pagenum"></div>

</section>
</mip-news-script>
```

# 功能
该组件仅为优化与完善本站业务逻辑所用
