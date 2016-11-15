/**
* 学优网mip改造 第三方联盟广告插件
* @file 插入联盟广告
* @author myoa@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require("zepto");
    var customElement = require("customElement").create();
    customElement.prototype.createdCallback = function() {
        var _element = this.element;
        var adtype = _element.getAttribute("type");
        var token = _element.getAttribute("token");
        var $_element = $(_element);
        var html = [];
        switch (adtype) {
            case "alibaba": 
				html.push('<a style="display:none!important" id="tanx-a-mm_10011797_2351313_'+token+'"></a>');
				html.push('<script type="text/javascript">');
				html.push('tanx_s = document.createElement("script");');
				html.push('tanx_s.type = "text/javascript";');
				html.push('tanx_s.charset = "gbk";');
				html.push('tanx_s.id = "tanx-s-mm_10011797_2351313_'+token+'";');
				html.push("tanx_s.async = true;");
				html.push('tanx_s.src = "http://ac429.gkstk.com/ex?i=mm_10011797_2351313_'+token+'";');
				html.push('tanx_h = document.getElementsByTagName("head")[0];');
				html.push("if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);");
				html.push("</script>");
				break;

            case "google":
				html.push('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
				html.push('<ins class="adsbygoogle"');
				html.push('	 style="display:block"');
				html.push('	 data-ad-client="ca-pub-2743127670892157"');
				html.push('	 data-ad-slot="'+token+'"');
				html.push('	 data-ad-format="auto"></ins>');
				html.push('<script>');
				html.push('(adsbygoogle = window.adsbygoogle || []).push({});');
				html.push('</script>');
				break;
				
		    case "baidu":
				html.push('<script type="text/javascript">');
				html.push('	var cpro_id = "'+token+'";');
				html.push('	window.cproStyleApi = {');
				html.push('		\''+token+'\': {');
				html.push('			cpro_ftpc: true');
				html.push('		}');
				html.push('	};');
				html.push('</script>');
				html.push('<script src="http://cpro.baidustatic.com/cpro/ui/cm.js" type="text/javascript"></script>');

            break;
        }
        $_element.append(html.join(""));
    };
    return customElement;
});
