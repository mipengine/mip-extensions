# mip-258-filter

mip-258-filter 返回组件

标题|内容
----|----
类型|通用
支持布局|fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-filter/mip-258-filter.js

## 示例
### 基本使用

```html
<mip-258-filter>
    <div class="mip-filter-box">
        <div class="mip-cityBox">
        <p class="mip-small">人们公司</p>
        <div class="bgfff p10 mip-cityA">
        <input type="hidden" name="city" validatetarget="username" validatetype="must" value="">
        <span class="mip-btn" data-num="0">全部</span>
        <span class="mip-btn" data-num="1">厦门</span>
        <span class="mip-btn" data-num="2">厦门</span>
        <div class="error red" target="username">姓名不能为空</div>
        </div>
        <p class="mip-small">热门城市</p>
        <div class="bgfff p10 mip-cityA">
        <input type="hidden" name="city" value="0">
        <span class="mip-btn" data-num="0">全部</span>
        <span class="mip-btn" data-num="1">厦门</span>
        <span class="mip-btn" data-num="2">厦门</span>
        </div>
        </div>
        <div class="mip-filter-btn flex">
        <div class="mip-btn flexLi mip-reset">重置</div>
        <button type="sumbit" class="mip-btn Themebg flexLi">确认</button>
        </div>
    </div>
</mip-258-filter>
```
## 属性

