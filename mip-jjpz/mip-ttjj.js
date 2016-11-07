define('mip-ttjjmobile', ['require', 'customElement', 'zepto'], function(require) {
    var $ = require('zepto');    
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var element = this.element,          
        _id = element.getAttribute("asid");
        funCaller.init( );     
    };

    var param={
        data:{
            FCODE:'000001',
            deviceid:"H5",
            version:"4.3.0",
            product:"EFund",
            plat:"Wap",
        },
        dataPage:{
            FCODE:'000001',
            deviceid:"H5",
            version:"4.3.0",
            product:"EFund",
            plat:"Wap",
            pageIndex:1,
            pageSize:3,
        },
        apiurl:"http://fundmobapi.eastmoney.com/FundMApi/",
        fundtype:"",
        fundGetType:1,
        isclick:{
            gotoJBCC:true,
            gotoFHPS:true,
            gotoJJJL:true,
            gotoJJGG:true,
        },
        page:{
            gotoJJGG:1,
            gotoFHPS:1,
        },
    },
    option_jjba = {
        'deviceid':'837EC5754F503CFAAEE0929FD48974E7',
        'ps':20,
        'plat':'Wap',
        'product':'Fund',
        'version':'201',
        'code':"of" + param.data.FCODE,
        'p':'',
        'type':'',
        'postid':10,
        'sorttype':0,
    },timeoutFun = function(){};

    var funCaller = {
        init:function(_id){
            var _this=this;
            //this.getFundDetail(_id);
            //this.getAttention(_id);
            //this.getSelection(_id);
            //console.log(_this);
            _this.Ajax('FundBase.ashx',param.data,_this.FundBaseloadView);
            _this.Ajax('FundNetDiagram.ashx',param.data,_this.FundNetDiagramloadView);
            
            _this.Ajax('FundSameCompanyList.ashx',param.data,_this.FundSameCompanyListloadView);
            _this.Ajax('FundSameTypeList.ashx',param.dataPage,_this.FundSameTypeListloadView);

            _this.discussLink();
            
        },
        FundBaseloadView:function(data){
            var data=data.Datas;
            switch(data.FUNDTYPE){
                case '003':
                param.fundtype=5;
                param.fundGetType=1;
                break;   
                case '004':
                case '005':
                param.fundtype=10;
                param.fundGetType=2;
                break;   
                case '006':
                param.fundtype=7;
                param.fundGetType=1;
                break;   
                case '007':
                param.fundtype=8;
                param.fundGetType=1;
                break;   
                case '201':
                param.fundtype=12;
                param.fundGetType=1;
                break;   
                default:
                param.fundtype=3;
                param.fundGetType=1;
                break;

            }
            var RISKLEVEL = ['--', '低风险', '中低风险', '中风险', '中高风险', '高风险'],RISKLEVELname,RISKLEVELt;
            RISKLEVELt=Number(data.RISKLEVEL);
            switch (RISKLEVELt){
                case 0:
                RISKLEVELname= RISKLEVEL[0]
                break;
                case 1:
                RISKLEVELname= RISKLEVEL[1]
                break;
                case 2:
                RISKLEVELname= RISKLEVEL[2]
                break;
                case 3:
                RISKLEVELname= RISKLEVEL[3]
                break;
                case 4:
                RISKLEVELname= RISKLEVEL[4]
                break;
                case 5:
                RISKLEVELname= RISKLEVEL[5]
                break;
            }

            var _this=this,
            ui_outerP=$('.pageContent1').find('.ui_outer'),
            ui_outer1P=ui_outerP.eq(0),
            ui_outer2P=ui_outerP.eq(1),
            ui_outer3P=ui_outerP.eq(2),
            ui_outer1="",ui_outer2="";

            data.DWJZ=funCaller.initNumber2(data.DWJZ, 4, true);
            ui_outer1+='<div class="ui_inner ui-grid-row ui_h2 ui_inner_m15">';
            ui_outer1+='<div class="header1">'+data.SHORTNAME+'<span class="coder fundcode">（'+data.FCODE+'）</span></div>';
            ui_outer1+='<div class="ui_gray header2">'+data.FTYPE+'<span class="split">|</span>'+RISKLEVELname;
            if(data.RLEVEL_SZ)
                ui_outer1+='<span class="split">|</span>'+data.RLEVEL_SZ+'星评级';
            ui_outer1+='</div><div class="ui-grid-5"><p class="ui_m ui_gray">最新净值（<span class="numberFont">'+data.FSRQ.slice(5,10)+'</span>）</p><p class="txtBig '+funCaller.isRed(data.RZDF)+'">'+funCaller.initNumber2(data.DWJZ,4,true)+'</p></div>';
            ui_outer1+='<div class="ui-grid-5 rzfLeftBorder"><p class="ui_m ui_gray">日涨幅</p><p class="txtBig '+funCaller.isRed(data.RZDF)+'">'+funCaller.initNumber2(data.RZDF,2)+'</p></div></div>';
            ui_outer1+='<div class="ui_m ui-grid-row ui_h2 ui_inner_m15 boder-bottom"><span class="ui_gray font-MS">盘中估值：</span>';

            ui_outer1+='<span class="padding-right5px numberFont ' + (data.Valuation ? funCaller.isRed(JSON.parse(data.Valuation).gszzl) : "") + '">' + (data.Valuation ? (JSON.parse(data.Valuation).gsz) : "--") + '</span>';
            ui_outer1+='<span class="padding-right5px numberFont ' + (data.Valuation ? funCaller.isRed(JSON.parse(data.Valuation).gszzl) : "") + '">' + (data.Valuation ? funCaller.initNumber2(JSON.parse(data.Valuation).gszzl, 2) : "") + '</span>';
            ui_outer1+='<span class="ui_gray numberFont ">(' + (data.Valuation ? JSON.parse(data.Valuation).gztime.substring(5, 16) : "") + ')</span>';
            ui_outer1P.html(ui_outer1);

            ui_outer2+='<div id="Info_url" class="ui_inner ui-grid-row ui_h2 ui_inner_m15 paddingRight1 ui_arr iconfont  border-topnone">';
            ui_outer2+='<div class="ui-grid-5"><p class="ui_m ui_gray">今年来：<span class="numberFont '+funCaller.isRed(data.SYL_JN)+'">'+funCaller.initNumber2(data.SYL_JN,2)+'</span></p></div>';
            ui_outer2+='<div class="ui-grid-5"><p class="ui_m ui_gray">近1月：<span class="numberFont '+funCaller.isRed(data.SYL_Y)+'">'+funCaller.initNumber2(data.SYL_Y,2)+'</span></p></div>';
            ui_outer2+='<div class="ui-grid-5"><p class="ui_m ui_gray">近6月：<span class="numberFont '+funCaller.isRed(data.SYL_6Y)+'">'+funCaller.initNumber2(data.SYL_6Y,2)+'</span></p></div>';
            ui_outer2+='<div class="ui-grid-5"><p class="ui_m ui_gray">近1年：<span class="numberFont '+funCaller.isRed(data.SYL_1N)+'">'+funCaller.initNumber2(data.SYL_1N,2)+'</span></p></div> </div>';                
            ui_outer2P.html(ui_outer2);  

            ui_outer3P.find('.ui_black.numberFont').html('<span class="ui_delLine">'+data.SOURCERATE+' </span> '+data.RATE); 
            $('#baseInfo_url').find('.jjxx-h').html('<span class="ui_gray">'+data.FTYPE+'</span><span class="ui_gray"><span class="split">|</span>'+RISKLEVELname+'</span>');
            if(data.RLEVEL_SZ){
                $('#gotoJBCC').hide();
                $('#baseInfo_url').find('.jjxx-h').html('<span class="ui_gray">'+data.FTYPE+'</span><span class="ui_gray"><span class="split">|</span>'+RISKLEVELname+'</span><span class="split">|</span>'+data.RLEVEL_SZ+'星评级');
            }else{
                $('#baseInfo_url').find('.jjxx-h').html('<span class="ui_gray">'+data.FTYPE+'</span><span class="ui_gray"><span class="split">|</span>'+RISKLEVELname+'</span>');
            }
            $('#tab .tabContent').find('.img').attr('src','http://j4.dfcfw.com/charts/pic1/'+param.data.FCODE+'.png');
            $('#tab .tabContent').find('img').attr('src','http://j4.dfcfw.com/charts/pic1/'+param.data.FCODE+'.png');
            $('#Info_url').on('click',function(){
                window.location.href='http://m.1234567.com.cn/m/fund/fundjdsy/'+param.data.FCODE;
            })
            $('#buyJJ').attr('href','https://tradewap.1234567.com.cn/buyfund.html#code='+param.data.FCODE);
            funCaller.domclick();
        },
        FundNetDiagramloadView:function(data){
            var _this=this,
            gotoLSSYL=$('#gotoLSSYL'),
            gotoLSSYLdiv="",
            datas=data.Datas;
            gotoLSSYL.find('.ui-grid-8 p').html(param.fundGetType==1?'历史净值':'历史收益率');
            gotoLSSYLdiv+='<div class="fold_content"><div id="LSSYL_scroll"><table class="ui-table"><thead>';
            param.fundGetType==1?gotoLSSYLdiv+='<tr><th>日期</th> <th>单位净值</th><th>累计净值</th><th>日增长率</th></tr></thead><tbody>':gotoLSSYLdiv+='<tr><th>日期</th> <th>万份收益</th><th>7日年化</th></tr></thead><tbody>';
            for(i=0;i<datas.length&&i<5;i++){

                gotoLSSYLdiv+='<tr><td class="numberFont">'+datas[i].FSRQ+'</td>';
                gotoLSSYLdiv+='<td class="numberFont">'+funCaller.initNumber2(datas[i].DWJZ, 4, true)+'</td>';
                gotoLSSYLdiv+='<td class="numberFont">'+funCaller.initNumber2(datas[i].LJJZ, 4, true)+'</td>';
                param.fundGetType==1?gotoLSSYLdiv+='<td class="'+funCaller.isRed(datas[i].JZZZL)+' numberFont">'+funCaller.initNumber2(datas[i].JZZZL,2)+'</td>':'';
                gotoLSSYLdiv+='</tr>';
            }

            gotoLSSYLdiv+='</tbody></table></div>';
            if(data.TotalCount>5)
                gotoLSSYLdiv+='<p class="ui_alignCenter tip lssylMore"><a href="http://js1.eastmoney.com/tg.aspx?ID=4205" target="_blank">下载天天基金网APP，查看更多&gt;</a></p>';

            gotoLSSYLdiv+='</div>';

            gotoLSSYL.after(gotoLSSYLdiv); 
        },
        gotoJBCCloadView:function(data){
            var _this=this;
            param.isclick.gotoJBCC=false;
            var gotoJBCC=$('.gotoJBCC'),gotoJBCCcontent=$('#jbcc_scroll').find('tbody'),tbody="",datas=data.Datas;
            $('#cjjzri').html('截止日期：<span class="numberFont">'+datas[0].ShareDate+'</span>').show();
            for(i=0;i<datas.length;i++){
                tbody+='<tr><td> <a href="http://m.quote.eastmoney.com/stock/'+datas[i].ShareCode+'.shtml">'+datas[i].ShareName+'</a></td>';
                tbody+='<td class="numberFont">'+datas[i].ShareProportion+'</td>';
                tbody+='<td class="'+funCaller.isRed(datas[i].ShareGain)+' numberFont">'+funCaller.initNumber2(datas[i].ShareGain*100,2)+'</td></tr>';
            }
            gotoJBCCcontent.html(tbody);
        },
        FundSameCompanyListloadView:function(data){
            var _this=this,pageContentTgsqxjj=$('.pageContentTgsqxjj'),div="",ul="";
            div+='<div class="ui_outer ui_blank" id="tgsqxjj_url" data-href="http://m.1234567.com.cn/m/fund/jjjz.shtml?companyid='+data.Expansion+'#1">';
            div+=' <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding"><p class="ui-grid-4 ">同公司旗下基金</p>';
            div+='<div class="ui-grid-6 ui_arr iconfont">';
            div+='<div class="ui_gray ui-right pddingRight15">共<span class="numberFont">'+data.TotalCount+'</span>只基金</div>';
            div+=' </div></div></div>';
            var datas=data.Datas;
            ul+='<ul class="fund-list">'; 
            for(i=0;i<datas.length;i++){
                ul+='<li class="fund-item"><a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode='+datas[i].FCODE+'" class="font17" target="_blank">';
                ul+='<table class="fund-tbl"><tbody><tr><td class="left" colspan="4">';
                ul+='<div class="fund-title  ui_arr1 iconfont"><a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode='+datas[i].FCODE+'" class="fund-detail font17" target="_blank">'+datas[i].SHORTNAME+'</a>';
                ul+=' <span class="ui_gray fund_minsg paddingR15"><span class="numberFont">'+datas[i].MINSG+'</span>元起购</span></div></td></tr>';
                ul+='<tr><td class="left col_1"><b class="profit font22">'+funCaller.initNumber2(datas[i].SYL,2)+'</b><span class="profit-title">近6月收益率</span></td>';
                ul+='<td class="left col_1"><div>';
                ul+='<span class="fund-fl font15">'+datas[i].SOURCERATE+'</span><span class="fund-fl font15W"> '+datas[i].RATE+'</span><span class="profit-title">购买手续费</span>';
                ul+='</div></td>';
                ul+='<td class="right col_2 align-bottom"><a class="fund-buy" href="https://tradewap.1234567.com.cn/buyfund.html#code='+datas[i].FCODE+'" target="_blank">购买</a></td>';
                ul+='</tr></tbody></table></a></li>';               
            }
            ul+='<li class="fund-item-last1"><a class="more" href="http://m.1234567.com.cn/m/fund/jjjz.shtml?companyid='+data.Expansion+'#1" target="_blank">查看同公司旗下基金&gt;</a></li>';
            ul+='</ul>';    
            pageContentTgsqxjj.html(div+ul);
            $('#tgsqxjj_url').on('click',function(){
                window.location.href=$(this).attr('data-href');
            });     
        },
        FundSameTypeListloadView:function(data){
            var _this=this,pageContentTljjzf=$('.pageContentTljjzf'),div="",ul="";
            div+='<div class="ui_outer ui_blank" id="tljjzf_url" data-href="http://m.1234567.com.cn/m/fund/jjph.shtml#'+param.fundtype+'">';
            div+=' <div class="ui_inner ui-grid-row ui_h1 ui_inner_m15 anotherPadding"><p class="ui-grid-4 ">同类基金涨幅</p>';
            div+='<div class="ui-grid-6 ui_arr iconfont">';
            div+='<div class="ui_gray ui-right pddingRight15">共<span class="numberFont">'+data.TotalCount+'</span>只基金</div>';
            div+=' </div></div></div>';
            var datas=data.Datas;
            ul+='<ul class="fund-list">'; 
            for(i=0;i<datas.length;i++){
                ul+='<li class="fund-item"><a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode='+datas[i].FCODE+'" class="font17" target="_blank">';
                ul+='<table class="fund-tbl"><tbody><tr><td class="left" colspan="4">';
                ul+='<div class="fund-title  ui_arr1 iconfont"><a href="http://m.1234567.com.cn/m/fund/funddetail/?fundcode='+datas[i].FCODE+'" class="fund-detail font17" target="_blank">'+datas[i].SHORTNAME+'</a>';
                ul+=' <span class="ui_gray fund_minsg paddingR15"><span class="numberFont">'+datas[i].MINSG+'</span>元起购</span></div></td></tr>';
                ul+='<tr><td class="left col_1"><b class="profit font22">'+funCaller.initNumber2(datas[i].SYL,2)+'</b><span class="profit-title">近6月收益率</span></td>';
                ul+='<td class="left col_1"><div>';
                ul+='<span class="fund-fl font15">'+datas[i].SOURCERATE+'</span><span class="fund-fl font15W"> '+datas[i].RATE+'</span><span class="profit-title">购买手续费</span>';
                ul+='</div></td>';
                ul+='<td class="right col_2 align-bottom"><a class="fund-buy" href="https://tradewap.1234567.com.cn/buyfund.html#code='+datas[i].FCODE+'" target="_blank">购买</a></td>';
                ul+='</tr></tbody></table></a></li>';               
            }
            ul+='<li class="fund-item-last1"><a class="more" href="http://m.1234567.com.cn/m/fund/jjph.shtml#'+param.fundtype+'" target="_blank">查看全部同类基金&gt;</a></li>';
            ul+='</ul>';    
            pageContentTljjzf.html(div+ul); 
            $('#tljjzf_url').on('click',function(){
                window.location.href=$(this).attr('data-href');
            });       
        },
        gotoJJJLloadView:function(data){
            var _this=this,gotoJJJL_scroll=$('#gotoJJJL_scroll'),scrolltable="",datas=data.Datas;
            for(i=0;i<datas.length;i++){
                var t=datas[i].LEMPDATE==""?'至今':datas[i].LEMPDATE;
                scrolltable+='<tr><td>'+datas[i].FEMPDATE+'</td>';
                scrolltable+='<td>'+t+'</td>';
                scrolltable+='<td>'+datas[i].MGRNAME+'</td>';
                scrolltable+='<td>'+datas[i].DAYS+'</td>';
                scrolltable+='<td class="'+funCaller.isRed(datas[i].PENAVGROWTH.toString())+'">'+datas[i].PENAVGROWTH+'</td></tr>';
            }
            gotoJJJL_scroll.find('tbody').html(scrolltable);
            param.isclick.gotoJJJL=false;
        },
        gotoJJJLdetailloadView:function(data){
            var _this=this,gotoJJJL_detail=$('#gotoJJJL_detail'),detail="",datas=data.Datas;
            for(i=0;i<datas.length;i++){
                var imgurl=datas[i].PHOTOURL==null?'http://j5.dfcfw.com/avatar/nopic.gif':datas[i].PHOTOURL;
                detail+='<div class="ui-grid-row"><div class="ui-grid-4">';
                detail+='<img width="80" src="'+imgurl+'">';
                detail+='</div><div class="ui-grid-6 jjjlInfo">';
                detail+='<p>姓名：<span>'+datas[i].MGRNAME+'</span></p>';
                detail+='<p>上任日期：<span>'+datas[i].FEMPDATE+'</span></p>';
                detail+='<p>管理年限<span>'+funCaller.fomateDate(datas[i].DAYS)+'</span></p>';
                detail+='</div><div class="ui-grid-10 jjjltxt">';
                detail+='<p class="on">'+datas[i].RESUME+'</p>';
                detail+='<a class="togglebtn down">全部简介</a> </div></div>';              

            }
            gotoJJJL_detail.html(detail);
            $('.togglebtn').on('click',function(){
                $(this).hasClass('down')?$(this).removeClass('down').addClass('up').prev('p').removeClass('on'): $(this).removeClass('up').addClass('down').prev('p').addClass('on');         
            });
        },
        gotoJJGGLoadView:function(data){
            var _this=this,gotoJJGG=$('#gotoJJGG').next('.fold_content'),div="",datas=data.Datas;
            div+='<div class="jjggContent">';
            for(i=0;i<datas.length;i++){
                div+='<div class="ui-grid-row" data-id='+datas[i].ID+'><p class="ui-grid-2">'+datas[i].PUBLISHDATE.slice(5, 10)+'</p>';
                div+='<p class="ui-grid-8">'+datas[i].TITLE+'</p></div>';    
            }
            div+='</div>';
            data.TotalCount>5?div+='<p class="ui_alignCenter tip" id="jjggMore">查看更多</p>':'';
            gotoJJGG.html(div).show();

            param.isclick.gotoJJGG=false;
            $('#jjggMore').on('click',funCaller.gotoJJGGmore);
            $('.jjggContent').find('.ui-grid-row').on('click',function(){
                window.location.href="http://m.1234567.com.cn/m/fund/FundJJGSGG/"+param.data.FCODE+"_"+$(this).attr('data-id');
            })
        },
        gotoJJGGmore:function(){
            var _this=this;
            param.page.gotoJJGG++;
            param.dataPage.pageIndex=1;
            param.dataPage.pageSize=5*param.page.gotoJJGG;
            funCaller.Ajax('FundNoticeList.ashx',param.dataPage,funCaller.gotoJJGGLoadView);
        },
        gotoFHPSloadView:function(data){
            var gotoFHPS=$('#gotoFHPS').next('.fold_content'),div="",datas=data.Datas;
            div+='<div class="fhpsContent">';
            div+='<p class="ui_remark">成立以来，总计分红'+data.TotalCount+'次，拆分0次</p>';
            for(i=0;i<datas.length;i++){
                div+='<div class="ui-grid-row">';
                div+='<p class="ui-grid-3">'+datas[i].FSRQ+'</p>';
                div+='<p class="ui-grid-7">每份派现金<b>'+datas[i].FHFCZ+'</b>元</p>';
                div+='</div>';
            }
            div+='</div>';

            data.TotalCount>5? div+='<p class="ui_alignCenter tip"  id="fhpsMore">查看更多</p>':'';
            gotoFHPS.html(div).show();
            for(j=5;j<datas.length;j++){
                gotoFHPS.find('.ui-grid-row').eq(j).hide();
            }

            param.isclick.gotoFHPS=false;
            $('#fhpsMore').on('click',function(){
                for(q=5*param.page.gotoFHPS;q<datas.length&&q<5*param.page.gotoFHPS+5;q++){
                    gotoFHPS.find('.ui-grid-row').eq(q).show();
                }
                param.page.gotoFHPS++;
                param.page.gotoFHPS*5>datas.length?$('#fhpsMore').hide():'';
            });
        },
        gotoFHPSloadViewMore:function(data){
            var div='';
            for(i=5;i<data.length;i++){
                div+='<div class="ui-grid-row">';
                div+='<p class="ui-grid-3">'+data[i].FSRQ+'</p>';
                div+='<p class="ui-grid-7">每份派现金<b>'+data[i].FHFCZ+'</b>元</p>';
                div+='</div>';
            }
            $('#gotoFHPS').next('.fold_content').find('.fhpsContent:last-child').after(div);
        },
        discussLink:function(options){
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: 'https://fundmobapitest.eastmoney.com/gubaapi/v3/Read/Article/Post/Articlelist.ashx',
                data:option_jjba,
                success: function (resultData) {
                  $('.discussLink').attr('href','http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of'+param.data.FCODE);
                  $('.discussLink').find('span').html(resultData.count);

              },
              error: function (error) {
                $.alertWindow("网络不给力，请稍后重试", callback);
            }
        });
        },

        Ajax:function(url,data,callback){
            var _this=this;
            funCaller.hardLoad();
            $.ajax({
                type: "GET",
                dataType: 'jsonp',
                // type: "POST",
                url: param.apiurl+url,
                data:data,
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
        domclick:function(options){
            $('#tab').find('.tab p').on('click',function(){
                $(this).addClass('active').siblings('p').removeClass('active');
                $(this).parents('.tab').next('.tabContent').find('.img').attr('src',$(this).attr('data-imgurl')+param.data.FCODE+'.png');
                $(this).parents('.tab').next('.tabContent').find('img').attr('src',$(this).attr('data-imgurl')+param.data.FCODE+'.png');
            });
            $('#gotoLSSYL').on('click',function(){
                var _this=this;
                funCaller.toggleShow(_this);
            });
            $('#buyInfo_url').on('click',function(){
                window.location.href='http://m.1234567.com.cn/m/fund/fundfl/'+param.data.FCODE;
            });
            $('#baseInfo_url').on('click',function(){
                window.location.href="http://m.1234567.com.cn/m/fund/fundjbxx/"+param.data.FCODE;
            });
            $('#tljjzf_url').on('click',function(){
                window.location.href=$(this).attr('data-href');
            });
            $('#gotoJBCC').on('click',function(){
             var _this=this;
             funCaller.toggleShow(_this);
             if(param.isclick.gotoJBCC)
                 funCaller.Ajax('FundPositionList.ashx',param.data,funCaller.gotoJBCCloadView);
         });
            $('#gotoFHPS').on('click',function(){
                var _this=this;
                funCaller.toggleShow(_this);
                if(param.isclick.gotoFHPS){
                    funCaller.Ajax('FundBonusList.ashx',param.data,funCaller.gotoFHPSloadView);
                }

            });
            $('#gotoJJJL').on('click',function(){
                var _this=this;
                funCaller.toggleShow(_this);
                if(param.isclick.gotoJJJL){
                    funCaller.Ajax('FundManagerList.ashx',param.data,funCaller.gotoJJJLloadView);
                    funCaller.Ajax('FundMangerDetail.ashx',param.data,funCaller.gotoJJJLdetailloadView);
                }

            });
            $('#gotoJJGG').on('click',function(){
                var _this=this;
                funCaller.toggleShow(_this);
                if(param.isclick.gotoJJGG){
                    param.dataPage.pageIndex=1;
                    param.dataPage.pageSize=5;
                    funCaller.Ajax('FundNoticeList.ashx',param.dataPage,funCaller.gotoJJGGLoadView);
                }
            });
            $('#gotopinglun').on('click',function(){
                window.location.href='http://jjbmob.eastmoney.com/fundDynamicsForFundBar.html#postid=of'+param.data.FCODE;
            });
            $('#shareInfo').on('click',function(){
               var _this = $(this),
               $flexShare = _this.siblings("#flexShare");
               $flexShare.toggleClass("hide");
               if (!this.Share) {
                this.Share = true;
                $flexShare.on("touchend", "li", function () {
                    var j = $(this);
                    setTimeout(function () {
                        var type = j.data("type");
                        if (type) {
                            funCaller.shareTo(type);
                        }
                    }, 1200);
                })
            }
        });
            var user=null;
            $('#addFavor').on('click',function(e){
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
                    Fcodes:param.data.FCODE
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
                            }, '关闭', function () { })
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

        toggleShow:function(options){
            if($(options).next('.fold_content').css('display')=='block'){
                $(options).next('.fold_content').hide();
                $(options).find('.iconfont').removeClass('ui_fold').addClass('ui_unfold');            
            }else{
                $(options).next('.fold_content').show();
                $(options).find('.iconfont').removeClass('ui_unfold').addClass('ui_fold');
            }

        },
        initNumber2:function (n, m, bol){
            if(!n){
                return '--'
            }
            var b = !bol ? '%' : ''
            n = parseFloat(n).toFixed(m) + b;

            return n;
        },
        fomateDate:function(d) {
            if (d < 365) return d + '天';
            else {
                var n = parseInt(d / 365);
                var a = parseInt(d % 365);

                return n + '年又' + a + '天'
            }
        },
        isRed:function(str) {
            if (!str || str == null || str == "null") return 'ui_black';

            var bol = str.indexOf('-');
            if (bol < 0) {
                if (parseFloat(str) == 0) { return 'ui_black'; }
                return 'ui_red';
            }
            else if (parseFloat(str) < 0) return 'ui_green';
            else return 'ui_black';
        },
        isEmpty:function(value, allowEmptyString){
            return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (this.isArray(value) && value.length === 0) || (value == "(null)");
        },
        initAlertMask:function(){

            var alertMaskerUI = $("#_alertMaskerUI_");
            if(alertMaskerUI != null) {
                alertMaskerUI.remove();
            }

            var alertMaskhtml=
            '<div class="alertMasker" id="_alertMaskerUI_">'+
            '<div>'+
            '<div class="alert">'+
            '<div class="inner">'+
            /*'<h2>温馨提示</h2>'+*/ 
            '<p></p>'+
            '<footer>' +
            '<a href="javascript:void(null)" class="button" for="yes" >确定</a>' +
            '</footer>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

            $("body").append(alertMaskhtml);

        },
        alertWindow:function(txt,callback,option){
            var _this = this;
            var target = $("#_alertMaskerUI_");
            if(target.is(":visible"))
            {
                return false;
            }

            var tempTxt = txt ? txt : "";
            var tempCallback = callback ? callback :function(){};

            var btnTxt = option ? "确定" : option;
            target.find(".btn").html(btnTxt);

            target.show();
            target.find("p").html(tempTxt);
            target.find(".alert").addClass("show");

            var tempTapFun = function(e){
                // e.stopPropagation();

                setTimeout(function(){
                    _this.closeAlertWindow();
                    tempCallback(false);
                }, 300)
                
            };

            var btn = target.find(".button[for=yes]");
            btn.off("tap").on("tap",tempTapFun);
        },
        closeAlertWindow:function(){
            var target = $("#_alertMaskerUI_");
            target.hide();
            target.find(".alert").removeClass("show");
        },
        shareTo:function(dest){
            var shareTitle = "天天基金网";
            var url = location.href;
            /*sina*/
            var source = "基金详情";
            var sourceUrl = "http://m.1234567.com.cn/";
            var sinaAppkey = "2136217547";
            var sinaRalateUid = "2627698865";

            var title = shareTitle + "-" + source + "(m.1234567.com.cn)";

            if (url == null || title == null || url == "" || title == "") {
                $.alertWindow("错误的链接地址或标题");
                return;
            }
            var shareUrl = "";
            switch (dest.toLowerCase()) {
                case "sina":
                shareUrl = "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(url) + "&appkey=" + sinaAppkey + "&title=" + encodeURIComponent(title) + "&pic=&ralateUid=" + sinaRalateUid + "&source=" + encodeURIComponent(source) + "&sourceUrl=" + encodeURIComponent(sourceUrl);
                break;
                case "qq":
                shareUrl = "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(url) + "&appkey=801004939&site=http://wap.eastmoney.com&title=" + encodeURIComponent(title) + "&pic=";
                break;
                case "qzone":
                shareUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(url) + "&appkey=801004939&site=http://wap.eastmoney.com&title=" + encodeURIComponent(title) + "&desc=&summary=&site=http://wap.eastmoney.com";
                break;
            }

            window.parent.location.href = shareUrl;
        },
        addFavor:function(option, callback) {
            $.hardLoad();
            $.ajax({
                type: "GET",
                dataType: 'jsonp',
                // type: "POST",
                url: "http://fundex2.eastmoney.com/FundMobileApi/FundFavor.ashx",
                data: option,
                success: function (resultData) {

                    // var resultData = JSON.parse(resultData);
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
        hardLoad:function(txt,callback){
            var _this = this;
            funCaller.load(txt ? txt : "加载中");
            var loadingMaskUI = $("#_loadingMaskUI_");
            var c = loadingMaskUI.attr('c');

            if(!c) c = 0;
            loadingMaskUI.attr('c', ++c);

            if(loadingMaskUI.is(":visible"))
            {

                return false;
            }

            loadingMaskUI.css({"display": "table", "background": "rgba(0,0,0,0)"});

            var tempCustomFun = callback ? callback : function(){funCaller.alertWindow("网络不给力，请稍后重试");};

            var tempCallback = function(){
                funCaller.hideMaskForce();
                tempCustomFun();
            };

            clearTimeout(timeoutFun);
            timeoutFun = setTimeout(tempCallback, 30000);
        },
        load: function(txt) {
            $("#_loadingMaskUI_ div[ui]").hide();
            $("#_loadingMaskUI_ ._maskload_").show().find("span").html(txt);
        },
        hideMaskForce:function(){
            var loadingMaskUI = $("#_loadingMaskUI_");
            loadingMaskUI.css("display","none");
            clearTimeout(timeoutFun);
        },
        hideMask:function(){
           // var currentPage = $("div[pid]:visible");

            //if(currentPage.attr("id") == "indexView")
             //   currentPage = $("#indexView .dealTipBar");

             var loadingMaskUI = $("#_loadingMaskUI_");
             var c = loadingMaskUI.attr('c');

             if(c <= 1){
                loadingMaskUI.attr('c', 0)
                loadingMaskUI.css("display","none");
            }else{
                loadingMaskUI.attr('c', --c)
            }
            clearTimeout(timeoutFun);

        },
    }
    return customElem;
   });
require(['mip-ttjjmobile'], function (plugindemo) {
    MIP.css.ttjjmobile =__inline('./mip-ttjj.css');
    MIP.registerMipElement('mip-ttjjmobile', plugindemo,MIP.css.ttjjmobile);
});