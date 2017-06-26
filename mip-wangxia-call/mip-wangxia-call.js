/**
 * @author: Qi
 * @date: 2016-12-15
 * @file: mip-wangxia-call.js
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var Element = this.element;
        var Qicall = Element.getAttribute('Qi-call') || '';

        var loadNode = document.createElement('script');
        loadNode.type = 'text/javascript';
        loadNode.src = '//tj.hackhome.com/mipjs/call.js';
        Element.appendChild(loadNode);

        loadNode.onload = function () {
            var callNode = document.createElement('script');
            var callHtml = [
                'try {Qinit("' + Qicall + '");}',
                'catch (e) {console.error("Mip-WangXia-Call:"," > ',
                ' > "+e.name+": "+e.message+"");}'
                ];
            callNode.type = 'text/javascript';
            callNode.innerHTML = callHtml.join('');
            Element.appendChild(callNode);
        };
    };
    return customElement;
});
