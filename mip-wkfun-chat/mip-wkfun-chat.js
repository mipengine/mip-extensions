/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.03.17
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var loadJs = function (elem, url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $(elem).append(script);
        if (typeof callback !== 'function') {
            return false;
        } else {
            script.onload = function () {
                callback();
            };
        }
    };
    var chatFunction = function () {

        // 顶部搜索
        var itemInpDef = '帮您寻医问药';
        $('#item_so_keyword').on({
            focus: function () {
                if ($(this).val() === itemInpDef) {
                    $(this).val('');
                    $(this).css('color', '#666');
                }
            },
            blur: function () {
                if ($(this).val() === '') {
                    $(this).val(itemInpDef);
                    $(this).css('color', '#c6c6c6');
                }
            }
        });

        $('.item-hd-so-input-box').on('click', function () {
            $('.item-hd-so-area').addClass('item-hd-so-focus');
        });
        $('.item-hd-so-back').on('click', function () {
            $('.item-hd-so-area').removeClass('item-hd-so-focus');
            $('#item_so_keyword').val(itemInpDef).css('color', '#c6c6c6');
        });


        $('#item_hd_form').on('submit', function () {
            var textVal = $.trim($('#item_so_keyword').val());
            var  srcType = $('#item_so_keyword').attr('src_type');
            if (textVal === '帮您寻医问药') {
                textVal = '';
            } else {
                textVal = textVal;
            }
            $(this).attr('method', 'post').attr('action', 'http://m.so.xywy.com/comse.php?src=' + srcType + '&keyword=' + encodeURIComponent(textVal));
        });


        // 底部搜索
        $('#soform').on('submit', function () {
            var textValK = $.trim($('#keysd').val());
            if (textValK === '帮您寻医问药') {
                textValK = '';
            } else {
                textValK = textValK;
            }
            $(this).attr('method', 'post').attr('action', 'http://m.so.xywy.com/comse.php?src=3gclubso&keyword=' + encodeURIComponent(textValK));
        });

    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        loadJs(elem, 'http://static.js.xywy.com/ipad/js/iscroll.js', function () {
            // 计算中间区域
            var clientHeight = $(window).height();
            var boxHeight = clientHeight - 205;
            var botHeight = 85 + boxHeight + $('.chat-bot').height() - clientHeight - 5;
            $('.chat-box').height(boxHeight);
            $('.chat-bot').show();
            var myScroll = new IScroll('#AQbox', {click: true, mouseWheel: true});
            $(window).on({
                scroll: function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop >=  85 + boxHeight + $('.chat-bot').height() - clientHeight - 5) {
                        $('.updown').removeClass('up').addClass('down');
                    } else {
                        $('.updown').removeClass('down').addClass('up');
                    }
                }
            });
        });
        chatFunction();

    };
    return customElem;
});
