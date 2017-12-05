# mip-access

mip-access 能够允许发布者对页面内容进行访问权限的控制，通过内容标记和用户访问情况进行综合评价，从而决定页面展示内容。

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-access/mip-access.js

## 示例

```html
<div mip-access='access AND login' mip-access-hide>自定义内容</div>
```

### 使用方式
- 开发者实现接口：所有接口的请求都依据[cors](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)方案，包括 Authorization 接口(返回解析 DOM 元素展示与否的数据)、Pingback接口，登陆登出接口。
- 引入 mip 脚本。

    ```
    <script type="text/javascript" src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
    <script type="text/javascript" src="https://mipcache.bdstatic.com/static/v1/mip-access/mip-access.js"></script>
    ```

- 定义 script 配置标签，并配置以下信息。

    ```
    <script id="mip-access" type="application/json">
    {
      "authorization": "https://publisher.com/mip-access/api/mip-authorization.json?rid=READER_ID&url=CANONICAL_URL",
      "pingback": "https://publisher.com/mip-access/api/mip-pingback?rid=READER_ID",
      "login": "https://publisher.com/mip-access/login/?rid=READER_ID&url=CANONICAL_URL",
      "authorizationFallbackResponse": {
          "error": true,
          "access": false
        }
    }
    </script>
    ```

    - authorization：授权接口，返回 MIP Access 表达式中需要进行计算的数据。
    - pingback：计量接口，每次访问页面之后，通过该url发送请求到开发者服务器，由其对数据进行管理，如每访问一次计数减1。
    - noPingback：是否允许计量。
    - login：登陆相关接口，可以是一个map，如下:

        ```
        "login": {
             "login": "https://publisher.com/login.html?rid={READER_ID}",
             "logout": "https://publisher.com/logout.html?rid={READER_ID}"
        }
        ```

    - authorizationFallbackResponse：如果Authorization接口请求失败，需要在这里配置相关接口参数作为后备。

        ```
        "authorizationFallbackResponse": {
            "error": true,
            "access": false
        }
        ```

    - authorizationTimeout：Authorization接口请求超时时间，默认为3s。

- 以 mip-access 属性来书写表达式。

    ```
    <div mip-access="access AND subscriber">…</div>
    ```

## 属性

### mip-access

说明：控制DOM元素展示或隐藏 
必选项：是   
类型：字符串   
单位：无   
取值：无   
默认值：无
