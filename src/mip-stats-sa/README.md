# mip-stats-sa

mip-stats-sa 组件说明
神策 jssdk ，参考完整文档[点击这里](http://www.sensorsdata.cn/manual/js_sdk.html)。  
目前事件追踪支持 `click`, `mouseup`, `load`，其它事件暂不支持。  

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-sa/mip-stats-sa.js

## 示例

### 1. 基本用法，引入SDK
```html

<mip-stats-sa setconfig=""></mip-stats-sa>

```

其中的setconfig的值，encodeURIComponent(JSON.stringify(以下神策sdk的配置)) 以下是神策jssdk的配置项参考  
```javascript
{
  sdk_url: '/wmd/sa-sdk-javascript/src/sensorsdata.full.js',
  heatmap:{},
  web_url:'http://www.aa.vb',
  name: 'sa',
  server_url: 'https://test111.cloud.sensorsdata.cn:4006/sa'
}
```

### 2. 自定义采集数据

可以通过 click mouseup load 方式来触发自定义采集的数据。

这是需要配置的值
```
var para = {"type":"click","data":["track", ['click_button',{button_name:'导航'}]]}
```
#### type

说明：对应的触发事件(load 加载触发/click 点击触发/mouseup 触发)  
必填：是  
格式：字符串数组  

#### data

说明：用于自定义采集数据  
必填：是  
格式：字符串

### 注意
第一个参数表示，神策里的方法 track setProfile 等。
第二个参数是 arguments，比如上面的这行代码的含义表示 发送一个 click_button 的事件，同时有属性 button_name 是 导航。


## 实际案例方法

```html

<mip-stats-sa setconfig="%7B%22sdk_url%22%3A%22http%3A%2F%2Fstatic.sensorsdata.cn%2Fsdk%2F1.10.1%2Fsensorsdata.min.js%22%2C%22heatmap_url%22%3A%22http%3A%2F%2Fstatic.sensorsdata.cn%2Fsdk%2F1.10.1%2Fheatmap.min.js%22%2C%22name%22%3A%22sa%22%2C%22server_url%22%3A%22http%3A%2F%2Ftest-syg.cloud.sensorsdata.cn%3A8006%2Fsa%3Ftoken%3D27f1e21b78daf376%22%7D"></mip-stats-sa>

<div data-stats-sa-obj="%7B%22type%22%3A%22load%22%2C%22data%22%3A%5B%22quick%22%2C%22autoTrack%22%5D%7D"></div>

```
其中第一行表示 sdk 的配置   

其中第二行表示在页面load后 执行代码 sa.quick('autoTrack') ,转换成的配置代码为 {type:'load',data:['quick','autoTrack']}   

同样的，如果你希望在 click 后执行， sa.track('click_button',{button_name:'nav'}) ，只需要配置如下代码 {type:'click',data:['track','click_button',{button_name:'nav'}]}  

