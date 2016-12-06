/**
*  
* @file 脚本支持
* @author  
* @time  
* @version 1.0.0
*/
define("mip-iask-report",['require', 'customElement', 'zepto'],function(require) {
	var $ = require('zepto');
	var customElem = require('customElement').create();
	var openReportDiv =  function(elem) {
		$("#report-div").show();
		var questionId = $(elem).attr('questionId');
		var type = $(elem).attr('type');
		var typeId = $(elem).attr('typeId');
		$("#report_id").text(questionId);
		$("#report_type").text(type);
		$("#report_typeId").text(typeId);
	};
	// build 方法，元素插入到文档时执行，仅会执行一次
	customElem.prototype.build = function () {
		var elem = this.element;
		var click = $(elem).attr("typeId");
		var type = $(elem).attr("type");
		$("#"+type+"_"+click).on('click',function(){
			// 打开举报div
			openReportDiv(elem);
		});
	};
	return customElem;
});

require(['mip-iask-report'], function (plugindemo) {
    // 注册mip-iask-report 组件
    MIP.registerMipElement('mip-iask-report', plugindemo);
});
