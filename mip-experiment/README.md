# mip-experiment

mip-experiment 组件用于前端抽样实验。  
可用于按钮，banner，广告等前端可控元素的改版实验，与mip-pix，可配合使用。  

标题|内容
----|----
类型|通用
支持布局|nodisplay
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-experiment/mip-experiment.js

## 示例

### 1. 基本用法
每次刷新会重新分组。
```html
<style>
button {
    background-color: aquamarine;
    color: black;
    display: block;
    margin:10px;
    padding:20px;
}
body[mip-x-button-color=yellow] .exp-btn1 {
    background-color: yellow;
}
body[mip-x-button-color=grey] .exp-btn1 {
    background-color: #888888;
}
body[mip-x-button-color=blue] .exp-btn1 {
    background-color: #3388ff;
}
</style>
<mip-experiment layout="nodisplay" class="mip-hidden">
    <script type="application/json" for="mip-experiment">
        {
            "button-color": {
                "sticky": false,
                "descri": "1.设置按钮背景色,黄-灰-蓝-绿",
                "variants": {
                    "yellow": 30,
                    "grey": 30,
                    "blue": 30
                }
            }
        }
    </script>
    <p>设置按钮背景色,黄(30%)-灰(30%)-蓝(30%)-绿(默认10%)</p>
    <p>每次刷新重新分组</p>
    <button class="exp-btn1">修改背景色</button>
</mip-experiment>
```

### 2. 固定分组用法
第一次实验抽样后，分组存储在localStorage中，再次刷新分组不变。
```html
<style>
button {
    background-color: aquamarine;
    color: black;
    display: block;
    margin:10px;
    padding:20px;
}
body[mip-x-button-color2=yellow] .exp-btn2 {
    background-color: yellow;
}
body[mip-x-button-color2=grey] .exp-btn2 {
    background-color: #888888;
}
body[mip-x-button-color2=blue] .exp-btn2 {
    background-color: #3388ff;
}
</style>
<mip-experiment layout="nodisplay" class="mip-hidden">
    <script type="application/json" for="mip-experiment">
        {
            "button-color2": {
                "sticky": true,
                "descri": "2.设置按钮背景色,黄-灰-蓝-绿",
                "variants": {
                    "yellow": 30,
                    "grey": 30,
                    "blue": 30
                }
            }
        }
    </script>
    <p>设置按钮背景色,黄(30%)-灰(30%)-蓝(30%)-绿(默认10%)</p>
    <p>每次刷新【不】重新分组</p>
    <button class="exp-btn2">修改背景色</button>
</mip-experiment>
```

### 3. 多组抽样

```html
<style>
button {
    background-color: aquamarine;
    color: black;
    display: block;
    margin:10px;
    padding:20px;
}
body[mip-x-button-color3=yellow] .exp-btn3 {
    background-color: yellow;
}
body[mip-x-button-color3=grey] .exp-btn3 {
    background-color: #888888;
}
body[mip-x-button-color3=blue] .exp-btn3 {
    background-color: #3388ff;
}
body[mip-x-font-color=black] .exp-btn3 {
    color: black;
}
body[mip-x-font-color=white] .exp-btn3 {
    color: white;
}
</style>
<mip-experiment layout="nodisplay" class="mip-hidden">
    <script type="application/json" for="mip-experiment">
        {
            "button-color3": {
                "sticky": false,
                "descri": "3.设置按钮背景色,黄-灰-蓝-绿",
                "variants": {
                    "yellow": 30,
                    "grey": 30,
                    "blue": 30
                }
            },
            "font-color": {
                "sticky": false,
                "descri": "设置按钮字体颜色,黑-白",
                "variants": {
                    "black": 50,
                    "white": 50
                }
            }
        }
    </script>
    <p>设置按钮背景色,黄(30%)-灰(30%)-蓝(30%)-绿(默认10%)</p>
    <p>设置按钮字体色,黑(50%)-白(50%)</p>
    <p>每次刷新重新分组</p>
    <button class="exp-btn3">修改背景色&字体颜色</button>
</mip-experiment>
```

### 4. 调试：打印实验信息
在mip-experiment上添加needConsole参数，可以在控制台看到分组过程和情况

```html
<style>
button {
    background-color: aquamarine;
    color: black;
    display: block;
    margin:10px;
    padding:20px;
}
body[mip-x-button-color4=yellow] .exp-btn4 {
    background-color: yellow;
}
</style>
<mip-experiment layout="nodisplay" class="mip-hidden" needConsole>
    <script type="application/json" for="mip-experiment">
        {
            "button-color4": {
                "sticky" : false,
                "descri": "4.设置按钮背景色,黄-绿",
                "variants": {
                    "yellow": 50
                }
            }
        }
    </script>
    <p>设置按钮背景色,黄(50%)-绿(默认50%)</p>
    <p>每次刷新重新分组</p>
    <p>控制台显示分组过程信息</p>
    <button class="exp-btn4">修改背景色</button>
</mip-experiment>
```

### 5. 调试：URL强制中抽样
测试时，可通过给URL添加hash强制中抽样，如#mip-x-button-color5=red

```html
<style>
button {
    background-color: aquamarine;
    color: black;
    display: block;
    margin:10px;
    padding:20px;
}
body[mip-x-button-color5=yellow] .exp-btn5 {
    background-color: yellow;
}
body[mip-x-button-color5=red] .exp-btn5 {
    background-color: red;
}
</style>
<mip-experiment layout="nodisplay" class="mip-hidden" needConsole>
    <script type="application/json" for="mip-experiment">
        {
            "button-color5": {
                "sticky" : false,
                "descri": "5.设置按钮背景色,黄-红-绿",
                "variants": {
                    "yellow": 50,
                    "red": 1
                }
            }
        }
    </script>
    <p>设置按钮背景色,黄(50%)-红(1%)-绿(默认49%)</p>
    <p>在url中添加‘#mip-x-button-color5=red’显示红色按钮</p>
    <p>控制台显示分组过程信息</p>
    <button class="exp-btn5">修改背景色</button>
</mip-experiment>
```


## 属性

### layout, class

说明：组件布局，建议使用，避免实验初始化时页面抖动  
必选项：否  
类型：字符串  
取值：layout="nodisplay" class="mip-hidden"  

### 实验名

说明：示例中button-color处，注意和css中的mip-x-[button-color]对应  
必选项：是  
类型：字符串  

### descri

说明：实验描述，不参与实验分组计算  
必选项：否  
类型：字符串  

### variants

说明：实验分组配置。填写key-value组成的对象。key对应css中的属性选择器，value对应分组流量。如果value填写30，则有30%的流量进入该分组  
必选项：是  
类型：JSON对象  

### sticky

说明：实验分组配置。填写key-value组成的对象。key对应css中的属性选择器，value对应分组流量。如果value填写30，则有30%的流量进入该分组  
必选项：否  
类型：布尔值  
默认值：true  
取值：true, false  


## 注意事项
1. `<application/json>`为实验分组配置，要求填写合法的JSON对象。开发时请注意控制台是否有报错。
