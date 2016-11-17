/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {

	
	var customElement = require('customElement').create();
    var $ = require('zepto');
    var init = require('./js/index');
    
    customElement.prototype.init = function () {
        $('#down_float_div').hide();
        $('.init-page-inner').removeClass('init-page-inner');

        $(init);
    };

    return customElement;
});

