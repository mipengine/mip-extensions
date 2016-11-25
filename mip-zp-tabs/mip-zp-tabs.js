/**
 * @author: Keith
 * @date: 2016-11-24
 * @file: mip-zp-tabs.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var zp = require('zepto');

    function goPanel(index, elem) {
        var navPanelContainer = elem.find('.container .nav-panel-container').eq(0);
        var navPanel = elem.find('.container .nav-panel').eq(0);
        navPanel.css({'height': navPanelContainer.find('.item.active').eq(0).height() + 'px'});
        navPanelContainer.css({'-webkit-transform': 'translate3d(-' + Number(index) * navPanel.width() + 'px, 0, 0)', '-moz-transform': 'translate3d(-' + Number(index) * navPanel.width() + 'px, 0, 0)', '-o-transform': 'translate3d(-' + Number(index) * navPanel.width() + 'px, 0, 0)', 'transform': 'translate3d(-' + Number(index) * navPanel.width() + 'px, 0, 0)'});
    }

    function choosePanel(index, elem) {
        var navItems = elem.find('.container .nav li');
        var navPanels = elem.find('.nav-panel .item');

        var activeNav = elem.find('.container .nav li.active').eq(0);
        var activePanel = elem.find('.container .nav-panel .item.active').eq(0);

        if (index !== Number(activeNav.attr('data-index'))) {
            activeNav.hasClass('active') && activeNav.removeClass('active');
            activePanel.hasClass('active') && activePanel.removeClass('active');

            !navItems.eq(index).hasClass('active') && navItems.eq(index).addClass('active');
            !navPanels.eq(index).hasClass('active') && navPanels.eq(index).addClass('active');

            goPanel(index, elem);
        }
    }

    function init(elem) {
        var $navItems = elem.find('.container .nav li');
        $navItems.each(function (index, element) {
            element.on('click', function () {
                choosePanel(index, element);
            });
        });
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var $element = zp(this.element);
        init($element);
    };
    return customElem;
});
