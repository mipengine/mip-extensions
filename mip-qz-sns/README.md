# mip-qz-sns

点赞、分享组件

标题|内容
----|----
类型|定制,业务
支持布局|container
所需脚本|http://mipcache.bdstatic.com/static/mip-qz-sns/latest/mip-qz-sns.js

## 示例

### 基本用法
```html
<link type="text/css" rel="Stylesheet" href="http://img1.qianzhan123.com/2016/css/xw_common.css?v=20160101"> <!--测试用-->
<link type="text/css" rel="Stylesheet" href="http://img1.qianzhan123.com/2016/css/xw_art.css?v=20160101"> <!--测试用-->
<mip-qz-sns class="art-sns sns" url="http://log.qianzhan.com/handle/favorAdd" 
	params="{ r: '161109170215', id: '161108-e3868b91', name: '', cate: '150', type: 'news', url: '' }"
	source="前瞻网" sourceurl="http://www.qianzhan.com/">
    <ul>
        <li class="zan"><em><i class="i-up1 icon"></i></em><span>赞 126</span></li>
        <li class="weibo"><em><i class="i-weibo icon"></i></em><span>微博</span></li>
        <li class="zone"><em><i class="i-zone icon"></i></em><span>QQ空间</span></li>
        <li class="weixin"><em><i class="i-weixin icon"></i></em><span>微信</span></li>
    </ul>
</mip-qz-sns>
```

## 属性

### url

说明：点赞url
必选项：是
类型：字符串

### params

说明：点赞参数，根据自己的业务自行组织
必选项：是
类型：json串

### source

说明：分享source
必选项：是
类型：字符串

### sourceurl

说明：分享sourceurl
必选项：是
类型：字符串

## 注意事项
点赞时的ajax拼接规则为 {url} + ? + $.param(JSON.parse({params}))
分享的title、description取自文档的title、description，source、sourceurl取自组件属性

