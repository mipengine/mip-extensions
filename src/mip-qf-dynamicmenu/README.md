# mip-qf-dynamicmenu

mip-qf-dynamicmenu 点击刷新页面，选中元素自动居中(注意必须使用rem单位,750的设计稿)

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-dynamicmenu/mip-qf-dynamicmenu.js

## 示例

### 基本用法
```html
<mip-qf-dynamicmenu>
    <ul class="list-scroll" style="margin-left: 0rem;">
    <li><a href="">热门</a></li>
    <li><a href="">最新</a></li>
    <li><a href="">2018</a></li>
    <li><a href="">好玩</a></li>
    <li><a href="">安卓</a></li>
    <li><a href="">苹果</a></li>
    <li class="active"><a href="">仙侠</a></li>
    <li><a href="">传奇</a></li>
    <li><a href="">前十名</a></li>
    <li><a href="">RPG</a></li>
    <li><a href="">策略</a></li>
    <li><a href="">回合</a></li>
    <li><a href="">卡牌</a></li>
    <li><a href="">三国</a></li>
    <li><a href="">动作</a></li>
    <li><a href="">3D</a></li>
    <li><a href="">经典</a></li>
    <li><a href="">双端</a></li>
    <li><a href="">推荐</a></li>
    </ul>
</mip-qf-dynamicmenu>
```

## 属性

### style

说明：初始位置，在代码中替换掉行内样式即可
必选项：必填
类型：字符串
单位：{rem}
默认值：{0}
格式：{marginLeft: 0rem;}

## 注意事项

