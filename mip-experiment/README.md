# mip-experiment

mip-experiment 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-experiment/mip-experiment.js

## 示例

### 基本用法
```html
<style>
/*mip-experiment {
    display: none;
}*/
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
body[mip-x-font-color=white] .exp-btn2 {
    color: white;
}
body[mip-x-font-color=red] .exp-btn2 {
    color: red;
}
body[mip-x-font-size="10px"] .exp-btn3 {
    font-size:10px;
}
body[mip-x-font-size="20px"] .exp-btn3 {
    font-size:20px;
}
body[mip-x-font-size="30px"] .exp-btn3 {
    font-size:30px;
}
body[mip-x-button-display=show] .exp-btn4 {
    display: block;
}
body[mip-x-button-display=hide] .exp-btn4 {
    display: none;
}
.clk {
    background: #eeeeee;
    padding:10px;
    display: inline-block;
}

</style>
<mip-experiment layout="nodisplay" class="mip-hidden">
    <script type="application/json">
        {
            "button-color": {
                "descri": "设置按钮背景色,黄-灰-蓝-绿",
                "variants": {
                    "yellow": 30,
                    "grey": 30,
                    "blue": 30
                }
            },
            "font-color": {
                "descri": "设置字体颜色,白-红-黑",
                "sticky": true,
                "variants": {
                    "white": 30,
                    "red": 30
                }
            },
            "font-size": {
                "descri": "设置字体大小，10-20-30-40",
                "sticky": false,
                "variants": {
                    "10px": 30,
                    "20px": 30,
                    "30px": 40
                }
            },
            "button-display": {
                "descri": "设置按钮-4 ，显示-不显示",
                "sticky": false,
                "variants": {
                    "show": 50,
                    "hide": 50
                }
            }
        }
    </script>
    <p>【绑定历史】设置按钮背景色,黄-灰-蓝-绿</p>
    <button class="exp-btn1">1-背景色</button>
    <p>【绑定历史】设置字体颜色,白-红-黑</p>
    <button class="exp-btn2">2-字体颜色</button>
    <p>设置字体大小，10-20-30-40</p>
    <button class="exp-btn3">3-字体大小</button>
    <p>设置按钮-4 ，显示-不显示</p>
    <button class="exp-btn4">4-显示&不显示</button>
</mip-experiment>
<button class="clk" id="clear">点我 清空记录</button>
<button class="clk" id="reload">点我 刷新页面</button>
<script>
    document.getElementById('clear').addEventListener('click', function(){
        localStorage.removeItem('mip-x-btn-display');
        localStorage.removeItem('mip-x-button-color');
        localStorage.removeItem('mip-x-font-color');
        localStorage.removeItem('mip-x-font-size');
    }, false);

    document.getElementById('reload').addEventListener('click', function(){
        window.location.reload();
    }, false);
</script>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

