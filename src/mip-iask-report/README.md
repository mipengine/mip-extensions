# mip-iask-report

mip-iask-report 打开举报div

标题|内容
----|----
类型|通用
支持布局|N,S|
所需脚本|https://c.mipcdn.com/static/v1/mip-iask-report/mip-iask-report.js

## 示例

### 基本用法
```html
<span class="report-link" id="answer_${a.id }">举报</span>
<mip-iask-report questionId="${q.id }" type="answer" typeId="${a.id }"></mip-iask-report>

## 属性

### questionId

说明：问题ID
必选项：是
类型：字符串
## 注意事项

### type

说明：举报的类型
必选项：是
类型：question answer 

### typeId

说明：类型的ID 类型为question则是问题ID 类型为answer则是回答ID
必选项：是
类型：字符串
