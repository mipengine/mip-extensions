/**
 * @file mip-ajax-html 组件
 * @author YanChengLong
 */

define(function (require) {

	var customElement = require('customElement').create();
	var $ = require('zepto');

	/** [bindEven 绑定事件]
	 *
	 * @param {Object} element [mip-ajax-html元素]
	 * @param {Object} params [来自mip-ajax-html的属性]
	 */
	function bindEven(element, params) {
		if (params.action) {
			$(element).on(params.action, '.add-handle', function () {
				$.getJSON(params.url, function (result) {
					$('.' + params.containerclass).append(result.html);
				});
			});
		} else {
			window.onload=function(){
				$.getJSON(params.url, function (result) {
					$('.' + params.containerclass).append(result.html);
				});
			};
		}
	}

	/** [构造元素，只会运行一次]
	 *
	 */
	customElement.prototype.build = function () {
		var self = this;
		var element = this.element;
		var params = JSON.parse($(element).attr('mip-ajax-params').replace(/'/g, '"'));
		bindEven(element, params);
	};

	return customElement;
});
