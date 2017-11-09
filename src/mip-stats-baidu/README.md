# mip-stats-baidu 百度统计

添加百度统计组件，用于统计页面数据。

标题|内容
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js

## 组件说明：MIP百度统计组件基于[百度统计API](http://tongji.baidu.com/open/api/more)，请参照API将参数配置在MIP页；目前事件追踪支持`click`,`mouseup`,`load`，其它事件暂不支持。

## 示例

MIP提供百度统计的插件，便于分析页面数据，需要提前到百度统计这边创建站点，在百度统计后台会自动生成js代码。从中找出token后插入到MIP组件的token
位置。方法为：

``` javascript
// 例：百度统计代码截取
hm.src = "https://hm.baidu.com/hm.js?02890d4a309827eb62bc3335b2b28f7f";
// hm.js? 后为你的统计 token。此例 token="02890d4a309827eb62bc3335b2b28f7f"
```

百度统计插件引入示例:

```
<mip-stats-baidu>
    <script type="application/json">
        {
            "token": "02890d4a309827eb62bc3335b2b28f7f",
            "_setCustomVar": [1, "login", "1", 2],
            "_setAutoPageview": [true]
        }
    </script>
</mip-stats-baidu>

```

百度统计事件追踪示例:

```
<div data-stats-baidu-obj="{'type':'click','data':'[_trackPageview, /virtual/login]'}">
    我是自动触发
</div>
 
```

## 属性

### token

说明：token，从百度统计代码中截取。

必填：是

格式：字符串

### _setCustomVar 参考([百度统计api:_setCustomVar](http://tongji.baidu.com/open/api/more?p=ref_setCustomVar))

说明：指定一个自定义变量，用于追踪用户使用行为等。

必填：否

格式：数组

### _setAutoPageview 参考([百度统计api:_setAutoPageview](http://tongji.baidu.com/open/api/more?p=ref_setAutoPageview))

说明：用户访问一个安装了百度统计代码的页面时，代码会自动发送该页面的PV统计请求，如果不希望自动统计该页面的PV，就可以使用本接口。主要用于iframe嵌套页面等情况。

必填：否

格式：数组

### _trackPageview 参考([百度统计api:_trackPageview](http://tongji.baidu.com/open/api/more?p=ref_trackPageview))

说明：用于发送某个指定URL的PV统计请求，通常用于AJAX页面的PV统计。

必填：否

格式：数组


## 事件追踪属性: data-stats-baidu-obj

### type

说明：对应的触发事件(load加载触发/click点击触发/mouseup触发)

必填：是

格式：字符串数组


### data

说明：用于事件追踪数据传递参考([百度统计api](http://tongji.baidu.com/open/api/))

必填：是

格式：字符串

### 备注：

`_setAccount`无需设置，`token`合法会自动执行`_hmt.push(['_setAccount',toke])`。


# 其它使用方式(可以正常运行，但不推荐)

token获取：

``` javascript
// 例：百度统计代码截取
hm.src = "https://hm.baidu.com/hm.js?02890d4a309827eb62bc3335b2b28f7f";
// hm.js? 后为你的统计 token。此例 token="02890d4a309827eb62bc3335b2b28f7f"
```


百度统计插件引入示例:

```
<mip-stats-baidu token="02890d4a309827eb62bc3335b2b28f7f"></mip-stats-baidu>

```

百度统计事件追踪示例:

```
<div data-stats-baidu-obj="%7B%22type%22:%22click%22,%22data%22:%22%5B_trackPageview,%20/virtual/login%5D%22%7D">
    我是自动触发
</div>
 
```

## 属性

### token

说明：token，从百度统计代码中截取

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

