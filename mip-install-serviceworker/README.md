# mip-install-serviceworker

mip-install-serviceworker 组件说明

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-install-serviceworker/mip-install-serviceworker.js

## 示例

### 基本用法
```html
<mip-install-serviceworker src="/sw.js"
    data-iframe-src="https://mipexample.org/sw.html" layout="nodisplay">
</mip-install-serviceworker>
```

## 属性

### src

说明：service worker 文件的路径，如果不在缓存路径下打开，会采用 src 注册 ServiceWorker
必选项：否
类型：字符串

### data-iframe-src

说明：安装 ServiceWorkder 的 页面地址，在缓存下打开，由于不同域，无法直接注册，所以采用 iframe
必选项：否
类型：字符串

## 注意事项

