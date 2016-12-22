/**
 * @file mip-sina-carousel 组件
 * @author fengzihao
 */

define(function (require) {

    var customElement = require('customElement').create();
    var Swiper = require('./x-swiper');

    customElement.prototype.build = function () {
        var element = this.element;
        var list = JSON.parse(element.children[0].innerHTML);
        /** 结构
         <section class="pic_slide">
            <aside class="pic_slide_list">
                <div class="top_slide_wrap">
                    <div class="item">
                        <a href="href" title="title">
                            <img src="src" alt="title">
                            <span class="pic_slide_info">
                                <i class="pic_slide_t">title</i>
                            </span>
                        </a>
                    </div>
                    <div class="item">...</div>
                    <div class="item">...</div>
                </div>
            </aside>
            <aside class="pic_slide_num">
                <span class="curNum">1</span>/<em class="j_slide_sum">10</em>
            </aside>
         </section>
        */
        // 待优化
        var picSlide = document.createElement('section');
        picSlide.classList.add('pic_slide');
        var picSlideList = document.createElement('aside');
        picSlideList.classList.add('pic_slide_list');
        var topSlideWrap = document.createElement('div');
        topSlideWrap.classList.add('top_slide_wrap');
        var picSlideNum = document.createElement('aside');
        picSlideNum.classList.add('pic_slide_num');
        picSlideNum.innerHTML = '<span class="curNum">1</span>/<em class="j_slide_sum">10</em>';

        var listLength = list.length;
        var i;
        for (i = 0; i < listLength; i++) {
            var item = document.createElement('div');
            item.classList.add('item');
            var a = document.createElement('a');
            var img =  document.createElement('img');
            var picSlideInfo = document.createElement('span');
            var picSlideText = document.createElement('i');
            picSlideText.innerHTML = list[i].title;
            picSlideInfo.appendChild(picSlideText);
            picSlideInfo.classList.add('pic_slide_info');
            img.setAttribute('src', list[i].src);
            img.setAttribute('alt', list[i].title);
            a.setAttribute('href', list[i].href);
            a.setAttribute('title', list[i].title);
            a.appendChild(img);
            a.appendChild(picSlideInfo);
            item.appendChild(a);
            topSlideWrap.appendChild(item);
        }
        picSlideList.appendChild(topSlideWrap);
        picSlide.appendChild(picSlideList);
        picSlide.appendChild(picSlideNum);
        element.appendChild(picSlide);

        new Swiper('.pic_slide_list', {
            autoplay: 1000,
            wrapperClass: 'top_slide_wrap',
            slideClass: 'item',
            autoplayDisableOnInteraction: false,
            loop: true,
            onInit: function (swiper) {
                document.querySelector('.j_slide_sum').innerHTML = listLength;
                document.querySelector('.curNum').innerHTML = parseInt(swiper.realIndex, 10) + 1;
            },
            onSlideChangeStart: function (swiper) {
                document.querySelector('.curNum').innerHTML = parseInt(swiper.realIndex, 10) + 1;
            }
        });
    };

    return customElement;
});
