/**
 * @file mip-sina-rem 组件
 * @author FengZihao
 */

define(function (require) {
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var baseFontSize = 100;
        var clientWidth = document.documentElement.clientWidth || window.innerWidth;
        var innerWidth = Math.max(Math.min(clientWidth, 480), 320);
        var rem = 50;

        var element = this.element;
        var baseWidth = parseFloat(element.getAttribute('base-width')) || 750;
        var scale320 = parseFloat(element.getAttribute('scale-320')) || 0.99;
        var scale362 = parseFloat(element.getAttribute('scale-362')) || 1;
        var scale375 = parseFloat(element.getAttribute('scale-375')) || 1;
        var scale414 = parseFloat(element.getAttribute('scale-414')) || 0.97;
        var scale414plus = parseFloat(element.getAttribute('scale-414plus')) || scale414;

        if (innerWidth <= 320) {
            rem = Math.floor(innerWidth / baseWidth * baseFontSize * scale320);
        }
        else if (innerWidth > 320 && innerWidth <= 362) {
            rem = Math.floor(innerWidth / baseWidth * baseFontSize * scale362);
        }
        else if (innerWidth > 362 && innerWidth <= 375) {
            rem = Math.floor(innerWidth / baseWidth * baseFontSize * scale375);
        }
        else if (innerWidth > 375 && innerWidth <= 414) {
            rem = Math.floor(innerWidth / baseWidth * baseFontSize * scale414);
        }
        else {
            rem = Math.floor(innerWidth / baseWidth * baseFontSize * scale414plus);
        }
        document.querySelector('html').style.fontSize = rem + 'px';
    };
    return customElement;
});
