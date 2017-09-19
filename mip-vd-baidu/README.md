# mip-vd-baidu

mip-vd-baidu http 视频源播放的百度解决方案

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-vd-baidu/mip-vd-baidu.js

## 示例

### 基本用法
```html
<div>test</div>
<mip-vd-baidu layout="responsive" width="640" height="360" title="主播炸了赛事篇：虎大将军横刀立马" src="//gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4" poster="http://vimg.dwstatic.com/1735/8523701/9-220x124.jpg">
</mip-vd-baidu>
```

## 属性

### title

说明：视频的标题
必选项：是
类型：string
取值范围：无
单位：无
默认值：无

### src

说明：视频源地址
必选项：是
类型：url 类型
取值范围：标准 url
单位：无
默认值：无

### poster

说明：视频源的封页
必选项：是
类型：图片 url 类型
取值范围：标准图片 url
单位：无
默认值：无

## 注意事项

若缺少必填属性，http 的视频源在 MIP Cache  Url 下无法在当前页面播放

