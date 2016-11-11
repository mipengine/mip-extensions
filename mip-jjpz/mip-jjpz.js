define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var element = this.element,
            _id = element.getAttribute("asid");
        $(element).html(ttHtml);
        param.data.FCODE = funCaller.getQueryString('fundcode')||_id;
        param.dataPage.FCODE = funCaller.getQueryString('fundcode')||_id;
        funCaller.init();
    };
    var ttHtml='<header><div class="icon"><div class="title"><h1>天天基金网</h1></div></div></header><section class="pageContent1"><div class="ui_outer"><div class="ui_inner ui-grid-row ui_h2 ui_inner_m15"><div class="header1"><span id="Fname"></span><span class="coder fundcode"></span></div><div class="ui_gray header2"></div><div class="ui-grid-5"><p class="ui_m ui_gray" id="Fearnings">最新净值（<span class="numberFont">11-02</span>）</p><p class="txtBig" id="FearningsN1"></p></div><div class="ui-grid-5 rzfLeftBorder"><p class="ui_m ui_gray" id="FearningsDay">日涨幅</p><p class="txtBig" id="FearningsN2"></p></div></div><div class="ui_m ui-grid-row ui_h2 ui_inner_m15" id="Fevaluation"><span class="ui_gray font-MS">盘中估值：</span><span class="padding-right5px numberFont"></span><span class="padding-right5px numberFont"></span><span class="ui_gray numberFont "></span></div></div><div class="ui_outer padding-r10"><div id="Info_url" class="ui_inner ui-grid-row ui_h2 ui_inner_m15 paddingRight1 ui_arr iconfont  border-topnone"><div class="ui-grid-5"><p class="ui_m ui_gray">今年来：<span class="numberFont"></span></p></div><div class="ui-grid-5"><p class="ui_m ui_gray">近1月：<span class="numberFont"></span></p></div><div class="ui-grid-5"><p class="ui_m ui_gray">近6月：<span class="numberFont"></span></p></div><div class="ui-grid-5"><p class="ui_m ui_gray">近1年：<span class="numberFont"></span></p></div></div></div><a href="http://js1.eastmoney.com/tg.aspx?ID=4815" target="_blank"><mip-img class="mip-img margintop10" alt="" src="https://img.1234567.com.cn/trade/2016091316393040.gif"></mip-img></a><div class="ui_outer  ui_blank" id="buyInfo_url"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding"><div class="ui-grid fundName">购买信息</div><div class="ui-grid ui_arr iconfont"><p class="ui_alignRight ui_gray ui_m"><span class="ui_black">购买手续费：</span><span class="ui_black numberFont"></span></p></div></div></div><div class="ui_outer  ui_blank" id="tab" data-map="gzt"><div class="tab ui-clear"><p class="active" data-imgurl="http://j4.dfcfw.com/charts/pic1/">净值估值</p><p data-imgurl="http://j3.dfcfw.com/images/JJJZ5/">单位净值</p><p data-imgurl="http://j3.dfcfw.com/images/syl4/">累计收益</p></div><div class="tabContent  loading"><mip-img src="http://j4.dfcfw.com/charts/pic1/161032.png" class="img" ></mip-img></div></div><div class="tuiguang_xz height60"><span><a href="http://js1.eastmoney.com/tg.aspx?ID=3908" target="_blank" class="fontBlue">&nbsp; 天天基金app查基金 方便又快捷</a></span>&nbsp;<span class="red"><a href="http://js1.eastmoney.com/tg.aspx?ID=3908" target="_blank"> 立即打开</a></span><br><span><a href="http://js1.eastmoney.com/tg.aspx?ID=3925" target="_blank">&nbsp; 天天基金网基金买入费率1折！</a></span>&nbsp;<span class="red"><a href="http://js1.eastmoney.com/tg.aspx?ID=3925" target="_blank"> 立即查看</a></span><br></div><div class="ui_outer  ui_blank" id="gotoLSSYL"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15"><div class="ui-grid-8">历史净值</div><div class="ui-grid-2 iconfont ui_fold"></div></div></div><div class="ui_outer ui_blank" id="baseInfo_url"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding"><p class="ui-grid-4 ui-grid-3">基本信息</p><div class="ui-grid-6 ui-grid-7 ui_arr iconfont"><div class="ui_m ui_gray jjxx-h"></div></div></div></div><div class="ui_outer " id="gotoJBCC"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15"><div class="ui-grid-8"><p>基金持仓<span id="cjjzri"></span></p></div><div class="ui-grid-2 ui_unfold iconfont"></div></div></div><div class="fold_content hidden"><div id="jbcc_scroll"><table class="ui-table"><thead><tr><th>股票名称</th><th>持仓占比</th><th>涨跌幅</th></tr></thead><tbody></tbody></table></div><p class="tip"></p></div><div class="ui_outer  " id="gotoFHPS"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15"><div class="ui-grid-8"><p>分红配送</p></div><div class="ui-grid-2 ui_unfold iconfont"></div></div></div><div class="fold_content "></div><div class="ui_outer  " id="gotoJJJL"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15"><div class="ui-grid-8"><p>基金经理</p></div><div class="ui-grid-2 ui_unfold iconfont"></div></div></div><div class="fold_content hidden"><div class="jjjlContent" id="jjjlContent"><h3>基金经理变动一览</h3><div id="gotoJJJL_scroll" class="overflow-x"><table class="ui-table"><thead><tr><th>起始期</th><th>截止期</th><th>基金经理</th><th>任期时间</th><th>任期回报</th></tr></thead><tbody></tbody></table></div><h3>现任基金经理简介</h3><div id="gotoJJJL_detail"></div></div></div><div class="ui_outer  " id="gotoJJGG"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15"><div class="ui-grid-8"><p>基金公告</p></div><div class="ui-grid-2 ui_unfold iconfont"></div></div></div><div class="fold_content "></div></section><a class="discussLink" href="http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of000001" target="_blank">查看与本基金有关的<span></span>个讨论帖</a><section class="pageContentTgsqxjj"><div class="ui_outer ui_blank" id="tgsqxjj_url" data-href="http://m.1234567.com.cn/m/fund/jjjz.shtml?companyid=80000224#1"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding"><p class="ui-grid-4 ">同公司旗下基金</p><div class="ui-grid-6 ui_arr iconfont"><div class="ui_gray ui-right pddingRight15">共<span class="numberFont">60</span>只基金</div></div></div></div><ul class="fund-list"><li class="fund-item"><a href="http://m.1234567.com.cn/m/fund/funddetail/" target="_blank"><table class="fund-tbl"><tbody><tr><td class="left" colspan="4"><div class="fund-title  ui_arr1 iconfont"><a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode=000001" class="fund-detail font17" target="_blank"></a><span class="ui_gray fund_minsg paddingR15"><span class="numberFont"></span>元起购</span></div></td></tr><tr><td class="left col_1"><b class="profit font22"></b><span class="profit-title"></span></td><td class="left col_1"><div><span class="fund-fl font15"></span><span class="fund-fl font15W"></span><span class="profit-title">购买手续费</span></div></td><td></td><td class="right col_2 align-bottom"><a class="fund-buy" href="https://tradewap.1234567.com.cn/buyfund.html#code=000001" target="_blank">购买</a></td></tr></tbody></table></a></li></ul></section><section class="pageContentTljjzf"><div class="ui_outer ui_blank" id="tljjzf_url" data-href="http://m.1234567.com.cn/m/fund/jjph.shtml#8"><div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding"><p class="ui-grid-4 ">同类基金涨幅</p><div class="ui-grid-6 ui_arr iconfont"><div class="ui_gray ui-right pddingRight15">共<span class="numberFont">76</span>只基金</div></div></div></div><ul class="fund-list"><li class="fund-item"><a href="http://m.1234567.com.cn/m/fund/funddetail/" target="_blank"><table class="fund-tbl"><tbody><tr><td class="left" colspan="4"><div class="fund-title  ui_arr1 iconfont"><a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode=000523" class="fund-detail font17" target="_blank"></a><span class="ui_gray fund_minsg paddingR15"><span class="numberFont"></span>元起购</span></div></td></tr><tr><td class="left col_1"><b class="profit font22"></b><span class="profit-title"></span></td><td class="left col_1"><div><span class="fund-fl font15"></span><span class="fund-fl font15W"></span><span class="profit-title">购买手续费</span></div></td><td></td><td class="right col_2 align-bottom"><a class="fund-buy" href="https://tradewap.1234567.com.cn/buyfund.html#code=000523" target="_blank">购买</a></td></tr></tbody></table></a></li></ul></section><footer><ul class="foot_href"><li><a href="http://m.1234567.com.cn/m/fund/favor.shtml" target="_blank">自选</a></li><li><a href="http://m.1234567.com.cn/m/fund/jjjz.shtml" target="_blank">净值</a></li><li><a href="http://m.1234567.com.cn/m/fund/jjgz.shtml" target="_blank">估值</a></li><li><a href="http://m.1234567.com.cn/m/fund/jjph.shtml" target="_blank">排行</a></li><li><a href="http://m.1234567.com.cn/NewsList.aspx?m=12&amp;c=590" target="_blank">要闻</a></li><li><a href="http://m.1234567.com.cn/NewsList.aspx?m=12&amp;c=591" target="_blank">观点</a></li><li><a href="http://jjbmob.eastmoney.com/app/index.html" target="_blank">基金吧</a></li></ul><ul class="foot_about"><li class="item"><a href="http://m.1234567.com.cn/m/channel/about" target="_blank">关于我们</a></li><li class="split">|</li><li class="item"><a href="http://m.1234567.com.cn/m/channel/contact" target="_blank">联系我们</a></li><li class="split">|</li><li class="item"><a href="http://m.1234567.com.cn/m/channel/yijian" target="_blank">意见反馈</a></li></ul><div class="foot_download"><a href="http://js1.eastmoney.com/tg.aspx?ID=3887" target="_blank">点此下载APP , 看资讯 , 买基金</a></div><div class="foot_desc"><p class="foot_title">客服热线：<a href="tel:400-9918-918">400-9918-918</a>/<a href="tel:400-1818-188">400-1818-188</a></p><p class="foot_time">工作日：<span class="foot_time_s">7:30-21:30</span> 双休日：<span class="foot_time_s">9:00-21:00</span></p></div></footer><div class="fixContent animfooter" id="fixContent"><div class="ui-grid-row ui_h2"><div class="ui-grid-3"><div class="ui-btn btn-inline ui-btn-orange" id="buyJJ">立即购买</div></div><div class="ui-grid-7"><span id="gotopinglun">评论</span><span id="shareInfo">分享</span><span id="addFavor">加自选</span></div></div></div>';
    var param = {
            data: {
                FCODE: '',
                deviceid: "Wap",
                version: "4.3.0",
                product: "EFund",
                plat: "Wap",
            },
            dataPage: {
                FCODE: '',
                deviceid: "Wap",
                version: "4.3.0",
                product: "EFund",
                plat: "Wap",
                pageIndex: 1,
                pageSize: 3,
            },
            apiurl: "http://fundmobapitest.eastmoney.com/FundMApi/",
            funurl: "http://m.1234567.com.cn/m/fund/funddetail/",
            funBuyUrl: "https://tradewap.1234567.com.cn/buyfund.html",
            sameCompany: "http://m.1234567.com.cn/m/fund/jjjz.shtml",
            sameType: "http://m.1234567.com.cn/m/fund/jjph.shtml",
            fundtype: "",
            fundGetType: 1,
            isclick: {
                gotoJBCC: true,
                gotoFHPS: true,
                gotoJJJL: true,
                gotoJJGG: true,
            },
            page: {
                gotoJJGG: 1,
                gotoFHPS: 1,
            },
        },
        option_jjba = {
            'deviceid': 'Wap',
            'ps': 20,
            'plat': 'Wap',
            'product': 'Fund',
            'version': '201',
            'code': "of" + param.data.FCODE,
            'p': '',
            'type': '',
            'postid': 10,
            'sorttype': 0,
        }, timeoutFun = function () {
        };

    var funCaller = {
        init: function (_id) {
            var _this = this;
            _this.Ajax('FundBase.ashx', param.data, _this.FundBaseloadView);
            _this.Ajax('FundNetDiagram.ashx', param.data, _this.FundNetDiagramloadView);

            _this.Ajax('FundSameCompanyList.ashx', param.data, _this.FundSameCompanyListloadView);
            _this.Ajax('FundSameTypeList.ashx', param.dataPage, _this.FundSameTypeListloadView);

            _this.discussLink();

        },
        FundBaseloadView: function (data) {
            var data = data.Datas;
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
            var RISKLEVEL = ['--', '低风险', '中低风险', '中风险', '中高风险', '高风险'], RISKLEVELname, RISKLEVELt;
            RISKLEVELt = Number(data.RISKLEVEL);
            switch (RISKLEVELt) {
                case 0:
                    RISKLEVELname = RISKLEVEL[0]
                    break;
                case 1:
                    RISKLEVELname = RISKLEVEL[1]
                    break;
                case 2:
                    RISKLEVELname = RISKLEVEL[2]
                    break;
                case 3:
                    RISKLEVELname = RISKLEVEL[3]
                    break;
                case 4:
                    RISKLEVELname = RISKLEVEL[4]
                    break;
                case 5:
                    RISKLEVELname = RISKLEVEL[5]
                    break;
            }
            var _this = this,
                tips1 = '', tips2 = '', date2, dellineData;
            data.DWJZ = funCaller.initNumber2(data.DWJZ, 4, true);

            funCaller.bindData(data.SHORTNAME, '#Fname');
            funCaller.bindData('(' + data.FCODE + ')', '.coder', '.header1');
            funCaller.bindData(data.FTYPE, '.header2', '.ui_outer');
            $('#baseInfo_url').find('.jjxx-h').append('<span class="ui_gray">' + data.FTYPE + '</span>');
            if (RISKLEVELname !== '--') {
                $('.ui_outer').find('.header2').append('<span class="split">|</span>' + RISKLEVELname);
                $('#baseInfo_url').find('.jjxx-h').append('<span class="split">|</span>' + RISKLEVELname);
            }
            if (data.RLEVEL_SZ !== null && data.RLEVEL_SZ !== '--' && data.RLEVEL_SZ !== '') {
                $('.ui_outer').find('.header2').append('<span class="split">|</span>' + data.RLEVEL_SZ + '星评级');
                $('#baseInfo_url').find('.jjxx-h').append('<span class="split">|</span>' + data.RLEVEL_SZ + '星评级');
            }

            if (param.fundGetType == 1) {
                $('#Fearnings').html('最新净值（<span class="numberFont">' + data.FSRQ.slice(5, 10) + '</span>）');
                $('#FearningsDay').html('日涨幅');
                funCaller.bindData(funCaller.initNumber2(data.DWJZ, 4, true), '#FearningsN1', 0, funCaller.isRed(data.RZDF));
                funCaller.bindData(funCaller.initNumber2(data.RZDF, 2), '#FearningsN2', 0, funCaller.isRed(data.RZDF));
                funCaller.bindData(data.Valuation ? (JSON.parse(data.Valuation).gsz) : "--", 'span:nth-child(2)', '#Fevaluation', data.Valuation ? funCaller.isRed(JSON.parse(data.Valuation).gszzl) : "");
                funCaller.bindData(data.Valuation ? (funCaller.initNumber2(JSON.parse(data.Valuation).gszzl, 2) ) : "--", 'span:nth-child(3)', '#Fevaluation', data.Valuation ? funCaller.isRed(JSON.parse(data.Valuation).gszzl) : "");
                date2 = data.Valuation ? JSON.parse(data.Valuation).gztime.substring(5, 16) : "";
                funCaller.bindData('(' + date2 + ')', 'span:nth-child(4)', '#Fevaluation');
            }
            else {
                $('#Fearnings').html('万份收益（<span class="numberFont">' + data.FSRQ.slice(5, 10) + '</span>）');
                $('FearningsDay').html('7日年化');
                $('#Fevaluation').hide();
            }
            funCaller.bindData(funCaller.initNumber2(data.SYL_JN, 2), 'span', '#Info_url div:nth-child(1) ', funCaller.isRed(data.SYL_JN));
            funCaller.bindData(funCaller.initNumber2(data.SYL_Y, 2), 'span', '#Info_url div:nth-child(2)', funCaller.isRed(data.SYL_Y));
            funCaller.bindData(funCaller.initNumber2(data.SYL_6Y, 2), 'span', '#Info_url div:nth-child(3) ', funCaller.isRed(data.SYL_6Y));
            funCaller.bindData(funCaller.initNumber2(data.SYL_1N, 2), 'span', '#Info_url div:nth-child(4) ', funCaller.isRed(data.SYL_1N));
            if (data.SOURCERATE !== '' && data.SOURCERATE !== null)
                dellineData = '<span class="ui_delLine">' + data.SOURCERATE + ' </span> ' + data.RATE;
            else
                dellineData = data.RATE;
            funCaller.bindData(dellineData, '.ui_black.numberFont', '#buyInfo_url');

            $('#tab .tabContent').find('.img').attr('src', 'http://j4.dfcfw.com/charts/pic1/' + param.data.FCODE + '.png');
            $('#tab .tabContent').find('img').attr('src', 'http://j4.dfcfw.com/charts/pic1/' + param.data.FCODE + '.png');
            $('#Info_url').on('click', function () {
                window.location.href = 'http://m.1234567.com.cn/m/fund/fundjdsy/' + param.data.FCODE;
            })
            if (data.BUY)
                $('#buyJJ').on('click', function () {
                    window.location.href = 'https://tradewap.1234567.com.cn/buyfund.html#code=' + param.data.FCODE;
                });
            else
                $('#buyJJ').removeClass('ui-btn-orange').addClass('ui-btn-gray');
            funCaller.domclick();
        },


        FundNetDiagramloadView: function (data) {
            var _this = this,
                gotoLSSYL = $('#gotoLSSYL'),
                gotoLSSYLdiv = "",
                datas = data.Datas;
            gotoLSSYL.find('.ui-grid-8 p').html(param.fundGetType == 1 ? '历史净值' : '历史收益率');
            gotoLSSYLdiv += '<div class="fold_content"><div id="LSSYL_scroll"><table class="ui-table"><thead>';
            param.fundGetType == 1 ? gotoLSSYLdiv += '<tr><th>日期</th> <th>单位净值</th><th>累计净值</th><th>日增长率</th></tr></thead><tbody>' : gotoLSSYLdiv += '<tr><th>日期</th> <th>万份收益</th><th>7日年化</th></tr></thead><tbody>';
            for (i = 0; i < datas.length && i < 5; i++) {

                gotoLSSYLdiv += '<tr><td class="numberFont">' + datas[i].FSRQ + '</td>';
                gotoLSSYLdiv += '<td class="numberFont">' + funCaller.initNumber2(datas[i].DWJZ, 4, true) + '</td>';
                gotoLSSYLdiv += '<td class="numberFont">' + funCaller.initNumber2(datas[i].LJJZ, 4, true) + '</td>';
                param.fundGetType == 1 ? gotoLSSYLdiv += '<td class="' + funCaller.isRed(datas[i].JZZZL) + ' numberFont">' + funCaller.initNumber2(datas[i].JZZZL, 2) + '</td>' : '';
                gotoLSSYLdiv += '</tr>';
            }

            gotoLSSYLdiv += '</tbody></table></div>';
            if (data.TotalCount > 5)
                gotoLSSYLdiv += '<p class="ui_alignCenter tip lssylMore"><a href="http://js1.eastmoney.com/tg.aspx?ID=4205" target="_blank">下载天天基金网APP，查看更多&gt;</a></p>';

            gotoLSSYLdiv += '</div>';

            gotoLSSYL.after(gotoLSSYLdiv);
        },
        gotoJBCCloadView: function (data) {
            if(data.Datas.length==0) {
             $('#gotoJBCC').next('.fold_content').html('<span class="notips">暂无数据</span>');
             return;
            }
            var _this = this;
            param.isclick.gotoJBCC = false;
            var gotoJBCC = $('#gotoJBCC'), gotoJBCCcontent = $('#jbcc_scroll').find('tbody'), tbody = "", datas = data.Datas;
            $('#cjjzri').html('截止日期：<span class="numberFont">' + datas[0].ShareDate + '</span>').show();
            for (i = 0; i < datas.length; i++) {
                tbody += '<tr><td> <a href="http://m.quote.eastmoney.com/stock,' + datas[i].ShareCode + '.shtml">' + datas[i].ShareName + '</a></td>';
                tbody += '<td class="numberFont">' + datas[i].ShareProportion + '</td>';
                tbody += '<td class="' + funCaller.isRed(datas[i].ShareGain) + ' numberFont">' + funCaller.initNumber2(datas[i].ShareGain * 100, 2) + '</td></tr>';
            }
            gotoJBCCcontent.html(tbody);
        },
        FundSameCompanyListloadView: function (data) {
            var tgsqxjj_url = $('#tgsqxjj_url'), pageContentTgsqxjj = $('.pageContentTgsqxjj'), thisul = pageContentTgsqxjj.find('.fund-list');
            tgsqxjj_url.attr('data-href', param.sameCompany + '?companyid=' + data.Expansion + '#1');
            funCaller.bindData(data.TotalCount, '.numberFont', '#tgsqxjj_url');
            var datas = data.Datas;
            var thishtml = thisul.html();
            thisul.html('');
            for (i = 0; i < datas.length; i++) {
                thisul.append(thishtml);
                var _thisli = thisul.find('li').eq(i);
                _thisli.children('a').attr('href', param.funurl + '?fundcode=' + datas[i].FCODE);
                var _thistbl = _thisli.find('.fund-tbl');
                _thistbl.find('.fund-title a').attr('href', param.funurl + '?fundcode=' + datas[i].FCODE).html(datas[i].SHORTNAME);
                _thistbl.find('.fund_minsg span').html(datas[i].MINSG);
                _thistbl.find('.profit').html(funCaller.initNumber2(datas[i].SYL, 2));
                _thistbl.find('.profit').next('.profit-title').html(datas[i].SYLMARK);
                _thistbl.find('.fund-fl.font15').html(datas[i].SOURCERATE);
                _thistbl.find('.fund-fl.font15W').html(datas[i].RATE);
                _thistbl.find('.fund-buy').attr('href', param.funBuyUrl + '#code=' + datas[i].FCODE);
            }
            var _turl = param.sameCompany + '?companyid=' + data.Expansion + '#1';
            thisul.append('<li class="fund-item-last1"><a class="more" href=' + _turl + '>查看同公司旗下基金&gt;</a><a></a></li>');
            tgsqxjj_url.on('click', function () {
                window.location.href = $(this).attr('data-href');
            });
        },
        FundSameTypeListloadView: function (data) {
            var tljjzf_url = $('#tljjzf_url'), pageContentTljjzf = $('.pageContentTljjzf'), thisul = pageContentTljjzf.find('.fund-list');
            tljjzf_url.attr('data-href', param.sameType + '#' + param.fundtype);
            funCaller.bindData(data.TotalCount, '.numberFont', '#tljjzf_url');
            var datas = data.Datas;
            var thishtml = thisul.html();
            thisul.html('');
            for (i = 0; i < datas.length; i++) {
                thisul.append(thishtml);
                var _thisli = thisul.find('li').eq(i);
                _thisli.children('a').attr('href', param.funurl + '?fundcode=' + datas[i].FCODE);
                var _thistbl = _thisli.find('.fund-tbl');
                _thistbl.find('.fund-title a').attr('href', param.funurl + '?fundcode=' + datas[i].FCODE).html(datas[i].SHORTNAME);
                _thistbl.find('.fund_minsg span').html(datas[i].MINSG);
                _thistbl.find('.profit').html(funCaller.initNumber2(datas[i].SYL, 2));
                _thistbl.find('.profit').next('.profit-title').html(datas[i].SYLMARK);
                _thistbl.find('.fund-fl.font15').html(datas[i].SOURCERATE);
                _thistbl.find('.fund-fl.font15W').html(datas[i].RATE);
                _thistbl.find('.fund-buy').attr('href', param.funBuyUrl + '#code=' + datas[i].FCODE);
            }
            var _turl = param.sameType + '#' + param.fundtype;
            thisul.append('<li class="fund-item-last1"><a class="more" href=' + _turl + '>查看全部同类基金>&gt;</a><a></a></li>');
            tljjzf_url.on('click', function () {
                window.location.href = $(this).attr('data-href');
            });
        },
        gotoJJJLloadView: function (data) {
            var _this = this, gotoJJJL_scroll = $('#gotoJJJL_scroll'), scrolltable = "", datas = data.Datas;
            for (i = 0; i < datas.length; i++) {
                var t = datas[i].LEMPDATE == "" ? '至今' : datas[i].LEMPDATE;
                scrolltable += '<tr><td>' + datas[i].FEMPDATE + '</td>';
                scrolltable += '<td>' + t + '</td>';
                scrolltable += '<td>' + datas[i].MGRNAME + '</td>';
                scrolltable += '<td>' + datas[i].DAYS + '天</td>';
                scrolltable += '<td class="' + funCaller.isRed(datas[i].PENAVGROWTH.toString()) + '">' + funCaller.initNumber2(datas[i].PENAVGROWTH, 2) + '</td></tr>';
            }
            gotoJJJL_scroll.find('tbody').html(scrolltable);
            param.isclick.gotoJJJL = false;
        },
        gotoJJJLdetailloadView: function (data) {
            var _this = this, gotoJJJL_detail = $('#gotoJJJL_detail'), detail = "", datas = data.Datas;
            for (i = 0; i < datas.length; i++) {
                var imgurl = datas[i].PHOTOURL == null ? 'http://j5.dfcfw.com/avatar/nopic.gif' : datas[i].PHOTOURL;
                detail += '<div class="ui-grid-row"><div class="ui-grid-4">';
                detail += '<img width="80" src="' + imgurl + '">';
                detail += '</div><div class="ui-grid-6 jjjlInfo">';
                detail += '<p>姓名：<span>' + datas[i].MGRNAME + '</span></p>';
                detail += '<p>上任日期：<span>' + datas[i].FEMPDATE + '</span></p>';
                detail += '<p>管理年限<span>' + funCaller.fomateDate(datas[i].DAYS) + '</span></p>';
                detail += '</div><div class="ui-grid-10 jjjltxt">';
                detail += '<p class="on">' + datas[i].RESUME + '</p>';
                detail += '<a class="togglebtn down">全部简介</a> </div></div>';

            }
            gotoJJJL_detail.html(detail);
            $('.togglebtn').on('click', function () {
                $(this).hasClass('down') ? $(this).removeClass('down').addClass('up').prev('p').removeClass('on') : $(this).removeClass('up').addClass('down').prev('p').addClass('on');
            });
        },
        gotoJJGGLoadView: function (data) {
            var _this = this, gotoJJGG = $('#gotoJJGG').next('.fold_content'), div = "", datas = data.Datas;
            div += '<div class="jjggContent">';
            for (i = 0; i < datas.length; i++) {
                div += '<div class="ui-grid-row" data-id=' + datas[i].ID + '><p class="ui-grid-2">' + datas[i].PUBLISHDATE.slice(5, 10) + '</p>';
                div += '<p class="ui-grid-8">' + datas[i].TITLE + '</p></div>';
            }
            div += '</div>';
            data.TotalCount > 5 ? div += '<p class="ui_alignCenter tip" id="jjggMore">查看更多</p>' : '';
            gotoJJGG.html(div).show();

            param.isclick.gotoJJGG = false;
            $('#jjggMore').on('click', funCaller.gotoJJGGmore);
            $('.jjggContent').find('.ui-grid-row').on('click', function () {
                window.location.href = "http://m.1234567.com.cn/m/fund/FundJJGSGG/" + param.data.FCODE + "_" + $(this).attr('data-id');
            })
        },
        gotoJJGGmore: function () {
            var _this = this;
            param.page.gotoJJGG++;
            param.dataPage.pageIndex = 1;
            param.dataPage.pageSize = 5 * param.page.gotoJJGG;
            funCaller.Ajax('FundNoticeList.ashx', param.dataPage, funCaller.gotoJJGGLoadView);
        },
        gotoFHPSloadView: function (data) {
            var gotoFHPS = $('#gotoFHPS').next('.fold_content'), div = "", datas = data.Datas, CFnumber = 0;
            div += '<div class="fhpsContent">';
            div += '<p class="ui_remark">成立以来，总计分红' + data.TotalCount + '次，拆分0次</p>';
            for (i = 0; i < datas.length; i++) {
                div += '<div class="ui-grid-row">';
                div += '<p class="ui-grid-3">' + datas[i].FSRQ + '</p>';
                div += '<p class="ui-grid-7">每份派现金<b>' + datas[i].FHFCZ + '</b>元</p>';
                div += '</div>';
                if (Number(datas[i].FHFCBZ) !== 0)
                    CFnumber++;
            }
            div += '</div>';
            data.TotalCount > 5 ? div += '<p class="ui_alignCenter tip"  id="fhpsMore">查看更多</p>' : '';
            gotoFHPS.html(div).show();
            if (CFnumber !== 0) $('p.ui_remark').html('成立以来，总计分红' + data.TotalCount + '次，拆分' + CFnumber + '次');
            for (j = 5; j < datas.length; j++) {
                gotoFHPS.find('.ui-grid-row').eq(j).hide();
            }

            param.isclick.gotoFHPS = false;
            $('#fhpsMore').on('click', function () {
                for (q = 5 * param.page.gotoFHPS; q < datas.length && q < 5 * param.page.gotoFHPS + 5; q++) {
                    gotoFHPS.find('.ui-grid-row').eq(q).show();
                }
                param.page.gotoFHPS++;
                param.page.gotoFHPS * 5 > datas.length ? $('#fhpsMore').hide() : '';
            });
        },
        gotoFHPSloadViewMore: function (data) {
            var div = '';
            for (i = 5; i < data.length; i++) {
                div += '<div class="ui-grid-row">';
                div += '<p class="ui-grid-3">' + data[i].FSRQ + '</p>';
                div += '<p class="ui-grid-7">每份派现金<b>' + data[i].FHFCZ + '</b>元</p>';
                div += '</div>';
            }
            $('#gotoFHPS').next('.fold_content').find('.fhpsContent:last-child').after(div);
        },
        discussLink: function (options) {
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: 'https://fundmobapitest.eastmoney.com/gubaapi/v3/Read/Article/Post/Articlelist.ashx',
                data: option_jjba,
                success: function (resultData) {
                    $('.discussLink').attr('href', 'http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of' + param.data.FCODE);
                    $('.discussLink').find('span').html(resultData.count);

                },
                error: function (error) {
                    $.alertWindow("网络不给力，请稍后重试", callback);
                }
            });
        },

        Ajax: function (url, data, callback) {
            var _this = this;
            funCaller.hardLoad();
            $.ajax({
                type: "GET",
                dataType: 'jsonp',
                // type: "POST",
                url: param.apiurl + url,
                data: data,
                success: function (resultData) {
                    if (typeof resultData == 'string') resultData = JSON.parse(resultData);
                    if (resultData["ErrCode"] == 0) {
                        callback(resultData);
                    }
                    else {
                        if (isEmpty(resultData["ErrMsg"])) {
                            resultData["ErrMsg"] = "网络不给力，请稍后重试";
                        }
                        else if (resultData["ErrMsg"] == "服务异常" || resultData["ErrMsg"] == "系统繁忙!") {
                            resultData["ErrMsg"] = "网络不给力，请稍后重试";
                        }
                        funCaller.alertWindow(resultData["ErrMsg"], callback);
                    }
                    funCaller.hideMask();

                },
                error: function (error) {
                    funCaller.alertWindow("网络不给力，请稍后重试", callback);
                    funCaller.hideMask();
                }

            });
        },
        domclick: function (options) {
            $('#tab').find('.tab p').on('click', function () {
                $(this).addClass('active').siblings('p').removeClass('active');
                $(this).parents('.tab').next('.tabContent').find('.img').attr('src', $(this).attr('data-imgurl') + param.data.FCODE + '.png');
                $(this).parents('.tab').next('.tabContent').find('img').attr('src', $(this).attr('data-imgurl') + param.data.FCODE + '.png');
            });
            $('#gotoLSSYL').on('click', function () {
                var _this = this;
                funCaller.toggleShow(_this);
            });
            $('#buyInfo_url').on('click', function () {
                window.location.href = 'http://m.1234567.com.cn/m/fund/fundfl/' + param.data.FCODE;
            });
            $('#baseInfo_url').on('click', function () {
                window.location.href = "http://m.1234567.com.cn/m/fund/fundjbxx/" + param.data.FCODE;
            });
            $('#tljjzf_url').on('click', function () {
                window.location.href = $(this).attr('data-href');
            });
            $('#gotoJBCC').on('click', function () {
                var _this = this;
                funCaller.toggleShow(_this);
                if (param.isclick.gotoJBCC)
                    funCaller.Ajax('FundPositionList.ashx', param.data, funCaller.gotoJBCCloadView);
            });
            $('#gotoFHPS').on('click', function () {
                var _this = this;
                funCaller.toggleShow(_this);
                if (param.isclick.gotoFHPS) {
                    funCaller.Ajax('FundBonusList.ashx', param.data, funCaller.gotoFHPSloadView);
                }

            });
            $('#gotoJJJL').on('click', function () {
                var _this = this;
                funCaller.toggleShow(_this);
                if (param.isclick.gotoJJJL) {
                    funCaller.Ajax('FundManagerList.ashx', param.data, funCaller.gotoJJJLloadView);
                    funCaller.Ajax('FundMangerDetail.ashx', param.data, funCaller.gotoJJJLdetailloadView);
                }

            });
            $('#gotoJJGG').on('click', function () {
                var _this = this;
                funCaller.toggleShow(_this);
                if (param.isclick.gotoJJGG) {
                    param.dataPage.pageIndex = 1;
                    param.dataPage.pageSize = 5;
                    funCaller.Ajax('FundNoticeList.ashx', param.dataPage, funCaller.gotoJJGGLoadView);
                }
            });
            $('#gotopinglun').on('click', function () {
                window.location.href = 'http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of' + param.data.FCODE;
            });
            $('#shareInfo').on('click', function () {
                var _this = $(this),
                    $flexShare = _this.siblings("#flexShare");
                $flexShare.toggleClass("hide");
            });
            var user = null;
            $('#addFavor').on('click', function (e) {
                if (!user || !user.id) {
                    window.location.href = "http://m.passport.eastmoney.com/login.m?backurl=" + encodeURIComponent(encodeURIComponent(location.href));
                    return;
                }

                var favorHtml = $(e.currentTarget).html();
                var option = {
                    FundType: 85,
                    /*所有*/
                    Operation: "a",
                    Uid: user.id,
                    deviceid: "",
                    plat: "wap",
                    product: "EFund",
                    version: "",
                    Fcodes: param.data.FCODE
                }
                if (favorHtml == "加自选") {
                    option.Operation = "a";
                } else {
                    option.Operation = "d";
                }
                this.addFavor(option, function (data) {
                    if (data.ErrCode == 0) {

                        if (favorHtml == "加自选") {
                            $(e.currentTarget).html("删自选");

                            $.alertWindow('添加成功', function () {
                                location.href = href;
                            }, '关闭', function () {
                            })
                        }
                        else {
                            $(e.currentTarget).html("加自选");
                            $.alertWindow('<span>删除成功</span>', function () {
                                location.href = href;
                            })
                        }
                    } else {
                        $.alertWindow('添加失败，请稍后重试！', function () {
                            location.href = href;
                        })
                    }

                });
            });
        },
        toggleShow: function (options) {
            if ($(options).next('.fold_content').css('display') == 'block') {
                $(options).next('.fold_content').hide();
                $(options).find('.iconfont').removeClass('ui_fold').addClass('ui_unfold');
            } else {
                $(options).next('.fold_content').show();
                $(options).find('.iconfont').removeClass('ui_unfold').addClass('ui_fold');
            }

        },
        initNumber2: function (n, m, bol) {
            if (!n) {
                return '--'
            }
            var b = !bol ? '%' : ''
            n = parseFloat(n).toFixed(m) + b;

            return n;
        },
        fomateDate: function (d) {
            if (d < 365) return d + '天';
            else {
                var n = parseInt(d / 365);
                var a = parseInt(d % 365);

                return n + '年又' + a + '天'
            }
        },
        isRed: function (str) {
            if (!str || str == null || str == "null") return 'ui_black';

            var bol = str.indexOf('-');
            if (bol < 0) {
                if (parseFloat(str) == 0) {
                    return 'ui_black';
                }
                return 'ui_red';
            }
            else if (parseFloat(str) < 0) return 'ui_green';
            else return 'ui_black';
        },
        isEmpty: function (value, allowEmptyString) {
            return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (this.isArray(value) && value.length === 0) || (value == "(null)");
        },
        initAlertMask: function () {

            var alertMaskerUI = $("#_alertMaskerUI_");
            if (alertMaskerUI != null) {
                alertMaskerUI.remove();
            }

            var alertMaskhtml =
                '<div class="alertMasker" id="_alertMaskerUI_">' +
                    '<div>' +
                    '<div class="alert">' +
                    '<div class="inner">' +
                    /*'<h2>温馨提示</h2>'+*/
                    '<p></p>' +
                    '<footer>' +
                    '<a href="javascript:void(null)" class="button" for="yes" >确定</a>' +
                    '</footer>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            $("body").append(alertMaskhtml);

        },
        alertWindow: function (txt, callback, option) {
            var _this = this;
            var target = $("#_alertMaskerUI_");
            if (target.is(":visible")) {
                return false;
            }

            var tempTxt = txt ? txt : "";
            var tempCallback = callback ? callback : function () {
            };

            var btnTxt = option ? "确定" : option;
            target.find(".btn").html(btnTxt);

            target.show();
            target.find("p").html(tempTxt);
            target.find(".alert").addClass("show");

            var tempTapFun = function (e) {
                // e.stopPropagation();

                setTimeout(function () {
                    _this.closeAlertWindow();
                    tempCallback(false);
                }, 300)

            };

            var btn = target.find(".button[for=yes]");
            btn.off("tap").on("tap", tempTapFun);
        },
        closeAlertWindow: function () {
            var target = $("#_alertMaskerUI_");
            target.hide();
            target.find(".alert").removeClass("show");
        },
        addFavor: function (option, callback) {
            $.hardLoad();
            $.ajax({
                type: "GET",
                dataType: 'jsonp',
                url: "http://fundex2.eastmoney.com/FundMobileApi/FundFavor.ashx",
                data: option,
                success: function (resultData) {
                    if (typeof resultData == 'string') resultData = JSON.parse(resultData);

                    var result = resultData["Datas"];


                    if (resultData["ErrCode"] == 0) {
                        callback(resultData);
                    }
                    else {
                        if ($.isEmpty(resultData["ErrMsg"])) {
                            resultData["ErrMsg"] = "网络不给力，请稍后重试";
                        }
                        else if (resultData["ErrMsg"] == "服务异常" || resultData["ErrMsg"] == "系统繁忙!") {
                            resultData["ErrMsg"] = "网络不给力，请稍后重试";
                        }
                        funCaller.alertWindow(resultData["ErrMsg"], callback);
                    }
                    funCaller.hideMask();

                },
                error: function (error) {
                    funCaller.alertWindow("网络不给力，请稍后重试", callback);
                    funCaller.hideMask();
                }

            });
        },
        hardLoad: function (txt, callback) {
            var _this = this;
            funCaller.load(txt ? txt : "加载中");
            var loadingMaskUI = $("#_loadingMaskUI_");
            var c = loadingMaskUI.attr('c');

            if (!c) c = 0;
            loadingMaskUI.attr('c', ++c);

            if (loadingMaskUI.is(":visible")) {

                return false;
            }

            loadingMaskUI.css({"display": "table", "background": "rgba(0,0,0,0)"});

            var tempCustomFun = callback ? callback : function () {
                funCaller.alertWindow("网络不给力，请稍后重试");
            };

            var tempCallback = function () {
                funCaller.hideMaskForce();
                tempCustomFun();
            };

            clearTimeout(timeoutFun);
            timeoutFun = setTimeout(tempCallback, 30000);
        },
        load: function (txt) {
            $("#_loadingMaskUI_ div[ui]").hide();
            $("#_loadingMaskUI_ ._maskload_").show().find("span").html(txt);
        },
        hideMaskForce: function () {
            var loadingMaskUI = $("#_loadingMaskUI_");
            loadingMaskUI.css("display", "none");
            clearTimeout(timeoutFun);
        },
        hideMask: function () {

            var loadingMaskUI = $("#_loadingMaskUI_");
            var c = loadingMaskUI.attr('c');

            if (c <= 1) {
                loadingMaskUI.attr('c', 0)
                loadingMaskUI.css("display", "none");
            } else {
                loadingMaskUI.attr('c', --c)
            }
            clearTimeout(timeoutFun);

        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return "";

        },
        bindData: function (data, Cid, Pid, color) {
            var dom;
            dom = Pid !== null && Pid !== undefined && Pid !== 0 ? $(Pid).find(Cid) : $(Cid);
            if (color !== undefined) dom.addClass(color);
            dom.html(data);
        },
    }

    return customElem;
});