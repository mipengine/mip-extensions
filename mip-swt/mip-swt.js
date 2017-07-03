/**
 * @file mip-swt 组件
 * @author
 */

define(function(require) {
	var customElement = require('customElement').create();

  
	/**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function() {
        var element = this.element;
        var id = element.getAttribute('id');
        var time = element.getAttribute('swt-time');
		var t=document.getElementById(id);
		document.getElementById(id).className.replace("noe","");
		document.getElementById('swt-close').onclick=function(){			
			t.setAttribute('class', 'swt-close');			
			setTimeout(function(){document.getElementById(id).setAttribute("class","")},time)			 
		}
		};
    return customElement;
});