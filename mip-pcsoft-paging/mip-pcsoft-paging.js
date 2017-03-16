/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2016 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    var strUrl = window.location.pathname;
        var arrUrl = strUrl.split("/");
        var strPage = arrUrl[arrUrl.length-1];
        var indexof = strPage.indexOf("?");
        if(indexof != -1){
            strPage = strPage.substr(0,strPage.indexOf("?"));
        }
        var reg = /_(.*)\.html/;
        var arr = strUrl.match(reg);
        if (arr != null){
            var num = Number(arr[1]);
        }else{
            $("#up_page").hide();
            var num = null;
        }

        function init(){
            $("#next_page").click(function(){
                var url = '';
                if(num == null){
                    page = 2;
                }else{
                    page = num + 1;
                }
                url = strUrl.replace(strPage,'index_'+page+'.html') ;
                NetPing(url);

            });
            $("#up_page").click(function(){
                var url = '';
                if(num == 2){
                    url = strUrl.replace(strPage,'index.html');
                }else{
                    page = num - 1;
                    url = strUrl.replace(strPage,'index_'+page+'.html');
                }
                window.location.href = url;
            })

        }

        function NetPing(url) {
            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                data: "",
                success: function() {

                    window.location.href=url;
                },
                error: function() {
                    alert("已经是最后一页了")
                }
            });

        }

        
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
