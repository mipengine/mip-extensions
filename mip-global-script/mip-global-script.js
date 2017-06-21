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
                        case 'heyut':
                            hmToken = '8a899cd3945b7ecd68c31964aaae5e23';
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
                        case 'wuchen':
                            hmToken = 'f07fbce4707da7b81bf9bb26b6625898';
                            break;
                        case 'yusx':
                            hmToken = '729dfd7586b5214b5291952eae829ae2';
                            break;
                        case 'chensc':
                            hmToken = '8a59f97f89eae9571fbbdf73817884b1';
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
                        case 'xiangjq':
                            hmToken = 'ab45ac2154ecb6d04f668776b011733e';
                            break;
                        case 'gongmin1':
                            hmToken = '2bd7f516dd17a31d63156a0a52a187a9';
                            break;
                        case 'liyao':
                            hmToken = 'fe6fc705ae7b974b9cde4b03cc4b6fbc';
                            break;
                        case 'tangzc':
                            hmToken = '993021e54cd6ec227763d52777dbcc7f';
                            break;
                        case 'pencheng':
                            hmToken = '6901c04df1397a8177ca8944e59e2740';
                            break;
                        case 'oyangl':
                            hmToken = '00c1a711fcc23fcf19dc9fcd985498ae';
                            break;
                        case 'zhouyi':
                            hmToken = '8568dfea94c1d89e4d2ad66cdb973352';
                            break;
                        case 'huangzheng':
                            hmToken = '6a37b5321385228343e0603ffb5ad640';
                            break;
                        case 'wucyang':
                            hmToken = 'eba389846988eb9e6a2d0c4fb0fc477e';
                            break;
                        case 'wangchao':
                            hmToken = 'f1ff8cd3f72dde3f4f2dbd1fff2cb81b';
                            break;
                    }
                    if (hmToken !== '') {
                        $('body').append('<mip-stats-baidu token="' + hmToken + '">');
                    }
                }
            }

        },
        init: function () {
            this.hideList('.hidelist', 'li', 1); // 优化隐藏
            this.tongJi(); // 编辑统计
        }
    };
    customElem.prototype.build = function () {
        global.init();
    };
    return customElem;
});
