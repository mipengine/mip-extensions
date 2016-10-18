# mip-sample

mip-sample 实现了一个简单的卡牌元素，手指滑过卡牌时可向滑动方向翻牌。

可用性|稳定
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1.2/mip-fixed.js

## 示例

### 单卡牌式
```html
<mip-sample delay="100" duration="1000">
    <div class="mip-sample-front">正面内容</div>
    <div class="mip-sample-back">反面内容</div>
</mip-sample>
```

### 多卡牌式

可支持多张卡牌，最后一张为不可翻卡牌。

```html
<mip-sample duration="1000">
    <div class="mip-sample-list">第一张</div>
    <div class="mip-sample-list">第二张</div>
    <div class="mip-sample-list">第三张</div>
    <div class="mip-sample-list">第四张</div>
    <div class="mip-sample-list">第五张</div>
    <div class="mip-sample-list">第六张</div>
    <div class="mip-sample-list">第七张</div>
    <div class="mip-sample-list">第八张</div>
    <div class="mip-sample-list">第九张</div>
    <div class="mip-sample-list mip-sample-list-last">最后一张</div>
</mip-sample>
```

## 属性

### delay

说明：延迟翻转
必选项：否  
类型：数字  
取值范围：>0  
单位：毫秒(ms)  
默认值：0

### duration

说明：动画持续时间  
必选项：否  
类型：数字  
取值范围：>0  
单位：毫秒(ms)  
默认值：400 

## 注意事项  

单卡牌式与多卡牌式有冲突，两者有冲突，任选其一。
