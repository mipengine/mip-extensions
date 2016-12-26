# mip-stats-baidu

mip-stats-baidu 用来支持站长添加百度统计。

描述|百度统计组件，用于统计页面数据
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js

## 示例

MIP提供百度统计的插件，便于分析页面数据，需要提前到百度统计这边创建站点，会自动生成js代码使用提取工具提取token，并使用MIP提供的插件，代码示例：


百度统计插件引入示例:

```
<mip-stats-bidu token="02890d4a309827eb62bc3335b2b28f7f" setconfig="%5B_setAutoPageview%2C%20false%5D"></mip-stats-bidu>

```

百度统计事件追踪示例:
```
<div data-stats-baidu-obj="%7B%22type%22:%22click%22,%22data%22:%22%5B_trackPageview,%20/virtual/login%5D%22%7D">
    我是自动触发
</div>
 
```

## 属性

### token

说明：token

必填：是

格式：字符串


### setconfig

说明：用于对整个页面统计的操作.如(_setAutoPageview,_setCustomVar)

必填：否

格式：字符串

### 备注

setconfig值必须encodeURIComponent处理,如[_setAutoPageview, true]需转化为%5B_setAutoPageview%2C%20false%5D字符串传递


## 事件追踪属性: data-stats-baidu-obj

### type

说明：对应的触发事件(load加载触发/click点击触发)

必填：是

格式：字符串数组


### data

说明：用于事件追踪数据传递参考([百度统计api](http://tongji.baidu.com/open/api/))

必填：是

格式：字符串

### 备注

data-stats-baidu-obj值必须encodeURIComponent处理,如{"type":"click","data":"[_trackPageview, /virtual/login]"};需转化为%7B%22type%22:%22click%22,%22data%22:%22%5B_trackPageview,%20/virtual/login%5D%22%7D

