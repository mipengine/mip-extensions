# mip-ajax-carousel

mip-ajax-carousel 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ajax-carousel/mip-ajax-carousel.js

## 示例

### 基本用法
```html
<mip-ajax-carousel mip-ajax-params=url>
   <mip-carousel>
       <mip-img class="casousel-img0">
       <mip-img class="casousel-img1">
       <mip-img class="casousel-img2">
   </mip-carousel>
</mip-ajax-carousel>
```

## 属性

### {mip-ajax-params}

说明：{地址}
必选项：{是}
类型：{string}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

确定好共多少张图片，mip-img的class属性，异步返回的数据格式要注意。