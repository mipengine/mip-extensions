define("mip-share/share/aio",[],function(){!function(t,e){function i(t,e){return d.cleanObj.toString.call(t).slice(8,-1)===e}function n(t){var e=p[t];if(e)return e.exports;throw"module "+t+" is undefined"}function o(t,e){for(var i,o,r=t.split(":"),s=r.pop().split("/"),a=d;i=s.shift();)"bdbox"!==i&&(o=i,s.length&&(a=a[i]=a[i]||{}));var l=p[t]={exports:{}},c=d.isFunction(e)?e.apply(l,[n,l.exports,l,d]):e;c&&(l.exports=c),a[o]=l.exports}function r(){h.forEach(function(t){t()}),h.length=0,m=!0}function s(t){var e;return null==t?e=String(t):(e=Object.prototype.toString.call(t).toLowerCase(),e=e.substring(8,e.length-1)),e}function a(e){var i=e.success||y,n={imageUrl:"",mediaType:"all",title:"",content:"",linkUrl:location.href},o=e.error||y;return d.isFunction(e.success)&&(i="_xSHARE_SUCCESS_"+d.getId(),t[i]=e.success,n.success=i),d.isFunction(e.error)&&(o="_xSHARE_FAIL_"+d.getId(),t[o]=e.error,n.error=o),d.each(e,function(t,i){"success"!==i&&"error"!==i&&(i in v?i=v[i]:"content"!==i||e.title||(n.title=t),n[i]=t)}),d.isArray(n.mediaType)&&(n.mediaType="all"),t.BoxShareData||(t.BoxShareData={successcallback:i,errorcallback:o,options:n}),n}var l=+new Date,c=(l+"").slice(-3),u=navigator.userAgent,d={isBox:/ baiduboxapp\//i.test(u),isIOS:/(iPhone|iPod|iPad)/.test(u),isAndroid:/(Android);?[\s\/]+([\d.]+)?/.test(u),getId:function(){return c++},emptyArr:[],emptyFn:function(){},cleanObj:{},byId:function(t){return d.isString(t)?e.getElementById(t):t},toArray:function(t){return d.emptyArr.slice.call(t)},$:function(t,i){return i=i&&1===i.nodeType?i:e,d.toArray(i.querySelectorAll(t))}};"Function,String,Array,Number,RegExp".replace(/[^, ]+/g,function(t){d["is"+t]=function(e){return i(e,t)}}),d.isBoolean=function(t){return!0===t||!1===t},d.isObject=function(t){return"object"==typeof t},d.isUndefined=function(t){return void 0===t},d.isWindow=function(t){return null!=t&&t==t.window},d.isPlainObject=function(t){return d.isObject(t)&&!d.isWindow(t)&&Object.getPrototypeOf(t)==Object.prototype};var p={};d.define=o;var f=function(t,e,i){for(var n,o,r=t.split("."),s=i||f;n=r.shift();)"Box"!==n&&(o=n,r.length&&(s=s[n]=s[n]||{}));return s[o]=e||{},s[o]},h=[],m=!1;if(f.init=function(t){return"function"!=typeof t?this:(m?t():h.push(t),this)},"complete,loaded,interactive".indexOf(e.readyState)>-1&&e.body?r():e.addEventListener("DOMContentLoaded",r,!1),o("common:bdbox/utils/getVersion",function(e,i,n){var o=function(){var e=0;if(t.baiduboxapp_version)e=t.baiduboxapp_version;else{var i,n=navigator.userAgent;(i=/([\d+.]+)_(?:diordna|enohpi)_/.exec(n))?(i=i[1].split("."),e=i.reverse().join(".")):(i=/baiduboxapp\/([\d+.]+)/.exec(n))&&(e=i[1])}return o=function(){return e},e};n.exports=o}),o("common:bdbox/utils/version_compare",function(t,e,i){var n=function(t,e){e+="",t+="";for(var i=t.split("."),n=e.split("."),o=0,r=Math.max(i.length,n.length);r>o;o++){if(i[o]&&!n[o]&&parseInt(i[o])>0||parseInt(i[o])>parseInt(n[o]))return 1;if(n[o]&&!i[o]&&parseInt(n[o])>0||parseInt(i[o])<parseInt(n[o]))return-1}return 0};i.exports=n}),o("common:bdbox/ios/invokeApp",function(i,n,o,r){o.exports=function(i,n,o){if(i&&r.isBox){var s=[];if(r.isFunction(n))o=n;else for(var a in n)s.push(a+"="+n[a]);if(r.isFunction(o)){var l="_bdbox_js_"+r.getId();t[l]=function(){o.apply(t,[].slice.call(arguments,0))},s.push("func="+l)}else o&&s.push("func="+o);s="baiduboxapp://"+i+"?"+s.join("&");var c="_bdbox_ios_jsbridge",u=e.getElementById(c);u?u.src=s:(u=e.createElement("iframe"),u.style.display="none",u.id=c,u.src=s,(e.body||e.getElementsByTagName("body")[0]).appendChild(u))}}}),o("common:bdbox/android/invokeApp",function(e,i,n,o){function r(e,i,n){if(n&&!o.isArray(n)&&(n=Array.prototype.slice.call(arguments,0).slice(2)),t[e]&&t[e][i]){return{error:0,result:t[e][i].apply(t[e],n),__from:"js"}}var r=l();if(a(r,4.8)>=0){var c=s(e,i,n);return c=c?JSON.parse(c):{},c.__from="app",c}if("4.7.1"===r||"4.7"==r){return{error:0,result:s(e,i,n),__from:"app4.7"}}return{error:200}}function s(e,i,n){if(!o.isBox)return{error:201};if(!o.isAndroid)return{error:202};var r={obj:e,func:i,args:n?n:[]};try{return t.prompt("BdboxApp:"+JSON.stringify(r))}catch(t){return{error:201}}}var a=e("common:bdbox/utils/version_compare"),l=e("common:bdbox/utils/getVersion");n.exports=r}),o("common:bdbox/utils/detect",function(e,i,n,o){function r(e){var i={name:"unknown",version:0};this===t||this.os||(this.os=i),e=e||navigator.userAgent;var n={Weibo:/weibo/i,Wechat:/micromessenger\//i,QQ:/QQ\//};for(var o in n)n.hasOwnProperty(o)&&(i["is"+o]=n[o].test(e));i.isUC=e.match(/UC/)||t.ucweb||t.ucbrowser;var r=e.match(/(Android);?\s+([\d.]+)?/);if(r)return i.android=!0,i.version=r[2],i.name="android",i;var s=e.match(/(iPad).*OS\s([\d_]+)/),a=e.match(/(iPod)(.*OS\s([\d_]+))?/),l=!s&&e.match(/(iPhone\sOS)\s([\d_]+)/);return l&&!a?(i.ios=i.iphone=!0,i.version=l[2].replace(/_/g,"."),i.name="ios",i):s?(i.ios=i.ipad=!0,i.name="ios",i.version=s[2].replace(/_/g,"."),i):a?(i.name="ios",i.ios=i.ipod=!0,i.version=a[3]?a[3].replace(/_/g,"."):null,i):i}r.apply(o),n.exports=r}),o("common:bdbox/each",function(t,e,i){function n(t){var e;return null==t?e=String(t):(e=Object.prototype.toString.call(t).toLowerCase(),e=e.substring(8,e.length-1)),e}i.exports=function(t,e,i){if("object"==typeof t){var o,r,s=n(t);if(i=i||t,"array"===s||"arguments"===s||"nodelist"===s){for(o=0,r=t.length;r>o;o++)if(!1===e.call(i,t[o],o,t))return}else for(o in t)if(t.hasOwnProperty(o)&&!1===e.call(i,t[o],o,t))return}}}),o("common:bdbox/client/nativeShare",function(i,n,o,r){function s(e){var i={wechatIcon:location.protocol+"//m.baidu.com/static/search/logo300.png",type:"url",mediaType:"all",linkUrl:location.href,title:l.title,success:"console.log",error:"console.log"};each(e||{},function(t,e){i[e]=t}),i.image&&(i.imageUrl=i.image),i.iconUrl&&!i.imageUrl&&"url"===i.type&&(i.imageUrl=i.iconUrl);var n={};["success","error"].forEach(function(e){var o=e;r.isFunction(i[e])&&(o="_xSHARE_SUCCESS_"+r.getId(),t[o]=i[e]),n[e+"callback"]=o,delete i[e]}),n.options=i,n.options.imageUrl&&r.isAndroid&&a(r.version,"6.5")<0&&delete n.options.imageUrl,t.BoxShareData=n;var o=i.wechatIcon;if(/micromessenger\//i.test(navigator.userAgent)&&o&&o.length>20){var s=l.createElement("div");s.id="wa-generalevent-wx-logo",s.style.display="none",s.innerHTML='<img src="'+o+'"/>';var c=l.body.firstChild;c?l.body.insertBefore(s,c):l.body.appendChild(s)}}var a=i("common:bdbox/utils/version_compare"),l=e;o.exports=s}),o("common:bdbox/utils/ready",function(t,i,n){function o(){s.forEach(function(t){t()}),s.length=0,a=!0}function r(t){"function"==typeof t&&(a?t():s.push(t))}var s=[],a=!1;"complete,loaded,interactive".indexOf(e.readyState)>-1&&e.body?o():e.addEventListener("DOMContentLoaded",o,!1),n.exports=r}),d.version=d.utils.getVersion(),d.version_compare=d.utils.version_compare,each=d.each,d.nativeShare=d.client.nativeShare,d.type=s,d.canI=function(t,e,i){return d.version_compare(d.version,t)>=0?d.isFunction(e)&&e():d.isFunction(i)&&i(),d},o("common:bdbox/client/o2o",function(t,e,i,n){var o=t("common:bdbox/android/invokeApp"),r=t("common:bdbox/ios/invokeApp"),s=encodeURIComponent,a=t("common:bdbox/each"),l=n.isAndroid?function(t,e){n.isObject(t)&&(e=t,t=t.url,delete e.url);var i=["S.bdsb_light_start_url="+s(t)];if(n.isObject(e)){var r={color:"i.extra_actionbar_color_id",appid:"S.bdsb_wallet_appid"};a(e,function(t,e){"color"===e&&(t=4278190080|parseInt("0x"+t)),e=r[e]||e,i.push(e+"="+t)})}i=i.join(";"),o("Bdbox_android_utils","command",[JSON.stringify({intent:"intent:#Intent;"+i+";end",class:"com.baidu.searchbox.wallet.WalletServiceActivity",min_v:"16783629",mode:"0"})])}:function(t,e){n.isObject(t)&&(e=t,t=t.url,delete e.url);var i={openurl:s(t),minver:"5.3.0.0",isla:0,opentype:1,append:0,rbtnstyle:2};if(n.isObject(e)){var o={color:"barcolor"};a(e,function(t,e){e=o[e]||e,i[e]=t})}i.appid&&(i.isla=1),r("easybrowse",i)};i.exports=l}),d.o2o=d.client.o2o,"android"===d.os.name?f("card",{query:function(t,e){if(f.version_compare(f.version,"5.0")<0)return this;var i,n;f.isArray(t)?i=[JSON.stringify(t)]:(n=f.toArray(arguments),e=n.pop(),f.isFunction(e)?i=n:(i=f.toArray(arguments),e=null),i=[JSON.stringify(i)]);var o=f.android.invokeApp("Bdbox_android_card","mquery",i);return o=0===o.error&&o.result?JSON.parse(o.result):!1,f.isFunction(e)&&e(o),o},add:function(e,i){if(f.version_compare(f.version,"5.0")<0)return this;var n,o;f.isString(e)?n=[e]:f.isArray(e)?n=[JSON.stringify(e)]:(o=f.toArray(arguments),i=o.pop(),f.isFunction(i)?n=o:(n=f.toArray(arguments),i=null),n=[JSON.stringify(n)]);var r=null;if(f.version_compare(f.version,"5.5")>=0){var s="";f.isFunction(i)&&(s="__box_card_"+f.getId(),t[s]=function(t){var e=JSON.parse(t),n=!1;for(var o in e){n=e[o].st;break}i(n)}),r=f.android.invokeApp("Bdbox_android_card","madd",n.concat([s,0]))}else r=f.android.invokeApp("Bdbox_android_card","madd",n);return r}}):f("card",{query:function(t,e){if(f.version_compare(f.version,"5.0")<0)return this;var i,n;f.isArray(t)?i=[JSON.stringify(t)]:(n=f.toArray(arguments),e=n.pop(),f.isFunction(e)?i=n:(i=f.toArray(arguments),e=null),i=[JSON.stringify(i)]);var o=function(t){f.isFunction(e)&&e(JSON.parse(t)),o=null};f.ios.invokeApp("cardMquery",{params:encodeURIComponent(i)},o)},add:function(t,e){if(f.version_compare(f.version,"5.0")<0)return this;var i,n;f.isString(t)?i=[t]:f.isArray(t)?i=[JSON.stringify(t)]:(n=f.toArray(arguments),e=n.pop(),f.isFunction(e)?i=n:(i=f.toArray(arguments),e=null),i=[JSON.stringify(i)]);var o=function(t){var i=JSON.parse(t),n=!1;for(var r in i){n=i[r].st;break}f.isFunction(e)&&e(n),o=null};return f.ios.invokeApp("cardMadd",{params:encodeURIComponent(i),gohome:"0"},o),!0}}),o("common:bdbox/utils/jsonToQuery",function(t,e,i,n){i.exports=function(t){if(n.isString(t))return t;var e=[];for(var i in t)e.push(i+"="+t[i]);return e.join("&")}}),o("common:bdbox/io/loadJS",function(i,n,o,r){function s(i,n,o){var s,c,u,d=e.createElement("script");r.isString(i)?(s=i,r.isFunction(n)&&(o=n,n=null)):(s=i.url,n=i.data,o=i.success,c=i.error||r.emptyFn,u=i.timeout),r.isObject(n)&&(n=l(n)),n&&(s+=(-1===s.indexOf("?")?"?":"&")+n),s=s.replace(/[&?]{1,2}/,"?");var p;/=\?/.test(s)&&(p="_box_jsonp"+r.getId(),s=s.replace(/=\?/,"="+p));var f=a();u=u||2e4,d.type="text/javascript",d.src=s;var h,m=!0,g=function(){p&&delete t[p],h&&clearTimeout(h),d.onload=d.onreadystatechange=d.onerror=null,d=null},v=function(){!d||d.readyState&&!/loaded|complete/.test(d.readyState)||(g(),m&&r.isFunction(o)&&o.apply(null,r.toArray(arguments)),m=!1)},y=function(t){g(),m&&c(t),m=!1};p&&(t[p]=v),h=setTimeout(function(){g(),m&&c("timeout"),m=!1},u),d.onload=d.onreadystatechange=d.onerror=v,d.onerror=y,f.appendChild(d)}function a(){return e.head||e.getElementsByTagName("head")[0]||e.documentElement}var l=i("common:bdbox/utils/jsonToQuery");r.emptyFn,o.exports=s}),o("common:bdbox/utils/queryToJson",function(t,e,i){i.exports=function(t){try{t=t?decodeURIComponent(t):""}catch(e){t=""}var e=t.split("?"),i=e[1]?e[1]:e[0],n=i.split("&"),o={};return n.forEach(function(t){t=t.split("="),t[0].length>0&&(o[t[0]]=t[1]||"")}),o}}),o("common:bdbox/extend",function(t,e,i,n){function o(t,e,i){for(var n in e)i&&(r(e[n])||s(e[n]))?(r(e[n])&&!r(t[n])&&(t[n]={}),s(e[n])&&!s(t[n])&&(t[n]=[]),o(t[n],e[n],i)):l(e[n])||(t[n]=e[n])}var r=n.isPlainObject,s=n.isArray,a=n.isBoolean,l=n.isUndefined;i.exports=function(t){var e,i=n.emptyArr.slice.call(arguments,1);return a(t)&&(e=t,t=i.shift()),i.forEach(function(i){o(t,i,e)}),t}}),o("common:bdbox/utils/ready",function(t,i,n){function o(){s.forEach(function(t){t()}),s.length=0,a=!0}function r(t){"function"==typeof t&&(a?t():s.push(t))}var s=[],a=!1;"complete,loaded,interactive".indexOf(e.readyState)>-1&&e.body?o():e.addEventListener("DOMContentLoaded",o,!1),n.exports=r}),o("common:bdbox/utils/detect",function(e,i,n,o){function r(e){var i={name:"unknown",version:0};this===t||this.os||(this.os=i),e=e||navigator.userAgent;var n={Weibo:/weibo/i,Wechat:/micromessenger\//i,QQ:/QQ\//};for(var o in n)n.hasOwnProperty(o)&&(i["is"+o]=n[o].test(e));i.isUC=e.match(/UC/)||t.ucweb||t.ucbrowser;var r=e.match(/(Android);?\s+([\d.]+)?/);if(r)return i.android=!0,i.version=r[2],i.name="android",i;var s=e.match(/(iPad).*OS\s([\d_]+)/),a=e.match(/(iPod)(.*OS\s([\d_]+))?/),l=!s&&e.match(/(iPhone\sOS)\s([\d_]+)/);return l&&!a?(i.ios=i.iphone=!0,i.version=l[2].replace(/_/g,"."),i.name="ios",i):s?(i.ios=i.ipad=!0,i.name="ios",i.version=s[2].replace(/_/g,"."),i):a?(i.name="ios",i.ios=i.ipod=!0,i.version=a[3]?a[3].replace(/_/g,"."):null,i):i}r.apply(o),n.exports=r}),o("common:bdbox/schema",function(t,i,n,o){function r(t,i){if(t){if(i=i||o.emptyFn,!o.isBox&&o.isIOS&&l(a.version,"9.0")>=0)return void c(function(){s(t,i)});var n=Date.now(),r=e.createElement("IFRAME");r.src=t,r.style.position="absolute",r.style.left="-2000px",r.style.top="-1000px",r.style.width="1px",r.style.height="1px",r.style.webkitTransition="all 0.9s",r.style.transition="all 0.9s",e.body.appendChild(r);var u=function(){e.body.removeChild(r),i(Date.now()-n<1500?!0:!1)};r.addEventListener("webkitTransitionEnd",u,!1),r.addEventListener("transitionEnd",u,!1),setTimeout(function(){r.style.left="-1000px"},20)}}function s(t,e){location.href=t,u&&clearTimeout(u),u=setTimeout(function(){e(!0)},1200)}var a=t("common:bdbox/utils/detect")(),l=t("common:bdbox/utils/version_compare"),c=t("common:bdbox/utils/ready"),u=null;n.exports=r}),o("common:bdbox/monitor",function(e,i,n,o){var r=encodeURIComponent,s=function(t,e){t+=t.indexOf("?")<0?"?":"&",this.url=t,this.options=e};s.prototype.report=function(e){e=e||"";var i=new Image(1,1),n=[];if(o.isObject(e)){for(var s in e)n.push(s+"="+r(String(e[s])));e=n.join("&")}var a="_box_mt"+o.getId();t[a]=i,i.onload=i.onerror=i.onabort=function(){i.onload=i.onerror=i.onabort=null,t[a]=i=null};var l=this.url+e;return o.isFunction(this.options.customHandler)&&(l=this.options.customHandler(l)),i.src=l+"&_rnd="+Math.floor(2147483648*Math.random()),this},s.prototype.main=function(t,e){return t&&o.isFunction(this[t])&&this[t].apply(this,o.toArray(e||[])),this},n.exports=function(t,e){return new s(t,e)}}),o("common:bdbox/clone",function(t,e,i){var n=Object.prototype.toString,o=function(t,e,i){var n=0;for(var o in t)if(t.hasOwnProperty(o))if(i)e[o]=t[o];else if(e(o,t[o],n++))break},r=function(t){var e;switch(n.call(t)){case"[object Object]":e={},o(t,function(t,i){e[t]=r(i)});break;case"[object Array]":e=[],t.forEach(function(t){e.push(r(t))});break;default:e=t}return e};i.exports=r}),o("common:bdbox/monitor/pblog",function(t,e,i,n){var o=t("common:bdbox/monitor"),r=t("common:bdbox/extend"),s=t("common:bdbox/utils/queryToJson"),a=t("common:bdbox/utils/getVersion"),l=t("common:bdbox/clone"),c=s(location.search),u=navigator.userAgent,d="//m.baidu.com/tcbox",p={service:"bdbox",action:"pblog",ctv:2,cen:"uid_ua_ut",data:{appid:"1",dataid:"2",actiontype:"1",actionid:"2",actiondata:{ref:c.ref||"",gmv:c.vmgdb||"",source:c.from||c.ref||"",boxVersion:a(),boxPlatform:u.match(/(iPad|iPhone|iPod)/gim)?"ios":"android"}}},f=encodeURIComponent;c.uid&&c.osname&&["osname","ua","ut","from","cfrom","uid","pkgname"].forEach(function(t){c[t]&&(p[t]=c[t])});var h,m=o(d,{customHandler:function(t){var e=[];if(h)for(var i in h)if(h.hasOwnProperty(i)){var o=h[i];n.isPlainObject(o)&&(o=JSON.stringify(o)),e.push(i+"="+f(o))}return e.length&&(t+=e.join("&")),t}});m.init=function(t,e){n.isPlainObject(e)&&(p=r(p,e)),p.data.cateid=t},m.pv=function(t,e){h=l(p);var i=h.data;i.actionid="1";var n={};return n.url=t||location.href,e&&(n.u=e),i.actiondata=r(i.actiondata,n),m.report()},m.event=function(t,e,i){if(!t)throw"monitor.tc.event need a evtName";if(n.isPlainObject(e)&&!i){var o={evtName:t};for(var s in e)o[s]=e[s]}else var o={evtName:t,evtType:e||"",evtTag:i||""};h=l(p);var a=h.data;return a.actionid="2",a.actiondata=r(a.actiondata,o),m.report()},i.exports=function(){m.main.apply(m,arguments)}}),o("common:bdbox/moplus",function(t,e,i,n){var o=t("common:bdbox/utils/jsonToQuery"),r=t("common:bdbox/io/loadJS"),s=t("common:bdbox/utils/version_compare"),a=t("common:bdbox/monitor/pblog"),l=t("common:bdbox/schema"),c="com.baidu.searchbox",u="http://127.0.0.1:6259/",d="http://127.0.0.1:40310/",p="inapp_boxserver",f="https:"===location.protocol,h=null,m="__moplus_host__",g={isSendPv:!1,isHit:!1,parseUA:function(){var t,e,i=navigator.userAgent,n={uc:/UCBrowser\/(\S*) \S*/g,bd:/baidubrowser\/(\S*) \(Baidu/g,qq:/MQQBrowser\/(\S*) Mobile/g,chr:/Chrome\/(\S*) Mobile/g,qh:/360 Aphone Browser \((\S*)\)/g,sg:/SogouMobileBrowser\/(\S*)/g,mi:/MiuiBrowser\/(\S*)/g};for(var o in n){var r=n[o].exec(i);if(r){t=o,e=r[1];break}}return t=t?t:"other",e=e?e:"0",{t:t,v:e}},parseHost:function(){return v.curHost===d?1:0},sendEvt:function(t,e,i,n){this.isHit&&this.send(t,e,i,n)},send:function(t,e,i,n){var o=this.parseUA(),r=o.t,s=o.v,l=f?0:1,c=this.parseHost();a("event",[t,{evtType:e||"",brName:r,brVer:s,isHttp:l,isNew:c,source:i||"",intent:n||""}])},init:function(){this.isHit=Date.now()%100==1,a("init",[2])}},v=function(t,e,i){this.version="2.0",this.isHttps=f,this.curHost=i||"",this.newHost=d,this.oldHost=this.isHttps?d:u,this.MCMDF=e||p,this._infoFuncs=[],this._verFuncs=[],this.minVersion=t?t:0,this.pkgName=c,g.init()},y=function(t,e){try{sessionStorage.setItem(t,e)}catch(t){}},b=function(t){var e;try{e=sessionStorage.getItem(t)}catch(t){}return e};v.prototype={constructor:v,setMcmdf:function(t){return this.MCMDF=t,this},setHost:function(t){return this.curHost=t,y(m,t),this},getHost:function(){if(this.isHttps)return this.curHost=this.newHost,this.newHost;var t=b(m);return t?(this.curHost=t,this.curHost):void 0},api:function(t,e,i,r){if(!t)throw"Moplus.api need an action";n.isFunction(e)&&(r=i,i=e,e={});var s=t+(~t.indexOf("?")?"&":"?")+o(e);return~s.indexOf("mcmdf")||(s+="&mcmdf="+this.MCMDF),g.sendEvt("api","send:"+t,this.MCMDF,s),this.request(s,function(e){g.sendEvt("api",(n.isPlainObject(e)&&0==e.error?"success:":"fail:")+t,this.MCMDF,s),i(e)},r)},getInfo:function(t,e){if(h)return t(h);if(this._infoFuncs.push(t),!(this._infoFuncs.length>1)){var i=this,o=function(t,e){!e&&n.isPlainObject(t)&&(h=t);var o;for(e&&(t={error:33});o=i._infoFuncs.shift();)o(t)},s="getsearchboxinfo?mcmdf="+this.MCMDF;if(this.getHost()){var a={url:this.curHost+s+"&callback=?",success:o,error:function(){o(null,!0)},timeout:e};r(a)}else this.request(s,function(t){return 33===t.error?o(null,!0):void o(t)},e);return this}},getHVersion:function(t,e){this._verFuncs.push(t);var i=this;if(!(this._verFuncs.length>1)){var n=function(t){var e;for(t=i.parseInfo(t);e=i._verFuncs.shift();)e(t)};return this.getInfo(n,e),this}},parseInfo:function(t,e){t=t||h,e=e||this.minVersion;var i=t.package_infos;if(!i||0===i.length)return!1;var n=c,o={offic:{name:c,version:0},oem:{version:0}};return i.forEach(function(t){var i=t.version_name,r=t.package_name;s(i,e)>=0&&(r===n?1===s(i,o.offic.version)&&(o.offic={version:i,name:c}):1===s(i,o.oem.version)&&(o.oem={version:i,name:r}))}),0===o.oem.version&&0===o.offic.version?!1:0!==o.offic.version?o.offic:0!==o.oem.version?o.oem:void 0},schema:function(t,e){if(!t.intent)throw"schema intent is empty";t.mcmdf||(t.mcmdf=this.MCMDF);var i=function(){g.send("schema","success",t.source,t.intent),n.isFunction(e)&&e({error:0,from:"schema"})},o=function(){g.send("schema","fail",t.source,t.intent),n.isFunction(e)&&e({error:20,from:"schema"})},r=t.schema||"";if(t.intent&&!t.schema)-1==t.intent.indexOf(c)&&(g.sendEvt("defaultPKGName","fail",t.source||"",t.intent),t.minver=t.minver?t.minver:"6.9.1");r||(r="baiduboxapp://utils?action=sendIntent&params="+encodeURIComponent(JSON.stringify(t))+"&minver="+(t.minver?t.minver:"6.9")),l(r,function(t){t?o():i()})},sendIntent:function(t,e,i){var o={};if(t&&n.isString(t)){var r,s=this,a=!0;return n.isPlainObject(i)?(o=i,r=i.source||"",i.needlog?g.isHit=i.needlog:o.needlog=g.isHit?1:0,i=i.timeout):n.isBoolean(i)&&(a=i),o.intent=t,g.send("sendintent","send",r,t),this.api("sendintent",{intent:encodeURIComponent(t)},function(i){!i||i&&33===i.error||!n.isPlainObject(i)?(g.send("sendintent","fail",r,t),a?s.schema(o,e):(i=i||{},i.from="moplus",e(i))):(g.send("sendintent","success",r,t),e(i))},i)}return this},request:function(t,e,i){var o,s,a=this,l={timeout:i};n.isFunction(e)&&!~t.indexOf("callback=")&&(t+="&callback=?");var c=function(t){o="success",n.isFunction(e)&&e(t)},u=function(){n.isFunction(e)&&e({error:33})};if(a.getHost())l.url=a.curHost+t,l.success=c,l.error=u,r(l);else if(l.url=a.newHost+t,l.success=function(t){"success"!==o&&(s&&clearTimeout(s),a.setHost(a.newHost),c(t))},l.error=function(){a.isHttps?(o="error",u()):"error"===o&&u(),o="error"},r(l),!a.isHttps){var d={timeout:i,url:a.oldHost+t,error:l.error};d.success=function(t){"success"!==o&&("error"===o?(a.setHost(a.oldHost),c(t)):s=setTimeout(function(){a.setHost(a.oldHost),c(t)},500))},r(d)}return this}},i.exports=function(t,e){return new v(t,e)},i.exports.Moplus=v}),d.version_compare(d.version,"5.3.5")>=0){var g,v={image:"imageUrl",url:"linkUrl",order:"mediaType"},y="";t[y]=d.emptyFn,d.isAndroid?(g=function(t){if(t.id&&d.byId(t.id)){var e=t.eventType||"touchstart";d.byId(t.id).addEventListener(e,function(){i(t)},!0)}var i=function(e){e=a(e||t);var i=e.error,n=e.success;e.iconUrl&&e.imageUrl&&delete e.imageUrl,d.android.invokeApp("Bdbox_android_utils","callShare",[JSON.stringify(e),n||"console.log",i||"console.log"])};return i},f("share",g)):(g=function(t){if(t.id&&d.byId(t.id)){var e=t.eventType||"touchstart";d.byId(t.id).addEventListener(e,function(){i(t)},!0)}var i=function(e){e=a(e||t);var i=e.error,n=e.success;e.iconUrl&&!e.imageUrl&&(e.imageUrl=e.iconUrl),e=JSON.stringify(e),d.ios.invokeApp("callShare",{options:encodeURIComponent(e),errorcallback:i||"console.log",successcallback:n||"console.log"})};return i},f("share",g))}else{var b=[],w=function(){f._socShare&&f._socShare.init?b.forEach(function(t){f._socShare.init(t)}):setTimeout(w,3e3)};d.io.loadJS("//m.baidu.com/static/searchbox/openjs/share.js?v=1.2",w);var _={source:"client_id",id:"dom_id",image:"pic_url",success:"afterRender"},g=function(t){var e={content:"",client_id:"ZVEpDSsmZ0qxa1gmgDAh1Fje",theme:"native",dom_id:"share",animate:!0,pic_url:"",url:encodeURIComponent(location.href)};return d.isObject(t)&&d.each(t,function(t,i){if(i in _&&(i=_[i]),"order"===i&&d.isArray(t)){var n=[];t.forEach(function(t){"email"===t&&(t="mail"),n.push(t)})}e[i]=t}),delete e.success,delete e.error,delete e.afterRender,"all"===e.order?e.order=["qqdenglu","sinaweibo","renren","kaixin","mail","sms"]:d.isString(e.order)&&(e.order=e.order.split(",")),f._socShare&&f._socShare.init?f._socShare.init(e):b.push(e),function(){f._socShare.ui._shareBtnClickHandler()}};f("share",g)}if(o("common:bdbox/distribute",function(t,e,i,n){var o=t("common:bdbox/schema");t("common:bdbox/utils/detect");var r=t("common:bdbox/each"),s=t("common:bdbox/moplus"),a=n.emptyFn,l={qqDownloadUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox",androidDownloadUrl:"",iosDownloadUrl:"",iosFailCallback:a,androidFailCallback:a,iosSchema:"",androidSchema:"",androidIntent:"",inBoxCallback:a},c=function(t){var e=this;t&&r(l,function(e,i){t[i]=t[i]||e});var i=this.url=t.url;i&&""!==i?(this.androidIntent="intent://"+i.replace(/^http[s]?:\/\//,"")+"#Intent;scheme=http;action=com.baidu.searchbox.action.VIEW;category=android.intent.category.DEFAULT;end",this.iosSchema="baiduboxapp://easybrowse?openurl="+encodeURIComponent(i)+"&opentype=0&isla=0&append=0&minver=5.3.0.0"):["androidIntent","iosSchema","androidSchema"].forEach(function(i){e[i]=t[i]}),this.options=t,this.fail=function(){if(console.log(n.os.name+" fail"),n.isFunction(t[n.os.name+"FailCallback"])){var e=t[n.os.name+"FailCallback"]();if(n.isBoolean(e)&&!e)return}var i=t[n.os.name+"DownloadUrl"];i&&""!==i&&(location.href=t[n.os.name+"DownloadUrl"])},this.success=function(){return console.log(n.os.name+" success"),n.isFunction(t[n.os.name+"SuccessCallback"])?t[n.os.name+"SuccessCallback"]():void 0}};c.prototype.wechat=function(){var t=this.options;if(n.isFunction(t.wechatCallback)){var e=t.wechatCallback();if(n.isBoolean(e)&&!e)return}t.qqDownloadUrl&&""!==t.qqDownloadUrl&&(location.href=t.qqDownloadUrl)},c.prototype.run=function(){var t=this,e=(t.url,t.options);return n.os.isWechat?t.wechat():n.isBox&&n.isFunction(e.inBoxCallback)?e.inBoxCallback():void this.invoke()},c.prototype.invoke=function(){var t=this;if(n.os.android){var e=s();e.getHVersion(function(i){i?e.sendIntent(t.androidIntent,function(e){0==e.error?t.success():t.fail()},1e3):t.androidSchema?o(t.androidSchema,function(e){e?t.fail():t.success()}):t.fail()})}else o(t.iosSchema,function(e){e?t.fail():t.success()})},i.exports=function(t){return new c(t)}}),each(d,function(t,e){f[e]=t}),t.Box&&t.Box.$)for(var x in f)t.Box[x]=t.Box[x]||f[x];else t.Box=f}(window,document)});