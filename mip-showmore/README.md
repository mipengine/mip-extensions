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
        <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
      </div>
      <p showmorebtn>
          <span class="mip-showmore-btnshow">点击显示</span>
          <span class="mip-showmore-btnhide">收起</span>
      </p>
 </mip-showmore>
```

### 设定字数阀值

```html
    <mip-showmore maxlen='20'>
        <div showmorebox>
             <div>MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。</div>
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