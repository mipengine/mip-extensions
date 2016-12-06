/**
 * @author: Qi
 * @date: 2016-12-01
 * @file: mip-html-ajax.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var qi = require('zepto');
    var viewPort = require('viewport');
    var theID = 'Qping';
    var errMsg = {
        r100: '获取配置json失败',
        r101: '配置json格式错误',
        r102: '获取配置json.val错误',
        d100: '{name}格式不正确',
        g100: '提交请求出错',
        g101: '获取请求出错',
        g102: 'dig请求出错',
        g103: 'bad请求出错'
    };

    function setHtmlAjax(data, the, obj) {
        if (typeof (data.set) === 'undefined') {
            return false;
        }
		// 替换标签
        obj.find('val-input, val-textarea, val-select,val-option').each(function () {
            var thisHtml = qi(this).prop('outerHTML');
            qi(this).prop('outerHTML', thisHtml.replace(/<(\/?)val-/ig, '<$1'));
        });
		// 按钮事件
        obj.find(data.set.btn).click(function () {
            getHtmlVal(data, obj);
            return false;
        });
        // 回车事件
        the.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                getHtmlVal(data, obj);
                return false;
            }
        }, false);
    }

	// 获取检测提交数据
    function getHtmlVal(data, obj) {
        if (typeof (data.val) === 'undefined') {
            qAlert(errMsg.r102);
            return false;
        }
        var valArr = {};
        for (var mycars in data.val) {
            if (data.val.hasOwnProperty(mycars)) {
                var vData = obj.find(data.val[mycars]);
                var vValAlt = vData.attr('val-alt') || '';
                var vMinLen = vData.attr('min-len') || 0;
                var vMaxLen = vData.attr('max-len') || 0;
                var vMsgStr = vValAlt !== '' ? vValAlt : errMsg.d100.replace('{name}', mycars);
                if (vMinLen === '*' && vData.val().length === 0) {
                    qAlert(vMsgStr);
                    return false;
                }
                if (vMinLen !== 0 && vData.val().length < vMinLen) {
                    qAlert(vMsgStr);
                    return false;
                }
                if (vMaxLen !== 0 && vData.val().length > vMaxLen) {
                    qAlert(vMsgStr);
                    return false;
                }
                valArr[mycars] = vData.val();
            }
        }
        getHtmlAjax(data, obj, valArr);
    }

	// 提交数据
    function getHtmlAjax(data, obj, valArr) {
        var getUrl = data.add.url;
        var theBtn = obj.find(data.set.btn);
        if (getUrl !== '') {
            getUrl = getUrl.replace('{sid}', data.id);
            var getType = ishttp(getUrl) ? 'jsonp' : 'json';
            qi.ajax({
                url: getUrl,
                type: data.add.type,
                dataType: getType,
                data: valArr,
                beforeSend: function () {
                    theBtn.attr('disabled', 'disabled');
                    if (data.set.btnstr !== '') {
                        theBtn.attr('btn-txt', theBtn.val()).val(data.set.btnstr);
                    }
                },
                error: function () {
                    if (data.add.tip === '1') {
                        qAlert(errMsg.g100);
                    }
                    theBtn.removeAttr('disabled');
                    if (data.set.btnstr !== '') {
                        theBtn.val(theBtn.attr('btn-txt'));
                    }
                },
                success: function (jsondb) {
                    if (jsondb.success === 'err') {
                        qAlert(jsondb.msg);
                    }
					else {
                        var isretext = obj.find(data.res.upval).val();
                        obj.find('[empty=true]').val('');
                        if (jsondb.msg !== '') {
                            qAlert(jsondb.msg);
                        }
                        if (isretext === '0') {
                            var newData = tempview(data.nta, jsondb);
                            obj.find(data.obj.list).append(newData);
                        }
                        else {
                            var addData = tempview(data.ntr, jsondb);
                            var addElem = obj.find(data.obj.list).find('#Q' + isretext);
                            addElem.find(data.obj.listre).append(addData);
                            viewPort.setScrollTop(addElem.offset().top);
                        }
                    }
                    theBtn.removeAttr('disabled');
                    if (data.set.btnstr !== '') {
                        theBtn.val(theBtn.attr('btn-txt'));
                    }
                }
            });
        }
    }

	// 获取数据
    function getJsonData(data, obj, page) {
        var getUrl = data.get.url;
        if (getUrl !== '') {
            getUrl = getUrl.replace('{id}', data.id).replace('{page}', page);
            var getType = ishttp(getUrl) ? 'jsonp' : 'json';
            qi.ajax({
                url: getUrl,
                type: data.get.type,
                dataType: getType,
                error: function () {
                    if (data.get.tip === '1') {
                        qAlert(errMsg.g101);
                    }
                    if (typeof (data.obj.nodata) !== 'undefined') {
                        if (data.obj.nodata === '1') {
                            obj.remove();
                        }
                    }
                },
                success: function (jsondb) {
                    if (jsondb.state === 'err') {
                        qAlert(jsondb.msg);
                    }
                    else {
                        if (typeof (jsondb[data.obj.arr]) !== 'undefined') {
                            if (jsondb[data.obj.arr].length > 0) {
                                var dataList = '';
                                for (var i = 0; i < jsondb[data.obj.arr].length; i++) {
                                    var thisdata = tempview(data.hta, jsondb[data.obj.arr][i]);
                                    if (thisdata.indexOf('$ReData$') > 0 && data.obj.rearr !== '') {
                                        var redata = '';
                                        for (var ir = 0; ir < jsondb[data.obj.arr][i][data.obj.rearr].length; ir++) {
                                            redata += tempview(data.htr, jsondb[data.obj.arr][i][data.obj.rearr][ir]);
                                        }
                                        thisdata = thisdata.replace('$ReData$', redata);
                                    }
                                    dataList += thisdata;
                                }
                                obj.find(data.obj.list).append(dataList);
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
                                iMore.attr('on', 'tap:' + theID + '.Qmore(' + (iPage + 1) + ')');
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
    function setHtmlClick(data, object, obj) {
        object.addEventAction('Qres', function (event, str) {
            obj.find(data.res.show).show().find(data.res.upint).text(str);
            viewPort.setScrollTop(obj.find(data.set.txt).offset().top);
            var QresOut = setTimeout(function () {
                obj.find(data.set.txt).focus();
                clearTimeout(QresOut);
            }, 200);
        });
        object.addEventAction('Qreh', function (event, str) {
            obj.find(data.res.show).hide().find('em').text(0);
            var QrehOut = setTimeout(function () {
                obj.find(data.set.txt).blur();
                clearTimeout(QrehOut);
            }, 200);
        });
        object.addEventAction('Qrev', function (event, str) {
            obj.find(data.res.upval).val(str);
        });
        object.addEventAction('Qmore', function (event, str) {
            var theMore = obj.find(data.obj.more);
            theMore.attr('more-txt', theMore.html()).html(data.obj.morestr);
            getJsonData(data, obj, str);
        });
        object.addEventAction('Qdig', function (event, str) {
            var getUrl = data.dig.url;
            if (getUrl !== '') {
                getUrl = getUrl.replace('{sid}', str);
                var getType = ishttp(getUrl) ? 'jsonp' : 'json';
                qi.ajax({
                    url: getUrl,
                    type: data.dig.type,
                    dataType: getType,
                    error: function () {
                        if (data.dig.tip === '1') {
                            qAlert(errMsg.g102);
                        }
                    },
                    success: function (jsondb) {
                        if (jsondb.success === 'err') {
                            qAlert(jsondb.msg);
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
                var getType = ishttp(getUrl) ? 'jsonp' : 'json';
                qi.ajax({
                    url: getUrl,
                    type: data.bad.type,
                    dataType: getType,
                    error: function () {
                        if (data.bad.tip === '1') {
                            qAlert(errMsg.g103);
                        }
                    },
                    success: function (jsondb) {
                        if (jsondb.success === 'err') {
                            qAlert(jsondb.msg);
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
        str = str.replace(/{thisid}/gi, theID);
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
    function qAlert(msg, ms) {
        ms = ms || 1600;
        if (qi('.mip-html-ajax-tip').length > 0) {
            qi('.mip-html-ajax-tip').remove();
        }
        qi('body').append('<div class="mip-html-ajax-tip">' + msg + '</div>');
        var msgOut = setTimeout(function () {
            qi('.mip-html-ajax-tip').fadeOut(100, function () {
                qi(this).remove();
            });
            clearTimeout(msgOut);
        }, ms);
    }

    // 验证是否http开头
    function ishttp(str) {
        var orReg = false;
        var isreg = /^(http|https):\/\//i;
        if (isreg.exec(str)) {
            orReg = true;
        }
		else {
            orReg = false;
        }
        return orReg;
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var thisObj = this.element;
        var theElem = qi(thisObj);
        var elemObj = theElem.find('script[type$=json]');
        var elemIds = theElem.attr('id');
        if (elemIds) {
            theID = elemIds;
        }
		else {
            theElem.attr('id', theID);
        }
        if (elemObj.length === 0) {
            theElem.html(errMsg.r100);
            return false;
        }
        try {
            var data = JSON.parse(elemObj.text());
        }
        catch (e) {
            theElem.html(errMsg.r101);
            return false;
        }
        getJsonData(data, theElem, 1);
        setHtmlAjax(data, thisObj, theElem);
        setHtmlClick(data, this, theElem);
    };
    return customElem;
});
