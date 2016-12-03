/**
 * @author: Qi
 * @date: 2016-12-01
 * @file: mip-html-ajax.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var qi = require('zepto');
    var port = require('viewport');
    var theid = 'Qping';
    var errmsg = {
        r100: '获取配置json失败',
        r101: '配置json格式错误',
        d100: '{name}格式不正确',
        g100: '提交请求出错',
        g101: '获取请求出错',
        g102: 'dig请求出错',
        g103: 'bad请求出错'
    };

    function sethtmlajax(data, the, obj) {
        if (typeof (data.set) === 'undefined') {
            return false;
        }
		// 替换标签
        obj.find('val-input, val-textarea, val-select,val-option').each(function () {
            var thishtml = qi(this).prop('outerHTML');
            qi(this).prop('outerHTML', thishtml.replace(/<(\/?)val-/ig, '<$1'));
        });
		// 按钮事件
        obj.find(data.set.btn).click(function () {
            gethtmlval(data, obj);
            return false;
        });
        // 回车事件
        the.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                gethtmlval(data, obj);
                return false;
            }
        }, false);
    }

	// 获取检测提交数据
    function gethtmlval(data, obj) {
        var valarr = {};
        for (var mycars in data.val) {
            if (data.val.hasOwnProperty(mycars)) {
                var vdata = obj.find(data.val[mycars]);
                var vvalalt = vdata.attr('val-alt') || '';
                var vminlen = vdata.attr('min-len') || 0;
                var vmaxlen = vdata.attr('max-len') || 0;
                var vmsgstr = vvalalt !== '' ? vvalalt : errmsg.d100.replace('{name}', mycars);
                if (vminlen === '*') {
                    if (vdata.val().length === 0) {
                        qalert(vmsgstr);
                        return false;
                    }
                }
                if (vminlen !== 0) {
                    if (vdata.val().length < vminlen) {
                        qalert(vmsgstr);
                        return false;
                    }
                }
                if (vmaxlen !== 0) {
                    if (vdata.val().length > vmaxlen) {
                        qalert(vmsgstr);
                        return false;
                    }
                }
                valarr[mycars] = vdata.val();
            }
        }
        gethtmlajax(data, obj, valarr);
    }

	// 提交数据
    function gethtmlajax(data, obj, valarr) {
        var getUrl = data.add.url;
        var thebtn = obj.find(data.set.btn);
        if (getUrl !== '') {
            getUrl = getUrl.replace('{sid}', data.id);
            var gettype = ishttp(getUrl) ? 'jsonp' : 'json';
            qi.ajax({
                url: getUrl,
                type: data.add.type,
                dataType: gettype,
                data: valarr,
                beforeSend: function () {
                    thebtn.attr('disabled', 'disabled');
                    if (data.set.btnstr !== '') {
                        thebtn.attr('btn-txt', thebtn.val()).val(data.set.btnstr);
                    }
                },
                error: function () {
                    if (data.add.tip === '1') {
                        qalert(errmsg.g100);
                    }
                    thebtn.removeAttr('disabled');
                    if (data.set.btnstr !== '') {
                        thebtn.val(thebtn.attr('btn-txt'));
                    }
                },
                success: function (jsondb) {
                    if (jsondb.success === 'err') {
                        qalert(jsondb.msg);
                    }
					else {
                        var isretext = obj.find(data.res.upval).val();
                        obj.find('[empty=true]').val('');
                        if (jsondb.msg !== '') {
                            qalert(jsondb.msg);
                        }
                        if (isretext === '0') {
                            var newdata = tempview(data.nta, jsondb);
                            obj.find(data.obj.list).append(newdata);
                        }
                        else {
                            var adddata = tempview(data.ntr, jsondb);
                            var addelem = obj.find(data.obj.list).find('#Q' + isretext);
                            addelem.find(data.obj.listre).append(adddata);
                            port.setScrollTop(addelem.offset().top);
                        }
                    }
                    thebtn.removeAttr('disabled');
                    if (data.set.btnstr !== '') {
                        thebtn.val(thebtn.attr('btn-txt'));
                    }
                }
            });
        }
    }

	// 获取数据
    function getcommentdata(data, obj, page) {
        var getUrl = data.get.url;
        if (getUrl !== '') {
            getUrl = getUrl.replace('{id}', data.id).replace('{page}', page);
            var gettype = ishttp(getUrl) ? 'jsonp' : 'json';
            qi.ajax({
                url: getUrl,
                type: data.get.type,
                dataType: gettype,
                error: function () {
                    if (data.get.tip === '1') {
                        qalert(errmsg.g101);
                    }
                    if (typeof (data.obj.nodata) !== 'undefined') {
                        if (data.obj.nodata === '1') {
                            obj.remove();
                        }
                    }
                },
                success: function (jsondb) {
                    if (jsondb.state === 'err') {
                        qalert(jsondb.msg);
                    }
                    else {
                        if (typeof (jsondb[data.obj.arr]) !== 'undefined') {
                            if (jsondb[data.obj.arr].length > 0) {
                                var datalist = '';
                                for (var i = 0; i < jsondb[data.obj.arr].length; i++) {
                                    var thisdata = tempview(data.hta, jsondb[data.obj.arr][i]);
                                    if (thisdata.indexOf('$ReData$') > 0 && data.obj.rearr !== '') {
                                        var redata = '';
                                        for (var ir = 0; ir < jsondb[data.obj.arr][i][data.obj.rearr].length; ir++) {
                                            redata += tempview(data.htr, jsondb[data.obj.arr][i][data.obj.rearr][ir]);
                                        }
                                        thisdata = thisdata.replace('$ReData$', redata);
                                    }
                                    datalist += thisdata;
                                }
                                obj.find(data.obj.list).append(datalist);
                            }
							else {
                                if (typeof (data.obj.nodata) !== 'undefined') {
                                    if (data.obj.nodata === '1') {
                                        obj.remove();
                                    }
                                }
                            }
                        }
                        var iMore = obj.find(data.obj.more);
                        if (typeof (jsondb.size) !== 'undefined'
                        && typeof (jsondb.page) !== 'undefined'
                        && data.obj.more !== '') {
                            var iText = iMore.attr('more-txt') || '';
                            var iSize = jsondb.size;
                            var iPage = jsondb.page;
                            if (iSize > iPage) {
                                if (iText !== '') {
                                    iMore.html(iText);
                                }
                                iMore.show();
                                iMore.attr('on', 'tap:' + theid + '.Qmore(' + (iPage + 1) + ')');
                            }
                            else {
                                iMore.remove();
                            }
                        }
                        else {
                            iMore.remove();
                        }
                    }
                }
            });
        }
    }

    // on点击事件
    function sethtmlclick(data, object, obj) {
        object.addEventAction('Qres', function (event, str) {
            obj.find(data.res.show).show().find(data.res.upint).text(str);
            port.setScrollTop(obj.find(data.set.txt).offset().top);
            setTimeout(function () {
                obj.find(data.set.txt).focus();
            }, 200);
        });
        object.addEventAction('Qreh', function (event, str) {
            obj.find(data.res.show).hide().find('em').text(0);
            setTimeout(function () {
                obj.find(data.set.txt).blur();
            }, 200);
        });
        object.addEventAction('Qrev', function (event, str) {
            obj.find(data.res.upval).val(str);
        });
        object.addEventAction('Qmore', function (event, str) {
            var themore = obj.find(data.obj.more);
            themore.attr('more-txt', themore.html()).html(data.obj.morestr);
            getcommentdata(data, obj, str);
        });
        object.addEventAction('Qdig', function (event, str) {
            var getUrl = data.dig.url;
            if (getUrl !== '') {
                getUrl = getUrl.replace('{sid}', str);
                var gettype = ishttp(getUrl) ? 'jsonp' : 'json';
                qi.ajax({
                    url: getUrl,
                    type: data.dig.type,
                    dataType: gettype,
                    error: function () {
                        if (data.dig.tip === '1') {
                            qalert(errmsg.g102);
                        }
                    },
                    success: function (jsondb) {
                        if (jsondb.success === 'err') {
                            qalert(jsondb.msg);
                        }
						else {
                            qi(event.target).prepend('<i class="Qdig">+1</i>');
                            qi(event.target).find('.Qdig').fadeOut(800, function () {
                                qi(this).remove();
                            });
                            qi(event.target).find('em').text(jsondb.dig);
                            qi(event.target).removeAttr('on');
                        }
                    }
                });
            }
        });
        object.addEventAction('Qbad', function (event, str) {
            var getUrl = data.bad.url;
            if (getUrl !== '') {
                getUrl = getUrl.replace('{sid}', str);
                var gettype = ishttp(getUrl) ? 'jsonp' : 'json';
                qi.ajax({
                    url: getUrl,
                    type: data.bad.type,
                    dataType: gettype,
                    error: function () {
                        if (data.bad.tip === '1') {
                            qalert(errmsg.g103);
                        }
                    },
                    success: function (jsondb) {
                        if (jsondb.success === 'err') {
                            qalert(jsondb.msg);
                        }
						else {
                            qi(event.target).prepend('<i class="Qbad">+1</i>');
                            qi(event.target).find('.Qbad').fadeOut(800, function () {
                                qi(this).remove();
                            });
                            qi(event.target).find('em').text(jsondb.bad);
                            qi(event.target).removeAttr('on');
                        }
                    }
                });
            }
        });
    }

    // 替换模板标签
    function tempview(str, arr) {
        str = str.replace(/{thisid}/gi, theid);
        var sArr = str.match(/{\w+}/gi);
        if (sArr) {
            for (var i = 0; i < sArr.length; i++) {
                var sQrr = sArr[i].match(/{(\w+)}/i);
                str = str.replace(sArr[i], arr[sQrr[1]]);
            }
        }
        return str;
    }

    // 弹出提示层
    function qalert(msg, s) {
        s = s || 1600;
        if (qi('#Qmidalert').length > 0) {
            qi('#Qmidalert').remove();
        }
        qi('body').append('<div id="Qmidalert">' + msg + '</div>');
        setTimeout(function () {
            qi('#Qmidalert').fadeOut(100, function () {
                qi(this).remove();
            });
        }, s);
    }

    // 验证是否http
    function ishttp(str) {
        var orreg = false;
        var isreg = /^(http|https):\/\//i;
        if (isreg.exec(str)) {
            orreg = true;
        }
		else {
            orreg = false;
        }
        return orreg;
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var thisobj = this.element;
        var element = qi(thisobj);
        var elemobj = element.find('script[type$=json]');
        var elemids = element.attr('id');
        if (elemids) {
            theid = elemids;
        }
		else {
            element.attr('id', theid);
        }
        if (elemobj.length === 0) {
            element.html(errmsg.r100);
            return false;
        }
        try {
            var data = JSON.parse(elemobj.text());
        }
        catch (e) {
            element.html(errmsg.r101);
            return false;
        }
        getcommentdata(data, element, 1);
        sethtmlajax(data, thisobj, element);
        sethtmlclick(data, this, element);
    };
    return customElem;
});
