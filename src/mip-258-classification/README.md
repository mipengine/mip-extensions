# mip-258-classification

mip-258-classification 筛选组件

标题|内容
----|----
类型|通用
支持布局|fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-classification/mip-258-classification.js

## 示例
```html
<mip-258-classification url="http://m.v2.258.com/testapi" id="forms">
    <form >
        <input type="reset" style="display:none;" />
        <ul>
            <li class="mip-all mip-active">综合</li>
            <li class="mip-select">
                <select name="price">
                    <option value="0">价格不限</option>
                    <option value="1" selected="selected">价格降序</option>
                    <option value="2">价格升序</option>
                </select>
            </li>
            <li class="mip-select">
                <select name="area">
                    <option value="0">所有地区</option>
                    <option value="1">北京</option>
                    <option value="2">上海</option>
                </select>
            </li>
            <li class="mip-select">
                <select name="business">
                    <option value="0">经营模式</option>
                    <option value="1">生成厂家</option>
                    <option value="2">经销批发</option>
                    <option value="3">商务服务</option>
                    <option value="4">招商代理</option>
                    <option value="5">其他类型</option>
                </select>
            </li>
        </ul>
    </form>
</mip-258-classification>
```

## 属性

### url

说明：表单提交地址
必选项：是
类型：字符串
取值范围：get
默认值：无

### id

说明：唯一值
必选项：是
类型：字符串
取值范围：无
默认值：无

## 注意事项

