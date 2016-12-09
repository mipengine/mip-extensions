/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 14:44
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var $ = require('zepto');

    var module = {};

    module.loadScript = function (url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    };

    module.set = function () {

        var $img = $('.FhwapContent mip-img[src^="http://sex."]');

        if (!$img.length) {
            return;
        }

        var docw = document.write;
        // 重写document.write方法
        document.write = function (node) {
            $img.after(node);
        };

        this.loadScript('http://1.feihua.com/au3a1ecf91ffc8f038db4c3e8da4f73ffa54acde0b36.js', function () {
            var timer = setTimeout(function () {
                document.write = docw;
                clearTimeout(timer);
            }, 100);
        });
    };

    return module;
});

