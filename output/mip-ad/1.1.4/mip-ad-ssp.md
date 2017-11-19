# mip-ad:ad-ssp 百度Feeds联盟广告

mip-ad 的一种类型：百度Feeds联盟广告。  
在 https://ssp.baidu.com/ 后台选择资源管理/feeds联盟接入。

标题|内容
----|----
类型|通用
支持布局|fixed-height, fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-ad/mip-ad.js


## 支持布局

- reponsive
- fixed-height

## 示例

### 页面内嵌ssp广告

```html
<mip-ad
    type="ad-ssp"
    data-site-id="1118394"
    data-block-id="2683"
    >
</mip-ad>
```

### 页面浮动ssp广告
浮动的ssp广告需使用mip-fixed元素和 fixed-height[布局](https://www.mipengine.org/doc/3-widget/11-widget-layout.html)。height 请根据广告实际宽高填写。

```html
<mip-fixed type="top" >
    <mip-ad
        type="ad-ssp"
        data-site-id="1118394"
        data-block-id="2684"
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
