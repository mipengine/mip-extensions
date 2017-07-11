# mip-gallery

mip-gallery

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-gallery/mip-gallery.js

## 示例

### 基本用法
```html
<mip-gallery num="5" between="5">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">1
            </div>
            <div class="swiper-slide">2
            </div>
            <div class="swiper-slide">3
            </div>
            <div class="swiper-slide">4
            </div>
            <div class="swiper-slide">5
            </div>
            <div class="swiper-slide">6
            </div>
            <div class="swiper-slide">7
            </div>
            <div class="swiper-slide">8
            </div>
            <div class="swiper-slide">9
            </div>
            <div class="swiper-slide">10
            </div>
        </div>
    </div>
</mip-gallery>
```

## 属性

### num

说明：设置slider容器能够同时显示的slides数量
必选项：否
类型：数字
取值范围：>0
默认值：5

### between

说明：slide之间的距离
必选项：否
类型：数字
取值范围：>0
单位：px
默认值：5

## 注意事项

