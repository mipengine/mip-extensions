/**
 * @file 页面逻辑公共脚本
 * @description 实时新增优化
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var global = {
        hideList: function (obj, option, nub) {
            $(obj).each(function () {
                if ($(this).find(option).length < nub) {
                    $(this).remove();
                }

            });
        },
        tongJi: function (element) {
            var webDatetime = $('.down-href').attr('dateTime');
            var webUsername = $('.down-href').attr('username');
            if (typeof webDatetime !== 'undefined') {
                var hmToken = '';
                if (webUsername !== '') {
                    switch (webUsername) {
                        case 'pw':
                            hmToken = '4eb538db483dbcb8ac7805e88c0e68d2';
                            break;
                        case 'fanyx':
                            hmToken = '7a38a3cd8273420bff96defee91ffd52';
                            break;
                        case 'wangc':
                            hmToken = '6a4fb943703f72f5a107bae74297c0d8';
                            break;
                        case 'liut':
                            hmToken = 'f8caf941f69dfc45994a289bea52c391';
                            break;
                        case 'lishan':
                            hmToken = 'e0e619af38f59771499e9af8af354abe';
                            break;
                        case 'fut':
                            hmToken = 'a1d2b8898d627d479edc7598830c43e7';
                            break;
                        case 'yangmy':
                            hmToken = 'ad6ed66a4ae1b5a773c928cf6839fdb7';
                            break;
                        case 'zl':
                            hmToken = 'bea0af369e866a005d7d8976e05428f8';
                            break;
                        case 'sqh':
                            hmToken = 'ca254020a12728b4783fa86aac377088';
                            break;
                        case 'zhuk':
                            hmToken = 'c9d39ecb6ecb1cb4ce0d4ff2afd6d269';
                            break;
                        case 'xiaolx':
                            hmToken = '146ce1d702b563cb3d31d04286fd90ec';
                            break;
                        case 'sunwj':
                            hmToken = '50640e063c2dc9b759d39586346584c9';
                            break;
                        case 'lgk':
                            hmToken = '8825275a4f99989fbb285093c23c0eca';
                            break;
                        case 'liutao':
                            hmToken = 'b1f0584d2a768bcdc085c03f144691ec';
                            break;
                        case 'liuy':
                            hmToken = '7aed2a841f972814d68a7f679deeca59';
                            break;
                        case 'wangq':
                            hmToken = '259b0294b80d0206726d4d5396d87e63';
                            break;
                        case 'xuz':
                            hmToken = 'cab296cd83c9cc2c3168d3137f190b46';
                            break;
                        case 'shenyf':
                            hmToken = '18425a2424b310dd0aa0ef2d9b5611f4';
                            break;
                        case 'jians':
                            hmToken = '6db5e268937dd16915d9c8988fe3fca0';
                            break;
                        case 'lim':
                            hmToken = '0a2270b92aa610d66c5a50a16fc9d46f';
                            break;
                        case 'yangz':
                            hmToken = 'ef4d4313433fc1da73934066af26ad73';
                            break;
                        case 'yangn':
                            hmToken = 'a8a90472fbe0c01b6f45bc2eeac1ba71';
                            break;
                        case 'lins':
                            hmToken = 'e4be2c0dcebcf381fc1cf0064f7e2ec4';
                            break;
                        case 'wangj':
                            hmToken = '552cde6fac57857ea31b57079fc2bf4a';
                            break;
                        case 'gx':
                            hmToken = '9c262ade13c6a440110121bd8aee7de7';
                            break;
                    }
                    if (hmToken !== '') {
                        $('body').append('<mip-stats-baidu token="' + hmToken + '">');
                    }
                }
            }

        },
        init: function (element) {
            this.hideList('.hidelist', 'li', 1); // 优化隐藏
            this.tongJi(element); // 编辑统计
        }
    };
    customElem.prototype.createdCallback = function () {
        var element = this.element;
        global.init(element);
    };
    return customElem;
});
