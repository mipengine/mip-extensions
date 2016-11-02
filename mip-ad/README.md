# mip-ad 广告

mip-ad 用来支持站长添加网页内自定义广告，主要包括连接、图文，多图，banner四种形式，这类广告可以制定大小也可以被用户关闭。

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://mipcache.bdstatic.com/static/v1.4/mip-ad.js
版本v1.0|支持别名mip-embed

## 示例

### 使用别名

```html
<mip-ad layout="fixed"  type="ad-baidu" cproid="u2791376" class="mip-element mip-layout-container"></mip-ad>
```

### 网盟扩展广告

```html
<mip-ad 
    type="baidu-wm-ext" 
    domain="//dup.lovedword.com/" 
    token="3a1ec097f7cbf63edb0e7f98eff238f950e6ca0b29e67fe1103c" 
></mip-ad>
```

### 通用广告banner样式基本使用

```html
<mip-ad 
    type="ad-comm"
    tpl="onlyImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>
```





## 支持广告

- [通用广告](mip-ad-comm.md)
- [全网广告](mip-ad-qwang.md)
- [网盟广告](mip-ad-baidu.md)
- [网盟扩展广告](/3-widget/5-ad-widget/ad-baidu-wm-ext-widget.md)
