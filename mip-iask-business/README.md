# mip-iask-business

爱问广告插件

|---|---|
|类型|广告|
|支持布局|N/S|
|所需脚本|https://mipcache.bdstatic.com/static/v1/mip-iask-business/mip-iask-business.js|

## 示例

在MIP HTML中，直接使用标签。

```html
1 <mip-iask-business sources="${CommercialSource}" area="${qtlist.deliveryArea}"  div=".qt_list_${fn:replace(qtlist.deliveryArea,',', '')}"></mip-iask-business>
2 <mip-iask-business sources="${q.questionSourceType}" openId="${q.openCorporationId}" div="#mip_ad_footer_div"></mip-iask-business>
3 <mip-iask-business sources="${CommercialSource}"  len="#remcommend-info-${fn:replace(answerUI.deliveryArea,',', '')}" div="user-info-${fn:replace(answerUI.deliveryArea,',', '')}" type="show"></mip-iask-business>
```

## 属性

### sources

说明：广告的来源
必选项：是
类型：COMMERCIAL_IAD COMMERCIAL_ZWZD COMMERCIAL_CAD COOPERATE_HUASHENG COOPERATE_HUASHENG_QA COOPERATE_XINYUHENG

### area

说明：广告投放的区域
必选项：否
类型：字符串

### len

说明：用来判断长度，如果len=0 则删除div 
必选项：否
类型：字符串

### div

说明：显示广告的位置
必选项：是
类型：字符串


### type

说明：显示还是隐藏 
必选项：否
类型：show hide 默认hide