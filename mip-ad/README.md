# mip-ad

mip-ad 用来支持站长添加网页内自定义广告，主要包括连接、图文，多图，banner四种形式，这类广告可以制定大小也可以被用户关闭。

描述|提供了一个广告容器用来显示广告，目前只支持https的广告
----|----
类型|通用，广告
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v0.1/mip-ad.js#

## 示例

基础广告组件有四种样式，四种样式通过tpl参数进行区分，分别是：banner（onlyImg），无图（noneImg），单图（oneImg），多图（moreImg），下面是组件的使用代码示例：

### banner

```html
<mip-ad 
    type="ad-comm"
    tpl="onlyImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>
```

### 无图

```html
<mip-ad 
    type="ad-comm"
    tpl="noneImg" 
    href="//m.baidu.com/s?word=百度" 
    data-title="广告标题">
</mip-ad>
```

### 单图

```html
<mip-ad 
    type="ad-comm"
    tpl="oneImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2357051511,2286288825&fm=11&gp=0.jpg" 
    data-title="广告标题">
</mip-ad>
```

### 多图

```html
<mip-ad 
    type="ad-comm"
    tpl="moreImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4009078664,3186400936&fm=111&gp=0.jpg;https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=521986262,2379149184&fm=21&gp=0.jpg;https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=195400779,4163278668&fm=21&gp=0.jpg" 
    data-ads="这里是广告摘要;这里是广告摘要" 
    data-txt="这里是图片标题;这里是图片标题;这里是图片标题啊啊啊"
    data-title="这里是广告标题这里是广告标题标">
</mip-ad>
```

## 属性

基础广告组件所涉及的属性有：广告类型（type），展示类型（tpl），跳转地址（href），图片大小（data-size），图片地址（src），广告标题（data-title），广告子标题（data-txt）以及广告摘要（data-ads）

### type

说明：广告类型（ad-comm/通用广告，ad-baidu/网盟广告）  
必填项：是  

### tpl

说明：展示类型（banner，无图，单图，多图）  
必填项：是  

### href

说明：跳转地址（href）  
必填项：是

### src

说明：图片地址，在多图类型下，多张图片的地址用半角分号(;)分隔开  
必填项：是，（无图）否

### data-size

说明：图片大小, 用来设定图片的宽高比，在有图片的情况下需要设置  
必填项：否（广告类型为banner时，必填）

### data-title

说明：广告标题，可设置为广告描述  
必填项：（banner，多图）否；（无图，单图）是

### data-txt

说明：广告子标题，多图时可用  
必填项：否


### data-ads

说明：广告摘要，多图时可用  
必填项：否

