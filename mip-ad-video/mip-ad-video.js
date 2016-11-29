define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');

    var customElem = require('customElement').create();


    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.prerenderAllowed = function () {

        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);
        var adSrc = $element.attr("ad-src"),
            targetSrc = $element.attr("target-src"),
            adTime = $element.attr("ad-time");

        //初始化播放器
        var video = document.createElement("video");
        //广告剩余时间提醒
        var span_adTime = document.createElement("span");
        span_adTime.innerHTML = adTime + "";

        //设置一些video的属性
        $(video).attr({
            "playsinline": "",
            "webkit-playsinline": "",
            "autoPlay": ""
        });

        $element[0].appendChild(video);

        //如果有广告 则播放广告
        if (adSrc) {
            $element[0].appendChild(span_adTime);
            video.src = adSrc;

            //当开始播放 或者点击播放的时候 进行广告倒计时
            video.onplay = video.onclick = function () {
                video.onplay = video.onclick = null;
                var timeId = setInterval(()=> {
                    adTime--;
                    //刷新显示的广告秒
                    span_adTime.innerHTML = adTime;
                    //广告播放完毕
                    if(adTime <= 0){
                        span_adTime.style.display = "none";
                        clearInterval(timeId);
                        video.src = targetSrc;//替换播放源

                        video.setAttribute("controls", "");
                        video.load();
                        video.play();
                    }
                }, 1000);
            };
        } else {//否则直接播放内容
            video.src = targetSrc;
            video.setAttribute("controls", "");
        }

        // $element.html('<div class="videoyytf" id="videoyytf">' +
        //     '<video playsinline webkit-playsinline controls style="display: none; background-color: #000;" id="' + opt.playerId + '" width="100%" height="100%"></video>' +
        //     '</div>' +
        //     '<div class="videoyytftime">离广告结束还有 <span></span> 秒</div>' +
        //     '<div class="videoyytflink"><a target="_blank"><span>了解详情</span></a></div>'
        // )
    };

    return customElem;
});
