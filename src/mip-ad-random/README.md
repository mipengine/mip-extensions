# mip-ad-random

mip-ad-random 用来支持携景财富网的mip广告位置随机显示。

标题|提供了一个随机位置让广告展示
----|----
类型|广告
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://github.com/weiling0626/weiling666/blob/master/mip-ad-random.js

## 示例

### 广告位置随机显示

```html
<mip-ad-random  data-parents="con" ad-href="//m.baidu.com/s?word=百度" ad-width="400" ad-height="80" ad-src="http://img0.xiejing.com/static/uploads/allimg/201610/25/1477410406737904.png" ad-class="ad1" ad-title="广告标题">
</mip-ad-random>
```

提示: 参与随机位置的标签里面都加上与data-parents中参数一致的类。


## 属性

### data-parent
说明：与参与随机位置标签建立联系的自定义属性  
必选项：是  
类型：字符串  

### ad-href
说明：广告图片来源  
必选项：是  
类型：字符串

### ad-src
说明：广告图片地址  
必选项：是  
类型：字符串 

### ad-width
说明：广告所占宽度  
必选项：是  
类型：数字   
取值范围：>0  
单位： px
默认值：400 

### ad-height
说明：广告所占高度  
必选项：是  
类型：数字   
取值范围：>0  
单位： px
默认值：80 

### ad-class
说明：调整广告mip广告的样式名  
必选项：否

### ad-title
说明：广告标题  
必选项：否  

