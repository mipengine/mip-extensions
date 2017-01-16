/**
 * @file mip-btn-toggle 组件
 * @author
 */

define(function (require) {
	var $ = require("jquery");
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
          var element = this.element;
       	  var hsId = $(element).attr('hsId');
       	  var obj =  $(element).find(".hideshowbtn");
       	  $(element).on('click',function(){
       	  	if (hsId == 1) {
       	  		if($(".top_menu_wrap").is(":hidden")){
       	  			$(element).addClass("on");
       	  			 $(".top_menu_wrap").stop().slideDown();
       	  		}else{
       	  			$(element).removeClass("on");
       	  			$(".top_menu_wrap").stop().slideUp();
       	  		}
       	  	}else if (hsId == 0) {
       	  		if ($(".search_box").is(":hidden")) {
       	  			  $(".search_box").stop().fadeIn("5000");
       	  		};
       	  	}else if (hsId == 2 ) {
       	  		  $(".search_box").stop().fadeOut("5000");
       	  	}else if(hsId ==3){
       	  		  $(".search_box").stop().fadeOut("5000");
       	  	}
       	  })
    };
    
    return customElement;
});
