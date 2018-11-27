# mip-qf-dlbtn

mip-qf-dlbtn 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-dlbtn/mip-qf-dlbtn.js

## 示例

可自行填写下载按钮内文字

```html
<mip-qf-dlbtn data-gameid="111" data-href="aaa" data-isbp="0">
  <a>下载</a>
</mip-qf-dlbtn>
```
## 属性

### data-isbp

说明：是否越狱
必填：是
格式：字符串
取值：`0`, `1`

### data-gameid

说明：游戏id
必填：否
格式：数字

### data-href

说明：下载路径
必填：是
格式：字符串
取值：URL类型
使用限制：如果对应系统没有下载链接会显示无包样式

## 注意事项

