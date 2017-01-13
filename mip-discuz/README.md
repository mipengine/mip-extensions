# mip-discuz

mip-discuz discuz手机页面功能组件

标题|内容
----|----
类型|通用
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-discuz/mip-discuz.js

## 示例

### 引用自定义function

- 自定义function, script 标签中的参数必须带双引号，也就是说 script 标签中的数据必须是 json 格式的
- json 格式中的key 为自定义函数名，value为自定义函数参数
```html
<mip-discuz initvar="var contentstr='威望|1';">
    <script type="application/json">
    {
        "ad": "999"
    }
    </script>
</mip-discuz>

## 属性

### initvar

说明：初始化参数
必选项：是   
类型：字符串 
