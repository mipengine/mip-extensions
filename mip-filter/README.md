# mip-filter

筛选组件，自适应pc和wise宽度。mipengine.org有引用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|--

## 示例

```html
<mip-filter>
    <sidebar class="filter">
        <div class="filter-result"></div>
        <ul class="filter-list">
            <li class="filter-title">
                <div class="filter-link" data-filtertype="all">查看全部<span class="filter-num">3</span></div>
            </li>
            <li class="filter-title">
                <div class="filter-link" data-filtertype="widget">组件<span class="filter-num">2</span></div>
            </li>
            <li class="filter-title">
                <div class="filter-link" data-filtertype="layout">组件布局<span class="filter-num">1</span></div>
            </li>
        </ul>
    </sidebar>
    <div class="timeline-content-wrap">
        <div class="timeline-content filter-item" data-filtertype="widget">
            <span class="timeline-title">(widget) 组件新增</span>
        </div>
        <div class="timeline-content filter-item" data-filtertype="layout">
            <span class="timeline-title">(layout)广告组件 layout 升级</span> 
        </div>
        <div class="timeline-content filter-item" data-filtertype="widget">
            <span class="timeline-title">(widget)测试版发布</span>
        </div>
    </div>
</mip-filter>
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

1、单卡牌与多卡牌有冲突。  
2、mip-sample-list-last 的作用是翻牌时保留最后一张，不加也不会有问题。
