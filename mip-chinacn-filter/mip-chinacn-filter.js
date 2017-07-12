/**
 * @file mip-chinacn-filter 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var $element = $(this.element);
        var maskClass = $element.attr('mask-control');
        var $mask = $('.opacity-layer');
        $element.find('.screen-conditions').on('click','li',function(){
            var $this = $(this);
            $this.siblings().find('div.current').removeClass('current');
            $this.find('.screen-box').addClass('current');
            $mask.addClass(maskClass);
        });

        $element.find('.screen-box').on('click','dd',function(){
            var $this = $(this);
            var $siteItem = $this.find('.mip-site-item');
            if($siteItem.hasClass('current')){
                $siteItem.removeClass('current');
                return;
            }
            var isSingle = !!$this.parent().attr('single');
            if(isSingle){
                $this.siblings().find('span.current').removeClass('current');
            }
            $siteItem.addClass('current');
        });

        $element.find('.mip-clear').on('click',function(){
            var $selected = $(this).parents('.screen-box').find('dd').find('.current');
            $selected.length > 0 && $selected.removeClass('current');
        });

        // $mask.on('click',hide);

        $(document).on('click','.opacity-layer',hide);

        $element.find('.mip-sure').on('click',function(e){
            e.stopPropagation();
            search(this);
            hide()
        })

        function search(me) {
            var $this = $(me);
            var data = {};

            /* 1.获取隐藏域中的关键词 */
            var oKey = $('#site_key').val();

            /* 获取输入框中的关键词 */
            var key = $('#site_search').val();
            var area = $('#site_area').val();
            var entType = $('#site_entType').val();
            var category = $('#site_category').val();

            /* 输入搜索 */
            if ($this.hasClass('search')) {
                data.key = key;
                data.entType = 4;
            } else {
                /* 条件筛选搜索 */

                /* 获取筛选条件 */
                var $conditions = $element.find('.screen-box').find('span.current');
                $conditions.each(function () {
                    var $this = $(this);
                    /* 获取筛选项类型 */
                    var type = $this.attr('d-g');
                    /* 获取筛选项id */
                    var id = $this.attr('d-d');
                    if(data[type]){
                        data[type] = data[type] + ',' + id;
                    }else{
                        data[type] = id;
                    }
                });

                data.key = oKey;

                if (area !== '' && !data.area) {
                    data.area = area;
                }

                if (category !== '' && !data.category) {
                    data.category = category;
                }

                data.entType = entType;
                
                data.forceMobile = true;

                var $sortBy = $('#sort_by');
                if($sortBy.length > 0){
                    data.sortBy = $sortBy.val();
                }
            }

            console.log(data);

            $.post('//' + document.domain + '/common/search.php', data, function (json) {
                if (json.url) {
                    window.location.href = json.url;
                } else {
                    alert("当前访问用户较多，请稍后重试。");
                }
            })
        }

        function hide(){
            $mask.removeClass(maskClass);
            $element.find('.screen-box').removeClass('current');
        }
    };

    return customElement;
});
