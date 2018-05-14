# mip-ad-ecom

mip-ad-ecom 百度凤巢广告组件，仅在百度搜索来源的MIP页中生效。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ad-ecom/mip-ad-ecom.js

## 示例

### 基本用法
```html
<mip-ad-ecom layout="fixed-height" height="343">
    <script type="application/json">
        {
            "accid": "e2217bab684fbb898dccf04b",
            "title": "%E8%BF%99%E9%87%8C%E6%98%AF%E6%A0%87%E9%A2%98"
        }
    </script>
</mip-ad-ecom>
```

## 属性


### accid

说明：分润平台帐号ID，暂时需要联系百度 PM 手工申请   
必选项：是   
类型：字符串  
取值范围：无  
单位：无   
默认值：无   
 
### title

说明：页面内容标题，需要对中文编码（encodeURIComponent）   
必选项：是   
类型：字符串   
取值范围：无   
单位：无   
默认值：无  

## 注意事项

