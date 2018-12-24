# mip-qf-commentsubmit

mip-qf-commentsubmit 湖南七风119游戏主页评论发布组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-commentsubmit/mip-qf-commentsubmit.js<br/>
https://c.mipcdn.com/static/v1/mip-form/mip-form.js

## 示例

### 基本用法
```html
<mip-qf-commentsubmit prefix="https://www.easy-mock.com/mock/5c0f88505324d050e6ab19fa/m.119you.com/" data-url="api/member/logindata" columns="realname,username,logofile,signature,score,level,levelid">
    <div class="div-img">
        <mip-img src="https://m.119you.com/images/v2/ic-user-default.png" class="img" width="30" height="30"></mip-img>
    </div>
    <div class="td td2">
         <textarea class="textarea" placeholder="请输入评论内容" rows="10" cols="20" disabled></textarea>
        <div class="div-action clearfix">
            <a class="link link-not-login">您还没有<span class="text-blue">登录</span>，请先登录再评论</a>
            <input type="submit" class="btn-submit" value="发表">
        </div>
    </div>
</mip-qf-commentsubmit>
```

## 属性

### prefix

说明：接口地址前缀
必选项：是
类型：URL

### data-url

### prefix

说明：接口地址后缀
必选项：否
类型：URL
默认值: '/api/member/logindata'

### columns

说明：请求参数
必选项：是
类型：String

## 注意事项

