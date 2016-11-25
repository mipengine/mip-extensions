# mip-xem-comment-duoshuo

mip-xem-comment-duoshuo 多说评论框通用代码稳定版组件。

标题|内容
----|----
类型|通用,评论框
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-xem-comment-duoshuo/mip-xem-comment-duoshuo.js

## 示例

### 基本使用
```html
<mip-xem-comment-duoshuo short_name="official">
    <div class="ds-thread" data-thread-key="44498613" data-title="15款未来电子产品礼物" data-url="http://tech.ifeng.com/a/20161123/44498613_0.shtml">
	</div>
</mip-xem-comment-duoshuo>
```

## 属性

### short_name

说明：多说站点域名前缀  
必选项：是  
类型：字符串   

### data-thread-key

说明：评论框所在页面的唯一标识符  
必选项：否  
类型：字符串  

### data-title

说明：评论框所在页面的标题  
必选项：否  
类型：字符串  

### data-url

说明：评论框所在页面的url  
必选项：否  
类型：字符串  
