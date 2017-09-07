/**
 * @file mip-voicerecipe 组件
 * @author cxtom(cxtom2008@gmail.com)
 */

define(function (require) {

    var instance = require('customElement').create();
    var $ = require('zepto');
    var util = require('util');
    var Bdbox = require('./bdbox');

    var platform = util.platform;
    var Naboo = util.naboo;

    var STORAGE_KEY = 'mip_voicerecipe_wakeup_key';

    /* eslint-disable fecs-valid-var-jsdoc */
    var Storage = {

        /**
         * 读所有 localstorage 数据
         *
         * @return {Object} flags 所有 localstorage 数据
         */
        get: function () {
            var flags = localStorage.getItem(STORAGE_KEY);
            flags = JSON.parse(flags) || {};
            return flags;
        },

        /**
         * 写数据
         *
         * @param {Object} data 唤醒数据
         */
        set: function (data) {
            var flags = Storage.get();
            $.extend(flags, data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
        }
    };
    /* eslint-enable fecs-valid-var-jsdoc */

    /**
     * 生成全局唯一函数名
     *
     * @param {string} name 名称
     * @return {string} callbackName
     */
    function getCallbackName(name) {
        name = name || 'cook';
        return 'voiceAwu' + new Date().getTime() + '_' + name;
    }

    /**
     * 询问 na 是否已经开启唤醒功能
     *
     * @param  {Function} callback 回调
     */
    function requestIsOpened(callback) {

        var callbackName = getCallbackName();
        window[callbackName] = function () {
            callback.apply(null, arguments);
            delete window[callbackName];
        };

        var params;

        if (platform.isIos()) {

            var args = [
                'method_name=wakeup',
                'wakeUpType=0',
                'voiceSource=webview',
                'source_app=6|' + Bdbox.version
            ].join('&');

            /* eslint-disable fecs-camelcase */
            params = {
                plugin_id: 'box.plugin.voicesearch',
                url: 'args=' + encodeURIComponent(args)
            };
            /* eslint-enable fecs-camelcase */
            var schema = 'baiduboxapp://v6/vendor/speech/open?'
                + 'params=' + encodeURIComponent(JSON.stringify(params))
                + '&func=' + callbackName
                + '&upgrade=0';

            window.location.href = schema;
        }
        else if (platform.isAndroid()) {

            /* eslint-disable fecs-camelcase */
            params = {
                source_app: '6|' + Bdbox.version,
                voiceSource: 'webview',
                wakeUpType: 0
            };
            /* eslint-enable fecs-camelcase */

            Bdbox.invokeApp(
                'Bdbox_android_utils',
                'startVoice',
                [
                    JSON.stringify(params),
                    callbackName
                ]
            );
        }
    }

    /**
     * 吊起 na 的设置页
     */
    function openSetting() {

        var params;

        if (platform.isIos()) {

            var args = [
                'method_name=openSetting',
                'voiceSource=webview',
                'source_app=6|' + Bdbox.version
            ].join('&');

            /* eslint-disable fecs-camelcase */
            params = {
                plugin_id: 'box.plugin.voicesearch',
                url: 'args=' + encodeURIComponent(args)
            };
            /* eslint-enable fecs-camelcase */
            var schema = 'baiduboxapp://v6/vendor/speech/open?'
                + 'params=' + encodeURIComponent(JSON.stringify(params))
                + '&upgrade=0';

            window.location.href = schema;
        }
        else if (platform.isAndroid()) {

            /* eslint-disable fecs-camelcase */
            params = {
                source_app: '6|' + Bdbox.version,
                voiceSource: 'webview',
                wakeUpType: 1,
                method_name: 'openSetting',
                wakeUpAction: 'guide-open'
            };
            /* eslint-enable fecs-camelcase */

            var callbackName = getCallbackName('setting');
            window[callbackName] = function () {
                delete window[callbackName];
            };

            Bdbox.invokeApp(
                'Bdbox_android_utils',
                'startVoice',
                [
                    JSON.stringify(params),
                    callbackName
                ]
            );
        }
    }

    function fadeIn(dom) {
        new Naboo().animate(dom, {
            opacity: 1
        }, {
            duration: 300
        }).start();
    }

    function fadeOut(dom, cb) {
        new Naboo().animate(dom, {
            opacity: 1
        }, {
            duration: 300,
            cb: cb
        }).start();
    }

    /**
     * tips 相关
     *
     * @param  {Object} element element
     */
    function initTip(element) {

        var tip = element.find('.mip-voicerecipe-tips').get(0);

        $(tip).css({
            opacity: 0,
            display: 'block'
        });

        var onScroll = function () {

            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            if (scrollTop > 200) {

                $(window).off('scroll', onScroll);

                fadeIn(tip);

                // 有任何点击就退场
                $(document.body).one('touchstart', function () {
                    tip && fadeOut(tip, function () {
                        $(tip).remove();
                        tip = null;
                    });
                });

                $(window).off('scroll touchmove', onScroll);
            }
        };

        $(window).on('scroll', onScroll);
    }

    var MAIN_HTML = ''
        + '<div class="mip-voicerecipe-wrapper">'
        +     '<button type="button" data-action="start">开始做菜</button>'
        +     '<div class="mip-voicerecipe-tips" style="display: none">小度语音助手，彻底解放你的双手</div>'
        + '</div>';

    var DIALOG_HTML = ''
        + '<div class="mip-voicerecipe-dialog">'
        +     '<div class="mip-voicerecipe-dialog-body">'
        +         '<h1>唤醒未开启</h1>'
        +         '<p>您需要先开启唤醒才能使用菜谱语音对话助手。开启后可说“小度小度”与菜谱对话，解放双手。</p>'
        +         '<div class="mip-voicerecipe-dialog-actions">'
        +             '<button type="button" data-action="close">取消</button>'
        +             '<button type="button" data-action="edit">立即开启</button>'
        +         '</div>'
        +     '</div>'
        +     '<div class="mip-voicerecipe-dialog-mask" data-action="close"></div>'
        + '</div>';


    /**
     * 构造元素，只会运行一次
     */
    instance.prototype.build = function () {

        // 只在手百 9.2 以上显示入口
        if (!Bdbox.isBox
            || (platform.isIos() && Bdbox.versionCompare(Bdbox.version, '9.2') < 0)
            || (platform.isAndroid() && Bdbox.versionCompare(Bdbox.version, '9.1') < 0)
        ) {
            return;
        }

        var element = $(this.element);
        var dialog = null;

        element.html(MAIN_HTML);

        element.on('click', '[data-action=start]', function () {
            requestIsOpened(function (status) {

                status = parseInt(status, 10);

                // 已开启唤醒，直接跳转
                if (status) {
                    location.href = 'http://m.baidu.com/sf?pd=life_cookbook&openapi=1&dspName=iphone&from_sf=1&resource_id=4638&word='
                        + encodeURIComponent(location.href) + '&title=菜谱语音助手&ms=1';
                }
                // 未开启唤醒、设置唤醒失败或者用户拒绝设置的情况
                // 弹窗提示
                else {
                    dialog = $(DIALOG_HTML).appendTo(element.get(0));
                    fadeIn(dialog.get(0));
                }
            });
        });

        var onClose = function () {
            if (dialog) {
                fadeOut(dialog.get(0), function () {
                    dialog.remove();
                    dialog = null;
                });
            }
        };

        // 关闭弹窗
        element.on('click', '[data-action=close]', onClose);

        // 跳转设置页
        element.on('click', '[data-action=edit]', function () {
            onClose();
            openSetting();
        });

        element.css({
            left: '0px',
            height: '59px'
        });

        var store = Storage.get();

        if (!store.visited) {
            initTip(element);
            Storage.set({
                visited: true
            });
        }
    };

    return instance;
});
