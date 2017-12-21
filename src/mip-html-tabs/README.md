# **mip-html-tabs**
mip-html-tabs TAB滑动、显示、隐藏、元素跳转等操作。

标题|内容
----|----
类型|用通
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-html-tabs/mip-html-tabs.js   

## 示例

### Qi_1 当内容高度大于设置高度后展开、隐藏操作。
```html
<mip-html-tabs tabs-type="Qi_1" tabs-html="#hidebox" tabs-show=".tabs-show" tabs-hide=".tabs-hide">
  <div id="hidebox">超过隐藏部分内容（默认高度300px）</div>
  <span class="tabs-show">展开全部</span>
  <span class="tabs-hide">收起简介</span>
</mip-html-tabs>
```

### Qi_2 设置一个点击元素，执行toggle显示隐藏操作。
```html
<mip-html-tabs tabs-type="Qi_2" tabs-on="#Isck" tabs-toggle="#Istoggle1">
  <div id="Istoggle1">
    <h2>内容1</h2>
    内容1
  </div>
  <div id="Isck">点击显示或隐藏内容1</div>
</mip-html-tabs>
```

### Qi_3 设置两个点击元素，执行显示隐藏操作。
```html
<mip-html-tabs tabs-type="Qi_3" tabs-show="#Isshow2" tabs-hide="#Ishide2" tabs-toggle="#Istoggle2">
  <div id="Istoggle2">
    <h2>内容2</h2>
    内容2
  </div>
  <div id="Isshow2">点击显示内容2</div>
  <div id="Ishide2">点击隐藏内容2</div>
</mip-html-tabs>
```

### Qi_4 Tab内容切换。
```html
<mip-html-tabs tabs-type="Qi_4" tabs-nav="#nav1 ul li" tabs-key="#tab1 ul">
  <div id="nav1">
    <ul>
      <li>Tab1</li>
      <li>Tab2</li>
      <li>Tab3</li>
      <li>Tab4</li>
    </ul>
  </div>
  <div id="tab1">
    <ul>
      <li>Tab1 html</li>
    </ul>
    <ul>
      <li>Tab2 html</li>
    </ul>
    <ul>
      <li>Tab3 html</li>
    </ul>
    <ul>
      <li>Tab4 html</li>
    </ul>
  </div>
</mip-html-tabs>
```

### Qi_5 点击元素滚动事件。
```html
<mip-html-tabs tabs-type="Qi_5" tabs-key="#Istop" tabs-to="top">
  <div id="Istop">返回顶部</div>
</mip-html-tabs>
```

## 属性

### tabs-type

说明：选择使用方法  
必选项：是  
取值范围：Qi_1/Qi_2/Qi_3/Qi_4/Qi_5  
默认值：Qi_1  

### tabs-html

说明：指定超过高度需要隐藏的元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_1  

### tabs-height

说明：高度值  
必选项：否  
类型：整数（px值）  
默认值：300  
tabs-type：Qi_1  

### tabs-show

说明：指定展开按钮元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_1  

### tabs-hide

说明：指定收起按钮元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_1  

### tabs-init

说明：默认现实或隐藏  
必选项：否  
类型：整数  
取值范围：0/1  
默认值：0  
tabs-type：Qi_1  

### tabs-toggle

说明：指定显示隐藏元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_2  

### tabs-on

说明：指定点击按钮元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_2  

### tabs-init

说明：默认现实或隐藏  
必选项：否  
类型：整数  
取值范围：0/1  
默认值：0  
tabs-type：Qi_2  

### tabs-toggle

说明：指定显示隐藏元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_3  

### tabs-on

说明：指定点击按钮元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_3  

### tabs-init

说明：默认现实或隐藏  
必选项：否  
类型：整数  
取值范围：0/1  
默认值：0  
tabs-type：Qi_3  

### show-class

说明：当元素显示时添加class  
必选项：否  
类型：class类名称  
tabs-type：Qi_3  

### hide-class

说明：当元素隐藏时添加class  
必选项：否  
类型：class类名称  
tabs-type：Qi_3  

### tabs-nav

说明：指定TAB按钮元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_4  

### tabs-key

说明：指定TAB内容元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_4  

### tabs-init

说明：默认显示TAB:n内容  
必选项：否  
类型：整数  
默认值：1  
tabs-type：Qi_4  

### nav-cur

说明：当前TAB按钮添加class  
必选项：否  
类型：class类名称  
tabs-type：Qi_4  

### key-cur

说明：当前TAB内容添加class  
必选项：否  
类型：class类名称  
tabs-type：Qi_4  

### tabs-key

说明：点击按钮元素  
必选项：是  
类型：元素选择器  
tabs-type：Qi_5  

### tabs-to

说明：点击按钮元素  
必选项：是  
类型：多类型  
取值范围：top/bottom/元素选择器  
tabs-type：Qi_5  

### tabs-on

说明：点击事件元素  
必选项：否  
类型：元素选择器  
tabs-type：Qi_5  

### tabs-eq

说明：点击事件元素eq  
必选项：否  
类型：整数  
默认值：1  
tabs-type：Qi_5  

### tabs-top

说明：按钮元素超过tabs-top后值显示  
必选项：否  
类型：整数(px值)  
默认值：0  
tabs-type：Qi_5  

### tabs-of

说明：tabs-to的偏移  
必选项：否  
类型：整数/负整数(px值)  
默认值：0  
tabs-type：Qi_5  
