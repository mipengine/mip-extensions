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
        var adClient = ele.getAttribute('ad-client');
        var adSlot = ele.getAttribute('ad-slot');
        var adFormat = ele.getAttribute('ad-format');
        var htmlCon = document.getElementsByTagName('head')[0] || document.head || document.documentElement;
        var scriptTag1 = document.createElement('script');
        scriptTag1.setAttribute('type', 'text/javascript');
        scriptTag1.setAttribute('charset', 'UTF-8');
        scriptTag1.setAttribute('async', 'true');
        scriptTag1.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        htmlCon.appendChild(scriptTag1);
        var insTag = document.createElement('ins');
        insTag.classList.add('adsbygoogle');
        insTag.setAttribute('style', 'display:block');
        insTag.setAttribute('data-ad-client', adClient);
        insTag.setAttribute('data-ad-slot', adSlot);
        insTag.setAttribute('data-ad-format', adFormat);
        htmlCon.appendChild(insTag);
        var scriptTag2 = document.createElement('script');
        scriptTag2.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
        htmlCon.appendChild(scriptTag2);
    };
    return customElement;
});

