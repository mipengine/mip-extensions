/**
 * @file loadmore component
 * @author 873920193@qq.com
 * @version 1.0
 * @copyright 2016 onlinedown.net, Inc. All Rights Reserved
 */
define(function (require, options) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var page = 2;
    function more(element, options) {
        var bd = $(element).find('.bd');
        var htmlStr = '';
        $.get(options.url, {page: page}, function (data) {
            if (data.status === 200) {
                $.each(data.content, function (key, val) {
                    htmlStr += '<dl class="cl"><a href="http://m.onlinedown.net/soft/' + val.id + '.htm"><dt class=""><mip-img src="http://src.onlinedown.net' + val.logo + '"><mip-img></dt><dd><ul class="cl"><li><h2>' + val.title + '</h2></li><li><span>' + val.filesize + 'M</span><span class="pipe">/</span><span>' + val.language + '</span><span class="pipe">/</span><span>' + val.lastdotime + '</span></li><mip-img class="mip-xxstar" src="http://m.onlinedown.net/Public/img/xx-' + val.star + '.png"></mip-img></li></ul></dd><i class="icon-xiazai"></i></a></dl>';
                });
                bd.append(htmlStr);
                page = page + 1;
            }
            else if (data.status === 201) {
                $('.laypage_next').text('已经没有了');
            }
        });
    }
    customElem.prototype.build = function () {
        var element = this.element;
        options.url = $(element).attr('url');
        $('.laypage_next').click(function () {
            more(element, options);
        });
    };
    return customElem;
});
