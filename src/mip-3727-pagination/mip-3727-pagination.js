/**
* page switch
* @file Analog paging
* @author wztgzn@126.com
* @version 1.0
* @copyright 2016 yiaiddd, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function htmlpage() {
        var $span = $('.ub_page');
        $span.on('click', 'span', function () {
            var $void = $(this).attr('data-void');
            if ($void === '1') {
                var html = '';
                var $page = $(this).attr('data-page');
                var page = parseInt($page, 0);
                var len = $('.list_content').length;
                html = createpage(page, len, html);
                $('.ub_page').html(html);
                $('.list_content').eq(($page - 1)).addClass('mip_show').siblings().removeClass('mip_show');
            }
        });
    }
    function createpage(page, len, html) {
        if (page === 1) {
            html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"0\">';
            html += '上一页</span>';
        }
        else {
            html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"1\"';
            html += ' data-page=\"' + (page - 1) + '\">上一页</span>';
        }
        html = createmiddlepage(page, len, html);
        if (page === len) {
            html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"0\">';
            html += '下一页</span>';
        }
        else {
            html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"1\" ';
            html += 'data-page=\"' + (page + 1) + '\">下一页</span>';
        }
        return html;
    }
    function createmiddlepage(page, len, html) {
        var begin;
        var end;
        if (len < 5) {
            begin = 1;
            end = len;
            for (var i = begin; i <= end; i++) {
                if (i === page) {
                    html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"0\">';
                    html += i + '</span>';
                }
                else {
                    html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"1\" ';
                    html += 'data-page=\"' + i + '\"> ' + i + ' </span>';
                }
            }
        }
        else {
            if (page + 2 > len) {
                begin = len - 5;
                end = len;
                for (var j = begin; j <= end; j++) {
                    if (j === page) {
                        html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"0\">';
                        html += j + '</span>';
                    }
                    else {
                        html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"1\" ';
                        html += ' data-page=\"' + j + '\">' + j + '</span>';
                    }
                }
            }
            else if (page - 2 <= 0) {
                begin = 1;
                end = 5;
                for (var k = begin; k <= end; k++) {
                    if (k === page) {
                        html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"0\">';
                        html += k + '</span>';
                    }
                    else {
                        html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"1\" ';
                        html += ' data-page=\"' + k + '\">' + k + '</span>';
                    }
                }
            }
            else {
                begin = page - 2;
                end = page + 2;
                for (var g = begin; g <= end; g++) {
                    if (g === page) {
                        html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"0\">';
                        html += g + '</span>';
                    }
                    else {
                        html += '<span class=\"ub ub-f1 ub-pc uinn numBtn umar-l umar-r\" data-void=\"1\" ';
                        html += 'data-page=\"' + g + '\">' + g + '</span>';
                    }
                }
            }
        }
        return html;
    }
    customElem.prototype.firstInviewCallback = function () {
        htmlpage();
    };
    return customElem;
});
