# mip-analytics 统计框架

提供统计发送接口，由使用方决定在什么时候发送什么参数，到什么地方。

标题|内容
----|----
类型|通用
支持事件|click,touchend,[disp,scroll],timer
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-analytics/mip-analytics.js

## 示例

### 基本用法

每种事件可以配置多个

```html
<div class="className1" data-click="{foo:1,boo:2}">
    <button data-click="{button:1}"> BUTTON 1</button>
    <button > BUTTON 2</button>
</div>
<div class="className2"></div>


<mip-analytics>
<script type="application/json">
{
    "hosts" : {
        "className1" : "https://m.baidu.com/div1?",
        "disp" : "https://m.baidu.com/${disp}?",
        "className2" : "https://m.baidu.com/_${div2}.gif?"
    },

    "setting" : {

        "click" : [
            {
                "selector" : ".className1",
                "tag": "button",
                "host" : "className1",
                "queryString" : {
                    "name" : "alan",
                    "mipstart" : "${MIPStart}",
                    "list": {
                        "age":"123"
                    }
                }
            },

            {
                "selector" : ".className2",
                "host" : "className2",
                "queryString" : {
                    "name" : "alan",
                    "mipstart" : "${MIPStart}",
                    "list": {
                        "age":"45"
                    }
                }
            },

            {
                "selector" : ".className3",
                "host" : "className3",
                "queryString" : {},
                "vars" : {
                    "div2" : "divfdsf"
                }
            }
        ],

        "disp" : [
            {
                "host" : "disp",
                "queryString" : {
                    "MIPStart" : "${MIPStart}",
                    "MIPPageShow" : "${MIPPageShow}",
                    "MIPDomContentLoaded" : "${MIPDomContentLoaded}",
                    "MIPFirstScreen" : "${MIPFirstScreen}"
                },
                "vars" : {
                    "disp" : "displog"
                }
            }
        ],
        "timerxx" : [
            {
                "host" : "className2",
                "queryString" : {
                    "timer" : "timer"
                },
                "vars" : {
                    "div2" : "div2"
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

类型：Array   

##### setting.click.selector

说明：指定触发点击的选择器     

必选项：是  

类型：css选择器

##### setting.click.tag

说明：指定触发点击的选择器，有此属性时，setting.click.selector 为选择器父节点，点击事件绑定在父节点上

必选项：是

类型：css选择器


##### setting.click.host

说明：指定日志发送的log server,可以使用插值变量占位，${varName}, 在vars中指定真实值。 插件使用图片伪装请求。host应该是一个图片地址,一般是gif。如 https://logserver.com/mylog.gif?

必选项：是

类型：hosts参数中的key

##### setting.click.queryString

说明：指定host的querystring,一级属性序列化为&链接的参数， 二级对象属性会被序列化为json字符串。可以支持一些内建变量,目前支持速度信息，以下内建变量会返回时间戳。

* "${MIPStart}" , 
* "${MIPPageShow}", 
* "${MIPDomContentLoaded}", 
* "${MIPFirstScreen}"
 

必选项：否

类型：键值对

##### setting.click.vars

说明：指定host的插值变量的真实值，替换格式为${varName}, 如果是内建变量可以不用指定值，会自行替换。

必选项：否

类型：键值对

___

#### setting.touchstart

说明：完全同click

___

#### setting.timer

说明：定时发送日志设置

必选项：否

类型：Array

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

* vars和queryString 是为了方便使用方重复利用变量并且保证灵活性，最好是vars用于host部分，queryString用于参数部分，或者只选择其一。重叠使用时需要注意图们之间是否有交叉。框架会先替换vars再拼接queryStirng

* vars 只支持简单数据类型, 复合数据类型会返回空字符串

* queryString 内建变量只支持一级参数替换，2级对象中有内建变量，会被直接序列化为字符串，不会替换。

