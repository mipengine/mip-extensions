# mip-wkad

寻医问药广告组件

描述|提供了一个广告容器用来显示寻医广告
----|----
类型|广告
支持布局| N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-wkad/mip-wkad.js

## 示例

只需要一个`<mip-wkad>`标签，无须其他填充dom

```
<mip-wkad el='mobile_zhuanti_400_zixun_div' ads='["var keys_arr={};","keys_arr[\"mobile_zhuanti_400_zixun\"]","=","\"mobile_zhuanti_400_zixun\""]'></mip-wkad>
```

## 属性

### el

说明：广告容器
必填：是
格式：className
取值：不限

### ads

说明：广告配置参数
必填：是
格式：标准json格式
取值：字符串
