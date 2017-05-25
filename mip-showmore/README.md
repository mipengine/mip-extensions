# mip-showmore 显示更多

隐藏过长的文章，点击按钮显示更多内容。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-showmore/mip-showmore.js

## 示例

### 设定高度阈值

```html
<mip-showmore maxheight='40' animatetime='.3'>
     <div showmorebox>
        <div>todo//</div>
      </div>
      <p showmorebtn>
          <span class="mip-showmore-btnshow">点击显示</span>
          <span class="mip-showmore-btnhide">收起</span>
      </p>
 </mip-showmore>
```

### 设定字数阀值

```html
    <mip-showmore maxlen='40'>
        <div showmorebox>
             <div>todo//</div>
        </div>
        <p showmorebtn>
            <span class="mip-showmore-btnshow">点击显示</span>
            <span class="mip-showmore-btnhide">收起</span>
        </p>
    </mip-showmore>
```


## 属性

## maxheight

说明：高度阀值,单位为像素。如果元素高度超出阈值，隐藏超出部分，显示"显示更多按钮"
必选项：否  
类型：数字
备注:  以maxlen不可同时使用，maxheight优先级大于maxlen

##  maxlen

说明：  内容字符串超出限制长度则会截断显示省略号，显示"显示更多按钮"。内容截断显示不包括图片显示。
必选项：否     
类型：数字
备注:  以maxheight不可同时使用，maxheight优先级大于maxlen


## animatetime

说明：展开收起动画时间
必选项：否   
类型：数字 
备注:  只有与maxheight一起使用时生效

## showmorebox

说明：内容显示框，即需要隐藏显示的dom
必选项：是  
备注:  一个mip-showmore内只允许出现一个showmorebox

## showmorebtn

说明：显示更多按钮dom
必选项：是  
备注:  一个mip-showmore内只允许出现一个 showmorebtn