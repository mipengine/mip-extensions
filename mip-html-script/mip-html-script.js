/**
 * @author: Qi
 * @date: 2016-12-15
 * @file: mip-html-script.js
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var Element = this.element;
        var Qisrc = Element.getAttribute('Qi-src') || '';
        var Qicall = Element.getAttribute('Qi-call') || '';
        if (Qisrc === '' || Qicall === '') {
            Element.parentNode.removeChild(Element);
            console.warn('Mip-Html-Script:', 'Qi-src Or Qi-call Is NuLL , This Element Has Been Remove');
            return false;
        }

        var loadNode = document.createElement('script');
        loadNode.type = 'text/javascript';
        loadNode.src = Qisrc;
        Element.appendChild(loadNode);

        loadNode.onload = function () {
            var callNode = document.createElement('script');
            var callHtml = [
                'try {' + Qicall + '}',
                'catch (e) {console.error("Mip-Html-Script:","' + Qicall + ' Fatal Error");}'
                ];
            callNode.type = 'text/javascript';
            callNode.innerHTML = callHtml.join('');
            Element.appendChild(callNode);
        };
    };
    return customElement;
});
