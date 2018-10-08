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
    var buyInterval;
    var copyTimeout;

    var marksHtml = function (config) {
        var payUrl = 'https://my.yjbys.com/company/wxpay/native_middle.php?mip&id=' + config.id + '&rd=' + encodeURI(window.location.href.split('?')[0]);
        var freeboxDetail = config.alertFree.detail.map(function (item) {
            return '<p>' + item + '</p>';
        }).join('');
        return '<div class="mip-gzpd-alert-marks">'
            + '<div class="alert-box mip-gzpd-alert-bounceIn">'
            + '<div class="claos"></div>'
            + '<div class="paybox"' + (!config.showBox[0] ? ' style="display:none"' : '') + '>'
            + '    <div class="paybox-title">' + config.alert.title + '</div>'
            + '    <div class="paybox-img">'
            + '        <a href="' + payUrl + '">'
            + '            <mip-img class="qrimg" src="//static.yjbys.com/qrcode/pay.jpg"></mip-img></a></div>'
            + '    <div class="paybox-money">'
            + '        <span>' + config.alert.detail[0] + '</span>'
            + '        <span>' + config.alert.detail[1] + '</span></div>'
            + '    <a class="paybox-bottom-a" href="' + payUrl + '">'
            + '        <div class="paybox-bottom">' + config.alert.btn + '</div></a>'
            + '</div>'
            + '<div class="freebox"' + (!config.showBox[1] ? ' style="display:none"' : '') + '>'
            + '    <div class="freebox-title">' + config.alertFree.title + '</div>'
            + '    <div class="freebox-description">' + freeboxDetail + '</div>'
            + '    <div class="freebox-code">'
            + '        <input type="text" placeholder="' + config.alertFree.placeholder + '" class="freebox-input">'
            + '        <input type="button" value="' + config.alertFree.btn + '" class="freebox-btn">'
            + '    </div>'
            + '</div>'
            + '<div class="paybox-cservice">' + config.alert.service + '</div>'
            + '</div></div>';
    };
    var payAlertHtml = function (config) {
        return '<div class="mip-gzpd-alert-marks-wxpay">'
            + '    <div class="wx_pic_img mip-gzpd-alert-bounceIn">'
            + '        <div class="wx_top"><span>' + config.alertWx.title + '</span></div>'
            + '        <div class="cg"><mip-img class="cg-img" src="https://static.yjbys.com/img/company/pay/zhifu_cg.png"></mip-img></div>'
            + '        <div class="payqr_box">'
            + '            <div class="hc" style="display: block;">'
            + '                <mip-img class="hc-img" src="https://static.yjbys.com/img/my/company/wxzhifu_load.gif"></mip-img></div>'
            + '            <div class="zhifu">'
            + '                <div class="sm">' + config.alertWx.detail[0]
            + '                    <span>' + config.alertWx.detail[1] + '</span></div>'
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
            + '				<span class="text">' + config.alertOk.title + '</span>'
            + '				<span class="text small">' + config.alertOk.detail[0] + '</span>'
            + '				<button class="btn">确定</button>'
            + '			</div>'
            + '        </div>'
            + '    </div>'
            + '</div>';
    };
    var copySuccessHtml = function (config) {
        return '<div class="mip-gzpd-alert-success mip-gzpd-alert-bounceIn">'
            + '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1271">'
            + '<path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248'
            + ' 512-512 512z m0-938.666667C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667'
            + ' 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333'
            + ' 512 85.333333z m-10.368 625.365334a42.624 42.624 0 0 1-60.330667 0 41.130667 41.130667 0 0'
            + ' 1-7.381333-11.136L275.413333 536.32a42.666667 42.666667 0 1 1 61.056-59.605333l137.216 141.269333'
            + ' 262.016-262.016a42.666667 42.666667 0 0 1 60.330667 60.330667l-294.4 294.4z" p-id="1272"></path></svg>'
            + '<span>' + config.alertCopy.title + '</span></div>';
    };
    var customerServiceHtml = function (config) {
        return '<div class="mip-gzpd-alert-cservice-marks">'
            + '<div class="mip-gzpd-alert-cservice mip-gzpd-alert-bounceIn">'
            + '    <div class="claos"></div>'
            + '    <div class="phone-pic">'
            + '        <h1 class="kefu-name">客服微信号: ' + config.kefu + '</h1>'
            + '        <span class="copy-txt-btn"><a href="weixin://">打开微信</a></span>'
            + '    </div>'
            + '    <div class="phone-art">'
            + '        <span style="color:#ff6600;">付费成功后，若无法使用请联系客服</span>'
            + '        <span>在线时间：周一至周五</span>'
            + '        <span>8:30~12:30 14:00~18:00</span>'
            + '        <input type="text" value="' + config.kefu + '" id="kefu-name-input">'
            + '    </div>'
            + '</div>'
            + '</div>';
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.firstInviewCallback = function () {
        var ele = this.element;

        var configEle = ele.querySelectorAll('#mip-gzpd-alert-data')[0];
        var config = JSON.parse($(configEle).html());

        var marks = marksHtml(config);
        var payAlert = payAlertHtml(config);
        var copySuccess = copySuccessHtml(config);
        var customerService = customerServiceHtml(config);

        var content = ele.querySelectorAll('.content')[0];
        $(content).append(marks + payAlert + copySuccess + customerService);

        var cserviceMarks = ele.querySelectorAll('.mip-gzpd-alert-cservice-marks')[0];
        var cserviceMarksCloseBtn = cserviceMarks.querySelectorAll('.claos')[0];

        var alertMarks = ele.querySelectorAll('.mip-gzpd-alert-marks')[0];
        var alertMarksCloseBtn = alertMarks.querySelectorAll('.claos')[0];
        var alertMarksPayBox = alertMarks.querySelectorAll('.paybox-cservice')[0];

        var alertWxpay = ele.querySelectorAll('.mip-gzpd-alert-marks-wxpay')[0];
        var alertWxpaySuccessBtn = alertWxpay.querySelectorAll('.payqr_success_text .btn')[0];

        var freeboxBtn = ele.querySelectorAll('.freebox-btn')[0];
        var freeboxInput = ele.querySelectorAll('.freebox-input')[0];

        document.addEventListener('copy', function (e) {
            if (!storage.get(config.cookieKey)) {
                if ($(alertMarks).css('display') !== 'block') {
                    e.clipboardData.setData('text/plain', '');
                    e.preventDefault();
                }
                $(alertMarks).css('display', 'block');
            }
            else {
                window.clearTimeout(copyTimeout);
                var alertSuccess = ele.querySelectorAll('.mip-gzpd-alert-success')[0];
                $(alertSuccess).css('display', 'block');
                copyTimeout = window.setTimeout(function () {
                    $(alertSuccess).css('display', 'none');
                }, 1000);
            }
        });
        if (window.location.href.indexOf('order=') > -1) {
            var payBox = ele.querySelectorAll('.payqr_box')[0];
            var payBoxSuccess = ele.querySelectorAll('.payqr_success_box')[0];
            var wxTopSpan = ele.querySelectorAll('.wx_top span')[0];

            $(alertWxpay).css('display', 'block');
            $(payBox).css('display', 'block');
            $(payBoxSuccess).css('display', 'none');
            buyInterval = window.setInterval(function () {
                $.getJSON('//my.yjbys.com/company/wxpay/trade_copy.php' + window.location.search, function (data) {
                    if (data.state === 'OK') {
                        $(alertMarksCloseBtn).css('display', 'none');
                        $(payBox).css('display', 'none');
                        $(payBoxSuccess).css('display', 'block');
                        $(wxTopSpan).text('支付成功');
                        storage.set(config.cookieKey, 1, config.cookieTtl * 1000);
                        window.clearInterval(buyInterval);
                    }
                });
            }, 1500);
        }

        $(cserviceMarksCloseBtn).click(function () {
            $(cserviceMarks).css('display', 'none');
        });

        $(alertMarksCloseBtn).click(function () {
            $(alertMarks).css('display', 'none');
        });

        $(alertMarksPayBox).click(function () {
            $(cserviceMarks).css('display', 'block');
        });

        $(freeboxBtn).click(function () {
            var userInput = parseInt($(freeboxInput).val(), 10);
            if (userInput < 1000) {
                alert('输入不正确!');
            }

            if (userInput > 8000 && userInput < 9999) {
                storage.set(config.cookieKey, 1, config.cookieTtl * 1000);
                $(alertMarks).css('display', 'none');
            }
        });

        $(alertWxpaySuccessBtn).click(function () {
            window.top.location.href = window.location.href.split('?')[0];
        });
    };

    return customElem;
});
