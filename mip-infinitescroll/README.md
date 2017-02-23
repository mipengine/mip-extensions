# mip-infinitescroll

mip-infinitescroll 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-infinitescroll/mip-infinitescroll.js

## 示例

### 基本用法
```html
<mip-infinitescroll src="xxx" template="myTemplate" rn='20' bufferHeightPx='40' pn='2' loadingHtml='loading' loadFailHtml='failed' loadOverHtml='over!'>
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

### src

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
