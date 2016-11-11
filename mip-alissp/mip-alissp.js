/**
* 学优网移动站alibaba ssp插件
* @author myoa@163.com
* @version 1.0
*/

define(function (require) {
    var $ = require('zepto');

     var customElement = require('customElement').create();
     customElement.prototype.build = function () {
       var _element = this.element;
        
        var mmid = _element.getAttribute('id');

        var $_element = $(_element);
        var html = [
            '<script type="text/javascript">',
				'document.write(\'<a style="display:none!important" id="tanx-a-mm_'+mmid+'"></a>\');',
				'tanx_s = document.createElement("script");',
				'tanx_s.type = "text/javascript";',
				'tanx_s.charset = "gbk";',
				'tanx_s.id = "tanx-s-mm_'+mmid+'";',
				'tanx_s.async = true;',
				'tanx_s.src = "http://ac429.gkstk.com/ex?i=mm_'+mmid+'";',
				'tanx_h = document.getElementsByTagName("head")[0];',
				'if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);',
			'</script>'
        ];

        $_element.append(html.join(''));
    }

    return customElement;
});
