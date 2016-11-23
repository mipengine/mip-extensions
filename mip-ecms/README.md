@@ -0,0 +1,38 @@
# mip-emcs
mip-ecms 帝国cms,整合包。

标题|内容
----|----
类型|定制
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-emcs/mip-emcs.js

## 示例

### 5 内容页点赞。
```html
<mip-ecms-zan ecms-classid="1" ecms-id="1" ecms-type="5">
  <span>点赞数</span>
</mip-html-tabs>
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