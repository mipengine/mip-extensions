/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    var STYLE = [
        'display',
        'font-size',
        'color'
    ];

    /**
     * [is_noCache 判断是否禁止缓存]
     * 
     * @return {Boolean} 
     */
    function is_noCache() {
        var cache_meta = document.querySelector('meta[property="mip:use_cache"]');
        if(cache_meta && cache_meta.getAttribute('content') === 'no') {
            return true;
        }
        return false
    }


    /**
     * 点击链接事件
     *
     * @param  {Event} e event
     */
// <<<<<<< Updated upstream
    function onClick (e) {

        e.preventDefault();

        var href = this.getAttribute('href');
        var pageType = is_noCache() ? 2 : 1;

        if (!href) { return; }

        if (window.parent !== window) {

            var elem = $(this);
            var message = {
                'event': 'loadiframe',
                'data': {
                    'url': href,
                    'title': (elem.attr('title') || elem.text().trim().split('\n')[0]),
                    'click': elem.data('click'),
                    'pageType': pageType 
                }
            };

            window.parent.postMessage(message, '*');
        }
        else {
            location.href = href;
        }

    }

    /**
     * build
     *
     */
    customElement.prototype.build = function () {
        var _element = this.element;

        $(_element).on('click', onClick.bind(_element));
    }
// =======
    // customElement.prototype.build = function () {
    //     var element = this.element;
    //     element.setAttribute('pageType', isNoCache() ? 2 : 1);

    //     var tagA = document.createElement('a');
    //     tagA.href = element.getAttribute('href');
    //     tagA.innerHTML = element.innerHTML;

    //     element.innerHTML = '';
    //     element.appendChild(tagA);

    //     util.css(tagA, {
    //         margin: 0,
    //         padding: 0
    //     });

    //     for (var index = 0; index < STYLE.length; index++) {
    //         var key = STYLE[index];
    //         var val = getCSSStyle(element, STYLE[index]);
    //         if (val && val !== '0px') {
    //             util.css(tagA, key, val);
    //             util.css(element, key, val);
    //         }
    //     }
    // };
// >>>>>>> Stashed changes

    return customElement;

});