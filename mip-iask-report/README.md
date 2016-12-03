# mip-iask-report

爱问详细页举报插件

描述|问题详细页当中用于举报问题回答js脚本
----|----
类型|业务
支持布局| N/S
所需脚本| https://mipcache.bdstatic.com/static/v1/mip-iask-ext/mip-iask-ext.js
		  https://mipcache.bdstatic.com/static/v1/mip-iask-report/mip-iask-report.js

## 示例

<span class="report-link" id="answer_${a.id }">举报</span>
<mip-iask-report questionId="${q.id }" type="answer" typeId="${a.id }"></mip-iask-report>


## 属性

### questionId 

说明：问题ID
必选项：是
类型：字符串

### type

说明：举报的类型
必选项：是
类型：question  answer 

### typeId

说明：类型的ID 类型为question则是问题ID 类型为answer则是回答ID
必选项：是
类型：字符串
