define("mip-custom/url",["require","util","mip-custom/data"],function(t){function e(){var t=s.params;for(var e in t)if(t.hasOwnProperty(e))t[e]=a.hash.get(e)||t[e];var i=a&&a.hash&&a.hash.get;return t.query=i?a.hash.get("word"):"",t.logid=i?a.hash.get("lid"):"",t}function i(t){var e=null;try{var i=t.querySelector('script[type="application/json"]');if(i){if(e=JSON.parse(i.textContent),!e.accid)return void console.warn("mip-custom 缺少 accid 参数");if(!e.title)return void console.warn("mip-custom 缺少 title 参数");for(var n in e)if(e.hasOwnProperty(n))e[n]=decodeURIComponent(e[n])}}catch(t){return console.warn("json is illegal"),void console.warn(t)}return e}function n(t){var n=i(t);if(!n)return null;else return o.fn.extend(e(),n)}function r(t){var e=!0,i=s.ajaxUrl,r=n(t);if(r){for(var o in r)if(r.hasOwnProperty(o))i+=(!e?"&":"")+o+"="+r[o],e=!1;return i}}var o=t("util"),s=t("mip-custom/data"),a=window.MIP||{};return{get:r}});