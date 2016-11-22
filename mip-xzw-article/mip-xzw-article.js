/**
* 星座屋mip改造 javascript功能插件
* @file 页面主要内容改造
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
   var $ = require('zepto');
   var _isShowStar = false;
   var customElem = require('customElement').create();
   customElem.prototype.build = function () {
      var starBtn = $('#chos_btn');
      var starBox = $('#xz_select');
      var starbg =$('#bg_black');
      //控制弹层开启
      starBtn.on('click',function(event){
         event=event||window.event;
         event.stopPropagation();
         if (_isShowStar) {
            starBox.hide();
            starbg.hide();
            _isShowStar=false;
         }else{
            starBox.show();
            starbg.show();
            _isShowStar=true;
         }
      });
       // 关闭弹层
	  $(document).click(function(e){
	        $('#xz_select').hide();
	        $('#bg_black').hide();
	  });
 

    $.ajax({  
        url:"http://cache.xzw.com/mip/data.js",  
        dataType:'jsonp',  
        data:'',  
        jsonp:'callback',  
        jsonpCallback:'call_data',
        success:function(data) {  
                var json = JSON.parse(data);
                var starData = json.data;
                var items=starData[_get('aid')];
                $('.t_img').attr("src",items.icourl);
                $('.t_img img').attr('src',items.icourl);
                $('#starname').html(items.name);
                $('#date').html(items.date);
                $('#enname').html(items.enname);
                var infolist = $('#infolist li .info');
                infolist.eq(0).html(items.peculiarity);
                infolist.eq(1).html(items.houses);
                infolist.eq(2).html(items.property);
                infolist.eq(3).html(items.max_character);
                infolist.eq(4).html(items.controlstart);
                infolist.eq(5).html(items.color);
                infolist.eq(6).html(items.jewel);
                infolist.eq(7).html(items.luckynumber);
                infolist.eq(8).html(items.metal);
                $('#xzintroduce').html(items.introduce);
                $('.tab_sex h2 span').html(items.name);
                $('.tab_sex h2 a.btn_mgirl').attr("href",items.girlsurl);
                $('.tab_sex h2 a.btn_mboy').attr("href",items.boysurl);
                var girlslist = $('.tab_sex ul.girls li span');
                girlslist.eq(0).html(items.girlscharacter);
                girlslist.eq(1).html(items.girlsweakness);
                girlslist.eq(2).html(items.girlslove);
                $('#girlsinfo').html(items.girlsintroduce);
                var girlslist = $('.tab_sex ul.boys li span');
                girlslist.eq(0).html(items.boyscharacter);
                girlslist.eq(1).html(items.boysweakness);
                girlslist.eq(2).html(items.boyslove);
                $('#boysinfo').html(items.boysintroduce);
                $('.fortune p a').attr("href",items.todaydetailurl);
                $('.peidui h3 a').attr('href',items.matchingstarturl);
                var peidui = $('.peidui .pair_top li a');
                peidui.eq(0).attr("href",items.matchingurl[0]);
                peidui.eq(1).attr("href",items.matchingurl[1]);
                peidui.eq(2).attr("href",items.matchingurl[2]);
                peidui.eq(3).attr("href",items.matchingurl[3]);
                var mipimg = $('.peidui .pair_top li a mip-img');
                mipimg.eq(0).attr("src",items.matchingstart[0]);
                mipimg.eq(1).attr("src",items.matchingstart[1]);
                mipimg.eq(2).attr("src",items.matchingstart[2]);
                mipimg.eq(3).attr("src",items.matchingstart[3]);
                var img = $('.peidui .pair_top li a mip-img img');
                img.eq(0).attr("src",items.matchingstart[0]);
                img.eq(1).attr("src",items.matchingstart[1]);
                img.eq(2).attr("src",items.matchingstart[2]);
                img.eq(3).attr("src",items.matchingstart[3]);
                $('.libox h2 strong span').html(items.name);
                $('.inner dl mip-img').attr("src",items.libimgurl);
                $('.inner dl mip-img img').attr("src",items.libimgurl);
                $('.inner .fc2 a').attr("href",items.liburl)
                $('.inner .headtxt').attr("title",items.libhead).html(items.libhead);
                $('.inner .gary').html(items.libinfo);
                var lib_text = $('.lib_text li a');
                lib_text.eq(0).attr("href",items.lib_texturl[0]).html(items.lib_text[0]);
                lib_text.eq(1).attr("href",items.lib_texturl[1]).html(items.lib_text[1]);
                lib_text.eq(2).attr("href",items.lib_texturl[2]).html(items.lib_text[2]);
                lib_text.eq(3).attr("href",items.lib_texturl[3]).html(items.lib_text[3]);
                lib_text.eq(4).attr("href",items.lib_texturl[4]).html(items.lib_text[4]);      
        },  
        timeout:3000  
    });  

      //根据请求更换不同星座数据          
        // $.ajax({     
        //     url:"data.js",
        //     dataType: "text",
        //     data:{
        //         "aid":_get('aid')
        //     },
        //     success:function(data){
        //         var json = JSON.parse(data);
        //         var starData = json.data;
        //         var items=starData[_get('aid')];
        //         $('.t_img').attr("src",items.icourl);
        //         $('.t_img img').attr('src',items.icourl);
        //         $('#starname').html(items.name);
        //         $('#date').html(items.date);
        //         $('#enname').html(items.enname);
        //         var infolist = $('#infolist li .info');
        //         infolist.eq(0).html(items.peculiarity);
        //         infolist.eq(1).html(items.houses);
        //         infolist.eq(2).html(items.property);
        //         infolist.eq(3).html(items.max_character);
        //         infolist.eq(4).html(items.controlstart);
        //         infolist.eq(5).html(items.color);
        //         infolist.eq(6).html(items.jewel);
        //         infolist.eq(7).html(items.luckynumber);
        //         infolist.eq(8).html(items.metal);
        //         $('#xzintroduce').html(items.introduce);
        //         $('.tab_sex h2 span').html(items.name);
        //         $('.tab_sex h2 a.btn_mgirl').attr("href",items.girlsurl);
        //         $('.tab_sex h2 a.btn_mboy').attr("href",items.boysurl);
        //         var girlslist = $('.tab_sex ul.girls li span');
        //         girlslist.eq(0).html(items.girlscharacter);
        //         girlslist.eq(1).html(items.girlsweakness);
        //         girlslist.eq(2).html(items.girlslove);
        //         $('#girlsinfo').html(items.girlsintroduce);
        //         var girlslist = $('.tab_sex ul.boys li span');
        //         girlslist.eq(0).html(items.boyscharacter);
        //         girlslist.eq(1).html(items.boysweakness);
        //         girlslist.eq(2).html(items.boyslove);
        //         $('#boysinfo').html(items.boysintroduce);
        //         $('.fortune p a').attr("href",items.todaydetailurl);
        //         $('.peidui h3 a').attr('href',items.matchingstarturl);
        //         var peidui = $('.peidui .pair_top li a');
        //         peidui.eq(0).attr("href",items.matchingurl[0]);
        //         peidui.eq(1).attr("href",items.matchingurl[1]);
        //         peidui.eq(2).attr("href",items.matchingurl[2]);
        //         peidui.eq(3).attr("href",items.matchingurl[3]);
        //         var mipimg = $('.peidui .pair_top li a mip-img');
        //         mipimg.eq(0).attr("src",items.matchingstart[0]);
        //         mipimg.eq(1).attr("src",items.matchingstart[1]);
        //         mipimg.eq(2).attr("src",items.matchingstart[2]);
        //         mipimg.eq(3).attr("src",items.matchingstart[3]);
        //         var img = $('.peidui .pair_top li a mip-img img');
        //         img.eq(0).attr("src",items.matchingstart[0]);
        //         img.eq(1).attr("src",items.matchingstart[1]);
        //         img.eq(2).attr("src",items.matchingstart[2]);
        //         img.eq(3).attr("src",items.matchingstart[3]);
        //         $('.libox h2 strong span').html(items.name);
        //         $('.inner dl mip-img').attr("src",items.libimgurl);
        //         $('.inner dl mip-img img').attr("src",items.libimgurl);
        //         $('.inner .fc2 a').attr("href",items.liburl)
        //         $('.inner .headtxt').attr("title",items.libhead).html(items.libhead);
        //         $('.inner .gary').html(items.libinfo);
        //         var lib_text = $('.lib_text li a');
        //         lib_text.eq(0).attr("href",items.lib_texturl[0]).html(items.lib_text[0]);
        //         lib_text.eq(1).attr("href",items.lib_texturl[1]).html(items.lib_text[1]);
        //         lib_text.eq(2).attr("href",items.lib_texturl[2]).html(items.lib_text[2]);
        //         lib_text.eq(3).attr("href",items.lib_texturl[3]).html(items.lib_text[3]);
        //         lib_text.eq(4).attr("href",items.lib_texturl[4]).html(items.lib_text[4]);             
        //     }
        // })
     
     //获取今日运势内容
    $.ajax({  
        url:"http://m.xzw.com/fortune/ajax/back/" + myDates("YMD") + "/" + _get('aid') + "/" + 0 + ".html",  
        dataType:'jsonp',  
        data:'',  
        jsonp:'callback',  
        jsonpCallback:'call_fortune',
        success:function(data) {  
           console.log(data);
            $('.fortune em em').width(data.s);
            $('.fortune p a').html(data.v)
        },  
        timeout:3000  
    });  
       //获取url参数
      function _get(name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
         var r = window.location.search.substr(1).match(reg);
         if (r!=null) return unescape(r[2]); return null;
     }
     
     //获取时间
     function myDates(patt){
        var d=new Date(),
        Minute=d.getMinutes(),
        Hour=d.getHours(),
        vh=0,vi=7;
        if(Hour<(vh)||(Minute<vi&&Hour==vh))d.setDate(d.getDate()-1);
        var year=d.getFullYear().toString(),
        month=d.getMonth()+1,
        day=d.getDate().toString(),
        tmp=patt;tmp=tmp.replace("Y",year);
        tmp=tmp.replace("y",(year.substr(2)));
        tmp=tmp.replace("M",(month<10?"0"+month:month));
        tmp=tmp.replace("m",month);
        tmp=tmp.replace("D",(day<10?"0"+day:day));
        tmp=tmp.replace("d",day);return tmp
    }

   }
   return customElem;
})