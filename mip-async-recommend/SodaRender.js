define(function () {
    var valueoutReg = /\{\{([^\}]*)\}\}/g;

    var classNameRegExp = function (className) {
        return new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g');
    };

    var addClass = function (el, className) {
        if (!el.className) {
            el.className = className;
            return;
        }

        if (el.className.match(classNameRegExp(className))) {
        } else {
            el.className += " " + className;
        }
    };

    var removeClass = function (el, className) {
        el.className = el.className.replace(classNameRegExp(className), "");
    };

    var getValue = function (_data, _attrStr) {
        CONST_REGG.lastIndex = 0;
        var realAttrStr = _attrStr.replace(CONST_REGG, function (r) {
            if (typeof _data[r] === "undefined") {
                return r;
            } else {
                return _data[r];
            }
        });

        var _getValue = function (data, attrStr) {
            var dotIndex = attrStr.indexOf(".");
            if (dotIndex > -1) {
                var attr = attrStr.substr(0, dotIndex);
                attrStr = attrStr.substr(dotIndex + 1);
                // ���attrStr�Ƿ����Ա�����ת��
                if (_data[attr] && CONST_REG.test(attr)) {
                    attr = _data[attr];
                }
                if (typeof data[attr] !== "undefined") {
                    return _getValue(data[attr], attrStr);
                } else {
                    var eventData = {
                        name: realAttrStr,
                        data: _data
                    };
                    triggerEvent("nullvalue", {
                        type: "nullattr",
                        data: eventData
                    }, eventData);
                    // �������
                    return "";
                }
            } else {
                // ���attrStr�Ƿ����Ա�����ת��
                if (_data[attrStr] && CONST_REG.test(attrStr)) {
                    attrStr = _data[attrStr];
                }
                var rValue;
                if (typeof data[attrStr] !== "undefined") {
                    rValue = data[attrStr];
                } else {
                    var eventData = {
                        name: realAttrStr,
                        data: _data
                    };
                    triggerEvent("nullvalue", {
                        type: "nullvalue",
                        data: eventData
                    }, eventData);
                    rValue = '';
                }
                return rValue;
            }
        };
        return _getValue(_data, _attrStr);
    };

    // ע��node
    var commentNode = function (node) {
    };

    // ��ʶ��
    var IDENTOR_REG = /[a-zA-Z_\$]+[\w\$]*/g;
    var STRING_REG = /"([^"]*)"|'([^']*)'/g
    var NUMBER_REG = /\d+|\d*\.\d+/g;

    var OBJECT_REG = /[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g;
    var ATTR_REG = /\[([^\[\]]*)\]/g;
    var ATTR_REG_DOT = /\.([a-zA-Z_\$]+[\w\$]*)/g;

    var NOT_ATTR_REG = /[^\.|]([a-zA-Z_\$]+[\w\$]*)/g;

    var OR_REG = /\|\|/g;

    var OR_REPLACE = "OR_OPERATOR\x1E";

    var getRandom = function () {
        return "$$" + ~~(Math.random() * 1E6);
    };

    var CONST_PRIFIX = "_$C$_";
    var CONST_REG = /^_\$C\$_/;
    var CONST_REGG = /_\$C\$_[^\.]+/g;

    var getAttrVarKey = function () {
        return CONST_PRIFIX + ~~(Math.random() * 1E6);
    };

    var parseSodaExpression = function (str, scope) {
        // ��filter���д���
        str = str.replace(OR_REG, OR_REPLACE).split("|");
        for (var i = 0; i < str.length; i++) {
            str[i] = (str[i].replace(new RegExp(OR_REPLACE, 'g'), "||") || '').trim();
        }
        var expr = str[0] || "";
        var filters = str.slice(1);
        // ���ַ�������������
        expr = expr.replace(STRING_REG, function (r, $1, $2) {
            var key = getRandom();
            scope[key] = $1 || $2;
            return key;
        });
        while (ATTR_REG.test(expr)) {
            ATTR_REG.lastIndex = 0;
            //��exprԤ����
            expr = expr.replace(ATTR_REG, function (r, $1) {
                var key = getAttrVarKey();
                // �������� Ϊ�ַ�����
                var attrName = parseSodaExpression($1, scope);
                // ��һ�������ǰ׺ ��ʾ�����Ա���
                scope[key] = attrName;
                return "." + key;
            });
        }

        expr = expr.replace(OBJECT_REG, function (value) {
            return "getValue(scope,'" + value.trim() + "')";
        });


        var parseFilter = function () {
            var filterExpr = filters.shift();
            if (!filterExpr) {
                return;
            }
            var filterExpr = filterExpr.split(":");
            var args = filterExpr.slice(1) || [];
            var name = filterExpr[0] || "";

            var stringReg = /^'.*'$|^".*"$/;
            for (var i = 0; i < args.length; i++) {
                //����������ͽ����ж�
                if (OBJECT_REG.test(args[i])) {
                    args[i] = "getValue(scope,'" + args[i] + "')";
                } else {
                }
            }
            if (sodaFilterMap[name]) {
                args.unshift(expr);
                args = args.join(",");
                expr = "sodaFilterMap['" + name + "'](" + args + ")";
            }
            parseFilter();
        };
        parseFilter();
        var evalFunc = new Function("getValue", "sodaFilterMap", "return function sodaExp(scope){ return " + expr + "}")(getValue, sodaFilterMap);
        return evalFunc(scope);
    };

    var parseChild = function (parent, scope) {
        [].map.call([].slice.call(parent.childNodes, []), function (child) {
            if (child.nodeType === 3) {
                child.nodeValue = child.nodeValue.replace(valueoutReg, function (item, $1) {
                    return parseSodaExpression($1, scope);
                });
            }

            if (child.attributes) {
                // ���ȴ��� soda-repeat
                if (/in/.test(child.getAttribute("soda-repeat") || "")) {
                    sodaDirectiveMap['soda-repeat'].link(scope, child, child.attributes);

                    //ng-if���ȴ���
                } else {
                    if ((child.getAttribute("soda-if") || '').trim()) {
                        sodaDirectiveMap['soda-if'].link(scope, child, child.attributes);

                        if (child.getAttribute("removed") === "removed") {
                            return;
                        }
                    }

                    var childDone;
                    [].map.call(child.attributes, function (attr) {
                        if (attr.name !== 'soda-if') {
                            if (/^soda-/.test(attr.name)) {
                                if (sodaDirectiveMap[attr.name]) {
                                    var dire = sodaDirectiveMap[attr.name]

                                    var msg = dire.link(scope, child, child.attributes);

                                    if (msg && msg.command === "childDone") {
                                        childDone = 1;
                                    }
                                } else {

                                    var attrName = attr.name.replace(/^soda-/, '');

                                    if (attrName) {
                                        var attrValue = attr.value.replace(valueoutReg, function (item, $1) {
                                            return parseSodaExpression($1, scope);
                                        });

                                        child.setAttribute(attrName, attrValue);
                                    }

                                }

                                // �����������ﺬexpr ����
                            } else {
                                attr.value = attr.value.replace(valueoutReg, function (item, $1) {
                                    return parseSodaExpression($1, scope);
                                });
                            }
                        }
                    });

                    if (!childDone) {
                        parseChild(child, scope);
                    }
                }
            }
        });
    };

    var sodaDirectiveMap = {};

    var sodaFilterMap = {};

    var sodaDirective = function (name, func) {
        sodaDirectiveMap['soda-' + name] = func();
    };

    var sodaFilter = function (name, func) {
        sodaFilterMap[name] = func;
    };

    sodaFilter("date", function (input, lenth) {
        return lenth;
    });

    sodaDirective('repeat', function () {
        return {
            compile: function (scope, el, attrs) {

            },
            link: function (scope, el, attrs) {
                var opt = el.getAttribute('soda-repeat');
                var itemName;
                var valueName;

                var trackReg = /\s+track\s+by\s+([^\s]+)$/;

                var trackName;
                opt = opt.replace(trackReg, function (item, $1) {
                    if ($1) {
                        trackName = ($1 || '').trim();
                    }

                    return '';
                });

                trackName = trackName || '$index';

                var inReg = /([^\s]+)\s+in\s+([^\s]+)/;

                var r = inReg.exec(opt);
                if (r) {
                    itemName = (r[1] || '').trim();
                    valueName = (r[2] || '').trim();

                    if (!(itemName && valueName)) {
                        return;
                    }
                } else {
                    return;
                }

                // ����Ҫ����һ��
                var repeatObj = getValue(scope, valueName) || [];
                var lastNode = el;

                for (var i = 0; i < repeatObj.length; i++) {
                    var itemNode = el.cloneNode();

                    var itemScope = {};
                    itemScope[trackName] = i;

                    itemScope[itemName] = repeatObj[i];

                    itemScope.__proto__ = scope;

                    itemNode.innerHTML = el.innerHTML;

                    if ((itemNode.getAttribute("soda-if") || '').trim()) {
                        sodaDirectiveMap['soda-if'].link(itemScope, itemNode, itemNode.attributes);

                        if (itemNode.getAttribute("removed") === "removed") {
                            continue;
                        }
                    }

                    // ���η����ýڵ��ϵ���������
                    [].map.call(itemNode.attributes, function (attr) {
                        if (itemNode.getAttribute("removed") === "removed") {
                            return;
                        }

                        if (attr.name.trim() !== "soda-repeat" && attr.name.trim() !== "soda-if") {
                            if (/^soda-/.test(attr.name)) {
                                if (sodaDirectiveMap[attr.name]) {
                                    var dire = sodaDirectiveMap[attr.name]

                                    dire.link(itemScope, itemNode, itemNode.attributes);

                                } else {
                                    var attrName = attr.name.replace(/^soda-/, '');
                                    if (attrName) {
                                        var attrValue = attr.value.replace(valueoutReg, function (item, $1) {
                                            return parseSodaExpression($1, scope);
                                        });

                                        itemNode.setAttribute(attrName, attrValue);
                                    }

                                }
                            } else {
                                attr.value = attr.value.replace(valueoutReg, function (item, $1) {
                                    return parseSodaExpression($1, itemScope);
                                });
                            }
                        }
                    });

                    if (itemNode.getAttribute("removed") !== "removed") {
                        parseChild(itemNode, itemScope);
                        el.parentNode.insertBefore(itemNode, lastNode.nextSibling);
                        lastNode = itemNode;
                    }
                }
                el.parentNode.removeChild(el);
            }
        };
    });

    sodaDirective('if', function () {
        return {
            link: function (scope, el, attrs) {
                var opt = el.getAttribute('soda-if');
                //add
                var expressFunc;
                valueoutReg.lastIndex = 0;
                var match = valueoutReg.exec(opt);
                if (match) {
                    //��Ӧ���ʽ soda-if={{}}
                    expressFunc = parseSodaExpression(match[1], scope);
                } else {
                    //��Ӧֱ�Ӹ�ֵ��������ʹ�ñ��ʽ
                    expressFunc = parseSodaExpression(opt, scope);
                }

                if (expressFunc) {
                } else {
                    el.setAttribute("removed", "removed");
                    el.parentNode && el.parentNode.removeChild(el);
                }
            }
        };
    });

    sodaDirective('class', function () {
        return {
            link: function (scope, el, attrs) {
                var opt = el.getAttribute("soda-class");

                var expressFunc = parseSodaExpression(opt, scope);

                if (expressFunc) {
                    addClass(el, expressFunc);
                } else {
                }
            }
        };
    });

    sodaDirective('src', function () {
        return {
            link: function (scope, el, attrs) {
                var opt = el.getAttribute("soda-src");

                var expressFunc = opt.replace(valueoutReg, function (item, $1) {
                    return parseSodaExpression($1, scope);
                });

                if (expressFunc) {
                    el.setAttribute("src", expressFunc);
                } else {
                }
            }
        };
    });

    sodaDirective('bind-html', function () {
        return {
            link: function (scope, el, attrs) {
                var opt = el.getAttribute("soda-bind-html");
                var expressFunc = parseSodaExpression(opt, scope);

                if (expressFunc) {
                    el.innerHTML = expressFunc;

                    return {
                        command: "childDone"
                    };
                }
            }
        };
    });

    sodaDirective("style", function () {
        return {
            link: function (scope, el, attrs) {
                var opt = el.getAttribute("soda-style");
                var expressFunc = parseSodaExpression(opt, scope);

                var getCssValue = function (name, value) {
                    var numberWithoutpx = /opacity|z-index/;
                    if (numberWithoutpx.test(name)) {
                        return parseFloat(value);
                    }

                    if (isNaN(value)) {
                        return value;
                    } else {
                        return value + "px";
                    }
                };

                if (expressFunc) {
                    var stylelist = [];

                    for (var i in expressFunc) {
                        if (expressFunc.hasOwnProperty(i)) {
                            var provalue = getCssValue(i, expressFunc[i]);

                            stylelist.push([i, provalue].join(":"));
                        }
                    }

                    var style = el.style;
                    for (var i = 0; i < style.length; i++) {
                        var name = style[i];
                        if (expressFunc[name]) {
                        } else {
                            stylelist.push([name, style[name]].join(":"));
                        }
                    }

                    var styleStr = stylelist.join(";");

                    el.setAttribute("style", styleStr);
                }
            }
        };
    });

    var sodaRender = function (str, data) {
        // ����ģ��DOM
        var div = document.createElement("div");
        div.innerHTML = str;
        parseChild(div, data);

        var frament = document.createDocumentFragment();
        frament.innerHTML = div.innerHTML;

        var child;
        while (child = div.childNodes[0]) {
            frament.appendChild(child);
        }


        return frament;
    };

    var eventPool = {};
/*    sodaRender.addEventListener = function (type, func) {
        if (eventPool[type]) {
        } else {
            eventPool[type] = [];
        }

        eventPool[type].push(func);
    };*/

    var triggerEvent = function (type, e, data) {
        var events = eventPool[type] || [];

        for (var i = 0; i < events.length; i++) {
            var eventFunc = events[i];
            eventFunc && eventFunc(e, data);
        }
    };

    // Ԥ�ȱ���
    var compile = function (str, data) {
    };

    return {
        sodaRender: sodaRender,
        sodaFilter: sodaFilter
    };
});