/**
 * @file mip-wygx-classtab 组件
 * @east_qiu@gmail.com
 * @for  woyaogexing.com  
 */

define(function (require) {
	var $ = require('zepto');

    var customElement = require('customElement').create();
    
    function Tabs (el) {
        this._parent = el; // 父节点
        this.bindToClassname = el.getAttribute('bind-to');
        this.bindElements = $(this.bindToClassname);
        this.Childrens = $(el).children(); // 父节点下的子节点
    }

    Tabs.prototype.addEvent = function(){
        var self = this;

        //储存样式切换记录
        var bdEle = [];

        //子节点遍历绑定事件
        this.Childrens.map(function(index, children){
            $(children).on('click', function(){

                var that = this;
                // 清空记录方便下次储存
                self.bindElements.removeClass(bdEle.join(',')); // 移除上次样式
                bdEle = []; 

                self.bindElements.addClass($(that).attr('toggle-class')); // 添加样式
                bdEle.push($(that).attr('toggle-class'));
            });
        });
    };

    customElement.prototype.build = function(){
        var ele = this.element;

        //实例化对象
        new Tabs(ele).addEvent();
    };
    

    return customElement;
});
