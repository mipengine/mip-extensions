/**
 * @file mip-meishij
 * @author yangjun14(yangjun14@baidu.com)
 */

define(function (require) {
    var URL = 'http://m.meishij.net';
    var id = $('.addfav_box').data('id');

    //  工具方法
    function jsonpPost(url, data, cb) {
        return $.ajax({
            type: 'POST',
            data: data,
            url: url,
            dataType: 'jsonp',
            success: cb
        });
    }

    //  微博分享点击处理函数
    function initWeiboShare($el) {
        var config = {
            appkey: $el.data('appkey'),
            title: $el.data('title'),
            pic: $el.data('pic'),
            url: $el.data('url'),
            relateUid: $el.data('relate-uid')
        };
        var url = 'http://service.t.sina.com.cn/share/share.php?' + 'appkey=' + config.appkey + '&title=' + encodeURIComponent(config.title) + '&pic=' + config.pic + '&url=' + config.url + '&ralateUid=' + config.ralateUid;
        $el.click(function () {
            window.open(url);
        });
    }

    //  初始化QQ空间分享
    function initQQShare($el) {
        var config = {
            url: $el.data('url'),
            desc: $el.data('desc'),
            pics: $el.data('pics'),
            summary: $el.data('summary'),
            title: $el.data('title'),
            site: $el.data('site')
        };
        var query = 'url=' + encodeURIComponent(config.url);
        query = query + 'desc=' + encodeURIComponent(config.desc);
        query = query + 'pics=' + encodeURIComponent(config.pics);
        query = query + 'summary=' + encodeURIComponent(config.summary);
        query = query + 'title=' + encodeURIComponent(config.title);
        query = query + 'site=' + encodeURIComponent(config.site);
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + query;

        $el.click(function () {
            var tmpStr = 'height=330,width=550,top=' + (screen.height - 280) / 2;
            tmpStr = tmpStr + ',left=' + (screen.width - 550) / 2 + ', toolbar=no, menubar=no';
            tmpStr = tmpStr + ' scrollbars=no,resizable=yes,location=no, status=no';
            window.open(url, 'newQQwindow', tmpStr);
        });
    }

    //  初始化社会化分享
    function initShare($el) {
        var $weibo = $el.find('.weibo');
        var $qq = $el.find('.qq');

        initWeiboShare($weibo);
        initQQShare($qq);

        $el.find('#share_box_shutbtn').click(function () {
            $('#share_box').animate({
                bottom: '-210px'
            }, 300, function () {
                $('#blackbg').remove();
            });
        });

        $('#sharebtn_in_con').on('click', function () {
            var tmpStr = '<div style="height:100%;width:100%;position:fixed;left:0px;top:0px;';
            tmpStr = tmpStr + 'background:rgba(0,0,0,0.75);z-index:20000;" id="blackbg"></div>';
            $('body').append(tmpStr);
            $('#share_box').animate({
                bottom: '0px'
            }, 300);
        });
    }
    //  定时延迟
    function removeConTips1() {
        $('#con_tips1').remove();
    }
    //  添加操作
    function addFavTmp1() {
        jsonpPost(URL + '/ajax/do_user_caidans.php?id=' + id, function (data) {
            if (data !== '' && data !== 0) {
                jsonpPost(URL + '/ajax/add_nfav.php?obj_id=' + id, function (data) {
                    $('#addfavbtn_in_con img').attr('src", "images/rd_b_sc_h@3x.png');
                    $('#addfavbtn_in_con strong').css('color", "#ff4c35').html('已收藏');
                });
                $('#addfav_box #addfav_box_c2').html(data);
                $('#addfav_box').animate({
                    bottom: '0px'
                }, 300);
            }
            else if (data === 0) {
                location.href = '/login.php?redirect=' + encodeURIComponent(location.href);
            }
        });
    }

    //  添加到收藏
    function initFavorite() {
        $(document).on('click', '.addfav_box_c2_item', function () {
            if (!($(this).hasClass('current'))) {
                $(this).addClass('current');
            }
            else {
                $(this).removeClass('current');
            }
        });

        $('#addfav_box_b2').on('click', function () {
            var cdids = '';
            $.each($('.addfav_box_c2_item.current'), function () {
                cdids = cdids + $(this).attr('cdid') + ',';
            });
            if (cdids === '' && !$('#addfavbtn_in_con').hasClass('cbicon1_cur')) {
                $('#addfav_box_shutbtn').click();
            }
            else {
                jsonpPost(URL + '/ajax/do_user_caidans.php?id=' + id + '&act=modi&rids=' + cdids, function (data) {
                    if (data === 1) {
                        $('body').append('<div class="con_tips1" id="con_tips1">收藏成功</div>');
                        setTimeout(removeConTips1, 3000);
                        $('#addfav_box_shutbtn').trigger('click');
                    }
                    else {
                        $('body').append('<div class="con_tips1" id="con_tips1">取消收藏成功</div>');
                        setTimeout(removeConTips1, 3000);
                        $('#addfav_box_shutbtn').trigger('click');
                        $('#addfavbtn_in_con').removeClass('cbicon1_cur').addClass('cbicon1').html('收藏');
                    }
                });
            }
        });

        $('#addfavbtn_in_con').on('click', function () {
            var tmpStr = '<div style="height:100%;width:100%;position:fixed;left:0px;top:0px;';
            tmpStr = tmpStr + 'background:rgba(0,0,0,0.75);z-index:20000;" id="blackbg"></div>';
            $('body').append(tmpStr);
            $('#addfav_box').animate({
                bottom: '0px'
            }, 300, function () {});
        });
        $('#addfavbtn_in_con').on('click', function () {
            $('#addfav_box').show();
            $('#addnewcd_box').show();
            if (!$(this).hasClass('cbicon1_cur')) {
                addFavTmp1();
            }
            else {
                jsonpPost(URL + '/ajax/add_nfav.php?act=cancel&obj_id=' + id, function (data) {
                    $('body').append('<div class="con_tips1" id="con_tips1">取消收藏成功</div>');
                    setTimeout(removeConTips1, 3000);
                    $('#addfav_box_shutbtn').click();

                    $('#addfavbtn_in_con img').attr('src", "http://site.meishij.net/p2/20160307/20160307180334_918.png');
                    $('#addfavbtn_in_con strong').css('color", "#a5a5a5').html('收藏');
                });
            }
        });
        $('#addfav_box_shutbtn').on('click', function () {
            $('#addfav_box').animate({
                bottom: '-320px'
            }, 300, function () {
                $('#blackbg').remove();
            });
        });
    }


    //  初始化菜单
    function initMenu() {
        $('#addfav_box_b1').on('click', function () {
            $('#addnewcd_box').animate({
                top: '74px'
            }, 300);
        });

        $('#addnewcd_box_a1').on('click', function () {
            $('#addnewcd_box').animate({
                top: '-400px'
            }, 300, function () {});
        });
        $('#addnewcd_box_a2').on('click', function () {
            var t = $('#addnewcd_box_input').html();
            jsonpPost(URL + '/ajax/create_caidan.php?t=' + encodeURIComponent(t), function (data) {
                if (data !== '') {
                    $('#addfav_box_c2').prepend(data);
                    $('#addnewcd_box_a1').trigger('click');
                    $('#addnewcd_box_input').val('');
                }
                else {
                    alert('请重试～');
                }
            });
        });
        $('#addnewcd_box_input').focus(function () {
            var ThisT = $(this);
            var txt = ThisT.html();
            if (txt === '请输入菜单名称') {
                ThisT.html('');
                ThisT.css('color', '#333');
                $('#addnewcd_box_input').focus();
            }
        });
    }

    var customElem = require('customElement').create();

    customElem.prototype.build = function () {
        var $el = $(this.element);

        // DOM元素列表
        var $share = $el.find('.share_box');

        // 初始化各模块
        initShare($share);
        initFavorite();
        initMenu();
    };

    return customElem;
});
