/**
 * @file mip-ruizhiqi-script 加载V3全局JS
 * @author Abin
 */
define(function (require) {
	//alert(1);
   var jq = require('jquery');
   //var $ = require('zepto');
   var customElem = require('customElement').create();

   var ScriptTag={
	    Bootstrap:function(){
			var bootstrap_tag = document.createElement('script');
			bootstrap_tag.setAttribute('type', 'text/javascript');
			bootstrap_tag.src =  'http://s.v3.hnrich.net/bootstrap/bootstrap.min.js';
			document.getElementsByTagName('head')[0].appendChild(bootstrap_tag);
		},
		RqPagin:function(){
			var rqpagin_tag = document.createElement('script');
			rqpagin_tag.setAttribute('type', 'text/javascript');
			rqpagin_tag.src =  'http://img.v3.hnrich.net/RuiQiCMS.Resource/Scripts/rqPagin.js';
			document.getElementsByTagName('head')[0].appendChild(rqpagin_tag);
		},
		Validate:function(){
			var validate_tag = document.createElement('script');
			validate_tag.setAttribute('type', 'text/javascript');
			validate_tag.src =  'http://img.v3.hnrich.net/RuiQiCMS.Resource/Scripts/jquery.validate.min.js';
			document.getElementsByTagName('head')[0].appendChild(validate_tag);

			var message_tag = document.createElement('script');
			message_tag.setAttribute('type', 'text/javascript');
			message_tag.src =  'http://img.v3.hnrich.net/RuiQiCMS.Resource/Scripts/messages_zh.min.js';
			document.getElementsByTagName('head')[0].appendChild(message_tag);
		},
		Thumb:function(){
			var thumb_tag = document.createElement('script');
			thumb_tag.setAttribute('type', 'text/javascript');
			thumb_tag.src =  'http://img.v3.hnrich.net/RuiQiCMS.Resource/Scripts/jQThumb.js';
			document.getElementsByTagName('head')[0].appendChild(thumb_tag);
		},
		Clicks:function(){
			var clicks_tag = document.createElement('script');
			clicks_tag.setAttribute('type', 'text/javascript');
			clicks_tag.src =  'http://img.v3.hnrich.net/RuiQiCMS.Resource/UserSite/clicks.js';
			document.getElementsByTagName('head')[0].appendChild(clicks_tag);
		},
		Init:function(){
			this.Bootstrap();
			this.RqPagin();
			this.Validate();
			this.Thumb();
			this.Clicks();
		}
   };

	 /**
     * build
     */
    customElem.prototype.build = function () {
		ScriptTag.Init();
	};
	

	return customElem;
});