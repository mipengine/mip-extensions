 define(function (require) { 
    var customElement = require('customElement').create();  
	
    /** [appendScriptEven 绑定事件] 
     * @param {Object} scriptUrl [mip-script-url元素]
     */
    function appendScriptEven(scriptUrl) {
		//根据js的路径请求js并添加到页面中
		var i = !1,
		o = document.createElement("script"),
		a = document.getElementsByTagName("script")[0],
		s = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
		l = s.getElementsByTagName("base")[0];
		o.charset = "utf-8";
		o.src = jsUrl;
		o.async = !0;
		//请求js的回掉函数
		o.onload = o.onreadystatechange = function() {  
			i || o.readyState && !/loaded|complete/.test(String(o.readyState)) || (i = !0, o.onload = o.onreadystatechange = o.onerror = null, o.parentNode.removeChild(o), o = null)
		};
		//请求js发生错误的时候的函数
		o.onerror = function() {  
			o.onload = o.onreadystatechange = o.onerror = null;
			o.parentNode.removeChild(o);
			o = null
		};
		//将js添加到页面中
		a.parentNode ? a.parentNode.insertBefore(o, a) : l ? s.insertBefore(o, l) : s.appendChild(o) 
    }

    /** [构造元素，只会运行一次]
     *
     */
    customElement.prototype.build = function () {
        var self = this;
        var scriptUrl = self.element.getAttribute('mip-script-url');
        appendScriptEven(scriptUrl);
    };

    return customElement;
});

