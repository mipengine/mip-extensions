# mip-huajun-loadmore

点击加载更多组件

|标题|内容|
|----|----|
|类型|事件|
|支持布局|N/S|
|所需脚本|https://c.mipcdn.com/static/v1/mip-huajun-loadmore/mip-huajun-loadmore.js|

## 示例


```
<mip-huajun-loadmore url="{$Think.config.HOME_HOST_ADDRESS}/search/" scon="{$scon}" sid="{$sid}">
        <section id="list-soft__list">

            <div class="bd">
                <foreach name="sarr" item="sear_con">
                    <dl class="cl">
                        <a target="_blank" href="{$Think.config.HOME_HOST_ADDRESS}/soft/{$sear_con.id}.htm">
                            <dt class="">
                                <mip-img src="{$Think.config.PUBLIC_HOST_ADDRESS}{$sear_con.logo}"></mip-img>
                            </dt>
                            <dd>
                                <ul class="cl">
                                    <li>
                                        <h2>{$sear_con.title}{$sear_con.version}</h2>
                                    </li>
                                    <li>
                                        <span>{$sear_con.filesize}M</span>
                                        <span class="pipe">/</span>
                                        <span>{$sear_con.language}</span>
                                        <span class="pipe">/</span>
                                        <span>{$sear_con.lastdotime}</span>
                                    </li>
                                    <li>
                                        <mip-img class="mip-xxstar" src="{$Think.config.HOME_HOST_ADDRESS}__PUBLIC__/img/xx-{$sear_con.star}.png"></mip-img>
                                    </li>
                                </ul>
                            </dd>
                            <i class="icon-xiazai"></i>
                        </a>
                    </dl>
                </foreach>
            </div>
        </section>
            <div id="pages">
                <div name="laypage1.3" class="laypage_main laypageskin_flow" id="laypage_0">
                    <span class="laypage_next" data-page="2">查看更多</span>
                </div>
            </div>
        </mip-huajun-loadmore>
```
## 属性

### url

说明：ajax请求地址
必选项：是
类型：字符串
取值范围：请求url
单位：无
默认值：无

### scon

说明：软件内容
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### sid
说明：该类id
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无





