/**
* 星座屋mip改造 javascript功能插件
* @file 页面主要内容改造
* @author mipxzw@163.com
* @version 1.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var isShowStar = false;
    var customElem = require('customElement').create();
    var adata = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
    customElem.prototype.build = function () {
        var starBox = $('.xz_select');
        var starbg = $('.bg_black');
        // 控制弹层开启
        $(document).on('click', '.chos_btn', function (event) {
            event = event || window.event;
            event.stopPropagation();
            if (isShowStar) {
                starBox.hide();
                starbg.hide();
                isShowStar = false;
            }
            else {
                starBox.show();
                starbg.show();
                isShowStar = true;
            }
        });
        // 关闭弹框
        $(document).on('click', '.bg_black', function (e) {
            starBox.hide();
            starbg.hide();
        });
        // 根据请求更换不同星座数据
        var aid = getUrl('aid');
        if (!aid) {
            aid = 1;
        }
        aid = aid - 1;
        $('title').text(adata[aid]);
        $.ajax({
            url: 'https://cache.xzw.com/mip/data.js',
            dataType: 'jsonp',
            data: {'id': aid},
            jsonp: 'callback',
            jsonpCallback: 'call_data',
            success: function (data) {
                var starData = data.data;
                var items = starData[aid];
                $('.top_part').html(items.toppart);
                $('.peidui').html(items.peidui);
                $('.libox').html(items.bottompart);
            },
            timeout: 3000
        });
       // 获取今日运势内容
        $.ajax({
            url: 'https://cache.xzw.com/mip/fortune/1/' + myDates() + '/' + getUrl('aid') + '.js',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'call_fortune',
            success: function (data) {
                $('.fortune em em').width(data.data.s);
                $('.fortune p a').html(data.data.v);
            },
            timeout: 3000
        });
       // 更换星座
        $(document).on('click', '.xz_select li', function (e) {
            var i = $(this).index() + 1;
            changeStar(i);
        });

        // 运势详情
        $(document).on('click', '.fortune a', function (e) {
            window.location.href = 'fortune.html?aid=' + (aid+1) + '';
        });

       // 改变星座
        function changeStar(index) {
            window.location.href = urlUpdateParams(window.location.href, 'aid', index);
        }

       // 获取url参数
        function getUrl(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }

       // 改变url参数
        function urlUpdateParams(url, name, value) {
            var r = url;
            if (r !== null && r !== 'undefined' && r !== '') {
                value = encodeURIComponent(value);
                var reg = new RegExp('(^|)' + name + '=([^&]*)(|$)');
                var tmp = name + '=' + value;
                if (url.match(reg) !== null) {
                    r = url.replace(evil(reg), tmp);
                }
                else {
                    if (url.match('[\?]')) {
                        r = url + '&' + tmp;
                    }
                    else {
                        r = url + '?' + tmp;
                    }
                }
            }
            return r;
        }

       // 获取时间
        function myDates() {
            var date = new Date();
            var s = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
            return s;
        }
       // 转换对象
        function evil(fn) {
            var Fn = Function;
            return new Fn('return ' + fn)();
        }
    };
    return customElem;
});
