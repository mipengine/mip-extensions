/**
 * @file mip-history 组件
 * @author Jenny_L(jiaojiaomao220@163.com)
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * trigger when history btn clicked
     */
    function btnClick() {
        var history = this.getAttribute('history');
        if (history) {
            // histry: go back and forward
            var historyArr = history.split(',');
            var func = historyArr[0];
            // XXX: avoid using eval
            switch (func) {
                case 'go':
                    var step = historyArr[1];
                    if (step) {
                        window.history.go(step - 0);
                    }
                    else {
                        console.warn('history.go() 需要填写第二个参数');
                    }
                    break;
                case 'back':
                    window.history.back();
                    break;
                case 'forward':
                    window.history.forward();
                    break;
            }
        }
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var ele = this.element;

        ele.addEventListener('click', btnClick, false);
    };

    return customElement;
});
