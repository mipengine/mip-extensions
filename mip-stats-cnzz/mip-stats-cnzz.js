/**
* CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');

     var customElement = require('customElement').create();
     customElement.prototype.build = function () {
       var _element = this.element;
        
        var token = _element.getAttribute('token');

        var $_element = $(_element);
        var html = [
            '<script type="text/javascript">',
                'var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_'+token+'\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D'+token+'\' type=\'text/javascript\'%3E%3C/script%3E"));',
            '</script>'
        ];

        $_element.append(html.join(''));
    }

    return customElement;
});
