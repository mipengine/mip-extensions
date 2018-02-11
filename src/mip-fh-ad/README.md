# mip-fh-ad 

mip-fh-ad 用来支持m.fh21.com.cn问答详情页的直投广告显示

|描述|展示页面直投广告|
|---|---|
|类型|广告|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-fh-ad/mip-fh-ad.js|

## 示例

在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:

```html
    <mip-ad type="ad-qwang" cpro_psid="u2355234"></mip-ad>
    <!--<div id="adParam" data-keyword="鼻炎,过敏,结膜炎"></div>-->
    <mip-fixed type="bottom">
        <div style="op-0">x</div>
        <mip-fh-ad fh-ad-pid="1" lazy="false"></mip-fh-ad>
    </mip-fixed>
    <div>
        <mip-fh-ad fh-ad-pid="49"></mip-fh-ad>
    </div>
```

## 属性

### fh-ad-pid

说明：飞华广告位id
必填：是
格式：数字
单位：无

### fh-ad-keywords

说明：飞华直投广告关键词组,多词用,分隔例:`fh-ad-keywords="瘦身,性病,减肥"`, 如果没有指定则直接获取`#adParam`的`data-keyword`
必填：否

### lazy

说明：懒加载(lazy) (true | false)
必填：否
格式：boolean
取值：true/false
默认值：true

