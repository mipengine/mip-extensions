(window.MIP=window.MIP||[]).push({name:"mip-xem-comment-duoshuo",func:function(){define("mip-xem-comment-duoshuo/mip-xem-comment-duoshuo",["require","zepto","customElement"],function(t){var e=t("zepto"),i=t("customElement").create();return i.prototype.build=function(){var t=this.element,i=t.getAttribute("short_name"),n=e(t),o=['<script type="text/javascript">','var duoshuoQuery={short_name:"'+i+'"};',"(function() {var ds=document.createElement('script');","ds.type='text/javascript';","ds.async=true;","ds.src=(document.location.protocol=='https:'?'https:':'http:')+'//static.duoshuo.com/embed.js';","ds.charset='UTF-8';","(document.getElementsByTagName('head')[0]||","document.getElementsByTagName('body')[0]).appendChild(ds)})();","<\/script>"];n.append(o.join(""))},i}),define("mip-xem-comment-duoshuo",["mip-xem-comment-duoshuo/mip-xem-comment-duoshuo"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-xem-comment-duoshuo",e)}if(window.MIP)require(["mip-xem-comment-duoshuo"],function(e){t(window.MIP,e)});else require(["mip","mip-xem-comment-duoshuo"],t)}()}});