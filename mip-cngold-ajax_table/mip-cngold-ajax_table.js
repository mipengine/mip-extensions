/**
 * @file mip-cngold-ajax_table 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require ("jquery");
    var resData ={};
    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        that = this;
        //获取组件的dom对象
        var  element = this.element;


        fetch(this._makeUrl).then(function (res) {
            return res.json();
        }).then(function (data) {
            that._setData(data,element);
        })
    };

    /**
     *  parma element {object}当前元素的环境
     *
     * */
    customElement.prototype._makeUrl = function (element){
        var firstUrl = element.getAttribute('url');
        var codes = element.getAttribute('codes');
        var pramas = element.getAttribute('pramas');
        var sendUrl;
        if(!firstUrl){
            return
        }

        if(pramas){
            sendUrl = firstUrl+"?codes="+codes+pramas
        }else {
            sendUrl = firstUrl+"?codes="+codes
        }
    }
    /**
     *  parma {object} 查找后返回的数据
     *  parma {object} 元素的element对象
     * */
    customElement.prototype._setData = function (resData,element){
        var  idArr=[];
        var  tdArr = element.getElementsByTagName("td");
        //获取所有dom元素的id, Push进去数组
        for (var i= 0;i<tdArr.length;i++){
                if(tdArr[i]["id"] ==""){
                    continue;
                }else {
                    // idArr.push(tdArr[i].id);
                    var value = resData[tdArr[i].id.split("q")[0]]? resData[tdArr[i].id.split("q")[0]]["q"+tdArr[i].id.split("q")[1]]:''
                    $("#"+tdArr[i].id).html(value);
                }
            }

        // //处理所有的id,和数据更新dom;
        // for(var j=0;j<resData.length;j++){
        //
        // }

    }


    return customElement;
});

