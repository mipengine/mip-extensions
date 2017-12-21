# mip-meishij

mip-meishij实现了百分点统计,收藏和菜单添加，社会化分享。

标题|内容
----|----
类型|业务
支持布局|不使用布局
所需脚本|https://c.mipcdn.com/static/v1/mip-meishij/mip-meishij.js

## 示例

### 百分点统计

在`<mip-meishij>`下添加一个`<class="baifendian">`即可开启百分点统计，其参数通过`data`配置。例如：

```html
<mip-meishij>
  <div style="display:none;" class="baifendian" data-client-id="Cmeishijie" data-path="/service/meishijie_wap/meishijie_wap.js"></div>
</mip-meishij>
```

### 社会化分享

社会化分享包括QQ分享和微博分享，要求与原页面有一样的Class和层级。

#### 微博分享

通过`<span class="weibo"></span>`启用微博分享（选择符：`.sharebox .weibo`）。同样通过`data`配置参数： 

```html
<mip-meishij>
  <div class="share_box">
    <span class="weibo"
      data-title='推荐一道酸辣土豆丝，做法真的很简单哦，我在家里试过了，很好吃。'
      data-url='http://m.meishij.net/html5/news.php?id=58974&from=share'
      data-pic='http://images.meishij.net/p/20120302/8b0fcf838e381140c8c892bc8a437e3b.jpg'
      data-appkey="3274300248"
      data-ralate-uid="1757220135">
    </span>
  </div>
</mip-meishij>
```

#### QQ分享

QQ分享和微博分享类似：

```html
<mip-meishij>
  <div class="share_box">
    <span class="qq" 
      data-url='http://m.meishij.net/html5/news.php?id=58974&from=share'
      data-desc='推荐【酸辣土豆丝】'
      data-pics='http://images.meishij.net/p/20120302/8b0fcf838e381140c8c892bc8a437e3b.jpg'
      data-summary='推荐【酸辣土豆丝】'
      data-title='推荐菜谱:酸辣土豆丝'
      data-site='美食杰'>
    </span>
  </div>
</mip-meishij>
```

### 收藏和菜单

收藏和菜单HTML和原来保持一致即可。`mip-meishij`对原JavaScript进行了封装。
另外，ID可通过`#addfav_box`的`data-id`属性进行定义。例如：

```javascript
<mip-meishij>
  ...
  <div class="addfav_box" id="addfav_box" data-id="1685441">
  ...
</mip-meishij>
```

因为跨域所以域名`http://m.meishij.net`下的AJAX API应全部改为JSONP。包括：

* `/ajax/do_user_caidans.php?id=1685441&act=modi&rids=xxx`
* `/ajax/do_user_caidans.php?id=1685441`
* `/ajax/add_nfav.php?obj_id=1685441`
* `/ajax/add_nfav.php?act=cancel&obj_id=1685441`
* `/ajax/create_caidan.php?t=xxx`

