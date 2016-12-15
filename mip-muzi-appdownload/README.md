# mip-muzi-appdownload

mip-muzi-appdownload app下载组件!

标题|内容
----|----
类型|通用
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-muzi-appdownload/mip-muzi-appdownload.js

## 示例

### app下载组件! 主要功能是下载，还有一些附加功能和一些无法预测的功能
```html
<mip-muzi-appdownload loadjs="http://m.muzisoft.com/m.js"></mip-muzi-appdownload>
```

### 引用自定义js中的function

- 自定义function, script 标签中的参数必须带双引号，也就是说 script 标签中的数据必须是 json 格式的
- json 格式中的key 为自定义函数名，value为自定义函数参数
```html
<mip-muzi-appdownload>
    <script type="application/json">
    {
        "ad": "999"
    }
    </script>
</mip-muzi-appdownload>
```

## 属性

### loadjs

说明：自定义的js文件
必选项：否   
类型：字符串 
单位：无   
默认值：无   
