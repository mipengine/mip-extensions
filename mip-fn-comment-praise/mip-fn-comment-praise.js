/**
 * Created by wangyan on 2017/6/22.
 */
define(function(require) {
    var zepto = require('zepto');
    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        //element._index = index ++;
        var oSpan = document.createElement('span');
        var num = element.getAttribute('praisenum');
        var id = element.getAttribute('praiseid');
        var kindid = element.getAttribute('praiseKindid');
        var url = element.getAttribute('url');

        if(num == 0){
            num = '';
        }
        oSpan.innerHTML = num || 0;

        element.append(oSpan);

        element.onclick = function () {
            var _this = this;
            //console.log(this.id);
            var className = $(this).hasClass('disable-tag');
            //console.log(className);
            if (className) {
                return false;
            }
            if (id > 0 && kindid > 0) { 
                $.ajax({
                    //url: '/ajax/article.php',
                    url:url,
                    type: 'post',
                    data: {action: 'zan', "id": id, "kindid": kindid},
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 1) {
                            var num = _this.getAttribute('praisenum');
                            $(_this).addClass("disable-tag");
                            if (num == '') {
                                var num = 1;
                            } else {
                                var numNew = parseInt(num) + 1;
                            }
                            $(_this).find('span').html(numNew);
                        }
                    },
                    error: function () {
                        alert("网络通讯异常，请稍后再试。");
                        return false;
                    }
                });
            } else {
                alert("参数错误。");
            }
        }
    };

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        //console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        //console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        //console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        //console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        //console.log(isInView);
    };
    // 控制viewportCallback、firstInviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };
    /* 生命周期 function list，根据组件情况选用 end */


    return customElem;
});