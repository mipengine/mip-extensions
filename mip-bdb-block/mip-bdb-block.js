/**
 * @author: 56
 * @date:  2017-5-3
 * @time: 17:35
 * @file: mip-bdb-block.js
 * @contact: bendibao.com
 * @description: #
 */
define(function (require) {
    
    var customElem = require('customElement').create();
   
    // Builder
    customElem.prototype.build = function () {
        
		var element = this.element;
       
        var loadjs =element.getAttribute('loadjs');
        var url = element.getAttribute('url');
        var title = element.getAttribute('title') 
		
        var scriptstr = '';

        if (loadjs) {
           
			scriptstr += '<script src="' + loadjs + '&theurl=' + url + '&title=' + title + '"></script>';
          
        }
        
        if (scriptstr) {
            document.write(scriptstr);
        }

    };

    return customElem;
	
});
