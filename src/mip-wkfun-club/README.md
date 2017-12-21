# mip-wkfun-club

寻医问药页面功能组件，提供了一些dom操作功能

标题|内容
----|----
类型|dom操作组件
支持布局| N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-wkfun-club/mip-wkfun-club.js

## 示例

只需要一个`mip-wkfun-club标签即可`，无须其他填充dom

```
<mip-wkfun-club url="http://3g.xywy.com" pid="110" subject="110" subject_pid="115" qtagname="" sta="1"></mip-wkfun-club>
```

## 属性

### url

说明：数据url
必填：是
格式：字符串
取值：合法的url

### pid

说明：提问id
必填：是
格式：数字
取值：数字

### subject

说明：二级科室id
必填：是
格式：数字
取值：数字

### subject_pid

说明：一级科室id
必填：是
格式：数字
取值：数字

### qtagname

说明：广告tagname
必填：否
格式：字符串
取值：字符串

### sta

说明：广告状态码
必填：是
格式：数字
取值：数字