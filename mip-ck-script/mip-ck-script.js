define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    // 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
            var $switchBlock = $('#week_hot_switch');
            $switchBlock.on('click', '.switch_tabs a', function(event) {
                event.preventDefault();
                var $currEle = $(this);
                $currEle.addClass('curr').siblings().removeClass('curr');
                var idx = $switchBlock.find('.switch_tabs a').index(this);
                $switchBlock.find('.switch_content').hide().eq(idx).show();
            });
        },
        // 换一换
        changMore: function () {
            $('.useful').on('click', function (event) {
                event.preventDefault();
                var clicked = $(this).attr('clicked');
                if (clicked) {
                    return;
                }
                var countEle = $(this).find('.count');
                var currCount = Number(countEle.text());
                countEle.text(currCount + 1);
                $(this).attr('clicked', 'yes');
            });
        },
        // 变换颜色
        changeColor: function () {
            $('.c_ad_title p,.c_ad_title p a').css('color', $('.navigate').css('background-color'));
        },
        // 加载两性ad列表
        init: function () {
            this.switchBlock();
            this.changMore();
            this.changeColor();
        }
    };

    customElement.prototype.build = function () {
        effects.init();
    };

    return customElement;

});

