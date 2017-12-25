@@ -0,0 +1,38 @@
# mip-emcs
mip-ecms 帝国cms,整合包主要包括ecms中调用的js如点赞,阅读量,评论等。

标题|内容
----|----
类型|定制
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-ecms/mip-ecms.js

## 示例1

### 5 内容页点赞。
```html
<mip-ecms-zan ecms-classid="1" ecms-id="1" ecms-type="5" class="favorite">
  <span class="count">点赞数</span>
</mip-ecms-zan>
```
## 示例2

### 评论验证码点击刷新
```html
 <mip-img src="验证码URL" name="KeyImg" id="KeyImg" align="bottom" alt="看不清楚,点击刷新"></mip-img>
```
## 示例3

### 回滚页面顶部
```html
<div class="scroll" id="scroll"> ︿</div>
```
## 示例4

### 百度站内搜索
```html
<mip-form class="search" method="get" url="页面url">
    <input class="text" type="text" name="s" data-sid="百度站内搜索密匙" id="bdcsMain" placeholder=" 请输入关键词" value="">
    <input class="butto" value="" target="_blank"type="submit">
</mip-form>
```
## 示例4

### 悬浮24小时热文
```html
<div class="sitebar_list">悬浮内容</div>
```
## 属性

### ecms-type

说明：选择使用方法  
必选项：是  
取值范围：5  
默认值：5  

### ecms-classid

说明：栏目ID  
必选项：是  
ecms-type：5  

### ecms-id

说明：文章ID 
必选项：是 
类型：整数  
ecms-type：5 

### 回滚顶部
说明：class="scroll"和id="scroll"
必选项：是

### 评论验证码
说明：id="KeyImg"根据id KeyImg进行动态刷新
必选项：是

### 百度站内搜索
说明：input中的id="bdcsMain"
必选项：是

说明: sid="密匙" 百度站内搜索密匙
必选项：是

### 悬浮24小时热文
说明：需要悬浮的div添加class="sitebar_list"
必选项：是
