/**
* 寻医问药mip改造 搜索和定位功能组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2016.11.25
* @version 1.0.0
*/
define(function(require){
    var $ = require('zepto');
	var customElem = require('customElement').create();
	var searchFun = function(){
		//顶部搜索
		var itemInpDef = '帮您寻医问药';
		$('#item_so_keyword').on({
			focus:function(){
				if($(this).val() == itemInpDef){
					$(this).val('');
					$(this).css('color','#666');	
				}
			},
			blur:function(){
				if($(this).val() == ''){
					$(this).val(itemInpDef);
					$(this).css('color','#c6c6c6');
				}
			}
		});
		$('.item-hd-so-input-box').on('click',function(){
			$('.item-hd-so-area').addClass('item-hd-so-focus');
		});
		$('.item-hd-so-back').on('click',function(){
			$('.item-hd-so-area').removeClass('item-hd-so-focus');
			$('#item_so_keyword').val(itemInpDef).css('color','#c6c6c6');
		});
		$('#item_hd_form form').on('submit', function(){
			var textVal = $.trim($('#item_so_keyword').val()),
				srcType = $('#item_so_keyword').attr('src_type');
			if(textVal == '帮您寻医问药') {
				textVal = '';
			}else {
				textVal = textVal;
			}
			$(this).attr('method', 'post').attr('action', 'http://m.so.xywy.com/comse.php?src='+ srcType + '&keyword=' + encodeURIComponent(textVal));
		});
		$(".login-bar").click(function(){
			$(this).toggleClass("lonsg");
			$(".Extension").toggle();
		});
		//进来的统计
		window.Quan_X = 0;
		window.Quan_Y = 0;
		var im=new Image; im.src="https://stat-z.xywy.com/test.png?t_c=1&tt"+Math.random();
		function getPos(callback){
			var longitude = 0, //经度
				latitude = 0, //纬度
				options;
			options = {
			   enableHighAccuracy:true,
			   maximumAge: 10000
			};
			if(typeof callback != 'function'){
				//alert('callback参数须为函数');
				return false;
			}
			if(localStorage.longitude && localStorage.latitude){
				callback(localStorage.longitude, localStorage.latitude); //直接传入本地存储的经度和纬度
				return false;
			}
			if(navigator.geolocation){
			   navigator.geolocation.getCurrentPosition(showPosition, showError, options);
			}
			function showPosition(position){
				localStorage.longitude = longitude = position.coords.longitude; //经度
				localStorage.latitude = latitude = position.coords.latitude; //纬度
				callback(longitude, latitude);//传入经纬度
			}
			function showError(error){
				//定位失败的统计
				im=new Image; im.src="https://stat-z.xywy.com/test.png?t_c=3&tt"+Math.random();
			}
		}
		if(navigator.userAgent.indexOf('UCBrowser') > -1){
			return false;
		}else{
			getPos(function(x, y){
				//x--经度, y--纬度
				//定位成功的统计
				im=new Image; im.src="https://stat-z.xywy.com/test.png?t_c=2&tt"+Math.random();
				Quan_X=x;
				Quan_Y=y;
			});
		}
	};
   // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
       var elem = this.element;
	   searchFun();
	}
	return customElem;
});