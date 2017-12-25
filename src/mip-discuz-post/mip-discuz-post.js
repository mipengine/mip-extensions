/**
 * @file mip-discuz-post discuz登陆组件
 * @author 104460712@qq.com
 * @version 1.1
 */

define(function (require) {
    var $ = require('jquery');
    var JSLOADED = [];
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var STATICURL = element.getAttribute('staticurl');
        var IMGDIR = element.getAttribute('imgdir');
        var SITEURL = element.getAttribute('siteurl');
        var script = element.querySelector('script[type="application/json"]') || null;
        if (script) {
            var obj = JSON.parse(script.textContent.toString());
            var fnparams = '';
            var fnstring = '';
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    fnstring = key;
                    fnparams = obj[key];
                }
            }
            switch (fnstring) {
                case 'seccheck':
                    seccheck(fnparams);
                    break;
                case 'urlforward':
                    urlforward(fnparams);
                    break;
                case 'fastpostform':
                    fastpostform(fnparams);
                    break;
                case 'checkpostvalue':
                    checkpostvalue(fnparams);
                    break;
                case 'postsubmitnewthread':
                    postsubmitnewthread(fnparams);
                    break;
            }
        }
        var page = {
            converthtml: function () {
                var prevpage = $('div.pg .prev').prop('href');
                var nextpage = $('div.pg .nxt').prop('href');
                var lastpage = $('div.pg label span').text().replace(/[^\d]/g, '') || 0;
                var curpage = $('div.pg input').val() || 1;
                if (!lastpage) {
                    prevpage = $('div.pg .pgb a').prop('href');
                }
                var prevpagehref = '';
                var nextpagehref = '';
                if (prevpage === undefined) {
                    prevpagehref = '#" class="grey';
                }
                else {
                    prevpagehref = prevpage;
                }
                if (nextpage === undefined) {
                    nextpagehref = '#" class="grey';
                }
                else {
                    nextpagehref = nextpage;
                }
                var selector = '';
                if (lastpage) {
                    selector += '<a id="select_a" style="margin:0 2px;padding:1px 0 0 0;border:0;display:inline-block;'
                    + 'position:relative;width:100px;height:31px;line-height:27px;background:url(' + SITEURL
                    + STATICURL + '/image/mobile/images/pic_select.png) no-repeat;text-align:left;text-indent:20px;">';
                    selector += '<span>第' + curpage + '页</span>';
                }
                $('div.pg').removeClass('pg').addClass('page').html('<a href="'
                    + prevpagehref + '" target="_blank">上一页</a>'
                    + selector + '<a href="' + nextpagehref + '" target="_blank">下一页</a>');
                $('#dumppage').on('change', function () {
                    var href = (prevpage || nextpage);
                    window.location.href = href.replace(/page=\d+/, 'page=' + $(this).val());
                });
            }
        };
        var scrolltop = {
            obj: null,
            init: function (obj) {
                scrolltop.obj = obj;
                var fixed = this.isfixed();
                obj.css('opacity', '.618');
                if (fixed) {
                    obj.css('bottom', '8px');
                }
                else {
                    obj.css({visibility: 'visible', position: 'absolute'});
                }
                $(window).on('resize', function () {
                    if (fixed) {
                        obj.css('bottom', '8px');
                    }
                    else {
                        obj.css('top', ($(document).scrollTop() + $(window).height() - 40) + 'px');
                    }
                });
                obj.on('tap', function () {
                    $(document).scrollTop($(document).height());
                });
                $(document).on('scroll', function () {
                    if (!fixed) {
                        obj.css('top', ($(document).scrollTop() + $(window).height() - 40) + 'px');
                    }
                    if ($(document).scrollTop() >= 400) {
                        obj.removeClass('bottom')
                        .off().on('tap', function () {
                            window.scrollTo('0', '1');
                        });
                    }
                    else {
                        obj.addClass('bottom')
                        .off().on('tap', function () {
                            $(document).scrollTop($(document).height());
                        });
                    }
                });

            },
            isfixed: function () {
                var offset = scrolltop.obj.offset();
                var scrollTop = $(window).scrollTop();
                var screenHeight = document.documentElement.clientHeight;
                if (offset === undefined) {
                    return false;
                }
                if (offset.top < scrollTop || (offset.top - scrollTop) > screenHeight) {
                    return false;
                }
                return true;
            }
        };
        var img = {
            init: function (iserrt) {
                var errhandle = this.errorhandle;
                $('img').on('load', function () {
                    var obj = $(this);
                    obj.attr('zsrc', obj.attr('src'));
                    if (obj.width() < 5 && obj.height() < 10 && obj.css('display') !== 'none') {
                        return errhandle(obj, iserrt);
                    }
                    obj.css('display', 'inline');
                    obj.css('visibility', 'visible');
                    if (obj.width() > window.innerWidth) {
                        obj.css('width', window.innerWidth);
                    }
                    obj.parent().find('.loading').remove();
                    obj.parent().find('.error_text').remove();
                })
                .on('error', function () {
                    var obj = $(this);
                    obj.attr('zsrc', obj.attr('src'));
                    errhandle(obj, iserrt);
                });
            },
            errorhandle: function (obj, iserrt) {
                if (obj.attr('noerror') === 'true') {
                    return;
                }
                obj.css('visibility', 'hidden');
                obj.css('display', 'none');
                var parentnode = obj.parent();
                parentnode.find('.loading').remove();
                parentnode.append('<div class="loading" style="background:url(' + SITEURL + IMGDIR
                    + '/imageloading.gif) no-repeat center center;width:' + parentnode.width()
                    + 'px;height:' + parentnode.height() + 'px"></div>');
                var loadnums = parseInt(obj.attr('load'), 0) || 0;
                if (loadnums < 3) {
                    obj.attr('src', obj.attr('zsrc'));
                    obj.attr('load', ++loadnums);
                    return false;
                }
                if (iserrt) {
                    parentnode.find('.loading').remove();
                    parentnode.append('<div class="error_text">点击重新加载</div>');
                    parentnode.find('.error_text').one('click', function () {
                        obj.attr('load', 0).find('.error_text').remove();
                        parentnode.append('<div class="loading" style="background:url(' + IMGDIR
                            + '/imageloading.gif) no-repeat center center;width:' + parentnode.width()
                            + 'px;height:' + parentnode.height() + 'px"></div>');
                        obj.attr('src', obj.attr('zsrc'));
                    });
                }
                return false;
            }
        };
        var atap = {
            init: function () {
                $('.atap').on('tap', function () {
                    var obj = $(this);
                    obj.css({'background': '#6FACD5', 'color': '#FFFFFF', 'font-weight': 'bold',
                        'text-decoration': 'none', 'text-shadow': '0 1px 1px #3373A5'});
                    return false;
                });
                $('.atap a').off('click');
            }
        };
        var POPMENU = {};
        var popup = {
            init: function () {
                var $this = this;
                $('.popup').each(function (index, obj) {
                    obj = $(obj);
                    var pop = $(obj.attr('href'));
                    if (pop && pop.attr('popup')) {
                        pop.css({display: 'none'});
                        obj.on('click', function (e) {
                            $this.open(pop);
                        });
                    }
                });
                this.maskinit();
            },
            maskinit: function () {
                var $this = this;
                $('#mask').off().on('tap', function () {
                    $this.close();
                });
            },

            open: function (pop, type, url) {
                this.close();
                this.maskinit();
                if (typeof pop === 'string') {
                    $('#ntcmsg').remove();
                    if (type === 'alert') {
                        pop = '<div class="tip"><dt>' + pop
                        + '</dt><dd><p class="button2 popupclosebtn" type="button">确定</p></dd></div>';
                    }
                    else if (type === 'confirm') {
                        pop = '<div class="tip"><dt>' + pop
                        + '</dt><dd><input class="redirect button2" type="button" value="确定" href="'
                        + url + '"><p class="popupclosebtn">取消</p></dd></div>';
                    }
                    $('body').append('<div id="ntcmsg" style="display:none;">' + pop + '</div>');
                    pop = $('#ntcmsg');
                }
                if (POPMENU[pop.attr('id')]) {
                    $('#' + pop.attr('id') + '_popmenu').html(pop.html()).css({height: pop.height()
                    + 'px', width: pop.width() + 'px'});
                }
                else {
                    pop.parent().append('<div class="dialogbox" id="' + pop.attr('id')
                    + '_popmenu" style="height:' + pop.height() + 'px;width:' + pop.width()
                    + 'px;">' + pop.html() + '</div>');
                }
                var popupobj = $('#' + pop.attr('id') + '_popmenu');
                var left = (window.innerWidth - popupobj.width()) / 2;
                var top = (document.documentElement.clientHeight - popupobj.height()) / 2;
                popupobj.css({'display': 'block', 'position': 'fixed', 'left': left,
                    'top': top, 'z-index': 120, 'opacity': 1});
                $('#mask').css({'display': 'block', 'width': '100%', 'height': '100%',
                    'position': 'fixed', 'top': '0', 'left': '0', 'background': 'black',
                    'opacity': '0.2', 'z-index': '100'});
                POPMENU[pop.attr('id')] = pop;
            },
            close: function () {
                $('#mask').css('display', 'none');
                $.each(POPMENU, function (index, obj) {
                    $('#' + index + '_popmenu').css('display', 'none');
                });
            }
        };
        var dialog = {
            init: function () {
                $(document).on('click', '.dialog', function () {
                    var obj = $(this);
                    popup.open('<img src="' + IMGDIR + '/imageloading.gif">');
                    $.ajax({
                        type: 'GET',
                        url: obj.attr('href') + '&inajax=1',
                        dataType: 'xml'
                    })
                    .success(function (s) {
                        popup.open(s.lastChild.firstChild.nodeValue);
                        evalscript(s.lastChild.firstChild.nodeValue);
                    })
                    .error(function () {
                        window.location.href = obj.attr('href');
                        popup.close();
                    });
                    return false;
                });
            }
        };
        var formdialog = {
            init: function () {
                $(document).on('click', '.formdialog', function () {
                    popup.open('<img src="' + IMGDIR + '/imageloading.gif">');
                    var obj = $(this);
                    var formobj = $(this.form);
                    $.ajax({
                        type: 'POST',
                        url: formobj.attr('action') + '&handlekey=' + formobj.attr('id') + '&inajax=1',
                        data: formobj.serialize(),
                        dataType: 'xml'
                    })
                    .success(function (s) {
                        popup.open(s.lastChild.firstChild.nodeValue);
                        evalscript(s.lastChild.firstChild.nodeValue);
                    })
                    .error(function () {
                        window.location.href = obj.attr('href');
                        popup.close();
                    });
                    return false;
                });
            }
        };
        var redirect = {
            init: function () {
                $(document).on('click', '.redirect', function () {
                    var obj = $(this);
                    popup.close();
                    window.location.href = obj.attr('href');
                });
            }
        };
        var DISMENU = {};
        var display = {
            init: function () {
                var $this = this;
                $('.display').each(function (index, obj) {
                    obj = $(obj);
                    var dis = $(obj.attr('href'));
                    if (dis && dis.attr('display')) {
                        dis.css({display: 'none'});
                        dis.css({'z-index': '102'});
                        DISMENU[dis.attr('id')] = dis;
                        obj.on('click', function (e) {
                            if (inarray(e.target.tagName, ['A', 'IMG', 'INPUT'])) {
                                return;
                            }
                            $this.maskinit();
                            if (dis.attr('display') === 'true') {
                                dis.css('display', 'block');
                                dis.attr('display', 'false');
                                $('#mask').css({'display': 'block', 'width': '100%', 'height': '100%',
                                'position': 'fixed', 'top': '0', 'left': '0', 'background': 'transparent',
                                'z-index': '100'});
                            }
                            return false;
                        });
                    }
                });
            },
            maskinit: function () {
                var $this = this;
                $('#mask').off().on('touchstart', function () {
                    $this.hide();
                });
            },
            hide: function () {
                $('#mask').css('display', 'none');
                $.each(DISMENU, function (index, obj) {
                    obj.css('display', 'none');
                    obj.attr('display', 'true');
                });
            }
        };
        var geo = {
            latitude: null,
            longitude: null,
            loc: null,
            errmsg: null,
            timeout: 5000,
            getcurrentposition: function () {
                if (!navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.locationsuccess, this.locationerror, {
                        enableHighAcuracy: true,
                        timeout: this.timeout,
                        maximumAge: 3000
                    });
                }
            },
            locationerror: function (error) {
                geo.errmsg = 'error';
                switch (error.code) {
                    case error.TIMEOUT:
                        geo.errmsg = '获取位置超时，请重试';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        geo.errmsg = '无法检测到您的当前位置';
                        break;
                    case error.PERMISSION_DENIED:
                        geo.errmsg = '请允许能够正常访问您的当前位置';
                        break;
                    case error.UNKNOWN_ERROR:
                        geo.errmsg = '发生未知错误';
                        break;
                }
            },
            locationsuccess: function (position) {
                geo.latitude = position.coords.latitude;
                geo.longitude = position.coords.longitude;
                geo.errmsg = '';
                $.ajax({
                    type: 'POST',
                    url: 'http://maps.google.com/maps/api/geocode/json?latlng=' + geo.latitude + ',' + geo.longitude + '&language=zh-CN&sensor=true',
                    dataType: 'json'
                })
                .success(function (s) {
                    if (s.status === 'OK') {
                        geo.loc = s.results[0].formatted_address;
                    }
                })
                .error(function () {
                    geo.loc = null;
                });
            }
        };
        var pullrefresh = {
            init: function () {
                var pos = {};
                var status = false;
                var divobj = null;
                var contentobj = null;
                var reloadflag = false;
                $('body').on('touchstart', function (e) {
                    e = mygetnativeevent(e);
                    pos.startx = e.touches[0].pageX;
                    pos.starty = e.touches[0].pageY;
                })
                .on('touchmove', function (e) {
                    e = mygetnativeevent(e);
                    pos.curposx = e.touches[0].pageX;
                    pos.curposy = e.touches[0].pageY;
                    if (pos.curposy - pos.starty < 0 && !status) {
                        return;
                    }
                    if (!status && $(window).scrollTop() <= 0) {
                        status = true;
                        divobj = document.createElement('div');
                        divobj = $(divobj);
                        divobj.css({'position': 'relative', 'margin-left': '-85px'});
                        $('body').prepend(divobj);
                        contentobj = document.createElement('div');
                        contentobj = $(contentobj);
                        contentobj.css({position: 'absolute', height: '30px', top: '-30px', left: '50%'});
                        contentobj.html('<img src="' + SITEURL + STATICURL + 'image/mobile/images/icon_arrow.gif"'
                            + 'style="vertical-align:middle;margin-right:5px;-moz-transform:rotate(180deg);'
                            + '-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg);">'
                            + '<span id="refreshtxt">下拉可以刷新</span>');
                        contentobj.find('img').css({'-webkit-transition': 'all 0.5s ease-in-out'});
                        divobj.prepend(contentobj);
                        pos.topx = pos.curposx;
                        pos.topy = pos.curposy;
                    }
                    if (!status) {
                        return;
                    }
                    if (status) {
                        var pullheight = pos.curposy - pos.topy;
                        if (pullheight >= 0 && pullheight < 150) {
                            divobj.css({height: pullheight / 2 + 'px'});
                            contentobj.css({top: (-30 + pullheight / 2) + 'px'});
                            if (reloadflag) {
                                contentobj.find('img').css({'-webkit-transform': 'rotate(180deg)',
                                    '-moz-transform': 'rotate(180deg)', '-o-transform': 'rotate(180deg)',
                                    'transform': 'rotate(180deg)'});
                                contentobj.find('#refreshtxt').html('下拉可以刷新');
                            }
                            reloadflag = false;
                        }
                        else if (pullheight >= 150) {
                            divobj.css({height: pullheight / 2 + 'px'});
                            contentobj.css({top: (-30 + pullheight / 2) + 'px'});
                            if (!reloadflag) {
                                contentobj.find('img').css({'-webkit-transform': 'rotate(360deg)',
                                    '-moz-transform': 'rotate(360deg)', '-o-transform': 'rotate(360deg)',
                                    'transform': 'rotate(360deg)'});
                                contentobj.find('#refreshtxt').html('松开可以刷新');
                            }
                            reloadflag = true;
                        }
                    }
                    e.preventDefault();
                })
                .on('touchend', function (e) {
                    if (status) {
                        if (reloadflag) {
                            contentobj.html('<img src="' + SITEURL + STATICURL + 'image/mobile/images/icon_load.gif"'
                                + 'style="vertical-align:middle;margin-right:5px;">正在加载...');
                            contentobj.animate({top: (-30 + 75) + 'px'}, 618, 'linear');
                            divobj.animate({height: '75px'}, 618, 'linear', function () {
                                window.location.reload();
                            });
                            return;
                        }
                    }
                    divobj.remove();
                    divobj = null;
                    status = false;
                    pos = {};
                });
            }
        };
        function mygetnativeevent(event) {
            while (event && typeof event.originalEvent !== 'undefined') {
                event = event.originalEvent;
            }
            return event;
        }
        function evalscript(s) {
            if (s.indexOf('<script') === -1) {
                return s;
            }
            var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
            var arr = [];
            while (arr = p.exec(s)) {
                var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
                var arr1 = [];
                arr1 = p1.exec(arr[0]);
                if (arr1) {
                    appendscript(arr1[1], '', arr1[2], arr1[3]);
                }
                else {
                    p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
                    arr1 = p1.exec(arr[0]);
                    p1 = /\{(\w+)\(/i;
                    var fnname = p1.exec(arr1[2]);
                    p1 = /\,\s*(\{[^}]*\})/i;
                    var fnparamArr2 = p1.exec(arr1[2]);
                    switch (fnname[1]) {
                        case 'errorhandle_fastpost':
                            p1 = /[^\:\=]{1}([\']{1})([^\']+)\1[\,\)]/i;
                            var fnparamArr1 = p1.exec(arr1[2]);
                            errorhandlefastpost(fnparamArr1[2], fnparamArr2[1]);
                            break;
                        case 'succeedhandle_fastpost':
                            p1 = /[^\:\=]{1}([\']{1})([^\']+)\1[\,\)]/g;
                            var fnparamArr = p1.exec(arr1[2]);
                            fnparamArr1 = p1.exec(arr1[2]);
                            succeedhandlefastpost(fnparamArr[2], fnparamArr1[2], fnparamArr2[1]);
                            break;
                    }
                }
            }
            return s;
        }
        var evalscripts = [];
        function appendscript(src, text, reload, charset) {
            var id = hash(src + text);
            if (!reload && inarray(id, evalscripts)) {
                return;
            }
            if (reload && $('#' + id)[0]) {
                $('#' + id)[0].parentNode.removeChild($('#' + id)[0]);
            }

            evalscripts.push(id);
            var scriptNode = document.createElement('script');
            scriptNode.type = 'text/javascript';
            scriptNode.id = id;
            scriptNode.charset = charset ? charset : (!document.charset ? document.characterSet : document.charset);
            try {
                if (src) {
                    scriptNode.src = src;
                    scriptNode.onloadDone = false;
                    scriptNode.onload = function () {
                        scriptNode.onloadDone = true;
                        JSLOADED[src] = 1;
                    };
                    scriptNode.onreadystatechange = function () {
                        if ((scriptNode.readyState === 'loaded' || scriptNode.readyState === 'complete')
                            && !scriptNode.onloadDone) {
                            scriptNode.onloadDone = true;
                            JSLOADED[src] = 1;
                        }
                    };
                }
                else if (text) {
                    scriptNode.text = text;
                }
                document.getElementsByTagName('head')[0].appendChild(scriptNode);
            }
            catch (e) {}
        }
        function hash(string, length) {
            length = length ? length : 32;
            var start = 0;
            var i = 0;
            var result = '';
            var filllen = length - string.length % length;
            for (i = 0; i < filllen; i++) {
                string += '0';
            }
            while (start < string.length) {
                result = stringxor(result, string.substr(start, length));
                start += length;
            }
            return result;
        }
        function stringxor(s1, s2) {
            var s = '';
            var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var max = Math.max(s1.length, s2.length);
            for (var i = 0; i < max; i++) {
                var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
                s += hash.charAt(k % 52);
            }
            return s;
        }
        function inarray(needle, haystack) {
            if (typeof needle === 'string' || typeof needle === 'number') {
                for (var i in haystack) {
                    if (haystack[i] === needle) {
                        return true;
                    }
                }
            }
            return false;
        }
        $(document).ready(function () {
            if ($('div.pg').length > 0) {
                page.converthtml();
            }
            if ($('.scrolltop').length > 0) {
                scrolltop.init($('.scrolltop'));
            }
            if ($('.popup').length > 0) {
                popup.init();
            }
            if ($('.display').length > 0) {
                display.init();
            }
            if ($('img').length > 0) {
                img.init(1);
            }
            if ($('.atap').length > 0) {
                atap.init();
            }
            if ($('.pullrefresh').length > 0) {
                pullrefresh.init();
            }
            dialog.init();
            formdialog.init();
            redirect.init();
        });

		// showmessage.htm 几秒跳转
        function urlforward(url, sec) {
            setTimeout(function () {
                window.location.href = url;
            }, sec);
        }

		// seccheck.htm 刷新验证码
        function seccheck(params) {
            var paramsArr = params.split('###');
            var sechash = paramsArr[0];
            var ran = paramsArr[1];
            $('.seccodeimg').on('click', function () {
                $('#seccodeverify_' + sechash).attr('value', '');
                var tmprandom = 'S' + Math.floor(Math.random() * 1000);
                $('.sechash').attr('value', tmprandom);
                $('.seccodeimg img').attr('src', 'misc.php?mod=seccode&update=' + ran
                    + '&idhash=' + tmprandom + '&mobile=2');
            });
        }

		// forumdisplay_fastpost.htm
        function fastpostform(params) {
            var paramsArr = params.split('###');
            var text = paramsArr[0];
            var type = paramsArr[1];
            if (type !== 'send_reply_fast') {
                $('#fastpostmessage').on('focus', function () {
                    if (type === 'nologin') {
                        popup.open(text, 'confirm', 'member.php?mod=logging&action=login');
                    }
                    else {
                        popup.open(text, 'alert');
                    }
                    this.blur();
                });
            }
            else {
                $('#fastpostmessage').on('focus', function () {
                    var obj = $(this);
                    if (obj.attr('color') === 'gray') {
                        obj.attr('value', '');
                        obj.removeClass('grey');
                        obj.attr('color', 'black');
                        $('#fastpostsubmitline').css('display', 'block');
                    }
                })
                .on('blur', function () {
                    var obj = $(this);
                    if (obj.attr('value') === '') {
                        obj.addClass('grey');
                        obj.attr('value', text);
                        obj.attr('color', 'gray');
                    }
                });
            }
            $('#fastpostsubmit').on('click', function () {
                var msgobj = $('#fastpostmessage');
                if (msgobj.val() === text) {
                    msgobj.attr('value', '');
                }
                $.ajax({
                    type: 'POST',
                    url: $('#fastpostform form').attr('action') + '&handlekey=fastpost&loc=1&inajax=1',
                    data: $('#fastpostform form').serialize(),
                    dataType: 'xml'
                })
                .success(function (s) {
                    evalscript(s.lastChild.firstChild.nodeValue);
                })
                .error(function () {
                    window.location.href = obj.attr('href');
                    popup.close();
                });
                return false;
            });
            $('#replyid').on('click', function () {
                $(document).scrollTop($(document).height());
                $('#fastpostmessage')[0].focus();
            });
        }
        function succeedhandlefastpost(locationhref, message, param) {
            param = param.replace(new RegExp(/\'/g), '"');
            param = JSON.parse(param);
            var pid = param.pid;
            var tid = param.tid;
            if (pid) {
                $.ajax({
                    type: 'POST',
                    url: 'forum.php?mod=viewthread&tid=' + tid + '&viewpid=' + pid + '&mobile=2',
                    dataType: 'xml'
                })
                .success(function (s) {
                    $('#post_new').append(s.lastChild.firstChild.nodeValue);
                })
                .error(function () {
                    window.location.href = 'forum.php?mod=viewthread&tid=' + tid;
                    popup.close();
                });
            }
            else {
                if (!message) {
                    message = '{lang postreplyneedmod}';
                }
                popup.open(message, 'alert');
            }
            $('#fastpostmessage').attr('value', '');
            if (param.sechash) {
                $('.seccodeimg').click();
            }
        }
        function errorhandlefastpost(message, param) {
            popup.open(message, 'alert');
        }

		// post.htm
        function checkpostvalue(needsubject, needmessage, newthread) {
            if (newthread) {
                $('#needsubject').on('keyup input', function () {
                    var obj = $(this);
                    if (obj.val()) {
                        needsubject = true;
                        if (needmessage) {
                            $('.btn_pn').removeClass('btn_pn_grey').addClass('btn_pn_blue');
                            $('.btn_pn').attr('disable', 'false');
                        }
                    }
                    else {
                        needsubject = false;
                        $('.btn_pn').removeClass('btn_pn_blue').addClass('btn_pn_grey');
                        $('.btn_pn').attr('disable', 'true');
                    }
                });
            }
            $('#needmessage').on('keyup input', function () {
                var obj = $(this);
                if (obj.val()) {
                    needmessage = true;
                    if (needsubject) {
                        $('.btn_pn').removeClass('btn_pn_grey').addClass('btn_pn_blue');
                        $('.btn_pn').attr('disable', 'false');
                    }
                }
                else {
                    needmessage = false;
                    $('.btn_pn').removeClass('btn_pn_blue').addClass('btn_pn_grey');
                    $('.btn_pn').attr('disable', 'true');
                }
            });
            $('#needmessage').on('scroll', function () {
                var obj = $(this);
                if (obj.scrollTop() > 0) {
                    obj.attr('rows', parseInt(obj.attr('rows'), 0) + 2);
                }
            }).scrollTop($(document).height());
        }

		// post.htm
        function postsubmitnewthread(getgeo, networkerrortext) {
            $('#postsubmit').on('click', function () {
                var obj = $(this);
                if (obj.attr('disable') === 'true') {
                    return false;
                }
                obj.attr('disable', 'true').removeClass('btn_pn_blue').addClass('btn_pn_grey');
                popup.open('<img src="' + IMGDIR + '/imageloading.gif">');
                var postlocation = '';
                if (geo.errmsg === '' && geo.loc) {
                    postlocation = geo.longitude + '|' + geo.latitude + '|' + geo.loc;
                }
                $.ajax({
                    type: 'POST',
                    url: $('#postform form').attr('action') + '&geoloc=' + postlocation
                        + '&handlekey=postform&inajax=1',
                    data: $('#postform form').serialize(),
                    dataType: 'xml'
                })
                .success(function (s) {
                    popup.open(s.lastChild.firstChild.nodeValue);
                })
                .error(function () {
                    popup.open(networkerrortext, 'alert');
                });
                return false;
            });
            $(document).on('click', '.del', function () {
                var obj = $(this);
                $.ajax({
                    type: 'GET',
                    url: SITEURL + 'forum.php?mod=ajax&action=deleteattach&inajax=yes&aids[]=' + obj.attr('aid')
                })
                .success(function (s) {
                    obj.parent().remove();
                })
                .error(function () {
                    popup.open('networkerrortext', 'alert');
                });
                return false;
            });
        }
        $(document).on('click', '.popupclosebtn', function () {
            popup.close();
        });
    };
    return customElement;
});
