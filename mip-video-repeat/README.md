# mip-video-repeat
mip-video-repeat 实现了带片头片尾和重播功能的视频组件

标题|内容
----|----
类型|业务,定制
支持布局|responsive,flex,container
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-video-repeat/mip-video-repeat.js

## 示例

### 基本用法
```html
<mip-video-repeat v-src="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    v-src-end="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    target-src="http://dianbo.vodjk.com/vod/xinma/jbl/wgk/2016/04/20/499DBA6FFCD74fc195C4C59859BDA08C.mp4"
    rec-video='[
                   {
                    "recTitle":"测试测试测试测试测试测试测试测试测试测试测试",
                    "recUrl":"http://vodcdn.idongde.com/provider/2/2017/8/29/114758q1iea4kuyv5dor49rudi/hd/3ed5dd514f4d48fdaa38a0fd6c9bca0e.mp4",
                    "recThumb":"https://www.idongde.com/upload/content/images/1504763970369234.jpg"
                   },
                   {
                    "recTitle":"测试测试测试测试测试测试测试测试测试测试测试",
                    "recUrl":"http://vodcdn.idongde.com/provider/2/2017/8/29/114758q1iea4kuyv5dor49rudi/hd/3ed5dd514f4d48fdaa38a0fd6c9bca0e.mp4",
                    "recThumb":"https://www.idongde.com/upload/content/images/1504694419262569.jpg"
                   }
               ]'>
    <div class="rec-video-wrapper">
        <div class="left-container">
            <div class="rec-video-container">
                <a class="rec-video" href="">
                    <div class="video-thumb"><mip-img layout="responsive" width="150" height="100" alt="推荐视频" src="https://www.idongde.com/upload/content/images/1504694419262569.jpg"></mip-img></div>
                    <p class="video-title"></p>
                </a>
            </div>
            <div class="rec-video-container">
                <a class="rec-video" href="">
                    <div class="video-thumb"><mip-img layout="responsive" width="150" height="100" alt="推荐视频" src="https://www.idongde.com/upload/content/images/1504694419262569.jpg"></mip-img></div>
                    <p class="video-title"></p>
                </a>
            </div>
        </div>
        <div class="right-container">
            <div class="video-replay-button">
                <span class="replay-icon">&#8634;</span><span class="title">重播</span>
            </div>
        </div>
    </div>
    <div class="video-mask">
        <div class="video-replay-button">
            <span class="iconfont">&#8634;</span>
        </div>
    </div>
</mip-video-repeat>
``` 

## 属性

### v-src
说明：片头视频的url地址               
必选项：是                   
类型：string

### v-src-end
说明：片尾url地址                                                                              
必选项：是                               
类型：string

### target-src
说明：视频正片的url地址           
必选项：是  
类型：string

### rec-video
说明：片尾结束显示的相关推荐视频                        
必选项：否                       
类型：JSON
#### recTitle
说明：相关推荐视频的标题                            
必选项：rec-video属性存在时必选                            
类型：string
#### recUrl
说明：相关推荐视频源地址                        
必选项：rec-video属性存在时必选                        
类型：string
#### recThumb
说明：相关推荐视频的封面缩略图                     
必选项：rec-video属性存在时必选                            
类型：string

## 注意事项  
- 仅支持移动端，强行使用pc端打开可能会有布局混乱的风险
- 在组件中基本实现了rem适配
- mip-video-repeat标签如果不添加rec-video属性，则只会显示重播按钮
- class="rec-video-wrapper"标签包含相关视频和重播
- class="video-mask"标签只包含重播
- 视频播放顺序为 片头 => 正片 => 片尾 => 显示相关功能界面
- 若想使用基本功能的视频播放组件请使用 mip-video 组件
