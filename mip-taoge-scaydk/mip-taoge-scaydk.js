/**
 * @file mip-taoge-scaydk 组件
 * @author 涛哥 <liangtao.gz@foamail.com>
 */

define(function(require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    // 分模块开发
    var util = require('./util');

    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        element._index = index ++;

        /*监听百度商桥*/
        $('.ocmb').click(function () {
            MerchantBridge();
        });
        /*监听QQ客服*/
        $('.oqqc').click(function () {
            OnlineQQconsulting();
        });
        /*监听拨打电话按钮*/
        $('.telephone_recording').click(function () {
            var ajaxTimeoutTest = $.ajax({
                type: 'POST',
                timeout: 3000,
                url: 'https://wap.scaydk.com/mip/index/telephone_recording',
                data: {type: 'telephone'},
                success: function (result) {
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') {
                        ajaxTimeoutTest.abort();
                        //console.log("请求超时");
                    }
                },
                dataType: 'json'
            });
            location.href = "tel:" + window.Think.Tel;
        });
        /*性别选择*/
        $(document).on('click','form > p.case_sex > span',function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('form').find('input[name="sex"]').val($(this).index());
        });
        /*快速申请贷款*/
        $(document).on('submit','form.apply_for_loan',function () {
            form_submit(this);
            return false;
        });
        /*底部菜单层*/
        Pop_up_Menu();
    };

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        //console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        //console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        //console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        //console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        //console.log(isInView);
    };
    // 控制viewportCallback、firstInviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };
    /* 生命周期 function list，根据组件情况选用 end */

    /*表单提交*/
    function form_submit(o) {
        if (Validator.Validate(o, 2)) {
            var ajaxTimeoutTest = $.ajax({
                type: 'POST',
                timeout: 5000,
                url: 'https://wap.scaydk.com/mip/index/email',
                data: $(o).serialize(),
                success: function (result) {
                    tip(result);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') {
                        ajaxTimeoutTest.abort();
                        //console.log("请求超时");
                    }
                },
                dataType: 'json'
            });
        }
    }
    /*信息提示*/
    function tip(result) {
        if (result.code == 1) {
            success(result.msg);
        } else {
            error(result.msg);
        }
    }
    /*成功信息*/
    function success(msg) {
        alert(msg);
    }
    /*错误信息*/
    function error(msg) {
        alert(msg);
    }
    /*验证方法*/
    var Validator = {
        Require: /.+/,
        Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        Phone: /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
        Mobile: /^1[34578]\d{9}$/,
        Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        IdCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
        Currency: /^\d+(\.\d+)?$/,
        Number: /^\d+$/,
        Zip: /^[1-9]\d{5}$/,
        QQ: /^[1-9]\d{4,8}$/,
        Integer: /^[-\+]?\d+$/,
        Double: /^[-\+]?\d+(\.\d+)?$/,
        English: /^[A-Za-z]+$/,
        Chinese: /^[\u0391-\uFFE5]+$/,
        UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
        Name: /^(([\u4E00-\u9FA5]{2,7})|([a-zA-Z]{3,10}))$/,
        IsSafe: function (str) {
            return !this.UnSafe.test(str);
        },
        SafeString: "this.IsSafe(value)",
        Limit: "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
        LimitB: "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
        Date: "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
        Repeat: "value == document.getElementsByName(getAttribute('to'))[0].value",
        Range: "getAttribute('min') < value && value < getAttribute('max')",
        Compare: "this.compare(value,getAttribute('operator'),getAttribute('to'))",
        Custom: "this.Exec(value, getAttribute('regexp'))",
        Group: "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
        ErrorItem: [document.forms[0]],
        ErrorMessage: ["以下原因导致提交失败：\t\t\t\t"],
        Validate: function (theForm, mode) {
            var obj = theForm || event.srcElement;
            var count = obj.elements.length;
            this.ErrorMessage.length = 1;
            this.ErrorItem.length = 1;
            this.ErrorItem[0] = obj;
            for (var i = 0; i < count; i++) {
                with (obj.elements[i]) {
                    var _dataType = getAttribute("dataType");
                    if (typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined")  continue;
                    this.ClearState(obj.elements[i]);
                    if (getAttribute("require") == "false" && value == "") continue;
                    switch (_dataType) {
                        case "Date" :
                        case "Repeat" :
                        case "Range" :
                        case "Compare" :
                        case "Custom" :
                        case "Group" :
                        case "Limit" :
                        case "LimitB" :
                        case "SafeString" :
                            if (!eval(this[_dataType])) {
                                this.AddError(i, getAttribute("msg"));
                            }
                            break;
                        default :
                            if (!this[_dataType].test(value)) {
                                this.AddError(i, getAttribute("msg"));
                            }
                            break;
                    }
                }
            }
            if (this.ErrorMessage.length > 1) {
                mode = mode || 1;
                var errCount = this.ErrorItem.length;
                switch (mode) {
                    case 2 :
                        for (var i = 1; i < errCount; i++)
                            this.ErrorItem[i].style.color = "red";
                    case 1 :
                        alert(this.ErrorMessage.join("\n"));
                        this.ErrorItem[1].focus();
                        break;
                    case 3 :
                        for (var i = 1; i < errCount; i++) {
                            try {
                                var span = document.createElement("SPAN");
                                span.id = "__ErrorMessagePanel";
                                span.style.color = "red";
                                this.ErrorItem[i].parentNode.appendChild(span);
                                span.innerHTML = this.ErrorMessage[i].replace(/\d+:/, "*");
                            }
                            catch (e) {
                                alert(e.description);
                            }
                        }
                        this.ErrorItem[1].focus();
                        break;
                    default :
                        alert(this.ErrorMessage.join("\n"));
                        break;
                }
                return false;
            }
            return true;
        },
        limit: function (len, min, max) {
            min = min || 0;
            max = max || Number.MAX_VALUE;
            return min <= len && len <= max;
        },
        LenB: function (str) {
            return str.replace(/[^\x00-\xff]/g, "**").length;
        },
        ClearState: function (elem) {
            with (elem) {
                if (style.color == "red")
                    style.color = "";
                var lastNode = parentNode.childNodes[parentNode.childNodes.length - 1];
                if (lastNode.id == "__ErrorMessagePanel")
                    parentNode.removeChild(lastNode);
            }
        },
        AddError: function (index, str) {
            this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
            this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
        },
        Exec: function (op, reg) {
            return new RegExp(reg, "g").test(op);
        },
        compare: function (op1, operator, op2) {
            switch (operator) {
                case "NotEqual":
                    return (op1 != op2);
                case "GreaterThan":
                    return (op1 > op2);
                case "GreaterThanEqual":
                    return (op1 >= op2);
                case "LessThan":
                    return (op1 < op2);
                case "LessThanEqual":
                    return (op1 <= op2);
                default:
                    return (op1 == op2);
            }
        },
        MustChecked: function (name, min, max) {
            var groups = document.getElementsByName(name);
            var hasChecked = 0;
            min = min || 1;
            max = max || groups.length;
            for (var i = groups.length - 1; i >= 0; i--)
                if (groups[i].checked) hasChecked++;
            return min <= hasChecked && hasChecked <= max;
        },
        IsDate: function (op, formatString) {
            formatString = formatString || "ymd";
            var m, year, month, day;
            switch (formatString) {
                case "ymd" :
                    m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                    if (m == null) return false;
                    day = m[6];
                    month = m[5]--;
                    year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                    break;
                case "dmy" :
                    m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                    if (m == null) return false;
                    day = m[1];
                    month = m[3]--;
                    year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                    break;
                default :
                    break;
            }
            if (!parseInt(month)) return false;
            month = month == 12 ? 0 : month;
            var date = new Date(year, month, day);
            return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());
            function GetFullYear(y) {
                return ((y < 30 ? "20" : "19") + y) | 0;
            }
        }
    };
    /*百度商桥*/
    function MerchantBridge(o) {
        //console.log(navigator.userAgent);
        if (navigator.userAgent.indexOf('Baidu') > 0 || navigator.userAgent.indexOf('Miui') > 0 || navigator.userAgent.indexOf('MZ-MX') > 0) {
            var url = 'http://p.qiao.baidu.com/cps/chat?siteId=10764996&userId=23900454';
            window.open(url, '_blank', 'height=510, width=644,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
        } else {
            OnlineQQconsulting();
        }
    }
    /*QQ咨询*/
    function OnlineQQconsulting(o) {
        var url;
        switch (3) {
            case 1:
                url = 'tencent://message/?Menu=yes&uin=' + window.Think.QQ + '&Site=%E5%AE%89%E8%AA%89%E5%95%86%E5%8A%A1%E6%9C%8D%E5%8A%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45';
                break;
            case 2:
                url = 'http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=' + window.Think.QQ + '&site=qq&menu=yes';
                break;
            case 3:
                url = 'mqqwpa://im/chat?chat_type=wpa&uin=' + window.Think.QQ + '&version=1&src_type=web&web_src=oicqzone.com';
                break
        }
        window.open(url, '_self', 'height=502, width=644,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
    }
    /*底部菜单*/
    function Pop_up_Menu() {
        $('body > div.Pop-up-Menu').click(function (event) {
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu').on("touchstart", function (event) {
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu').on("touchmove", function (event) {
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu').on("touchend", function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').on("touchstart", function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').on("touchmove", function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').on("touchend", function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').click(function (event) {
            if ($('body > div.Pop-up-Menu').hasClass('show')) {
                $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
            } else {
                $('body > div.Pop-up-Menu').removeClass('hidden').addClass('show');
            }
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu > div > img').click(function () {
            $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
        });
        $(document).on("click", function () {
            $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
        });
        $(document).on("touchstart", function () {
            $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
        });
    }

    return customElem;
});
