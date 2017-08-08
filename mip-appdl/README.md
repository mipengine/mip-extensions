# mip-appdl App 下载

App 下载，可区分安卓和 iOS。

标题|内容
----|----
类型| 通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-appdl/mip-appdl.js

## 示例

### 有图样式

```html
<mip-appdl 
	tpl="imageText" 
	src="http://ms0.meituan.net/touch/css/i/logo.png" 
	texttip= "['积分能当钱花了','下载百度浏览器','下载百度浏览器']" 
	downbtntext="立即使用" 
	Other-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk"
	Android-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk" 
	Ios-downsrc="itms-apps://itunes.apple.com/app/id452186370" postiontye="fixed"
></mip-appdl>
```

### 固定位置

- 使用 悬浮组件支持

```html
<mip-fixed type="bottom">
	<mip-appdl 
		tpl="imageText" 
		src="http://ms0.meituan.net/touch/css/i/logo.png" 
		texttip= "['积分能当钱花了','下载百度浏览器','下载百度浏览器']" 
		downbtntext="立即使用" 
		Other-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk"
		Android-downsrc="http://sqdd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk" 
		Ios-downsrc="itms-apps://itunes.apple.com/app/id452186370" postiontye="fixed"
	></mip-appdl>
</mip-fixed>
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
使用限制：直接下载需要传递apk直接下载路径否则可传下载页路径.如果对应系统没有下载链接则显示默认链接

### Ios-downsrc

说明：ios下载路径
必填：否
格式：字符串
取值：url 类型
使用限制：必须填写appstore下载路径(itms-apps://itunes.apple.com/app/id452186370)或者下载页路径，如果对应系统没有下载链接则显示默认链接

### Other-downsrc

说明：其他设备下载路径
必填：否
格式：字符串
取值：url 类型
使用限制：如果对应系统没有下载链接时显示默认链接
