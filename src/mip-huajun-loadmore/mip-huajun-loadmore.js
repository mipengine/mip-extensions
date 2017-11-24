/**
 * @file loadmore component
 * @author 873920193@qq.com
 * @version 1.0
 * @copyright 2016 onlinedown.net, Inc. All Rights Reserved
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var page = 2;
    var options = {};
    function more(element, options) {
        var bd = $(element).find('.bd');
        var htmlStr = '';
        $.get(options.url, {page: page, scon: options.scon, sid: options.sid}, function (data) {
            if (window.parseInt(data.status) === 200) {
                $.each(data.content, function (key, val) {
                    htmlStr += '<dl class="cl">';
                    htmlStr += '<a href="http://m.onlinedown.net/soft/' + val.id + '.htm">';
                    htmlStr += '<dt class=""><mip-img src="http://src.onlinedown.net' + val.logo + '"></mip-img></dt>';
                    htmlStr += '<dd>';
                    htmlStr += '<ul class="cl">';
                    htmlStr += '<li><h2>' + val.title + '</h2></li>';
                    htmlStr += '<li><span>' + val.filesize + 'M</span>';
                    htmlStr += '<span class="pipe">/</span><span>' + val.language + '</span>';
                    htmlStr += '<span class="pipe">/</span><span>' + val.lastdotime + '</span></li>';
                    htmlStr += '<li><mip-img class="mip-xxstar" src="http://m.onlinedown.net/Public/img/xx-' + val.star + '.png"></mip-img></li>';
                    htmlStr += '</ul>';
                    htmlStr += '</dd>';
                    htmlStr += '<i class="icon-xiazai"></i>';
                    htmlStr += '</a>';
                    htmlStr += '</dl>';
                });
                bd.append(htmlStr);
                page = page + 1;
            }
            else if (window.parseInt(data.status) === 201) {
                $('.laypage_next').text('已经没有了');
            }
        });
    }
    customElem.prototype.build = function () {
        var element = this.element;
        options.url = element.getAttribute('url');
        options.scon = element.getAttribute('scon');
        options.sid = element.getAttribute('sid');
        $('.laypage_next').click(function () {
            more(element, options);
        });
    };
    return customElem;
});
