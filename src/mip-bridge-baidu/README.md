# mip-bridge-baidu

安装百度商桥代码，引入百度商桥功能。

标题|内容
----|----
类型| 通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-bridge-baidu/mip-bridge-baidu.js

## 说明

百度商桥组件引入百度商桥功能，有两种方式： 1. 通过参数siteId直接引入商桥 2. 通过百度统计引入商桥功能，token 。两种方式选择一种

## 示例

### 直接引入商桥(通过siteId)

```html
<mip-bridge-baidu siteId="10400900">
</mip-bridge-baidu>
```
### 通过百度统计引入商桥(token)

```html
<mip-bridge-baidu token="735002eae3339d3b01f6508d8c500d29">
</mip-bridge-baidu>
```

## 属性

### siteId

说明：站点id，在商桥客户端中获取，可在独立沟通链接中获取参数
必填：否  
格式：字符串 

### token

说明：商桥统计token，在商桥客户端中获取代码，可以获取hm.js？后的字符串
必填：否  
格式：字符串
 