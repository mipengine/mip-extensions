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
        tongJi: function () {
            var webDatetime = $('#down-href').attr('dateTime');
            var webUsername = $('#down-href').attr('username');
            if (typeof webDatetime !== 'undefined') {
                var hmToken = '';
                if (webUsername !== '') {
                    switch (webUsername) {
                        case 'lff':
                            var curtime = webDatetime;
                            var date1 = new Date('2015/8/31');
                            var date2 = new Date(curtime);
                            if (date1.getTime() < date2.getTime()) {
                                hmToken = '58ca8f8a68d893aa08befe6eb5237a34';
                            }
                            break;
                        case 'hxb':
                            hmToken = '7c9a22609a0017275f143d3b1af47740';
                            break;
                        case '黄晟':
                            hmToken = '1d9e6afba99e74b0adff97c2dab13432';
                            break;
                        case 'gongmin':
                            hmToken = '0de7b5f7e443add55367defe1b3d292c';
                            break;
                        case 'zxy':
                            hmToken = '37b5bba0728480a528bdca94eeccfefb';
                            break;
                        case 'caixin':
                            hmToken = 'e0f150614f0f01e194bba3fcdc018f66';
                            break;
                        case 'liuli':
                            hmToken = '0b8ebd647647d05e3a1d87fef0749cc3';
                            break;
                        case 'shangling':
                            hmToken = '496b2d228ff2d02eb5ec67188b699472';
                            break;
                        case 'dingpeng':
                            hmToken = '90bc198735217c11f93f2785910078bd';
                            break;
                        case 'chenzhe':
                            hmToken = 'fb297fd464098d3aacd3a95a31b7a2a8';
                            break;
                        case 'lhyu':
                            hmToken = 'b3265f031522301b0d6d4edb47d7ce52';
                            break;
                        case 'cjh':
                            hmToken = '934bb6a05ccea7b642b9e35bb798c1c9';
                            break;
                        case 'caoch':
                            hmToken = 'a8ab61dc4bb98855125bcca18c1125a8';
                            break;
                        case 'guoqian':
                            hmToken = 'e20ff59a84ded600cecd51eac7776549';
                            break;
                        case 'yangting':
                            hmToken = 'c3ee7441928ffc7129fed0cb62651c1d';
                            break;
                        case 'chenyang':
                            hmToken = '24c19e56533b8eebf5e470064847cc4d';
                            break;
                        case 'xuhao1':
                            hmToken = 'd9021261fff7126cddea4357705873d6';
                            break;
                        case 'xieybo':
                            hmToken = '1bb0bad7cd9ba8719d73c12f4fe72b0a';
                            break;
                        case 'fuqiang':
                            hmToken = '37a045a107d4ac21ad88cad9757cf9f2';
                            break;
                        case 'chenxi':
                            hmToken = 'cf62deac2a5d699052f8ac70438799d9';
                            break;
                        case 'qiusj':
                            hmToken = 'd6d29ceb00fa030e957800e695645081';
                            break;
                        case 'liyanxia':
                            hmToken = '31c9d092c6c1f89069c4ddbddbb4e61c';
                            break;
                        case 'qianky':
                            hmToken = '56c698055d435e894112c05f962eb832';
                            break;
                        case 'heyut':
                            hmToken = '8a899cd3945b7ecd68c31964aaae5e23';
                            break;
                        case 'laidj':
                            hmToken = '7fd7efd67c1d7b49705b79f60e8611f4';
                            break;
                        case 'liziyi':
                            hmToken = '5bec470cb053e1006cd204355bdf43b5';
                            break;
                        case 'wwbin':
                            hmToken = 'b8a033aee454386cba4aeae1216207f3';
                            break;
                        case 'yangyang':
                            hmToken = 'a61079e76a7cb19a45bf25e45c7010a1';
                            break;
                        case 'txs':
                            hmToken = '027f0b1690460ddcb51c3e39eff0243e';
                            break;
                        case 'ylil':
                            hmToken = '6b450d33845b5439038e36f99b6fc18d';
                            break;
                        case 'yangts':
                            hmToken = 'f14e6d054b5915121975cefd7510b090';
                            break;
                        case 'liuzz':
                            hmToken = '8f248355ff210a2386539f459db03299';
                            break;
                        case 'wuchen':
                            hmToken = 'f07fbce4707da7b81bf9bb26b6625898';
                            break;
                        case 'twbin':
                            hmToken = '5fa1fc10e76253896ab6a3cd210f07e6';
                            break;
                        case 'zhsj':
                            hmToken = '9cf1da9c75892b364e84679c639fdda1';
                            break;
                        case 'yusx':
                            hmToken = '729dfd7586b5214b5291952eae829ae2';
                            break;
                        case 'chensc':
                            hmToken = '8a59f97f89eae9571fbbdf73817884b1';
                            break;
                        case 'zhangjia':
                            hmToken = '4c9e959e0cc9c237f200201b7b15225b';
                            break;
                        case 'xiaohj':
                            hmToken = '6fff36c3948951a56c7ec18985edbcbd';
                            break;
                        case 'zhouji':
                            hmToken = '43ab97d937a039600a71324f201367c9';
                            break;
                        case 'chenyi':
                            hmToken = '72175bcc660d8027f02d1693240a2b67';
                            break;
                        case 'shengxl':
                            hmToken = 'd758ab3875812648dbeed9f24cfccd68';
                            break;
                        case 'xiangjq':
                            hmToken = 'ab45ac2154ecb6d04f668776b011733e';
                            break;
                        case 'lhbin':
                            hmToken = '5f3634e250e76045193e2a7256dbe058';
                            break;
                    }
                    if (hmToken !== '') {
                        $('body').append('<mip-stats-baidu token="' + hmToken + '">');
                    }
                }
            }
        },
        init: function () {
            this.hideList('.hidelist', 'li', 1);// 优化隐藏
            this.tongJi();// 编辑统计
        }
    };
    customElem.prototype.build = function () {
        global.init();
    };
    return customElem;
});
