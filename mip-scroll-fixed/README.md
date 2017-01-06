# mip-scroll-fixed

mip-scroll-fixed 实现当用户向上或向下滚动页面到一定位置时，目标元素开始固定定位，当回滚到原位置时目标元素恢复到原状态，可定制触发滚动方向及距离顶部或底部的距离。

标题|内容
----|----
类型|通用
支持布局|不支持
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-scroll-fixed/mip-scroll-fixed.js

## 示例

### 随着页面滚动元素固定在屏幕顶部
```html
<style mip-custom>
    .container {
        height: 2000px;
        background: linear-gradient(#fff, #666);
        padding-top: 400px;
    }
    .content {
        width: 200px;
        height: 50px;
        background-color: red;
        color: #fff;
    }
</style>
<div class="container">
    <mip-scroll-fixed direction="top" interval="10">
        <div class="content">可嵌套任何内容</div>
    </mip-scroll-fixed>
</div>
```

## 属性

### direction

说明：选择固定在顶部或底部  
必选项：否  
类型：string  
取值范围：bottom/top  
默认值：top  

### interval

说明：设定距离顶部或底部的距离  
必选项：否  
类型：数字  
取值范围：>=0  
默认值：0  

## 注意事项  

1、无特殊需求直接使用 mip-scroll-fixed 标签即可，无需设置属性
