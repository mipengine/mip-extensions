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
    data-iframe-src="https://mipexample.org/sw.html" layout="nodisplay" class="mip-hidden">
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

## 工作机制

在这个 extension 里，提供了 `src` 和 `data-iframe-src` 两个属性，如果要让 service worker 能顺利注册，里那个属性都需要填写，因为 MIP 页不仅在搜索环境下打开，还可以被直接访问。

如果是直接通过 MIP 页的地址访问，以为着 service worker 的域名和当前站点一致，可以直接注册，这个时候我们需要 `src` 属性，会直接进行注册，如下

```javascript
navigator.serviceWorker.register(src)
```

但是，MIP 页不仅能直接访问，还能被百度搜索缓存在 CDN 上，如果通过百度搜索结果页打开，那么这个这个页面的域名就不是站点本身的域名，无法通过 `navigator.serviceWorker.register` 直接注册，在这里我们通过嵌入站点自身的 iframe 来解决域名不同的问题，通过 iframe 来注册 service worker，提前缓存站点资源，这个 iframe 的地址就是 `data-iframe-src` 属性， iframe 页面内容可以很简单，如下：

```html
<script>
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js');
}
</script>
```

## 注意事项

