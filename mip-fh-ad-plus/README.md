# mip-fh-ad-plus 

mip-fh-ad-plus 用来支持整站页面的直投广告显示

标题|内容
----|----
类型|广告
支持布局|N/A
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-fh-async/mip-fh-ad-plus.js

## 示例

在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:

```html
    <style mip-custom>
    .dn {display: none;}
    </style>
    
    <meta name="fh-ad-keywords" content="射精,阳痿,早泄">
    
    <div class="dn" fh-ad-empty-show>没有直销广告，才会显示</div>
    
    <div>
        <mip-fh-ad-plus fh-ad-pid="48" combo></mip-fh-ad-plus>
    </div>
    
    <div>
        <mip-fh-ad-plus fh-ad-pid="55"></mip-fh-ad-plus>
    </div>
    
    <div>
        <mip-fh-ad-plus fh-ad-pid="1"></mip-fh-ad-plus>
    </div>
    
    <div>
        <mip-fh-ad-plus fh-ad-pid="9" fh-ad-uid="1119181"></mip-fh-ad-plus>
    </div>
    
    <div>
        <mip-fh-ad-plus fh-ad-pid="9" fh-ad-uid="111"></mip-fh-ad-plus>
    </div>
```


## 属性

### fh-ad-pid

说明：飞华广告位id
必填：是
格式：数字
单位：无

### fh-ad-keywords

说明：飞华直投广告关键词组,多词用,分隔例:`fh-ad-keywords="瘦身,性病,减肥"`, 如果没有指定则直接获取`meta[name="fh-ad-keywords"]`的`content`属性值
必填：否

### fh-ad-uid

说明：飞华广告位医生uid
必填：否
格式：数字
单位：无

### lazy

说明：懒加载(lazy) (true | false)
必填：否
格式：boolean
取值：true/false
默认值：false

### combo

说明：一次性绑定所有直销广告请求 (true | false)
必填：否
格式：boolean
取值：true/false
默认值：false

