/**
 * @file mip-ticket 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    function stopEventBubble(event){
        var e=event || window.event;

        if (e && e.stopPropagation){
            e.stopPropagation();
        }
        else{
            e.cancelBubble=true;
        }
    }
    // 绑定事件
    function bindEven(element,totalpay_id,num_id,name_id) {
        var $element = $(element);
        $element.on('click', '.mip-ticket-list', function () {
            var min=$(this).attr('data-min');
            var max=$(this).attr('data-max');
            var name=$(this).attr('data-name');
            var price=$(this).attr('data-price');
            var $number=$(this).find('.mip-number');
            console.log(name_id)
            $('#'+name_id).val(name)
            $('#'+num_id).val(parseInt($number.text()))
            $('#'+totalpay_id).val(parseInt($number.text())*price)
            $element.find('.mip-ticket-list').eq($(this).index()).addClass('active').siblings().removeClass('active')
            $('.all').text('￥'+parseInt($number.text())*price)

        });
        $element.find('.mip-ticket-list').on('click', '.mip-add', function (){
            var $ticket=$(this).parents('.mip-ticket-list')
            var min=$ticket.attr('data-min');
            var max=$ticket.attr('data-max');
            var name=$ticket.attr('data-name');
            var price=$ticket.attr('data-price');
            var $number=$ticket.find('.mip-number');
            if(parseInt($number.text())<=100&&parseInt($number.text())<=max){
                $number.text(parseInt($number.text())+1)
                $('#'+num_id).val(parseInt($number.text()))
                $('#'+totalpay_id).val(parseInt($number.text())*price)            //总价
                $('.all').text('￥'+parseInt($number.text())*price)
            }
        })
        $element.find('.mip-ticket-list').on('click', '.mip-sub', function (){
            var $ticket=$(this).parents('.mip-ticket-list')
            var min=$ticket.attr('data-min');
            var max=$ticket.attr('data-max');
            var name=$ticket.attr('data-name');
            var price=$ticket.attr('data-price');
            var $number=$ticket.find('.mip-number');
            if(parseInt($number.text())>min){
                $number.text(parseInt($number.text())-1)
                $('#'+num_id).val(parseInt($number.text()))
                $('#'+totalpay_id).val(parseInt($number.text())*price)            //总价
                $('.all').text('￥'+parseInt($number.text())*price)
            }
        })
    }

    customElement.prototype.build = function () {
        // TODO
        var self = this;
        var element = this.element;
        this.totalpay_id= $(element).attr('totalpay-target');
        this.num_id= $(element).attr('number-target');
        this.name_id= $(element).attr('name-target');

        bindEven(element,this.totalpay_id,this.num_id,this.name_id)
    };

    return customElement;
});
