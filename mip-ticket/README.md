# mip-ticket

mip-ticket 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-ticket/mip-ticket.js
http://mipcache.bdstatic.com/static/v1/mip-form/mip-form.js

## 示例

### 基本用法
```html
<mip-ticket totalpay-target="totalpay" number-target="totalnum" name-target="ticketname">
    <ul>
        <li class="mip-ticket-list" data-name="票价一" data-price="100" data-min="1" data-max="10">
            <div>
                票价一
            </div>
            <button class="mip-sub">减少</button><span class="mip-number">0</span><button class="mip-add">增加</button></li>
        <li class="mip-ticket-list" data-name="票价二" data-price="100" data-min="1" data-max="10">
            <div>
                票价一
            </div>
            <button class="mip-sub">减少</button><span class="mip-number">0</span><button class="mip-add">增加</button></li>
    </ul>
    <mip-form>
        <input type="text" id="totalpay">
        <input type="text" id="ticketname">
        <input type="text" id="totalnum">
    </mip-form>
</mip-ticket>
```

## 属性

### totalpay-target

说明：需要填充总价的元素id
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### number-target

说明：需要填充总数量的元素id
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### name-target

说明：需要填充票价名称的元素id
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### data-name

说明：票价名称
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### data-price

说明：单价
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### data-max

说明：最大购买数量
必选项：否
类型：数字
取值范围：数值
单位：无
默认值：无

### data-min

说明：最小购买数量
必选项：否
类型：数字
取值范围：数值
单位：无
默认值：无

## 注意事项

