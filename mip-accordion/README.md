# mip-accordion

mip-accordion 用来支持在 mip折叠隐藏的节点(可记录用户上次行为)

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-accordion/mip-accordion.js

## 示例

### 标题加内容形式

```html
<mip-accordion sessions-key="mip_1">
    <section>
        <h4>下拉第一个</h4>
        <p>我说你是人间的四月天；笑声点亮了四面风；轻灵在春的光艳中交舞着变。你是四月早天里的云烟，黄昏吹着风的软，星子在无意中闪，</p>
    </section>
    <section  expanded="open">
        <h4>下拉第二个</h4>
        <p>细雨点洒在花前。那轻，那娉婷，你是，鲜妍百花的冠冕你戴着，你是天真，庄严，你是夜夜的月圆。</p>
    </section>
    <section>
        <h4>下拉第三个</h4>
        <mip-img layout="responsive" width="400" height="200" src="http://a2.att.hudong.com/71/04/300224654811132504044925945_950.jpg"></mip-img>
    </section>
</mip-accordion>
```

### 标题加内容形式-手动

```html
<mip-accordion sessions-key="mip_1" type="manual">
    <section>
        <h4>下拉第一个</h4>
        <p>我说你是人间的四月天；笑声点亮了四面风；轻灵在春的光艳中交舞着变。你是四月早天里的云烟，黄昏吹着风的软，星子在无意中闪，</p>
    </section>
    <section  expanded="open">
        <h4>下拉第二个</h4>
        <p>细雨点洒在花前。那轻，那娉婷，你是，鲜妍百花的冠冕你戴着，你是天真，庄严，你是夜夜的月圆。</p>
    </section>
    <section>
        <h4>下拉第三个</h4>
        <mip-img layout="responsive" width="400" height="200" src="http://a2.att.hudong.com/71/04/300224654811132504044925945_950.jpg"></mip-img>
    </section>
</mip-accordion>
```

### 标题切换形式

```html
<mip-accordion sessions-key="mip_2">
    <section>
        <h4>
          <span class="show-more">显示更多</span>
          <span class="show-less">收起</span>
          </h4>
        <p>显示显示收起收起显示显示收起收起显示显示收起收起显示显示收起收起</p>
      </section>
  </mip-accordion>
```


## 属性

## sessions-key

说明：组件唯一标识符,用于区分同个页面中多个mip-accordion以还原用户上次操作  
必选项：是  
类型：字符串

## type 

说明：类型，区分自动根据session记录展开节点，还是手动配置默认展开节点  
必选项：否     
类型：字符串   
单位：无   
取值：automatic, manual   
默认值：automatic

## expanded

说明：默认展开的 mip-accordion 子节点需要配置此属性，只有在 mip-accordion 的 type 属性值为 manual 时 才会生效      
必选项：否   
类型：字符串   
单位：无   
取值：无   
默认值：无
