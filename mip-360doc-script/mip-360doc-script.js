/**
 * @file 360doc 自定义逻辑组件
 * @author www.360doc.com技术部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        if ($('.mip-360doc-script-wxggalink') !== null) {
            $('.mip-360doc-script-wxggalink').html('<span class=\'mip-360doc-script-pic\'><img src=\'https://pubimage.360doc.com/transfer/images/zhaishou2.png\' class=\'pic2\'/></span><span class=\'mip-360doc-script-pic\'><img src=\'https://pubimage.360doc.com/transfer/images/xiazai2.png\'  class=\'pic2\'/></span>');
            var picn = $('.mip-360doc-script-pic').length;
            if (picn > 1) {
                $('.mip-360doc-script-pic').eq(0).css('display', 'inline').siblings('.mip-360doc-script-pic').hide();
            }
            $('.mip-360doc-script-box960').css('display', '');
            setone();
        }
        getRefNum();// 鲜花
        //  统计
        record();
        //  检测广告
        var t = setTimeout(function () {
            check();
            clearTimeout(t);
        }, 10000);
        if ($('.mip-360doc-script-plg2') !== null) {
            $('.mip-360doc-script-plg2').on('click', function (event) {
                sendlog('Componentclick?id=1');
            });
        }
        if ($('.mip-360doc-script-p_header_sc') !== null) {
            $('.mip-360doc-script-p_header_sc').on('click', function (event) {
                sendlog('Componentclick?id=2');
            });
        }
        if ($('.mip-360doc-scropt-plzs') !== null) {
            $('.mip-360doc-scropt-plzs').on('click', function (event) {
                sendlog('Componentclick?id=4');
            });
        }
        if ($('.mip-360doc-script-gz1') !== null) {
            $('.mip-360doc-script-gz1').on('click', function (event) {
                sendlog('Componentclick?id=5');
            });
        }
        if ($('.mip-360doc-script-xh1') !== null) {
            $('.mip-360doc-script-xh1').on('click', function (event) {
                sendlog('Componentclick?id=6');
            });
        }
        if ($('.mip-360doc-script-reflectionurl') !== null) {
            $('.mip-360doc-script-reflectionurl').on('click', function (event) {
                sendlog('Componentclick?id=7');
            });
        }
        if ($('.mip-360doc-script-p_footer_sc') !== null) {
            $('.mip-360doc-script-p_footer_sc').on('click', function (event) {
                sendlog('Componentclick?id=8');
            });
        }
        getBlockArt();
        if ($('.mip-360doc-script-keyword') !== null) {
            parseSearchWord();
        }
    };
    function check() {
        var deny1 = true;
        var deny2 = true;
        var node;
        if ($('.like_content') && $('.like_content').eq(0)) {
            node = document.getElementsByClassName('like_content')[0];
            if (node.getElementsByTagName('iframe') && node.getElementsByTagName('iframe')[0]
            && node.getElementsByTagName('iframe')[0].src
            && (node.getElementsByTagName('iframe')[0].src.indexOf('baidu.com') > 0
                || node.getElementsByTagName('iframe')[0].src.indexOf('360doc.cn') > 0)) {
                deny1 = false;
            }
        }

        if ($('.like_content') && $('.like_content').eq(1)) {
            node = document.getElementsByClassName('like_content')[1];
            if (node.getElementsByTagName('iframe') && node.getElementsByTagName('iframe')[0]
            && node.getElementsByTagName('iframe')[0].src
            && (node.getElementsByTagName('iframe')[0].src.indexOf('baidu.com') > 0
                || node.getElementsByTagName('iframe')[0].src.indexOf('360doc.cn') > 0)) {
                deny2 = false;
            }
        }
        if (deny1) {
            sendlog('mipads/iframe_likecontent');
        }
        if (deny2) {
            sendlog('mipads/iframe_service');
        }
    }
    function record() {
        try {
            var domain = document.domain;
            sendlog('mipConn?domain=_' + encodeURI(domain) + '_&aid=' + getID());
        }
        catch (e) { }
    }
    function sendlog(url) {
        var img = new Image();
        var key = 'broswerlog_' + Math.floor(Math.random() * 2147483648).toString(36);
        window[key] = img;
        img.onload = img.onerror = img.onabort = function () {
            img.onload = img.onerror = img.onabort = null;
            window[key] = null;
            img = null;
        };
        img.src = 'https://mipeclick.360doc.com/' + url;
    }
    //  广告轮播
    function setone() {
        var t = setTimeout(function () {
            show(1);
            clearTimeout(t);
            settwo();
        }, 3000);
    }
    //  广告轮播
    function settwo() {
        var t = setTimeout(function () {
            show(0);
            clearTimeout(t);
            setone();
        }, 4000);
    }
    function show(index) {
        $('.mip-360doc-script-pic').eq(index).css('display', 'inline')
        .siblings('.mip-360doc-script-pic').css('display', 'none');
    }
    //  获取评论数
    function getRefNum() {
        var artid = getID();
        if (artid === '') {
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'https://transfer.360doc.cn/ajax/Handler.ashx',
            data: 'id=' + artid,
            success: function (data) {
                var useridref = data.split('|');
                if (useridref[1] !== null && useridref[1] !== '') {
                    $('.mip-360doc-script-refnum').html(useridref[1]);
                }
                else {
                    $('.mip-360doc-script-refnum').html('0');
                }
                $('.mip-360doc-script-xh1').html('献花(' + useridref[3] + ')');
            },
            error: function () { }
        });
    }
    //  不显示已被删除的文章
    function getBlockArt() {
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp('https://blockart.360doc.com/ajax/getstatusmip.ashx?aid=' + getID(), {
            jsonpCallback: 'callback'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.result === 1) {
                $('.mip-360doc-script-tit').html('');
                $('.mip-360doc-script-con').html('对不起，该文章已被删除！');
            }
        });
    }
    //  获取文章id
    function getID() {
        var artid = $('.mip-360doc-script-saveid').html();
        return artid;
    }
    //  获取搜索词
    function parseSearchWord() {
        try {
            var url = '';
            var keyword = '';
            var index = -1;
            var index2 = -1;
            if (document.referrer) {
                url = document.referrer;
            }
            if (url.length > 0 && url.indexOf('//m.baidu.com') >= 0) {
                index = url.indexOf('word=');
                if (index > 0) {
                    index2 = url.indexOf('&', index);
                }
                if (index2 > 0) {
                    keyword = url.substring(index + 5, index2);
                    if (keyword.length > 0) {
                        $('.mip-360doc-script-keyword').val(decodeURI(keyword));
                    }
                }
            }
        }
        catch (e) { }
    }
    return customElem; 
});
