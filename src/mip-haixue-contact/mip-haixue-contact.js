/**
 * @file mip-haixue-contact 用来支持嗨学网咨询功能
 * @author qishunli(qishunli@baidu.com)
 * @time 16-12-08
 */
define(function (require) {
    var NTKF;
    function loadJs(url) {
        var myHead = document.getElementsByTagName('head').item(0);
        var myScript = document.createElement('script');
        myScript.type = 'text/javascript';
        myScript.src = url;
        myHead.appendChild(myScript);
    }

    loadJs('https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9778');

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var me = this;
        var element = me.element;
        var siteid = element.getAttribute('siteid');
        var kfid = element.getAttribute('kfid');
        kfid = kfid ? kfid : 'kf_9778_1481685802962';
        var NTKF_PARAM = {
            siteid: (siteid || 'kf_9778'),
            settingid: kfid,
            uid: '',
            uname: ''
        };
        (function (window) {
            var headElement;
            var node;
            var scripturl;
            var script;

            if (typeof NTKF_PARAM === 'undefined') {
                tmpDebug('ERROR: NTKF_PARAM is not defined');
                return false;
            }

            if (!NTKF_PARAM.siteid) {
                tmpDebug('ERROR: NTKF_PARAM.siteid is not defined');
                return false;
            }
            script = document.getElementsByTagName('script');
            for (var i = 0; i < script.length; i++) {
                if (script[i].src && /(ntkfstat|ntkf|nt)\.js/gi.test(script[i].src)) {
                    scripturl = script[i].src.substr(0, script[i].src.lastIndexOf('/'));
                    funcRemoveNode(script[i]);
                    break;
                }
            }
            if (!scripturl) {
                tmpDebug('ERROR: script server url get failure.');
                return false;
            }

            headElement = document.getElementsByTagName('head')[0];
            node = document.createElement('script');
            node.type = 'text/javascript';
            node.async = 'async';
            node.charset = 'utf-8';
            node.src = scripturl + '/ntkfstat.js?siteid=' + NTKF_PARAM.siteid;
            headElement.insertBefore(node, headElement.lastChild);


            function tmpDebug(message) {
                if (typeof console !== undefined) {
                    return;
                }
                if (typeof console.error !== undefined) {
                    console.error(message);
                }
                if (typeof console.info !== undefined) {
                    console.info(message);
                }
            }
            function funcRemoveNode(element) {
                var removeComplete = false;

                for (var methodName in element) {
                    try {
                        if (typeof element[methodName] === 'function') {
                            element[methodName] = null;
                        }
                    } catch (e) {
                        tmpDebug('clear element function');
                    }
                }
                if (element.parentNode) {
                    try {
                        element.parentNode.removeChild(element);
                        removeComplete = true;
                    } catch (e) {

                    }
                }
                if (!removeComplete) {
                    var tElement = document.createElement('DIV');
                    tElement.appendChild(element);
                    tElement.innerHTML = '';
                    if (tElement.parentNode) {
                        try {
                            tElement.parentNode.removeChild(tElement);
                            removeComplete = true;
                        } catch (e1) {

                        }
                    }
                }
                return removeComplete;
            }
        })(window);



        function xiaoNengChat(b) {
            getData();
            NTKF.im_openInPageChat(b);
        }

        function getData() {
            NTKF = window.NTKF || {};
            var k;
            var l;
            var h;
            var j;
            var m;
            var i;
            m = window.location.href;
            var n = null;
            if (n) {
                k = n.split(',')[0];
            }
            l = 'YJ_bjh';
            h = 'C7522C73-FC40-0001-A872-14C016BD5770';
            i = NTKF ? NTKF.global.pcid : '';
            j = '';
            if (k) {
                j = j + 'quot;customerIdquot;:quot;' + k + 'quot;,';
            }
            if (h) {
                j = j + 'quot;cookieIdquot;:quot;' + h + 'quot;,';
            }
            if (l) {
                j = j + 'quot;webFromquot;:quot;' + l + 'quot;,';
            }
            if (m) {
                j = j + 'quot;viewUrlquot;:quot;' + m + 'quot;,';
            }
            if (i) {
                j = j + 'quot;ntkfClientIdquot;:quot;' + i + 'quot;,';
            }
            if (k) {
                NTKF.im_updatePageInfo({uid: k, erpparam: j});
            }
            else {
                NTKF.im_updatePageInfo({uid: '', erpparam: j});
            }
        }
        $(element).on('click', '.mip-contact', function () {
            xiaoNengChat(kfid);
        });

    };
    return customElement;
});
