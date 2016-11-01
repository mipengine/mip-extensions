# 类型: ad-comm 通用广告

通用广告

## 支持布局

- reponsive
- fixed-height
- fixed

## 示例

### banner 样式

```html
<mip-ad
    layout="fixed"
    width="414"
    height="80" 
    type="ad-comm"
    tpl="onlyImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="//m.baidu.com/static/search/ala/ad_1.png">
</mip-ad>
```

### 无图样式

```html
<mip-ad
    layout="fixed-height"
    height="80" 
    type="ad-comm"
    tpl="noneImg" 
    href="//m.baidu.com/s?word=百度" 
    data-title="广告标题">
</mip-ad>
```

### 单图样式

```html
<mip-ad
    layout="reponsive"
    width="414"
    height="80" 
    type="ad-comm"
    tpl="oneImg" 
    href="//m.baidu.com/s?word=百度" 
    data-size="1242 180" 
    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2357051511,2286288825&fm=11&gp=0.jpg" 
    data-title="广告标题">
</mip-ad>
```

### 多图样式

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

### type

说明：广告类型  
必选项：是  
类型：字符串  
取值：ad-comm 
默认值：无

### tpl

说明：样式  
必选项：是  
类型：字符串  
取值：banner,noneImg,oneImg,moreImg 
默认值：无

### href

说明：跳转地址  
必选项：是  
类型：URL  
默认值：无

### src

说明：图片地址，在多图类型下，多张图片的地址用半角分号(;)分隔开  
必选项：否  
类型：字符串  
默认值：无

### data-size

说明：图片大小, 用来设定图片的宽高比，在有图片的情况下需要设置  
必选项：否（广告类型为banner时，必填）  
类型：两数字用空格分开  
默认值：无

### data-title

说明：广告标题，可设置为广告描述  
必选项：banner，多图）否；（无图，单图）是  
类型：字符串  
默认值：无

### data-txt

说明：广告子标题，多图时可用  
必选项：否  
类型：字符串  
默认值：无

### data-ads

说明：广告摘要，多图时可用  
必选项：否  
类型：字符串  
默认值：无
