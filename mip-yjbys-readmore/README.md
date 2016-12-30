# mip-yjbys-readmore

mip-yjbys-readmore 自用查看更多文章内容

标题|内容
----|----
类型|通用
支持布局| N/S
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-yjbys-readmore.js

## 示例

### 基本用法
```html
<div class="content">
    <p>bla</p> <p>bla</p> <p>bla</p> <p>...</p> (此略2333字)
</div>
<mip-yjbys-readmore element=".content" maxlen="666"></mip-yjbys-readmore>
```

## 属性

### element

说明：需要控制的元素，使用jquery元素选择器语法 
必选项：否  
类型：字符串
默认值：.content

### maxlen

说明：剔除空格、html标签后的文本长度（大约）
必选项：否  
类型：正整数
默认值：666

## 注意事项  

1、仅检查"<"和">"来判断是否在html标签内，所以，如果内容包含字符"<"或">"，字数统计可能存在被坑爹的情况，请根据实际情况慎用
1.1、对与上述问题有更好的解决方法，可以email我，谢谢。