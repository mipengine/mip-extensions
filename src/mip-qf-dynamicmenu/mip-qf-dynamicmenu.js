/**
 * @file mip-qf-dynamicmenu 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        initDaynamicBar();
    };

    return customElement;
});

/*
 * 初始化动态导航栏
 */
function initDaynamicBar() {
    var wt = 1.3; // 占据空间（宽度+外边距）
    var ul = document.querySelector('.list-scroll');
    if (!ul) {
        return error();
    }


    var lis = ul.querySelectorAll('li');
    if (!lis) {
        return error();
    } else if (lis.length < 5) { // 不足一屏
        return;
    }

    var index = -1; // 选中li的索引
    for (var i = 0; i < lis.length; i++) {
        if ($(lis[i]).hasClass('active')) {
            index = i;
            break;
        }
    }

    var mul = 2 - index; // 位移因数
    switch (index) {
        case -1:
            {
                return error();
            }
        case 0:
            {
                cloneNode(lis.length - 1, 'b');
                cloneNode(lis.length - 2, 'b');
                mul -= 2;
                break;
            }
        case 1:
            {
                cloneNode(lis.length - 1, 'b');
                mul -= 1;
                break;
            }
        case lis.length - 2:
            {
                cloneNode(0, 'a');
                break;
            }
        case lis.length - 1:
            {
                cloneNode(0, 'a');
                cloneNode(1, 'a');
                break;
            }
    }

    ul.style.marginLeft = mul * wt + 'rem'; // 位移公式

    function cloneNode(i, method) { // 克隆节点判断函数
        $(lis[i]).clone()[method === 'a' ? 'appendTo' : 'prependto']($(ul));
    }
}

/**
 * 初始化失败警告
 */
function error() {
    console.warn('导航栏初始化失败');
}