# mip-countdown

mip-countdown 用于页面倒计时的功能实现
支持场景如下：
	1、按照结束时间点和开始时间点（可无）来进行倒计时
	2、按照固定时间长度进行倒计时，刷新页面后倒计时会重新开始

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-countdown/mip-countdown.js

## 示例

### 基本用法
```html
<mip-countdown layout="responsive" width="300" height="100" endTime="1499247000" startTime="1499245200" duration="1800">
    自定义内容，可以嵌套其他组件
    <div class="mip-countdown-not-start">start content</div>
    <div class="mip-countdown-running">
    	<div id="mip-countdown-tiles">
    	</div>
    	<div class="labels">
	    	<li>Days</li>
	    	<li>Hours</li>
	    	<li>Mins</li>
	    	<li>Secs</li>
	  	</div>
    </div>
    <div class="mip-countdown-end">end content</div>
</mip-countdown>
```

## 属性

### endTime

说明：结束的日期的时间点 new Date('2017-07-05:17:30:00').getTime()/1000，若当前时间没有到达开始时间，则会显示<div class="mip-countdown-end">end content</div>
必选项：否
类型：数字
取值范围：大于1490000000
单位：秒
默认值：无

### startTime

说明：开始的日期的时间点 new Date('2017-07-05:17:00:00').getTime()/1000。若当前时间没有到达开始时间，则会显示<div class="mip-countdown-not-start">start content</div> 这个容器的内容；若无此字段，直接进行倒计时逻辑。
必选项：否
类型：数字
取值范围：大于1490000000
单位：秒
默认值：无

### duration

说明：开始的日期的时间点 new Date('2017-07-05:17:00:00').getTime()/1000，若当前时间没有开始，
必选项：否
类型：数字
取值范围：大于0
单位：秒
默认值：无

## 注意事项
1、若参数取值范围不对，此模块直接不予展示
2、duration 的优先级大于 endTime


