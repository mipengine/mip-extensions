# mip-taoge-tp

mip-taoge-tp ThinPHP 系统组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-taoge-tp/mip-taoge-tp.js

## 示例

### 基本用法
```html
<mip-taoge-tp
    tp-root="__ROOT__"   
    tp-app="__APP__"
    tp-public="__PUBLIC__"
    tp-deep="{:config('URL_PATHINFO_DEPR')}"
    tp-model="["{:config('URL_MODEL')}", "{:config('URL_CASE_INSENSITIVE')}", "{:config('URL_HTML_SUFFIX')}"]"
    tp-var="["{:config('VAR_MODULE')}", "{:config('VAR_CONTROLLER')}", "{:config('VAR_ACTION')}"]"
    tp-img="__PUBLIC__/mip/img/"
    tp-qq="{:config('web_ontact_information_qq')}"
    tp-tel="{:config('web_ontact_information_mobile')}"
    >
</mip-taoge-tp>
```

## 属性

### tp-root

说明：网站根目录
必选项：是

### tp-app

说明：应用目录
必选项：是

### tp-public

说明：公共资源目录
必选项：是

## 注意事项

其它属性根据需求选填

