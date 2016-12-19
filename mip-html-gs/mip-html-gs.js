/**
 * @author: Qi
 * @date: 2016-12-19
 * @file: mip-html-gs.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var qi = require('zepto');

	// 获取操作系统
    function getOs() {
        var isOs = 0;
        var osUA = navigator.userAgent.toLowerCase();
        if (osUA.indexOf('android') > -1) {
            isOs = 1;
        }
        else if (osUA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)) {
            isOs = 2;
        }
        return isOs;
    }

	// 获取数据
    function getJsonData(url, data, obj) {
        data.os = getOs();
        data.ly = document.referrer;
        data.ua = navigator.userAgent;
        data.url = window.location.href;
        qi.ajax({
            url: url,
            type: 'get',
            data: data,
            dataType: 'jsonp',
            error: function () {
                console.log('Mip-Html-Gs', 'Ajax Err');
            },
            success: function (jsondb) {
                if (jsondb.state.code !== 2000000) {
                    console.log('Mip-Html-Gs', jsondb.state.msg);
                    return false;
                }
                if (typeof (jsondb.data) === 'undefined') {
                    return false;
                }
                var ptDownUrl = qi('.topdown a').attr('href');
                var downHtml = [
                    '<div class="mip-html-gs"><div class="gs-top"><div class="gs-btn">',
                    '<em class="gs-ck"></em>' + jsondb.info.downname + '<i></i></div>',
                    '<a href="' + jsondb.data.downloadUrl + '" class="gs-ds gsurl">',
                    jsondb.info.namea + '</a>',
                    '<a href="' + ptDownUrl + '" class="gs-ds pturl" style="display:none;">',
                    jsondb.info.nameb + '</a>',
                    '</div><div class="gs-tip"><em class="gs-ioc"></em>',
                    '<span>' + jsondb.info.texta + '</span>',
                    '<span style="display:none;">' + jsondb.info.textb + '</span>',
                    '</div></div>'
				];
                qi('.topdown a').hide();
                qi('#appBox').append(downHtml.join(''));
                qi('#appBox').on('click', '.mip-html-gs .gs-btn', function () {
                    if (qi('.mip-html-gs').hasClass('gs-down')) {
                        qi('.topdown a').hide();
                        qi('.mip-html-gs').removeClass('gs-down');
                        qi('.mip-html-gs .gs-ds').hide().eq(0).show();
                        qi('.mip-html-gs .gs-tip span').hide().eq(0).show();
                    }
					else {
                        qi('.mip-html-gs').addClass('gs-down');
                        if (qi('.topdown a').length > 1) {
                            qi('.topdown a').show();
                            qi('.mip-html-gs .gs-ds').hide();
                        }
                        else {
                            qi('.mip-html-gs .gs-ds').hide().eq(1).show();
                        }
                        qi('.mip-html-gs .gs-tip span').hide().eq(1).show();
                    }
                });
                qi('#appBox').on('click', '.mip-html-gs .gsurl', function () {
                    var theObj = qi(this);
                    qi('.mip-html-gs .gs-btn').click();
                    if (jsondb.info.tjurl !== '') {
                        var tjSrc = typeof (jsondb.info.tjsrc) === 'undefined' ? 'MIPGSDOWN' : jsondb.info.tjsrc;
                        qi.ajax({
                            url: jsondb.info.tjurl,
                            type: 'GET',
                            dataType: 'jsonp',
                            data: {
                                url: theObj.attr('href'),
                                surl: window.location.href,
                                src: tjSrc
                            }
                        });
                    }
                });
            }
        });
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var thisObj = this.element;
        var theElem = qi(thisObj);
        var elemUrl = theElem.attr('Qi-url') || '';
        var elemArr = theElem.attr('Qi-arr') || '';
        if (elemUrl === '' && elemArr === '') {
            console.log('Mip-Html-Gs', 'Config Err');
            return false;
        }
        try {
            var data = JSON.parse(elemArr);
        }
        catch (e) {
            console.log('Mip-Html-Gs', 'Array Err');
            return false;
        }
        getJsonData(elemUrl, data, theElem);
    };
    return customElem;
});
