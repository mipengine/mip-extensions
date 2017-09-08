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
<head>
    <meta name="referrer" content="never"> //请求第三方图片地址请设置meta
    <script type="text/javascript">
      // 动态设置rem
        (function (win, doc) {
            var docEl = doc.documentElement;
           
            function setRemUnit () {
              var docWidth = docEl.clientWidth;
              var rem = docWidth / 10;
              docEl.style.fontSize = rem + 'px';
            }
           
            win.addEventListener('resize', function () {
              setRemUnit();
            }, false);
            win.addEventListener('pageshow', function (e) {
              if (e.persisted) {
                setRemUnit();
              }
            }, false);
           
            setRemUnit();
           
            if (win.devicePixelRatio && win.devicePixelRatio >= 2) {
              var testEl = doc.createElement('div');
              var fakeBody = doc.createElement('body');
              testEl.style.border = '0.5px solid transparent';
              fakeBody.appendChild(testEl);
              docEl.appendChild(fakeBody);
              if (testEl.offsetHeight === 1) {
                docEl.classList.add('hairlines');
              }
              docEl.removeChild(fakeBody);
            }
          }) (window, document);
    </script> 
</head>
...
<mip-video-repeat v-src="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    v-src-end="http://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    target-src="http://dianbo.vodjk.com/vod/xinma/jbl/wgk/2016/04/20/499DBA6FFCD74fc195C4C59859BDA08C.mp4"
    rec-video='[
                   {
                    "recTitle":"测试测试测试测试测试测试测试测试测试测试测试",
                    "recUrl":"http://vodcdn.idongde.com/provider/2/2017/8/29/114758q1iea4kuyv5dor49rudi/hd/3ed5dd514f4d48fdaa38a0fd6c9bca0e.mp4",
                    "recThumb":"https://i2.hdslb.com/bfs/archive/0916a87aa47f7953a914670395e3c409e19d0f0b.jpg@320w_200h.webp"
                   },
                   {
                    "recTitle":"测试测试测试测试测试测试测试测试测试测试测试",
                    "recUrl":"http://vodcdn.idongde.com/provider/2/2017/8/29/114758q1iea4kuyv5dor49rudi/hd/3ed5dd514f4d48fdaa38a0fd6c9bca0e.mp4",
                    "recThumb":"https://i2.hdslb.com/bfs/archive/0916a87aa47f7953a914670395e3c409e19d0f0b.jpg@320w_200h.webp"
                   }
               ]'>
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
- 必须在```head```标签中设置示例中的script脚本，以便在初始化页面时可以实现动态rem适配
- 示例中的```meta```标签，如果请求地址未有防盗链机制，可以删除
- 如果不添加rec-video属性，则只会显示重播按钮
- 视频播放顺序为 片头 => 正片 => 片尾 => 显示相关功能界面
- 若想使用基本功能的视频播放组件请使用 mip-video 组件
