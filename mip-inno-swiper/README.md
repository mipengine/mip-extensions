# mip-inno-swiper

mip-inno-swiper 实现innotopia的swiper

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-inno-swiper/mip-inno-swiper.js

## 示例

### 基本用法
```html
<mip-inno-swiper data-name="top" layout="responsive" width="640" height="994" data-pagination="swiper-pagination-head" data-pagination-clickable="1">
<div class="swiper-container top">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <mip-img layout="responsive" width="640" height="994" src="http://cdn.innotopia.cn/cdn/m/assets/img/slide1.jpg" alt=""></mip-img>
            </div>
            <div class="swiper-slide">
                <mip-img layout="responsive" width="640" height="994" src="http://cdn.innotopia.cn/cdn/m/assets/img/slide1.jpg" alt=""></mip-img>

            </div>

            <div class="swiper-slide">
                            <mip-img layout="responsive" width="640" height="994" src="http://cdn.innotopia.cn/cdn/m/assets/img/slide1.jpg" alt=""></mip-img>

            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-head"></div>
    </div></mip-inno-swiper>

 <ul class="cando">
            <li class="selected"><a href="javascript:;">省心</a></li>
            <li><a href="javascript:;">省钱</a></li>
            <li><a href="javascript:;">安全</a></li>
        </ul>
        <a href="#" class="btn tiyan"></a>
    <mip-inno-swiper data-name="cando-swiper" layout="responsive" width="640" height="561"  data-slides-perview="1.5"  data-pagination-clickable="1" data-loop="true" data-space-between="30">

        <div class="swiper-container cando-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="http://cdn.innotopia.cn/cdn/m/assets/img/shengxin1.jpg" alt=""/>
                    <p>
                        专业研发“空间规划报告”，内含百余项题目，为您的需求完美画像！3天即出具全景效果和落地方案，硬装、软装、精细化统统包含，省心为您，只想懂你多一点
                    </p>
                </div>
                <div class="swiper-slide">
                    <img src="http://cdn.innotopia.cn/cdn/m/assets/img/shengqian1.jpg" alt=""/>
                    <p>
                        优选供应链，阿姆斯壮、多乐士、西蒙电气、雅风家具、永艺椅业、高嘉地毯等厂家直供，确保套系化产品超高性价比！免去反复比价的烦恼！节省30%不是梦！
                    </p>
                </div>
                <div class="swiper-slide">
                    <img src="http://cdn.innotopia.cn/cdn/m/assets/img/anquan1.jpg" alt=""/>
                    <p>
                        全包客户附送“空气清洁包”，长效清除甲醛，效果看得见。让您拎包上班更迅速，创业办公占先机！确保员工安心开工!
                    </p>
                </div>
            </div>
        </div>
        </mip-inno-swiper>

        <mip-inno-swiper data-name="case" layout="responsive" width="640" height="704" data-pagination="swiper-pagination-case">
                <div class="swiper-container case">

                    <div class="swiper-wrapper ">
                        <div class="swiper-slide">
                            <div class="container">
                                <a href="case_qhealth.html"><img src="http://cdn.innotopia.cn/cdn/m/assets/img/index_case_qhealth.jpg" alt=""/></a>
                                <p>QHealth Inno Lab</p>
                                <p>2016/08</p>
                            </div>

                        </div>
                        <div class="swiper-slide">
                            <div class="container">
                                <a href="case_kunshan.html"><img src="http://cdn.innotopia.cn/cdn/m/assets/img/index_case_kunshan.jpg" alt=""/></a>
                                <p>复客中国昆山移动物联网众创空间</p>
                                <p>2016/06</p>
                            </div>

                        </div>
                        <div class="swiper-slide">
                            <div class="container">
                                <a href="case_fuke.html"><img src="http://cdn.innotopia.cn/cdn/m/assets/img/index_case_fuke.jpg" alt=""/></a>
                                <p>复客中国北外滩滨江众创空间</p>
                                <p>2015/11</p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="container">
                                <a href="case_yun.html"><img src="http://cdn.innotopia.cn/cdn/m/assets/img/index_case_yunshang.jpg" alt=""/></a>
                                <p>云熵网络</p>
                                <p>2015/06</p>
                            </div>

                        </div>
                    </div>
                                        <div class="swiper-pagination swiper-pagination-case"></div>

                                        </div>

                </mip-inno-swiper>
```
## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

