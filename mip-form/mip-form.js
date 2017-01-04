/**
 * @file mip-form 组件
 *
 * @author fengchuantao
 * @time 2016.7.28
 * @modify wangpei07 2016.11.21
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');

    var REGS = {
        EMAIL: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        PHONE: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        IDCAR: /^\d{15}|\d{18}$/
    };

    /**
     * [preProcess description]
     *
     * @param  {Object} element [mip 组件标签]
     * @return {boolean}
     */
    function preProcess(element) {
        var flag = element.querySelector('input[type="password"],input[type="file"]');

        if (flag) {
            console.error('禁止使用password与file输入框');
            return false;
        }
        return true;
    }

    /**
     * [createDom 创建 form 节点]
     */
    function createDom() {
        var element = this.element;
        var $element = $(element);
        var url = element.getAttribute('url');
        var method = element.getAttribute('method');
        var form = $([
            '<form action=' + url + ' method=' + method + ' target="_blank">',
            '</form>'
        ].join(''));

        form.append($element.html());
        $element.html(form);

        // 按钮提交
        $element.find('form').on('submit', function (event) {
            event.preventDefault();
            onSubmit.call(element);
        });

        // XXX 部分浏览器回车不触发submit,
        element.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                // XXX 为了使余下浏览器不多次触发submit, 使用prevent
                event.preventDefault();
                onSubmit.call(this);
            }
        }, false);
    }

    /**
     * [verification 文案格式验证]
     *
     * @param  {string} type [验证类型]
     * @param  {string} value [需要验证的文案]
     * @return {boolean}
     */
    function verification(type, value) {
        return (type === 'must') ? !(value === '') : REGS[type.toUpperCase()].test(value);
    }

    /**
     * [onSubmit 点击提交按钮事件处理函数]
     */
    function onSubmit() {
        var self = this;
        var preventSubmit = false;
        var inputs = $(self).find('input[type="text"],input[type="input"]');
        var isGet = self.getAttribute('method') === 'get';
        var getUrl = self.getAttribute('url');
        var isHttp = getUrl.match('http://');
        var valueJson = '';

        // 校验输入内容是否合法
        inputs.map(function (index, item) {
            var type = item.getAttribute('validatetype');
            var target = item.getAttribute('validatetarget');
            var regval = item.getAttribute('validatereg');
            var value = item.value;
            var reg;

            valueJson += '&' + item.name + '=' + item.value;
            if (type) {
                if (regval) {
                    reg = value === '' ? false : (new RegExp(regval)).test(value);
                }
                else {
                    reg = verification(type, value);
                }
                util.css($(self).find('div[target="' + target + '"]'), {display: (!reg ? 'block' : 'none')});
                preventSubmit = !reg ? true : preventSubmit;
            }
        });

        if (preventSubmit) {
            return;
        }

        // 在iframe下使用mibm-jumplink，跳转显示手百框。 http-GET请求交给外层跳转
        if (window.parent !== window) {
            var messageUrl = '';
            if (isHttp && isGet) {
                if (getUrl.match('\\?')) {
                    // eg. getUrl == 'http://www.mipengine.org?we=123'
                    messageUrl = getUrl + valueJson;
                }
                else {
                    // eg. getUrl == 'http://www.mipengine.org'
                    valueJson = valueJson.substring(1);
                    messageUrl = getUrl + '?' + valueJson;
                }
                var message = {
                    event: 'mibm-jumplink',
                    data: {
                        url: messageUrl
                    }
                };
                window.parent.postMessage(message, '*');
            }
            else {
                // https请求 或 post请求不做处理
                self.getElementsByTagName('form')[0].submit();
            }
        } else {
            // 非iframe下不做处理
            self.getElementsByTagName('form')[0].submit();
        }
    }

    /**
     * [build build函数]
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var addClearBtn = element.hasAttribute('clear');
        this.cross = null;

        if (preProcess(element)) {
            createDom.call(this);
        }

        if (addClearBtn) {
            var textInput = element.querySelectorAll('input[type=text],input[type=input]');
            if (!textInput.length) {
                return;
            }
            var cross = document.createElement('div');
            cross.id = 'mip-form-cross';
            this.cross = cross;

            for (var index = 0; index < textInput.length; index++) {
                var height = textInput[index].offsetHeight;
                textInput[index].onfocus = function () {
                    var self = this;
                    cross.setAttribute('name', self.getAttribute('name'));
                    util.css(cross, {top: self.offsetTop + (height - 16) / 2  - 4 + 'px'});
                    self.parentNode.appendChild(cross);
                    if (self.value !== '') {
                        util.css(cross, {display: 'block'});
                    }
                    else {
                        util.css(cross, {display: 'none'});
                        self.oninput = function () {
                            util.css(cross, {display: (self.value !== '' ? 'block' : 'none')});
                        };
                    }
                };
            }

            cross.addEventListener('touchstart', clear);
            cross.addEventListener('click', clear);

            function clear(e) {
                var name = e.target.getAttribute('name');
                cross.parentNode.querySelector('input[name="' + name + '"]').value = '';
                util.css(cross, {display: 'none'});
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

    return customElement;

});
