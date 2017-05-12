define(function(require) {
    var zepto = require('zepto');
    
    var util = require('util');
    var default_func = {
        //build 方法，元素插入到文档时执行，仅会执行一次
        build:function(){
            var $el = zepto(this.element),
                platform = util.platform,
                prev_class="mip-game4399-download",
                gameload_url = '';
            
            if(platform.isIos()){
                gameload_url = $el.attr("ios-downsrc");
            }else if(platform.isAndroid()){
                gameload_url = $el.attr("android-downsrc");
            }else{
                gameload_url = $el.attr("other-downsrc");
            }
            if(!gameload_url){
                gameload_url = $el.attr("android-downsrc");
            }
            var html = [];
            html.push('<div class="'+prev_class+'-box '+prev_class+'-pm10">    ');
            html.push('    <div class="'+prev_class+'-content">        ');
            html.push('        <div class="'+prev_class+'-textbox"><div class="'+prev_class+'-text"><p>'+$el.attr("texttip")+'</p></div></div>      ');  
            html.push('        <div class="'+prev_class+'-downbtn"><a href="'+gameload_url+'" target="_blank">'+$el.attr("downbtntext")+'</a></div>     ');   
            html.push('    </div>');
            html.push('</div>');
            $el.html(html.join(""));
        },
        // 创建元素回调
        createdCallback:null,
        // 向文档中插入节点回调
        attachedCallback:null,
        // 从文档中移出节点回调
        detachedCallback:null,
        // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
        firstInviewCallback:null,
        // 进入或离开可视区回调，每次状态变化都会执行,一个参数，true 进入可视区;false 离开可视区
        viewportCallback:null,
        // 控制viewportCallback、firstInviewCallback是否提前执行
        // 轮播图片等可使用此方法提前渲染
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        prerenderAllowed:null
    }

    //全部整合一下。
    var customElem = require('customElement').create();
    for(var i in default_func){
        if( typeof default_func[i] == 'function'){
            customElem.prototype[i] = default_func[i];
        }
    }
    return customElem;
});