# mip-semi-fixed 滑动悬浮组件 

position:sticky的js兼容版本。页面元素滑动到顶部时自动贴顶。  

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-semi-fixed/mip-semi-fixed.js

## 示例

### 基本用法

```html
<mip-semi-fixed id="semi-fixed" fixedClassNames="fixedStyle">
    <div mip-semi-fixed-container class="absoluteStyle">
        MIP-SEMI-FIXED MIP-SEMI-FIXED
    </div>
</mip-semi-fixed>
```

### 设置 fixed 时距离页面顶部的阈值

```html
<mip-semi-fixed id="semi-fixed" threshold="150" fixedClassNames="fixedStyle">
    <div mip-semi-fixed-container class="absoluteStyle">
        MIP-SEMI-FIXED MIP-SEMI-FIXED
    </div>
</mip-semi-fixed>
```

## 属性

### threshold

说明：元素 fixed 状态时距离页面顶部的距离  
必选项：否  
类型：整数  
取值范围：无  
单位：无  
默认值：0

### fixedClassNames

说明：元素 fixed 状态时需要添加的类  
必选项：否  
类型：字符串   
取值范围：无  
单位：无  
默认值：''  

## 子节点

### div[mip-semi-fixed-container]  

说明：所有 html 需要放在这个节点中  
必选项：是  
类型：DOM 节点  
取值范围：无  
单位：无  
默认值：div[mip-semi-fixed-container]  



