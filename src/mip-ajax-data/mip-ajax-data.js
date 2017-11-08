/**
 * @file mip-ajax-data 组件
 * @author Jobs Fan
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /** [bindEven 绑定事件]
     *
     * @param {Object} element [mip-ajax-data元素]
     * @param {Object} params [来自mip-ajax-data的属性]
     * @param {Booleans} once [是否只执行一次]
     */
    function bindEven(element, params, once) {
        if (params.action !== 'roll') {
            $(element).on(params.action, 'span', function () {
                if (once) {
                    var url = params.url;
                } else {
                    var url = params.url.replace('[markplaceholder]', $(element).attr('mip-ajax-mark'));
                }
                $.getJSON(url, function (result) {
                    $('.' + params.containerclass).append(result.html);
                    if (once || result.length < params.length) {
                        $(element).remove();
                    } else {
                        $(element).attr('mip-ajax-mark', result['mip-ajax-mark']);
                    }
                });
            });
        } else {
            var allow = true;
            $(window).bind('scroll', function () {
                if (typeof ($(element).get(0)) === 'undefined') {
                    return false;
                }
                if (allow && $(window).height() + window.pageYOffset >= $(element).offset().top) {
                    allow = false;
                    if (once) {
                        var url = params.url;
                    } else {
                        var url = params.url.replace('[markplaceholder]', $(element).attr('mip-ajax-mark'));
                    }
                    $.getJSON(url, function (result) {
                        $('.' + params.containerclass).append(result.html);
                        if (once || result.length < params.length) {
                            $(element).remove();
                        } else {
                            $(element).attr('mip-ajax-mark', result['mip-ajax-mark']);
                            allow = true;
                        }
                    });
                }
            });
        }
    }

    /** [构造元素，只会运行一次]
     *
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = this.element;
        var params = JSON.parse($(element).attr('mip-ajax-params').replace(/'/g, '"'));
        bindEven(element, params, typeof ($(element).attr('mip-ajax-mark')) === 'undefined');
    };

    return customElement;
});
