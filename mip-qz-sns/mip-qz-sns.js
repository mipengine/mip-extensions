/**
* @file 前瞻网分享、点赞组件
* @author ningsong
* @time 2016.11.09
*/
define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
    * 构造元素，只会运行一次
    */
    customElement.prototype.build = function () {
        var element = this.element;
        if (element.isRender) {
            return;
        }
        element.isRender = true;

        var $element = $(element);

        $element.find(".up").bind("click", function () {
            iZan(element);
        });

        var source = element.getAttribute("source");
        var sourceurl = element.getAttribute("sourceurl");

        $element.find(".weibo").bind("click", function () {
            shared2(2, source, sourceurl);
        });

        $element.find(".zone").bind("click", function () {
            shared2(0, source, sourceurl);
        });

        var $dom = undefined;
        $element.find(".weixin").bind("click", function () {
            if ($dom == undefined) {
                var wximg = "http://pan.baidu.com/share/qrcode?w=200&h=200&url=" + encodeURIComponent(document.URL);
                $dom = $("<table class='boxy-wrapper fixed' style='z-index: 1338; top: 50%; left: 50%; margin-left: -175px; margin-top: -175px;'>" +
                      "<tbody>" +
                          "<tr>" +
                              "<td class='boxy-top-left'></td>" +
                              "<td class='boxy-top'></td>" +
                              "<td class='boxy-top-right'></td>" +
                          "</tr>" +
                          "<tr>" +
                              "<td class='boxy-left'></td>" +
                              "<td class='boxy-inner'>" +
                                  "<div class='title-bar'>" +
                                      "<h2 style='margin-right:57px;'>微信扫一扫下面二维码</h2>" +
                                      "<a class='close'></a>" +
                                  "</div>" +
                                  "<div class='boxy-content' style='display: block; width: 310px; height: 310px;'>" +
                                      "<img alt='' src='" + wximg + "'>" +
                                  "</div>" +
                              "</td>" +
                              "<td class='boxy-right'></td>" +
                          "</tr>" +
                          "<tr>" +
                              "<td class='boxy-bottom-left'></td>" +
                              "<td class='boxy-bottom'></td>" +
                              "<td class='boxy-bottom-right'></td>" +
                          "</tr>" +
                      "</tbody>" +
                      "</table>");
                $element.append($dom);
                $dom.find("a.close").bind("click", function () {
                    $dom.hide();
                });
            } else {
                $dom.show();
            }

        });
    };

    function shared2(s2, source, sourceurl) {
        var title = $(document).attr("title");
        title = title == undefined ? "" : title;
        var desc = $("meta[name='Description']").attr("content");
        desc = desc == undefined ? "" : desc;
        desc = desc.substring(0, 100);
        return shareText22(s2, document.URL, title, '', desc, source, sourceurl);
    }

    function shareText22(s2, url, title, picurl, summary, source, sourceurl) {
        var query = {};
        if (s2 == 2) {
            query = { url: url, title: summary, source: source, sourceurl: sourceurl, content: 'utf-8', pic: picurl };
            popupOAuthLoginWin('http://service.weibo.com/share/share.php?' + $.param(query), '', 620, 480, ($(window).width() - 620) / 2, ($(window).height() - 480) / 2);
        } else if (s2 == 1) {
            query = { c: 'share', a: 'index', url: url, title: summary, pic: picurl };
            popupOAuthLoginWin('http://share.v.t.qq.com/index.php?' + $.param(query), '', 620, 370, ($(window).width() - 620) / 2, ($(window).height() - 370) / 2);
        } else if (s2 == 0) {
            query = { url: url, title: title, pics: picurl, summary: summary };
            popupOAuthLoginWin('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + $.param(query), '', 620, 480);
        }
        return false;
    }

    function popupOAuthLoginWin(url, title, width, height) {
        window.open(url, title, "height=" + height + ", width=" + width + ", top=10, left=10, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no");
        return false;
    }

    function iZan(element) {
        var $element = $(element);
        var num = $element.find("li.up span");
        if (!num.attr("add")) {
            try {
                var numVal = parseInt(num.html().replace('赞 ', '')) + 1;
                num.html('赞 ' + numVal.toString());
                num.attr("add", "1");
                var url = element.getAttribute("url");
                var data = element.getAttribute("params");
                $.getScript(url + "?" + $.param(JSON.parse(data)), function () {
                    if (success) {
                        alert("提交成功，感谢您的参与！");
                    } else {
                        alert("您已提交过“赞”， 感谢您的参与！");
                    }
                });
            } catch (e) { }

        } else {
            alert("您已提交过“赞”， 感谢您的参与！");
        }
    }

    return customElement;

});

