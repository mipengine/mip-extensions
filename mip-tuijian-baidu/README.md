# mip-tuijian-baidu

mip-tuijian-baidu 用来支持站长添加[百度推荐](http://tuijian.baidu.com)。

描述|百度推荐组件
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-tuijian-baidu/mip-tuijian-baidu.js

## 示例

MIP提供百度推荐的插件，需要提前到百度推荐这边创建推荐计划，提取生成代码中的siteId和planId，并使用MIP提供的插件，代码示例：


百度推荐插件引入示例:

```
<mip-tuijian-baidu site-id="02890d4a309827eb62bc3335b2b28f7f" plan-id="18506"></mip-tuijian-baidu>

```


## 属性

### site-id

说明：站点ID

必填：是

格式：字符串


### plan-id

说明：推荐框ID

必填：是

格式：字符串
