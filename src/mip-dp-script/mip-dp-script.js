/**
 * @author: yh
 * @date:  2016-11-10
 * @time: 15:35
 * @file: mip-dp-script.js
 * @contact: lz55.cn
 * @description: #
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var Gesture = util.Gesture;

    // 动态加载JS脚本
    window.includeJS = function (sId, source) {
        if (source != null && !document.getElementById(sId)) {
            var myHead = document.getElementsByTagName('HEAD').item(0);
            var myScript = document.createElement('script');
            myScript.language = 'javascript';
            myScript.type = 'text/javascript';
            myScript.id = sId;
            try {
                myScript.appendChild(document.createTextNode(source));
            }
            catch (ex) {
                myScript.text = source;
            }
            myHead.appendChild(myScript);
        }

    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var $element = $(this.element);
        var gevalPre = $element.attr('geval-pre') || $('#mip-dp-script-params').attr('geval-pre');
        var geval = $element.attr('geval') || $('#mip-dp-script-params').attr('geval');
        var loadjs = $element.attr('loadjs') || $('#mip-dp-script-params').attr('loadjs');
        var loadjsEnd = $element.attr('loadjs-end') || $('#mip-dp-script-params').attr('loadjs-end');
        var adtag = $element.attr('adtag') || $('#mip-dp-script-params').attr('adtag');
        adtag = adtag ? (adtag === 'false' || adtag === '0' ? false : adtag) : true;

        var scriptstr = '';
        if (gevalPre) {

            window.mipDpGevalPre = gevalPre;
            scriptstr += '<script>includeJS("mip-dp-gevalpre",mipDpGevalPre)</script>';
        }

        if (loadjs) {
            var loadjss = loadjs.split('\n');
            $.each(loadjss, function (index, js) {
                js = $.trim(js);
                if (js) {
                    scriptstr += '<script src="' + js + '"></script>';
                }

            });
        }

        if (geval) {

            window.mipDpGeval = geval;
            scriptstr += '<script>includeJS("mip-dp-geval",mipDpGeval)</script>';
        }

        if (adtag) {
            $.each($('.adwraper').not('loaded'), function (index, obj) {
                var tag = $.trim($(obj).attr('id'));
                if (tag) {
                    scriptstr += '<div id="' + tag + '_temp" style="display:none;"><script>showads("' + tag + '");';
                    scriptstr += '$("#' + tag + '").append($("#' + tag + '_temp").children().not("script"));';
                    scriptstr += '</script></div>';
                }

                $(obj).addClass('loaded');
            });
            var adtags = adtag.split(',');
            if (adtags.length > 0) {
                for (var index = 0; index < adtags.length; index++) {
                    var tag = $.trim(adtags[index]);
                    if (tag) {
                        if ($('#' + tag).length > 0) {
                            scriptstr += '<div id="' + tag + '_temp" style="display:none;"><script>';
                            scriptstr += 'showads("' + tag + '");';
                            scriptstr += '$("#' + tag + '").append($("#' + tag + '_temp").children().not("script"));';
                            scriptstr += '</script></div>';
                        }
                        else {
                            scriptstr += '<div id="' + tag + '"><script>showads("' + tag + '");</script></div>';
                        }
                    }

                }
            }
        }

        if (loadjsEnd) {
            var loadJsEnds = loadjsEnd.split('\n');
            for (var i = loadJsEnds.length - 1; i >= 0; i--) {
                if ($.trim(loadJsEnds[i])) {
                    var js = $.trim(loadJsEnds[i]);
                    scriptstr += '<script src="' + js + '"></script>';
                }

            }
        }

        if (scriptstr) {
            document.write(scriptstr);
        }

    };

    if (typeof ($.fn.swipeLeft) !== 'function') {
        $.fn.swipeLeft = function (callback) {
            if (this.length === 0) {
                return;
            }

            $.each(this, function (i, elm) {
                var gesture = new Gesture(elm);
                gesture.on('swipeleft', callback);
            });
        };
    }

    if (typeof ($.fn.swipeRight) !== 'function') {
        $.fn.swipeRight = function (callback) {
            if (this.length === 0) {
                return;
            }

            $.each(this, function (i, elm) {
                var gesture = new Gesture(elm);
                gesture.on('swipeleft swiperight', function (event, data) {
                    if (data.type === 'swiperight') {
                        callback();
                    }

                });
            });
        };
    }

    if (typeof ($.fn.swipeUp) !== 'function') {
        $.fn.swipeUp = function (callback) {
            if (this.length === 0) {
                return;
            }

            $.each(this, function (i, elm) {
                var gesture = new Gesture(elm);
                gesture.on('swipeup', callback);
            });
        };
    }

    if (typeof ($.fn.swipeDown) !== 'function') {
        $.fn.swipeDown = function (callback) {
            if (this.length === 0) {
                return;
            }

            $.each(this, function (i, elm) {
                var gesture = new Gesture(elm);
                gesture.on('swipedown', callback);
            });
        };
    }

    if (typeof ($.fn.tap) !== 'function') {
        $.fn.tap = function (callback) {
            if (this.length === 0) {
                return;
            }

            $.each(this, function (i, elm) {
                var gesture = new Gesture(elm);
                gesture.on('tap', callback);
            });
        };
    }

    $('.btn-back').on('click', function () {
        window.history.back();
    });

    return customElem;
});
