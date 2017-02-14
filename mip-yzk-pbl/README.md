# mip-yzk-pbl

mip-yzk-pbl 组件说明

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/mip-yzk-pbl/{版本号}/mip-yzk-pbl.js

## 示例

### 基本用法
```html
<mip-yzk-pbl data-column="2">
    <div class="rows">
        <mip-img 
            layout="responsive" 
            width="350"
            height="263"
            class="img"
            src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
        </mip-img>
    </div>
    <div class="rows">
        <mip-img 
            layout="responsive" 
            width="734"
            height="299"
            class="img"
            src="https://www.uumnt.com/1.jpg">
        </mip-img>
    </div>
    <div class="rows">
        <mip-img 
            layout="responsive" 
            width="173"
            height="249"
            class="img"
            src="https://www.uumnt.com/2.jpg">
        </mip-img>
    </div>
    <div class="rows">
        <mip-img 
            layout="responsive" 
            width="350"
            height="263"
            class="img"
            src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg">
        </mip-img>
    </div>
    <div class="rows">
        <mip-img 
            layout="responsive" 
            width="734"
            height="299"
            class="img"
            src="https://www.uumnt.com/1.jpg">
        </mip-img>
    </div>
    <div class="rows">
        <mip-img 
            layout="responsive" 
            width="173"
            height="249"
            class="img"
            src="https://www.uumnt.com/2.jpg">
        </mip-img>
    </div>
    
</mip-yzk-pbl>
```

## 属性

### data-column

说明：每行的数量
必选项：是
类型：数字  
取值范围：>0

## 注意事项

1. mip-yzk-pbl下每个元素的div的class属性必须有rows