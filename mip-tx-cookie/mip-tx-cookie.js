/**
 * @file mip-tx-cookie 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var cookieTag=document.querySelectorAll('*[data-setCookie]');
        if(cookieTag.length>0){setCookie(cookieTag);}
    };
    function setCookie(cookieTag){
        for(var i=0;i<cookieTag.length;i++){
            var cookieInfo=JSON.parse(cookieTag[i].getAttribute("data-setCookie")),exp=cookieInfo.exp.replace(/[\s\t\xa0\u3000]/g,''),time=0;
            exp!=""?time=exp:'';
            var exp=new Date();
            exp.setTime(exp.getTime()+time*3600000);
            var d=time>0?cookieInfo.name+'='+encodeURIComponent(cookieInfo.data)+';expires='+exp.toGMTString()+';path='+cookieInfo.path:cookieInfo.name+'='+encodeURIComponent(cookieInfo.data)+';path='+cookieInfo.path;
            document.cookie=d;
        }
    }
    return customElement;
});
