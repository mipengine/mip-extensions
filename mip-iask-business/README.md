# mip-iask-business

mip-iask-business 爱问商业广告组件

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-iask-business/mip-iask-business.js

## 示例

### 基本用法
```html
<mip-iask-business sources="${CommercialSource}" area="${qtlist.deliveryArea}"  div=".qt_list_${fn:replace(qtlist.deliveryArea,',', '')}"></mip-iask-business>
<mip-iask-business sources="${q.questionSourceType}" openId="${q.openCorporationId}" div="#mip_ad_footer_div"></mip-iask-business>
<mip-iask-business sources="${CommercialSource}"  len="#remcommend-info-${fn:replace(answerUI.deliveryArea,',', '')}" div="user-info-${fn:replace(answerUI.deliveryArea,',', '')}" type="show"></mip-iask-business>
<mip-iask-business sources="${q.questionSourceType}" tags="${mainTagsEnglish }" div=".mip_as_bottm_div" params="${fn:length(q.goodAnswers)}:${fn:length(q.answers)}:${q.questionSourceType}:${CommercialSource}:${q.tags}:${q.mainTags}:${navList[0].categoryId}:${navList[1].categoryId}" ></mip-iask-business>
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

### tags

说明：病种
必选项：否
类型：字符串


### params

说明：包月广告投放参数
必选项：否
类型：字符串


