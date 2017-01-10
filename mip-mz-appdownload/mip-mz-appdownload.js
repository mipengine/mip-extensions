/**
 * @file mip-mz-appdownload 木子的app下载切换效果
 * @author pifire
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var localhref = 'http://m.muzisoft.com/mz/';
    function initAD(ad, aid, addr, obj) {
        if (platform.isIos()) {
            var softid = aid.substring(0, aid.length - 5);
            if (obj.ios[1].url !== '' && inarray(obj.vnpids, softid)) {
                return '<a href="' + obj.ios[1].url + '" class="gsdbtn">' + obj.ios[0].btnvalue + '</a>';
            }
            return '<a href="' + checkurl(aid, addr) + '" class="gsdbtn confirmios">'
            + obj.ios[0].btnvalue + '</a>';
        }
        if (ad > 0) {
            if (obj.android.length > 0) {
                $('.down').css('height', '90px');
                var presenti = 0;
                for (var i = 0; i < obj.android.length; ++i) {
                    if (!localStorage.getItem(obj.android[i].id)) {
                        presenti = i;
                        break;
                    }
                }
                return '<input type="checkbox" id="ckb" class="ckb" checked="checked">'
				+ '<span>' + obj.android[presenti].name + '</span>'
				+ '<a href="' + obj.android[presenti].url + '" id="gsdbtn" presentid="'
				+ obj.android[presenti].id + '" class="gsdbtn">' + obj.android[presenti].btnvalue + '</a>'
				+ '<p id="yybtext" class="yybtext">' + obj.android[presenti].info + '</p>';
            }
        }
        return '<a href="' + checkurl(aid, addr) + '" class="gsdbtn">本地下载</a>';
    }
	// 判断url下载还是id下载
    function checkurl(aid, addr) {
        return (addr.length === 0) ? localhref + aid : addr;
    }
	// 点击按钮切换下载
    function changeDown(aid, addr, androidAD) {
        var chk = document.getElementById('ckb');
        var yybtext = $('.yybtext');
        var gsdbtn = document.getElementById('gsdbtn');
        var presenti = 0;
        for (var i = 0; i < androidAD.length; ++i) {
            if (!localStorage.getItem(androidAD[i].id)) {
                presenti = i;
                break;
            }
        }
        if (chk.checked) {
            yybtext.css('color', 'black');
            document.querySelector('#down span').innerText = androidAD[presenti].name;
            gsdbtn.setAttribute('href', androidAD[presenti].url);
            gsdbtn.innerText = androidAD[presenti].btnvalue;
            yybtext.innerText = androidAD[presenti].info;
        }
        else {
            yybtext.css('color', 'red');
            document.querySelector('#down span').innerText = androidAD[presenti].name;
            gsdbtn.setAttribute('href', checkurl(aid, addr));
            gsdbtn.innerText = androidAD[presenti].ubtnvalue;
            yybtext.innerText = androidAD[presenti].uinfo;
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
     *  createdCallback
     */
    customElement.prototype.createdCallback = function () {
        var element = this.element;
        var $element = $(element);
        var ad = $element.attr('ad');
        var aid = $element.attr('aid');
        var addr = $element.attr('addr');
        var ajaxurl = $element.attr('ajaxurl');
        function callback(json) {
            var innerHTML = initAD(ad, aid, addr, json);
            $('.down ul li').append(innerHTML);
            $('.ckb').click(function () {
                changeDown(aid, addr, json.android);
            });
			// 安卓点击了高速按钮，写cookie
            $('.gsdbtn').click(function () {
                if (json.android.length > 0) {
                    for (var i = 0; i < json.android.length; ++i) {
                        var j = (i === json.android.length - 1) ? 0 : i + 1;
                        if ($('.gsdbtn').attr('presentid') === json.android[i].id) {
                            localStorage.removeItem(json.android[j].id);
                        }
                        else {
                            localStorage.setItem(json.android[j].id, 1);
                        }
                    }
                }
            });
			// 苹果点击了下载
            $('.confirmios').click(function () {
                if (json.ios[0].url !== '') {
                    if (confirm(json.ios[0].name)) {
                        window.location.href = json.ios[0].url;
                        return false;
                    }
                }
            });
        }
        fetchJsonp(ajaxurl, {
            timeout: 3000,
            jsonpCallback: 'ck'
        }).then(function (response) {
            return response.json();
        }).then(callback);
    };
    return customElement;
});
