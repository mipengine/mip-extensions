/**
* 寻医问药mip改造 疾病网功能组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2016.12.23
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var jibFunction = function () {
        var itemInpDef = '帮您寻医问药';
        $('#item_so_keyword').on({
            focus: function () {
                if ($(this).val() === itemInpDef) {
                    $(this).val('');
                    $(this).css('color', '#666');
                }
            },
            blur: function () {
                if ($(this).val() === '') {
                    $(this).val(itemInpDef);
                    $(this).css('color', '#c6c6c6');
                }
            }
        });
        $('.item-hd-so-input-box').on('click', function () {
            $('.item-hd-so-area').addClass('item-hd-so-focus');
        });
        $('.item-hd-so-back').on('click', function () {
            $('.item-hd-so-area').removeClass('item-hd-so-focus');
            $('#item_so_keyword').val(itemInpDef).css('color', '#c6c6c6');
        });
        $('#item_hd_form form').on('submit', function () {
            var textVal = $.trim($('#item_so_keyword').val());
            var srcType = $('#item_so_keyword').attr('src_type');
            if (textVal === '帮您寻医问药') {
                textVal = '';
            }
			else {
                textVal = textVal;
            }
            $(this).attr('method', 'post').attr('action', 'http://m.so.xywy.com/comse.php?src=' + srcType + '&keyword=' + encodeURIComponent(textVal));
        });
        $('.ui-qnav').on('click', function () {
            $('#downList').toggle();
        });
        $('.simulate-sel').on({
            click: function () {
                var self = $(this);
                var selBox = self.parent().find('.pro-selectDiv');
                if (self.hasClass('on')) {
                    self.removeClass('on');
                    selBox.hide();
                }
				else {
                    self.addClass('on');
                    selBox.show();
                }
            }
        });
        var hostN = '3g.jib.xywy.com';
        function subStr(n, str) {
            return str.length > n ? str.slice(0, n) + '...' : str;
        }
        $('.pro-selectDiv').on({
            click: function (e) {
                var self = $(this);
                var target = $(e.target);
                var selectBox = self.parent().find('.simulate-sel');
                var showTxt = selectBox.find('span');
                var txt = target.text();
                var illKey = selectBox.attr('accesskey');
                var illid = selectBox.attr('ill-id');
                var areaId = target.attr('value');
                showTxt.text(txt);
                self.hide();
                selectBox.removeClass('on');
                if (!illKey) {
                    return false;
                }
                if (self.hasClass('zhuanjia')) {
                    $.ajax({
                        type: 'GET',
                        data: {
                            areaId: areaId,
                            illKey: illKey,
                            illid: illid
                        },
                        url: 'http://' + hostN + '/index/zhuanjia',
                        dataType: 'jsonp',
                        jsonpCallback: 'returnMsg',
                        success: function (data) {
                            if (data !== 'error') {
                                var list = '';
                                var lLen = data.data.length > 3 ? 3 : data.data.length;
                                for (var i = 0; i < lLen; i++) {
                                    list += '<dl class="zt-ysyy dis-box">' + '<dd class="box-flex">' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/doctor-' + data.data[i].document_id + '.htm class="text-elli mb8"><h6 class="f15">' + data.data[i].name + '<span class="f12 cl666 ml10">' + data.data[i].title + '</span></h6></a>' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/doctor-' + data.data[i].document_id + '.htm class="f12 cl999 mb8"><p><span class="cl999 mr5">' + data.data[i].hospital + '</span><span class="cl999">' + data.data[i].depart + '</span></p> </a>' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/doctor-' + data.data[i].document_id + '.htm class="f12 cl999 mb8">擅长：' + subStr(20, data.data[i].goodat) + '</a>' + '</dd>' + '<dt>' + '<a target="_blank" href="http://3g.club.xywy.com/ask.php?fromurl=3gjib&amp;did=' + data.data[i].club_id + '&expertid=' + data.data[i].expert_id + ' class="bgfd9">咨询</a>' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/plus.php?doctorid=' + data.data[i].document_id + ' class="bg57c">预约转诊</a>' + '</dt>' + '</dl>';
                                }
                                $('#zhuanjiaCont').empty().html(list);
                            }
                        }
                    });
                }
                else if (self.hasClass('yiyuan')) {
                    $.ajax({
                        type: 'GET',
                        data: {
                            areaId: areaId,
                            illKey: illKey,
                            illid: illid
                        },
                        url: 'http://' + hostN + '/index/hospital',
                        dataType: 'jsonp',
                        jsonpCallback: 'returnMsg',
                        success: function (data) {
                            if (data !== 'error') {
                                var docList = '';
                                var lLen = data.data.length > 3 ? 3 : data.data.length;
                                for (var i = 0; i < lLen; i++) {
                                    docList += '<dl class="zt-ysyy dis-box">' + '<dd class="box-flex">' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/yiyuan-' + data.data[i].document_id + '-1.htm class="text-elli mb8"><h6 class="f15">' + data.data[i].name + '</h6></a>' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/yiyuan-' + data.data[i].document_id + '-1.htm class="f12 cl999 mb8" clicken="ill_detail_findHos_334"><p><span class="cl999 mr5">医院等级<i>：</i></span><span class="cl999">' + data.data[i].level + '</span></p> </a>' + '</dd>' + '<dt>' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/yiyuan-' + data.data[i].document_id + '-1.htm class="bgfd9" clicken="ill_detail_findHosSee_334">查看</a>' + '<a target="_blank" href="http://3g.zhuanjia.xywy.com/yiyuanb-' + data.data[i].document_id + '-' + illid + '.htm class="bg57c" clicken="ill_detail_findHosAppo_334">预约转诊</a>' + '</dt>' + '</dl>';
                                }
                                $('#hosiptalContent').empty().html(docList);
                            }
                        }
                    });
                }
            }
        });
        function showErrorMessage(a, b, c) {
            if (!arguments[1]) {
                b = 100;
            }
            if (!arguments[2]) {
                c = 2e3;
            }
            $('body').append('<section id="showMessage" style="display:none;position: fixed;z-index: 99;top:' + b
             + 'px;left: 50%;background: rgba( 0 , 0 , 0 ,.8);color: #fff;margin: -15px 0 0 -100px;'
             + 'width: 200px;height: 30px;line-height: 30px;border-radius: 5px;'
             + 'box-shadow: 0 1px 0 1px rgba(0,0,0,.2);text-align: center; font-size:14px;">' + a
             + '</section>');
            $('#showMessage').show();
            setTimeout(function () {
                $('#showMessage').hide();
                $('#showMessage').remove();
            }, c);
        }
        $('#search3gJib').on('click', function () {
            var keyword = $.trim($('input[name="keyword"]').val());
            if (!keyword) {
                showErrorMessage('请输入关键词');
                return false;
            }
            $(this).attr('action', 'http://m.so.xywy.com/comse.php?keyword=' + encodeURIComponent(keyword));
        });
        $('#searchBaidu').on('click', function () {
            var keyword = $.trim($('input[name="keyword"]').val());
            if (!keyword) {
                showErrorMessage('请输入关键词');
                return false;
            }
            var baiduUrl = 'http://m.baidu.com/from=1269a/s?word=' + keyword + '&ts=6400375&t_kt=191&sa=ib&ss=110&qq-pf-to=pcqq.c2c';
            window.location.href = baiduUrl;
        });
    };
    customElem.prototype.build = function () {
        // var elem = this.element;
        jibFunction();
    };
    return customElem;
});
