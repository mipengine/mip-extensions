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
<mip-qf-dlbtn  prefix="https://m.119you.com/" ipa-href="fgame/dlstat?gid=160294&type=ipa&cp=112&jailbreak=N&source=m_rank_indextop3" apk-href="fgame/dlstat?gid=163183&type=apk&cp=7&jailbreak=N&source=m_rank_indextop3" data-isbp="0" game-href="api/aaa/redirect?advid=1033" ipa-prefix-mb="guide/mbInstruction.shtml?link=/" ipa-prefix-nomb="guide/usInstruction.shtml?link=/" data-asoTest="N">下载</mip-qf-dlbtn>
```
## 属性

### prefix

说明：下载地址前缀
必填：是
格式：URL类型

### ipa-href

说明：ios原始下载路径
必填：是
格式：字符串
取值：URL类型
使用限制：如果对应系统没有下载链接会显示无包样式

### apk-href
说明：安卓原始下载路径
必填：是
格式：字符串
取值：URL类型
使用限制：如果对应游戏没有下载链接会显示无包样式

### data-isbp

说明：是否越狱
必填：是
格式：字符串
取值：`0`, `1`

### game-href

说明：游戏详情页原始路径
必填：否
格式：字符串
取值：URL类型

### ipa-prefix-mb

说明：ios越狱包手机百度引导页原始地址
必填：是
格式：字符串
取值：URL类型

### ipa-prefix-nomb

说明：ios越狱包手机百度引导页原始地址
必填：是
格式：字符串
取值：URL类型

### data-asoTest

说明：测试字段
必填：是
格式：字符串
取值：`Y`, `N`

## 注意事项
