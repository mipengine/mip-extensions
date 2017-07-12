# mip-chinacn-filter

mip-chinacn-filter 根据不同条件过滤产品

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-chinacn-filter/mip-chinacn-filter.js

## 示例

### 基本用法
```html
<mip-chinacn-filter mask-control="show">
    <div class="screen-conditions">
        <ul>
            <li>
                <span>地区<i class="mip-icon"></i></span>
                <div class="screen-box">
                    <dl single="true">
                        <dd><span class="mip-site-item" d-d="10" d-g="area">1</span></dd>
                        <dd><span class="mip-site-item" d-d="11" d-g="area">2</span></dd>
                        <dd><span class="mip-site-item" d-d="12" d-g="area">3</span></dd>
                        <dd><span class="mip-site-item" d-d="13" d-g="area">4</span></dd>
                        <dd><span class="mip-site-item" d-d="14" d-g="area">5</span></dd>
                    </dl>
                    <div class="btn-float">
                        <span class="mip-clear">重置</span>
                        <span class="mip-sure">确定</span>
                    </div>
                </div>
            </li>
            <li>
                <span>品牌<i class="mip-icon"></i></span>
                <div class="screen-box">
                    <dl>
                        <dd><span class="mip-site-item" d-d="11" d-g="attrId">11</span></dd>
                        <dd><span class="mip-site-item" d-d="12" d-g="attrId">22</span></dd>
                        <dd><span class="mip-site-item" d-d="13" d-g="attrId">33</span></dd>
                        <dd><span class="mip-site-item" d-d="14" d-g="attrId">44</span></dd>
                        <dd><span class="mip-site-item" d-d="15" d-g="attrId">55</span></dd>
                    </dl>
                    <div class="btn-float">
                        <span class="mip-clear">重置</span>
                        <span class="mip-sure">确定</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</mip-chinacn-filter>
<div class="opacity-layer"></div>
```

## 属性

### mask-control

说明：遮罩层显示是添加到class
必选项：是
类型：string
取值范围：show

## 注意事项

