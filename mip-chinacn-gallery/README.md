# mip-chinacn-gallery

mip-chinacn-gallery 可滑动的图片列表

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-chinacn-gallery/mip-chinacn-gallery.js

## 示例

### 基本用法
```html
<mip-chinacn-gallery num="5" between="5">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">1</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">2</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">3</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">4</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">5</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">6</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#" class="current">7</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">8</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">9</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">10</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">11</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">12</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">13</a>
            </div>
            <div class="swiper-slide">
                <a data-type="mip" data-title="目标页面标题" href="#">14</a>
            </div>
        </div>
    </div>
</mip-chinacn-gallery>
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

