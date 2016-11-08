define('mip-360doc-script', ['require', 'customElement', 'zepto'], function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        $("#backgroundPopup1").click(closeceng);
        $("#docShare").click(share);
        $("#wxShare").click(wxshare);
        $(".guanbi").click(closeartnew);
        getRefNum();
        $("#wxggalink").html("<span class=\"pic\"><img src=\"http://www.360doc.cn/images/a1.png?t=2016032801\" class=\"pic2\"/></span><span class=\"pic\"><img src=\"http://www.360doc.cn/images/a2.png?t=2016032801\"  class=\"pic2\"/></span>");
        var index = 1;
        var $_picn = $(".pic").length;
        if ($_picn > 1) {
            $(".pic").eq(0).show().siblings(".pic").hide();
        }
        $("#artnewdiv").css("display","");
        setone();       
    };

    //第三方分享
    function share() {
        if ($("#sharetobaidu").css("display") == "none" || $("#sharetobaidu").css("display") == "") {
            $("#sharetobaidu").show();
            $("#sharelayer").css("display","");
            $("#backgroundPopup1").css("display", "block");
            $("#headyinidtemp").hide();
            $("#urllayer").hide();
        }
        else {
            $("#sharetobaidu").hide();
            $("#sharelayer").hide();
            $("#backgroundPopup1").hide();
            $("#headyinidtemp").show();
            $("#urllayer").hide();
        }
    }
    //广告轮播
    function setone() {
        setTimeout(function () {
            show(1);
            settwo();
        }, 3000);
    }
    //广告轮播
    function settwo() {
        setTimeout(function () {
            show(0);
            setone();
        }, 4000);
    }
    function show(index) {
        $(".pic").eq(index).show().siblings(".pic").hide();
    }
    //获取评论数
    function getRefNum() {
        var artid = getID();
        if (artid == "")
            return;

      
        $.ajax({
            type: 'POST',
            url: 'https://transfer.360doc.cn/ajax/Handler.ashx',
            data: "id=" + artid,
            success: function (data) {
                var useridref = data.split("|");
                if (useridref[1] != null && useridref[1] != "") {
                    $("#refnum").html(useridref[1]);
                }
                else {
                    $("#refnum").html('0');
                }            
                $("#flowernum").html("献花(" + useridref[3]+ ")");
            },
            error: function () {}
        })

    }
    //获取文章id
    function getID() {
        var url = $("#resaveid").attr('href');
        
        if (url.indexOf("360doc") < 0)
            return "";
        var index = url.indexOf("artid=");
        if (index <= 0)
            return "";
        var index2 = url.indexOf("&", index);
        if (index2 <= 0)
            return "";  
        var artid = url.substr(index + 6, index2 - index - 6);

        return artid;
    }

    //关闭遮罩层
    function closeartnew() {
        $("#artnewdiv").hide();
    }
    if (navigator.userAgent.toLowerCase().indexOf("ucbrowser") > -1) {

        $("#toptoolbar").width("69%");
    }

    //关闭分享层
    function closeceng() {
        $("#sharetobaidu").hide();
        $("#backgroundPopup1").hide();
        $("#headyinidtemp").show();
        $("#urllayer").hide();
    }

    //分享到微信地址
    function wxshare() {
        $("#urllayer").show();
        $("#sharelayer").hide();
    }   
        
    return customElem;
});

require(['mip-360doc-script'], function (plugin) {
    // 注册mip-ck-script组件
    MIP.registerMipElement('mip-360doc-script', plugin);
});