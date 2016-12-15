# 类型: ad-ssp 内容联盟广告

内容联盟广告 [ssp媒体服务首页](http://ssp.baidu.com/home)

## 支持布局

- reponsive
- fixed-height

## 示例

### 页面内嵌ssp广告

```html
<mip-ad
    type="ad-ssp"
    data-site-id="xxxxxxxxtodo"
    data-block-id="xxxx"
    >
</mip-ad>
```

### 页面浮动ssp广告
浮动的ssp广告需使用mip-fixed元素和 fixed-height布局

```html
<mip-fixed type="top" >
    <mip-ad
        type="ad-ssp"
        data-site-id="xxxxxxxxtodo"
        data-block-id="xxxx"
        layout="fixed-height"
        height="75px"
        >
    </mip-ad>
</mip-fixed>
```

## 属性

### type

说明：广告类型  
必选项：是  
类型：字符串  
取值：ad-ssp  
默认值：无

### data-site-id

说明：网站id，在ssp投放代码中可见  
必选项：是  
类型：字符串  

### data-block-id

说明：广告id，在ssp投放代码中可见  
必选项：是  
类型：字符串  
