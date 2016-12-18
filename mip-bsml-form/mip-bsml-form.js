/**
 * @file mip-bsml-form 组件
 *
 * @author jiangsongfang
 * @time 2016.12.17
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
     * [createDom 创建 form 节点]
     */
    function createDom() {
        var element = this.element;
        var $element = $(element);
        var url = element.getAttribute('url');
        var method = element.getAttribute('method');
        var type = element.getAttribute('type');
        var form = $([
            '<form action=' + url + ' method=' + method + ' type=' + type + ' target="_blank">',
            '</form>'
        ].join(''));

        form.append($element.html());
        $element.html(form);

        // 按钮提交
        $element.find('form').on('submit', function (event) {
            event.preventDefault();
            onSubmit.call(element);
            return false;
        });

        // 回车提交
        element.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                onSubmit.call(this);
            }
        }, false);
    }

    /**
     * [onSubmit 点击提交按钮事件处理函数]
     */
    function onSubmit() {

    }

    /**
     * [build build函数]
     */
    customElement.prototype.build = function () {
        var element = this.element;
        createDom.call(this);
        var parm = {};
        parm.compname = $(element).find('form').attr('type');
        var url = $(element).find('form').attr('action');
        $(element).on('click', '.bsml-form-list-submit', function () {
            var jsonval = $(element).find('form').serializeArray();
            for (var i = 0; i < jsonval.length; i++) {
                if (!jsonval[i].value) {
                    return;
                }
            }
            parm.pageid = $(this).attr('data-pageid');
            parm.merchantid = $(this).attr('data-ucid');
            parm.jsonval = jsonval;
            $.ajax({
                url: url,
                data: parm,
                cache: false,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function (data) {
                    if (data.status === 0) {
                        $(element).find('.bsml-form-tips').html('提交成功！').show();
                    } else {
                        $(element).find('.bsml-form-tips').html(data.statusInfo).show();
                    }
                    var timer = setTimeout(function () {
                        $(element).find('.bsml-form-tips').hide();
                        clearTimeout(timer);
                    }, 1000);
                }
            });
        });
    };

    return customElement;

});
