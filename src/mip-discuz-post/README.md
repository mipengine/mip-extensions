# mip-discuz-post

mip-discuz-post discuz手机页面发布功能组件

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-discuz-post/mip-discuz-post.js

## 示例

### 引用自定义function

- 自定义function, script 标签中的参数必须带双引号，也就是说 script 标签中的数据必须是 json 格式的
- json 格式中的key 为自定义函数名，value为自定义函数参数
```html
<mip-discuz-post staticurl="/static/" imgdir="/static/uploads/" siteurl="https://m.baidu.com">
    <script type="application/json">
    {
        "seccheck": "999"
    }
    </script>
</mip-discuz-post>

## 属性

### staticurl
说明：静态资源存储路径
必选项：是   
类型：字符串 

### imgdir
说明：图片资源存储路径
必选项：是   
类型：字符串 

### siteurl
说明：网站url
必选项：是   
类型：字符串 