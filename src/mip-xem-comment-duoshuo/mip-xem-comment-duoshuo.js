/**
* @file 多说评论框通用代码稳定版组件
* @author mip-support@hzxem.com
* @version 1.0
* @copyright 2016 hzxem.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var elem = this.element;
        var shortname = elem.getAttribute('short_name');
        var $elem = $(elem);
        var html = [
            '<script type="text/javascript">',
            'var duoshuoQuery={short_name:"' + shortname + '"};',
            '(function() {var ds=document.createElement(\'script\');',
            'ds.type=\'text/javascript\';',
            'ds.async=true;',
            'ds.src=(document.location.protocol==\'https:\'?\'https:\':\'http:\')+\'//static.duoshuo.com/embed.js\';',
            'ds.charset=\'UTF-8\';',
            '(document.getElementsByTagName(\'head\')[0]||',
            'document.getElementsByTagName(\'body\')[0]).appendChild(ds)})();',
            '</script>'
        ];
        $elem.append(html.join(''));
    };
    return customElement;
});
