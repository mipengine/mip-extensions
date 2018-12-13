# mip-qf-gameinstall

mip-qf-gameinstall 湖南七风119游戏主页游戏安装组件、可配合湖南七风下载逻辑组件使用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|
https://c.mipcdn.com/static/v1/mip-accordion/mip-accordion.js<br/>
https://c.mipcdn.com/static/v1/mip-qf-gameinstall/mip-qf-gameinstall.js

## 示例

```html
<mip-qf-gameinstall company-game="Y">
    <mip-qf-dlbtn data-isbp="Y">
        <i class="m-icon-apple"></i>
        <span>下载</span>
        <span class="u-game-size">（185.55MB）</span>
        <i class="u-icon-5yuan"></i>
    </mip-qf-dlbtn>
    <div class="m-guide-link">“企业签游戏”&nbsp;安装后，打不开？</div>

    <mip-accordion sessions-key="mip_3" animatetime='0.24' class="m-other-tip-box">
        <a href="https://m.119you.com/hynews/747448.shtml" class="u-install-tip">安装必读</a>
        <section>
            <span class="right u-other-version-tip">
                <span class="show-more">显示其他版本下载</span>
                <span class="show-less">收起</span>
            </span>
            <div class="mip-accordion-content m-version-list">
                <span>显示显示收起收起显示显示收起收起显示显示收起收起显示显示收起收起</span>
            </div>
        </section>
    </mip-accordion>
</mip-qf-gameinstall>
```

## 属性

### company-game

说明：游戏下载企业签标识
必选项：否
类型：String
取值范围：{'Y', 'N'}
默认值：无

### data-isbp

说明： 是否ios越狱包
必选项：否
类型：String
取值范围： {'Y','N'}

## 注意事项

