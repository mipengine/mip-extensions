/**
 * @file 点击轮流显示内容
 * @author Zhang
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function generalityTab(){
		$(".f-showhide-function").each(function(){
			var pageInfo = {
				btnshow: $(this).attr('data-btnshow')
			};
			if(pageInfo.btnshow == 'true'){
				$(this).find('.f-hideshow-cont').first().show().siblings('.f-hideshow-cont').hide();        
			}else{
				$(this).find('.f-hideshow-cont').hide();        	
			}
			
		})	
		var btnText = ['查看全部', '收起内容'];
		var numbI = 0;
		$('.f-hideshow-btn').click(function(){		
			if(numbI<btnText.length-1){
				numbI++;
				$(this).text(btnText[numbI]);
			}else{
				numbI=0;
				$(this).text(btnText[numbI]);
			}
			
			var pageInfo = {
				btnshow: $(this).parents('.f-showhide-function').attr('data-btnshow'),
				btnshowtext: $(this).parents('.f-showhide-function').attr('data-btnshowtext'),
				btnhidetext: $(this).parents('.f-showhide-function').attr('data-btnhidetext'),
				contsize: $(this).parents('.f-showhide-function').find('.f-hideshow-cont').length,
				parentFind:$(this).parents('.f-showhide-function').find('.f-hideshow-cont')
			};
			if(pageInfo.btnshow == "true"){
				var number = $(this).attr('data-num');				
				if(number < pageInfo.contsize-1){
					number++;
					pageInfo.parentFind.eq(number).show().siblings('.f-hideshow-cont').hide();					
					$(this).attr('data-num',number);
				}else{
					number=0;	
					pageInfo.parentFind.eq(number).show().siblings('.f-hideshow-cont').hide();
					$(this).attr('data-num',number);
				}	
			}else{
				$(this).hide();	
				pageInfo.parentFind.first().show().siblings('.f-hideshow-cont').hide();
			}
		})
	}
    customElem.prototype.build = function () {
        generalityTab();
    };
    return customElem;
});
