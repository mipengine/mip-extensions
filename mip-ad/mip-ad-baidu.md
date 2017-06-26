# 类型: ad-baidu 网盟广告

网盟广告。

## 支持布局

- fixed-height
- fixed

## 示例

### 非定制基本使用

```html
<div class="mip-adbd">
    <mip-ad
        type="ad-baidu" 
        cproid="u2697398">
    </mip-ad>
</div>
```

### 非定制加布局

```html
<div class="mip-adbd">
    <mip-ad
        layout="fixed"
        width="414"
        height="80" 
        type="ad-baidu" 
        cproid="u2697398">
    </mip-ad>
</div>
```

### 定制广告使用

需要注意的是：

- 定制广告的 script 标签中的参数必须带双引号，也就是说 script 标签中的数据必须是 json 格式的
- mip-embed 或者 mip-ad 标签必须有一个div子节点，并且此节点必须有属性id，并且id的属性值是"cpro_"为前缀，script标签中的cproid为后缀的字符串，本例应为"cproid="u1908671"

```html
<mip-embed 
    layout="fixed"
    width="414"
    height="157" 
    type="ad-baidu" 
    cproid="u1908671">
    <script type="application/json">
    {
        "at": "3",
        "hn": "0",
        "wn": "0",
        "imgRadio": "1.7",
        "scale": "20.6",
        "pat": "6",
        "tn": "template_inlay_all_mobile_lu_native",
        "rss1": "#FFFFFF",
        "adp": "1",
        "ptt": "0",
        "titFF": "%E",
        "rss2": "#FFFFFF",
        "titSU": "0",
        "ptbg": "70",
        "ptp": "1"
    }
    </script>
    <div id="cpro_u1908671"></div>
</mip-embed>
```

## 属性

### type

说明：广告类型  
必选项：是  
类型：字符串  
取值：ad-baidu  
默认值：无  

### cproid

说明：网盟广告id  
必选项：是  
类型：字符串  
默认值：无
