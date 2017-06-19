/**
 * @file
 * 谷歌广告
 * @author smileU
 * @version 1.1.1
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var ele = this.element;
        var adClient = ele.getAttribute('ad-client');
        var adSlot = ele.getAttribute('ad-slot');
        var adFormat = ele.getAttribute('ad-format');
        var insTag = document.createElement('ins');
        var width = ele.getAttribute('ad-width');
        var height = ele.getAttribute('ad-height');
        var scriptTag1 = document.createElement('script');
        scriptTag1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            scriptTag1.setAttribute('async', 'true');
        var scriptTag2 = document.createElement('script');
        if (!(adSlot)) {
            scriptTag2.innerHTML = '(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"'
                + '' + adClient + '",enable_page_level_ads:true});';
            ele.appendChild(scriptTag1);
            ele.appendChild(scriptTag2);
        }
        else {
            if (adFormat) {
                insTag.setAttribute('data-ad-format', adFormat);
                insTag.setAttribute('style', 'display:block');
            }
            else {
                insTag.setAttribute('style', 'display:inline-block;width:' + width + 'px;height:'
                    + height + 'px');
            }
            insTag.classList.add('adsbygoogle');
            insTag.setAttribute('data-ad-client', adClient);
            insTag.setAttribute('data-ad-slot', adSlot);
            scriptTag2.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
            ele.appendChild(scriptTag1);
            ele.appendChild(insTag);
            ele.appendChild(scriptTag2);
        }
    };
    return customElement;
});
