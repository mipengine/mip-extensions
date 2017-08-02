/**
 * @author: Qi
 * @date: 2017-08-02
 * @file: mip-html-ajax.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var qi = require('zepto');
    var viewPort = require('viewport');
    var util = require('util');
    var platform = util.platform;
    var theOs = platform.isAndroid() ? 1 : platform.isIos() ? 2 : 0;
    var theID = 'Qping';
    var isLoad = false;
    var isMore = false;
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
            var getCall = typeof (data.add.call) !== 'undefined' ? data.add.call : '';
            getUrl = getUrl.replace('{sid}', data.id).replace('{os}', theOs);
            qi.ajax({
                url: getUrl,
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: getCall,
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
                        var dataTmp = typeof (data.tmp) !== 'undefined' ? 1 : 0;
                        var dataNta = dataTmp === 1 ? qi(data.tmp.nta).html() : htmlDecode(data.nta);
                        var dataNtr = dataTmp === 1 ? qi(data.tmp.ntr).html() : htmlDecode(data.ntr);
                        var isretext = obj.find(data.res.upval).val();
                        obj.find('[empty=true]').val('');
                        if (jsondb.msg !== '') {
                            qAlert(jsondb.msg);
                        }
                        if (isretext === '0') {
                            var newData = tempView(dataNta, jsondb, data);
                            obj.find(data.obj.list).append(newData);
                        }
                        else {
                            var addData = tempView(dataNtr, jsondb, data);
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
    function getJsonData(data, obj) {
        data.page = typeof (data.page) !== 'undefined' ? data.page : 1;
        var getUrl = data.get.url;
        if (getUrl !== '') {
            var getCall = typeof (data.get.call) !== 'undefined' ? data.get.call : '';
            getUrl = getUrl.replace('{id}', data.id).replace('{page}', data.page).replace('{os}', theOs);
            var pageSet = function (jsondb) {
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
                        iMore.attr('on', 'tap:' + data.theID + '.Qmore(' + (iPage + 1) + ')');
                        data.page = (iPage + 1);
                        data.isMore = true;
                    }
					else {
                        data.isMore = false;
                        iMore.remove();
                    }
                }
				else {
                    data.isMore = false;
                    iMore.remove();
                }
            };
            qi.ajax({
                url: getUrl,
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: getCall,
                error: function () {
                    data.isMore = false;
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
                        data.isMore = false;
                        qAlert(jsondb.msg);
                    }
                    else {
                        if (typeof (jsondb[data.obj.arr]) !== 'undefined') {
                            var arrData = jsondb[data.obj.arr];
                            var arrLength = arrData.length;
                            if (arrLength > 0) {
                                var dataTmp = typeof (data.tmp) !== 'undefined' ? 1 : 0;
                                var dataHta = dataTmp === 1 ? qi(data.tmp.hta).html() : htmlDecode(data.hta);
                                var dataHtr = dataTmp === 1 ? qi(data.tmp.htr).html() : htmlDecode(data.htr);
                                var dataList = '';
                                if (typeof (data.obj.arrs) !== 'undefined') {
                                    arrData = randomArray(arrData);
                                }
                                if (!isNaN(data.obj.arrn)) {
                                    arrLength = data.obj.arrn >= arrLength ? arrLength : data.obj.arrn;
                                }
                                for (var i = 0; i < arrLength; i++) {
                                    var thisdata = tempView(dataHta, arrData[i], data);
                                    if (thisdata.indexOf('$ReData$') > 0 && data.obj.rearr !== '') {
                                        var redata = '';
                                        var rearrLen = arrData[i][data.obj.rearr].length;
                                        if (typeof (data.obj.rearrs) !== 'undefined') {
                                            arrData[i][data.obj.rearr] = randomArray(arrData[i][data.obj.rearr]);
                                        }
                                        if (!isNaN(data.obj.rearrn)) {
                                            rearrLen = data.obj.rearrn >= rearrLen ? rearrLen : data.obj.rearrn;
                                        }
                                        for (var ir = 0; ir < rearrLen; ir++) {
                                            redata += tempView(dataHtr, arrData[i][data.obj.rearr][ir], data);
                                        }
                                        thisdata = thisdata.replace('$ReData$', redata);
                                    }
                                    dataList += thisdata;
                                }
                                obj.find(data.obj.list).append(dataList);
                                data.isLoad = false;
                            }
							else {
                                if (typeof (data.obj.nodata) !== 'undefined') {
                                    data.isMore = false;
                                    if (data.obj.nodata === '1') {
                                        obj.remove();
                                    }
                                }
                            }
                            pageSet(jsondb);
                        }
						else {
                            data.isMore = false;
                            if (data.obj.nodata === '1') {
                                obj.remove();
                            }
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
            theMore.attr('more-txt', theMore.html()).html(htmlDecode(data.obj.morestr));
            getJsonData(data, obj);
        });
        object.addEventAction('Qdig', function (event, str) {
            var getUrl = data.dig.url;
            if (getUrl !== '') {
                var getCall = typeof (data.dig.call) !== 'undefined' ? data.dig.call : '';
                getUrl = getUrl.replace('{sid}', str).replace('{os}', theOs);
                qi.ajax({
                    url: getUrl,
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: getCall,
                    error: function () {
                        if (data.dig.tip === '1') {
                            qAlert(errMsg.g102);
                        }
                    },
                    success: function (jsondb) {
                        if (jsondb.success === 'err') {
                            if (data.dig.tip === '1') {
                                qAlert(jsondb.msg);
                            }
                        }
						else {
                            if (data.dig.tip === '1') {
                                qi(event.target).prepend('<i class="Qdig">+1</i>');
                                qi(event.target).find('.Qdig').fadeOut(800, function () {
                                    qi(this).remove();
                                });
                                qi(event.target).find('em').text(jsondb.dig);
                            }
                        }
                        qi(event.target).removeAttr('on');
                    }
                });
            }
        });
        object.addEventAction('Qbad', function (event, str) {
            var getUrl = data.bad.url;
            if (getUrl !== '') {
                var getCall = typeof (data.bad.call) !== 'undefined' ? data.bad.call : '';
                getUrl = getUrl.replace('{sid}', str).replace('{os}', theOs);
                qi.ajax({
                    url: getUrl,
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: getCall,
                    error: function () {
                        if (data.bad.tip === '1') {
                            qAlert(errMsg.g103);
                        }
                    },
                    success: function (jsondb) {
                        if (jsondb.success === 'err') {
                            if (data.bad.tip === '1') {
                                qAlert(jsondb.msg);
                            }
                        }
						else {
                            if (data.bad.tip === '1') {
                                qi(event.target).prepend('<i class="Qbad">+1</i>');
                                qi(event.target).find('.Qbad').fadeOut(800, function () {
                                    qi(this).remove();
                                });
                                qi(event.target).find('em').text(jsondb.bad);
                            }
                        }
                        qi(event.target).removeAttr('on');
                    }
                });
            }
        });
        if (typeof (data.obj.auto) !== 'undefined') {
            if (data.obj.auto === '1') {
                var autoFoot = typeof (data.obj.autofoot) !== 'undefined' ? data.obj.autofoot : 50;
                qi(window).scroll(function () {
                    var dotHeight = viewPort.getScrollHeight();
                    var winHeight = viewPort.getHeight();
                    var winScroll = viewPort.getScrollTop();
                    if (winScroll > (dotHeight - winHeight - autoFoot)) {
                        if (data.isMore && !data.isLoad) {
                            var theMore = obj.find(data.obj.more);
                            theMore.attr('more-txt', theMore.html()).html(htmlDecode(data.obj.morestr));
                            data.isLoad = true;
                            getJsonData(data, obj);
                        }
                    }
                });
            }
        }
    }

	// 自定义解码
    function htmlDecode(str) {
        var strTemp = str;
        strTemp = strTemp.replace(/\[\[/g, '<');
        strTemp = strTemp.replace(/\]\]/g, '>');
        strTemp = strTemp.replace(/\|\|/g, '/');
        strTemp = strTemp.replace(/\:\:/g, '"');
        strTemp = strTemp.replace(/\;\;/g, '\'');
        strTemp = strTemp.replace(/\+\+/g, ' ');
        return strTemp;
    }

    // decodeURI解码
    function jsonDecode(str) {
        try {
            str = decodeURI(str);
        }
        catch (err) {
        }
        return str;
    }

    // 替换标签
    function tempView(str, arr, data) {
        str = str.replace(/{thisid}/gi, data.theID);
        var sArr = str.match(/{\w+}/gi);
        if (sArr) {
            for (var i = 0; i < sArr.length; i++) {
                var sQrr = sArr[i].match(/{(\w+)}/i);
                if (typeof (arr[sQrr[1]]) === 'string') {
                    str = str.replace(sArr[i], jsonDecode(arr[sQrr[1]]));
                }
                else {
                    str = str.replace(sArr[i], arr[sQrr[1]]);
                }
            }
        }
        return str;
    }

    function randomArray(arr) {
        var setArray = [];
        for (var index in arr) {
            if (arr.hasOwnProperty(index)) {
                setArray.push(arr[index]);
            }
        }
        var getArray = [];
        for (var i = 0; i < arr.length; i++) {
            if (setArray.length > 0) {
                var arrIndex = Math.floor(Math.random() * setArray.length);
                getArray[i] = setArray[arrIndex];
                setArray.splice(arrIndex, 1);
            }
            else {
                break;
            }
        }
        return getArray;
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
            data.theID = theID;
            data.isLoad = isLoad;
            data.isMore = isMore;
        }
        catch (e) {
            theElem.html(errMsg.r101);
            return false;
        }
        getJsonData(data, theElem);
        setHtmlAjax(data, thisObj, theElem);
        setHtmlClick(data, this, theElem);
    };
    return customElem;
});
