# mip-showmore 显示更多

隐藏过长的文章，点击按钮显示更多内容。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-showmore/mip-showmore.js

## 示例

### 设定像素单位的高度阈值

- 在按钮中增加`on`属性，注意on属性中需要填写对应 mip-showmore 的id。
- 比如本例中，mip-showmore id="showmore01"，`on`属性需要写成on="tap:showmore01.toggle"

```html
<mip-showmore maxheight='40' animatetime='.3' id="showmore01">
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
</mip-showmore>
<div on="tap:showmore01.toggle" data-closetext="收起" class="mip-showmore-btn">点击显示</div>
```

### 设定基于viewport的高度阈值

- `maxheightbaseviewport`可设置基于屏幕可视区域的高度阈值。
- 在按钮中增加`on`属性，注意on属性中需要填写对应 mip-showmore 的id。比如本例中，mip-showmore id="showmore01"，`on`属性需要写成on="tap:showmore01.toggle"

```html
<mip-showmore maxheightbaseviewport='.5' maxheight='40' animatetime='.3' id="showmore01">
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
</mip-showmore>
<div on="tap:showmore01.toggle" data-closetext="收起" class="mip-showmore-btn">点击显示</div>
```

### 嵌套使用-高度阈值

- 嵌套使用时，注意 on 和 mip-showmore id 的对应。

```html
<mip-showmore maxheight='40' animatetime='.3' id="showmore02">
    【外层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    <mip-showmore maxheight='40' animatetime='.3' id="showmore03">
        【内层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    </mip-showmore>
    <div on="tap:showmore03.toggle" data-closetext="收起内层内容" class="mip-showmore-btn">点击显示内层</div>
</mip-showmore>
<div on="tap:showmore02.toggle" data-closetext="收起外层内容" class="mip-showmore-btn">点击显示外层</div>
```

### 设定字数阈值

```html
<mip-showmore maxlen='20' id="showmore04">
        MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。
</mip-showmore>
<div on="tap:showmore04.toggle" data-closetext="收起内容" class="mip-showmore-btn">点击显示</div>
```

### 嵌套使用-字数

- 嵌套使用时，注意 on 和 mip-showmore id 的对应。

```html
<mip-showmore maxlen='20' animatetime='.3' id="showmore05">
    【外层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    <mip-showmore maxlen='20' animatetime='.3' id="showmore06">
        【内层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    </mip-showmore>
    <div on="tap:showmore06.toggle" data-closetext="收起内层内容" class="mip-showmore-btn">点击显示内层</div>
</mip-showmore>
<div on="tap:showmore05.toggle" data-closetext="收起外层内容" class="mip-showmore-btn">点击显示外层</div>
```

### 设定折叠边界是否渐变

- `bottomshadow`设置折叠边界是否透明渐变
- 嵌套使用时，注意 on 和 mip-showmore id 的对应。

```html
<mip-showmore bottomshadow='1' maxlen='20' id="showmore04">
        MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。
</mip-showmore>
<div on="tap:showmore04.toggle" data-closetext="收起内容" class="mip-showmore-btn">点击显示</div>
```

## 属性

## maxheightbaseviewport

- 说明：基于屏幕可视区域的高度阈值，如果元素高度超出阈值，隐藏超出部分，显示"显示更多按钮"
- 必选项：否
- 类型：数字
- 计算方式：`maxheightbaseviewport * 可视区域高度`；例如：`maxheightbaseviewport = 0.5`，实际折叠高度为：0.5屏
- 备注:  `maxheightbaseviewport、maxheight、maxheight`只能存在一个，优先级：`maxheightbaseviewport > maxheight > maxheight`

## maxheight

- 说明：高度阈值,单位为像素。如果元素高度超出阈值，隐藏超出部分，显示"显示更多按钮"
- 必选项：否  
- 类型：数字
- 备注:  `maxheightbaseviewport、maxheight、maxheight`只能存在一个，优先级：`maxheightbaseviewport > maxheight > maxheight`

##  maxheight

- 说明：内容字符串超出限制长度则会截断显示省略号，显示"显示更多按钮"。内容截断显示不包括图片显示。  
- 必选项：否       
- 类型：数字  
- 备注:  `maxheightbaseviewport、maxheight、maxheight`只能存在一个，优先级：`maxheightbaseviewport > maxheight > maxheight`


## animatetime

- 说明：展开收起动画时间  
- 必选项：否    
- 类型：数字  
- 备注:  只有与maxheight一起使用时生效  

## data-closetext

- 说明：用于展开收起按钮文字配置。
- 必选项：否   
- 类型：字符串  
- 默认值： “收起”

## showmorebox

- 说明：内容显示框，即需要隐藏显示的dom  
- 必选项：否  
- 备注:  一个mip-showmore内只允许出现一个showmorebox

## showmorebtn

- 说明：显示更多按钮dom  
- 必选项：否  
- 备注:  一个mip-showmore内只允许出现一个 showmorebtn

## bottomshadow

- 说明：折叠边界是否渐变
- 取值：只能为'0'或'1'
- 必选项：否
