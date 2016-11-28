# mip-huajun-loadmore

点击加载

描述|用来支持页面点击加载
----|----
类型|事件
支持布局| responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-huajun-loadmore/mip-huajun-loadmore.js

## 示例


```
<mip-huajun-loadmore url="{$Think.config.HOME_HOST_ADDRESS}/new/">
        <section id="list-soft__list">

            <div class="bd">
                <volist name="new_arr" id="na" offset="0" length="10">
                    <dl class="cl">
                        <a target="_blank" href="{$Think.config.HOME_HOST_ADDRESS}/soft/{$na.id}.htm">
                            <dt class="">
                                <mip-img src="{$Think.config.PUBLIC_HOST_ADDRESS}{$na.logo}"></mip-img>
                            </dt>
                            <dd>
                                <ul class="cl">
                                    <li>
                                        <h2>{$na.title}</h2>
                                    </li>
                                    <li>
                                        <span>{$na.filesize}M</span>
                                        <span class="pipe">/</span>
                                        <span>{$na.language}</span>
                                        <span class="pipe">/</span>
                                        <span>{$na.lastdotime}</span>
                                    </li>
                                    <li>
                                        <mip-img class="mip-xxstar" src="{$Think.config.HOME_HOST_ADDRESS}__PUBLIC__/img/xx-{$na.star}.png"></mip-img>
                                    </li>
                                </ul>
                            </dd>
                            <i class="icon-xiazai"></i>
                        </a>
                    </dl>
                </volist>
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

说明：ajax请求参数
必选项：是
类型：字符串
取值范围：请求url
单位：无
默认值：无

