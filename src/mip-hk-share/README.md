# mip-hk-share

好看分享插件

|标题|内容|
|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-hk-share/mip-hk-share.js|

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
