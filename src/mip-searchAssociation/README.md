# mip-searchAssociation

`<mip-searchAssociation>` 实现搜索联想

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-searchAssociation/mip-searchAssociation.js

## 示例

### 基本用法

```html
<mip-searchAssociation data-src="XXX" class="result-list-con">
    <div class="search-search">
        <div class="search-box">
            <span></span>
            <input  class="mip-list-more" type="text" autocomplete="off" />
            <span></span>
        </div>
        <button on="tap:home-right-sidebar.close">取消</button>
    </div>
    <ul class="result-list"><ul>
</mip-searchAssociation>
\```

##属性
{data-src}
说明：{后台地址}
必选项：{是}
类型：{字符串}
