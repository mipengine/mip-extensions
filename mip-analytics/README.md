# mip-analytics

mip-analytics 提供统计发送接口，由使用方决定在什么时候发送什么参数，到什么地方。

标题|内容
----|----
类型|通用
支持事件|click,touchend,disp,scroll,timer
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-analytics/mip-analytics.js

## 示例

### 基本用法

```html
<div class="test" style="height:200px; background-color:blue;"></div>
<div class="test2" style="height:200px; background-color:yellow;"></div>


<mip-analytics>
<script type="application/json">
{
    "hosts" : {
		"mylogserver" : "https://m.baidu.com/log?",
		"mylogserver2" : "https://m.baidu.com/test?event=click&"
	},

    "setting" : {

        "click" : [
            {
				"selector" : ".test",
                "host" : "mylogserver",
                "data" : {
					"name" : "alan",
					"list": {
						"age":"123"
					}
				}
            },

            {
				"selector" : ".test2",
                "host" : "mylogserver",
                "data" : {
					"name" : "alan",
					"list": {
						"age":"123fdafdsfadfafdfdfda"
					}
				
				}
            }
        ],

        "disp" : [],
        "timer" : [
			{
				"host" : "mylogserver2",
				"data" : {
					"timer" : "timer"
				},
				"option" : {
					"interval" : 2000
				}
			}
		],
        "scroll" : []
    }
}
</script>
</mip-analytics>

```

## 配置参数

### hosts

说明：指定用到的log server 地址, 用以后面配置复用
必选项：是
类型：键值对
取值范围：https

### setting

说明：配置日志发送
必选项：是
类型：键值对

___

#### setting.click

说明：配置点击事件
必选项：否
类型：键值对

##### setting.click.selector

说明：指定触发点击的选择器
必选项：是
类型：css选择器

##### setting.click.host

说明：指定日志发送的log server
必选项：是
类型：hosts参数中的key

##### setting.click.data

说明：指定日志的querystring, 二级对象会被序列化为字符串
必选项：否
类型：键值对

___

#### setting.touchstart

说明：完全同click

___

#### setting.timer

说明：定时发送日志设置
必选项：否
类型：键值对

#### setting.timer.host

说明：同click.host

#### setting.timer.data

说明：同click.data

#### setting.timer.option.interval

说明：指定定时器间隔
必选项：否
类型：数字
单位：ms
默认值：4000ms

## 注意事项

* 注意是标准json, 属性名，属性值都要用双引号

* 统计框架会默认传入一级参数t, 为发送日志的时间

* host地址需要是https的

