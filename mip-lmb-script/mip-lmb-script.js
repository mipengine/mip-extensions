/**
* 辣妈帮mip改造 javascript功能插件
* @file mil-lmb-script.js
* @author 981993907@qq.com
* @version 1.0.1
*/
define(function (require) {
    var customEle = require('customElement').create();
    customEle.prototype.build = function () {
        // URL跳转
        this.addEventAction("urlJump", function (event/* 对应的事件对象 */, url /* 跳转url */) {
           if(url){
               location.href=url;
			   //console.log(url);
           }
        });
        //切换元素显示
        this.addEventAction("toggleEle", function (event/* 对应的事件对象 */, id /* 元素ID */) {
           if(id){
			   //document.getElementById(id).style.display="none";
               var elemen=document.getElementById(id);  
               if(elemen.style.display=='block'){
                   elemen.style.display='none'; 
               }else{ 
                   elemen.style.display='block'
               };  
           }
        });
        //隐藏元素
        this.addEventAction("closeEle", function (event/* 对应的事件对象 */, id /* 元素ID */) {
           if(id){
			   document.getElementById(id).style.display="none";
           }
        });
    };
    return customEle;
});
