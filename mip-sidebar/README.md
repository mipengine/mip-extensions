# mip-sidebar 侧边栏

侧边栏组件，点击按钮，侧边栏滑入屏幕。

标题|内容
----|----
类型|通用
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-sidebar/mip-sidebar.js

## 示例

### 基本使用

```html
<header>
    <div id="hamburger" class="mip-button" on="tap:sidebar.open">
      <div id="logo" href="/">Open mip-sidebar</div>
    </div>
</header>
<mip-sidebar 
    id='sidebar'
    layout="nodisplay"
    class="mip-hidden">
    <ul>
      <li>
        <mip-link href="#">Home</mip-link>
        <button class="mip-button" on="tap:sidebar.close"> X </button>
      </li>
      <li> Nav item 1</li>
      <li>
        <mip-fit-text width="220"
            height="20"
            layout="responsive"
            max-font-size="24">
          Nav item 2 - &lt;mip-fit-text&gt;
        </mip-fit-text>
      </li>
      <li>
        <mip-fit-text width="220"
            height="20"
            layout="responsive"
            max-font-size="24">
          Nav item 3 - &lt;mip-fit-text&gt; longer text
        </mip-fit-text>
      </li>
      <li> Nav item 4 - Image
        <mip-img class='mip-sidebar-image'
            src="http://placeholder.qiniudn.com/100x50"
            width="20"
            height="20"
            alt="an image"></mip-img>
      </li>
      <li> Nav item 5</li>
      <li> Nav item 6</li>
    </ul>
</mip-sidebar>
```

### 右侧侧边栏

```html
<header>
    <div id="hamburger" class="mip-button" on="tap:right-sidebar.open">
      <div id="logo" href="/">Open mip-sidebar</div>
    </div>
</header>
<mip-sidebar 
    id='right-sidebar'
    layout="nodisplay"
    side="right"
    class="mip-hidden">
    <ul>
      <li>
        <mip-link href="#">Home</mip-link>
        <button class="mip-button" on="tap:right-sidebar.close"> X </button>
      </li>
      <li> Nav item 1</li>
      <li>
        <mip-fit-text width="220"
            height="20"
            layout="responsive"
            max-font-size="24">
          Nav item 2 - &lt;mip-fit-text&gt;
        </mip-fit-text>
      </li>
      <li>
        <mip-fit-text width="220"
            height="20"
            layout="responsive"
            max-font-size="24">
          Nav item 3 - &lt;mip-fit-text&gt; longer text
        </mip-fit-text>
      </li>
      <li> Nav item 4 - Image
        <mip-img class='mip-sidebar-image'
            src="http://placeholder.qiniudn.com/100x50"
            width="20"
            height="20"
            alt="an image"></mip-img>
      </li>
      <li> Nav item 5</li>
      <li> Nav item 6</li>
    </ul>
</mip-sidebar>
```

## 属性

### id

说明：id    
必填：是    
格式：字符串      
单位：无   
默认值：无 
使用限制：无

### layout

说明：布局设定    
必填：是    
格式：字符串      
单位：无   
取值：nodisplay

### side

说明：侧边栏位置设定，左边或者右边   
必填：否    
格式：字符串      
单位：无   
取值：left, right  
默认值：left
