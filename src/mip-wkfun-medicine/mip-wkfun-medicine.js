/**
* 寻医问药mip改造 药品网功能组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.12.05
* @version 1.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // 药品顶部收缩菜单
    $('#menuShow').on('click', function () {
        var height = $(document).height();
        var height1 = $('.site-navigation').height();
        var node = $('<div id="menuMask" class="mask-layer" style="height:' + height + 'px;"></div>');
        $('body').append(node);
        $('.mask').animate({
            translate3D: '0, 0, 0'
        }, 200);
        $('#menuMask').on('click', function () {
            $(this).remove();
            $('.mask').animate({
                translate3D: '0,' + -height1 + 'px, 0'
            }, 200);
        });
        $('.mask-close').on('click', function () {
            $('#menuMask').trigger('click');
        });
        $('.site-navigation a').on('click', function (e) {
            e.preventDefault();
            $('#menuMask').remove();
            $('.mask').animate({
                translate3D: '0,' + -height1 + 'px, 0'
            }, 0);
            location.href = $(this).attr('href');
        });
    });
    function sendDrug(productId) {
        $.ajax({
            url: 'http://3g.yao.xywy.com/goods/getpharmacy.htm',
            data: {uuidProduct: productId},
            dataType: 'jsonp',
            jsonpCallback: 'returnMsg',
            success: function (data) {
                if (data.code === 1) {
                    var tagLi = $('ul.p-tip li').eq(1);
                    var tagA = tagLi.children('a');
                    tagA.removeAttr('tjhref');
                    tagA.removeAttr('onclick');
                    tagA.attr('href', 'http://3g.yao.xywy.com/goods/dispatchorder/id/' + productId + '.htm');
                    tagA.html('<span class="sprite-icon1"></span>极速送药');
                }
            }
        });
    }
	// 错误提示
    function showErrorMessage(a, b, c) {
        if (!arguments[1]) {
            b = 300;
        }
        if (!arguments[2]) {
            c = 0;
        }
        $('body').append('<section id="showMessage" style="width: 100%;position: fixed;top:' + b
        + 'px;left: ' + c + 'px;z-index:300;><div style=”display:-webkit-box;'
        + '-webkit-box-orient: horizontal;-webkit-box-pack: center;'
        + 'display: -moz-box;-moz-box-orient: horizontal;-moz-box-pack: center;'
        + 'display: -o-box;-o-box-orient: horizontal;-o-box-pack: center;'
        + 'display: -ms-box;-ms-box-orient: horizontal;-ms-box-pack: center;'
        + 'display: box;box-orient: horizontal;box-pack: center;width:100%;>'
        + '<div  style="background: rgba( 0 , 0 , 0 ,.8);  color: #fff;  padding: 0 10px;'
        + 'height: 30px;  line-height: 30px;  border-radius: 5px;  box-shadow: 0 1px 0 1px rgba(0,0,0,.2);'
        + 'text-align: center;  font-size: 14px;">' + a + '</div></div></section>');
        $('#showMessage').show();
        setTimeout(function () {
            $('#showMessage').hide();
            $('#showMessage').remove();
        }, 2e3);
    }
    function comRecordlog(kind) {
        var http;
        if (kind === 'back') {
            http = 'javascript:history.go(-1);';
        }
        else if (kind === 'search') {
            http = 'http://3g.yao.xywy.com/search/middle/';
        }
        else if (kind === 'orderlist') {
            http = 'http://3g.yao.xywy.com/orderlist/2.htm';
        }
        window.location = http;
    }
    // 提交需求弹出
    $('.js-demand-btn').on('click', function () {
        $('.opicty-bj').show();
        $('.demand-pop-box').removeClass('none');
        $('.ad-box').css('bottom', '272px');
        $('html').css('overflow', 'hidden');
    });
    $('.opicty-bj,.js-close').on('click', function () {
        $('.opicty-bj').hide();
        $('.demand-pop-box').addClass('none');
        $('.ad-box').css('bottom', '100px');
        $('html').css('overflow', 'auto');
    });
    // 数量选择
    nums();
    function nums() {
        $('.js-tab span').on('click', function () {
            var index = $(this).index();
            if ($(this).hasClass('current')) {
                return;
            }
            $(this).addClass('current').siblings().removeClass('current');
            $('.js-jg-tab span').eq(index).addClass('cur').siblings().removeClass('cur');
            // alert($('.js-jg-tab span').eq(index).html());
            // $('#policy_price').val($('.js-jg-tab span').eq(index).html());
            var policyId = $(this).data('policyid');
            var policyPrice = $(this).data('policyprice');
            var policyName = $(this).data('policyname');
            $('#policy_id').val(policyId);
            $('#policy_price').val(policyPrice);
            $('#policy_name').val(policyName);
        });
        var numVal = $('.js-num-text').val();
        var num = parseInt(numVal, 10);
        if (num > 1) {
            $('.js-num-minus').removeClass('disabled');
        }
        if (num === 999) {
            $('.tips').show();
            $('.js-num-plus').addClass('disabled');
        }
        if (num > 999) {
            $('.js-num-plus').addClass('disabled');
            return;
        }
        $('.js-num-plus').on('click', function () {
            var self = $(this);
            var minus = $('.js-num-minus');
            var input = $('.js-num-text');
            num = parseInt(input.val(), 10);
            if (num === 1) {
                minus.removeClass('disabled');
            }
            if (num <= 998) {
                input.val(num + 1);
            }
            if (num === 998) {
                self.addClass('disabled');
            }
            $('#num-text').val(num + 1);
        });
        $('.js-num-text').on('blur', function () {
            var numVal = $(this).val();
            num = parseInt(numVal, 10);
            $('#num-text').val(num);
            if (isNaN(numVal) || numVal === '') {
                $('.js-num-text').val('1');
                // 如果输入的不是有效数字，默认为1
                $('#num-text').val(1);
            }
            if (num < 1) {
                $('.js-num-text').val('1');
                $('#num-text').val(1);
            }
            if (num > 999) {
                $('.tips').show();
                $('.js-num-text').val('1');
                $('#num-text').val(1);
            }
        });
        $('.js-num-minus').on('click', function () {
            var self = $(this);
            var plus = $('.js-num-plus');
            var input = $('.js-num-text');
            var num = parseInt(input.val(), 10);
            if (num === 999) {
                plus.removeClass('disabled');
            }
            if (num >= 2) {
                input.val(num - 1);
            }
            if (num === 2) {
                self.addClass('disabled');
            }
            $('#num-text').val(num - 1);
        });
    }
    // 新建地址
    var regName = /^[\u4e00-\u9fa5]{1,30}$/;
    var regPhone = /^13[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$|14[579][0-9]{8}$|17[0678][0-9]{8}$/;
    var regCode = /^[1-9]\d{5}(?!\d)/;// 邮编
    var regsitexq = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
    // 详细地址
    // 保存地址
    $('#siteForm').on('submit', function () {
        var uName = $.trim($('.js-u-name').val());
        var uPhone = $.trim($('.js-u-phone').val());
        var city = $.trim($('#value1').val());
        // 三级地区值
        var sitexq = $.trim($('.js-u-sitexq').val());
        var postcode = $.trim($('.js-postcode').val());
        var area = $('#value1').val();
        var strs = [];
        // 定义一数组
        strs = area.split(',');
        // 字符分割
        var num = strs.length;
        if (uName === '' && !regName.test(uName)) {
            showErrorMessage('请输入收货人');
            return false;
        }
        if (uPhone === '') {
            showErrorMessage('请输入手机号码');
            return false;
        } else if (!regPhone.test(uPhone)) {
            showErrorMessage('请输入正确的手机号码');
            return false;
        }
        if (city === '') {
            showErrorMessage('请选择所在地区');
            return false;
        }
        if (sitexq === '') {
            showErrorMessage('详细地址不能为空');
            return false;
        } else if (!regsitexq.test(sitexq)) {
            showErrorMessage('请输入正确的详细地址');
            return false;
        }
        if (!regCode.test(postcode)) {
            showErrorMessage('请输入正确的邮政编码');
            return false;
        }
        if (num < 3) {
            $('#province').val(strs[0]);
            $('#city').val(strs[0]);
            $('#county').val(strs[1]);
        } else {
            $('#province').val(strs[0]);
            $('#city').val(strs[1]);
            $('#county').val(strs[2]);
        }
    });
    // 设为默认地址
    $('.m-manage-site li .lf-wrapper').on('click', function () {
        if ($(this).parents('li').hasClass('cur')) {
            return;
        } else {
            $(this).parents('li').addClass('cur').siblings().removeClass('cur');
            $(this).find('.Mrsite').removeClass('none');
            $(this).parents('li').siblings().find('.Mrsite').addClass('none');
            var addressId = $(this).parents('li').find('.address_id').val();
            var userId = $(this).parents('li').find('.user_id').val();
            userAddressMrdz(addressId);
        }
    });
    // 地址左滑删除
    var moveW = parseInt($('.rg-wrapper').eq(0).css('width'), 10);
    $('.site-wrapper').each(function () {
        $(this).on('swipeleft', function () {
            $(this).addClass('selected').parents('li').siblings().find('.site-wrapper').removeClass('selected');
            var H = $(this).height();
            $(this).find('.rg-wrapper').css({
                height: H + 'px',
                'line-height': H + 'px'
            });
        });
        $(this).on('swiperight', function () {
            $(this).removeClass('selected');
            var H = $(this).height();
            $(this).find('.rg-wrapper').css({
                height: H + 'px',
                'line-height': H + 'px'
            });
        });
    });
    // 删除地址
    $('.del-site').each(function () {
        $(this).on('click', function () {
            if (confirm('你确定要删除吗？')) {
                var addressId = $(this).parents('li').find('.address_id').val();
                var userId = $(this).parents('li').find('.user_id').val();
                $(this).parents('li').remove();
                userAddressDel(addressId, userId);
                return;
            }
        });
    });
    function userAddressDel(id, userId) {
        if (id !== '') {
            $.ajax({
                type: 'POST',
                url: 'http://3g.yao.xywy.com/index.php?s=UserOrderManage/deletell',
                data: {
                    id: id,
                    userid: userId
                },
                dataType: 'json',
                success: function (data) {
                    window.location.href = 'http://3g.yao.xywy.com/index.php?s=OrderCfxq/user_address';
                }
            });
        }
    }
    function userAddressMrdz(id) {
        if (id !== '') {
            $.ajax({
                type: 'POST',
                url: 'http://3g.yao.xywy.com/index.php?s=UserOrderManage/mrdz',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (data) {
                    // data = eval('(' + data + ')');
                    //   window.location.href='http://3g.yao.xywy.com/index.php?s=OrderCfxq/user_address';
                    window.location.href = 'http://3g.yao.xywy.com/index.php?s=OrderCfxq/index';
                }
            });
        }
    }
    // 购物车
    swiper();
    function swiper() {
        // 左右滑动
        $('.cart-wrapper').each(function () {
            $(this).on('swipeleft', function () {
                $(this).addClass('selected').parents('.cart-order-item').siblings()
                .find('.cart-wrapper').removeClass('selected');
            });
            $(this).on('swiperight', function () {
                $(this).removeClass('selected');
            });
        });
    }
    // 编辑
    $(document).on('click', '.js-edit', function (e) {
        var target = $(e.target);
        var that = $(this).parents('.cart-order-item').find('.cart-wrapper');
        if (that.hasClass('selected')) {
            that.removeClass('selected');
        }
        $(this).parents('.cart-order-item').find('.cart-wrapper').off('swipeleft');
        $(this).parents('.cart-order-item').find('.cart-wrapper').off('swiperight');
        $(this).parents('.cart-order-item').find('.cart-order-info').addClass('none');
        $(this).parents('.cart-order-item').find('.cart-edit-box').removeClass('none');
        $(this).addClass('none');
        $(this).siblings('.js-ok').removeClass('none');
    });
    // 完成
    $(document).on('click', '.js-ok', function (e) {
        var target = $(e.target);
        $('.cart-wrapper').on('swiperleft', swiper);
        $('.cart-wrapper').on('swiperight', swiper);
        $(this).parents('.cart-order-item').find('.cart-edit-box').addClass('none');
        $(this).parents('.cart-order-item').find('.cart-order-info').removeClass('none');
        $(this).addClass('none');
        $(this).siblings('.js-edit').removeClass('none');
    });
    $('.demand-pop-btn').on('click', function () {
        if ($('.js-tab span').hasClass('current')) {
            var policyId = $('.js-tab .current').data('policyid');
            var policyName = $('.js-tab .current').data('policyname');
            var policyPrice = $('.js-tab .current').data('policyprice');
            $('#policy_id').val(policyId);
            $('#policy_name').val(policyName);
            $('#policy_price').val(policyPrice);
        }
    });
    var type = 'click';
    // cpc
    var keyword = $('#productId').val();
    var spackLength = 0;
    $.ajax({
        type: 'GET',
        url: 'https://a2wksc.xywy.com/api/rpm/method/3g/',
        data: {
            keyword: keyword
        },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            $('.p-bj-load').remove();
            var standard = data.standard.list;
            var spackings = data.spackings;
            var standardLength = data.standard.total;
            if (spackings) {
                spackLength = spackings.length;
            }
            if (standardLength === 0) {
                // 暂无报价
                var con = '<div class="tc mt10 mb10" style="color:#ff014f;">暂无报价</div>';
                $('#cpcBox').append(con);
                return;
            }
            // 取得包装
            var con = '<div class="bzlist pr">' + '<p class="list-t"><a class="check-more box-flex-1 bt"'
            + 'href="javascript:;">选择包装：<span class="list-t-text">' + spackings[0].name
            + '</span><span class="list-btn"></span></a></p>'
            + '<div id="wrapper" class="wrapper-box pa none"><div id="scroller"><ul>';
            $.each(spackings, function (i, t) {
                if (i === 0) {
                    con += '<li class="check-on" uuidbox="' + t.uuidBox + '">' + t.name + '<span></span></li>';
                } else {
                    con += '<li uuidbox="' + t.uuidBox + '">' + t.name + '<span></span></li>';
                }
            });
            con += '</ul></div></div></div>';
            // 取得报价
            con += '<div class="cost-list"><ul>';
            $.each(standard, function (i, t) {
                if (i >= 5) {
                    con += '<li top-price="' + t.top_price + '" class="none">\
                    <a class="dis-box" href="' + t.href + '">\
                    <p class="box-flex-1 cost-name">' + t.store_name + '</p><p class="pr10">\
                    <b class="cost-num"><em>￥</em>' + t.shop_price + '</b>\
                    <span class="cost-icon"><b></b></span></p></a></li>';
                } else {
                    con += '<li top-price="' + t.top_price + '">\
                    <a class="dis-box" href="' + t.href + '">\
                    <p class="box-flex-1 cost-name">' + t.store_name + '</p><p class="pr10">\
                    <b class="cost-num"><em>￥</em>' + t.shop_price + '</b><span class="cost-icon"><b></b></span></p>\
                    </a></li>';
                }
            });
            con += '</ul>';
            if (standardLength > 5) {
                con += '<a class="check-more-num border-b" href="javascript:;">更多报价...</a>';
            }
            con += '</div>';
            $('#cpcBox').append(con);
            var topPriceMark = true;
            $('.cost-list ul li').each(function () {
                var top = $(this).attr('top-price');
                if (top === 1) {
                    topPriceMark = false;
                    topPrice($(this));
                    return false;
                }
            });
            // 获取最后一条数据
            if (topPriceMark) {
                var pul = $('.cost-list ul li:last-child');
                topPrice(pul);
            }
        }
    });
    function topPrice(pul) {
        var lasthref = pul.find('a').attr('href');
        var laststorename = pul.find('.cost-name').text();
        var lastshopprice = pul.find('.cost-num').text();
        var minpricediv = '';
        if (lasthref && laststorename && lastshopprice) {
            minpricediv += '<div class="shop-area dis-box">';
            minpricediv += '<p class="box-flex-1">' + laststorename + '</p>';
            minpricediv += '<a href="' + lasthref + '">';
            minpricediv += '<span></span><span>' + lastshopprice + '</span><span></span></a></div>';
            $('#minprice').append(minpricediv);
            $('#minprice').removeClass('none');
        }
    }
    // 页面向下滚动 药品价位定位在上面
    var mt = $('.area-fix').scrollTop();
    var mark = 1;
    $(window).scroll(function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > mt) {
            if (mark) {
                mark = 0;
                $('.area-fix').wrap('<mip-fixed type="top">');
            }
        } else {
            mark = 1;
            $('.area-fix').unwrap('<mip-fixed type="top">');
        }
    });
    // 查看更多报价
    var bjMaker = true;
    $('#cpcBox').on(type, '.check-more-num', function () {
        if (!bjMaker) {
            return;
        }
        bjMaker = false;
        var ul = $(this).prev();
        var self = $(this);
        self.html('加载中...');
        setTimeout(function () {
            self.remove();
            ul.find('li').removeClass('none');
            bjMaker = true;
        }, 400);
    });
    var loadJs = function (elem, url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $(elem).append(script);
        if (typeof callback !== 'function') {
            return false;
        }
        else {
            script.onload = function () {
                callback();
            };
        }
    };
    var timer = null;
    var ajaxMaker = true;
    $('#cpcBox').on(type, '.wrapper-box li', function () {
        if (!ajaxMaker) {
            return;
        }
        ajaxMaker = false;
        clearTimeout(timer);
        var self = $(this);
        var text = self.text();
        var uuidbox = self.attr('uuidBox');
        self.closest('.wrapper-box').prev().find('.list-t-text').text(text);
        timer = setTimeout(function () {
            self.closest('.wrapper-box').hide();
        }, 500);
        if (self.hasClass('check-on')) {
            return;
        } else {
            self.addClass('check-on').siblings().removeClass('check-on');
        }
        $.ajax({
            type: 'GET',
            url: 'https://a2wksc.xywy.com/api/rpm/method/3g/',
            data: {
                uuidBox: uuidbox,
                keyword: keyword
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            async: false,
            timeout: 5e3,
            beforeSend: function () {
                var load = '<div class="p-bj-load"><div style="width:32px;height:32px;margin:15px auto;"><mip-img src="http://i13.wkimg.com/yao/loading.gif"></mip-img></div><div class="tc mb15">报价正在加载中...</div></div>';
                $('.cost-list').remove();
                $('#cpcBox').append(load);
            },
            success: function (data) {
                var length = data.list.length;
                var con = '<div class="cost-list"><ul>';
                $.each(data.list, function (i, t) {
                    if (i >= 5) {
                        con += '<li class="none">\
                        <a class="dis-box" href="' + t.href + '">\
                        <p class="box-flex-1 cost-name">' + t.store_name + '</p><p class="pr10">\
                        <b class="cost-num"><em>￥</em>' + t.shop_price + '</b>\
                        <span class="cost-icon"><b></b></span></p></a></li>';
                    }
                    else {
                        con += '<li><a class="dis-box" href="' + t.href + '">\
                         <p class="box-flex-1 cost-name">' + t.store_name + '</p><p class="pr10">\
                         <b class="cost-num"><em>￥</em>' + t.shop_price + '</b>\
                         <span class="cost-icon"><b></b></span></p></a></li>';
                    }
                });
                con += '</ul>';
                if (length > 5) {
                    con += '<a class="check-more-num border-b" href="javascript:;">更多报价...</a>';
                }
                con += '</div>';
                $('.p-bj-load').remove();
                $('#cpcBox').append(con);
                ajaxMaker = true;
            },
            error: function () {
                ajaxMaker = true;
            }
        });
    });
    $('#loopFocus').on(type, function () {
        var height = $(document).height();
        var mask = '<div id="pBigMask" class="mask-layer" style="height:' + height + 'px;"></div>';
        $('body').append(mask);
        $('#pBigShow').css({
            width: '100%',
            height: height + 'px'
        });
    });
    $('#pBigShow').on(type, function () {
        $('#pBigMask').remove();
        $(this).css({
            width: '0px',
            height: '0px'
        });
    });
    $('#dwon').click(function () {
        $('.introCon').hide();
        $('.fullCon').show();
        $(this).hide().siblings().show();
    });
    $('#up').click(function () {
        $('.fullCon').hide();
        $('.introCon').show();
        $(this).hide().siblings().show();
    });
    // 百度搜索
    $('#submit_baidu').click(function () {
        var keyword = $('#keyword_bo').val();
        var url = 'http://m.baidu.com/s?word=' + keyword;
        location.href = url;
    });
    $('#keyword_bo').on('focus', function () {
        var value = $(this).val();
        if (value === '请输入药品、疾病、症状名称') {
            $(this).val('');
        }
    }).on('blur', function () {
        var value = $(this).val();
        if (value === '') {
            $(this).val('请输入药品、疾病、症状名称');
        }
    });
    // 获取url地址参数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        else {
            return null;
        }
    }
    if (getQueryString('lon') && getQueryString('lat')) {
        // APP进来的访客
        var longitude = getQueryString('lon');
        var latitude = getQueryString('lat');
        $.ajax({
            type: 'get',
            url: 'https://a2wksc.xywy.com/StoreVirtuallocation/getStoreVirtual/lng/' + longitude + '/lat/' + latitude + '/dis/0.01',
            dataType: 'jsonp',
            success: function (msg) {
                // store_list(msg);
            }
        });
    }
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var pid = $(elem).attr('productId');
        this.addEventAction('click', function (event, str) {
            $(event).attr('href', str);
        });
        sendDrug(pid);
        loadJs(elem, 'https://scs.static.xywy.com/tools/iscroll.js', function () {
            // 包装选择
            var myScroll;
            function loaded() {
                myScroll = new iScroll('wrapper', {
                    scrollbarClass: 'myScrollbar'
                });
            }
            $('#cpcBox').on(type, '.check-more', function () {
                var display = $('.wrapper-box').css('display');
                if (display === 'none') {
                    $('.wrapper-box').show();
                } else {
                    $('.wrapper-box').hide();
                }
                if (spackLength > 4) {
                    myScroll = new iScroll('wrapper', {
                        scrollbarClass: 'myScrollbar'
                    });
                    document.addEventListener('DOMContentLoaded', loaded, false);
                    spackLength = 0;
                }
            });
        });
        loadJs(elem, 'https://scs.static.xywy.com/tools/TouchSlide.1.1.js', function () {
            if ($('.loopFocus ul li').length !== 1) {
                TouchSlide({
                    slideCell: '#loopFocus',
                    titCell: '.hd ul',
                    mainCell: '.bd ul',
                    effect: 'leftLoop',
                    autoPage: true,
                    autoPlay: false
                });
                TouchSlide({
                    slideCell: '#loopFocus1',
                    titCell: '.hd ul',
                    mainCell: '.bd ul',
                    effect: 'leftLoop',
                    autoPage: true,
                    autoPlay: false
                });
            }
            TouchSlide({
                slideCell: '#picScroll',
                titCell: '.hd ul',
                autoPage: true,
                pnLoop: 'false'
            });
            if ($('#picScroll .bd ul').length === 1) {
                $('#picScroll .hd').hide();
            }
            $('#picScroll').find('.tempWrap').addClass('tempWrapClass');
        });
    };
    return customElem;
});
