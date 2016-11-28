define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();
	
	var yybID = 1002060;
	var iosDN = 'http://h5channel.51pgzs.com/index.php?qid=waitui035';
	var ppDN = 'http://ucan.25pp.com/PPAssistant_PM_4008.apk';
	var wdjDN = 'http://dl.wandoujia.com/files/jupiter/latest/wandoujia-fangbei10_ad.apk';

	var u  = navigator.userAgent;
	var os = 'an';if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1){var os = 'ios';}
		
	function apkdown(){
		var ad = $("#down").attr("ad");
		var aid = $("#down").attr("aid");
		var addr = $("#down").attr("addr");
		var baoliu = $("#down").attr("baoliu");
		if(ad){
			var t1 = '使用应用宝安装';
			var t2 = '应用宝是全面、专业的应用市场，将为您安装应用宝，启动高速引擎，安全无毒、极速下载应用！';
			var t3 = '豌豆荚是全面、专业的应用市场，将为您安装豌豆荚，启动高速引擎，安全无毒、极速下载应用！';
			var t = '使用普通下载无法避免流量劫持、下载较慢等问题，建议选择豌豆荚安装高速下载！';
			if (gc('pp')==null || gc('yyb')==null){
				
				var t1 = '使用皮皮助手';
				var t2 = '皮皮助手是全面、专业的应用市场，将为您安装皮皮助手，启动高速引擎，安全无毒、极速下载应用！';
				var t = '使用普通下载无法避免流量劫持、下载较慢等问题，建议选择皮皮助手安装高速下载！';
				
				//加载pp-dl.js
				var script = document.createElement("script");  
                script.src = "/js/pp-dl.js";
                var firstChild = document.head.firstChild;
                document.head.insertBefore(script,firstChild);
			}
			
			var downbox = document.getElementById('down');
			downbox.innerHTML='<i>'+t1+'</i><s id="gaosu" ur="'+addr+'" aid="'+aid+'">高速下载</s><p >'+t2+'</p><u style="display: none;">'+t+'</u>';
		}
		else{
			var downbox = document.getElementById('down');
			downbox.innerHTML='<a href="javascript:gaosu()" ur="'+addr+'" aid="'+aid+'" class="pt">立即下载</a>';
		}
	}

	function do_down(){
		//下载切换
		var flag=1;
		$("#down i").click(function(){
			if(flag==1){
				
				$('#down').attr('class','no');
				$('#down s').text('普通下载');
				$('#down p').attr('style','display:none');
				$('#down u').attr('style','display:block');
				flag=0;
			}else{
				$('#down').attr('class','');
				$('#down s').text('高速下载');
				$('#down p').attr('style','display:block');
				$('#down u').attr('style','display:none');
				flag=1;
			}
		});
		//	
	}

	function gaosu(){
		if($('#down.no').length>0 || $('#down s.pt').length>0){
			if($('#down>s:first').attr('ur').length>0){
				window.open($('#down>s:first').attr('ur'),'_self','');
			}else{
				location.href='/tourl.php?apkid='+$('#down>s:first').attr('aid');
			}
		}else{gsu();}
	}
	function gsu(){ //高速下载入口
		if (gc('pp')==null || gc('yyb')==null){
			//sc('pp','',86400000);
			$('#down>s').text('高速下载中...');
			gaosuPP();
		}else {
			//sc('pp','1',86400000);
			$('#down>s').text('高速下载中...');
			gaosuYYB($('#down>s').attr('ur'));
		}
	}

	function gaosuWDJ(){
		location.href = wdjDN;
	}

	function gaosuPP(){
		Pdlh.downloadFast({
			channel: 'PM_4008',
			ch_src: 'pm_pc6',
			ch: 'default',
			packageName: '',
			durl: ppDN,
			bs: 1,
			mode: 1,
			debug: false
		}, function(error, ret) {
			$('#down>a').text('高速下载');
			if (!error) {
				console.warn('Pdlh.downloadFast ok.');
			} else {
				console.warn('Pdlh.downloadFast failed.');
			}
			console.log(ret.msg);
		});
	}
	function gaosuYYB(t){
		num = Math.ceil(2 * Math.random());
		var e = encodeURIComponent(t),
			o = "tmast://download?downl_biz_id=" + yybID + "&downl_url=" + e + "&via=ANDROIDTWBHL.YYB.DOWNLOAD";
		newyyburl = "tmast://download?downl_biz_id=" + yybID + "&downl_url=" + e + "&via=ANDROIDYYB.NEWYYB.DOWNLOAD";
		var n = "http://maweb.3g.qq.com/cgi-bin/download?data=" + toUnicode(newyyburl),
			i = document.createElement("iframe");
		i.src = o, i.style.display = "none", i.id = "td_app_iframe", document.body.appendChild(i);
		var r = +new Date;
		setTimeout(function() {
			+new Date - r < 700 && (window.location.href = n)
		}, 500)
	};

	function toUnicode(t){for(var e=[],o=0;o<t.length;o++)e[o]=t.charCodeAt(o).toString(16).slice(-4).toUpperCase();return"%"+e.join("%");}
	function gc(c){var s = document.cookie.replace(eval('/^'+c+'=([^;]+).*?$/i'),'$1').replace(eval('/^.*?[^a-z0-9&]'+c+'=([^;]+).*?$/i'),'$1');if(document.cookie.length == s.length){return null}return unescape(s);}
	function sc(c,v,e){if(e==undefined){e=7*86400*1000;}var t=new Date();t.setTime(t.getTime()+ e);document.cookie=c+"="+escape(v)+"; expires="+t.toGMTString();}

	//ads
	function a(n){
		switch(n){
			case 0:
				break;
			case 1:
				if (os == 'ios'){
					document.write('<a href="http://h5channel.51pgzs.com/index.php?qid=waitui035"><img src="../img/ios.gif" /></a>');
				}else{
					document.write('<a href="#" onclick="gsu();"><img src="../img/apk.gif" /></a>');
				}
				break;
		}
	}
	
	/*自定义自动加载	*/
	function do_scollpage(){
		
		$(function(){ 
			var winH = $(window).height(); //页面可视区域高度 
			var i = 1; //设置当前页数 
			$(window).scroll(function () { 
				var pageH = $(document.body).height(); 
				var scrollT = $(window).scrollTop(); //滚动条top 
				var aa = (pageH-winH-scrollT)/winH; 
				//if(aa<0.02){
				if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
					$.get("/ajax.php",{act:'rollingpage',page:i,step:8},function(json){ 
						if(json){ 
							var str = ""; 
							$.each(JSON.parse(json),function(index,array){ 
								var str = '<a href="http://m.mobile-dad.com/mip/app/'+array.id+'.html">';
								str += '<mip-img layout="container" src="'+array.pic+'" alt="'+array.title+'"></mip-img>';
								str += '<u>'+array.title+'</u>';
								str += '<i>大小：'+array.size+'</i>';
								str += '<i>版本：'+array.edition+'</i>';
								str += '<span>下载</span>';
								str += '</a>';
								$("#good").append(str); 
							}); 
							i++; 
						}else{ 
							$("#loading").show().html("全部加载完毕"); 
							return false; 
						} 
					}); 
				} 
			}); 
		});
	}
	
	/*自定义切换tab	*/
	function getTab(index,main,iclassName,mclassName){
		var op=$(index);
		var omain=$(main);
		op.click(function(){
		var oIndex=$(this).index();
		$(this).addClass(iclassName).siblings().removeClass(iclassName);
		omain.eq(oIndex).addClass(mclassName).siblings().removeClass(mclassName);
		});
	};
	
	/*自定义展开按钮*/
	function show(id){ 
		var box = document.getElementById(id); //"synopsis"
		var text = box.innerHTML; 
		var newBox = document.createElement("div"); 
		var btn = document.createElement("s"); 
		newBox.innerHTML = text.substring(0,100);
		btn.innerHTML = text.length > 100 ? "展开" : "";
		btn.onclick = function(){ 
		if (btn.innerHTML == "展开"){ 
		btn.innerHTML = "收起"; 
		newBox.innerHTML = text; 
		}else{ 
		btn.innerHTML = "展开"; 
		newBox.innerHTML = text.substring(0,100); 
		} 
		} 
		box.innerHTML = ""; 
		box.appendChild(newBox); 
		if(text.length>100) box.appendChild(btn); 
	}
	
	if($('#header em').length>0){
		$("#header em").click(function(e){
			$('#more').attr('t',$(document).scrollTop()).toggle();
			$(window).scroll(function(e){$("#more").hide();} );
			e.stopPropagation();
		});
		
		$("#more").click(function(e){e.stopPropagation();});
		
	}	
	
	if($('#navs').length>0) getTab('#navs em','#navs li','on','cur');
	if($('#hot').length>0) getTab('#hot em','#hot ul','on','cur');
	if($('#youlike').length>0) getTab('#youlike em','#youlike ul','on','cur');
	if($('#synopsis').length>0) show('synopsis');
	if($('#tagdec').length>0) show('tagdec');
	if($('#loading').length>0) do_scollpage();
	if($('#show').length>0) do_slider();
	if($('#down').length>0) apkdown();
	if($('#down').length>0) do_down();
	$("#gaosu").click(function(e){gaosu();});
	
	// build 方法，元素插入到文档时执行，仅会执行一次
    customElement.prototype.build = function () {};
    return customElement;

});

