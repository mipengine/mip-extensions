/**
* @file 自用查看更多
* @author jfdsies@gmail.com
* @version 1.0.0
* @copyright 2016 yjbys.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');
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
        var element = me.getAttribute('element');
        maxlen = maxlen ? maxlen : 666;
        element = element ? element : '.content';

        var content = html_decode($(element).html());
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
            $(element).after('<style>.more{text-align:center;height:30px;width:94px;margin:auto;line-height:30px;margin-bottom:10px;cursor:pointer;display:block;}.more em{display:inline-block;height:20px;width:20px;background:#3c91c7;border-radius:50px;margin-right:5px;float:left;margin-top:6px;position: relative;}.more span{display:inline-block;float:left;font-size:17px;color:#2184c4;}.fx:after,.fx:before{width: 0;height: 0;font-size: 0;border:.45rem solid transparent;border-top: .45rem solid #3c91c7;display: inline-block;position: absolute;top: .3rem;left: .2rem;content: "";}.fx:before{border-top-color: #fff;top: .45rem;}</style><div class="more"><em><code class="fx"></code></em><span>查看更多</span></div>');
            $(element).html(content.substring(0, len) + " ......");
            $(document).on("click", ".more", function () {
                if ($(this).find("code").hasClass("fx")) {
                    $(".content").html(content);
                    $(this).remove();
                }
            });
        }
    };

    return customElement;
});
