/**
 * @file 网页公告上下滑动
 * @author  seinm
 * @time 2016.12.30
 */
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    var platform = util.platform;
	
    /**
     * Builder.
     */
    customElement.prototype.build = function () {
        var element = this.element;
		
		if (element.size() ==0)  return;
			element.css({
			overflow:'hidden'
		});
		
		var RollH = element.height();
		var ul = element.find("ul");
		var li = ul.find("li");
		var num = 1;
		var moveDistence = -num*RollH;
		var cloneFirstLi = li.eq(0).clone();
			ul.append(cloneFirstLi);
			li = ul.find("li");
		var Size = li.size();
		autoRoll();
		
		
		function autoRoll () {
			if (num == Size) {
				 ul.css({top:0});
				 num =1;
				 moveDistence = -num*RollH;
				 autoRoll();
			} else {
				setTimeout(function () {
					ul.animate({
						top : moveDistence
					},"slow",function () {
						num++;
						moveDistence =  -num*RollH;
						autoRoll();
					});
				},2000);
			}
			
	    }
    };

    return customElement;
});
