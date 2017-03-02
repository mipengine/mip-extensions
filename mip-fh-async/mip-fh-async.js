/**
 * @author: laoono
 * @date:  2017-01-13
 * @time: 15:35
 * @file: mip-fh-async.js
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var Gesture = util.Gesture;

    function getOpt(element) {
        var $element = $(element);
        // 获取元素绑定的异步属性
        var id = element.id;
        var url = $element.attr('url');
        var data = $element.attr('data');
        var block = $element.attr('block');
        var activeClass = $element.attr('active-class');

        // 元素参数
        var opt = {
            id: id,
            url: url,
            data: data,
            block: block,
            activeClass: activeClass
        };

        return opt;
    }

    /**
     * [render 渲染方法]
     *
     */
    function render() {
        var self = this;
        var element = self.element;

        self.disabled = false;

        // 事件注册
        self.addEventAction('send', function (event) {
            send.call(self, element, event);
        });
    }

    /**
     * [sned 发送ajax请求]
     *
     * @param  {Object} element [标签元素]
     */
    function send(element) {
        var self = this;

        if (self.disabled) {
            return;
        }

        // 获取当前元素属性
        var opt = getOpt(element);
        var url = opt.url;
        var data = $.parseJSON(opt.data);
        var block = $(opt.block);
        var activeClass = opt.activeClass;
        var id = opt.id;
        var $btn = $('[on="tap:' + id + '.send"]');

        new Gesture(self.element, {
            preventY: true
        });

        self.disabled = true;
        $btn.addClass(activeClass);

        // 异步请求
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: function (res) {
                res = res || {};
                var data = res.data || '';
                block.html(data);
            },

            error: function () {
                alert('失败，请重试');
            },

            complete: function () {
                self.disabled = false;
                $btn.removeClass(activeClass);
            }
        });
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = render;

    return customElem;
});
