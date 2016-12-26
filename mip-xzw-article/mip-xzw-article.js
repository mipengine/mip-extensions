/**
* 星座屋mip改造 javascript功能插件
* @file 页面主要内容改造
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var isShowStar = false;
    var customElem = require('customElement').create();
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
            url: 'http://m.xzw.com/fortune/ajax/back/' + myDates() + '/' + getUrl('aid') + '/' + getUrl('aid') + '.html',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'call_fortune',
            success: function (data) {
                $('.fortune em em').width(data.s);
                $('.fortune p a').html(data.v);
            },
            timeout: 3000
        });
       // 获取url参数
        function getUrl(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
       // 获取时间
        function myDates() {
            var date = new Date();
            var s = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
            return s;
        }
    };
    return customElem;
});
