# mip-experiment 前端抽样实验

`<mip-experiment>` 组件用于前端抽样实验。  
可用于按钮，banner，广告等前端可控元素的改版实验，与 `<mip-pix>` 可配合使用。  

标题|内容
----|----
类型|通用
支持布局|nodisplay
所需脚本|https://c.mipcdn.com/static/v1/mip-experiment/mip-experiment.js

## 示例

### 1. 基本样式抽样
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

### 2. 固定分组样式抽样
第一次实验抽样后，分组存储在 localStorage 中，再次刷新分组不变。
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

### 3. 多组样式抽样

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

### 4. html代码块渲染抽样
组件渲染抽样用于两个组件间的AB实验。根据开发者配置的流量比例渲染 A组件或 B组件。

#### 第一步：配置抽样分组及比例
配置`"type": "tag-abtest"`用于声明用于抽样方式为 **html 代码块渲染抽样**。
``` javascript
"实验名": { //实验名不限，建议英文，多个单次使用'-'分割
    "sticky": false, // 是否按照用户抽样
    "descri": "", // 实验描述，仅用于记录
    "type": "tag-abtest" // "extension-abtest"代表组件渲染抽样
    "variants": {
        "实验组A": 40, // key为实验分组名，value为实验流量百分比
        "实验组B": 60 // 同上，百分比之和上限为100
    }
}
```

#### 第二步：配置各实验组
`template` 内部标签默认不渲染，当流量被分配到`实验组A`时，`{{#实验组A}}`判定为true，内部标签渲染。此时`{{#实验组B}}`为false，内部标签不渲染。

[notice] `div for=""` 取值对应第一步中的实验名。

``` html
<div for="实验名">
    <template type="mip-mustache">
        {{#实验组A}}
            实验组A内容，可以引用组件或填写DOM。如：
            <mip-fixed type="bottom">mip-fixed内容</mip-fixed>
        {{/实验组A}}
        {{#实验组B}}
            实验组B内容，可以引用组件或填写DOM。
        {{/实验组B}}
    </template>
</div>
```

#### 第三步：引用所有实验组内组件脚本
由于页面加载初期，并不确定会分流到哪个实验组，需要引用每个实验组内组件对应的JS脚本。

```
<script src="https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-……/mip-…….js"></script>
<!-- mustache模板依赖 -->
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
```

#### 真实示例
创建实验名为`anim-experiment`的抽样，按照流量抽样分组，40%流量渲染组件mip-img，60%流量渲染组件mip-anim。

```html
<mip-experiment class="mip-hidden">
    <script type="application/json" for="mip-experiment">
        {
            "anim-experiment": {
                "sticky": false,
                "descri": "按照流量抽样分组，40%渲染组件mip-img，60%渲染组件mip-anim",
                "type": "tag-abtest",
                "variants": {
                    "mip-img-group": 40,
                    "mip-anim-group": 60
                }
            }
        }
    </script>
    <div for="anim-experiment">
        <template for="anim-experiment">
            {{#mip-img-group}}
                实验组 mip-img-group：
                <mip-img layout="responsive" width="350" height="263"
                    src="https://www.mipengine.org/static/img/sample_01.jpg">
                </mip-img>
            {{/mip-img-group}}
            {{#mip-anim-group}}
                实验组 mip-fixed-group：
                <mip-fixed type="bottom">底部悬浮元素内容</mip-fixed>
            {{/mip-anim-group}}
        </template>
    </div>
</mip-experiment>
<script src="https://c.mipcdn.com/static/v1/mip-anim/mip-anim.js"></script>
<!-- mustache模板依赖 -->
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
```

### 5. 调试：打印实验信息
在 `<mip-experiment>` 上添加 `needConsole` 参数，可以在控制台看到分组过程和情况。

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

### 6. 调试：URL 强制中抽样
测试时，可通过给 URL 添加 hash 强制中抽样，如 `#mip-x-button-color5=red`。

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

### 7. 与百度统计配合使用

