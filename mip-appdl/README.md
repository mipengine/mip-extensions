# mip-appdl

mip-appdl 用来支持在 mip 中app的下载

描述|提供了一个mip中app的下载容器.
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1.1/mip-appdl.js

## 示例

```
<mip-appdl 
	tpl="imageText" 
	src="http://ms0.meituan.net/touch/css/i/logo.png" 
	texttip= "['积分能当钱花了','下载百度浏览器']" 
	downbtntext="立即使用" 
	Android-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk" 
	Ios-downsrc="itms-apps://itunes.apple.com/app/id452186370" postiontye="fixed"
></mip-appdl>
```

## 属性

### tpl

说明：展示类型
必填：是
格式：字符串
取值：noneImg, imageText

### src

说明：图片地址
必填：是（if(tpl == imageText的)）
格式：字符串
取值：url 类型

### texttip

说明：显示问只能
必填：是
格式：字符串

### Android-downsrc

说明：安卓下载路径
必填：否
格式：字符串
取值：url 类型
使用限制：直接下载需要传递apk直接下载路径否则可传下载页路径.如果对应系统没有下载链接则自动不显示

### Ios-downsrc

说明：ios下载路径
必填：否
格式：字符串
取值：url 类型
使用限制：必须填写appstore下载路径(itms-apps://itunes.apple.com/app/id452186370)或者下载页路径，如果对应系统没有下载链接则自动不显示

### postiontye

说明：位置
必填：是
格式：字符串
取值：有两种位置static(在文档中的正常位置), fixed(固定在底部)
   
