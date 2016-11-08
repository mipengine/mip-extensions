/**
 * 
 */
define(function (require) {
	// mip 组件开发支持 zepto
    var $ = require('zepto');
    $(".header_menu").click(function() {
    	$('#daohang').toggle();
    });
});