# mip-zzmobile-carpusel

carpusel 组件

标题|内容
----|----
类型|业务，定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zzmobile-carpusel/mip-zzmobile-carpusel.js

## 示例

```html
<mip-zzmobile-carpusel>
    <mip-carousel
        autoplay
        defer="2000"  
        layout="responsive" 
        width="414"
        height="185"
        >
        <mip-img 
            src="http://zhanzhang.bj.bcebos.com/files/079771481028051.jpg">
        </mip-img>
        <mip-img 
            src="http://zhanzhang.bj.bcebos.com/files/038631478231365.JPG">
        </mip-img>
    </mip-carousel>
    <div class="indicator">
        <span class="active"></span>
        <span></span>
    </div>
</mip-zzmobile-carpusel>
```