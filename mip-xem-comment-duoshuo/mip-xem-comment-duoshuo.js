/**
* 多说插件
* @exports modulename
* @author mip-support@xem.com
* @version 1.0
* @copyright 2016 xxx.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');

     var customElement = require('customElement').create();
     customElement.prototype.build = function () {
       var _element = this.element;
        
        var short_name = _element.getAttribute('short_name');

        var $_element = $(_element);
        var html = [
            '<script type="text/javascript">',
                'var duoshuoQuery={short_name:"'+short_name+'"};(function(){var ds=document.createElement(\'script\');ds.type=\'text/javascript\';ds.async=true;ds.src=(document.location.protocol==\'https:\'?\'https:\':\'http:\')+\'//static.duoshuo.com/embed.js\';ds.charset=\'UTF-8\';(document.getElementsByTagName(\'head\')[0]||document.getElementsByTagName(\'body\')[0]).appendChild(ds)})();',
            '</script>'
        ];

        $_element.append(html.join(''));
    }

    return customElement;
});