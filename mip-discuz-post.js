(window.MIP=window.MIP||[]).push({name:"mip-discuz-post",func:function(){define("mip-discuz-post/mip-discuz-post",["require","jquery","customElement"],function(t){var e=t("jquery"),i=[],n=t("customElement").create();return n.prototype.firstInviewCallback=function(){function t(t){for(;t&&void 0!==t.originalEvent;)t=t.originalEvent;return t}function n(t){if(-1===t.indexOf("<script"))return t;for(var e=/<script[^\>]*?>([^\x00]*?)<\/script>/gi,i=[];i=e.exec(t);){var n=/<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i,o=[];if(o=n.exec(i[0]))r(o[1],"",o[2],o[3]);else{n=/<script(.*?)>([^\x00]+?)<\/script>/i,o=n.exec(i[0]),n=/\{(\w+)\(/i;var s=n.exec(o[2]);n=/\,\s*(\{[^}]*\})/i;var a=n.exec(o[2]);switch(s[1]){case"errorhandle_fastpost":n=/[^\:\=]{1}([\']{1})([^\']+)\1[\,\)]/i;var l=n.exec(o[2]);f(l[2],a[1]);break;case"succeedhandle_fastpost":n=/[^\:\=]{1}([\']{1})([^\']+)\1[\,\)]/g;var c=n.exec(o[2]);l=n.exec(o[2]),d(c[2],l[2],a[1])}}}return t}function r(t,n,r,s){var l=o(t+n);if(r||!a(l,U)){if(r&&e("#"+l)[0])e("#"+l)[0].parentNode.removeChild(e("#"+l)[0]);U.push(l);var c=document.createElement("script");c.type="text/javascript",c.id=l,c.charset=s?s:!document.charset?document.characterSet:document.charset;try{if(t)c.src=t,c.onloadDone=!1,c.onload=function(){c.onloadDone=!0,i[t]=1},c.onreadystatechange=function(){if(("loaded"===c.readyState||"complete"===c.readyState)&&!c.onloadDone)c.onloadDone=!0,i[t]=1};else if(n)c.text=n;document.getElementsByTagName("head")[0].appendChild(c)}catch(t){}}}function o(t,e){e=e?e:32;var i=0,n=0,r="",o=e-t.length%e;for(n=0;n<o;n++)t+="0";for(;i<t.length;)r=s(r,t.substr(i,e)),i+=e;return r}function s(t,e){for(var i="",n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",r=Math.max(t.length,e.length),o=0;o<r;o++){var s=t.charCodeAt(o)^e.charCodeAt(o);i+=n.charAt(s%52)}return i}function a(t,e){if("string"==typeof t||"number"==typeof t)for(var i in e)if(e[i]===t)return!0;return!1}function l(t,e){setTimeout(function(){window.location.href=t},e)}function c(t){var i=t.split("###"),n=i[0],r=i[1];e(".seccodeimg").on("click",function(){e("#seccodeverify_"+n).attr("value","");var t="S"+Math.floor(1e3*Math.random());e(".sechash").attr("value",t),e(".seccodeimg img").attr("src","misc.php?mod=seccode&update="+r+"&idhash="+t+"&mobile=2")})}function u(t){var i=t.split("###"),r=i[0],o=i[1];if("send_reply_fast"!==o)e("#fastpostmessage").on("focus",function(){if("nologin"===o)C.open(r,"confirm","member.php?mod=logging&action=login");else C.open(r,"alert");this.blur()});else e("#fastpostmessage").on("focus",function(){var t=e(this);if("gray"===t.attr("color"))t.attr("value",""),t.removeClass("grey"),t.attr("color","black"),e("#fastpostsubmitline").css("display","block")}).on("blur",function(){var t=e(this);if(""===t.attr("value"))t.addClass("grey"),t.attr("value",r),t.attr("color","gray")});e("#fastpostsubmit").on("click",function(){var t=e("#fastpostmessage");if(t.val()===r)t.attr("value","");return e.ajax({type:"POST",url:e("#fastpostform form").attr("action")+"&handlekey=fastpost&loc=1&inajax=1",data:e("#fastpostform form").serialize(),dataType:"xml"}).success(function(t){n(t.lastChild.firstChild.nodeValue)}).error(function(){window.location.href=_.attr("href"),C.close()}),!1}),e("#replyid").on("click",function(){e(document).scrollTop(e(document).height()),e("#fastpostmessage")[0].focus()})}function d(t,i,n){n=n.replace(new RegExp(/\'/g),'"'),n=JSON.parse(n);var r=n.pid,o=n.tid;if(r)e.ajax({type:"POST",url:"forum.php?mod=viewthread&tid="+o+"&viewpid="+r+"&mobile=2",dataType:"xml"}).success(function(t){e("#post_new").append(t.lastChild.firstChild.nodeValue)}).error(function(){window.location.href="forum.php?mod=viewthread&tid="+o,C.close()});else{if(!i)i="{lang postreplyneedmod}";C.open(i,"alert")}if(e("#fastpostmessage").attr("value",""),n.sechash)e(".seccodeimg").click()}function f(t,e){C.open(t,"alert")}function p(t,i,n){if(n)e("#needsubject").on("keyup input",function(){if(e(this).val()){if(t=!0,i)e(".btn_pn").removeClass("btn_pn_grey").addClass("btn_pn_blue"),e(".btn_pn").attr("disable","false")}else t=!1,e(".btn_pn").removeClass("btn_pn_blue").addClass("btn_pn_grey"),e(".btn_pn").attr("disable","true")});e("#needmessage").on("keyup input",function(){if(e(this).val()){if(i=!0,t)e(".btn_pn").removeClass("btn_pn_grey").addClass("btn_pn_blue"),e(".btn_pn").attr("disable","false")}else i=!1,e(".btn_pn").removeClass("btn_pn_blue").addClass("btn_pn_grey"),e(".btn_pn").attr("disable","true")}),e("#needmessage").on("scroll",function(){var t=e(this);if(t.scrollTop()>0)t.attr("rows",parseInt(t.attr("rows"),0)+2)}).scrollTop(e(document).height())}function h(t,i){e("#postsubmit").on("click",function(){var t=e(this);if("true"===t.attr("disable"))return!1;t.attr("disable","true").removeClass("btn_pn_blue").addClass("btn_pn_grey"),C.open('<img src="'+y+'/imageloading.gif">');var n="";if(""===D.errmsg&&D.loc)n=D.longitude+"|"+D.latitude+"|"+D.loc;return e.ajax({type:"POST",url:e("#postform form").attr("action")+"&geoloc="+n+"&handlekey=postform&inajax=1",data:e("#postform form").serialize(),dataType:"xml"}).success(function(t){C.open(t.lastChild.firstChild.nodeValue)}).error(function(){C.open(i,"alert")}),!1}),e(document).on("click",".del",function(){var t=e(this);return e.ajax({type:"GET",url:v+"forum.php?mod=ajax&action=deleteattach&inajax=yes&aids[]="+t.attr("aid")}).success(function(e){t.parent().remove()}).error(function(){C.open("networkerrortext","alert")}),!1})}var m=this.element,g=m.getAttribute("staticurl"),y=m.getAttribute("imgdir"),v=m.getAttribute("siteurl"),b=m.querySelector('script[type="application/json"]')||null;if(b){var _=JSON.parse(b.textContent.toString()),w="",k="";for(var x in _)if(_.hasOwnProperty(x))k=x,w=_[x];switch(k){case"seccheck":c(w);break;case"urlforward":l(w);break;case"fastpostform":u(w);break;case"checkpostvalue":p(w);break;case"postsubmitnewthread":h(w)}}var T={converthtml:function(){var t=e("div.pg .prev").prop("href"),i=e("div.pg .nxt").prop("href"),n=e("div.pg label span").text().replace(/[^\d]/g,"")||0,r=e("div.pg input").val()||1;if(!n)t=e("div.pg .pgb a").prop("href");var o="",s="";if(void 0===t)o='#" class="grey';else o=t;if(void 0===i)s='#" class="grey';else s=i;var a="";if(n)a+='<a id="select_a" style="margin:0 2px;padding:1px 0 0 0;border:0;display:inline-block;position:relative;width:100px;height:31px;line-height:27px;background:url('+v+g+'/image/mobile/images/pic_select.png) no-repeat;text-align:left;text-indent:20px;">',a+="<span>第"+r+"页</span>";e("div.pg").removeClass("pg").addClass("page").html('<a href="'+o+'" target="_blank">上一页</a>'+a+'<a href="'+s+'" target="_blank">下一页</a>'),e("#dumppage").on("change",function(){var n=t||i;window.location.href=n.replace(/page=\d+/,"page="+e(this).val())})}},j={obj:null,init:function(t){j.obj=t;var i=this.isfixed();if(t.css("opacity",".618"),i)t.css("bottom","8px");else t.css({visibility:"visible",position:"absolute"});e(window).on("resize",function(){if(i)t.css("bottom","8px");else t.css("top",e(document).scrollTop()+e(window).height()-40+"px")}),t.on("tap",function(){e(document).scrollTop(e(document).height())}),e(document).on("scroll",function(){if(!i)t.css("top",e(document).scrollTop()+e(window).height()-40+"px");if(e(document).scrollTop()>=400)t.removeClass("bottom").off().on("tap",function(){window.scrollTo("0","1")});else t.addClass("bottom").off().on("tap",function(){e(document).scrollTop(e(document).height())})})},isfixed:function(){var t=j.obj.offset(),i=e(window).scrollTop(),n=document.documentElement.clientHeight;if(void 0===t)return!1;if(t.top<i||t.top-i>n)return!1;else return!0}},A={init:function(t){var i=this.errorhandle;e("img").on("load",function(){var n=e(this);if(n.attr("zsrc",n.attr("src")),n.width()<5&&n.height()<10&&"none"!==n.css("display"))return i(n,t);if(n.css("display","inline"),n.css("visibility","visible"),n.width()>window.innerWidth)n.css("width",window.innerWidth);n.parent().find(".loading").remove(),n.parent().find(".error_text").remove()}).on("error",function(){var n=e(this);n.attr("zsrc",n.attr("src")),i(n,t)})},errorhandle:function(t,e){if("true"!==t.attr("noerror")){t.css("visibility","hidden"),t.css("display","none");var i=t.parent();i.find(".loading").remove(),i.append('<div class="loading" style="background:url('+v+y+"/imageloading.gif) no-repeat center center;width:"+i.width()+"px;height:"+i.height()+'px"></div>');var n=parseInt(t.attr("load"),0)||0;if(n<3)return t.attr("src",t.attr("zsrc")),t.attr("load",++n),!1;if(e)i.find(".loading").remove(),i.append('<div class="error_text">点击重新加载</div>'),i.find(".error_text").one("click",function(){t.attr("load",0).find(".error_text").remove(),i.append('<div class="loading" style="background:url('+y+"/imageloading.gif) no-repeat center center;width:"+i.width()+"px;height:"+i.height()+'px"></div>'),t.attr("src",t.attr("zsrc"))});return!1}}},S={init:function(){e(".atap").on("tap",function(){return e(this).css({background:"#6FACD5",color:"#FFFFFF","font-weight":"bold","text-decoration":"none","text-shadow":"0 1px 1px #3373A5"}),!1}),e(".atap a").off("click")}},E={},C={init:function(){var t=this;e(".popup").each(function(i,n){n=e(n);var r=e(n.attr("href"));if(r&&r.attr("popup"))r.css({display:"none"}),n.on("click",function(e){t.open(r)})}),this.maskinit()},maskinit:function(){var t=this;e("#mask").off().on("tap",function(){t.close()})},open:function(t,i,n){if(this.close(),this.maskinit(),"string"==typeof t){if(e("#ntcmsg").remove(),"alert"===i)t='<div class="tip"><dt>'+t+'</dt><dd><p class="button2 popupclosebtn" type="button">确定</p></dd></div>';else if("confirm"===i)t='<div class="tip"><dt>'+t+'</dt><dd><input class="redirect button2" type="button" value="确定" href="'+n+'"><p class="popupclosebtn">取消</p></dd></div>';e("body").append('<div id="ntcmsg" style="display:none;">'+t+"</div>"),t=e("#ntcmsg")}if(E[t.attr("id")])e("#"+t.attr("id")+"_popmenu").html(t.html()).css({height:t.height()+"px",width:t.width()+"px"});else t.parent().append('<div class="dialogbox" id="'+t.attr("id")+'_popmenu" style="height:'+t.height()+"px;width:"+t.width()+'px;">'+t.html()+"</div>");var r=e("#"+t.attr("id")+"_popmenu"),o=(window.innerWidth-r.width())/2,s=(document.documentElement.clientHeight-r.height())/2;r.css({display:"block",position:"fixed",left:o,top:s,"z-index":120,opacity:1}),e("#mask").css({display:"block",width:"100%",height:"100%",position:"fixed",top:"0",left:"0",background:"black",opacity:"0.2","z-index":"100"}),E[t.attr("id")]=t},close:function(){e("#mask").css("display","none"),e.each(E,function(t,i){e("#"+t+"_popmenu").css("display","none")})}},O={init:function(){e(document).on("click",".dialog",function(){var t=e(this);return C.open('<img src="'+y+'/imageloading.gif">'),e.ajax({type:"GET",url:t.attr("href")+"&inajax=1",dataType:"xml"}).success(function(t){C.open(t.lastChild.firstChild.nodeValue),n(t.lastChild.firstChild.nodeValue)}).error(function(){window.location.href=t.attr("href"),C.close()}),!1})}},P={init:function(){e(document).on("click",".formdialog",function(){C.open('<img src="'+y+'/imageloading.gif">');var t=e(this),i=e(this.form);return e.ajax({type:"POST",url:i.attr("action")+"&handlekey="+i.attr("id")+"&inajax=1",data:i.serialize(),dataType:"xml"}).success(function(t){C.open(t.lastChild.firstChild.nodeValue),n(t.lastChild.firstChild.nodeValue)}).error(function(){window.location.href=t.attr("href"),C.close()}),!1})}},M={init:function(){e(document).on("click",".redirect",function(){var t=e(this);C.close(),window.location.href=t.attr("href")})}},I={},B={init:function(){var t=this;e(".display").each(function(i,n){n=e(n);var r=e(n.attr("href"));if(r&&r.attr("display"))r.css({display:"none"}),r.css({"z-index":"102"}),I[r.attr("id")]=r,n.on("click",function(i){if(!a(i.target.tagName,["A","IMG","INPUT"])){if(t.maskinit(),"true"===r.attr("display"))r.css("display","block"),r.attr("display","false"),e("#mask").css({display:"block",width:"100%",height:"100%",position:"fixed",top:"0",left:"0",background:"transparent","z-index":"100"});return!1}})})},maskinit:function(){var t=this;e("#mask").off().on("touchstart",function(){t.hide()})},hide:function(){e("#mask").css("display","none"),e.each(I,function(t,e){e.css("display","none"),e.attr("display","true")})}},D={latitude:null,longitude:null,loc:null,errmsg:null,timeout:5e3,getcurrentposition:function(){if(!navigator.geolocation)navigator.geolocation.getCurrentPosition(this.locationsuccess,this.locationerror,{enableHighAcuracy:!0,timeout:this.timeout,maximumAge:3e3})},locationerror:function(t){switch(D.errmsg="error",t.code){case t.TIMEOUT:D.errmsg="获取位置超时，请重试";break;case t.POSITION_UNAVAILABLE:D.errmsg="无法检测到您的当前位置";break;case t.PERMISSION_DENIED:D.errmsg="请允许能够正常访问您的当前位置";break;case t.UNKNOWN_ERROR:D.errmsg="发生未知错误"}},locationsuccess:function(t){D.latitude=t.coords.latitude,D.longitude=t.coords.longitude,D.errmsg="",e.ajax({type:"POST",url:"http://maps.google.com/maps/api/geocode/json?latlng="+D.latitude+","+D.longitude+"&language=zh-CN&sensor=true",dataType:"json"}).success(function(t){if("OK"===t.status)D.loc=t.results[0].formatted_address}).error(function(){D.loc=null})}},L={init:function(){var i={},n=!1,r=null,o=null,s=!1;e("body").on("touchstart",function(e){e=t(e),i.startx=e.touches[0].pageX,i.starty=e.touches[0].pageY}).on("touchmove",function(a){if(a=t(a),i.curposx=a.touches[0].pageX,i.curposy=a.touches[0].pageY,!(i.curposy-i.starty<0)||n){if(!n&&e(window).scrollTop()<=0)n=!0,r=document.createElement("div"),r=e(r),r.css({position:"relative","margin-left":"-85px"}),e("body").prepend(r),o=document.createElement("div"),o=e(o),o.css({position:"absolute",height:"30px",top:"-30px",left:"50%"}),o.html('<img src="'+v+g+'image/mobile/images/icon_arrow.gif"style="vertical-align:middle;margin-right:5px;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg);"><span id="refreshtxt">下拉可以刷新</span>'),o.find("img").css({"-webkit-transition":"all 0.5s ease-in-out"}),r.prepend(o),i.topx=i.curposx,i.topy=i.curposy;if(n){if(n){var l=i.curposy-i.topy;if(l>=0&&l<150){if(r.css({height:l/2+"px"}),o.css({top:l/2-30+"px"}),s)o.find("img").css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"}),o.find("#refreshtxt").html("下拉可以刷新");s=!1}else if(l>=150){if(r.css({height:l/2+"px"}),o.css({top:l/2-30+"px"}),!s)o.find("img").css({"-webkit-transform":"rotate(360deg)","-moz-transform":"rotate(360deg)","-o-transform":"rotate(360deg)",transform:"rotate(360deg)"}),o.find("#refreshtxt").html("松开可以刷新");s=!0}}a.preventDefault()}}}).on("touchend",function(t){if(n)if(s)return o.html('<img src="'+v+g+'image/mobile/images/icon_load.gif"style="vertical-align:middle;margin-right:5px;">正在加载...'),o.animate({top:"45px"},618,"linear"),void r.animate({height:"75px"},618,"linear",function(){window.location.reload()});r.remove(),r=null,n=!1,i={}})}},U=[];e(document).ready(function(){if(e("div.pg").length>0)T.converthtml();if(e(".scrolltop").length>0)j.init(e(".scrolltop"));if(e(".popup").length>0)C.init();if(e(".display").length>0)B.init();if(e("img").length>0)A.init(1);if(e(".atap").length>0)S.init();if(e(".pullrefresh").length>0)L.init();O.init(),P.init(),M.init()}),e(document).on("click",".popupclosebtn",function(){C.close()})},n}),define("mip-discuz-post",["mip-discuz-post/mip-discuz-post"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-discuz-post",e)}if(window.MIP)require(["mip-discuz-post"],function(e){t(window.MIP,e)});else require(["mip","mip-discuz-post"],t)}()}});