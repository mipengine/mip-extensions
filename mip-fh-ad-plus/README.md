# mip-fh-ad-plus 

mip-fh-ad-plus 用来支持整站页面的直投广告显示

|描述|展示页面直投广告|
|---|---|
|类型|广告|
|支持布局|N/S|
|所需脚本|https://mipcache.bdstatic.com/static/v1/mip-fh-ad-plus/mip-fh-ad-plus.js|

## 示例

在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:

```html
    <div>
        <mip-fh-ad-plus fh-ad-pid="19"></mip-fh-ad-plus>
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

### lazy

说明：懒加载(lazy) (true | false)
必填：否
格式：boolean
取值：true/false
默认值：false

