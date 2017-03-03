# mip-fh-async 

mip-fh-async 用来支持整站全网异步接口渲染组件

标题|内容
----|----
类型|通用
支持布局|N/A
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-fh-async/mip-fh-async.js

## 示例
基本用法

```html
<style mip-custom>
    .active {
        color: red;
    }
</style>

<button on="tap:mip-fh-async.send">
    <span>
        click me!
    </span>
</button>

<mip-fh-async id="mip-fh-async" url="https://partners.fh21.com.cn/partners/showcodejsonp?callback=?" data='{"ab": "test"}' block="div#xxoo" active-class="active"></mip-fh-async>

<div id="xxoo"></div>
```

## 属性

### url 

说明：ajax请求路径
必填：是
类型: string

### data

说明：ajax请求所需参数
必填：否
类型：json

### block

说明：需要填充渲染的容器，合法的zepto选择器
必填：否
类型：string

### active-class
说明：为事件绑定节点元素添加请求活跃中的class
必填：否
类型：string
