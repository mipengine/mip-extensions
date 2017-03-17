define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();
    window.stockEntity = {};
    window.common = {
        //判断ios版本号是否是ios4，true表示是
        gt_iOS4: function () {
            if ((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
                return Boolean(navigator.userAgent.match(/OS [1-4]_\d[_\d]* like Mac OS X/i));
            } else {
                return false;
            }
        },

        //改变节点的className
        setClass: function (obj, classname) {
            if (obj && typeof obj == "string" && classname && typeof classname == "string") {
                document.getElementById(obj) ? document.getElementById(obj).setAttribute("class", classname) : "";
                document.getElementById(obj) ? document.getElementById(obj).setAttribute("className", classname) : ""
            }
            if (typeof obj == "object" && typeof classname == "object") {
                for (var i = 0; i < obj.length; i++) {
                    obj[i] ? obj[i].setAttribute("class", classname[i]) : "";
                    obj[i] ? obj[i].setAttribute("className", classname[i]) : ""
                }
            }
            if (typeof obj == "object" && classname && typeof classname == "string") {
                obj ? obj.setAttribute("class", classname) : "";
                obj ? obj.setAttribute("className", classname) : ""
            }
        },

        //错误提示
        showErrorMessage: function (txt) {
            var tipsBoxNode = document.getElementById("pttip");
            var tipsTextNode = document.getElementById("pttip-msg");
            var tipIconNode = document.getElementById("tip_icon");
            tipIconNode.className = "pttip-icon";
            tipsTextNode.innerHTML = txt;
            tipsBoxNode.style.display = "";
            setTimeout(function () { tipsBoxNode.style.display = "none"; }, 1000);
        },
        //成功提示
        showSuccessMessage: function (txt) {
            var tipsBoxNode = document.getElementById("pttip");
            var tipsTextNode = document.getElementById("pttip-msg");
            var tipIconNode = document.getElementById("tip_icon");
            tipIconNode.className = "pttipok-icon";
            tipsTextNode.innerHTML = txt;
            tipsBoxNode.style.display = "";
            setTimeout(function () { tipsBoxNode.style.display = "none"; }, 1000);
        },

        //文字闪动
        setFlash: function (obj, cls1, cls2) {
            setTimeout(function () { common.setClass(obj, cls1) }, 800);
            setTimeout(function () { common.setClass(obj, cls2) }, 1000);
            setTimeout(function () { common.setClass(obj, cls1) }, 1200);
            setTimeout(function () { common.setClass(obj, cls2) }, 1400);
        },


        //过万的按万  过亿的按亿单位，然后显示时候小数点前数字两个以内的保留两位小数，三个的保留一个，四个的不保留小数点
        getValueWithUnit: function (val) {
            var unit = "";
            if (isNaN(val)) {
                return "-";
            } else if (val >= 1e4) {
                val = parseFloat(val);
                if (val >= 1e8) {
                    val = val / 1e8;
                    var valInt = parseInt(val);
                    if (valInt >= 1e3) {
                        val = valInt;
                    } else if (valInt >= 100) {
                        val = val.toFixed(1);
                    } else {
                        val = val.toFixed(2);
                    }
                    unit = "亿";
                } else {
                    val = val / 1e4;
                    var valInt = parseInt(val);
                    if (valInt >= 1e3) {
                        val = valInt;
                    } else if (valInt >= 100) {
                        val = val.toFixed(1);
                    } else {
                        val = val.toFixed(2);
                    }
                    unit = "万";
                }
                return val + unit;
            } else {
                return val;
            }
        },

        //过万的按万  过亿的按亿单位，然后显示时候小数点前数字两个以内的保留两位小数，三个的保留一个，四个的不保留小数点
        getValueWithUnitForHK: function (val) {
            var unit = "";
            if (isNaN(val)) {
                return "-";
            } else if (val >= 1e4) {
                val = parseFloat(val);
                if (val >= 1e8) {
                    val = val / 1e8;
                    var valInt = parseInt(val);
                    if (valInt >= 1e3) {
                        val = valInt;
                    } else if (valInt >= 100) {
                        val = val.toFixed(1);
                    } else {
                        val = val.toFixed(1);
                    }
                    unit = "亿";
                } else {
                    val = val / 1e4;
                    var valInt = parseInt(val);
                    if (valInt >= 1e3) {
                        val = valInt;
                    } else if (valInt >= 100) {
                        val = val.toFixed(1);
                    } else {
                        val = val.toFixed(1);
                    }
                    unit = "万";
                }
                return val + unit;
            } else {
                return val;
            }
        },


        //过亿的加亿，并对小数点进行处理，资金流数字处理
        getIntValue: function (val) {
            var unit = "";
            if (isNaN(val)) {
                return "-";
            } else {
                val = parseFloat(val);
                if (val >= 1e8) {
                    val = val / 1e8;
                    var valInt = parseInt(val);
                    if (valInt >= 1e3) {
                        val = valInt;
                    } else if (valInt >= 100) {
                        val = val.toFixed(1);
                    } else {
                        val = val.toFixed(2);
                    }
                    unit = "亿";
                    return val + unit;
                } else {
                    return val.toFixed(0);
                }
            }
        },
        //过万的加万
        getCjmxValue: function (val) {
            var unit = "";
            if (isNaN(val)) {
                return "-";
            } else {
                val = parseFloat(val);
                if (val >= 1e4) {
                    val = val / 1e4;
                    return val.toFixed(0) + "万";
                } else {
                    return val;
                }
            }
        },
        //获取季度中文
        getJiduByDate: function (date) {
            var jidu = "";
            var m = date.split('-')[1];
            switch (m) {
                case "03":
                    jidu = "(一)";
                    break;
                case "06":
                    jidu = "(二)";
                    break;
                case "09":
                    jidu = "(三)";
                    break;
                case "12":
                    jidu = "(四)";
                    break;
            }
            return jidu;
        },
        //获取成交明细html
        getTradeDetails: function (closedPrice, details, count) {
            var html = [];
            if (details.length == 0 || (details.length == 1 && details[0] == "-")) {
                return "<tr><td>-</td><td>-</td><td>-</td></tr>";
            }
            for (var i = 0; i < details.length; i++) {
                if (i >= count) {
                    break;
                }
                var data = details[i].split(',');
                html.push("<tr>");
                if (count > 10) {
                    html.push("<td>" + data[0] + "</td>");
                } else {
                    html.push("<td>" + data[0].substring(0, data[0].length - 3) + "</td>");
                }
                var val = data[1] * 1;
                var valColor = "";
                if (val > closedPrice) {
                    valColor = " class=\"font_red\"";
                } else if (val < closedPrice) {
                    valColor = " class=\"font_green\"";
                }
                html.push("<td" + valColor + ">" + data[1] + "</td>");
                var direction = "";
                var cjColor = "";
                val = data[3] * 1;
                if (val == 1) {
                    cjColor = " class=\"font_red\"";
                    direction = "↑";
                } else if (val == -1) {
                    cjColor = " class=\"font_green\"";
                    direction = "↓";
                }
                if (count > 10) {
                    html.push("<td" + cjColor + ">" + data[2] + direction + "</td>");
                } else {
                    html.push("<td" + cjColor + ">" + common.getCjmxValue(data[2]) + direction + "</td>");
                }
                html.push("</tr>");
            }
            return html.join("");
        },
        //获取期权成交明细html
        getOptionTradeDetails: function (closedPrice, details, count) {
            var dic = ["双开", "双平", "多换", "多开", "多平", "空换", "空开", "空平", "未知"];
            //双开：红
            //空换：绿
            //多换：红
            //多平：绿
            //空平：绿
            //双平：红
            //空开：绿
            //多开：红
            var dicClass = ["font_red", "font_red", "font_red", "font_red", "font_green", "font_green", "font_green", "font_green", ""];
            var html = [];
            if (details.length == 0 || (details.length == 1 && details[0] == "-")) {
                return "<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
            }
            for (var i = 0; i < details.length; i++) {
                if (i >= count) {
                    break;
                }
                var data = details[i].split(',');
                html.push("<tr>");
                if (count > 10) {
                    html.push("<td>" + data[0] + "</td>");
                } else {
                    html.push("<td>" + data[0].substring(0, data[0].length - 3) + "</td>");
                }
                var val = data[1] * 1;
                var valColor = "";
                if (val > closedPrice) {
                    valColor = " class=\"font_red\"";
                } else if (val < closedPrice) {
                    valColor = " class=\"font_green\"";
                }
                html.push("<td" + valColor + ">" + data[1] + "</td>");
                var direction = "";
                var cjColor = "";
                val = data[3] * 1;
                if (val == 1) {
                    cjColor = " class=\"font_red\"";
                    direction = "↑";
                } else if (val == -1) {
                    cjColor = " class=\"font_green\"";
                    direction = "↓";
                }
                if (count > 10) {
                    html.push("<td" + cjColor + ">" + data[2] + direction + "</td>");
                } else {
                    html.push("<td" + cjColor + ">" + getCjmxValue(data[2]) + direction + "</td>");
                }
                html.push("<td>" + data[4] + "</td>");
                var dicIndex = data[5] == -1 ? 8 : data[5];
                html.push("<td class=\"" + dicClass[dicIndex] + "\">" + dic[dicIndex] + "</td>");

                html.push("</tr>");
            }
            return html.join("");
        },
        //五档盘口单行
        getSingleFivePan: function (index, closedPrice, data) {
            var html = [];
            html.push("<tr>");
            html.push("<td>" + index + "</td>");
            var val = data[0] * 1;
            var valColor = "";
            if (val > closedPrice) {
                valColor = " class=\"font_red\"";
            } else if (val < closedPrice) {
                valColor = " class=\"font_green\"";
            }
            html.push("<td" + valColor + ">" + data[0] + "</td>");
            html.push("<td>" + data[1] + "</td>");
            html.push("</tr>");
            return html.join("");
        },
        //获取五档盘口html
        getFivePan: function (closedPrice, details) {
            var sellhtml = [];
            var sellIndex = 5;
            var buyhtml = [];
            var buyIndex = 1;
            for (var i = 0; i < 5; i++) {
                var data = details[i].split(',');
                buyhtml.push(common.getSingleFivePan(buyIndex++, closedPrice, data));
            }
            for (var i = details.length - 1; i >= details.length - 5; i--) {
                var data = details[i].split(',');
                sellhtml.push(common.getSingleFivePan(sellIndex--, closedPrice, data));
            }
            return [sellhtml.join(""), buyhtml.join("")];
        },
        //获取正值，Math.abs会把-1.0变成1，这个方法是只把-去掉
        getZhengNumber: function (n) {
            n = n.toString();
            if (n.indexOf("-") == 0) {
                n = n.substring(1);
            }
            return n;
        },
        //触发element的eventName事件
        trigger: function (element, eventName) {
            if (typeof element == "undefined" || element == null) return;
            if (document.all) {
                element[eventName]();
            } else {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent(eventName, true, true);
                element.dispatchEvent(evt);
            }
        },
        //Cookie Common Class
        getCookie: function (key) {
            var result = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)"));
            return result != null ? unescape(decodeURI(result[2])) : null;
        },
        //通过cookie:pi获取uid
        getUid: function () {
            var webPi = common.getCookie("pi");
            if (webPi && webPi.split(';').length >= 3) {
                var uid = webPi.split(';')[0];
                if (uid.length == 16) {
                    return uid;
                }
            }
            return "";
        },
        //滚动到的位置
        getScrollTop: function () {
            return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        },
        //文档的总高度
        getScrollHeight: function () {
            var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if (document.body) {
                bodyScrollHeight = document.body.scrollHeight;
            }
            if (document.documentElement) {
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        },
        //窗口高度
        getWindowHeight: function () {
            var windowHeight = 0;
            if (document.compatMode == "CSS1Compat") {
                windowHeight = document.documentElement.clientHeight;
            } else {
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
        },
        //获得当前窗口的大小
        getWindowSize: function () {
            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            return ([myWidth, myHeight]);
        },
        intval: function (v) {
            v = parseInt(v);
            return isNaN(v) ? 0 : v;
        },
        //元素位置
        getPos: function (e) {
            var l = 0;
            var t = 0;
            var w = common.intval(e.style.width);
            var h = common.intval(e.style.height);
            var wb = e.offsetWidth;
            var hb = e.offsetHeight;
            while (e.offsetParent) {
                l += e.offsetLeft + (e.currentStyle ? common.intval(e.currentStyle.borderLeftWidth) : 0);
                t += e.offsetTop + (e.currentStyle ? common.intval(e.currentStyle.borderTopWidth) : 0);
                e = e.offsetParent;
            }
            l += e.offsetLeft + (e.currentStyle ? common.intval(e.currentStyle.borderLeftWidth) : 0);
            t += e.offsetTop + (e.currentStyle ? common.intval(e.currentStyle.borderTopWidth) : 0);
            return { x: l, y: t, w: w, h: h, wb: wb, hb: hb };
        },

        getLocalStorage: function (item) {

            var data = window.localStorage[item];

            window.localStorage.removeItem(item);

            return data;

        },
        //根据股票代码获取市场
        getMkt: function (sc) {
            var i = sc.substring(0, 1);
            var j = sc.substring(0, 3);
            if (i == "5" || i == "6" || i == "9") {
                return "1"; //上证股票
            } else {
                if (j == "009" || j == "126" || j == "110") {
                    return "1"; //上证股票
                } else {
                    return "2"; //深圳股票
                }
            }
        },
        jsonP: function (url, successMethod, errorMethod) {
            $.ajax({
                url: url,
                dataType: "jsonp",
                jsonpCallback: "callback",
                success: successMethod,
                error: errorMethod
            });
        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        //判断手机型号
        getPhoneType: function () {
            var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
                return "android";
            } else if (u.indexOf('iPhone') > -1) {//苹果手机
                return "iphone";
            } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
                return "winphone";
            }
            return "";
        },
        loadJS: function (src, cb) {
            "use strict";
            var ref = document.getElementsByTagName("script")[0];
            var script = document.createElement("script");
            script.src = src;
            script.async = true;
            ref.parentNode.insertBefore(script, ref);
            if (cb && typeof (cb) === "function") {
                script.onload = cb;
            }
            return script;
        }
    }
    window.canvasObj = {
        canvasWidth: document.body.offsetWidth - 20,
        canvasHeight: 270,
        initial: function () {
            //绑定点击日K月K事件
            var tabs = document.querySelectorAll("#pic_plans_box td");
            var ems = document.querySelectorAll(".emchart .em-tab");
            var k0, k1, k2, k3, k4, current_tab;
            [].forEach.call(tabs, function (tab) {
                tab.addEventListener("click", function (event) {
                    var code = window.stockEntity.stockId;
                    [].forEach.call(tabs, function (tab) {
                        tab.className = tab.className.replace(" hover", "");
                    });
                    [].forEach.call(ems, function (em) {
                        em.style.display = "none";
                    });
                    $("#pic_plans_box tr td").removeClass("hover");
                    this.className = this.className + " hover";
                    var target_id = this.target || this.getAttribute("target");
                    document.getElementById(target_id).style.display = "block";
                    var canvas = document.getElementById(target_id).getElementsByTagName("canvas");

                    if (window.stockEntity.StockType == "HK") {

                        if (target_id == "emchart-0") {
                            canvasObj.canvasWidth = document.body.offsetWidth * 0.55;
                            if ($(".detail-five").length > 0) {
                                $(".detail-five").show();
                            } else {
                                $(".detail-ten").show();
                                $(".eq-container").show();
                            }
                        } else {
                            canvasObj.canvasWidth = document.body.offsetWidth - 20;
                            if ($(".detail-five").length > 0) {
                                $(".detail-five").hide();
                            } else {
                                $(".detail-ten").hide();
                                $(".eq-container").hide();
                            }
                        }
                    }

                    if (window.stockEntity.StockType == "AB") {
                        if (target_id == "emchart-0") {
                            canvasObj.canvasWidth = document.body.offsetWidth * 0.58;
                            $(".wdmxBox").show();
                        } else {
                            canvasObj.canvasWidth = document.body.offsetWidth - 20;
                            $(".wdmxBox").hide();
                        }
                    }

                    if (canvas.length < 1) {
                        if (target_id == "emchart-1") {
                            current_tab = k1 = new EmchartsMobileK({
                                dpr: 2,
                                type: "DK",
                                code: code == "" ? "3000592" : code,
                                container: target_id,
                                "width": canvasObj.canvasWidth * 1.02,
                                "height": canvasObj.canvasHeight,
                                delaytouch: true
                            });
                            k1.draw();
                        }

                        if (target_id == "emchart-2") {
                            current_tab = k2 = new EmchartsMobileK({
                                dpr: 2,
                                type: "WK",
                                code: code == "" ? "3000592" : code,
                                container: target_id,
                                "width": canvasObj.canvasWidth * 1.02,
                                "height": canvasObj.canvasHeight,
                                delaytouch: true
                            });
                            k2.draw();
                        }

                        if (target_id == "emchart-3") {
                            current_tab = k3 = new EmchartsMobileK({
                                dpr: 2,
                                type: "MK",
                                code: code == "" ? "3000592" : code,
                                container: target_id,
                                "width": canvasObj.canvasWidth * 1.02,
                                "height": canvasObj.canvasHeight,
                                delaytouch: true
                            });
                            k3.draw();
                        }

                    } else {

                        if (target_id == "emchart-0") {
                            current_tab = k0;
                        }

                        if (target_id == "emchart-1") {
                            current_tab = k1;
                        }

                        if (target_id == "emchart-2") {
                            current_tab = k2;
                        }

                        if (target_id == "emchart-3") {
                            current_tab = k3;
                        }
                    }

                });


                //setInterval(k0.draw, 5000);

            });
            current_tab = new EmchartsMobileTime({
                dpr: 2,
                code: window.stockEntity.stockId,
                container: "emchart-0",
                "width": canvasObj.canvasWidth * 1.02,
                "height": 270,
                delaytouch: true
            });
            current_tab.draw();
        }
    }
    window.canvas = canvasObj;
    window.loadstockdata = {
        nodeClass: [
            { "key": "market", "status": 0 }, //0
            { "key": "code", "status": 0 },
            { "key": "name", "status": 0 },
            { "key": "jkj", "status": 3 },
            { "key": "zsj", "status": 1 },
            { "key": "xj", "status": 2 }, //5
            { "key": "zde", "status": 2 },
            { "key": "zdf", "status": 2 },
            { "key": "hsl", "status": 1 },
            { "key": "zgj", "status": 3 },
            { "key": "zdj", "status": 3 }, //10
            { "key": "cjl", "status": 4 },
            { "key": "cje", "status": 4 },
            { "key": "ztj", "status": 3 },
            { "key": "dtj", "status": 3 },
            { "key": "wp", "status": 6 }, //15
            { "key": "np", "status": 6 },
            { "key": "lb", "status": 1 },
            { "key": "syl", "status": 1 },
            { "key": "sylj", "status": 1 },
            { "key": "zgb", "status": 4 }, //20
            { "key": "zsz", "status": 4 },
            { "key": "ltgb", "status": 4 },
            { "key": "ltsz", "status": 4 },
            { "key": "sjl", "status": 1 },
            { "key": "mgsy", "status": 1 }, //25
            { "key": "mgsysj", "status": 5 },
            { "key": "uptime", "status": 0 },
            { "key": "status", "status": 0 },
            { "key": "xs", "status": 1 },
            { "key": "jzc", "status": 1 }
        ],

        redColor: "#e30000",
        greenColor: "#007130",
        stockPriceTemp: "",//股票价格变量，用于判断股价是否改变
        //柱状图
        columnData: [["超大", 0], ["大单", 0], ["中单", 0], ["小单", 0]],
        chartContainer: document.getElementById("chartContainer"),
        //柱状图是否初始化
        columnCanvasIsInit: false,
        loadHqData: function loadHqData() {

            common.jsonP("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=" + window.stockEntity.stockId + "&sty=MPICT&st=z&sr=&p=&ps=&cb=?&js=([[(x)]])&token=7bc05d0d4c3c22ef9fca8c2a912d779c", function (json) {
                if (json && json[0]) {

                    var benData = json[0][0].split(',');
                    var baseData = [];
                    for (var i = 0; i <= 31; i++) {
                        if (i == 28) continue;
                        baseData.push(benData[i]);
                    }

                    var closedPrice = baseData[4];
                    var price = baseData[5] * 1;

                    //设置闪光动画效果 css3
                    if (loadstockdata.stockPriceTemp && price != loadstockdata.stockPriceTemp) {
                        $("#xj_box,#zd_box").addClass("twinkle");
                        setTimeout(function () {
                            $("#xj_box,#zd_box").removeClass("twinkle");
                        }, 2000);
                    }

                    loadstockdata.stockPriceTemp = baseData[5] == "-" ? closedPrice * 1 : baseData[5] * 1;
                    loadstockdata.loadBasicData(baseData);
                    loadstockdata.getRelatedStock(json);

                    if (window.stockEntity.StockType == "AB") {
                        loadstockdata.getPankouData(benData, closedPrice);
                        $(".zf").html(benData[61]);
                    }

                    //阶段涨幅，只有人民币中间价需要

                    if (window.stockEntity.StockType == "CNYRATE" || window.stockEntity.StockType == "NYSE" || window.stockEntity.StockType == "AMEX" || window.stockEntity.StockType == "NASDAQ") {
                        loadstockdata.loadJdzfData();
                    }

                    //港股AH股报价
                    if (window.stockEntity.StockType == "HK") {

                        //停牌
                        if (benData[33] == "-1") {
                            return;
                        }
                        loadstockdata.loadAHData();
                        //昨收价
                        window.ZSJ = baseData[4];
                        //加载经济队列和分时
                        loadstockdata.loadEncomic(benData[33]);
                        loadstockdata.loadFenShi(benData[34], benData[37]);

                        if (benData[37] == "港股通") {
                            $("#hgt-logo").show();
                        } else {
                            $("#hgt-logo").hide();
                        }

                        $(".sxl").html(benData[40]);
                        $(".roe").html(benData[41] + "%");
                        $(".jj").html(benData[38]);
                        $(".gz").html(common.getValueWithUnit(benData[23]));
                        $(".ggb").html(common.getValueWithUnit(benData[22]));
                    }

                    //国际期货
                    if (window.stockEntity.StockType == "FUTURE") {
                        //loadstockdata.loadFutureData();
                        $(".ccl").html(common.getValueWithUnit(benData[32]));
                        $(".jjs").html(benData[36]);
                        $(".zjs").html(benData[31]);
                        $(".np").html(common.getValueWithUnit(benData[16]));
                        $(".wp").html(common.getValueWithUnit(benData[15]));
                        $(".zjs").html(benData[31]);
                        $(".rz").html(common.getValueWithUnit(benData[38]));
                        $(".kp").html(benData[39]);
                        $(".jj").html(benData[40]);
                        //$(".cc").html((benData[37] / 1000000).toFixed(2) + "万");
                        $(".byj").html(benData[33]);
                        $(".syj").html(benData[34]);
                    }

                    //新三板
                    if (window.stockEntity.StockType == "SANBAN") {
                        $(".jlr").html(benData[59]);
                        $(".jj").html(benData[57]);
                        $(".yysr").html(benData[58]);
                    }

                    //板块
                    if (window.stockEntity.StockType == "BK") {
                        var zdp = benData[28].split("|");

                        $(".szjs").html(zdp[0]);
                        $(".ppjs").html(zdp[1]);
                        $(".xdjs").html(zdp[2]);
                    }

                    //期指国债
                    if (window.stockEntity.StockType == "STOCKINDEXFUTURE") {
                        $(".ccl").html(common.getValueWithUnit(benData[32]));
                        $(".zjs").html(benData[31]);
                        var type = benData[41];
                        var id = 0;

                        switch (type) {
                            case "上证50":
                                {
                                    $(".futureType").html("上证50");
                                    id = "0000161";
                                    break;
                                }
                            case "沪深300":
                                {
                                    $(".futureType").html("沪深300");
                                    id = "0003001";
                                    break;
                                }
                            case "中证500":
                                {
                                    $(".futureType").html("中证500");
                                    id = "0009051";
                                    break;
                                }
                            default:
                        }

                        //不是国债的话，需要加载标的信息
                        if (id != 0) {
                            common.jsonP("http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=" + id + "&sty=SMLFD&st=z&sr=&p=&ps=&cb=?&js=((x))&token=7bc05d0d4c3c22ef9fca8c2a912d779c", function (json) {
                                var item = json.split(',');

                                $(".future_xj").html(item[3]);
                                $(".future_zdf").html(item[5]);
                                if (item[5].indexOf("-") != 0) {
                                    $(".future_zdf,.future_xj").addClass("font_red");
                                } else {
                                    $(".future_zdf,.future_xj").addClass("font_green");
                                }
                                var xj = benData[5];
                                var currentxj = item[3];
                                var value = (xj - currentxj).toFixed(2);
                                $(".future_qxc").html(value);
                                if (value.indexOf("-") != 0) {
                                    $(".future_qxc").addClass("font_red");
                                } else {
                                    $(".future_qxc").addClass("font_green");
                                }
                                $(".hq_info").show();
                            });
                        } else {
                            $(".hq_info").hide();
                        }
                    }
                }
            }, function () {
                //alert('网络不给力,请点击重新加载！');
            });
        },

        loadFenShi: function (data, ganggutong) {

            var dataArray = data.split("|");

            if ($("#wdpks-ten").length <= 0) {
                for (var i = 5; i < dataArray.length - 5; i++) {
                    var itemList = dataArray[i].split("~");
                    var color = "";
                    if (window.ZSJ > itemList[0]) {
                        color = "font_green";
                    } else if (window.ZSJ < itemList[0]) {
                        color = "font_red";
                    }

                    var objBug, objSell;
                    objSell = $("#wdpkb tr");
                    objBug = $("#wdpks tr");
                    var tr = objBug.eq(i - 5).find("td");
                    var tr1 = objSell.eq(i - 10).find("td");

                    //五档判断是否为港股通，如果是港股通就显示一手
                    if (ganggutong == "港股通") {
                        if (i != 10 && i != 9) {
                            continue;
                        }
                    } else {
                        continue;
                    }

                    if (i < 10) {
                        $(tr).eq(1).html(parseFloat(itemList[0]).toFixed(3));
                        $(tr).eq(1).addClass(color);
                        $(tr).eq(2).html(common.getValueWithUnitForHK(itemList[1]));
                        $(tr).eq(3).html("(" + itemList[2] + ")");
                    } else {
                        $(tr1).eq(1).html(parseFloat(itemList[0]).toFixed(3));
                        $(tr1).eq(1).addClass(color);
                        $(tr1).eq(2).html(common.getValueWithUnitForHK(itemList[1]));
                        $(tr1).eq(3).html("(" + itemList[2] + ")");
                    }
                }

            } else {
                for (var i = 0; i < dataArray.length; i++) {
                    var itemList = dataArray[i].split("~");
                    var color = "";
                    if (window.ZSJ > itemList[0]) {
                        color = "font_green";
                    } else if (window.ZSJ < itemList[0]) {
                        color = "font_red";
                    }

                    var objBug, objSell;
                    objSell = $("#wdpkb-ten tr");
                    objBug = $("#wdpks-ten tr");
                    var tr = objBug.eq(i).find("td");
                    var tr1 = objSell.eq(i - 10).find("td");


                    if (i < 10) {
                        $(tr).eq(1).html(parseFloat(itemList[0]).toFixed(3));
                        $(tr).eq(1).addClass(color);
                        $(tr).eq(2).html(common.getValueWithUnitForHK(itemList[1]));
                        $(tr).eq(3).html("(" + itemList[2] + ")");
                    } else {
                        $(tr1).eq(1).html(parseFloat(itemList[0]).toFixed(3));
                        $(tr1).eq(1).addClass(color);
                        $(tr1).eq(2).html(common.getValueWithUnitForHK(itemList[1]));
                        $(tr1).eq(3).html("(" + itemList[2] + ")");
                    }
                }
            }
        },

        loadEncomic: function (data) {
            //经济队列
            var bugArray = new Array();
            var sellArray = new Array();

            var encomicArray = data.split("|");

            for (var i = 0; i < encomicArray.length; i++) {
                var itemList = encomicArray[i].split("~");

                if (itemList[2] == "B") {
                    if (bugArray.length < 2) {
                        bugArray.push(itemList);
                    }
                } else if (itemList[2] == "S") {
                    if (sellArray.length < 2) {
                        sellArray.push(itemList);
                    }
                }
            }

            for (var j = 0; j < sellArray.length; j++) {
                $(".eq-table-sell tbody tr").eq(j).html("<td>卖盘</td>" +
                    "<td>" + sellArray[j][0] + "</td>" +
                    "<td>" + sellArray[j][1].substring(0, 4) + "</td><td>...</td>");
            }

            for (var k = 0; k < bugArray.length; k++) {
                $(".eq-table-bug tbody tr").eq(k).html("<td>买盘</td>" +
                    "<td>" + bugArray[k][0] + "</td>" +
                    "<td>" + bugArray[k][1].substring(0, 4) + "</td><td>...</td>");
            }
        },

        loadAHData: function () {
            var url = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=" + window.stockEntity.stockId + "&sty=FCABHL&st=z&sr=&p=&ps=&cb=?&js=((x))&token=7bc05d0d4c3c22ef9fca8c2a912d779c";
            common.jsonP(url, function (json) {
                if (json) {
                    var array = json.split(',');
                    if (array[5] != "-") {
                        //沪港通标志
                        //$("#hgt-logo b").html("沪港通");
                        //$("#hgt-logo").show();
                        $("#relate_stock_table").show();
                        var acolor = "font_green";
                        var yijiaColor = "font_green";

                        var aStockPrice = array[8];
                        var aStockRise = array[9];
                        var yijia = array[15];

                        if (aStockRise.indexOf("-") < 0) {
                            acolor = "font_red";
                        }
                        if (yijia.indexOf("-") < 0) {
                            yijiaColor = "font_red";
                        }

                        aStockRise = aStockRise + "%";
                        yijia = (yijia * 100).toFixed(2) + "%";

                        $("#relate_stock_table .axj").html(aStockPrice);
                        $("#relate_stock_table .axj").addClass(acolor);

                        $("#relate_stock_table .azdf").html(aStockRise);
                        $("#relate_stock_table .azdf").addClass(acolor);

                        $("#relate_stock_table .ahyj").html(yijia);
                        $("#relate_stock_table .ahyj").addClass(yijiaColor);

                        $("#relate_stock_table").click(function () {
                            location.href = "http://m.quote.eastmoney.com/stock," + array[5] + ".shtml";
                        });

                    } else {
                        $("#relate_stock_table").hide();
                    }
                }
            });
        },

        //阶段涨幅 3 5 6 10 日
        loadJdzfData: function () {

            $.ajax({
                url: "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=" + window.stockEntity.stockId + "&sty=FDPSUD&st=z&sr=&p=&ps=&cb=?&js=((x))&token=7bc05d0d4c3c22ef9fca8c2a912d779c",
                dataType: "jsonp",
                jsonpCallback: "callback",
                success: function (json) {
                    var data = json.split(',');
                    if (data.length > 9) {

                        var lowerHigherList = data[9].split('|');
                        var weekHigher = lowerHigherList[0];
                        var weekLower = lowerHigherList[1];

                        var itemList = data[10].split('|');
                        if (itemList == "-")
                            return;
                        var day10 = itemList[1];
                        var day20 = itemList[2];
                        var day60 = itemList[3];
                        var dayYear = itemList[4];

                        var day3Css = day10.indexOf("-") == 0 ? loadstockdata.greenColor : loadstockdata.redColor;
                        var day5Css = day20.indexOf("-") == 0 ? loadstockdata.greenColor : loadstockdata.redColor;
                        var day6Css = day60.indexOf("-") == 0 ? loadstockdata.greenColor : loadstockdata.redColor;
                        var day10Css = dayYear.indexOf("-") == 0 ? loadstockdata.greenColor : loadstockdata.redColor;

                        $('.3day').html(day10);
                        $('.3day').css("color", day3Css);
                        $('.5day').html(day20);
                        $('.5day').css("color", day5Css);
                        $('.6day').html(day60);
                        $('.6day').css("color", day6Css);
                        $('.10day').html(dayYear);
                        $('.10day').css("color", day10Css);

                        $('.weekzgj').html(weekHigher);
                        $('.weekzgj').css("color", loadstockdata.redColor);

                        $('.weekzdj').html(weekLower);
                        $('.weekzdj').css("color", loadstockdata.greenColor);

                    }
                }
            });
        },

        loadBasicData: function (baseData) {
            var closedPrice = baseData[4];
            var zd = baseData[6];
            $(".s_stock_name .name").html(baseData[2] + "(" + baseData[1] + ")");
            //基本数据
            for (var i = 0; i < baseData.length; i++) {
                var nodeSetting = loadstockdata.nodeClass[i];
                if (nodeSetting.status == 4) {
                    $("." + nodeSetting.key).html(common.getValueWithUnit(baseData[i]));
                    //成交量、额盘口里面的不需要单位
                    if (nodeSetting.key == "cje" || nodeSetting.key == "cjl") {
                        $("." + nodeSetting.key + "_1").html(common.getIntValue(baseData[i]));
                    }
                } else if (nodeSetting.status == 5) {
                    $("." + nodeSetting.key).html(common.getJiduByDate(baseData[i]));
                } else if (nodeSetting.status == 6) {
                    $("." + nodeSetting.key).html(common.getIntValue(baseData[i]));
                } else if (nodeSetting.status == 2) {
                    if (zd > 0) {
                        $("." + nodeSetting.key).css("color", loadstockdata.redColor);
                    } else if (zd < 0) {
                        $("." + nodeSetting.key).css("color", loadstockdata.greenColor);
                    } else {
                        $("." + nodeSetting.key).css("color", "");
                    }
                    $("." + nodeSetting.key).html(baseData[i]);
                } else if (nodeSetting.status == 3) {
                    var val = baseData[i] * 1;
                    if (val > closedPrice) {
                        $("." + nodeSetting.key).css("color", loadstockdata.redColor);
                    } else if (val < closedPrice) {
                        $("." + nodeSetting.key).css("color", loadstockdata.greenColor);
                    } else {
                        $("." + nodeSetting.key).css("color", "");
                    }
                    $("." + nodeSetting.key).html(baseData[i]);
                } else if (nodeSetting.status == 1) {
                    if (nodeSetting.key == "syl") {
                        var val = baseData[i] * 1;
                        if (val >= 1000) {
                            $("." + nodeSetting.key).html(parseInt(val));
                        } else {
                            $("." + nodeSetting.key).html(baseData[i]);
                        }
                    } else {
                        $("." + nodeSetting.key).html(baseData[i]);
                    }
                }
                if (baseData[i] == "-") {
                    $("." + nodeSetting.key).css("color", "");
                }
            }
        },


        getRelatedStock: function (json) {
            if (window.stockEntity.relationCode && window.stockEntity.relationCode != "" && json[1]) {
                $("#relate_stock_table").show();
                var relate_data = json[1][0].split(',');
                $(".relate_name").html(relate_data[2]);
                $(".relate_code").html(relate_data[1]);
                if (relate_data[4] != "-") {
                    var relate_zd = relate_data[4] * 1;
                    if (relate_zd > 0) {
                        $(".relate_xj").css("color", loadstockdata.redColor);
                        $(".relate_zdf").css("color", loadstockdata.redColor);
                        $(".relate_zd").css("color", loadstockdata.redColor);
                    } else if (relate_zd < 0) {
                        $(".relate_xj").css("color", loadstockdata.greenColor);
                        $(".relate_zdf").css("color", loadstockdata.greenColor);
                        $(".relate_zd").css("color", loadstockdata.greenColor);
                    } else {
                        $(".relate_xj").css("color", "");
                        $(".relate_zdf").css("color", "");
                        $(".relate_zd").css("color", "");
                    }
                } else {
                    $(".relate_xj").css("color", "");
                    $(".relate_zdf").css("color", "");
                    $(".relate_zd").css("color", "");
                }
                $(".relate_xj").html(relate_data[3]);
                $(".relate_zd").html(relate_data[4]);
                $(".relate_zdf").html(relate_data[5]);
            }
        },


        getPankouData: function (benData, closedPrice) {

            if ($('.wdmxBox').length == 0)
                return;

            //五档盘口
            //["8.57,591","8.56,248","8.55,145","8.54,4","8.53,7","8.58,397","8.59,236","8.60,455","8.62,824","8.63,164"]
            var fivePansArray = [];
            for (var i = 40; i <= 49; i++) {
                fivePansArray.push(benData[i] + "," + benData[i + 10]);
            }
            var fivaPanData = common.getFivePan(closedPrice, fivePansArray);
            $("#wdpks").html(fivaPanData[0]);
            $("#wdpkb").html(fivaPanData[1]);

            //成交明细
            //["14:56:55,8.56,50,-1", "14:56:52,8.57,3,-1", "14:56:46,8.57,239,1", "14:56:43,8.57,26,1", "14:56:40,8.57,108,1", "14:56:22,8.57,40,1", "14:56:19,8.56,4,-1", "14:56:10,8.57,1,1", "14:56:04,8.56,135,-1", "14:55:58,8.57,58,1", "14:55:49,8.57,73,1", "14:55:46,8.56,25,-1", "14:55:43,8.56,5,-1", "14:55:40,8.57,11,1", "14:55:31,8.57,20,1", "14:55:25,8.57,228,-1", "14:55:22,8.58,221,1", "14:55:07,8.58,102,1", "14:55:01,8.57,1,1", "14:54:55,8.57,100,1", "14:54:52,8.57,11,1", "14:54:49,8.56,2,-1", "14:54:40,8.56,5,-1", "14:54:31,8.56,303,1", "14:54:10,8.55,5,-1"] 
            var tempTradeDetails = benData[28];
            tempTradeDetails = tempTradeDetails.replace(/~/g, ",");
            var tradeDetailsArray = tempTradeDetails.split("|");
            tradeDetailsArray.reverse();
            $("#cjmx").html(common.getTradeDetails(closedPrice, tradeDetailsArray, 10));
            $("#cjmx_data").html(common.getTradeDetails(closedPrice, tradeDetailsArray, 100));
            //资金流
            var zjl_data = [];
            for (var i = 32; i <= 39; i++) {
                zjl_data.push(benData[i]);
            }
            //主力
            var zllr = parseFloat(zjl_data[0]) + parseFloat(zjl_data[2]);
            var zllc = parseFloat(zjl_data[1]) + parseFloat(zjl_data[3]);
            var zljlr = zllr + zllc;
            //净流入
            var cddjlr = parseFloat(zjl_data[0]) + parseFloat(zjl_data[1]);
            var ddjlr = parseFloat(zjl_data[2]) + parseFloat(zjl_data[3]);
            var zdjlr = parseFloat(zjl_data[4]) + parseFloat(zjl_data[5]);
            var xdjlr = parseFloat(zjl_data[6]) + parseFloat(zjl_data[7]);
            //净流入
            var jlrArray = [zllr, zllc, zljlr, cddjlr, ddjlr, zdjlr, xdjlr];
            var minValue = Math.min.apply(Math, zjl_data);
            var maxValue = Math.max.apply(Math, zjl_data);
            var maxCddlr = Math.max(Math.abs(parseFloat(minValue)), Math.abs(parseFloat(maxValue)));
            var unit = 1e4;
            if (!isNaN(maxCddlr) && maxCddlr >= 1e8) {
                unit = 1e8;
                $(".zlr_unit").html("亿");
            }
            //计算超大、大、中、小单净流入
            for (var i = 0; i < jlrArray.length; i++) {
                if (isNaN(jlrArray[i])) {
                    jlrArray[i] = 0;
                } else {
                    jlrArray[i] = jlrArray[i] / unit;
                    if (Math.abs(jlrArray[i]) > 100) {
                        jlrArray[i] = jlrArray[i].toFixed(0);
                    } else if (Math.abs(jlrArray[i]) > 10) {
                        jlrArray[i] = jlrArray[i].toFixed(1);
                    } else {
                        jlrArray[i] = jlrArray[i].toFixed(2);
                    }
                }
            }
            $(".zllr").html(jlrArray[0]);
            $(".zllc").html(common.getZhengNumber(jlrArray[1]));
            $(".zljlr").html(common.getZhengNumber(jlrArray[2]));
            if (jlrArray[2] > 0) {
                $(".zljlr").css("color", loadstockdata.redColor);
            } else if (jlrArray[2] < 0) {
                $(".zljlr").css("color", loadstockdata.greenColor);
            } else {
                $(".zljlr").css("color", "");
            }
            if (loadstockdata.chartContainer) {
                loadstockdata.columnData = [["超大", jlrArray[3]], ["大单", jlrArray[4]], ["中单", jlrArray[5]], ["小单", jlrArray[6]]];
                loadstockdata.initColumnChart();
            }
        },


        initColumnChart: function () {
            var ocanvas;
            if (!loadstockdata.chartContainer.canvas) {
                ocanvas = document.createElement("canvas");
                loadstockdata.chartContainer.canvas = ocanvas;
                ocanvas.innerHTML = "browser doesn't support html5";
                loadstockdata.chartContainer.appendChild(ocanvas);
            } else {
                ocanvas = chartContainer.canvas;
            }
            var width = common.getWindowSize()[0] * 0.54;
            width = width > 170 ? width : 170;
            ocanvas.setAttribute("width", width);
            ocanvas.setAttribute("height", 150);
            ocanvas.style.position = "absolute";
            DrawColumnChart(ocanvas, "18px 微软雅黑", 0, 0, 20, 0, loadstockdata.columnData, "13px 微软雅黑");
            if (!loadstockdata.columnCanvasIsInit) {
                loadstockdata.columnCanvasIsInit = true;
            }
        },

        intital: function () {
            var self = this;
            //股票状态
            //0 未上市 1 已上市 2 已退市 3暂停上市 4 终止上市
            var listName = "";
            switch (window.stockEntity.listedStatus) {
                case "-1":
                    listName = "停牌";
                    break;
                case "7":
                    listName = "暂停交易";
                    break;
                case "5":
                    listName = "限制买入";
                    break;
                case "6":
                    listName = "限制卖出";
                    break;
            }
            if (listName != "") {
                $("#kh_code").hide();
                $("#stock_status").show();
                $("#stock_status").html(" " + listName);
            } else {
                $("#kh_code").show();
                $("#stock_status").hide();
                $("#stock_status").html("");
            }

            self.loadHqData();
            setInterval(self.loadHqData, 10000);

        }
    }
    customElem.prototype.build = function () {
        var scode = common.getQueryString("code") || "300059";
        var smkt = common.getMkt(scode);
        stockEntity = {
            stockMarket: smkt,
            stockId: scode + smkt,
            stockName: "",
            StockCode: scode,
            showBanner: false,
            closeBanner: false
        }
        common.loadJS("http://emcharts.dfcfw.com/ec/2.2.0/mobile_emcharts.min.js", function () {
            canvas.initial();
        })
        loadstockdata.intital();
        $(".share_wx_close").on("click", function () {
            $("share_wx_bg").hide();
            $("share_wx_div").hide();
        })
        $("#share_bar").on("click", " .share-mb", function () {
            shareTo('qq');
        }).on("click", ".share-qz", function () {
            shareTo('qzone');
        }).on("click", ".share-sina", function () {
            shareTo('sina');
        }).on("click", ".share-wx", function () {
            shareWeiXin();
        })
        $(".btnRef").on("click", function () {
            location.reload();
        })
        $(".navitems").on("click", ".gd", function () {
            $(".navitems").addClass("on");
        }).on("click", ".sq", function () {
            $(".navitems").removeClass("on");
        })
    };
    return customElem;
});