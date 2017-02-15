# mip-app-banner

mip-app-banner 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-app-banner/mip-app-banner.js

## 示例

### 基本用法
```html
<mip-app-banner id="my-app-banner" layout="nodisplay">
    自定义内容，可以嵌套其他组件
</mip-app-banner>
```

## 属性

### id

说明：组件id，组件唯一标识
必选项：是
类型：字符串
单位：无
默认值：无

### layout

说明：组件布局，只能设置值为nodisplay
必选项：是
类型：字符串
取值范围：nodisplay
单位：无
默认值：nodisplay

## 注意事项

- 在引用组件的页面头部head标签中需要加两个标签

	- IOS 使用：`<meta name="apple-itunes-app" content="app-id=app的id, app-argument=medium://p/9ea61abf530f">`
    - Android 使用：`<link rel="manifest" href="http://172.24.16.91:3000/manifest">`

- manifest.json 示例

```
{
  "prefer_related_applications": true, // This is not necessary for <amp-app-banner>, but signals a preference on non-AMP pages using the same manifest.json file for the native app over a web app if available
  "related_applications": [
    {
      "platform": "play",
      "id": "com.app.path",
      "url": "android-app://com.app.path/https/host.com/path/to/app-content"
    }
  ]
}
```
