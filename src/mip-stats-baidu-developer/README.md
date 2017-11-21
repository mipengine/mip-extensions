# mip-stats-baidu-developer 百度开发者中心自定义页面访问数据统计插件

在百度开发者中心添加统计组件，用于统计页面数据。

标题|内容
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-stats-baidu-developer/mip-stats-baidu-developer.js

## 说明

MIP百度开发者中心统计组件基于[百度开发者数据统计API](http://developer.baidu.com/collect/click)，目前只支持click事件追踪，其它事件暂不支持。

## 示例

根绝MIP规范，开发百度开发者中心需要的统计的插件，便于分析页面数据。

百度开发者中心统计插件引入示例:

<mip-stats-baidu-developer domain="https://developer.baidu.com/"></mip-stats-baidu-developer>

## 属性

### domain

说明：domain，当前系统的域名，避免请求跨域 
必填：是  
格式：字符串
