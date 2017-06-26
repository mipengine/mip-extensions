/**
 * @file mip-fn-commonHeader 组件
 * @author fn
 */
define(function (require) { 
    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element; 
        var bbusername = element.getAttribute('bbuserName'); 
        var page_name = element.getAttribute('pageName'); 
        var class_url = element.getAttribute('classUrl'); 
        var imgSrc = element.getAttribute('imgSrc'); 
         
        if (bbusername) {
            var headerStr =
                '<div class="header-user">' +
                    '<a href="' + class_url + '" class="goback">返回上一页</a>' +
                    '<span class="channel"></span>' +
                    '<span class="page-title">' + page_name + '</span>' +
                    '<div id="headerControl" class="control">' +
                        '<span class="avator">' +
                            '<mip-img layout="responsive" width="30" height="30" src="'+imgSrc+'">' +
                        '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="username-layer">' +
                    '<a href="http://my.fengniao.com/login.php?action=logout&url=' + window.location + '" class="login-out-button">退出</a>' +
                    '<span class="avator">' +
                    '<mip-img layout="responsive" width="30" height="30" src="'+imgSrc+'">' +
                    '</span>' +
                    '<span class="username">' + bbusername + '</span>' +
                    '<span class="close-username"></span>' +
                '</div>';

        } else {
            var headerStr =
                '<div class="header-user">' +
                '<a href="' + class_url + '" class="goback">返回上一页</a>' +
                '<span class="channel"></span>' +
                '<span class="page-title">' + page_name + '</span>' +
                '<div class="control">' +
                '<a href="/login.php?url=' + window.location + '" class="login-btn">登录</a>' +
                '</div>' +
                '</div>';
        }  
        element.innerHTML = headerStr;   

        var headerControl = element.querySelector('#headerControl');
 
        headerControl.addEventListener('click', function(){
            element.classList.toggle('show-user-layer')
        }, false); 
    };
    return customElem;

})