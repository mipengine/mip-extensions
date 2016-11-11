/**
* 学优网移动站adsense插件
* @author myoa@163.com
* @version 1.0
*/

define(function (require) {
    var $ = require('zepto');

     var customElement = require('customElement').create();
     customElement.prototype.build = function () {
       var _element = this.element;
        
        var slot = _element.getAttribute('id');

        var $_element = $(_element);
        var html = [
            '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>',
                '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2743127670892157" data-ad-slot="'+slot+'" data-ad-format="auto"></ins>',
            '<script>',
            '(adsbygoogle = window.adsbygoogle || []).push({});',
            '</script>'
        ];

        $_element.append(html.join(''));
    }

    return customElement;
});
