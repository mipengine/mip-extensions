/**
* @file 自用查看更多
* @author jfdsies@gmail.com
* @version 1.0.0
* @copyright 2016 yjbys.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = function(selector) {
        var selectorType = 'querySelectorAll';

        if(selector.indexOf('#') === 0){
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }else if(selector.indexOf('.') === 0){
            selectorType = 'getElementsByClassName';
            selector = selector.substr(1, selector.length);
        }

        return document[selectorType](selector);
    };
    var customElement = require('customElement').create();

    function html_decode(str) {
        var s = "";
        if (str.length < 1) return "";
        s = str.replace(/&/g, "&");
        s = s.replace(/</g, "<");
        s = s.replace(/>/g, ">");
        s = s.replace(/ /g, " ");
        s = s.replace(/'/g, "\'");
        s = s.replace(/"/g, "\"");
        return s;
    }

    customElement.prototype.build = function () {
        var me = this.element;
        var maxlen = me.getAttribute('maxlen');
        var buttitle = me.getAttribute('buttitle');
        var element = me.getAttribute('element');
        maxlen = maxlen ? maxlen : 666;
        buttitle = buttitle ? buttitle : '查看更多';
        element = element ? $(element)[0] : $('.content')[0];

        var content = html_decode(element.innerHTML);
        var conlen = content.length;
        var intag = false, len = 0, tmp = '';
        for(var i = 0;;i++){
            if(len >= maxlen){
                len = i;break;
            }
            if(i >= conlen){
                len = conlen;break;
            }
            tmp = content.charAt(i);
            if(tmp == '<' && !intag){
                intag = true;
                continue;
            }else if(tmp == '>' && intag){
                intag = false;
                continue;
            }else if(intag || tmp=='' || tmp==' ' || tmp=='\r' || tmp=='\n'){
                continue;
            }
            len++;
        }
        if(content != undefined && conlen > len){
            me.innerHTML = '<div class="mip-content-readmore"><em><code class="mip-readmore-fx"></code></em><span>'+buttitle+'</span></div>';
            element.innerHTML = content.substring(0, len) + " ......";
            $('.mip-content-readmore')[0].onclick = function(){
                element.innerHTML = content;
                me.innerHTML = '';
            };
        }
    };

    return customElement;
});
