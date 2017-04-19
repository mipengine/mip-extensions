# mip-custom

mip-custom 定制化 MIP 组件，想在页面中加入定制化内容，必须引入这个组件。MIP 页面改造参考官网文档：https://www.mipengine.org/doc/00-mip-101.html。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-custom/mip-custom.js

## 示例

### 基本用法

```html
<mip-custom>
    <script type="application/json">
    {
        "accid": "34345345345",
        "title": "标题"
    }
    </script>
</mip-custom>
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

说明：页面内容标题   
必选项：是   
类型：字符串   
取值范围：无   
单位：无   
默认值：无   

## 注意事项

- 组件暂时还未上线
- 每个 MIP 页面中的定制化模板，插入之前必须准备 **accid**，需要联系百度 PM 手工申请

