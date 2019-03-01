/**
 * Created by Administrator on 2018/5/28.
 */
define(function(require) {
    var customElem = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var input =  element.querySelectorAll('.mip-list-more')[0];
        var resultList = element.querySelectorAll('.result-list')[0];
        var src = element.getAttribute('data-src');
        var inputVal = input.value;
        input.onkeyup=function(e){
            if(e.keyCode == 13){
                window.location.href='/search-kecheng?kw='+inputVal
            }
            fetchJsonp(src, {
                jsonpCallback: inputVal
            }).then(function (res) {
                var searchData = JSON.parse(res);
                var html = '';
                for(var value of searchData){
                    html+=`
                        <li>
                            <a href="${value.url}">${value.kwd}</a>
                        </li>
                    `
                }
                resultList.innerHTML = html;
            }).catch(function (data) {
                console.log(data);
            });
        }
    };
    return customElem;
});