/**
 * @file mip-bsml-form 组件
 *
 * @author jiangsongfang
 * @time 2016.12.17
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    var REGS = {
        EMAIL: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        PHONE: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        IDCAR: /^\d{15}|\d{18}$/
    };

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
        var $selects = $(element).find('.bsml-singleselect-container');
        $selects.each(function (i, sel) {
            var $sel = $(sel);
            var options = $sel.attr('options');
            if (options) {
                var name = $sel.attr('name');
                try {
                    options = JSON.parse(options);
                    var str = '<select name="' + name + '" class="bsml-singleselect">';
                    options.map(function (option) {
                        str += '<option value="' + option.value + '"';
                        if (option.selected) {
                            str += ' selected="selected"';
                        }
                        str += '>' + option.text + '</option>';
                    });
                    str += '</select>';
                    $sel.html(str);
                } catch (e) {
                    console.log(e);
                }
            }
        });

        var parm = {};
        parm.compname = $(element).parents('mip-bsml-widget').attr('type');
        $(element).on('click', '.bsml-form-list-submit', function () {
            var jsonval = $(element).find('form').serializeArray();
            for (var i = 0; i < jsonval.length; i++) {
                if (!jsonval[i].value) {
                    $(element).find('.bsml-form-tips').html('所有内容必须填写！').show();
                    var timer = setTimeout(function () {
                        $(element).find('.bsml-form-tips').hide();
                        clearTimeout(timer);
                    }, 1000);
                    return;
                }
            }
            parm.pageid = $(this).attr('data-pageid');
            parm.merchantid = $(this).attr('data-ucid');
            parm.jsonval = jsonval;
            var url = $(element).find('form').attr('action');
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
