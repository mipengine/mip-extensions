# mip-stats-google 谷歌分析（Google Analytics）

mip-stats-google 组件说明

标题|内容
----|----
类型|通用
布局|N/S
引用脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-stats-google/mip-stats-google.js

## 示例

MIP提供谷歌分析（Google Analytics）的插件，便于分析页面数据，需要提前到谷歌分析（Google Analytics）这边创建站点，在谷歌分析（Google Analytics）后台会自动生成js代码。从中找出token后插入到MIP组件的token
位置。方法为：

``` javascript
// 例：谷歌分析（Google Analytics）代码截取
_gaq.push(['_setAccount', 'UA-1322396-1']);
// UA-13266796-1 为你的统计 token。此例 token="UA-1322396-1"
```

谷歌分析（Google Analytics）插件引入示例:

```
<mip-stats-google token="UA-1322396-1"></mip-stats-google>

```

谷歌分析（Google Analytics）事件追踪示例:
```
<div data-stats-google-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%22%5B_trackEvent%2CVideos%2C%20Play%2C%20Gone%20With%20the%20Wind%5D%22%7D">
    我是点击触发
</div>
 
```

## 属性

### token

说明：token，从谷歌分析（Google Analytics）代码中截取

必填：是

格式：字符串


### setconfig

说明：自定义参数;

必填：否

格式：字符串数组

### 备注

【setconfig值必须encodeURIComponent处理,并且参数无引号,空值位置留空】

#### 参数只有一组

``` javascript
// 例：谷歌分析（Google Analytics）代码截取
 _gaq.push(['_setCustomVar', 1, 'node', 'index', 3]);
// [_setCustomVar, 1, node, index, 3] 为你的统计 setconfig。

此例：setconfig='%5B_setCustomVar%2C%201%2C%20node%2C%20index%2C%203%5D';
``` 

#### 参数有多组[用,号隔开]

``` javascript
// 例：谷歌分析（Google Analytics）代码截取
 _gaq.push(['_setCustomVar', 1, 'node', 'picture', 3]);
 _gaq.push(['_setCustomVar', 2, 'pro_cateid', '7911', 3]);
 _gaq.push(['_setCustomVar', 3, 'pro_gid', '377551', 3]);
 _gaq.push(['_setCustomVar', 4, 'pro_cid', '', 3]);
// [_setCustomVar, 1, node, picture, 3],[_setCustomVar, 2, pro_cateid, 7911, 3],[_setCustomVar, 3, pro_gid, 377551, 3],[_setCustomVar, 4, pro_cid, , 3] 为你的统计 setconfig。
此例：setconfig='%5B_setCustomVar%2C%201%2C%20node%2C%20picture%2C%203%5D%2C%5B_setCustomVar%2C%202%2C%20pro_cateid%2C%207911%2C%203%5D%2C%5B_setCustomVar%2C%203%2C%20pro_gid%2C%20377551%2C%203%5D%2C%5B_setCustomVar%2C%204%2C%20pro_cid%2C%20%2C%203%5D';
``` 

## 事件追踪属性: data-stats-google-obj

### type

说明：对应的触发事件(load加载触发/click点击触发)

必填：是

格式：字符串


### data

说明：用于事件追踪数据传递参考

必填：是

格式：字符串数组

### 备注

data-stats-google-obj值必须encodeURIComponent处理,如{"type":"click","data":"[_trackEvent,Videos, Play, Gone With the Wind]"};需转化为%7B%22type%22%3A%22click%22%2C%22data%22%3A%22%5B_trackEvent%2CVideos%2C%20Play%2C%20Gone%20With%20the%20Wind%5D%22%7D

