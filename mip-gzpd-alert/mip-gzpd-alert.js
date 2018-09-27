/**
 * @file mip-gzpd-alert.js
 * @description mip-gzpd-alert函数
 * @author jfdsies
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var customElem = require('customElement').create();
    var alt = JSON.parse($('#mip-gzpd-alert-data').html());

    var payUrl = 'https://my.yjbys.com/company/wxpay/native_middle.php?mip&id=' + alt.id + '&rd=' + encodeURI(window.location.href.split('?')[0]);
    var zhezhao = '<div class="mip-gzpd-alert-marks">'
        + '<div class="paybox mip-gzpd-alert-bounceIn">'
        + '    <div class="claos"></div>'
        + '    <div class="paybox-title">' + alt.alert.title + '</div>'
        + '    <div class="paybox-art">' + alt.alert.art + '</div>'
        + '    <div class="paybox-img">'
        + '        <a href="' + payUrl + '"><img src="//static.yjbys.com/qrcode/pay.jpg"></a></div>'
        + '    <div class="paybox-money">'
        + '        <h2>' + alt.alert.detail[0] + '</h2>'
        + '        <span>' + alt.alert.detail[1] + '</span></div>'
        + '    <a class="paybox-bottom-a" href="' + payUrl + '">'
        + '        <div class="paybox-bottom">' + alt.alert.btn + '</div></a>'
        + '    <div class="paybox-cservice">联系客服</div>'
        + '</div></div>';
    var payAlert = '<div class="mip-gzpd-alert-marks-wxpay">'
        + '    <div class="wx_pic_img mip-gzpd-alert-bounceIn">'
        + '        <div class="wx_top"><span>' + alt.alertWx.title + '</span></div>'
        + '        <div class="cg"><img src="https://static.yjbys.com/img/company/pay/zhifu_cg.png"></div>'
        + '        <div class="payqr_box">'
        + '            <div class="hc" style="display: block;">'
        + '                <img src="https://static.yjbys.com/img/my/company/wxzhifu_load.gif"></div>'
        + '            <div class="zhifu">'
        + '                <div class="sm">' + alt.alertWx.detail[0]
        + '                    <span>' + alt.alertWx.detail[1] + '</span></div>'
        + '            </div>'
        + '        </div>'
        + '        <div class="payqr_success_box">'
        + '            <div class="payqr_success_text">'
        + '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1629">'
        + '<path d="M511.993344 0.002048C229.260838 0.002048 0 229.261862 0 511.998464c0 282.732506 229.259814'
        + ' 511.990272 511.993344 511.990272C794.73097 1023.987712 1023.988736 794.73097 1023.988736'
        + ' 511.998464c0-282.736602-229.257766-511.996416-511.995392-511.996416zM788.582942 397.083376L475.699087'
        + ' 709.96723C464.321548 721.341697 449.189043 727.145665 434.1702 727.145665c-15.018843'
        + ' 0-30.036662-5.687233-41.527863-17.177411l-157.23859-157.241662c-22.982403-22.865668-22.982403-60.072299'
        + ' 0-83.054702 22.982403-22.982403 60.074347-22.86874 83.05675 0l115.823366 115.710727'
        + ' 271.352919-271.357015c22.871812-22.86874 60.074347-22.86874 83.05675 0 22.871812 22.983427 22.871812'
        + ' 60.189034-0.11059 83.057774z" fill="" p-id="1630"></path></svg>'
        + '				<span class="text">' + alt.alertOk.title + '</span>'
        + '				<span class="text small">' + alt.alertOk.detail[0] + '</span>'
        + '				<button class="btn">确定</button>'
        + '			</div>'
        + '        </div>'
        + '    </div>'
        + '</div>';
    var copySuccess = '<div class="mip-gzpd-alert-success mip-gzpd-alert-bounceIn">'
        + '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1271">'
        + '<path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248'
        + ' 512-512 512z m0-938.666667C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667'
        + ' 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333'
        + ' 512 85.333333z m-10.368 625.365334a42.624 42.624 0 0 1-60.330667 0 41.130667 41.130667 0 0'
        + ' 1-7.381333-11.136L275.413333 536.32a42.666667 42.666667 0 1 1 61.056-59.605333l137.216 141.269333'
        + ' 262.016-262.016a42.666667 42.666667 0 0 1 60.330667 60.330667l-294.4 294.4z" p-id="1272"></path></svg>'
        + '<span>' + alt.alertCopy.title + '</span></div>';
    var customerService = '<div class="mip-gzpd-alert-cservice-marks">'
        + '<div class="mip-gzpd-alert-cservice mip-gzpd-alert-bounceIn">'
        + '    <div class="claos"></div>'
        + '    <div class="phone-pic">'
        + '        <h1 class="kefu-name">客服微信号: ' + alt.kefu + '</h1>'
        + '        <span class="copy-txt-btn"><a href="weixin://">打开微信</a></span>'
        + '    </div>'
        + '    <div class="phone-art">'
        + '        <span style="color:#ff6600;">付费成功后，若无法使用请联系客服</span>'
        + '        <span>在线时间：周一至周五</span>'
        + '        <span>8:30~12:30 14:00~18:00</span>'
        + '        <input type="text" value="' + alt.kefu + '" id="kefu-name-input">'
        + '    </div>'
        + '</div>'
        + '</div>';

    var hashCode = function (s) {
        var h = 0;
        var l = s.length;
        var i = 0;
        if (l > 0) {
            while (i < l) {
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
            }
        }
        return h;
    };
    var cookieKey = hashCode(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)).toString();
    var buyInterval;
    var copyTimeout;

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        $('.content').append(zhezhao + payAlert + copySuccess + customerService);
        document.addEventListener('copy', function (e) {
            if (!storage.get(cookieKey)) {
                if ($('.mip-gzpd-alert-marks').css('display') !== 'block') {
                    e.clipboardData.setData('text/plain', '');
                    e.preventDefault();
                }
                $('.mip-gzpd-alert-marks').css('display', 'block');
            }
            else {
                window.clearTimeout(copyTimeout);
                $('.mip-gzpd-alert-success').css('display', 'block');
                copyTimeout = window.setTimeout(function () {
                    $('.mip-gzpd-alert-success').css('display', 'none');
                }, 1000);
            }
        });
        if (window.location.href.indexOf('order=') > -1) {
            $('.mip-gzpd-alert-marks-wxpay').css('display', 'block');
            $('.payqr_box').css('display', 'block');
            $('.payqr_success_box').css('display', 'none');
            buyInterval = window.setInterval(function () {
                $.getJSON('//my.yjbys.com/company/wxpay/trade_copy.php' + window.location.search, function (data) {
                    if (data.state === 'OK') {
                        $('.claos').css('display', 'none');
                        $('.payqr_box').css('display', 'none');
                        $('.payqr_success_box').css('display', 'block');
                        $('.wx_top span').text('支付成功');
                        storage.set(cookieKey, 1, 7 * 86400 * 1000);
                        window.clearInterval(buyInterval);
                    }
                });
            }, 1500);
        }

        $(document).on('click', '.mip-gzpd-alert-cservice-marks .claos', function () {
            $('.mip-gzpd-alert-cservice-marks').css('display', 'none');
        });
        $(document).on('click', '.mip-gzpd-alert-marks .claos', function () {
            $('.mip-gzpd-alert-marks').css('display', 'none');
        });
        $(document).on('click', '.mip-gzpd-alert-marks .paybox-cservice', function () {
            $('.mip-gzpd-alert-cservice-marks').css('display', 'block');
        });
        $(document).on('click', '.payqr_success_text .btn', function () {
            window.location.href = window.location.href.split('?')[0];
        });
    };

    return customElem;
});
