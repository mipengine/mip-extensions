# mip-lightbox

mip-lightbox 是由用户控制展现或关闭的一个全屏浮层组件，组件全屏覆盖，组件里的元素超出屏幕会被隐藏，不能滑动。

标题|内容
----|----
类型|通用
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-lightbox/mip-lightbox.js

## 示例

```html
<button on="tap:my-lightbox.toggle" id="btn-open" role="button" tabindex="0">
    Open lightbox
</button>

<mip-lightbox
    id="my-lightbox"
    layout="nodisplay"
    class="mip-hidden">
    <div class="lightbox">
        <h1>Hello, World!</h1>
        <p> this is the lightbox</p>
    </div>
</mip-lightbox>
```

## 属性

### id

说明：组件ID    
必选项：是    
类型：字符串  

### layout

说明：布局  
必选项：是    
类型：字符串    
取值：nodisplay 

## 注意事项

- mip-lightbox 默认是隐藏的，作为打开开关的 dom 节点 需设置 on 属性，且 on 属性的属性值为 "tap:组件ID.open"。

- mip-lightbox 需要一个 div 子节点，这个 div 的 calss 必须有 lightbox，并且必须有 on 属性，属性值为"tap:组件ID.close"。 

- 依赖 mipmain 最低版本为 1.1.2
