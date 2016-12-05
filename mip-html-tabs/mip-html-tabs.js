/**
 * @author: Qi
 * @date: 2016-11-01
 * @file: mip-html-tabs.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var qi = require('zepto');
    var port = require('viewport');

	// tabs-type 分配执行函数。
    function sethtmltabs(OrThis, OrType) {
        switch (OrType) {
            case 'Qi_2':
                toggleclick(OrThis);
                break;
            case 'Qi_3':
                showclick(OrThis);
                break;
            case 'Qi_4':
                tabsclick(OrThis);
                break;
            case 'Qi_5':
                scrollclick(OrThis);
                break;
            default :
                dropdown(OrThis);
        }
    }
	// tabs-type=1 当内容高度大于设置高度后展开、隐藏操作。
    function dropdown(OrThis) {
        var OrHeight = OrThis.attr('tabs-height');
        var OrContent = OrThis.attr('tabs-html');
        var OrCHeight = qi(OrContent).height();
        var OrShowBtn = OrThis.attr('tabs-show');
        var OrHideBtn = OrThis.attr('tabs-hide');
        var OrIsShow = OrThis.attr('tabs-init');
        var IsShow = OrIsShow ? OrIsShow : 0;
        var IsHeight = OrHeight ? OrHeight : 300;
        var callShow = function () {
            qi(OrContent).css({display: 'block', height: 'auto', overflow: 'initial'});
            qi(OrHideBtn).show();
            qi(OrShowBtn).hide();
        };
        var callHide = function () {
            qi(OrContent).css({display: 'block', height: IsHeight + 'px', overflow: 'hidden'});
            qi(OrHideBtn).hide();
            qi(OrShowBtn).show();
        };
        if (OrCHeight > IsHeight) {
            if (IsShow === 0) {
                callHide();
            }
			else {
                callShow();
            }
            qi(OrShowBtn).on('click', function () {
                callShow();
            });
            qi(OrHideBtn).on('click', function () {
                callHide();
            });
        }
		else {
            qi(OrHideBtn).remove();
            qi(OrShowBtn).remove();
        }
    }
	// tabs-type=2 设置一个点击元素，执行toggle显示隐藏操作。
    function toggleclick(OrThis) {
        var OrOnck = OrThis.attr('tabs-on');
        var OrToggle = OrThis.attr('tabs-toggle');
        var OrIsShow = OrThis.attr('tabs-init');
        var IsShow = OrIsShow ? OrIsShow : 0;
        if (IsShow === 0) {
            qi(OrToggle).hide();
        }
        else {
            qi(OrToggle).show();
        }
        qi(OrOnck).on('click', function () {
            qi(OrToggle).toggle();
        });
    }
	// tabs-type=3 设置两个点击元素，执行显示隐藏操作。
    function showclick(OrThis) {
        var OrShow = OrThis.attr('tabs-show');
        var OrHide = OrThis.attr('tabs-hide');
        var OrToggle = OrThis.attr('tabs-toggle');
        var OrIsShow = OrThis.attr('tabs-init');
        var OrSclass = OrThis.attr('show-class');
        var OrHclass = OrThis.attr('hide-class');
        var IsShow = OrIsShow ? OrIsShow : 0;
        var IsSclass = OrSclass ? OrSclass : '';
        var IsHclass = OrHclass ? OrHclass : '';
        var callShow = function () {
            qi(OrToggle).show();
            qi(OrShow).hide();
            qi(OrHide).show();
            if (IsSclass !== '') {
                qi(OrToggle).removeClass(IsHclass);
                qi(OrToggle).addClass(IsSclass);
            }
        };
        var callHide = function () {
            qi(OrToggle).hide();
            qi(OrShow).show();
            qi(OrHide).hide();
            if (IsHclass !== '') {
                qi(OrToggle).removeClass(IsSclass);
                qi(OrToggle).addClass(IsHclass);
            }
        };
        if (IsShow === 0) {
            callHide();
        }
        else {
            callShow();
        }
        qi(OrShow).on('click', function () {
            callShow();
        });
        qi(OrHide).on('click', function () {
            callHide();
        });
    }
	// tabs-type=4 Tab内容切换。
    function tabsclick(OrThis) {
        var OrNav = OrThis.attr('tabs-nav');
        var OrKey = OrThis.attr('tabs-key');
        var OrNcur = OrThis.attr('nav-cur');
        var OrKcur = OrThis.attr('key-cur');
        var OrInit = OrThis.attr('tabs-init');
        var IsNcur = OrNcur ? OrNcur : '';
        var IsKcur = OrKcur ? OrKcur : '';
        var IsInit = OrInit ? OrInit : 0;
        IsInit = !isNaN(IsInit) ? IsInit : 0;
        IsInit = (IsInit > qi(OrNav).length || IsInit < 1) ? 0 : IsInit - 1;
        var callNav = function (i) {
            qi(OrNav).removeClass(IsNcur);
            qi(OrNav).eq(i).addClass(IsNcur);
        };
        var callTab = function (i) {
            qi(OrKey).removeClass(IsKcur).hide();
            qi(OrKey).eq(i).addClass(IsKcur).show();
        };
        callNav(IsInit);
        callTab(IsInit);
        qi(OrNav).on('click', function () {
            var Thisnum = qi(this).index();
            callNav(Thisnum);
            callTab(Thisnum);
        });
    }
	// tabs-type=5 点击元素滚动事件。
    function scrollclick(OrThis) {
        var OrKey = OrThis.attr('tabs-key');
        var OrTop = OrThis.attr('tabs-top');
        var OrTo = OrThis.attr('tabs-to');
        var OrOn = OrThis.attr('tabs-on');
        var OrEq = OrThis.attr('tabs-eq');
        var OrOf = OrThis.attr('tabs-of');
        var IsTo = OrTo ? OrTo : '';
        var IsOn = OrOn ? OrOn : '';
        var IsEq = OrEq ? OrEq : 0;
        var IsOf = OrOf ? OrOf : 0;
        var IsTop = OrTop ? OrTop : 0;
        if (IsTop > 0) {
            qi(OrKey).hide();
            port.on('scroll', function () {
                if (port.getScrollTop() > IsTop) {
                    qi(OrKey).show();
                }
                else {
                    qi(OrKey).hide();
                }
            });
        }
        qi(OrKey).on('click', function () {
            if (IsTo !== '') {
                var Toint = 0;
                switch (OrTo) {
                    case 'top':
                        Toint = 0;
                        break;
                    case 'bottom':
                        Toint = port.getScrollHeight();
                        break;
                    default :
                        Toint = qi(OrTo).offset().top;
                }
                Toint = Toint + IsOf * 1;
                port.setScrollTop(Toint);
            }
            if (IsOn !== '') {
                qi(IsOn).eq(IsEq).click();
            }
        });
    }
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = qi(this.element);
        var OrType = element.attr('tabs-type');
        sethtmltabs(element, OrType);
        if (element.html().length === 0) {
            element.remove();
        }
    };
    return customElem;
});
