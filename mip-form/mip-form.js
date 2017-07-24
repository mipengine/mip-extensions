/**
 * @file mip-form 组件
 *
 * @author fengchuantao
 * @time 2016.7.28
 * @modify wangpei07 2016.11.21, liangjiaying 2017.01
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    var viewer = require('viewer');
    var windowInIframe = viewer.isIframed;

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
        var target = element.getAttribute('target');
        var form = document.createElement('form');
        form.action = url;
        form.method = method;
        target = target ? target : '_blank';
        form.target = viewer.isIframed && target !== '_blank' ? '_top' : target;
        element.appendChild(form);
        util.dom.insert(form, element.children);

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
        var inputs = $(self).find('input, textarea, select');
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

            if (item.type === 'submit') {
                return;
            }
            else if (item.type === 'checkbox' || item.type === 'radio') {
                value = item.checked ? item.value : '';
            }

            valueJson += '&' + item.name + '=' + value;
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
        if (window.parent !== window && isHttp && isGet) {
            var messageUrl = '';
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
            // https请求 或 post请求 或 非iframe下不做处理
            self.getElementsByTagName('form')[0].submit();
        }
    }
    // 给 input 绑定事件，向 SF 发送数据，为了解决 ios 的 UC 浏览器在iframe外层文档悬浮头部 fixed 位置混乱问题
    function initMessageEvents() {
        var inputAll = document.querySelectorAll('input');
        Array.prototype.forEach.call(inputAll, function (item, index) {
            item.addEventListener('focus', function () {
                sendFormMessage('focus');
            }, false);

            item.addEventListener('blur', function () {
                sendFormMessage('blur');
            }, false);
        });
    }

    // 在 input focus 或 blur 时向iframe外层文档发送数据，iframe外层文档返回设置预览头部为 absolute
    function sendFormMessage(event) {
            if (windowInIframe) {
                // mip_video_jump 为写在外层的承接方法
                viewer.sendMessage('input-' + event, {
                });
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
            var clearArr = ['text', 'input', 'datetime', 'email', 'number', 'search', 'tel', 'url'];
            var clearList = '';
            for (var i in clearArr) {
                clearList += ',input[type=' + clearArr[i] + ']';
            }
            clearList = clearList.slice(1);
            // XXX: clearItems为类数组对象
            var clearItems = element.querySelectorAll(clearList);

            if (!clearItems.length) {
                return;
            }

            var cross = document.createElement('div');
            cross.id = 'mip-form-cross';
            this.cross = cross;

            for (var index = 0; index < clearItems.length; index++) {
                var height = clearItems[index].offsetHeight;
                clearItems[index].addEventListener('focus', function () {
                    var self = this;
                    cross.setAttribute('name', self.getAttribute('name'));
                    util.css(cross, {
                        top: self.offsetTop + (height - 16) / 2  - 8 + 'px',
                        left: self.offsetWidth - 32 + 'px'
                    });
                    self.parentNode.appendChild(cross);
                    if (self.value !== '') {
                        util.css(cross, {display: 'block'});
                    }
                    else {
                        util.css(cross, {display: 'none'});
                        self.oninput = function () {
                            if (util && util.platform && util.platform.isAndroid() && self.type === 'search') {
                                // andriod type=search自带清空按钮, 不显示清空
                                return;
                            }
                            util.css(cross, {display: (self.value !== '' ? 'block' : 'none')});
                        };
                    }
                }, false);
                // 点击提交时，如果报错信息展示，则隐藏清空按钮
                clearItems[index].addEventListener('blur', function () {
                    util.css(cross, {display: 'none'});
                }, false);
            }
            cross.addEventListener('touchstart', clear, false);
            cross.addEventListener('mousedown', clear, false);
            cross.addEventListener('click', clear, false);
            function clear(e) {
                e.stopPropagation();
                e.preventDefault();
                var name = e.target.getAttribute('name');
                var inputSelect = cross.parentNode.querySelector('input[name="' + name + '"]');
                inputSelect.focus();
                inputSelect.value = '';
                util.css(cross, {display: 'none'});
            }
        }
        initMessageEvents();
    };
    return customElement;

});
