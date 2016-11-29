/**
* 学优网mip改造 javascript功能插件
* @file 脚本支持
* @author myoa@163.com
* @time 2016.11.18
* @version 1.1.3
*/
define(function (require) {
    var $ = require('zepto');
    var dbshow = false;
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var el = this.element;
        var docId = el.getAttribute('id');
        var code = el.getAttribute('token');
        // 以self方式重置a标签
        $('.openself').attr('target', '_self');
        // 查看更多按钮功能
        var btnMax = $('#btnToMax');
        var artbox = $('#artbox');
        var relHeight = artbox.height();
        if (relHeight < 800) {
            maxpage();
        }
        var timeOutEvent = 0;
        btnMax.on({
            click: function (e) {
                maxpage();
            },
            touchstart: function (e) {
                timeOutEvent = setTimeout(function () {
                    timeOutEvent = 0;
                    maxpage();
                }, 500);
                e.preventDefault();
            },
            touchmove: function () {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            },
            touchend: function () {
                clearTimeout(timeOutEvent);
                if (timeOutEvent !== 0) {
                    maxpage();
                }
                return false;
            }
        });
        function maxpage() {
            dbshow || opendubao();
            artbox.removeClass('minbox');
            btnMax.parent().remove();
        }
        // 广告控制
        var admnum = 2;
        var admtopInit = getCookie('admtop');
        var admbottomInit = getCookie('admbottom');
        var admtop = $('#mip-adm-top');
        var admbottom = $('#mip-adm-bottom');
        if (admtopInit === 'close') {
            // 头部广告单元以嵌入方式加载
            admnum--;
            admtop.removeClass('hide');
            admtop.removeClass('fix');
            dbshow || opendubao();
        }
        else {
            var body = $('body');
            body.on('touchmove', function () {
                var gt = getScrollTop();
                if (gt > 100) {
                    admtop.removeClass('hide');
                    admtop.addClass('fix');
                }
                if (gt < -50) {
                    admtop.removeClass('fix');
                }
            });
        }
        if (admbottomInit === 'close') {
            admnum--;
            admbottom.removeClass('fix');
        }
        if (admnum > 0) {
            var admbtn = $('.btnclose');
            admbtn.on('click', function () {
                if ($(this).parent().attr('id') === 'mip-adm-top') {
                    setCookie('admtop', 'close');
                    admtop.remove();
                }
                else {
                    setCookie('admbottom', 'close');
                    admbottom.removeClass('fix');
                }
                dbshow || opendubao();
            });
        }
        // 统计系统
        var readed = getCookie('readed_' + docId);
        var dtp = 'wenku';
        if (parseInt(docId, 10) < 356835) {
            dtp = 'fanwen';
        }
        if (readed !== 'false') {
            $.getJSON('http://www.wangshengbo.cn/api/' + dtp + '/hits/?id=' + docId + '&code=' + code + '&jsoncallback=?',
                function (rda) {
                    setCookie('readed_' + docId, 'false');
                }
            );
        }
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }
        function setCookie(name, value) {
            var Days = .5;
            // 12个小时过期
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
        }
        function opendubao() {
            return true;
        }
        function getScript(url, callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        function getCookie(cnm) {
            if (document.cookie.length > 0) {
                var cstart = document.cookie.indexOf(cnm + '=');
                if (cstart !== -1) {
                    cstart = cstart + cnm.length + 1;
                    var cend = document.cookie.indexOf(';', cstart);
                    if (cend === -1) {
                        cend = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(cstart, cend));
                }
            }
            return '';
        }
    };
    return customElem;
});
