define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();
	var loadJs = function(elem, url, callback){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $(elem).append(script);
		if(typeof callback != 'function'){
			
			return false;
			
		}else{
			script.onload = function(){
			
				callback();
			}
			
		}
	};
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
       var elem = this.element;
	   var attr = $(elem).attr('aid');
	   var channel = $(elem).attr('channel');
	   var department = $(elem).attr('department');
	   switch(attr){
		   case 'take_ip':
			loadJs(elem, 'http://ip.display.xywy.com/take_ip', function(){
				if(typeof channel == 'undefined'){
					loadJs(elem, 'http://a.xywy.com/display/display_load.js', function(){
						var ggArr = {}; 
						var string = '';
						$.each( keys_arr, function(index, value) { 
						  string = string +'|'+ value; 
						});
						ggArr['ad_key'] = string.substr(1);
						mobileAd.getAd( ggArr );
					});
					
				}else{
					loadJs(elem, 'http://a.xywy.com/mobile_v3.js', function(){
						var ggArr = {}; 
						var string = '';
						$.each( keys_arr, function(index, value) { 
						  string = string +'|'+ value; 
						});
						ggArr['ad_key'] = string.substr(1);
						ggArr['department'] = department;
						mobileAd.getAd( ggArr );
					});
					
				}
				
			});
		    break;
		   case 'stat':
			loadJs(elem, 'http://a.xywy.com/stat.js');
		    break;
		   case 'tongji': 
			loadJs(elem, 'http://stat.xywy.com/a.js');
		    break;
		   case 'odm': 
			loadJs(elem, 'http://stat.xywy.com/odm.js');
		    break;
		   case 'visit': 
			loadJs(elem, 'http://stat.xywy.com/visit.js');
		    break;
		   case 'get_ip': 
			loadJs(elem, 'http://page.xywy.com/get_ip');
		    break;
			default:
			break;
	   }
		
	}
	
	return customElem;
});