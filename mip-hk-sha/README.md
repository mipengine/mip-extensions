# mip-hk-share

mip-hk-share 百度好看分享插件

| 描述 | 分享QQ，微博|
|---|---|
|可用性	|完成 |
|所需脚本| mip-hk-share |

# 使用方法

在MIP HTML中,直接使用标签, 用于分享QQ和微博。示例如下:
```
    <mip-hk-share class="detail-share">
    <div id="J_detail_share">
        <span class="detail-share-icon"></span>
        <div class="list-share-pop J_share">
            <div class="list-share-p-title">分享到：</div>
            <a target="_blank" href="###" class="list-share-qq" data-type="qq">QQ空间</a>
            <a target="_blank" href="###" class="list-share-wb" data-type="wb">新浪微博</a>
            <em class="detail-share-icon-p" id="J_share_close"></em>
        </div>
    </div>
    </mip-hk-share>
```

# 属性
需要在页面定义分享参数，否则用默认参数代替

```
<script type="application/json" id="J_config">
{
    shareTitle: 'word文档怎么快速排版？',
    shareContent: 'word文档怎么快速排版？',
    sharePic: 'http%3A%2F%2Fcdn01.baidu-img.cn%2Ftimg%3Fpa%26imgtype%3D3%26sec%3D1439619614%26di%3Da1a46abf815ff07b1bbba91f8b7fca84%26quality%3D100%26size%3Db980_10000%26src%3Dhttp%253A%252F%252Fbos.nj.bpc.baidu.com%252Fv1%252Fmediaspot%252F23f9e491-9f6d-11e6-83f7-d153ccac48ab.jpg',
    urlKey: 'https://baijiahao.baidu.com/s?id=1549881696914991&wfr=content',
    type: 'article',
    page: 'erji_detail_news',
    tj: '/tj.gif?page=erji_detail_news&pos='
}
</script>
```
