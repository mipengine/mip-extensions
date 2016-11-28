/**
* 寻医问药mip改造 javascript功能组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2016.11.25
* @version 1.0.0
*/
define(function(require){
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
	var appFun = function(url, pid, subject, subject_pid, qtagname, sta){
		var url = url;
		var pid = pid;
		var subject = subject;
		var subject_pid = subject_pid;
		var qtagname = qtagname;
		var sta = sta;
		//图形验证码
		var Ajax = function() {
			var a = null;
			try {
				a = new XMLHttpRequest()
			} catch(b) {
				try {
					a = new ActiveXObject("Msxml2.XMLHTTP")
				} catch(b) {
					try {
						a = new ActiveXObject("Microsoft.XMLHTTP")
					} catch(b) {}
				}
			}
			this.ajax = function(c) {
				var f = c.type || "GET";
				f = f.toUpperCase();
				if (f == "GET") {
					a.open("GET", c.url, true)
				} else {
					if (f == "POST") {
						a.open("POST", c.url, true);
						a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						a.setRequestHeader("If-Modified-Since", "0")
					} else {
						return false
					}
				}
				a.onreadystatechange = function() {
					if (a.readyState == 4 && a.status == 200) {
						c.success(a.responseText)
					}
				};
				if (f == "GET") {
					a.send(null)
				} else {
					if (f == "POST") {
						var e = "";
						for (var d in c.data) {
							e += d + "=" + encodeURIComponent(c.data[d]);
							e += "&"
						}
						e = e.substr(0, e.length - 1);
						a.send(e)
					}
				}
			};
			this.get = function(c, d) {
				this.ajax({
					url: c,
					type: "GET",
					success: d
				})
			};
			this.post = function(c, d, e) {
				this.ajax({
					url: c,
					type: "POST",
					data: d,
					success: e
				})
			}
			};
			var TT = new Ajax();
			var zw = 0;
			$('.pump').on('click', function(){
				var rid = $(this).attr('rid');
				var paramStr = $(this).attr('paramStr');
				if (zw == 1) return;
				var tinput = document.getElementById("qsbox_" + rid);
				var content = tinput.value.replace(/(^\s*)|(\s*$)/g, "");
				var overlength = 0;
				var autocut = 0;
				var bindphone = $("#bindphone").val();
				var url = "/ask/addition?method=taolun&fresh=" + Math.random();
				if (content == "") {
					alert("回复内容不能为空!");
					tinput.focus();
					zw = 0;
					return
				}
				if (content.length < 5) {
					alert("回复内容不能少于5个字符!");
					tinput.focus();
					zw = 0;
					return
				}
				if (content.length > 100) {
					alert("回复内容不能越过100个字符");
					overlength = 1;
					if (window.confirm("是否自动去掉多余的字符并提交？")) {
						content = content.substr(0, 99);
						autocut = 1
					}
				}
				if (overlength == 1 && autocut == 0) {
					tinput.focus();
					zw = 0;
					return
				}
				if(bindphone== '0') {
					$(".tel-filter").show();
					$(".tel-pop").show();
				}
				var params = paramStr.split(",");
				if(bindphone== '1'){
					 TT.ajax({
						 type: "POST",
						 url: url,
						 data: {
							rid: params.shift(),
							qid: params.shift(),
							quid: params.shift(),
							qrid: params.shift(),
							qtitle: params.shift(),
							content: content
						},
						datatype: "json",
						cache: false,
						async: false,
						success: function(result) {
							var dataObj = eval("(" + result + ")");
							if (dataObj.result > 0) {
								alert(dataObj.msg);
								window.location.reload(true);
								window.location.href = window.location.href + "?time=" + new Date().getTime()
								zw = 1;
							} else {
								zw = 0;
								alert(dataObj.msg)
							}
						}
					})
				}
			});
			$('.pumpF').on('click', function(){
				var rid = $(this).attr('rid');
				var dvrid = $(this).attr('dvrid');
				var b = document.getElementById(rid);
				var a = document.getElementById(dvrid);
				var c = a.style;
				c.display = c.display == "none" ? "block": "none";
			});
			function caina(param) {
				var url = "/ask/addition?method=caina&" + param;
				TT.get(url,
				function(result) {
					var dataObj = eval("(" + result + ")");
					if (dataObj.result > 0) {
						alert(dataObj.msg);
						window.location.reload();
						if (window.location.href.indexOf("?") > 0) {
							window.location.href = window.location.href + "&time1=" + new Date().getTime()
						} else {
							window.location.href = window.location.href + "?time=" + new Date().getTime()
						}
					} else {
						alert(dataObj.msg)
					}
				})
			}
			var time;
			var cookiename = "tipsid";
			var readids = new Array();
			function setCookie(a, c) {
				var b = 1;
				var d = new Date();
				d.setTime(d.getTime() + b * 24 * 60 * 60 * 1000);
				document.cookie = a + "=" + escape(c) + ";expires=" + d.toGMTString() + ";path=/"
			}
			function getCookie(b) {
				var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
				if (a = document.cookie.match(c)) {
					return (a[2])
				} else {
					return null
				}
			}
			function ajaxFunction(a) {
				TT.get("/question/status?id=" + a,
				function(b) {
					callback(b, a)
				})
			}
			function callback(c, d) {
				if (c != "") {
					var a = c + "/" + d + ".htm?time=" + new Date().getTime();
					var b = '<a  onclick="readtips()" href="' + a + '">提醒：您的提问有医生回复了，请点击查看</a>';
					document.getElementById("answertips").innerHTML = b;
					document.getElementById("currentid").innerHTML = d;
					document.getElementById("quests").style.display = "block";
					clearTimeout(time)
				} else {
					document.getElementById("answertips").innerHTML = "";
					document.getElementById("quests").style.display = "none"
				}
			}
			/*
			function start() {
				var h = document.getElementById("currentid").innerHTML;
				if (h) {
					return
				}
				var d = getCookie(cookiename);
				if (d) {
					var a = d.split("+");
					var b;
					for (var g = 0; g < a.length; g++) {
						var k = a[g].length;
						var c = a[g].toString().substr(k - 1);
						b = a[g].toString().substr(0, k - 1);
						var e = false;
						for (var f = 0; f < readids.length; f++) {
							if (b == readids[f]) {
								e = true;
								break
							}
						}
						if (e) {
							continue
						}
						if (c == "0") {
							ajaxFunction(b);
							break
						}
					}
				}
			}
		function readtips() {
			var c = document.getElementById("currentid").innerHTML;
			if (c.length > 0) {
				document.getElementById("currentid").innerHTML = "";
				readids.push(c);
				var b = getCookie(cookiename);
				if (b) {
					var a = b.replace(c + "0", c + "1");
					setCookie(cookiename, a)
				}
			}
			time = setTimeout("start()", 5000)
		}
		time = setInterval("start()", 5000);
		*/
		//验证码
		$('#imgcode').on('click', function(){
			$(this).attr('src', url + "/index.php?r=familyDoctor/captcha&time="+new Date().getTime());
			$('#tuverify').val("").focus();
		});
		//悬赏
		$('.reward').on('click', function(){
			document.body.addEventListener('touchstart', function () { });
			$('.m-reward-confirm').css('top',  (  $(window).height()-$('.m-reward-confirm').height())/2);
			var docname = $(this).attr('docname');
			var url =$(this).attr('url');
		  /*  alert(docname);
			alert(url);*/
			$(".rewarddocid").html("您确认将悬赏金给"+docname+"吗？");
			$(".rewardsure").attr("href",url);
			$('.tel-filter').show();
			$(".m-reward-confirm").show();
		});
		$('.m-reward-confirm .cancel,.tel-filter').on('click', function(){
			$('.m-reward-confirm').hide();
			$('.tel-filter').hide();
		});
		//追问得到焦点时搜索框小时
		$('.focusblur').focus(function() {
			$('.item-hd-so').hide();
			return false;
		});
		$('.focusblur').blur(function() {
			$('.item-hd-so').show();
			return false;
		});
		//图形验证码
		$('#tuverify').blur(function() {
			var  tuyzm = $.trim($('#tuverify').val())
			if(tuyzm==''){
				$('.tuyzma').show().html('请输入图形验证码');
			}
			return false;
		});
		$('#tuverify').focus(function() {
			$('.tuyzma').hide();
			return false;
		});
		var h = $(document).height();
		$('.tel-filter').css({'height':h});
		if ($('.tel-filter,.tel-pop').hasClass('none')) {
			$('html').css('overflow','auto');
		}else{
			$('html').css('overflow','hidden');
		}
		if ($('.tel-filter,.pop-tips-ok').hasClass('none')) {
			$('html').css('overflow','auto');
		}else{
			$('html').css('overflow','hidden');
		}
		$('.cancelBtn').on('click',function(){
			$('.tel-filter').hide();
			$('.tel-pop').hide();
		})
		$(".tel-filter").click(function(){
			$('.tel-filter').hide();
			$('.tel-pop').hide();
			$('.pop-tips-ok').hide();
		});
		//手机号弹窗验证码
		var countTimer = null,
			code_count = 90,
			isSend = true,
			regphone = /^1[34587]\d{9}$/,
			sendcodeurl = "/ask/addition?method=bindphone&fresh=" + Math.random();
		//失去焦点事件
		$('#popTelNum').blur(function() {
			var popTel = $.trim($('#popTelNum').val());
			if (!regphone.test(popTel)) {
				$('.telError').show();
				return false;
			}
		})
		$('#popTelNum').focus(function() {
			$('.telError').hide();
			$('.tuyzma').hide();
			return false;
		})
		$('#popVerify').bind('input propertychange', function() {
			$('.yzmError').hide();
			$('.tuyzma').hide();
			return false;
		});
		$('#popYzmBtn').on('click',function(){
			var self = $(this),
				popTel =$.trim($('#popTelNum').val()),
				tuyzm =$.trim($('#tuverify').val());

			if (!regphone.test(popTel)) {
				$('.telError').show();
				return false;
			}
			if(tuyzm==''){
				$('.tuyzma').show().html('请输入正确的图形验证码');
				return false;
			}
			if(!isSend){
				alert('正在获取中...');
				return false;
			}
			$.ajax({
				url:url + '/index.php?r=familyDoctor/getmsg',
				data:{ask_code:1,order_code:tuyzm},
				type:'post',
				dataType:'json',
				success: function(msg){
					//alert(msg);
					if(msg==-1000){
						changecode();
						$("#tuverify").focus();
						$('.tuyzma').show().html('请输入正确的图形验证码');
						return false;
					}
					if(msg==1){
						$('.tuyzma').hide();
						$.ajax({
							type: "POST",
							url:  sendcodeurl,
							data: {phone: popTel,getcode:1},
							datatype: "json",
							cache: false,
							async: false,
							success: function(data){
								var data = eval("("+data+")");
								if(data.code =='10000' ){ //验证码发送成功
									countTimer = setInterval(function(){
										if(code_count <= 1){
											clearInterval(countTimer);
											self.val('获取验证码');
											self.css('background','#f6f6f6');
											code_count = 90;
											isSend=true;
										}else{
											code_count--;
											isSend=false;
											self.val(code_count+'秒重新获取');
											self.css('background','#f6f6f6');
										}
									},1000);
								}else if(data.code =='31003'){
									$('.yzmError').html('请填写正确的手机号码');
									$('.tuyzma').hide();
									isSend=true;
								}else if(data.code =='31004'){
									$('.yzmError').show().html('发送短信已达每日上限，请明天再试');
									$('.tuyzma').hide();
									isSend=true;
								}else if(data.code =='31005'){
									$('.yzmError').show().html('120秒内禁止重复发送，请稍后重试');
									$('.tuyzma').hide();
									isSend=true;
								}else if(data.code =='30000'){
									$('.yzmError').show().html('该IP当天发送超过最大数量');
									$('.tuyzma').hide();
									isSend=true;
								}else{
									$('.yzmError').show().html('操作频繁，请稍后再试');
									$('.tuyzma').hide();
									isSend=true;
								}
							},
						});
					}
				},
				error: function(){
					$('.tuyzma').show().html('当前网络繁忙，请稍后再试');
					return false;
				}
			});
		});
		$('#telForm').on('submit',function(){
			var popTel = $.trim($('#popTelNum').val()),
				popVerify = $.trim($('#popVerify').val()),
			   tuVerify = $.trim($('#tuverify').val());
			if (!regphone.test(popTel)) {
				$('.telError').show();
				return false;
			}
			if( popTel == '' && popVerify == ''){
				$('#popTelNum').focus();
				$('#popVerify').focus();
				$('.telError').show().html('手机号不能为空');
				$('.yzmError').show().html('验证码不能为空');
				return false;
			}
			if( popTel !== '' &&  tuVerify === ''){
				$('#popVerify').focus();
				$('.tuyzma').show().html('请输入图形验证码');
				return false;
			}
			if( popTel !== '' && popVerify === ''){
				$('#popVerify').focus();
				$('.yzmError').show().html('请输入验证码');
				$('.tuyzma').hide();
				return false;
			}
			if( popVerify !== '' && isNaN(popVerify)){
				$('#popVerify').focus();
				$('.yzmError').show().html('请输入正确的验证码');
				$('.tuyzma').hide();
				return false;
			}
			var bindurl = "/ask/addition?method=bindphone&fresh=" + Math.random();
			if(popTel !== '') {
				var submit = true;
				var showcount = 3;
				$.ajax({
					type: "POST",
					url: bindurl,
					data: {phone: popTel,getcode:2,sendcode:popVerify},
					datatype: "json",
					cache: false,
					async: false,
					success: function (data) {
						var data = eval("("+data+")");
						if (data.code =="10000") {
							$('.tel-filter').hide();
							$('.tel-pop').hide();
							$('#bindphone').val('1');
							countTimer = setInterval(function(){
								if(showcount <= 1){
									clearInterval(countTimer);
									$("#tipsShow").hide();
									showcount = 3;
								}else{
									showcount--;
									$("#tipsShow").show();
								}
							},1000);
							submit = false;
							return false;
						} else if (data.code =="31008") {
							$('#popVerify').focus();
							$('.yzmError').show().html('请输入正确的验证码');
							$('.tuyzma').hide();
							submit = false;
							return false;
						}else if (data.code =="31015") {
							$('#popVerify').focus();
							$('.yzmError').show().html('该手机号已被其他帐号绑定');
							$('.tuyzma').hide();
							submit = false;
							return false;
						}else if (data.code =="31014") {
							$('#popVerify').focus();
							$('.yzmError').show().html('该账户经绑定手机号，不可重复绑定');
							$('.tuyzma').hide();
							submit = false;
							return false;
						}else if (data.code =="31020") {
							$('#popVerify').focus();
							$('.yzmError').show().html('用户信息为空，不可绑定');
							$('.tuyzma').hide();
							submit = false;
							return false;
						}else if (data.code =="31016") {
							$('#popVerify').focus();
							$('.yzmError').show().html('绑定失败');
							$('.tuyzma').hide();
							submit = false;
							return false;
						}else{
							$('#popVerify').focus();
							$('.yzmError').show().html('网络繁忙，请稍后重试');
							$('.tuyzma').hide();
							submit = false;
							return false;
						}
					},
				});
				return false;
			}
			return false
		});
		//评价送积分
		$('.sendFens').on('click', function(){
			var qid = $(this).attr('qid');
			var rid = $(this).attr('rid');
			var docid = $(this).attr('docid');
			var ansertime = $(this).attr('ansertime');
			var pid =  getCookie('cookie_user_3g'); //pid：当前登录用户id，qid：问题id，rid:回复id， docid 医生id,ansertime:医生首次回复时间
			var url = "http://3g.club.xywy.com/index.php?r=QuestionEvaluate/index&ansertime="+ansertime+"&pid="+pid+"&qid="+qid+"&rid="+rid+"&docid="+docid;
			window.location.href = url;
		});
		function getCookie(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return unescape(arr[2]);
			}
			else{
			   return null;
			}
		}
		function showAskToMe(){
			var div = document.getElementsByTagName('div')
			for(var i=0;i<div.length;i++) {
				if(div[i].innerHTML.indexOf("向他提问")>-1){
					div[i].style.display="block";
				}
			}
		}
		var pid = pid;
		var uid =  getCookie("cookie_user_3g");
		var status = sta;
		if(uid && uid == pid){
			document.getElementById('healthtips').style.display="block";
		}
		if(uid && uid==pid){
			var divs = document.getElementsByTagName('div')
			for(var i=0;i<divs.length;i++) {
				if(divs[i].innerHTML.indexOf("cainapj")>-1 || divs[i].innerHTML.indexOf("addF")>-1){
					divs[i].style.display="block";
				}
			}
		}else{
			showAskToMe();
		}
		$('#soform').on('submit', function(){
			var textValK = $.trim($('#keysd').val());
			if(textValK=='帮您寻医问药') {
				textValK = '';
			}else {
				textValK = textValK;
			}
			$(this).attr('method', 'post').attr('action', 'http://m.so.xywy.com/comse.php?src=3gclubso&keyword=' + encodeURIComponent(textValK));
		});
		
		if([287, 332].indexOf(subject_pid) > -1){
			new Image().src="https://stat-z.xywy.com/e.png?pagevisit=pvwap_3g_wenkang_free_ask&time=" + new Date().getTime()+"time";
		}else{
			new Image().src="https://stat-z.xywy.com/e.png?pagevisit=pvwap_3g_wenkang_article_button&time="+new Date().getTime();
		}
		var imgxx = new Image;
		imgxx.src = "https://stat-y.xywy.com/z_test_pvuv.png?random"+Math.random();
		var cityname = _RET_IP.data.area.split('|');
		cityname = cityname[1];
		var alwaysShow = "全国";
		var alwaysShowoh = "广东";
		var aTitle = "向他咨询";
		(function(classname,attributeName,delimiter){
			var isShow = function(address){
				if(!address){
				   return true;
				}
				if (subject_pid == 766) {
					var addresses = address.split('#');
					if (address == alwaysShow) {
						if (cityname.indexOf('北京') >= 0) {
							return false;
						} else if (cityname.indexOf('上海') >= 0) {
							return false;
						} else if (cityname.indexOf('深圳') >= 0) {
							return false;
						} else if (cityname.indexOf('广州') >= 0) {
							return false;
						}
						return true;
					} else if (address == alwaysShowoh) {
						if (cityname.indexOf('深圳') >= 0) {
							return false;
						} else if (cityname.indexOf('广州') >= 0) {
							return false;
						} 
					}
				}
				else {
					if (address == alwaysShow) {
						return true;
					}
					var addresses = address.split('#');
				}
				for(var i=0;i<addresses.length;i++) {
					if (cityname.indexOf(addresses[i]) == 0) {
						return true;
					}
				}
				return false;
			};
			var nodelist =  document.querySelectorAll('.'+classname);
			var data,node,bussiness;
			for(var i = 0,len=nodelist.length; i<len;i++) {
				node = nodelist[i];
				if(data = node.getAttribute(attributeName)) {
					bussiness = data.split(delimiter);
					if(bussiness[0] && isShow(bussiness[1])){
						if(node.href.indexOf('http')>-1){
							node.setAttribute('href',bussiness[0]);
							node.innerHTML = aTitle;
						}
					}else{
					   if(node.href.indexOf('tel')>-1){
							 node.style.display='none';
					   }
					}
				}
			}
			nodelist =  document.querySelectorAll('.hospital');
			for(var i = 0,len=nodelist.length; i<len;i++) {
				node = nodelist[i];
				if(data = node.getAttribute(attributeName)) {
					bussiness = data.split(delimiter);
					if(!isShow(bussiness[1])){
						node.style.display = 'none';
					}
				}
			}
		})('blueBtn','data','<-->');
		window.onload=function(){
			setTimeout(function() {
				window.scrollTo(0, 1)
			}, 0);
		};
	};
   // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
       var elem = this.element;
	   var url = $(elem).attr('url');
	   var pid = $(elem).attr('pid');
	   var subject = $(elem).attr('subject');
	   var subject_pid = $(elem).attr('subject_pid');
	   var qtagname = $(elem).attr('qtagname');
	   var sta = $(elem).attr('sta');
	   loadJs(elem, 'https://page.xywy.com/get_ip', function(){
		   appFun(url, pid, subject, subject_pid, qtagname, sta);
	   });
	}
	return customElem;
});