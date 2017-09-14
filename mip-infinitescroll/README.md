# mip-infinitescroll 无限滚动

当用户滚动到页面底部时，加载更多。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-infinitescroll/mip-infinitescroll.js<br/> https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js

## 示例

### 基本用法
```html
<mip-infinitescroll data-src="xxx" template="myTemplate">
    <script type="application/json">
    {
        "rn": 40,
        "pn": 3,
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

说明：results number,需要显示的结果总数量     
必选项：否   
类型：整数   
取值范围：无   
单位：无   
默认值：20

### pn

说明：page number, 每次请求所请求的数据条数       
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


    {
        status: 0, 
        data: { 
            items: []
        }
    }

- status 0 表示请求成功
- items: [] 是需要渲染的数据

