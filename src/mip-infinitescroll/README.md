# mip-infinitescroll 无限滚动

当用户滚动到页面底部时，异步加载更多数据。适用于信息推荐。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-infinitescroll/mip-infinitescroll.js<br/> https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js

## 示例

### 基本用法
<!--
```html
<mip-infinitescroll data-src="xxx" template="myTemplate">
    <script type="application/json">
    {
        "rn": 40,
        "pn": 1,
        "prn": 6,
        "pnName": "pn",
        "bufferHeightPx": 40,
        "loadingHtml": "loading",
        "loadFailHtml": "failed",
        "loadOverHtml": "over!"
    }
    </script>
    <template type="mip-mustache" id="myTemplate">
        <li>
            <mip-img
                layout="responsive"
                width="600"
                height="120"
                src="{{img}}">
            </mip-img>
            <p>序号:{{number}}</p>
        </li>
    </template>
    <div class="mip-infinitescroll-results"></div>
    <div class="bg">
        <div class="mip-infinitescroll-loading"></div>
    </div>

</mip-infinitescroll>
```
-->

### 根据返回值判断请求结束
如果数据量未知，可以填写rn="[Infinity](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)", 加载完所有数据后才停止请求。

[warning] 由于JSON.parse不能解析Infinity，配置需要写成字符串形式 "Infinity"。
```html
<mip-infinitescroll data-src="xxx" template="myTemplate">
    <script type="application/json">
    {
        "rn": "Infinity",
        "pn": 1,
        "prn": 6,
        "bufferHeightPx": 40
    }
    </script>
    <template type="mip-mustache" id="myTemplate">
        <li>
            <p>序号{{number}}: {{title}}</p>
            <mip-img
                layout="responsive"
                width="600"
                height="120"
                src="{{img}}">
            </mip-img>
        </li>
    </template>
    <div class="mip-infinitescroll-results"></div>
    <div class="bg">
        <div class="mip-infinitescroll-loading"></div>
    </div>
</mip-infinitescroll>
```

## 属性

### data-src

说明：异步请求数据接口   
必选项：是   
类型：字符串   
取值范围：无   
单位：无   
默认值：无   

### template

说明：与模板 id 对应，用来标识所采用的模板，如不设置，则默认取组件子节点中的template  
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：无

## 参数配置

### rn

说明：results number, 需要显示的结果总数量  
类型：整数，"[Infinity](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)"字符串形式  
必选项：否   
取值范围：如果填写整数n，则只会取n条数据。如果填写"Infinity"，则无限加载数据，直到后端没有数据返回。   
单位：无   
默认值：20

### pn

说明：page number, 请求第几页  
必选项：否   
类型：整数    
单位：无   
默认值：1  

### prn

说明：page result number, 每次请求所请求的数据条数       
必选项：否   
类型：整数   
取值范围：无   
单位：无   
默认值：6  

### pnName

说明：翻页关键字            
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：pn    

### bufferHeightPx

说明：缓冲高度, 距离底部一定高度时提前请求数据         
必选项：否   
类型：整数   
取值范围：无   
单位：无   
默认值：10   

### loadingHtml

说明：loading时提示文案         
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：加载中...

### loadFailHtml

说明：加载失败时提示文案         
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：加载失败

### loadOverHtml

说明：加载完毕时提示文案         
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：加载完毕

## 注意事项

- 异步请求接口必须是 https
- 异步请求接口需要规范 callback 为 'callback'
- 接口返回的数据格式需要是如下格式：

```
{
    "status": 0, 
    "data": { 
        "items": [{}, {}]
    }
}
```
- status 0 表示请求成功
- items: [] 是需要渲染的数据
- 接口返回数据示例：
```
{
    "status": 0,
    "data":
    {
        "items": [
        {
            "title": "风信子",
            "img": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3495450057,3472067227&fm=5",
            "number": 1
        },
        {
            "title": "紫罗兰",
            "img": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3903672296,3890938056&fm=5",
            "number": 2
        },
        {
            "title": "梅花",
            "img": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1564909352,2801480363&fm=5",
            "number": 3
        },
        {
            "title": "茉莉花",
            "img": "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3761083504,3769519560&fm=5",
            "number": 4
        },
        {
            "title": "栀子花",
            "img": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3554982299,3562031081&fm=5",
            "number": 5
        },
        {
            "title": "桃花",
            "img": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2475781023,3185445088&fm=5",
            "number": 6
        }]
    }
}
```

