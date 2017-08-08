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

### 设定基于可视区域的高度阈值

- `maxheight='screen:0.5'`可设置基于屏幕可视区域的高度阈值。
- 在按钮中增加`on`属性，注意on属性中需要填写对应 mip-showmore 的id。比如本例中，mip-showmore id="showmore02"，`on`属性需要写成on="tap:showmore01.toggle"

```html
<mip-showmore maxheight='screen:0.5' animatetime='.3' id="showmore02">
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
</mip-showmore>
<div on="tap:showmore02.toggle" data-closetext="收起" class="mip-showmore-btn">点击显示</div>
```

### 嵌套使用-高度阈值

- 嵌套使用时，注意 on 和 mip-showmore id 的对应。

```html
<mip-showmore maxheight='40' animatetime='.3' id="showmore03">
    【外层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    <mip-showmore maxheight='40' animatetime='.3' id="showmore04">
        【内层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    </mip-showmore>
    <div on="tap:showmore04.toggle" data-closetext="收起内层内容" class="mip-showmore-btn">点击显示内层</div>
</mip-showmore>
<div on="tap:showmore03.toggle" data-closetext="收起外层内容" class="mip-showmore-btn">点击显示外层</div>
```

### 设定字数阈值

```html
<mip-showmore maxlen='20' id="showmore05">
        MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。
</mip-showmore>
<div on="tap:showmore05.toggle" data-closetext="收起内容" class="mip-showmore-btn">点击显示</div>
```

### 嵌套使用-字数

- 嵌套使用时，注意 on 和 mip-showmore id 的对应。

```html
<mip-showmore maxlen='20' animatetime='.3' id="showmore06">
    【外层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    <mip-showmore maxlen='20' animatetime='.3' id="showmore07">
        【内层元素】MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。MIP是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。
    </mip-showmore>
    <div on="tap:showmore07.toggle" data-closetext="收起内层内容" class="mip-showmore-btn">点击显示内层</div>
</mip-showmore>
<div on="tap:showmore06.toggle" data-closetext="收起外层内容" class="mip-showmore-btn">点击显示外层</div>
```

### 设定折叠边界是否渐变

- `bottomshadow`设置折叠边界是否透明渐变
- 嵌套使用时，注意 on 和 mip-showmore id 的对应。

```html
<mip-showmore bottomshadow='1' maxheight='100' id="showmore08">
        MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。
</mip-showmore>
<div on="tap:showmore08.toggle" data-closetext="收起内容" class="mip-showmore-btn">点击显示</div>
```

<!--
虽然如下方法已弃用，但是2017-07之前有存量。组件升级需要兼容

### 设定高度阈值-旧版已弃用
```
<mip-showmore maxheight='40' animatetime='.3'>
    <div showmorebox>
        <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    </div>
    <p showmorebtn>
        <span class="mip-showmore-btnshow mip-showmore-btn">点击显示</span>
        <span class="mip-showmore-btnhide mip-showmore-btn">收起</span>
    </p>
</mip-showmore>
```
### 设定字数阈值-旧版已弃用

```
<mip-showmore maxheight='40'>
    <div showmorebox>
        <div>MIP HTML 基于HTML中的基础标签制定了全新的规范，通过对一部分基础标签的使用限制或功能扩展，使HTML能够展现更加丰富的内容；MIP JS 可以保证 MIP HTML 页面的快速渲染；MIP Cache 用于实现MIP页面的高速缓存，从而进一步提高页面性能。</div>
    </div>
    <p showmorebtn>
        <span class="mip-showmore-btnshow mip-showmore-btn">点击显示</span>
        <span class="mip-showmore-btnhide mip-showmore-btn">收起</span>
    </p>
</mip-showmore>
```
-->

## 属性

###  maxheight

- 说明：内容字符串超出限制长度则会截断显示省略号，显示"显示更多按钮"。内容截断显示不包括图片显示。
- 取值：`maxheight='40'`表示40px处折叠；`maxheight='screen:0.6'`表示0.6屏(0.6 * window.screen.height)处折叠；
- 必选项：否       
- 类型：数字或键值对
- 备注:  `maxheight、maxlen`只能存在一个，优先级：`maxheight > maxlen`


### animatetime

- 说明：展开收起动画时间。数字单位为秒，'animatetime=0.3'为0.3秒  
- 必选项：否    
- 类型：数字（0-1之间）  
- 默认值： 0.3
- 备注: 如果不需要动画，填写'animatetime=0'  

### data-closetext

- 说明：用于展开收起按钮文字配置。
- 必选项：否   
- 类型：字符串  
- 默认值： “收起”

### showmorebox (已弃用)

- 说明：内容显示框，即需要隐藏显示的dom  
- 必选项：否  
- 备注:  一个mip-showmore内只允许出现一个showmorebox

### showmorebtn (已弃用)

- 说明：显示更多按钮dom  
- 必选项：否  
- 备注:  一个mip-showmore内只允许出现一个 showmorebtn

### bottomshadow

- 说明：折叠边界是否渐变
- 取值：只能为'0'或'1'
- 必选项：否
