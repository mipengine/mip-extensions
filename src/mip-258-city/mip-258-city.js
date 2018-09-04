/**
 * @file mip-258-city 选择城市组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var provinceList = require('./mip-258-citydata');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = $(this.element);
        var provinceTag = element.find("#province");
        var cityTag = element.find("#city");
        var areaTag = element.find("#area");
        //保存省
        var provinceArray = new Array();
        //保存市
        var cityArray = new Array();
        var cityList;
         
        for(var i=0; i<provinceList.length; i++){
            var province = provinceList[i];
            var provinceName = province.name;
            provinceArray[i]=provinceName;
            provinceTag.append(new Option(provinceName,i));
        };
       //选择省
        provinceTag.change(function() {
            var th = this;
            var index = th.selectedIndex - 1;
            var provinceName = provinceArray[index];
            for (var n = 0; n < provinceList.length; n++) {
                var provice = provinceList[n];
                if (provice.name == provinceName) {
                    cityList = provice.cityList;
                    cityTag.html('');
                    areaTag.html('');
                    for (var c = 0; c < cityList.length; c++) {
                        var city = cityList[c];
                        var cityName = city.name;
                        cityArray[c] = cityName;
                        cityTag.append(new Option(cityName, c));
                    }
                }
            }
            var cityName = cityArray[0];
            var city1 = cityList[0];
            var areaList = city1.areaList;
            areaTag.html('');
            for (var a = 0; a < areaList.length; a++) {
                var area = areaList[a];
                areaTag.append(new Option(area, a));
            }
        })
        //选择市
        cityTag.change(function(tag) {
            var index2 = tag.selectedIndex;
            var cityName = cityArray[index2];
            for (var m = 0; m < cityList.length; m++) {
                var city1 = cityList[m];
                if (city1.name == cityName) {
                    var areaList = city1.areaList;
                    areaTag.html('');
                    for (var a = 0; a < areaList.length; a++) {
                        var area = areaList[a];
                        areaTag.add(new Option(area, a));
                    }
                }
            }
        })

     };
     return customElement;
 });
