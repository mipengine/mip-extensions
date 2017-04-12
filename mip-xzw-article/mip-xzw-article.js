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
    var adata = [['aries','白羊','3.21-4.19','热情活力',2],['taurus','金牛','4.20-5.20','稳健固执',3],['gemini','双子','5.21-6.21','花心多变',4],['cancer','巨蟹','6.22-7.22','敏感柔情',5],['leo','狮子','7.23-8.22','骄傲威严',14],['virgo','处女','8.23-9.22','完美理性',15],['libra','天秤','9.23-10.23','公平和谐',16],['scorpio','天蝎','10.24-11.22','神秘敏锐',17],['sagittarius','射手','11.23-12.21','自由乐观',18],['capricorn','摩羯','12.22-1.19','执著现实',19],['aquarius','水瓶','1.20-2.18','自由博爱',20],['pisces','双鱼','2.19-3.20','浪漫梦幻',21]];
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
        $('title').text(adata[aid][1]);
        $.ajax({
            url: 'http://cache.xzw.com/mip/data.js',
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
            url: 'http://cache.xzw.com/mip/fortune/1/' + myDates() + '/' + getUrl('aid') + '.js',
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
