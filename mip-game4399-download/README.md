# mip-game4399-download

mip-game4399-download 实现了简单的游戏下载控件。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-game4399-download/mip-game4399-download.js

## 示例

### 下载控件
```html
<mip-game4399-download texttip= "['球球大作战']" downbtntext="下载" other-downsrc="http://a.4399.cn/mobile/82714.html" android-downsrc="http://a.4399.cn/mobile/82714.html"  ios-downsrc="http://i.4399.cn/mobile/161515.html"></mip-game4399-download>
```

## 属性

### texttip

说明：按钮名称
必选项：否  
类型：字符型

### downbtntext

说明：下载按钮按钮
必选项：必须
类型：字符型

### other-downsrc

说明：如果不是安卓或者IOS的下载链接，如果没有填写，则默认调用安卓下载地址
必选项：否
类型：字符型

### android-downsrc
说明：安卓的下载地址
必选项：必须
类型：字符型

### ios-downsrc
说明：IOS的下载地址
必选项：必须
类型：字符型