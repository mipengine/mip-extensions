# mip-cngold-ajax_table

mip-cngold-ajax_table 传入参数组装API查询后，填充表格

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-cngold-ajax_table/mip-cngold-ajax_table.js

## 示例

### 基本用法
```html
<mip-cngold-ajax_table codes="JO_190" pramas="" url="https://api.jijinhao.com/quoteCenter/realTime.htm" >
    <table>
        <tr>
            <td id="JO_190q70">sdaf</td>
            <td id="JO_190q93">45646</td>
            <td id="JO_190q83">564</td>
            <td id="JO_190q89">5446</td>
        <tr>
    </table>
</mip-cngold-ajax_table>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否} codes 必选 查询代码的参数 pramas可选 必须手动把拼接字符串写上 &pagesize=10
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

