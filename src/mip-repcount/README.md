# mip-repcount

mip-repcount 可以支持页面进行个性化的数据上报统计，包括简单的自定义埋点

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-repcount/mip-repcount.js

## 示例

### 基本用法
```html
<mip-repcount>
        <script type="application/json">
            {
                "reportUrl": "http://www.example.com/report",
                "common": {
                    "lang": "lan",
                    "dpi": "rs",
                    "refer": null
                },
                "cookie": {
                    "cookieA": "ca",
                    "cookieB": "cb"
                },
                "custom": {
                    "conpanyName": "XX公司",
                    "proName": "产品名称"
                },
                "isSupportTrack": true,
                "rules": {
                    "A": 1
                }
            }
        </script>
</mip-repcount>
<span on="tap:MIP.setData(A-B-C)">手动上报</span>
```

## 属性

### reportUrl

说明：异步上报的接口地址，由于是post方式上报，所以地址结尾不需要带 `？`
必选项：是
类型：字符串
取值范围：URL
默认值：无

### common 

说明：获取页面的一些公共数据，以对象的方式封装{字段：别名}
    可获取公共字段： "lang", "dpi", "title", "curTime", "sendTime", "osVer", "refer", "url"
    别名为该字段最终生成的对象key值，没有则使用公共字段，获取的value值为该公共字段的内容，如
    lang 指 页面语言， dpi 指 页面分辨率， title 、refer 、url 指document 相关属性，curTime 指 当前时间， sendTime指发送请求时间, osVer 设备系统
    只能获取到已支持的公共字段内容；
    例子中则生成如下对象： {lan: 'zh', rs: '640*579', refer: 'http://www.example.com/refer'}
必选项：否
类型：对象

### cookie 

说明：获取页面的一些cookieid，以对象的方式封装{cookieid：别名}
    别名为该字段最终生成的对象key值，没有则使用cookieid
    例子中用法生成如下对象: {ca : 'AA', cb: 'BB'}
必选项：否
类型：对象

### custom 

说明：设置页面中需要上报的公共业务数据，以对象的方式封装{key：value}
    例子中用法将公司名称跟相关产品名称一起上报
    例子中用法生成如下对象: {conpanyName : 'AA', proName: 'BB'}
必选项：否
类型：对象

### isSupportTrack
说明：是否支持手动埋点
必选项： 否
类型：boolean

### rules 

说明：设置手动埋点的属性字段
    通过在HTML 元素中的事件绑定中过程中通过MIP.setData(A-B-C) 调用，比如例子中
    on="tap:MIP.setData(A-B-C)" 
    A ：rules 对象中的一个存在属性，要上报的字段， 不存在则不会上报
    B： event 字段的值， event 默认是 “pv”, 手动埋点则取定义的值
    C: 上报的定义字段的值
    如果是 on="tap:MIP.setData(tag-click-set555)"
    例子中用法生成如下对象: {tag : 'set555', event: 'click'}
必选项：否
类型：对象
## 注意事项

通过配置选项最后拷贝所有相关数据到一个大的obj 中 ，成为上报接口的 body 数据；

注意： 手动上报的函数中的参数格式是根据 `-` 分割的， 所以 key eventname  value 的值不要存在 `-` ，如若需要可以用`_`, 比如 MIP.setData(aaa-touch-10_2_5)
