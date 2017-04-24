/**
 * @file mip-ruizhiqi-pagination 组件
 * @author Abin
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
		var el = this.element;

        var sitename=el.getAttribute('sitename');
		var receiveid=el.getAttribute('receiveid');
		var pagename=el.getAttribute('pagename');
        var pageCount=el.getAttribute('pagecount');
		var current=el.getAttribute('current');
		var showcount=el.getAttribute('showcount');
        
		var $element = $(el);
		var html=[];


		html.push('<script>');

		html.push('$(function () {');
		html.push('       $(".tcdPageCode").createPage({');
		html.push('       pageCount: '+pageCount+',');
		html.push('       current: '+current+',');
		html.push('       showCount:'+showcount+',');
		html.push('       backFn: function (p) {');
		html.push('                 var pv="";');
		html.push('                 if(p&&p>1)');
		html.push('                 {');
		html.push('                      pv="_"+p;');
		html.push('                 }');
		html.push('                 var h="/Mobile/'+sitename+'/'+receiveid+'_'+pagename+'"');
		html.push('                 location = h+pv+".html";');
		html.push('       }');
		html.push('     });');
		html.push('  });');

		html.push('</script>');


		$element.append(html.join(''));


    };

    return customElement;
});
