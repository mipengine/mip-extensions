# mip-wygx-classtab

mip-wygx-classtab 用于多按钮，多样式绑定切换

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-wygx-classtab/mip-wygx-classtab.js

## 示例

### 基本用法
```html
<mip-wygx-classtab bind-to=".box">
    <span toggle-class="round">round</span>
    <span toggle-class="square">square</span>
    <span toggle-class="yellow">yellow</span>
    <span toggle-class="green">green</span>
</mip-wygx-classtab>

<div class="box"></div>
<div class="box"></div>

<hr/>

<mip-wygx-classtab bind-to=".box1">
    <span toggle-class="round">round</span>
    <span toggle-class="square">square</span>
</mip-wygx-classtab>
<mip-wygx-classtab bind-to=".box1">
 	<span toggle-class="yellow">yellow</span>
    <span toggle-class="green">green</span>
</mip-wygx-classtab>
<div class="box1"></div>
<div class="box1"></div>


```

## 属性

### bind-to
说明：绑定元素的选择器(css选择器) 
必选项：是
类型：string

### toggle-class
说明： 需要指定切换的类名
必选项：是
类型：string

## 注意事项
1. 样例中的类名并非实际所需，只是方便测试添加
2. 绑定元素中不能含有和即将绑定的类名同名的class, 同名后者覆盖
3. 被绑定元素不宜过多，会影响性能
4. 注意css权重问题
