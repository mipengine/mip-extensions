/**
 * @file mip-haixue-contact 用来支持嗨学网咨询功能
 * @author qishunli(qishunli@baidu.com)
 * @time 16-12-08
 */

define(function (require) {

    /**
     * 同步加载js脚本
     * @param {string} url js文件的相对路径或绝对路径
     */
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
        var _element = me.element;
        var NTKF_PARAM = {siteid: 'kf_9778', settingid: 'kf_9778_1477472166958', uid: '', uname: ''};
        (function (window, undefined) {
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
                    } catch(e) {
                        tmpDebug('clear element function');
                    }
                }
                if (element.parentNode) {
                    try {
                        element.parentNode.removeChild(element);
                        removeComplete = true;
                    } catch(e) {

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
                        } catch(e1) {

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
            var k;
            var l;
            var h;
            var j;
            var m;
            var i;
            m = window.location.href;
            var n = getCookie('H_U_C');
            if (n) {
                k = n.split(',')[0];
            }
            l = getCookie('webFrom');
            h = getCookie('cookieId');
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
        function asciiToString(b) {
            return String.fromCharCode(b);
        }
        function urlDecode(g) {
            var i = '';
            for (var f = 0; f < g.length; f++) {
                var j = g.charAt(f);
                if (j === '+') {
                    i += ' ';
                }
                else {
                    if (j === '%') {
                        var h = g.substring(f + 1, f + 3);
                        if (parseInt('0x' + h) > 127) {
                            i += decodeURI('%' + h.toString() + g.substring(f + 3, f + 9).toString());
                            f += 8;
                        }
                        else {
                            i += asciiToString(parseInt('0x' + h));
                            f += 2;
                        }
                    }
                    else {
                        i += j;
                    }
                }
            }
            return i;
        }
        function getCookie(b) {
            var d = document.cookie;
            var a = d.indexOf(b + '=');
            if (a === -1) {
                return null;
            }
            a += b.length + 1;
            var c = d.indexOf(';', a);
            if (c === -1) {
                return urlDecode(d.substring(a));
            }
            else {
                return urlDecode(d.substring(a, c));
            }
        }
        $(_element).on('click', '.mip-contact', function () {
            xiaoNengChat('kf_9778_1477472166958');
        });

    };
    return customElement;
});
