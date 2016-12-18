# mip-bsml-form

mip-bsml-form bsml表单组件。

标题|内容
----|----
类型|通用
支持布局|container,
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-bsml-form/mip-bsml-form.js

## 示例

### 基本使用

```html
<mip-bsml-form method="get" type="trans-form" url="http://10.48.55.121:8007/feedflow/form/submit">
    <ul class="bsml-form-list">
        <li>
            <label>
                <span>姓名</span>
                <input class="bsml-input" name="name" type="text" placeholder="请输入您的称呼" />
            </label>
        </li>
        <li>
            <label>
                <span>日历</span>
                <input class="bsml-date" name="data"  type="date" placeholder="选择日期" />
            </label>
        </li>
    </ul>
    <div class="bsml-form-list-box">
        <div class="bsml-form-list-submit" data-ucid="ucId" data-pageid="pageId">立即预约</div>
    </div>
    <div class="bsml-form-tips"></div>
</mip-bsml-form>
```


## 属性

### method

说明：表单提交方法  
必选项：是  

### url

说明：表单提交url   
必选项: 是  

### type

说明：组件提交类型
必选项: 是

