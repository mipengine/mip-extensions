/**
* 辣妈帮mip改造 javascript功能插件
* @file url跳转
* @author myoa@163.com
* @version 1.0.1
*/
define(function (require) {
    var customEle = require('customElement').create();
    customEle.prototype.build = function () {
        // 绑定事件，其它元素可通过 on="xxx" 触发
        this.addEventAction("custom_event", function (event/* 对应的事件对象 */, url /* 事件参数 */) {
           // console.log(str); // undefined or 'test_button' or 'test_button1'
           if(url){
               location.href=url;
           }
        });
    };
    return customEle;
});
