# mip-lmb-script

mip-lmb-script 辣妈帮mip改造组件

标题|内容
----|----
类型|通用
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-lmb-script/mip-lmb-script.js

## 示例

### 使用列子
```html
		<mip-lmb-script id="lmb-script"></mip-lmb-script>
		<div on="tap:lmb-script.urlJump(url)">URL跳转</div>
		<span class="close" id="closeId" on="tap:lmb-script.close(closeId)">点我关闭×</span>
		<div  id="toggleId" on="tap:lmb-script.toggleEle(toggleId)">点我切换显示×××</div>
```

## 属性
### url

说明：跳转地址
必选项：是   
类型：url字符串
单位：无   
默认值：无   


## 属性
### closeId
说明：要关闭元素的ID
必选项：是   
类型：字符串
单位：无   
默认值：无   



## 属性
### toggleId

说明：要切换显示的元素id
必选项：是   
类型：字符串
单位：无   
默认值：无   








