define(function (require) {

var $ = require('zepto');
var customElem = require('customElement').create();

function Open()
{
	$(".icon_open").on("click",function(){
        $(".nav .hide").removeClass("hide");
        $(".icon_open").hide();
        $(".icon_close").show();
        $(".icon_close").css("display","block");
    });

}

function Close()
{
   $(".icon_close").on("click",function(){
        $(".open").addClass("hide");
        $(".icon_open").show();
        $(".icon_close").hide();
    });
}

function Init()
{
	Open();
	Close();
}

 customElem.prototype.build = function () {
        Init();
    };
    return customElem;

});