/**
 * 百度好看分享
 */
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function build() {
        var element = this.element;
        var config = getConfig();

        $(element).find('#J_detail_share').click(function () {
            $(this).find('.J_share').show();
        });

        $(element).find('#J_detail_share').bind('touchstart', function (event) {
            event.stopPropagation();
        });

        $('body').bind('touchstart', function () {
            $(element).find('.J_share').hide();
        });

        $(element).find('#J_share_close').click(function (event) {
            $(element).find('.J_share').hide();

            event.stopPropagation();
        });

        $(element).find('.J_share a').bind('click', function () {
            var type = $(this).data('type');
            var op = {
                url: encodeURIComponent(window.location.href),
                title: config.shareTitle,
                content: config.shareTitle,
                picurl: config.sharePic
            };

            if (type === 'wb') {
                var strShare = 'http://service.weibo.com/share/share.php?language=zh_cn&title=' + op.title;
                strShare += '&url=' + op.url + '&content=utf-8&sourceUrl=' + op.url + '&pic=' + op.picurl;

                new Image().src = config.tj + 'share&t=' + new Date().getTime();
            }
            if (type === 'qq') {
                var strShare = 'http://qzs.qzone.qq.com/open/connect/widget/mobile/qzshare/index.html?title=' + op.title;
                strShare += '&summary=' + op.content + '&url=' + op.url + '&imageUrl=' + op.picurl;
                strShare += '&loginpage=loginindex.html&logintype=qzone&page=qzshare.html';

                new Image().src = config.tj + 'share&t=' + new Date().getTime();
            }

            window.location.href = strShare;

            return false;
        });
    };

    function getConfig() {
        var defOpt = {
            shareTitle: '百度好看-发现我的好看',
            shareContent: '百度好看-发现我的好看',
            sharePic: encodeURIComponent("http://s0.haokan.bdimg.com/static/haokan/h5/img/ios-180_15c58b9.png"),
            tj: '/tj.gif?page=er_detail_news&pos='
        };

        var strOpt = $('#J_config').html();
        if (!!strOpt) {
            try {
                return eval('(' + strOpt + ')');
            } catch (e) {
                return defOpt;
            }
        } else {
            return defOpt;
        }
    }

    customElem.prototype.build = build;

    return customElem;
});
