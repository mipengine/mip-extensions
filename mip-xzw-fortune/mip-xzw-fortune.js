/**
* 星座屋mip改造 
* @file 运势页面
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var isShowStar = false;
    var starData;
    var customElem = require('customElement').create();
    var adata = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
    customElem.prototype.build = function () {
        var starBox = $('.xz_select');
        var starbg = $('.bg_black');
        resize();
        window.onresize = function () {
            resize();
        };
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
        $('title').text(adata[aid]);
        $('.astro mip-img').attr('src', 'http://m.xzw.com/static/images/xz_img/xz_' + aid + '.png');
        $('.astro mip-img img').attr('src', 'http://m.xzw.com/static/images/xz_img/xz_' + aid + '.png');
        $('.astro em').html(adata[aid - 1] + '<i></i>');
        var forUrl = $('.wrapper').data('url');
        var nUrl = forUrl.replace('[date]', myDates()).replace('[aid]', aid);
        $.ajax({
            url: nUrl,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'call_fortune',
            success: function (data) {
                starData = data.data;
                getFortuneHtml(starData[0]);
            },
            timeout: 3000
        });
       // 更换星座
        $(document).on('click', '.xz_select li', function (e) {
            var i = $(this).index() + 1;
            changeStar(i);
        });

       // 范围选择
        $(document).on('click', '.date_tab li', function (e) {
            var i = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            getFortuneHtml(starData[i]);
        });

       // 改变星座
        function changeStar(index) {
            window.location.href = urlUpdateParams(window.location.href, 'aid', index);
        }

        // 设置HTML跟节点字号
        function resize() {
            var html = document.getElementsByTagName('html')[0];
            var hW = html.offsetWidth > 640 ? 640 : html.offsetWidth;
            var rem = hW / 10;
            html.style.fontSize = rem + 'px';
        }
       // 拼接数据
        function getFortuneHtml(list) {
            var index = list.index;
            var content = list.content;
            var str1 = '';
            var str2 = '';
            for (var i = 0; i < index.length; i++) {
                if (!index[i].value) {
                    str1 += '<span class="layer">' + index[i].title + '：<em class="m_star_1">';
                    str1 += '<em style="width:' + (18 * index[i].star) + 'px;"></em></em></span>';
                }
                else {
                    str1 += '<span class="layer">' + index[i].title + '：<i>' + index[i].value + '</i></span>';
                }
            }
            for (var j = 0; j < content.length; j++) {
                str2 += '<h2>' + content[j].title + '</h2><p>' + content[j].value + '</p>';
            }
            $('.index').html(str1);
            $('.cont').html(str2);
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