`<mip-experiment>`可以和`<mip-stats-baidu>`标签配合统计页面元素事件的触发次数。这个功能使用百度统计的[_trackEvent API](http://tongji.baidu.com/open/api/more?p=guide_trackEvent)发送统计请求，在百度统计后台-访问分析-事件分析可以看到统计结果。

#### 注意事项：

1. 需要按照`<mip-stats-baidu>`文档引入百度统计代码和标签，请保证 `mip-stats-baidu.js` 在 `mip-experiment.js` 之前引入。
2. 如果引入了多个百度统计，请以 `_hmt.id` 中的 `token` 为准，在 `token` 对应的统计后台查看数据。
3. 开发时请关注控制台报错。
4. 百度统计的数据产出有一定延迟，请在第二天查看数据。

#### 统计使用说明：

1. 配置多个统计：`baidu-stats` 为统计配置的数组，里面每一个元素相当于一句 JS 的`addEventListener`。
2. 配置统计参数：每个配置可以传入三个参数。
    1. 第一个为元素选择器（支持 `element`, `id`, `class`）。
    2. 第二个为事件（`click`, `touchend`）。
    3. 第三个可以自定义（可以选择填写广告的单价或事件的权重）。
3. 统计结果：在站长平台看到的统计结果有三个参数:
    1. 第一个对应元素加事件，相当于统计参数的 1 和 2，格式为 `element__click`。
    2. 第二个对应当前实验名和实验分组，格式为 `mip-x-name=group`。
    3. 第三个对应参数 3，自定义。

下面例子可用于实验 “改变按钮的背景色，计算按钮的点展比”。在 `baidu-stats` 中配置了页面加载的次数和按钮点击次数的统计。

```html
<style>
button {
    background-color: black;
    display: block;
    margin:10px;
    padding:20px;
}
body[mip-x-button-color=red] #btn01 {
    background-color: red;
}
body[mip-x-button-color=grey] #btn01 {
    background-color: #888888;
}
</style>
<mip-experiment layout="nodisplay" class="mip-hidden">
    <script type="application/json" for="mip-experiment">
        {
            "button-color6": {
                "sticky": false,
                "descri": "设置按钮背景色,红-灰-黑（默认）",
                "variants": {
                    "red": 30,
                    "grey": 30
                },
                "baidu-stats": [
                    ["window", "load"],
                    ["#btn01", "click"，"2.23"]
                ]
            }
        }
    </script>
    <p>设置按钮背景色,红（30%）-灰（30%）-黑（默认40%）</p>
    <p>每次刷新重新分组</p>
    <button id="btn01">修改背景色</button>
</mip-experiment>
<script src="https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js"></script>
```
最后数据的产生格式为：  

--|次数|参数A|参数B|参数C
----|----|----|----|----
第1行|3083|window__load|mip-x-button-color6=red|
第2行|3013|window__load|mip-x-button-color6=grey|
第3行|4742|window__load|mip-x-button-color6=default|
第4行|127|#btn01__click|mip-x-button-color6=red|2.23
第5行|210|#btn01__click|mip-x-button-color6=grey|2.23
第6行|272|#btn01__click|mip-x-button-color6=default|2.23

- 第 1 行和第 4 行为按钮红色情况，点展比为 127/3083 = 4.12%
- 第 2 行和第 5 行为按钮灰色情况，点展比为 210/3013 = 6.97%
- 第 3 行和第 6 行为按钮黑色情况(默认，对照组)，点展比为 272/4742 = 5.74%

可见，红色按钮实验点展比降低，灰色按钮实验点展比升高。

## 属性

### layout, class

说明：组件布局，建议使用，避免实验初始化时页面抖动  
必选项：否  
类型：字符串  
取值：`layout="nodisplay" class="mip-hidden"`  

### 实验名

说明：示例中 `button-color` 处，注意和 CSS 中的 `mip-x-[button-color]` 对应  
必选项：是  
类型：字符串  

### descri

说明：实验描述，不参与实验分组计算  
必选项：否  
类型：字符串  

### variants

说明：实验分组配置。填写 key-value 组成的对象。key 对应 CSS 中的属性选择器，value 对应分组流量。如果 value 填写 30，则有 30% 的流量进入该分组  
必选项：是  
类型：JSON 对象  

### sticky

说明：实验分组配置。填写 key-value 组成的对象。key 对应 CSS 中的属性选择器，value  对应分组流量。如果 value 填写 30，则有 30% 的流量进入该分组  
必选项：否  
类型：布尔值  
默认值：true  
取值：true, false  

### baidu-stats 

说明：实验分组统计配置。具体配置方法，请参考本文【6. 与百度统计配合使用】
必选项：否  
类型：数组  

## 注意事项
1. `<application/json>` 为实验分组配置，要求填写合法的JSON对象。开发时请注意控制台是否有报错。
2. 如果使用百度统计，请保证 `mip-stats-baidu.js` 在 `mip-experiment.js` 之前引入。
