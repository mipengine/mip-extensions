# mip-hk-share

好看分享插件

|标题|内容|
|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本||

## 示例

在MIP HTML中,直接使用标签, 支持分享QQ和微博。

```html
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

## 属性

### 需要在页面定义如下参数

说明：页面定义参数
必选项：否
取值范围：
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
