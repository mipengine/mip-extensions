/**
 * @file  jjpz
 * @author elang126(liiang2006@126.com)
 */

/**
 * @date:  2016-12-28
 * @time: 13:10
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var param = {
        data: {
            FCODE: '',
            deviceid: 'Wap',
            version: '4.3.0',
            product: 'EFund',
            plat: 'Wap'
        },
        dataPage: {
            FCODE: '',
            deviceid: 'Wap',
            version: '4.3.0',
            product: 'EFund',
            plat: 'Wap',
            pageIndex: 1,
            pageSize: 3
        },
        apiurl: 'https://fundmobapi.eastmoney.com/FundMApi/',
        funurl: 'http://m.1234567.com.cn/m/fund/funddetail/',
        funBuyUrl: 'https://tradewap.1234567.com.cn/buyfund.html',
        sameCompany: 'http://m.1234567.com.cn/m/fund/jjjz.shtml',
        sameType: 'http://m.1234567.com.cn/m/fund/jjph.shtml',
        fundtype: '',
        fundGetType: 1,
        isclick: {
            gotoJBCC: true,
            gotoFHPS: true,
            gotoJJJL: true,
            gotoJJGG: true
        },
        page: {
            gotoJJGG: 1,
            gotoFHPS: 1
        }
    };
    var optionjjba = {
        deviceid: 'Wap',
        ps: 20,
        plat: 'Wap',
        product: 'Fund',
        version: '201',
        code: 'of' + param.data.FCODE,
        p: '',
        type: '',
        postid: 10,
        sorttype: 0
    };
    var timeoutFun = function () {};
    var $f = {
        init: function () {
            var tthis = this;
            tthis.tAjax('FundBase.ashx', param.data, tthis.baseLoad);
            tthis.tAjax('FundSameCompanyList.ashx', param.data, tthis.sameCompany);
            tthis.tAjax('FundSameTypeList.ashx', param.dataPage, tthis.sameType);
            tthis.discussLink();
        },
        baseLoad: function (datas) {
            var data = datas.Datas;
            switch (data.FUNDTYPE) {
                case '003':
                    param.fundtype = 5;
                    param.fundGetType = 1;
                    break;
                case '004':
                case '005':
                    param.fundtype = 10;
                    param.fundGetType = 2;
                    break;
                case '006':
                    param.fundtype = 7;
                    param.fundGetType = 1;
                    break;
                case '007':
                    param.fundtype = 8;
                    param.fundGetType = 1;
                    break;
                case '201':
                    param.fundtype = 12;
                    param.fundGetType = 1;
                    break;
                default:
                    param.fundtype = 3;
                    param.fundGetType = 1;
                    break;

            }
            var RISKLEVEL = ['--', '低风险', '中低风险', '中风险', '中高风险', '高风险'];
            var RISKLEVELname;
            var RISKLEVELt;
            RISKLEVELt = Number(data.RISKLEVEL);
            switch (RISKLEVELt) {
                case 0:
                    RISKLEVELname = RISKLEVEL[0];
                    break;
                case 1:
                    RISKLEVELname = RISKLEVEL[1];
                    break;
                case 2:
                    RISKLEVELname = RISKLEVEL[2];
                    break;
                case 3:
                    RISKLEVELname = RISKLEVEL[3];
                    break;
                case 4:
                    RISKLEVELname = RISKLEVEL[4];
                    break;
                case 5:
                    RISKLEVELname = RISKLEVEL[5];
                    break;
            }
            var date2;
            var dellineData;
            data.DWJZ = $f.initNumber2(data.DWJZ, 4, true);

            $f.bindData(data.SHORTNAME, '.Fname');
            $f.bindData('(' + data.FCODE + ')', '.coder', '.header1');
            $f.bindData(data.FTYPE, '.header2', '.ui_outer');
            $('.baseInfo_url').find('.jjxx-h').append('<span class="ui_gray">' + data.FTYPE + '</span>');
            if (RISKLEVELname !== '--') {
                $('.ui_outer').find('.header2').append('<span class="split">|</span>' + RISKLEVELname);
                $('.baseInfo_url').find('.jjxx-h').append('<span class="split">|</span>' + RISKLEVELname);
            }

            if (data.RLEVEL_SZ !== null && data.RLEVEL_SZ !== '--' && data.RLEVEL_SZ !== '') {
                $('.ui_outer').find('.header2').append('<span class="split">|</span>' + data.RLEVEL_SZ + '星评级');
                $('.baseInfo_url').find('.jjxx-h').append('<span class="split">|</span>' + data.RLEVEL_SZ + '星评级');
            }
            if (param.fundGetType === 1) {
                $('.Fearnings').html('最新净值（<span class="numberFont">' + data.FSRQ.slice(5, 10) + '</span>）');
                $('.FearningsDay').html('日涨幅');
                var DWJZJ = $f.initNumber2(data.DWJZ, 4, true);
                $f.bindData(DWJZJ, '.FearningsN1', 0, $f.isRed(data.RZDF));
                $f.bindData($f.initNumber2(data.RZDF, 2), '.FearningsN2', 0, $f.isRed(data.RZDF));
                var valuationG = data.Valuation ? (JSON.parse(data.Valuation).gsz) : '--';
                var valuationColor = data.Valuation ? $f.isRed(JSON.parse(data.Valuation).gszzl) : '';
                $f.bindData(valuationG, 'span:nth-child(2)', '.Fevaluation', valuationColor);
                var ValuationGL = data.Valuation ? ($f.initNumber2(JSON.parse(data.Valuation).gszzl, 2)) : '--';
                var valuationglColor = data.Valuation ? $f.isRed(JSON.parse(data.Valuation).gszzl) : '';
                $f.bindData(ValuationGL, 'span:nth-child(3)', '.Fevaluation', valuationglColor);
                $('.tab').html('<p class="active" data-imgurl="https://j4img.1234567.com.cn/charts/pic1/">净值估值</p><p data-imgurl="https://j3img.1234567.com.cn/images/JJJZ5/">单位净值</p><p data-imgurl="https://j3img.1234567.com.cn/images/syl4/">累计收益</p>');
                $('.tabContent').html('<img src="https://j4img.1234567.com.cn/charts/pic1/' + param.data.FCODE + '.png">');
                date2 = data.Valuation ? JSON.parse(data.Valuation).gztime.substring(5, 16) : '';
                $f.bindData('(' + date2 + ')', 'span:nth-child(4)', '.Fevaluation');
                var dataJN = $f.initNumber2(data.SYL_JN, 2);
                var dataY = $f.initNumber2(data.SYL_Y, 2);
                var data6Y = $f.initNumber2(data.SYL_6Y, 2);
                var data1N = $f.initNumber2(data.SYL_1N, 2);
                var colorJN = $f.isRed(data.SYL_JN);
                var colorY = $f.isRed(data.SYL_Y);
                var color6Y = $f.isRed(data.SYL_6Y);
                var color1N = $f.isRed(data.SYL_1N);
                $f.bindData(dataJN, 'span', '.Info_url div:nth-child(1)', colorJN);
                $f.bindData(dataY, 'span', '.Info_url div:nth-child(2)', colorY);
                $f.bindData(data6Y, 'span', '.Info_url div:nth-child(3)', color6Y);
                $f.bindData(data1N, 'span', '.Info_url div:nth-child(4)', color1N);
            }
            else {
                $('.Fearnings').html('万份收益（<span class="numberFont">' + data.FSRQ.slice(5, 10) + '</span>）');
                var DWJZW = $f.initNumber2(data.DWJZ, 4, true);
                $f.bindData(DWJZW, '.FearningsN1', 0, $f.isRed(data.SYI));
                $f.bindData($f.initNumber2(data.SYI, 4), '.FearningsN2', 0, $f.isRed(data.SYI));
                $('.FearningsDay').html('7日年化');
                $('.tab').addClass('tabtwo').html('<p class="active" data-imgurl="https://j3img.1234567.com.cn/images/JJJZ5/">万元收益</p><p data-imgurl="https://j3img.1234567.com.cn/images/JJJZ6/" class="">7日年化</p>');
                $('.tabContent').html('<img src="https://j3img.1234567.com.cn/images/JJJZ5/' + param.data.FCODE + '.png">');
                $('.Fevaluation').hide();
                $('.Info_url div:nth-child(1) font').html('14日年化：');
                $('.Info_url div:nth-child(2) font').html('28日年化：');
                $('.Info_url div:nth-child(3) font').html('今年来：');
                $('.Info_url div:nth-child(4) font').html('近1年：');
                var dataFTYI = $f.initNumber2(data.FTYI, 2);
                var dataTEYI = $f.initNumber2(data.TEYI, 2);
                var dataWSYLJN = $f.initNumber2(data.SYL_JN, 2);
                var dataWSYL1N = $f.initNumber2(data.SYL_1N, 2);
                $f.bindData(dataFTYI, 'span', '.Info_url div:nth-child(1) ', $f.isRed(data.FTYI));
                $f.bindData(dataTEYI, 'span', '.Info_url div:nth-child(2)', $f.isRed(data.TEYI));
                $f.bindData(dataWSYLJN, 'span', '.Info_url div:nth-child(3) ', $f.isRed(data.SYL_JN));
                $f.bindData(dataWSYL1N, 'span', '.Info_url div:nth-child(4) ', $f.isRed(data.SYL_1N));
            }

            if (data.SOURCERATE !== '' && data.SOURCERATE !== null) {
                dellineData = '<span class="ui_delLine">' + data.SOURCERATE + ' </span> ' + data.RATE;
            }
            else {
                dellineData = data.RATE;
            }
            $f.bindData(dellineData, '.ui_black.numberFont', '.buyInfo_url');
            $('.Info_url').on('click', function () {
                window.location.href = 'http://m.1234567.com.cn/m/fund/fundjdsy/' + param.data.FCODE;
            });
            if (data.BUY) {
                $('.buyJJ').on('click', function () {
                    window.location.href = 'https://tradewap.1234567.com.cn/buyfund.html#code=' + param.data.FCODE;
                });
            }
            else {
                $('.buyJJ').removeClass('ui-btn-orange').addClass('ui-btn-gray');
            }
            $f.domclick();

            $f.tAjax('FundNetDiagram.ashx', param.data, $f.diagramLoad);
        },

        diagramLoad: function (data) {
            var gotoLSSYL = $('.gotoLSSYL');
            var gotoLSSYLdiv = '';
            var datas = data.Datas;
            gotoLSSYL.find('.ui-grid-8 p').html(param.fundGetType === 1 ? '历史净值' : '历史收益率');
            gotoLSSYLdiv += '<div class="fold_content"><div class="LSSYL_scroll"><table class="ui-table"><thead>';
            if (param.fundGetType === 1) {
                gotoLSSYLdiv += '<tr><th>日期</th><th>单位净值</th><th>累计净值</th><th>日增长率</th></tr></thead><tbody>';
            }
            else {
                gotoLSSYLdiv += '<tr><th>日期</th><th>万份收益</th><th>7日年化</th></tr></thead><tbody>';
            }
            for (var i = 0; i < datas.length && i < 5; i++) {
                gotoLSSYLdiv += '<tr><td class="numberFont">' + datas[i].FSRQ + '</td>';
                gotoLSSYLdiv += '<td class="numberFont">' + $f.initNumber2(datas[i].DWJZ, 4, true) + '</td>';
                gotoLSSYLdiv += '<td class="numberFont">' + $f.initNumber2(datas[i].LJJZ, 4) + '</td>';
                if (param.fundGetType === 1) {
                    var jzzzlcolor = $f.isRed(datas[i].JZZZL);
                    var jzzzldata = $f.initNumber2(datas[i].JZZZL, 2);
                    gotoLSSYLdiv += '<td class="' + jzzzlcolor + ' numberFont">' + jzzzldata + '</td>';
                }
                gotoLSSYLdiv += '</tr>';
            }

            gotoLSSYLdiv += '</tbody></table></div>';
            if (data.TotalCount > 5) {
                gotoLSSYLdiv += '<p class="ui_alignCenter tip lssylMore"><a href="http://js1.eastmoney.com/tg.aspx?ID=4205" target="_blank">下载天天基金网APP，查看更多&gt;</a></p>';
            }

            gotoLSSYLdiv += '</div>';

            gotoLSSYL.after(gotoLSSYLdiv);
        },
        gotoJBCC: function (data) {
            if (data.Datas.length === 0) {
                $('.gotoJBCC').next('.fold_content').html('<span class="notips">暂无数据</span>');
                return;
            }

            param.isclick.gotoJBCC = false;
            var gotoJBCCcontent = $('.jbcc_scroll').find('tbody');
            var tbody = '';
            var datas = data.Datas;
            $('.cjjzri').html('截止日期：<span class="numberFont">' + datas[0].ShareDate + '</span>').show();
            for (var i = 0; i < datas.length; i++) {
                tbody += '<tr><td> <a href="http://m.quote.eastmoney.com/stock,' + datas[i].ShareCode + '.shtml">' + datas[i].ShareName + '</a></td>';
                tbody += '<td class="numberFont">' + datas[i].ShareProportion + '</td>';
                var ShareGaincolor = $f.isRed(datas[i].ShareGain);
                var ShareGaindata = $f.initNumber2(datas[i].ShareGain * 100, 2);
                tbody += '<td class="' + ShareGaincolor + ' numberFont">' + ShareGaindata + '</td></tr>';
            }
            gotoJBCCcontent.html(tbody);
        },
        sameCompany: function (data) {
            var tgsqxjjurl = $('.tgsqxjj_url');
            var pageContentTgsqxjj = $('.pageContentTgsqxjj');
            var thisul = pageContentTgsqxjj.find('.fund-list');
            tgsqxjjurl.attr('data-href', param.sameCompany + '?companyid=' + data.Expansion + '#1');
            $f.bindData(data.TotalCount, '.numberFont', '.tgsqxjj_url');
            var datas = data.Datas;
            var thishtml = thisul.html();
            thisul.html('');
            for (var i = 0; i < datas.length; i++) {
                thisul.append(thishtml);
                var tthisli = thisul.find('li').eq(i);
                tthisli.children('a').attr('href', param.funurl + '?fundcode=' + datas[i].FCODE);
                var tthistbl = tthisli.find('.fund-tbl');
                var thishref = param.funurl + '?fundcode=' + datas[i].FCODE;
                tthistbl.find('.fund-title a').attr('href', thishref).html(datas[i].SHORTNAME);
                tthistbl.find('.fund_minsg span').html($f.numberM(datas[i].MINSG));
                tthistbl.find('.profit').html($f.initNumber2(datas[i].SYL, 2));
                tthistbl.find('.profit').next('.profit-title').html(datas[i].SYLMARK);
                tthistbl.find('.fund-fl.font15').html(datas[i].SOURCERATE);
                tthistbl.find('.fund-fl.font15W').html(datas[i].RATE);
                tthistbl.find('.fund-buy').attr('href', param.funBuyUrl + '#code=' + datas[i].FCODE);
            }
            var turl = param.sameCompany + '?companyid=' + data.Expansion + '#1';
            var thishtmlul = '';
            thishtmlul += '<li class="fund-item-last1"><a class="more" href=';
            thishtmlul += turl + '>查看同公司旗下基金&gt;</a><a></a></li>';
            thisul.append(thishtmlul);
            tgsqxjjurl.on('click', function () {
                window.location.href = $(this).attr('data-href');
            });
        },
        sameType: function (data) {
            var tljjzfurl = $('.tljjzf_url');
            var pageContentTljjzf = $('.pageContentTljjzf');
            var thisul = pageContentTljjzf.find('.fund-list');
            tljjzfurl.attr('data-href', param.sameType + '#' + param.fundtype);
            $f.bindData(data.TotalCount, '.numberFont', '.tljjzf_url');
            var datas = data.Datas;
            var thishtml = thisul.html();
            thisul.html('');
            for (var i = 0; i < datas.length; i++) {
                thisul.append(thishtml);
                var tthisli = thisul.find('li').eq(i);
                tthisli.children('a').attr('href', param.funurl + '?fundcode=' + datas[i].FCODE);
                var tthistbl = tthisli.find('.fund-tbl');
                var tthishref = param.funurl + '?fundcode=' + datas[i].FCODE;
                tthistbl.find('.fund-title a').attr('href', tthishref).html(datas[i].SHORTNAME);
                tthistbl.find('.fund_minsg span').html($f.numberM(datas[i].MINSG));
                tthistbl.find('.profit').html($f.initNumber2(datas[i].SYL, 2));
                tthistbl.find('.profit').next('.profit-title').html(datas[i].SYLMARK);
                tthistbl.find('.fund-fl.font15').html(datas[i].SOURCERATE);
                tthistbl.find('.fund-fl.font15W').html(datas[i].RATE);
                tthistbl.find('.fund-buy').attr('href', param.funBuyUrl + '#code=' + datas[i].FCODE);
            }
            var turl = param.sameType + '#' + param.fundtype;
            var  htmlli = '';
            htmlli += '<li class="fund-item-last1"><a class="more" href=';
            htmlli += turl + '>查看全部同类基金>&gt;</a><a></a></li>';
            thisul.append(htmlli);
            tljjzfurl.on('click', function () {
                window.location.href = $(this).attr('data-href');
            });
        },
        gotoJJJL: function (data) {
            var gotoJJJLscroll = $('.gotoJJJL_scroll');
            var scrolltable = '';
            var datas = data.Datas;
            for (var i = 0; i < datas.length; i++) {
                var t = datas[i].LEMPDATE === '' ? '至今' : datas[i].LEMPDATE;
                scrolltable += '<tr><td>' + datas[i].FEMPDATE + '</td>';
                scrolltable += '<td>' + t + '</td>';
                scrolltable += '<td>' + datas[i].MGRNAME + '</td>';
                scrolltable += '<td>' + datas[i].DAYS + '天</td>';
                var PENAVGROWTHcolor = $f.isRed(datas[i].PENAVGROWTH.toString());
                var PENAVGROWTHdata = $f.initNumber2(datas[i].PENAVGROWTH, 2);
                scrolltable += '<td class="' + PENAVGROWTHcolor + '">' + PENAVGROWTHdata + '</td></tr>';
            }
            gotoJJJLscroll.find('tbody').html(scrolltable);
            param.isclick.gotoJJJL = false;
        },
        gotoJJJLdetail: function (data) {
            var gotoJJJLdetail = $('.gotoJJJL_detail');
            var detail = '';
            var datas = data.Datas;
            for (var i = 0; i < datas.length; i++) {
                var imgurl;
                if (datas[i].PHOTOURL == null) {
                    imgurl = 'http://j5.dfcfw.com/avatar/nopic.gif';
                }
                else {
                    imgurl = 'https://fundmobapi.eastmoney.com/FundMApi/HttpToHttps.ashx?TYPE=pic&URL=' + datas[i].PHOTOURL;
                }
                detail += '<div class="ui-grid-row"><div class="ui-grid-4">';
                detail += '<img width="80" src="' + imgurl + '">';
                detail += '</div><div class="ui-grid-6 jjjlInfo">';
                detail += '<p>姓名：<span>' + datas[i].MGRNAME + '</span></p>';
                detail += '<p>上任日期：<span>' + datas[i].FEMPDATE + '</span></p>';
                detail += '<p>管理年限<span>' + $f.fomateDate(datas[i].DAYS) + '</span></p>';
                detail += '</div><div class="ui-grid-10 jjjltxt">';
                detail += '<p class="on">' + datas[i].RESUME + '</p>';
                detail += '<a class="togglebtn down">全部简介</a> </div></div>';

            }
            gotoJJJLdetail.html(detail);
            $('.togglebtn').on('click', function () {
                if ($(this).hasClass('down')) {
                    $(this).removeClass('down').addClass('up').prev('p').removeClass('on');
                }
                else {
                    $(this).removeClass('up').addClass('down').prev('p').addClass('on');
                }
            });
        },
        gotoJJGG: function (data) {
            var gotoJJGG = $('.gotoJJGG').next('.fold_content');
            var div = '';
            var datas = data.Datas;
            div += '<div class="jjggContent">';
            for (var i = 0; i < datas.length; i++) {
                div += '<div class="ui-grid-row" data-id=' + datas[i].ID + '>';
                div += '<p class="ui-grid-2">' + datas[i].PUBLISHDATE.slice(5, 10) + '</p>';
                div += '<p class="ui-grid-8">' + datas[i].TITLE + '</p></div>';
            }
            div += '</div>';
            data.TotalCount > 5 ? div += '<p class="ui_alignCenter tip jjggMore">查看更多</p>' : '';
            gotoJJGG.html(div).show();

            param.isclick.gotoJJGG = false;
            $('.jjggMore').on('click', $f.gotoJJGGmore);
            $('.jjggContent').find('.ui-grid-row').on('click', function () {
                window.location.href = 'http://m.1234567.com.cn/m/fund/FundJJGSGG/' + param.data.FCODE + '_' + $(this).attr('data-id');
            });
        },
        gotoJJGGmore: function () {
            param.page.gotoJJGG++;
            param.dataPage.pageIndex = 1;
            param.dataPage.pageSize = 5 * param.page.gotoJJGG;
            $f.tAjax('FundNoticeList.ashx', param.dataPage, $f.gotoJJGG);
        },
        gotoFHPS: function (data) {
            var gotoFHPS = $('.gotoFHPS').next('.fold_content');
            var div = '';
            var datas = data.Datas;
            var CFnumber = 0;
            div += '<div class="fhpsContent">';
            div += '<p class="ui_remark">成立以来，总计分红' + data.TotalCount + '次，拆分0次</p>';
            for (var i = 0; i < datas.length; i++) {
                div += '<div class="ui-grid-row">';
                div += '<p class="ui-grid-3">' + datas[i].FSRQ + '</p>';
                div += '<p class="ui-grid-7">每份派现金<b>' + datas[i].FHFCZ + '</b>元</p>';
                div += '</div>';
                if (Number(datas[i].FHFCBZ) !== 0) {
                    CFnumber++;
                }

            }
            div += '</div>';
            data.TotalCount > 5 ? div += '<p class="ui_alignCenter tip fhpsMore">查看更多</p>' : '';
            gotoFHPS.html(div).show();
            if (CFnumber !== 0) {
                $('p.ui_remark').html('成立以来，总计分红' + data.TotalCount + '次，拆分' + CFnumber + '次');
            }

            for (var j = 5; j < datas.length; j++) {
                gotoFHPS.find('.ui-grid-row').eq(j).hide();
            }

            param.isclick.gotoFHPS = false;
            $('.fhpsMore').on('click', function () {
                for (var q = 5 * param.page.gotoFHPS; q < datas.length && q < 5 * param.page.gotoFHPS + 5; q++) {
                    gotoFHPS.find('.ui-grid-row').eq(q).show();
                }
                param.page.gotoFHPS++;
                param.page.gotoFHPS * 5 > datas.length ? $('.fhpsMore').hide() : '';
            });
        },
        gotoFHPSMore: function (data) {
            var div = '';
            for (var i = 5; i < data.length; i++) {
                div += '<div class="ui-grid-row">';
                div += '<p class="ui-grid-3">' + data[i].FSRQ + '</p>';
                div += '<p class="ui-grid-7">每份派现金<b>' + data[i].FHFCZ + '</b>元</p>';
                div += '</div>';
            }
            $('.gotoFHPS').next('.fold_content').find('.fhpsContent:last-child').after(div);
        },
        discussLink: function (options) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'https://jijinbaapi.eastmoney.com/gubaapi/v3/Read/Article/Post/Articlelist.ashx',
                data: optionjjba,
                success: function (resultData) {
                    $('.discussLink').attr('href', 'http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of' + param.data.FCODE);
                    $('.discussLink').find('span').html(resultData.count);

                },
                error: function (error) {
                    $f.alertWindow('网络不给力，请稍后重试');
                }
            });
        },

        tAjax: function (url, data, callback) {
            $f.hardLoad();
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                // type: "POST",
                url: param.apiurl + url,
                data: data,
                success: function (resultData) {
                    if (typeof resultData === 'string') {
                        resultData = JSON.parse(resultData);
                    }

                    if (resultData.ErrCode === 0) {
                        callback(resultData);
                    }
                    else {
                        if ($f.isEmpty(resultData.ErrMsg)) {
                            resultData.ErrMsg = '网络不给力，请稍后重试';
                        }
                        else if (resultData.ErrMsg === '服务异常' || resultData.ErrMsg === '系统繁忙!') {
                            resultData.ErrMsg = '网络不给力，请稍后重试';
                        }

                        $f.alertWindow(resultData.ErrMsg, callback);
                    }
                    $f.hideMask();

                },
                error: function (error) {
                    $f.alertWindow('网络不给力，请稍后重试', callback);
                    $f.hideMask();
                }

            });
        },
        domclick: function () {
            $('.tabp').find('.tab p').on('click', function () {
                $(this).addClass('active').siblings('p').removeClass('active');
                var thisimg = $(this).parents('.tab').next('.tabContent').find('img');
                thisimg.attr('src', $(this).attr('data-imgurl') + param.data.FCODE + '.png');
            });
            $('.gotoLSSYL').on('click', function () {
                var tthis = this;
                $f.toggleShow(tthis);
            });
            $('.buyInfo_url').on('click', function () {
                window.location.href = 'http://m.1234567.com.cn/m/fund/fundfl/' + param.data.FCODE;
            });
            $('.baseInfo_url').on('click', function () {
                window.location.href = 'http://m.1234567.com.cn/m/fund/fundjbxx/' + param.data.FCODE;
            });
            $('.tljjzf_url').on('click', function () {
                window.location.href = $(this).attr('data-href');
            });
            $('.gotoJBCC').on('click', function () {
                var tthis = this;
                $f.toggleShow(tthis);
                if (param.isclick.gotoJBCC) {
                    $f.tAjax('FundPositionList.ashx', param.data, $f.gotoJBCC);
                }

            });
            $('.gotoFHPS').on('click', function () {
                var tthis = this;
                $f.toggleShow(tthis);
                if (param.isclick.gotoFHPS) {
                    $f.tAjax('FundBonusList.ashx', param.data, $f.gotoFHPS);
                }

            });
            $('.gotoJJJL').on('click', function () {
                var tthis = this;
                $f.toggleShow(tthis);
                if (param.isclick.gotoJJJL) {
                    $f.tAjax('FundManagerList.ashx', param.data, $f.gotoJJJL);
                    $f.tAjax('FundMangerDetail.ashx', param.data, $f.gotoJJJLdetail);
                }

            });
            $('.gotoJJGG').on('click', function () {
                var tthis = this;
                $f.toggleShow(tthis);
                if (param.isclick.gotoJJGG) {
                    param.dataPage.pageIndex = 1;
                    param.dataPage.pageSize = 5;
                    $f.tAjax('FundNoticeList.ashx', param.dataPage, $f.gotoJJGG);
                }

            });
            $('.gotopinglun').on('click', function () {
                window.location.href = 'http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of' + param.data.FCODE;
            });
            $('.shareInfo').on('click', function (e) {
                var tthis = $(this);
                var $flexShare = tthis.siblings('.flexShare');
                $flexShare.toggleClass('hide');

                if (!this.Share) {
                    this.Share = true;
                    $flexShare.on('touchend', 'li', function () {
                        var j = $(this);
                        setTimeout(function () {
                            var type = j.data('type');
                            if (type) {
                                shareTo(type);
                            }
                        }, 1200);

                    });
                }
                e.stopPropagation();

            });
            var shareTo = function (dest) {
                var shareTitle = '天天基金网';
                var url = location.href;
                var source = '基金详情';
                var sourceUrl = 'https://m.1234567.com.cn/';
                var sinaAppkey = '2136217547';
                var sinaRalateUid = '2627698865';

                var title = shareTitle + '-' + source + '(m.1234567.com.cn)';

                if (url === null || title === null || url === '' || title === '') {
                    $f.alertWindow('错误的链接地址或标题');
                    return;
                }
                var shareUrl = '';
                switch (dest.toLowerCase()) {
                    case 'sina':
                        shareUrl = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&appkey=' + sinaAppkey + '&title=' + encodeURIComponent(title) + '&pic=&ralateUid=' + sinaRalateUid + '&source=' + encodeURIComponent(source) + '&sourceUrl=' + encodeURIComponent(sourceUrl);
                        break;
                    case 'qq':
                        shareUrl = 'http://v.t.qq.com/share/share.php?url=' + encodeURIComponent(url) + '&appkey=801004939&site=https://wap.eastmoney.com&title=' + encodeURIComponent(title) + '&pic=';
                        break;
                    case 'qzone':
                        shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(url) + '&appkey=801004939&site=https://wap.eastmoney.com&title=' + encodeURIComponent(title) + '&desc=&summary=&site=https://wap.eastmoney.com';
                        break;
                }

                window.parent.location.href = shareUrl;
            };
            $('.addFavor').on('click', function (e) {
                window.location.href = 'http://m.1234567.com.cn/m/fund/funddetail/?fundcode=' + param.data.FCODE;
            });
        },
        toggleShow: function (options) {
            if ($(options).next('.fold_content').css('display') === 'block') {
                $(options).next('.fold_content').hide();
                $(options).find('.iconfont').removeClass('ui_fold').addClass('ui_unfold');
            }
            else {
                $(options).next('.fold_content').show();
                $(options).find('.iconfont').removeClass('ui_unfold').addClass('ui_fold');
            }

        },
        initNumber2: function (n, m, bol) {
            if (!n) {
                return '--';
            }

            var b = !bol ? '%' : '';
            n = parseFloat(n).toFixed(m) + b;

            return n;
        },
        numberM: function (n) {
            return Number(n) > 10000 ? Math.round(Number(n) / 10000) + '万' : n;
        },
        fomateDate: function (d) {
            if (d < 365) {
                return d + '天';
            }
            else {
                var n = parseInt(d / 365, 10);
                var a = parseInt(d % 365, 10);

                return n + '年又' + a + '天';
            }
        },
        isRed: function (str) {
            if (!str || str === null || str === 'null') {
                return 'ui_black';
            }

            var bol = str.indexOf('-');
            if (bol < 0) {
                if (parseFloat(str) === 0) {
                    return 'ui_black';
                }
                return 'ui_red';
            }
            else if (parseFloat(str) < 0) {
                return 'ui_green';
            }
            else {
                return 'ui_black';
            }
        },
        isEmpty: function (value, allowEmptyString) {
            return (value === null) || (value === undefined) || (value === '');
        },
        initAlertMask: function () {

            var alertMaskerUI = $('._alertMaskerUI_');
            if (alertMaskerUI != null) {
                alertMaskerUI.remove();
            }
            var alertMaskhtml = '';
            alertMaskhtml += '<div class="alertMasker _alertMaskerUI_"> <div> <div class="alert"><div class="inner">';
            alertMaskhtml += '<p></p><footer><a href="javascript:void(null)" class="button" for="yes" >确定</a>';
            alertMaskhtml += '</footer></div></div></div></div>';
            $('mip-jjpz').append(alertMaskhtml);

        },
        alertWindow: function (txt, callback, option) {
            var tthis = this;
            var target = $('._alertMaskerUI_');
            if (target.css('display') === 'block') {
                return false;
            }

            tthis.initAlertMask();

            var tempTxt = txt ? txt : '';
            var tempCallback = callback ? callback : function () {
            };

            var btnTxt = option ? '确定' : option;
            target = $('._alertMaskerUI_');
            target.find('.btn').html(btnTxt);

            target.show();
            target.find('p').html(tempTxt);
            target.find('.alert').addClass('show');

            var tempTapFun = function (e) {
                // e.stopPropagation();

                setTimeout(function () {
                    tthis.closeAlertWindow();
                    tempCallback(false);
                }, 300);

            };

            var btn = target.find('.button[for=yes]');
            btn.off('click').on('click', tempTapFun);
        },
        closeAlertWindow: function () {
            var target = $('._alertMaskerUI_');
            target.hide();
            target.find('.alert').removeClass('show');
        },
        addFavor: function (option, callback) {
            $f.hardLoad();
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: 'https://fundex2.eastmoney.com/FundMobileApi/FundFavor.ashx',
                data: option,
                success: function (resultData) {
                    if (typeof resultData === 'string') {
                        resultData = JSON.parse(resultData);
                    }
                    if (resultData.ErrCode === 0) {
                        callback(resultData);
                    }
                    else {
                        if ($f.isEmpty(resultData.ErrMsg)) {
                            resultData.ErrMsg = '网络不给力，请稍后重试';
                        }
                        else if (resultData.ErrMsg === '服务异常' || resultData.ErrMsg === '系统繁忙!') {
                            resultData.ErrMsg = '网络不给力，请稍后重试';
                        }

                        $f.alertWindow(resultData.ErrMsg, callback);
                    }
                    $f.hideMask();

                },
                error: function (error) {
                    $f.alertWindow('网络不给力，请稍后重试', callback);
                    $f.hideMask();
                }

            });
        },
        hardLoad: function (txt, callback) {
            $f.load(txt ? txt : '加载中');
            var loadingMaskUI = $('._loadingMaskUI_');
            var c = loadingMaskUI.attr('c');

            if (!c) {
                c = 0;
            }

            loadingMaskUI.attr('c', ++c);

            if (loadingMaskUI.is(':visible')) {

                return false;
            }

            loadingMaskUI.css({display: 'table', background: 'rgba(0,0,0,0)'});

            var tempCustomFun = callback ? callback : function () {
                $f.alertWindow('网络不给力，请稍后重试');
            };

            var tempCallback = function () {
                $f.hideMaskForce();
                tempCustomFun();
            };

            clearTimeout(timeoutFun);
            timeoutFun = setTimeout(tempCallback, 30000);
        },
        load: function (txt) {
            $('._loadingMaskUI_ div[ui]').hide();
            $('._loadingMaskUI_ ._maskload_').show().find('span').html(txt);
        },
        hideMaskForce: function () {
            var loadingMaskUI = $('._loadingMaskUI_');
            loadingMaskUI.css('display', 'none');
            clearTimeout(timeoutFun);
        },
        hideMask: function () {

            var loadingMaskUI = $('._loadingMaskUI_');
            var c = loadingMaskUI.attr('c');

            if (c <= 1) {
                loadingMaskUI.attr('c', 0);
                loadingMaskUI.css('display', 'none');
            }
            else {
                loadingMaskUI.attr('c', --c);
            }
            clearTimeout(timeoutFun);

        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return '';

        },
        bindData: function (data, Cid, Pid, color) {
            var dom;
            dom = Pid !== null && Pid !== undefined && Pid !== 0 ? $(Pid).find(Cid) : $(Cid);
            if (color !== undefined) {
                dom.addClass(color);
            }

            dom.html(data);
        }
    };

    customElem.prototype.build = function () {
        var element = this.element;
        param.data.FCODE = $f.getQueryString('fundcode') || '000009';
        param.dataPage.FCODE = $f.getQueryString('fundcode') || '000009';
        $f.init();
    };

    return customElem;
});
