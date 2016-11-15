# mip-fh-ad 

mip-fh-ad 用来支持m.fh21.com.cn问答详情页的直投广告显示

|描述|展示页面直投广告|
|---|---|
|类型|广告|
|支持布局|N/S|
|所需脚本|https://mipcache.bdstatic.com/static/v1/mip-fh-ad/mip-fh-ad.js|

## 示例

在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:

```
   <mip-fh-ad fh-ad-pid="49"></mip-fh-ad>

   - P.S.: mip-fh-ad目录没有自带属性,直接按照正常的html标签使用即可
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

