/**
 * @file mip-like 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var element = this.element;
        var url = $(element).attr('fetch-url');
        var methodBox = $(element).attr('data-method');
        var self = this;
        this.addEventAction('toggle', function (event) {
            fetchBox()
        });

        // 数据请求处理
        function fetchBox(){
	        fetch(url,{
	        	method:methodBox
	        }).then(function (res) {
	        	res.json().then(function(data){
	        		if(data.status==200){
	        			$(element).addClass('mip-active');
	        		}
	        		alert(data.message)
	        	})
	        }).catch(function (err) {
	            alert('网络出错！')
	        });
        }
        
    };
    return customElement;
});
