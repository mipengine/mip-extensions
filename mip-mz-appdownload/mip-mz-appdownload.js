/**
 * @file mip-mz-appdownload 木子的app下载切换效果
 * @author pifire
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var localhref = 'http://m.muzisoft.com/mz/';
    function initAD(ad, aid, addr, obj) {
        if (platform.isIos()) {
            var softid = aid.substring(0, aid.length - 5);
            if (inarray(obj.vnpids, softid)) {
                return '<a href="' + obj.ios[1].url + '" class="gsdbtn">' + obj.ios[0].btnvalue + '</a>';
            }
            return '<a href="' + checkurl(aid, addr) + '" class="gsdbtn" id="confirmios">'
            + obj.ios[0].btnvalue + '</a>';
        }
        if (ad > 0) {
            $('#down').css('height', '90px');
            var presenti = 0;
            for (var i = 0; i < obj.android.length; ++i) {
                if (!getCookie(obj.android[i].id)) {
                    presenti = i;
                    break;
                }
            }
            return '<input type="checkbox" id="ckb" checked="checked">'
			+ '<span>' + obj.android[presenti].name + '</span>'
            + '<a href="' + obj.android[presenti].url + '" id="gsdbtn" presentid="'
            + obj.android[presenti].id + '" class="gsdbtn">' + obj.android[presenti].btnvalue + '</a>'
            + '<p id="yybtext">' + obj.android[presenti].info + '</p>';
        }
        return '<a href="' + checkurl(aid, addr) + '" class="gsdbtn">' + obj.android[0].ubtnvalue + '</a>';
    }
	// 判断url下载还是id下载
    function checkurl(aid, addr) {
        return (addr.length === 0) ? localhref + aid : addr;
    }
	// 点击按钮切换下载
    function changeDown(aid, addr, androidAD) {
        var chk = $('#ckb');
        var yybtext = $('#yybtext');
        var gsdbtn = $('#gsdbtn');
        var presenti = 0;
        for (var i = 0; i < androidAD.length; ++i) {
            if (!getCookie(androidAD[i].id)) {
                presenti = i;
                break;
            }
        }
        if (chk.is(':checked')) {
            yybtext.css('color', 'black');
            gsdbtn.attr('href', androidAD[presenti].url);
            gsdbtn.text(androidAD[presenti].btnvalue);
            yybtext.html(androidAD[presenti].info);
        }
        else {
            yybtext.css('color', 'red');
            gsdbtn.attr('href', checkurl(aid, addr));
            gsdbtn.text(androidAD[presenti].ubtnvalue);
            yybtext.html(androidAD[presenti].uinfo);
        }
    }
	// 设置cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=' + cvalue + ';expires=' + expires;
    }
    // 获取cookie
    function getCookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length);
            }
        }
    }
	// 数组中是否包含
    function inarray(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var $element = $(element);
        var ad = $element.attr('ad');
        var aid = $element.attr('aid');
        var addr = $element.attr('addr');
        $.ajax({
            method: 'get',
            url: 'https://m.muzisoft.com/mipappdown.json',
            dataType: 'json',
            success: function (data) {
                var innerHTML = initAD(ad, aid, addr, data);
                $('#down ul li').append(innerHTML);
                $('#ckb').click(function () {
                    changeDown(aid, addr, data.android);
                });
				// 安卓点击了高速按钮，写cookie
                $('#gsdbtn').click(function () {
                    for (var i = 0; i < data.android.length; ++i) {
                        var j = (i === data.android.length - 1) ? 0 : i + 1;
                        if ($('#gsdbtn').attr('presentid') === data.android[i].id) {
                            setCookie(data.android[j].id, '', 1);
                        }
						else {
                            setCookie(data.android[j].id, 1, 1);
                        }
                    }
                });
				// 苹果点击了下载
                $('#confirmios').click(function () {
                    if (confirm(data.ios[0].name)) {
                        window.location.href = data.ios[0].url;
                        return false;
                    }
                });
            },
            error: function () {}
        });
    };
    return customElement;
});
