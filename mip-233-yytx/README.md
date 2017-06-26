
# mip-233-yytx

预约提醒插件

标题|内容
----|----
类型|业务,广告
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-233-yytx/mip-233-yytx.js

## 示例

``` html
    <mip-233-yytx data-domain="jzs1">
        <div class="baoming-btn"><a href="#" class="orange-btn"><i class="icon-phone"></i>手机预约提醒</a></div>
        <div class="body_mask hide">
            <div class="popup">
                <div class="popup-cma clearfix">
                    <h3>手机预约提醒<span class="close-btn">关闭</span></h3>
                    <ul class="w1 clearfix">
                        <li class="btbd">
                            <span class="f-fl">地区:</span>
                            <div class="jiantou">
                                <!--mip-form 插件-->
                                <mip-form method="get" url="https://www.233.com">
                                    <select id="yydiqu" class="Area">
                                        <option value="13">北京</option>
                                        <option value="14">天津</option>
                                        <option value="15">上海</option>
                                        <option value="16">江苏</option>
                                        <option value="17">浙江</option>
                                        <option value="18">山东</option>
                                        <option value="19">江西</option>
                                        <option value="20">安徽</option>
                                        <option value="21">广东</option>
                                        <option value="22">广西</option>
                                        <option value="23">海南</option>
                                        <option value="24">辽宁</option>
                                        <option value="25">吉林</option>
                                        <option value="26">黑龙江</option>
                                        <option value="27">内蒙古</option>
                                        <option value="28">山西</option>
                                        <option value="29">福建</option>
                                        <option value="31">河南</option>
                                        <option value="33">河北</option>
                                        <option value="34">湖南</option>
                                        <option value="35">湖北</option>
                                        <option value="36">四川</option>
                                        <option value="37">重庆</option>
                                        <option value="38">云南</option>
                                        <option value="39">贵州</option>
                                        <option value="40">新疆</option>
                                        <option value="41">西藏</option>
                                        <option value="42">陕西</option>
                                        <option value="43">青海</option>
                                        <option value="44">宁夏</option>
                                        <option value="45">甘肃</option>
                                        <option value="49">全国</option>
                                    </select>
                                </mip-form>
                                <!--/mip-form 插件-->
                                <i class="enter-ico2"></i>
                            </div>
                        </li>
                        <li class="btbd">
                            <span class="f-fl">报考科目:</span>
                            <div class="jiantou">
                                <!--mip-form 插件-->
                                <mip-form method="get" url="https://www.233.com">
                                    <select class="clearfix" id="kemu">
                                        <option value="9"  class="text-align-right">工程经济</option>
                                        <option value="10" class="text-align-right">工程法规</option>
                                        <option value="11" class="text-align-right">项目管理</option>
                                        <option value="12" class="text-align-right">建筑工程</option>
                                        <option value="13" class="text-align-right">市政工程</option>
                                        <option value="14" class="text-align-right">机电工程</option>
                                        <option value="15" class="text-align-right">公路工程</option>
                                        <option value="16" class="text-align-right">水利水电</option>
                                        <option value="17" class="text-align-right">矿业工程</option>
                                        <option value="18" class="text-align-right">铁路工程</option>
                                        <option value="19" class="text-align-right">通信与广电</option>
                                        <option value="20" class="text-align-right">民航机场</option>
                                        <option value="21" class="text-align-right">港口与航道</option>
                                    </select>
                                    <i class="enter-ico2"></i>
                                </mip-form>
                                <!--/mip-form 插件-->
                            </div>
                        </li>
                        <li class="btbd"><span class="f-fl">姓名:</span>
                            <div class="jiantou">
                                <!--mip-form 插件-->
                                <mip-form method="get" url="https://www.233.com">
                                    <input class="txt" id="fullname" name="fullname" placeholder="" type="text" value="填写真实姓名">
                                </mip-form>
                                <!--/mip-form 插件-->
                            </div>
                        </li>
                        <li class="btbd">
                            <span class="f-fl">手机:</span>
                            <div class="jiantou">
                                <!--mip-form 插件-->
                                <mip-form method="get" url="https://www.233.com">
                                    <input class="txt" id="chr_masswarp" name="chr_masswarp" placeholder="" type="text">
                                </mip-form>
                                <!--/mip-form 插件-->
                            </div>
                        </li>
                        <li>
                            <span class="f-fl">短信验证:</span>
                            <div class="jiantou">
                                <span class="st-btn3" id="getyanzheng" >获取验证码</span>
                                <!--mip-form 插件-->
                                <mip-form method="get" url="https://www.233.com">
                                    <input class="w2 txt" id="smsCode" name="smscode" placeholder="" type="text">
                                </mip-form>
                                <!--/mip-form 插件-->
                            </div>
                        </li>
                    </ul>
                    <div class="m-nerror cRed"></div>
                    <div class="btma"><span class="orange-btn" id="queding">提交</span></div>
                </div>
            </div>
        </div>
    </mip-233-yytx>
```
