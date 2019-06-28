/**
 * @file mip-mm-ping-btn 组件
 * @author jxintang@gmail.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        const baseUrl = 'https://ping.mm.taou.com/maimai/';
        var element = this.element;
        element.addEventListener('click', function () {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            var query = getQueryString();
            var keywordid = 'sem_baidu'; // 默认值
            var url = window.location.pathname;
            var urlsplit = url.split("/").slice(-1)[0];
            if (query.regfr) {
                var arry = query.regfr.split('_');
                if (arry.length) {
                    keywordid = arry[arry.length - 1];
                }
            }

            var url = window.location.pathname;
            var urlsplit = url.split("/").slice(-1)[0];
            pingback(baseUrl + urlsplit + '?event=download');

            // 判断android还是ios
            if (/iPad|iPhone|iPod/g.test(userAgent)) {
                window.location = `https://app.appsflyer.com/id718659370?af_prt=wushuang&pid=baidusearch_int&c=abtest&af_adset=city&af_ad=${keywordid}&af_click_lookback=7d`;
            } else if (/android/i.test(userAgent)) {
                window.location = `https://app.appsflyer.com/com.taou.maimai-default?af_prt=wushuang&pid=baidusearch_int&af_r=http://maimai.cn/dlc?c=Organic&c=abtest&af_adset=city&af_ad=${keywordid}&af_click_lookback=7d`
            }
        });
    };

    /**
     * 打点功能
     * @param {String} url 打点的url
     * @param {Function} callback 打点后的回调地址
     */
    function pingback(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback && callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    /**
     * 解析页面的url(以对象结构进行返回)
     */
    function getQueryString () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    };

    return customElement;
});
