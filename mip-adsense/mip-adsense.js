/**
* @file
* 广告
* @author smileU
* @version 1.0.0
*/
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var ele = this.element;
        var className = ele.getAttribute('class');
        var dataAdClient = ele.getAttribute('data-ad-client');
        var dataAdSlot = ele.getAttribute('data-ad-slot');
        var dataAdFormat = ele.getAttribute('data-ad-format');
        var htmlCon = document.getElementsByTagName('head')[0] || document.head || document.documentElement;
        var tag1 = document.createElement('script');
        tag1.setAttribute('type', 'text/javascript');
        tag1.setAttribute('charset', 'UTF-8');
        tag1.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        htmlCon.appendChild(tag1);
        var tag2 = document.createElement('ins');
        tag2.setAttribute('class', className);
        tag2.setAttribute('data-ad-client', dataAdClient);
        tag2.setAttribute('data-ad-slot', dataAdSlot);
        tag2.setAttribute('data-ad-format', dataAdFormat);
        tag2.setAttribute('class', 'adsbygoogle');
        tag2.setAttribute('style', 'display:block');
        htmlCon.appendChild(tag2);
        var tag3 = document.createElement('script');
        tag3.innerHTML('(adsbygoogle=window.adsbygoogle||[]).push({});');
        htmlCon.appendChild(tag2);
    };
    return customElement;
});

