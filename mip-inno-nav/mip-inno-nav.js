/**
 * @file mip-inno-nav 组件
 * @author yangnan
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    function build() {
        var element = this.element;
        render(element);
        bindEvents(element);
    }

    /**
     * 渲染dom
     *
     * @param  {obj} me this
     */
    function render(me) {
       // todo render
    }

    /**
     * 绑定事件
     *
     * @param  {obj} me this
     */
    function bindEvents() {

        $('span.menu').on('click', function () {
            $('menu').show();
        });
        $('span.close').on('click', function () {
            $('menu').hide();
        });

    }




    // build 方法，元素插入到文档时执行，仅会执行一次
    customElement.prototype.build = build;
    return customElement;
});
