/**
 * 首页广告JS
 * 名称约定：
 *     li: 信息流每页第1个广告（包括下拉加载的新闻中的广告）
 *     li2： 信息流每页第2个广告
 *     li3： 信息流每页第3个广告
 *     li4： 信息流每页第4个广告
 * @deps global.js (此js依赖global.js)
 * @author  lizhigao(lizhigao@021.com)
 * @date 2016-06-03
 */
/* global GLOBAL:true */
/* global Cookies:true */
define(function(reqiure){
    var Cookies=reqiure("./js.cookie");
    var GLOBAL=reqiure("./global1");
GLOBAL.namespace('Et');
// 广告联盟商（百度、搜狗、广点通）
GLOBAL.Et.channelArr = ['baidu', 'sogou', 'gdt'];
// 渠道-广告数据
GLOBAL.Et.ggData = {
    "root": {
        "junbo": {
            "baidu": {
                li: "u2714979",
                li2: "u2714984",
                li3: "u2714985",
                li4: "u2731199"
            }
        },
        "kuhuasuoping01": {
            "baidu": {
                li: "rg3a1ecf92ffcff439db14798aafed22e01be7dc172fe630fb51322bda",
                li2: "sh3a1ecf92ffcff43adb14798aafed22e01be7dc172fe630fb51322bda",
                li3: "ti3a1ecf92ffcff43bdb14798aafed22e01be7dc172fe630fb51322bda",
                li4: "uj3a1ecf92ffcff43cdb14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "zhangliu": {
            "baidu": {
                li: "u2713803",
                li2: "u2713811",
                li3: "u2713814",
                li4: "u2731212"
            }
        },
        "1928cm": {
            "baidu": {
                li: "u2710912",
                li2: "u2713641",
                li3: "u2714797",
                li4: "u2731214"
            }
        },
        "1234": {
            "baidu": {
                li: "u2710859",
                li2: "u2713639",
                li3: "u2714796",
                li4: "u2731219"
            }
        },
        "5Gyingyong": {
            "baidu": {
                li: "u2710164",
                li2: "u2713636",
                li3: "u2714794",
                li4: "u2731224"
            }
        },
        "6399": {
            "baidu": {
                li: "u2709122",
                li2: "u2713635",
                li3: "u2714792",
                li4: "u2731227"
            }
        },
        "miaozhuan": {
            "baidu": {
                li: "u2709056",
                li2: "u2713634",
                li3: "u2714788",
                li4: "u2731229"
            }
        },
        "baobeituan": {
            "baidu": {
                li: "u2708885",
                li2: "u2713633",
                li3: "u2714787",
                li4: "u2731231"
            }
        },
        "aspgnews": {
            "baidu": {
                li: "u2708863",
                li2: "u2713630",
                li3: "u2714786",
                li4: "u2731233"
            }
        },
        "zjxw": {
            "baidu": {
                li: "fw3a1ecf92f0c8fe3fdb14798aafed22e01be7dc172fe630fb51322bda",
                li2: "gx3a1ecf92f0c8fe30db14798aafed22e01be7dc172fe630fb51322bda",
                li3: "nf3a1ecf92f0c9f73ddb14798aafed22e01be7dc172fe630fb51322bda",
                li4: "me3a1ecf92f0c9f73cdb14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "doudouqw": {
            "baidu": {
                li: "u2708713",
                li2: "u2713628",
                li3: "u2714781",
                li4: "u2731237"
            }
        },
        "shandiansp": {
            "baidu": {
                li: "u2708618",
                li2: "u2713627",
                li3: "u2714779",
                li4: "u2731239"
            }
        },
        "pgzsdx": {
            "baidu": {
                li: "u2708173",
                li2: "u2713624",
                li3: "u2714776",
                li4: "u2731262"
            }
        },
        "anquanzm": {
            "baidu": {
                li: "u2708046",
                li2: "u2713622",
                li3: "u2714774",
                li4: "u2731264"
            }
        },
        "sosowifi": {
            "baidu": {
                li: "u2591765",
                li2: "u2713619",
                li3: "u2714769",
                li4: "u2731314"
            }
        },
        "ludashi": {
            "baidu": {
                li: "u2705137",
                li2: "u2713617",
                li3: "u2714768",
                li4: "u2731317"
            }
        },
        "yueduxing": {
            "baidu": {
                li: "u2705032",
                li2: "u2713616",
                li3: "u2714767",
                li4: "u2731320"
            }
        },
        "zhuanqianbao": {
            "baidu": {
                li: "u2628207",
                li2: "u2713614",
                li3: "u2714764",
                li4: "u2731700"
            }
        },
        "m021_yumi": {
            "baidu": {
                li: "u2702698",
                li2: "u2713613",
                li3: "u2714763",
                li4: "u2731701"
            }
        },
        "rilih5": {
            "baidu": {
                li: "u2703874",
                li2: "u2713612",
                li3: "u2714761",
                li4: "u2731322"
            }
        },
        "haitunllq": {
            "baidu": {
                li: "u2700139",
                li2: "u2713609",
                li3: "u2714759",
                li4: "u2731330"
            }
        },
        "pxt": {
            "baidu": {
                li: "u2701826",
                li2: "u2713606",
                li3: "u2714756",
                li4: "u2731325"
            }
        },
        "gsbrowser_wifi": {
            "baidu": {
                li: "u2701268",
                li2: "u2713605",
                li3: "u2714755",
                li4: "u2731326"
            }
        },
        "weimipush": {
            "sogou": {
                li: "745017",
                li2: "745017",
                li3: "745017"
            },
            "baidu": {
                li4: "u2733564"
            }
        },
        "haitun": {
            "baidu": {
                li: "u2697286",
                li2: "u2713602",
                li3: "u2714753",
                li4: "u2731332"
            }
        },
        "liuliangzt": {
            "baidu": {
                li: "u2696954",
                li2: "u2713601",
                li3: "u2714751",
                li4: "u2731336"
            }
        },
        "waliwifi": {
            "baidu": {
                li: "u2695916",
                li2: "u2713598",
                li3: "u2714747",
                li4: "u2731344"
            }
        },
        "xunfei": {
            "baidu": {
                li: "u2695582",
                li2: "u2713596",
                li3: "u2714746",
                li4: "u2731346"
            }
        },
        "chaoliu": {
            "baidu": {
                li: "u2695019",
                li2: "u2713594",
                li3: "u2714745",
                li4: "u2731096"
            }
        },
        "lvsellq": {
            "baidu": {
                li: "u2694954",
                li2: "u2713591",
                li3: "u2714743",
                li4: "u2731353"
            }
        },
        "58dh": {
            "baidu": {
                li: "u2694946",
                li2: "u2713590",
                li3: "u2714742",
                li4: "u2731355"
            }
        },
        "lianxiangllq": {
            "baidu": {
                li: "u2694756",
                li2: "u2713589",
                li3: "u2714741",
                li4: "u2731357"
            }
        },
        "anzhuobizhi": {
            "baidu": {
                li: "u2694412",
                li2: "u2713587",
                li3: "u2714738",
                li4: "u2731364"
            }
        },
        "xiaomigg01": {
            "baidu": {
                li: "u2693952",
                li2: "u2713585",
                li3: "u2714734",
                li4: "u2731367"
            }
        },
        "dahuatoutiao": {
            "baidu": {
                li: "u2693944",
                li2: "u2713584",
                li3: "u2714732",
                li4: "u2731371"
            }
        },
        "huafubao": {
            "baidu": {
                li: "u2689540",
                li2: "u2713580",
                li3: "u2714727",
                li4: "u2731402"
            }
        },
        "sgdhsh": {
            "baidu": {
                li: "u2689522",
                li2: "u2713577",
                li3: "u2714726",
                li4: "u2731405"
            }
        },
        "sgdhjs": {
            "baidu": {
                li: "u2689515",
                li2: "u2713576",
                li3: "u2714724",
                li4: "u2731417"
            }
        },
        "sgdhtt": {
            "baidu": {
                li: "u2689499",
                li2: "u2713573",
                li3: "u2714723",
                li4: "u2731421"
            }
        },
        "zhicheng": {
            "baidu": {
                li: "u2689380",
                li2: "u2713571",
                li3: "u2714722",
                li4: "u2731423"
            }
        },
        "hangu01": {
            "baidu": {
                li: "u2687386",
                li2: "u2713565",
                li3: "u2714717",
                li4: "u2731435"
            }
        },
        "shengming": {
            "baidu": {
                li: "u2687302",
                li2: "u2713563",
                li3: "u2714714",
                li4: "u2731441"
            }
        },
        "sogourecih5": {
            "baidu": {
                li: "u2686880",
                li2: "u2713557",
                li3: "u2714712",
                li4: "u2731455"
            }
        },
        "gsbrowser_install": {
            "baidu": {
                li: "u2685565",
                li2: "u2713556",
                li3: "u2714711",
                li4: "u2731460"
            }
        },
        "gsbrowser_wali": {
            "baidu": {
                li: "u2685611",
                li2: "u2713554",
                li3: "u2714710",
                li4: "u2731464"
            }
        },
        "myworld": {
            "baidu": {
                li: "u2685622",
                li2: "u2713552",
                li3: "u2714708",
                li4: "u2731469"
            }
        },
        "gsbrowser_myworld": {
            "baidu": {
                li: "u2685643",
                li2: "u2713551",
                li3: "u2714706",
                li4: "u2731472"
            }
        },
        "mobileqq_QQ": {
            "baidu": {
                li: "u2685656",
                li2: "u2713550",
                li3: "u2714705",
                li4: "u2731474"
            }
        },
        "pc6_zhongguoxiangqi": {
            "baidu": {
                li: "u2685673",
                li2: "u2713548",
                li3: "u2714702",
                li4: "u2731479"
            }
        },
        "pc6_wanglingshashou": {
            "baidu": {
                li: "u2685693",
                li2: "u2713546",
                li3: "u2714701",
                li4: "u2731483"
            }
        },
        "pc6_shaobingxiugaiqi": {
            "baidu": {
                li: "u2685711",
                li2: "u2713543",
                li3: "u2714700",
                li4: "u2731487"
            }
        },
        "pc6_myworld": {
            "baidu": {
                li: "u2685730",
                li2: "u2713541",
                li3: "u2714696",
                li4: "u2731493"
            }
        },
        "pc6_huoyingzhanji": {
            "baidu": {
                li: "u2685752",
                li2: "u2713540",
                li3: "u2714695",
                li4: "u2731495"
            }
        },
        "pc6_findsomething": {
            "baidu": {
                li: "u2685761",
                li2: "u2713538",
                li3: "u2714694",
                li4: "u2731496"
            }
        },
        "pc6_duowanmyworldhezi": {
            "baidu": {
                li: "u2685775",
                li2: "u2713536",
                li3: "u2714693",
                li4: "u2731500"
            }
        },
        "gsbrowser_liqu": {
            "baidu": {
                li: "u2685817",
                li2: "u2713534",
                li3: "u2714692",
                li4: "u2731508"
            }
        },
        "gsbrowser_mumayi": {
            "baidu": {
                li: "u2685792",
                li2: "u2713533",
                li3: "u2714689",
                li4: "u2731510"
            }
        },
        "gsbrowser_tpin": {
            "baidu": {
                li: "u2685804",
                li2: "u2713530",
                li3: "u2714688",
                li4: "u2731511"
            }
        },
        "gsbrowser_flyme": {
            "baidu": {
                li: "u2685803",
                li2: "u2713529",
                li3: "u2714687",
                li4: "u2731512"
            }
        },
        "gsbrowser_lenovo": {
            "baidu": {
                li: "u2685750",
                li2: "u2713528",
                li3: "u2714686",
                li4: "u2731516"
            }
        },
        "gsbrowser_gfan": {
            "baidu": {
                li: "u2685732",
                li2: "u2713527",
                li3: "u2714685",
                li4: "u2731519"
            }
        },
        "gsbrowser_sogou": {
            "baidu": {
                li: "u2685728",
                li2: "u2713526",
                li3: "u2714684",
                li4: "u2731521"
            }
        },
        "gsbrowser_vivo": {
            "baidu": {
                li: "u2685713",
                li2: "u2713525",
                li3: "u2714682",
                li4: "u2731522"
            }
        },
        "gsbrowser_wandoujia": {
            "baidu": {
                li: "u2685709",
                li2: "u2713524",
                li3: "u2714681",
                li4: "u2731526"
            }
        },
        "gsbrowser_appChina": {
            "baidu": {
                li: "u2685686",
                li2: "u2713523",
                li3: "u2714679",
                li4: "u2731528"
            }
        },
        "gsbrowser_baidu": {
            "baidu": {
                li: "u2685667",
                li2: "u2713522",
                li3: "u2714678",
                li4: "u2731650"
            }
        },
        "gsbrowser_nearme": {
            "baidu": {
                li: "u2685665",
                li2: "u2713521",
                li3: "u2714677",
                li4: "u2731651"
            }
        },
        "gsbrowser_QQ": {
            "baidu": {
                li: "u2685655",
                li2: "u2713520",
                li3: "u2714675",
                li4: "u2731653"
            }
        },
        "gsbrowser_noad": {
            "baidu": {
                li: "u2685689",
                li2: "u2713518",
                li3: "u2714674",
                li4: "u2731656"
            }
        },
        "gsbrowser_taobao": {
            "baidu": {
                li: "u2685637",
                li2: "u2713516",
                li3: "u2714673",
                li4: "u2731660"
            }
        },
        "gsbrowser_huawei": {
            "baidu": {
                li: "u2685626",
                li2: "u2713515",
                li3: "u2714672",
                li4: "u2731724"
            }
        },
        "gsbrowser_360": {
            "baidu": {
                li: "u2685606",
                li2: "u2713514",
                li3: "u2714671",
                li4: "u2731725"
            }
        },
        "gsbrowser_website": {
            "baidu": {
                li: "u2685598",
                li2: "u2713513",
                li3: "u2714670",
                li4: "u2731711"
            }
        },
        "m021_liantongbrowser": {
            "baidu": {
                li: "u2683569",
                li2: "u2713512",
                li3: "u2714668",
                li4: "u2731720"
            }
        },
        "m021_gsbrowser": {
            "baidu": {
                li: "u2683561",
                li2: "u2713511",
                li3: "u2714667",
                li4: "u2731727"
            }
        },
        "6789search": {
            "baidu": {
                li: "u2683712",
                li2: "u2713509",
                li3: "u2714666",
                li4: "u2731728"
            }
        },
        "gxt": {
            "baidu": {
                li: "u2683285",
                li2: "u2713503",
                li3: "u2714663",
                li4: "u2731734"
            }
        },
        "sqzhushou": {
            "baidu": {
                li: "u2682464",
                li2: "u2713501",
                li3: "u2714662",
                li4: "u2731737"
            }
        },
        "operabrower": {
            "baidu": {
                li: "u2682280",
                li2: "u2713500",
                li3: "u2714660",
                li4: "u2731739"
            }
        },
        "yiwanwuxian": {
            "baidu": {
                li: "u2681178",
                li2: "u2713497",
                li3: "u2714657",
                li4: "u2731749"
            }
        },
        "dopah5": {
            "baidu": {
                li: "u2679924",
                li2: "u2713495",
                li3: "u2714654",
                li4: "u2731754"
            }
        },
        "qiaohuiwangluo01": {
            "baidu": {
                li: "u2678182",
                li2: "u2713491",
                li3: "u2714652",
                li4: "u2731764"
            }
        },
        "xiaobowifi": {
            "baidu": {
                li: "u2675861",
                li2: "u2713489",
                li3: "u2714650",
                li4: "u2731769"
            }
        },
        "aishang": {
            "baidu": {
                li: "u2675535",
                li2: "u2713483",
                li3: "u2714647",
                li4: "u2731774"
            }
        },
        "wutongwifi": {
            "baidu": {
                li: "u2675982",
                li2: "u2713482",
                li3: "u2714644",
                li4: "u2731777"
            }
        },
        "360so": {
            "baidu": {
                li: "u2624228",
                li2: "u2713480",
                li3: "u2714643",
                li4: "u2731782"
            }
        },
        "shujuan02": {
            "baidu": {
                li: "u2674421",
                li2: "u2713479",
                li3: "u2714642",
                li4: "u2731785"
            }
        },
        "shujuan03": {
            "baidu": {
                li: "u2674430",
                li2: "u2713478",
                li3: "u2714641",
                li4: "u2731786"
            }
        },
        "xianguo": {
            "baidu": {
                li: "u2674289",
                li2: "u2713468",
                li3: "u2714635",
                li4: "u2731799"
            }
        },
        "zhongyangtianqi": {
            "baidu": {
                li: "u2674305",
                li2: "u2713466",
                li3: "u2714634",
                li4: "u2731801"
            }
        },
        "m021_wy050": {
            "baidu": {
                li: "u2536591",
                li2: "u2713464",
                li3: "u2714632",
                li4: "u2731804"
            }
        },
        "678sjdh": {
            "baidu": {
                li: "u2672654",
                li2: "u2713463",
                li3: "u2714631",
                li4: "u2731806"
            }
        },
        "youxinapp": {
            "baidu": {
                li: "u2671418",
                li2: "u2713457",
                li3: "u2714626",
                li4: "u2731817"
            }
        },
        "tianyizone": {
            "baidu": {
                li: "u2669318",
                li2: "u2713450",
                li3: "u2714622",
                li4: "u2731826"
            }
        },
        "chubao": {
            "baidu": {
                li: "u2666374",
                li2: "u2713449",
                li3: "u2714621",
                li4: "u2731830"
            }
        },
        "xiaomi": {
            "baidu": {
                li: "u2666305",
                li2: "u2713448",
                li3: "u2714620",
                li4: "u2731383"
            }
        },
        "juheshuju": {
            "baidu": {
                li: "u2659969",
                li2: "u2713443",
                li3: "u2714616",
                li4: "u2731851"
            }
        },
        "lianxianglvcha": {
            "baidu": {
                li: "u2659957",
                li2: "u2713442",
                li3: "u2714614",
                li4: "u2731852"
            }
        },
        "gsbrowser": {
            "baidu": {
                li: "u2659921",
                li2: "u2713440",
                li3: "u2714613",
                li4: "u2731854"
            }
        },
        "m021_gsbrowser_install": {
            "baidu": {
                li: "u2659936",
                li2: "u2713439",
                li3: "u2714612",
                li4: "u2731460"
            }
        },
        "wdcx01": {
            "baidu": {
                li: "u2658903",
                li2: "u2713435",
                li3: "u2714611",
                li4: "u2731855"
            }
        },
        "wdcx": {
            "baidu": {
                li: "u2656512",
                li2: "u2713434",
                li3: "u2714609",
                li4: "u2731857"
            }
        },
        "haixunyidong": {
            "baidu": {
                li: "u2654118",
                li2: "u2713432",
                li3: "u2714608",
                li4: "u2731860"
            }
        },
        "m021_myworld": {
            "baidu": {
                li: "u2652106",
                li2: "u2713430",
                li3: "u2714606",
                li4: "u2731866"
            }
        },
        "ucllqsun04": {
            "baidu": {
                li: "hd3a1ecf93f0cbf23bdb14798aafed22e01be7dc172fe630fb51322bda",
                li2: "jf3a1ecf93f0cbf23ddb14798aafed22e01be7dc172fe630fb51322bda",
                li3: "kg3a1ecf93f0cbf23edb14798aafed22e01be7dc172fe630fb51322bda",
                li4: "nj3a1ecf93f0cbf231db14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "ucllqsun03": {
            "baidu": {
                li: "mh3a1ecf93f0cbf43adb14798aafed22e01be7dc172fe630fb51322bda",
                li2: "ni3a1ecf93f0cbf43bdb14798aafed22e01be7dc172fe630fb51322bda",
                li3: "ql3a1ecf93f0cbf43edb14798aafed22e01be7dc172fe630fb51322bda",
                li4: "sn3a1ecf93f0cbf430db14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "ucllqsun02": {
            "baidu": {
                li: "pi3a1ecf93f0caff3bdb14798aafed22e01be7dc172fe630fb51322bda",
                li2: "rk3a1ecf93f0caff3ddb14798aafed22e01be7dc172fe630fb51322bda",
                li3: "sl3a1ecf93f0caff3edb14798aafed22e01be7dc172fe630fb51322bda",
                li4: "un3a1ecf93f0caff30db14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "ucllqsun01": {
            "baidu": {
                li: "kd3a1ecf93f0caf030db14798aafed22e01be7dc172fe630fb51322bda",
                li2: "le3a1ecf93f0caf031db14798aafed22e01be7dc172fe630fb51322bda",
                li3: "ng3a1ecf93f0caff39db14798aafed22e01be7dc172fe630fb51322bda",
                li4: "oh3a1ecf93f0caff3adb14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "shujuan": {
            "baidu": {
                li: "u2648402",
                li2: "u2713416",
                li3: "u2714593",
                li4: "u2731894"
            }
        },
        "tiantianrj": {
            "baidu": {
                li: "u2648334",
                li2: "u2713413",
                li3: "u2714591",
                li4: "u2731899"
            }
        },
        "ljbrowser": {
            "baidu": {
                li: "u2648226",
                li2: "u2713412",
                li3: "u2714590",
                li4: "u2731902"
            }
        },
        "jinlisun": {
            "baidu": {
                li: "u2641147",
                li2: "u2713410",
                li3: "u2714589",
                li4: "u2731905"
            }
        },
        "ucllqsun": {
            "baidu": {
                li: "fx3a1ecf93f0caf03bdb14798aafed22e01be7dc172fe630fb51322bda",
                li2: "gy3a1ecf93f0caf03cdb14798aafed22e01be7dc172fe630fb51322bda",
                li3: "ha3a1ecf93f0caf03ddb14798aafed22e01be7dc172fe630fb51322bda",
                li4: "ib3a1ecf93f0caf03edb14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "hjjingling": {
            "baidu": {
                li: "u2646233",
                li2: "u2713407",
                li3: "u2714584",
                li4: "u2731909"
            }
        },
        "zhanglida": {
            "baidu": {
                li: "u2642800",
                li2: "u2713406",
                li3: "u2714583",
                li4: "u2731911"
            }
        },
        "zhuanyidou": {
            "baidu": {
                li: "u2640987",
                li2: "u2713401",
                li3: "u2714581",
                li4: "u2731919"
            }
        },
        "m021_hyx007": {
            "baidu": {
                li: "u2636782",
                li2: "u2713395",
                li3: "u2714577",
                li4: "u2731930"
            }
        },
        "m021_hyx006": {
            "baidu": {
                li: "u2636754",
                li2: "u2713394",
                li3: "u2714576",
                li4: "u2731933"
            }
        },
        "m021_hyx005": {
            "baidu": {
                li: "u2636729",
                li2: "u2713392",
                li3: "u2714575",
                li4: "u2733559"
            }
        },
        "m021_hyx004": {
            "baidu": {
                li: "u2636706",
                li2: "u2713391",
                li3: "u2714574",
                li4: "u2731935"
            }
        },
        "m021_hyx003": {
            "baidu": {
                li: "u2636653",
                li2: "u2713390",
                li3: "u2714568",
                li4: "u2731937"
            }
        },
        "laokgame": {
            "baidu": {
                li: "u2637445",
                li2: "u2713386",
                li3: "u2714567",
                li4: "u2731944"
            }
        },
        "m021_hyx002": {
            "baidu": {
                li: "u2636117",
                li2: "u2713384",
                li3: "u2714566",
                li4: "u2733551"
            }
        },
        "m021_hyx001": {
            "baidu": {
                li: "u2636107",
                li2: "u2713382",
                li3: "u2714565",
                li4: "u2733556"
            }
        },
        "yijianqinglidashi": {
            "baidu": {
                li: "u2635951",
                li2: "u2713380",
                li3: "u2714564",
                li4: "u2731950"
            }
        },
        "chubaophone": {
            "baidu": {
                li: "u2636092",
                li2: "u2713378",
                li3: "u2714563",
                li4: "u2731956"
            }
        },
        "qiaohuiwangluo": {
            "baidu": {
                li: "u2634679",
                li2: "u2713374",
                li3: "u2714561",
                li4: "u2731963"
            }
        },
        "jiuyi160": {
            "baidu": {
                li: "u2634489",
                li2: "u2713372",
                li3: "u2714559",
                li4: "u2731964"
            }
        },
        "zuoankeji": {
            "baidu": {
                li: "u2633133",
                li2: "u2713370",
                li3: "u2714557",
                li4: "u2731968"
            }
        },
        "guguniao": {
            "baidu": {
                li: "u2630978",
                li2: "u2713368",
                li3: "u2714556",
                li4: "u2731971"
            }
        },
        "hongbaokuaishou": {
            "baidu": {
                li: "u2628441",
                li2: "u2713367",
                li3: "u2714554",
                li4: "u2731975"
            }
        },
        "wifixhwy": {
            "baidu": {
                li: "u2627265",
                li2: "u2713366",
                li3: "u2714553",
                li4: "u2731982"
            }
        },
        "operashangdian": {
            "baidu": {
                li: "u2627154",
                li2: "u2713363",
                li3: "u2714551",
                li4: "u2731985"
            }
        },
        "wpsandroid": {
            "baidu": {
                li: "u2626771",
                li2: "u2713362",
                li3: "u2714549",
                li4: "u2731987"
            }
        },
        "yijianqinglidashi02": {
            "baidu": {
                li: "u2622803",
                li2: "u2713359",
                li3: "u2714548",
                li4: "u2731988"
            }
        },
        "yonglian": {
            "baidu": {
                li: "u2615542",
                li2: "u2713357",
                li3: "u2714546",
                li4: "u2731993"
            }
        },
        "aoyouie": {
            "baidu": {
                li: "u2615534",
                li2: "u2713351",
                li3: "u2714545",
                li4: "u2731995"
            }
        },
        "jsonline2": {
            "baidu": {
                li: "u2613800",
                li2: "u2713340",
                li3: "u2714539",
                li4: "u2732009"
            }
        },
        "jsonline1": {
            "baidu": {
                li: "u2594033",
                li2: "u2713336",
                li3: "u2714538",
                li4: "u2732011"
            }
        },
        "shangyewifiliu2": {
            "baidu": {
                li: "u2612143",
                li2: "u2713335",
                li3: "u2714537",
                li4: "u2733548"
            }
        },
        "wifijl": {
            "baidu": {
                li: "u2610540",
                li2: "u2713333",
                li3: "u2714536",
                li4: "u2732014"
            }
        },
        "114mobileios": {
            "baidu": {
                li: "u2610225",
                li2: "u2713328",
                li3: "u2714534",
                li4: "u2733545"
            }
        },
        "114mobile": {
            "baidu": {
                li: "u2610261",
                li2: "u2713327",
                li3: "u2714533",
                li4: "u2733543"
            }
        },
        "2345m": {
            "baidu": {
                li: "u2607885",
                li2: "u2713323",
                li3: "u2714531",
                li4: "u2733541"
            }
        },
        "021dh": {
            "baidu": {
                li: "u2530657",
                li2: "u2713320",
                li3: "u2714528",
                li4: "u2733534"
            }
        },
        "10086wy": {
            "baidu": {
                li: "u2426684",
                li2: "u2713319",
                li3: "u2714527",
                li4: "u2733531"
            }
        },
        "2345daohang": {
            "baidu": {
                li: "u2272381",
                li2: "u2713318",
                li3: "u2714526",
                li4: "u2733528"
            }
        },
        "2345yuki": {
            "baidu": {
                li: "u2272378",
                li2: "u2713316",
                li3: "u2714525",
                li4: "u2733526"
            }
        },
        "28app": {
            "sogou": {
                li: "745018",
                li2: "745018",
                li3: "745018",
                li4: "745018"
            }
        },
        "4gbrowser": {
            "baidu": {
                li: "u2319240",
                li2: "u2713313",
                li3: "u2714523",
                li4: "u2733522"
            }
        },
        "51shoujizhushou": {
            "baidu": {
                li: "u2449816",
                li2: "u2713312",
                li3: "u2714522",
                li4: "u2733520"
            }
        },
        "96ck": {
            "baidu": {
                li: "u2584137",
                li2: "u2713306",
                li3: "u2714520",
                li4: "u2733517"
            }
        },
        "999wxdh": {
            "baidu": {
                li: "u2540073",
                li2: "u2713303",
                li3: "u2714519",
                li4: "u2733516"
            }
        },
        "aigao": {
            "baidu": {
                li: "u2383943",
                li2: "u2713301",
                li3: "u2714518",
                li4: "u2733515"
            }
        },
        "aishangbrowser": {
            "baidu": {
                li: "u2383939",
                li2: "u2713298",
                li3: "u2714517",
                li4: "u2733513"
            }
        },
        "aiyuedu": {
            "baidu": {
                li: "u2547548",
                li2: "u2713296",
                li3: "u2714516",
                li4: "u2733512"
            }
        },
        "androidesk": {
            "baidu": {
                li: "u2327356",
                li2: "u2713295",
                li3: "u2714493",
                li4: "u2733511"
            }
        },
        "anzhuohongbao": {
            "baidu": {
                li: "u2428346",
                li2: "u2713294",
                li3: "u2714492",
                li4: "u2733510"
            }
        },
        "apdft_lc001": {
            "baidu": {
                li: "u2563520",
                li2: "u2713024",
                li3: "u2713787",
                li4: "u2733508"
            }
        },
        "apdft_lc002": {
            "baidu": {
                li: "u2563646",
                li2: "u2713023",
                li3: "u2713786",
                li4: "u2733507"
            }
        },
        "apdft_lc003": {
            "baidu": {
                li: "u2563659",
                li2: "u2713021",
                li3: "u2713784",
                li4: "u2733504"
            }
        },
        "apdft_lc004": {
            "baidu": {
                li: "u2563675",
                li2: "u2713020",
                li3: "u2713783",
                li4: "u2733503"
            }
        },
        "apdft_lc005": {
            "baidu": {
                li: "u2563687",
                li2: "u2713019",
                li3: "u2713782",
                li4: "u2733501"
            }
        },
        "baiducom": {
            "baidu": {
                li: "u2511451",
                li2: "u2713283",
                li3: "u2714485",
                li4: "u2733498"
            }
        },
        "bdxml": {
            "baidu": {
                li: "u2585278",
                li2: "u2713282",
                li3: "u2714484",
                li4: "u2733497"
            }
        },
        "beiguaphone": {
            "baidu": {
                li: "u2580646",
                li2: "u2713280",
                li3: "u2714483",
                li4: "u2733494"
            }
        },
        "bodaophone": {
            "baidu": {
                li: "u2503283",
                li2: "u2713279",
                li3: "u2714482",
                li4: "u2733493"
            }
        },
        "browseruc": {
            "baidu": {
                li: "u2574296",
                li2: "u2713277",
                li3: "u2714481",
                li4: "u2733491"
            }
        },
        "bzhan": {
            "baidu": {
                li: "u2593342",
                li2: "u2713276",
                li3: "u2714480",
                li4: "u2733489"
            }
        },
        "caihongbrowser": {
            "baidu": {
                li: "u2560453",
                li2: "u2713275",
                li3: "u2714479",
                li4: "u2733486"
            }
        },
        "caimanxiangji": {
            "baidu": {
                li: "u2593357",
                li2: "u2713274",
                li3: "u2714476",
                li4: "u2733485"
            }
        },
        "chabrowser": {
            "baidu": {
                li: "u2579378",
                li2: "u2713272",
                li3: "u2714474",
                li4: "u2733483"
            }
        },
        "chamusdk": {
            "baidu": {
                li: "u2597498",
                li2: "u2713271",
                li3: "u2714473",
                li4: "u2733481"
            }
        },
        "chaojiwifi": {
            "baidu": {
                li: "u2361491",
                li2: "u2713269",
                li3: "u2714471",
                li4: "u2733478"
            }
        },
        "chenmeng": {
            "baidu": {
                li: "u2562486",
                li2: "u2713268",
                li3: "u2714469",
                li4: "u2733474"
            }
        },
        "cvbrowser": {
            "baidu": {
                li: "u2327364",
                li2: "u2713267",
                li3: "u2714468",
                li4: "u2733472"
            }
        },
        "dfweather": {
            "baidu": {
                li: "u2525700",
                li2: "u2713265",
                li3: "u2714467",
                li4: "u2733469"
            }
        },
        "dianfuyule": {
            "baidu": {
                li: "u2547713",
                li2: "u2713264",
                li3: "u2714466",
                li4: "u2733468"
            }
        },
        "dingdingapp": {
            "baidu": {
                li: "u2588898",
                li2: "u2713262",
                li3: "u2714465",
                li4: "u2733465"
            }
        },
        "domobile": {
            "baidu": {
                li: "u2541754",
                li2: "u2713261",
                li3: "u2714464",
                li4: "u2733464"
            }
        },
        "dxzt": {
            "baidu": {
                li: "u2314343",
                li2: "u2713259",
                li3: "u2714463",
                li4: "u2733463"
            }
        },
        "esbrowser": {
            "baidu": {
                li: "u2375187",
                li2: "u2713257",
                li3: "u2714462",
                li4: "u2733459"
            }
        },
        "ewifi": {
            "baidu": {
                li: "u2484851",
                li2: "u2713256",
                li3: "u2714461",
                li4: "u2733456"
            }
        },
        "ewifi9": {
            "baidu": {
                li: "u2594051",
                li2: "u2713254",
                li3: "u2714460",
                li4: "u2733454"
            }
        },
        "faleme": {
            "baidu": {
                li: "u2572244",
                li2: "u2713253",
                li3: "u2714459",
                li4: "u2733451"
            }
        },
        "firefox": {
            "baidu": {
                li: "u2351855",
                li2: "u2713252",
                li3: "u2714458",
                li4: "u2733448"
            }
        },
        "gaosubrowser": {
            "baidu": {
                li: "u2381057",
                li2: "u2713251",
                li3: "u2714456",
                li4: "u2733445"
            }
        },
        "gaoxiaopige": {
            "baidu": {
                li: "u2556050",
                li2: "u2713250",
                li3: "u2714455",
                li4: "u2733415"
            }
        },
        "gongxinweishi": {
            "baidu": {
                li: "u2484855",
                li2: "u2713249",
                li3: "u2714454",
                li4: "u2733414"
            }
        },
        "gouwudating": {
            "baidu": {
                li: "u2585525",
                li3: "u2714453",
                li4: "u2733413"
            },
            "sogou": {
                li2: "565291"
            }
        },
        "guangdianbizhi": {
            "baidu": {
                li: "u2305439",
                li2: "u2713246",
                li3: "u2714452",
                li4: "u2733409"
            }
        },
        "guminbao": {
            "baidu": {
                li: "u2574261",
                li2: "u2713244",
                li3: "u2714451",
                li4: "u2733408"
            }
        },
        "h5browser": {
            "baidu": {
                li: "u2574253",
                li2: "u2713241",
                li3: "u2714450",
                li4: "u2733407"
            }
        },
        "haixunyitong": {
            "baidu": {
                li: "u2562472",
                li2: "u2713240",
                li3: "u2714449",
                li4: "u2733405"
            }
        },
        "hangu": {
            "baidu": {
                li: "u2596938",
                li2: "u2713239",
                li3: "u2714448",
                li4: "u2733404"
            }
        },
        "haoh5": {
            "baidu": {
                li: "u2575936",
                li2: "u2713238",
                li3: "u2714447",
                li4: "u2733401"
            }
        },
        "holazhuomian": {
            "baidu": {
                li: "u2536033",
                li2: "u2713237",
                li3: "u2714445",
                li4: "u2733399"
            }
        },
        "hongbaoliulanqi": {
            "baidu": {
                li: "u2306836",
                li2: "u2713236",
                li3: "u2714444",
                li4: "u2733397"
            }
        },
        "hongbaorili": {
            "baidu": {
                li: "u2568237",
                li2: "u2713235",
                li3: "u2714433",
                li4: "u2733395"
            }
        },
        "huisuoping": {
            "baidu": {
                li: "u2371552",
                li2: "u2713234",
                li3: "u2714432",
                li4: "u2733393"
            }
        },
        "huohoubrowser": {
            "baidu": {
                li: "u2386625",
                li2: "u2713232",
                li3: "u2714430",
                li4: "u2733392"
            }
        },
        "jiaxiaobaodian": {
            "baidu": {
                li: "u2530704",
                li2: "u2713231",
                li3: "u2714429",
                li4: "u2733391"
            }
        },
        "jisuanguanjia": {
            "baidu": {
                li: "u2404338",
                li2: "u2713229",
                li3: "u2714428",
                li4: "u2732178"
            }
        },
        "jsonline": {
            "baidu": {
                li: "u2482174",
                li2: "u2713226",
                li3: "u2714426",
                li4: "u2732176"
            }
        },
        "jzonline9": {
            "baidu": {
                li: "u2716153",
                li2: "u2713225",
                li3: "u2714425",
                li4: "u2732175"
            }
        },
        "kangjiaphone": {
            "baidu": {
                li: "u2548304",
                li2: "u2713224",
                li3: "u2714424",
                li4: "u2732173"
            }
        },
        "kkwifi": {
            "baidu": {
                li: "u2508606",
                li2: "u2713222",
                li3: "u2714423",
                li4: "u2732172"
            }
        },
        "kudianzhuomian": {
            "baidu": {
                li: "u2726713",
                li2: "u2726718",
                li3: "u2714422",
                li4: "u2731763"
            }
        },
        "kuhuasuoping": {
            "baidu": {
                li: "u2576948",
                li2: "u2713215",
                li3: "u2714420",
                li4: "u2732169"
            }
        },
        "lanrentianqi": {
            "baidu": {
                li: "u2589976",
                li2: "u2713212",
                li3: "u2714419",
                li4: "u2732168"
            }
        },
        "laobansuoping": {
            "baidu": {
                li: "u2592501",
                li2: "u2713207",
                li3: "u2714417",
                li4: "u2732167"
            }
        },
        "laohuangli": {
            "baidu": {
                li: "u2375170",
                li2: "u2713202",
                li3: "u2714416",
                li4: "u2732166"
            }
        },
        "lemonbrowser": {
            "baidu": {
                li: "u2375320",
                li2: "u2713200",
                li3: "u2714415",
                li4: "u2732165"
            }
        },
        "leshitiyu": {
            "baidu": {
                li: "u2452489",
                li2: "u2713197",
                li3: "u2714414",
                li4: "u2732164"
            }
        },
        "lewuxian": {
            "baidu": {
                li: "u2579295",
                li2: "u2713196",
                li3: "u2714411",
                li4: "u2732163"
            }
        },
        "lezhuansuoping": {
            "baidu": {
                li: "u2525593",
                li2: "u2713194",
                li3: "u2714409",
                li4: "u2732161"
            }
        },
        "liangwang": {
            "baidu": {
                li: "u2508726",
                li2: "u2713193",
                li3: "u2714408",
                li4: "u2732160"
            }
        },
        "liantong001": {
            "baidu": {
                li: "u2581086",
                li2: "u2713191",
                li3: "u2714407",
                li4: "u2732159"
            }
        },
        "liantongbrowser": {
            "baidu": {
                li: "u2558105",
                li2: "u2713190",
                li3: "u2714406",
                li4: "u2732158"
            }
        },
        "lianxiang114la": {
            "baidu": {
                li: "u2549479",
                li2: "u2713187",
                li3: "u2714404",
                li4: "u2732157"
            }
        },
        "lianxiangrili": {
            "baidu": {
                li: "u2533451",
                li2: "u2713186",
                li3: "u2714403",
                li4: "u2732156"
            }
        },
        "liebaoxml": {
            "baidu": {
                li: "u2585267",
                li2: "u2713184",
                li3: "u2714401",
                li4: "u2732154"
            }
        },
        "lijianmin": {
            "baidu": {
                li: "u2572237",
                li2: "u2713183",
                li3: "u2714399",
                li4: "u2732153"
            }
        },
        "liuliangba": {
            "baidu": {
                li: "u2426696",
                li2: "u2713182",
                li3: "u2714398",
                li4: "u2732152"
            }
        },
        "llmfwifi": {
            "baidu": {
                li: "u2305445",
                li2: "u2713178",
                li3: "u2714397",
                li4: "u2732149"
            }
        },
        "m021": {
            "baidu": {
                li: "u2536063",
                li2: "u2713176",
                li3: "u2714395",
                li4: "u2732148"
            }
        },
        "m021_chenz": {
            "baidu": {
                li: "u2536122",
                li2: "u2713175",
                li3: "u2714394",
                li4: "u2732147"
            }
        },
        "m021_gsllq": {
            "baidu": {
                li: "u2536070",
                li2: "u2713174",
                li3: "u2714392",
                li4: "u2732145"
            }
        },
        "m021_mbzm": {
            "baidu": {
                li: "u2536106",
                li2: "u2713170",
                li3: "u2714390",
                li4: "u2732144"
            }
        },
        "m021_pgzs": {
            "baidu": {
                li: "u2536113",
                li2: "u2713168",
                li3: "u2714388",
                li4: "u2732143"
            }
        },
        "m021_waitui001": {
            "baidu": {
                li: "u2540884",
                li2: "u2713166",
                li3: "u2714386",
                li4: "u2732142"
            }
        },
        "m021_waitui002": {
            "baidu": {
                li: "u2540887",
                li2: "u2713164",
                li3: "u2714385",
                li4: "u2732141"
            }
        },
        "m021_waitui003": {
            "baidu": {
                li: "u2540897",
                li2: "u2713163",
                li3: "u2714384",
                li4: "u2732140"
            }
        },
        "m021_waitui004": {
            "baidu": {
                li: "u2540898",
                li2: "u2713162",
                li3: "u2714381",
                li4: "u2732139"
            }
        },
        "m021_waitui005": {
            "baidu": {
                li: "u2540901",
                li2: "u2713161",
                li3: "u2714380",
                li4: "u2732138"
            }
        },
        "m021_waitui006": {
            "baidu": {
                li: "u2540903",
                li2: "u2713160",
                li3: "u2714379",
                li4: "u2732137"
            }
        },
        "m021_waitui007": {
            "baidu": {
                li: "u2540904",
                li2: "u2713159",
                li3: "u2714377",
                li4: "u2732135"
            }
        },
        "m021_waitui008": {
            "baidu": {
                li: "u2540905",
                li2: "u2713158",
                li3: "u2714375",
                li4: "u2732134"
            }
        },
        "m021_waitui009": {
            "baidu": {
                li: "u2540907",
                li2: "u2713156",
                li3: "u2714373",
                li4: "u2732133"
            }
        },
        "m021_waitui010": {
            "baidu": {
                li: "u2540909",
                li2: "u2713154",
                li3: "u2714371",
                li4: "u2732132"
            }
        },
        "m021_waitui011": {
            "baidu": {
                li: "u2540912",
                li2: "u2713153",
                li3: "u2714369",
                li4: "u2732131"
            }
        },
        "m021_waitui015": {
            "baidu": {
                li: "u2540916",
                li2: "u2713152",
                li3: "u2714367",
                li4: "u2732129"
            }
        },
        "m021_waitui017": {
            "baidu": {
                li: "u2540919",
                li2: "u2713150",
                li3: "u2714365",
                li4: "u2732127"
            }
        },
        "m021_waitui021": {
            "baidu": {
                li: "u2602544",
                li2: "u2713148",
                li3: "u2714364",
                li4: "u2732126"
            }
        },
        "m021_waitui023": {
            "baidu": {
                li: "u2602568",
                li2: "u2713145",
                li3: "u2714362",
                li4: "u2732125"
            }
        },
        "m021_waitui026": {
            "baidu": {
                li: "u2602590",
                li2: "u2713142",
                li3: "u2714360",
                li4: "u2732124"
            }
        },
        "m021_waitui027": {
            "baidu": {
                li: "u2602614",
                li2: "u2713140",
                li3: "u2714357",
                li4: "u2732123"
            }
        },
        "m021_waitui028": {
            "baidu": {
                li: "u2602628",
                li2: "u2713139",
                li3: "u2714353",
                li4: "u2732121"
            }
        },
        "m021_waitui030": {
            "baidu": {
                li: "u2602647",
                li2: "u2713137",
                li3: "u2714352",
                li4: "u2732120"
            }
        },
        "m021_waitui031": {
            "baidu": {
                li: "u2683798",
                li2: "u2713135",
                li3: "u2714350",
                li4: "u2732119"
            }
        },
        "m021_waitui032": {
            "baidu": {
                li: "u2683802",
                li2: "u2713091",
                li3: "u2714349",
                li4: "u2732118"
            }
        },
        "m021_waitui033": {
            "baidu": {
                li: "u2683804",
                li2: "u2713090",
                li3: "u2714348",
                li4: "u2732117"
            }
        },
        "m021_waitui034": {
            "baidu": {
                li: "u2683806",
                li2: "u2713088",
                li3: "u2714346",
                li4: "u2732116"
            }
        },
        "m021_waitui035": {
            "baidu": {
                li: "u2683808",
                li2: "u2713087",
                li3: "u2714345",
                li4: "u2732115"
            }
        },
        "m021_wy004": {
            "baidu": {
                li: "u2536282",
                li2: "u2713080",
                li3: "u2714342",
                li4: "u2732112"
            }
        },
        "m021_wy005": {
            "baidu": {
                li: "u2536383",
                li2: "u2713078",
                li3: "u2714341",
                li4: "u2732110"
            }
        },
        "m021_wy006": {
            "baidu": {
                li: "u2536379",
                li2: "u2713077",
                li3: "u2714340",
                li4: "u2732109"
            }
        },
        "m021_wy007": {
            "baidu": {
                li: "u2536389",
                li2: "u2713076",
                li3: "u2714339",
                li4: "u2732108"
            }
        },
        "m021_wy008": {
            "baidu": {
                li: "u2536396",
                li2: "u2713075",
                li3: "u2714338",
                li4: "u2732107"
            }
        },
        "m021_wy009": {
            "baidu": {
                li: "u2536406",
                li2: "u2713074",
                li3: "u2714336",
                li4: "u2732106"
            }
        },
        "m021_wy010": {
            "baidu": {
                li: "u2536408",
                li2: "u2713072",
                li3: "u2714335",
                li4: "u2732104"
            }
        },
        "m021_wy011": {
            "baidu": {
                li: "u2536416",
                li2: "u2713071",
                li3: "u2714334",
                li4: "u2732103"
            }
        },
        "m021_wy012": {
            "baidu": {
                li: "u2536419",
                li2: "u2713069",
                li3: "u2714332",
                li4: "u2732101"
            }
        },
        "m021_wy013": {
            "baidu": {
                li: "u2673209",
                li2: "u2713067",
                li3: "u2714331",
                li4: "u2732099"
            }
        },
        "m021_wy014": {
            "baidu": {
                li: "u2536429",
                li2: "u2713065",
                li3: "u2714330",
                li4: "u2732096"
            }
        },
        "m021_wy015": {
            "baidu": {
                li: "u2536433",
                li2: "u2713064",
                li3: "u2714329",
                li4: "u2732095"
            }
        },
        "m021_wy016": {
            "baidu": {
                li: "u2536437",
                li2: "u2713063",
                li3: "u2714328",
                li4: "u2732093"
            }
        },
        "m021_wy017": {
            "baidu": {
                li: "u2536442",
                li2: "u2713062",
                li3: "u2714327",
                li4: "u2732092"
            }
        },
        "m021_wy018": {
            "baidu": {
                li: "u2536446",
                li2: "u2713059",
                li3: "u2714326",
                li4: "u2732090"
            }
        },
        "m021_wy019": {
            "baidu": {
                li: "u2536453",
                li2: "u2713058",
                li3: "u2714323",
                li4: "u2732089"
            }
        },
        "m021_wy020": {
            "baidu": {
                li: "u2536447",
                li2: "u2713057",
                li3: "u2714321",
                li4: "u2732087"
            }
        },
        "m021_wy021": {
            "baidu": {
                li: "u2536462",
                li2: "u2713055",
                li3: "u2714134",
                li4: "u2732085"
            }
        },
        "m021_wy022": {
            "baidu": {
                li: "u2536466",
                li2: "u2713054",
                li3: "u2714133",
                li4: "u2732083"
            }
        },
        "m021_wy023": {
            "baidu": {
                li: "u2536476",
                li2: "u2713053",
                li3: "u2714132",
                li4: "u2732081"
            }
        },
        "m021_wy024": {
            "baidu": {
                li: "u2536480",
                li2: "u2713052",
                li3: "u2714131",
                li4: "u2732075"
            }
        },
        "m021_wy025": {
            "baidu": {
                li: "u2536487",
                li2: "u2713050",
                li3: "u2714130",
                li4: "u2732073"
            }
        },
        "m021_wy026": {
            "baidu": {
                li: "u2536494",
                li2: "u2713048",
                li3: "u2714128",
                li4: "u2732072"
            }
        },
        "m021_wy027": {
            "baidu": {
                li: "u2536496",
                li2: "u2713047",
                li3: "u2714127",
                li4: "u2732069"
            }
        },
        "m021_wy028": {
            "baidu": {
                li: "u2536499",
                li2: "u2713044",
                li3: "u2714126",
                li4: "u2732065"
            }
        },
        "m021_wy029": {
            "baidu": {
                li: "u2536506",
                li2: "u2713043",
                li3: "u2714123",
                li4: "u2732063"
            }
        },
        "m021_wy030": {
            "baidu": {
                li: "u2536509",
                li2: "u2713041",
                li3: "u2714122",
                li4: "u2732060"
            }
        },
        "m021_wy031": {
            "baidu": {
                li: "u2536513",
                li2: "u2713039",
                li3: "u2714121",
                li4: "u2732057"
            }
        },
        "m021_wy032": {
            "baidu": {
                li: "u2536514",
                li2: "u2713038",
                li3: "u2714120",
                li4: "u2732056"
            }
        },
        "m021_wy033": {
            "baidu": {
                li: "u2536515",
                li2: "u2713036",
                li3: "u2714119",
                li4: "u2732054"
            }
        },
        "m021_wy034": {
            "baidu": {
                li: "u2536523",
                li2: "u2713032",
                li3: "u2714118",
                li4: "u2732053"
            }
        },
        "m021_wy035": {
            "baidu": {
                li: "u2536526",
                li2: "u2713030",
                li3: "u2714117",
                li4: "u2732052"
            }
        },
        "m021_wy036": {
            "baidu": {
                li: "u2536532",
                li2: "u2713029",
                li3: "u2714116",
                li4: "u2732050"
            }
        },
        "m021_wy044": {
            "baidu": {
                li: "u2536557",
                li2: "u2713028",
                li3: "u2714114",
                li4: "u2732047"
            }
        },
        "m021_wy047": {
            "baidu": {
                li: "u2536568",
                li2: "u2713027",
                li3: "u2714111",
                li4: "u2732045"
            }
        },
        "m021_wy063": {
            "baidu": {
                li: "u2536687",
                li2: "u2713026",
                li3: "u2713789",
                li4: "u2732044"
            }
        },
        "m021dh": {
            "baidu": {
                li: "u2525302",
                li2: "u2713017",
                li3: "u2713780",
                li4: "u2732039"
            }
        },
        "maopaobrowser": {
            "baidu": {
                li: "u2375314",
                li2: "u2713016",
                li3: "u2713779",
                li4: "u2732037"
            }
        },
        "mayibrowser": {
            "baidu": {
                li: "u2552924",
                li2: "u2713014",
                li3: "u2713778",
                li4: "u2732036"
            }
        },
        "meirenzhuang": {
            "baidu": {
                li: "u2470705",
                li2: "u2713013",
                li3: "u2713777",
                li4: "u2732018"
            }
        },
        "meizubrowser": {
            "baidu": {
                li: "u2470718",
                li2: "u2713012",
                li3: "u2713776",
                li4: "u2732016"
            }
        },
        "meizuliulanqi": {
            "baidu": {
                li: "u2490015",
                li2: "u2713011",
                li3: "u2713775",
                li4: "u2732013"
            }
        },
        "miaowu": {
            "baidu": {
                li: "u2280816",
                li2: "u2713010",
                li3: "u2713774",
                li4: "u2732010"
            }
        },
        "moban": {
            "baidu": {
                li: "u2371577",
                li2: "u2713009",
                li3: "u2713772",
                li4: "u2732008"
            }
        },
        "ningmengzhuomian": {
            "baidu": {
                li: "u2449811",
                li2: "u2713008",
                li3: "u2713771",
                li4: "u2732005"
            }
        },
        "coolpadbrowser": {
            "baidu": {
                li: "u2407595",
                li3: "u2713770",
                li4: "u2732001"
            },
            "sogou": {
                li2: "524815"
            }
        },
        "oppobrowser": {
            "baidu": {
                li: "u2323755",
                li3: "u2713769",
                li4: "u2731997"
            },
            "sogou": {
                li2: "611435"
            }
        },
        "vivobrowser": {
            "baidu": {
                li: "u2407603",
                li3: "u2713768",
                li4: "u2731994"
            },
            "sogou": {
                li2: "611436"
            }
        },
        "gioneebrowser": {
            "baidu": {
                li: "u2375512",
                li3: "u2713767",
                li4: "u2731992"
            },
            "sogou": {
                li2: "611437"
            }
        },
        "lt114116": {
            "baidu": {
                li: "u2380766",
                li3: "u2713766",
                li4: "u2731990"
            },
            "sogou": {
                li2: "611438"
            }
        },
        "paoba": {
            "baidu": {
                li: "u2576004",
                li2: "u2713000",
                li3: "u2713765",
                li4: "u2731986"
            }
        },
        "phone001": {
            "baidu": {
                li: "u2602491",
                li2: "u2712999",
                li3: "u2713764",
                li4: "u2731984"
            }
        },
        "phone002": {
            "baidu": {
                li: "u2603236",
                li2: "u2712998",
                li3: "u2713763",
                li4: "u2731980"
            }
        },
        "pingce": {
            "baidu": {
                li: "u2579312",
                li2: "u2712997",
                li3: "u2713762",
                li4: "u2731979"
            }
        },
        "qianghongbao": {
            "baidu": {
                li: "u2540058",
                li2: "u2712995",
                li3: "u2713761",
                li4: "u2731978"
            }
        },
        "qidouh5": {
            "baidu": {
                li: "u2426690",
                li2: "u2712993",
                li3: "u2713760",
                li4: "u2731977"
            }
        },
        "qishizhushou": {
            "baidu": {
                li: "u2523141",
                li2: "u2712992",
                li3: "u2713759",
                li4: "u2731974"
            }
        },
        "qixiazi": {
            "baidu": {
                li: "u2421651",
                li2: "u2712991",
                li3: "u2713758",
                li4: "u2731972"
            }
        },
        "sangmenhu": {
            "baidu": {
                li: "u2488937",
                li2: "u2712986",
                li3: "u2713756",
                li4: "u2731966"
            }
        },
        "sdtmeinv": {
            "baidu": {
                li: "u2409621",
                li2: "u2712985",
                li3: "u2713754",
                li4: "u2731962"
            }
        },
        "shangyewifi": {
            "baidu": {
                li: "u2377702",
                li2: "u2712984",
                li3: "u2713753",
                li4: "u2731958"
            }
        },
        "shangyongwifi": {
            "baidu": {
                li: "u2531944",
                li2: "u2712978",
                li3: "u2713750",
                li4: "u2731953"
            }
        },
        "shenzhishoudiantong": {
            "baidu": {
                li: "u2506071",
                li2: "u2712974",
                li3: "u2713744",
                li4: "u2731951"
            }
        },
        "shoudiantong": {
            "baidu": {
                li: "u2284359",
                li2: "u2712973",
                li3: "u2713743",
                li4: "u2731948"
            }
        },
        "shoujibao": {
            "baidu": {
                li: "u2489184",
                li2: "u2712970",
                li3: "u2713742",
                li4: "u2731945"
            }
        },
        "smcn": {
            "baidu": {
                li: 'rp3a1ecf93f0c8f63ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'sq3a1ecf93f0c8f63edb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'vt3a1ecf93f0c8f631db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'zx3a1ecf93f0c8f53bdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "tianpaibrowser": {
            "baidu": {
                li: "u2386653",
                li2: "u2712967",
                li3: "u2713740",
                li4: "u2731941"
            }
        },
        "tianyin": {
            "baidu": {
                li: "u2579324",
                li2: "u2712966",
                li3: "u2713739",
                li4: "u2731940"
            }
        },
        "tianyino": {
            "baidu": {
                li: "u2380587",
                li2: "u2712964",
                li3: "u2713736",
                li4: "u2731936"
            }
        },
        "tianyiwifi": {
            "baidu": {
                li: "u2329106",
                li2: "u2712962",
                li3: "u2713735",
                li4: "u2731934"
            }
        },
        "v2345com": {
            "baidu": {
                li: "u2482184",
                li2: "u2712961",
                li3: "u2713733",
                li4: "u2731932"
            }
        },
        "wangyi": {
            "baidu": {
                li: "u2542920",
                li2: "u2712960",
                li3: "u2713732",
                li4: "u2731929"
            }
        },
        "weimibrowser": {
            "sogou": {
                li: "745021",
                li2: "745021",
                li3: "745021"
            },
            "baidu":{
                li4: "u2731927"
            }
        },
        "weixinfenxiang": {
            "baidu": {
                li: "u2542704",
                li2: "u2712957",
                li3: "u2713729",
                li4: "u2731925"
            }
        },
        "weixinyidu": {
            "baidu": {
                li: "u2538318",
                li2: "u2712956",
                li3: "u2713728",
                li4: "u2731924"
            }
        },
        "weixun": {
            "baidu": {
                li: "u2580306",
                li2: "u2712955",
                li3: "u2713726",
                li4: "u2731920"
            }
        },
        "wenhaushanghai": {
            "baidu": {
                li: "u2572335",
                li2: "u2712953",
                li3: "u2713725",
                li4: "u2731918"
            }
        },
        "wh001": {
            "baidu": {
                li: "u2464065",
                li2: "u2712952",
                li3: "u2713724",
                li4: "u2731916"
            }
        },
        "wifibrowser": {
            "baidu": {
                li: "u2390477",
                li2: "u2712951",
                li3: "u2713723",
                li4: "u2731914"
            }
        },
        "wifichangyou": {
            "baidu": {
                li: "u2550162",
                li2: "u2712950",
                li3: "u2713718",
                li4: "u2731913"
            }
        },
        "wifichaping": {
            "baidu": {
                li: "u2570432",
                li2: "u2712949",
                li3: "u2713716",
                li4: "u2731912"
            }
        },
        "wifidianhua": {
            "baidu": {
                li: "u2381050",
                li2: "u2712948",
                li3: "u2713713",
                li4: "u2731910"
            }
        },
        "wifigongxiangjinglin": {
            "baidu": {
                li: "u2572205",
                li2: "u2712947",
                li3: "u2713711",
                li4: "u2731908"
            }
        },
        "wifillq": {
            "baidu": {
                li: "u2375047",
                li2: "u2712946",
                li3: "u2713710",
                li4: "u2731901"
            }
        },
        "wifilwsq": {
            "baidu": {
                li: "u2582156",
                li2: "u2712944",
                li3: "u2713709",
                li4: "u2731898"
            }
        },
        "wifimima": {
            "baidu": {
                li: "u2570454",
                li2: "u2712943",
                li3: "u2713707",
                li4: "u2731893"
            }
        },
        "wifitanzhen": {
            "baidu": {
                li: "u2381068",
                li2: "u2712942",
                li3: "u2713705",
                li4: "u2731889"
            }
        },
        "wifitianyi": {
            "baidu": {
                li: "u2478162",
                li2: "u2712940",
                li3: "u2713704",
                li4: "u2731885"
            }
        },
        "wifiunion": {
            "baidu": {
                li: "u2365325",
                li2: "u2712939",
                li3: "u2713703",
                li4: "u2731882"
            }
        },
        "wifiwn": {
            "baidu": {
                li: "u2374441",
                li2: "u2712938",
                li3: "u2713702",
                li4: "u2731879"
            }
        },
        "wifixh": {
            "baidu": {
                li: "u2292088",
                li2: "u2712937",
                li3: "u2713701",
                li4: "u2731877"
            }
        },
        "wpswapdh": {
            "baidu": {
                li: "u2593996",
                li2: "u2712936",
                li3: "u2713700",
                li4: "u2731874"
            }
        },
        "wxgzh": {
            "baidu": {
                li: "u2410915",
                li2: "u2712934",
                li3: "u2713699",
                li4: "u2731870"
            }
        },
        "xbrowser": {
            "baidu": {
                li: "u2375247",
                li2: "u2712933",
                li3: "u2713697",
                li4: "u2731867"
            }
        },
        "xiamibrowser": {
            "baidu": {
                li: "u2592402",
                li2: "u2712932",
                li3: "u2713695",
                li4: "u2731865"
            }
        },
        "yichawang": {
            "baidu": {
                li: "u2498777",
                li2: "u2712931",
                li3: "u2713694",
                li4: "u2731861"
            }
        },
        "yidongwlan": {
            "baidu": {
                li: "u2570436",
                li2: "u2712930",
                li3: "u2713692",
                li4: "u2731856"
            }
        },
        "yijianqingli": {
            "baidu": {
                li: "u2570422",
                li2: "u2712929",
                li3: "u2713691",
                li4: "u2731850"
            }
        },
        "yingyongguanjia": {
            "baidu": {
                li: "u2594080",
                li2: "u2712924",
                li3: "u2713686",
                li4: "u2731838"
            }
        },
        "yougoushichang": {
            "baidu": {
                li: "u2442625",
                li2: "u2712922",
                li3: "u2713684",
                li4: "u2731837"
            }
        },
        "youxindianhua": {
            "baidu": {
                li: "u2360574",
                li2: "u2712921",
                li3: "u2713682",
                li4: "u2731834"
            }
        },
        "youxindianhuaios": {
            "baidu": {
                li: "u2407588",
                li2: "u2712920",
                li3: "u2713680",
                li4: "u2731829"
            }
        },
        "yuedongbrowser": {
            "baidu": {
                li: "u2333289",
                li2: "u2712919",
                li3: "u2713678",
                li4: "u2731827"
            }
        },
        "yuedongquan": {
            "baidu": {
                li: "u2597519",
                li2: "u2712918",
                li3: "u2713677",
                li4: "u2731823"
            }
        },
        "yuletoutiao": {
            "baidu": {
                li: "u2410907",
                li2: "u2712915",
                li3: "u2713671",
                li4: "u2731819"
            }
        },
        "yunyingshang": {
            "baidu": {
                li: "u2594065",
                li2: "u2712914",
                li3: "u2713669",
                li4: "u2731816"
            }
        },
        "zhangda": {
            "baidu": {
                li: "u2562461",
                li2: "u2712913",
                li3: "u2713667",
                li4: "u2731815"
            }
        },
        "zhengdiannaozhong": {
            "baidu": {
                li: "u2548276",
                li2: "u2712911",
                li3: "u2713663",
                li4: "u2731812"
            }
        },
        "zhimeng": {
            "baidu": {
                li: "u2574283",
                li2: "u2712909",
                li3: "u2713662",
                li4: "u2731809"
            }
        },
        "zhimeng1": {
            "baidu": {
                li: "u2574244",
                li2: "u2712907",
                li3: "u2713661",
                li4: "u2731807"
            }
        },
        "zhimeng2": {
            "baidu": {
                li: "u2579374",
                li2: "u2712906",
                li3: "u2713659",
                li4: "u2731805"
            }
        },
        "zhongda": {
            "baidu": {
                li: "u2564480",
                li2: "u2712905",
                li3: "u2713657",
                li4: "u2731802"
            }
        },
        "zhonghualaohuangi": {
            "baidu": {
                li: "u2574274",
                li2: "u2712904",
                li3: "u2713654",
                li4: "u2731800"
            }
        },
        "zhwnl": {
            "baidu": {
                li: "u2375056",
                li2: "u2712902",
                li3: "u2713653",
                li4: "u2731796"
            }
        },
        "zjzy": {
            "baidu": {
                li: "u2462970",
                li2: "u2712899",
                li3: "u2713652",
                li4: "u2731794"
            }
        },
        "zuimeitianqi": {
            "baidu": {
                li: "u2592419",
                li2: "u2712897",
                li3: "u2713651",
                li4: "u2731791"
            }
        },
        "null": {
            "baidu": {
                li: "u2196095",
                li2: "u2712895",
                li3: "u2713649",
                li4: "u2731788"
            }
        },
        "m021_liantongbrowser1": {
            "baidu": {
                li: "u2717149",
                li2: "u2717151",
                li3: "u2717152",
                li4: "u2731193"
            }
        },
        "m021_liantongbrowser2": {
            "baidu": {
                li: "u2717166",
                li2: "u2717167",
                li3: "u2717168",
                li4: "u2731188"
            }
        },
        "m021_liantongbrowser3": {
            "baidu": {
                li: "u2717174",
                li2: "u2717178",
                li3: "u2717179",
                li4: "u2731187"
            }
        },
        "m021_liantongbrowser4": {
            "baidu": {
                li: "u2717187",
                li2: "u2717189",
                li3: "u2717192",
                li4: "u2731179"
            }
        },
        "m021_liantongbrowser5": {
            "baidu": {
                li: "u2717201",
                li2: "u2717202",
                li3: "u2717203",
                li4: "u2731176"
            }
        },
        "zhaocaisuo": {
            "baidu": {
                li: "u2717263",
                li2: "u2717264",
                li3: "u2717265",
                li4: "u2731172"
            }
        },
        "renshengrili": {
            "baidu": {
                li: "u2718204",
                li2: "u2718211",
                li3: "u2718212",
                li4: "u2731159"
            }
        },
        "jingwangllq": {
            "baidu": {
                li: "u2719780",
                li2: "u2719786",
                li3: "u2719787",
                li4: "u2731152"
            }
        },
        "liantongbrowser1": {
            "baidu": {
                li: "u2717149",
                li2: "u2717151",
                li3: "u2717152",
                li4: "u2731193" 
            }
        },
        "liantongbrowser2": {
            "baidu": {
                li: "u2717166",
                li2: "u2717167",
                li3: "u2717168",
                li4: "u2731188"
            }
        },
        "liantongbrowser3": {
            "baidu": {
                li: "u2717174",
                li2: "u2717178",
                li3: "u2717179",
                li4: "u2731187"
            }
        },
        "liantongbrowser4": {
            "baidu": {
                li: "u2717187",
                li2: "u2717189",
                li3: "u2717192",
                li4: "u2731179"
            }
        },
        "hltianqi": {
            "baidu": {
                li: "u2721021",
                li2: "u2721026",
                li3: "u2721027",
                li4: "u2731140"
            }
        },
        "liantongbrowser5": {
            "baidu": {
                li: "u2721501",
                li2: "u2721507",
                li3: "u2721509",
                li4: "u2731137"
            }
        },
        "sanzhong": {
            "baidu": {
                li: "u2722486",
                li2: "u2722495",
                li3: "u2722496",
                li4: "u2731134"
            }
        },
        "mayaollq": {
            "baidu": {
                li: "u2723887",
                li2: "u2723892",
                li3: "u2723893",
                li4: "u2731768"
            }
        },
        "wifilh": {
            "baidu": {
                li: "u2725094",
                li2: "u2725099",
                li3: "u2725100",
                li4: "u2731126"
            }
        },
        "wifinmg": {
            "baidu": {
                li: "u2725077",
                li2: "u2725084",
                li3: "u2725086",
                li4: "u2731131"
            }
        },
        "maozivpn": {
            "baidu": {
                li: "u2727020",
                li2: "u2727030",
                li3: "u2727031",
                li4: "u2731116"
            }
        },
        "900market": {
            "baidu": {
                li: "u2727077",
                li2: "u2727084",
                li3: "u2727085",
                li4: "u2731119"
            }
        },
        "tonghuagongzhu": {
            "baidu": {
                li: "u2727090",
                li2: "u2727095",
                li3: "u2727096",
                li4: "u2731113"
            }
        },
        "m021_waitui036": {
            "baidu": {
                li: "u2727049",
                li2: "u2727053",
                li3: "u2727055",
                li4: "u2731762"
            }
        },
        "m021_waitui037": {
            "baidu": {
                li: "u2727061",
                li2: "u2727062",
                li3: "u2727064",
                li4: "u2731761"
            }
        },
        "m021_waitui038": {
            "baidu": {
                li: "u2727066",
                li2: "u2727067",
                li3: "u2727068",
                li4: "u2731758"
            }
        },
        "m021_waitui039": {
            "baidu": {
                li: "u2727069",
                li2: "u2727070",
                li3: "u2727071",
                li4: "u2731757"
            }
        },
        "m021_waitui040": {
            "baidu": {
                li: "u2727072",
                li2: "u2727073",
                li3: "u2727074",
                li4: "u2731755"
            }
        },
        "m021_waitui029": {
            "baidu": {
                li: "u2602637",
                li2: "u2727101",
                li3: "u2727102",
                li4: "u2731753"
            }
        },
        "m021_waitui025": {
            "baidu": {
                li: "u2602583",
                li2: "u2727106",
                li3: "u2727108",
                li4: "u2731752"
            }
        },
        "m021_waitui024": {
            "baidu": {
                li: "u2602578",
                li2: "u2727113",
                li3: "u2727114",
                li4: "u2731750"
            }
        },
        "m021_waitui022": {
            "baidu": {
                li: "u2602609",
                li2: "u2727118",
                li3: "u2727120",
                li4: "u2731747"
            }
        },
        "m021_waitui020": {
            "baidu": {
                li: "u2540923",
                li2: "u2727122",
                li3: "u2727123",
                li4: "u2731746"
            }
        },
        "m021_waitui019": {
            "baidu": {
                li: "u2540922",
                li2: "u2727127",
                li3: "u2727128",
                li4: "u2731742"
            }
        },
        "m021_waitui018": {
            "baidu": {
                li: "u2540920",
                li2: "u2727131",
                li3: "u2727132",
                li4: "u2731741"
            }
        },
        "m021_waitui016": {
            "baidu": {
                li: "u2540917",
                li2: "u2727135",
                li3: "u2727136",
                li4: "u2731736"
            }
        },
        "m021_waitui014": {
            "baidu": {
                li: "u2540915",
                li2: "u2727138",
                li3: "u2727140",
                li4: "u2731735"
            }
        },
        "m021_waitui013": {
            "baidu": {
                li: "u2540914",
                li2: "u2727143",
                li3: "u2727145",
                li4: "u2731732"
            }
        },
        "m021_waitui012": {
            "baidu": {
                li: "u2540913",
                li2: "u2727148",
                li3: "u2727150",
                li4: "u2731730"
            }
        },
        "tonghuagongzhu01": {
            "baidu": {
                li: "u2727785",
                li2: "u2727817",
                li3: "u2727818",
                li4: "u2731101"
            }
        },
        "mogullq": {
            "baidu": {
                li: "u2728013",
                li2: "u2728019",
                li3: "u2728020",
                li4: "u2731092"
            }
        },
        "yystanchuang": {
            "sogou": {
                li: "745022",
                li2: "745022",
                li3: "745022",
                li4: "745022"
            }
        },
        "wdcx02": {
            "baidu": {
                li: "u2728519",
                li2: "u2728520",
                li3: "u2728521",
                li4: "u2731645"
            }
        },
        "biling": {
            "baidu": {
                li: "u2728882",
                li2: "u2728889",
                li3: "u2728890",
                li4: "u2731087"
            }
        },
        "juhong": {
            "baidu": {
                li: "u2728996",
                li2: "u2729004",
                li3: "u2729006",
                li4: "u2731085"
            }
        },
        "shengle": {
            "baidu": {
                li: "u2729426",
                li2: "u2729435",
                li3: "u2729438",
                li4: "u2731084"
            }
        },
        "sanzhong01": {
            "baidu": {
                li: "u2729412",
                li2: "u2729422",
                li3: "u2729423",
                li4: "u2731083"
            }
        },
        "kezhong": {
            "baidu": {
                li: "u2730614",
                li2: "u2730622",
                li3: "u2730624",
                li4: "u2731081"
            }
        },
        "huiyan": {
            "baidu": {
                li: "u2731614",
                li2: "u2731635",
                li3: "u2731636",
                li4: "u2731637"
            }
        },
        "xiandu": {
            "baidu": {
                li: "u2731584",
                li2: "u2731600",
                li3: "u2731602",
                li4: "u2731603"
            }
        },
        "wifillq01": {
            "baidu": {
                li: "u2731604",
                li2: "u2731609",
                li3: "u2731612",
                li4: "u2731613"
            }
        },
        "yuliang": {
            "baidu": {
                li: "u2732021",
                li2: "u2732027",
                li3: "u2732029"
            }
        },
        "yousixing": {
            "baidu": {
                li: "u2734098",
                li2: "u2734105",
                li3: "u2734108",
                li4: "u2734109"
            }
        },
        "luancity": {
            "baidu": {
                li: "u2734173",
                li2: "u2734178",
                li3: "u2734180",
                li4: "u2734181"
            }
        },
        "qingti": {
            "baidu": {
                li: "u2734182",
                li2: "u2734189",
                li3: "u2734191",
                li4: "u2734193"
            }
        },
        "hxw": {
            "baidu": {
                li: "u2734782",
                li2: "u2734790",
                li3: "u2734792",
                li4: "u2734794"
            }
        },
        "ldspush": {
            "baidu": {
                li: "u2734753",
                li2: "u2734762",
                li3: "u2734765",
                li4: "u2734768"
            }
        },
        "kouliangapp": {
            "baidu": {
                li: "u2735229",
                li2: "u2735240",
                li3: "u2735245",
                li4: "u2735246"
            }
        },
        "chongdianzhuang": {
            "baidu": {
                li: "u2736095",
                li2: "u2736103",
                li3: "u2736104",
                li4: "u2736107"
            }
        },
        "chenqingti": {
            "baidu": {
                li: "u2736325",
                li2: "u2736331",
                li3: "u2736332",
                li4: "u2736333"
            }
        },
        "pgzskjfs01": {
            "baidu": {
                li: "u2738691",
                li2: "u2738699",
                li3: "u2738700",
                li4: "u2738701"
            }
        },
        "pgzskjfs02": {
            "baidu": {
                li: "u2738719",
                li2: "u2738819",
                li3: "u2738821",
                li4: "u2738823"
            }
        },
        "pgzskjfs03": {
            "baidu": {
                li: "u2738737",
                li2: "u2738747",
                li3: "u2738750",
                li4: "u2738752"
            }
        },
        "pgzskjfs04": {
            "baidu": {
                li: "u2738760",
                li2: "u2738771",
                li3: "u2738772",
                li4: "u2738773"
            }
        },
        "pgzskjfs05": {
            "baidu": {
                li: "u2738779",
                li2: "u2738789",
                li3: "u2738792",
                li4: "u2738794"
            }
        },
        "baobeituan01": {
            "baidu": {
                li: "u2738305",
                li2: "u2738315",
                li3: "u2738317",
                li4: "u2738318"
            }
        },
        "dh12018": {
            "baidu": {
                li: "u2738381",
                li2: "u2738390",
                li3: "u2738391",
                li4: "u2738393"
            }
        },
        "juruan": {
            "sogou": {
                li: "745023",
                li2: "745023",
                li3: "745023",
                li4: "745023"
            }
        },
        "huanju": {
            "baidu": {
                li: "u2741649",
                li2: "u2741656",
                li3: "u2741657",
                li4: "u2741658"
            }
        },
        "uufree": {
            "baidu": {
                li: "u2742050",
                li2: "u2742062",
                li3: "u2742064",
                li4: "u2742065"
            }
        },
        "juxin": {
            "baidu": {
                li: "u2742185",
                li2: "u2742197",
                li3: "u2742198",
                li4: "u2742200"
            }
        },
        "wapwangmeng": {
            "baidu": {
                li: "u2742295",
                li2: "u2742303",
                li3: "u2742304",
                li4: "u2742305"
            }
        },
        "xiaotu": {
            "baidu": {
                li: "u2742786",
                li2: "u2742793",
                li3: "u2742794",
                li4: "u2742796"
            }
        },
        "getbrowser": {
            "baidu": {
                li: "u2742913",
                li2: "u2742933",
                li3: "u2742935",
                li4: "u2742936"
            }
        },
        "baisi": {
            "baidu": {
                li: "u2743265",
                li2: "u2743272",
                li3: "u2743274",
                li4: "u2743275"
            }
        },
        "nubiyabrowser": {
            "baidu": {
                li: "u2600934",
                li2: "u2744903",
                li3: "u2744904",
                li4: "u2744905"
            }
        },
        "newszaocan": {
            "baidu": {
                li: "u2745197",
                li2: "u2745207",
                li3: "u2745209",
                li4: "u2745211"
            }
        },
        "tashequ": {
            "baidu": {
                li: "u2745391",
                li2: "u2745393",
                li3: "u2745394",
                li4: "u2745396"
            }
        },
        "hujun": {
            "baidu": {
                li: "u2747094",
                li2: "u2747103",
                li3: "u2747104",
                li4: "u2747106"
            }
        },
        "haoqingwei": {
            "baidu": {
                li: "u2747157",
                li2: "u2747168",
                li3: "u2747169",
                li4: "u2747170"
            }
        },
        "wifimitan": {
            "baidu": {
                li: "u2744351",
                li2: "u2744356",
                li3: "u2744357",
                li4: "u2744358"
            }
        },
        "zhanghong": {
            "baidu": {
                li: "u2747234",
                li2: "u2747227",
                li3: "u2747226",
                li4: "u2747224"
            }
        },
        "gs404": {
            "baidu": {
                li: "u2721501",
                li2: "u2721507",
                li3: "u2721509",
                li4: "u2731137"
            }
        },
        "bingru": {
            "baidu": {
                li: "u2748377",
                li2: "u2748382",
                li3: "u2748384",
                li4: "u2748385"
            }
        },
        "yijianqingli01": {
            "baidu": {
                li: "u2602385",
                li2: "u2712927",
                li3: "u2713687",
                li4: "u2731839"
            }
        },
        "chaoliudh": {
            "baidu": {
                li: "u2728001",
                li2: "u2728011",
                li3: "u2728012",
                li4: "u2731096"
            }
        },
        "yincheng01": {
            "baidu": {
                li: "u2749656",
                li2: "u2749666",
                li3: "u2749667",
                li4: "u2749668"
            }
        },
        "yincheng02": {
            "baidu": {
                li: "u2749676",
                li2: "u2749683",
                li3: "u2749685",
                li4: "u2749687"
            }
        },
        "shunshang": {
            "baidu": {
                li: "u2749701",
                li2: "u2749707",
                li3: "u2749708",
                li4: "u2749709"
            }
        },
        "mobiwansi": {
            "baidu": {
                li: "u2749711",
                li2: "u2749716",
                li3: "u2749717",
                li4: "u2749719"
            }
        },
        "gaosu": {
            "baidu": {
                li: "u2751907",
                li2: "u2751914",
                li3: "u2751915",
                li4: "u2751916"
            }
        },
        "weimibrowser01": {
            "sogou": {
                li: "745026",
                li2: "745026",
                li3: "745026",
                li4: "745026"
            }
        },
        "weimibrowser02": {
            "sogou": {
                li: "745027",
                li2: "745027",
                li3: "745027",
                li4: "745027"
            }
        },
        "weimibrowser03": {
            "sogou": {
                li: "745030",
                li2: "745030",
                li3: "745030",
                li4: "745030"
            }
        },
        "juhong01": {
            "baidu": {
                li: "u2754819",
                li2: "u2754825",
                li3: "u2754827",
                li4: "u2754829"
            }
        },
        "zhanghong01": {
            "baidu": {
                li: "u2754950",
                li2: "u2754958",
                li3: "u2754959",
                li4: "u2754961"
            }
        },
        "bingru01": {
            "baidu": {
                li: "u2754963",
                li2: "u2754971",
                li3: "u2754972",
                li4: "u2754973"
            }
        },
        "zheyou": {
            "baidu": {
                li: "u2756085",
                li2: "u2756090",
                li3: "u2756091",
                li4: "u2756092"
            }
        },
        "tiantianqhb": {
            "baidu": {
                li: "u2756117",
                li2: "u2756124",
                li3: "u2756125",
                li4: "u2756126"
            }
        },
        "haoyu": {
            "baidu": {
                li: "u2757252",
                li2: "u2757256",
                li3: "u2757257",
                li4: "u2757258"
            }
        },
        "langtao": {
            "baidu": {
                li: "oe3a1ecf93f7cff73cdb14798aafed22e01be7dc172fe630fb51322bda",
                li2: "pf3a1ecf93f7cff73ddb14798aafed22e01be7dc172fe630fb51322bda",
                li3: "si3a1ecf93f7cff730db14798aafed22e01be7dc172fe630fb51322bda",
                li4: "tj3a1ecf93f7cff731db14798aafed22e01be7dc172fe630fb51322bda"
            }
        },
        "leshi": {
            "baidu": {
                li: "u2758557",
                li2: "u2758567",
                li3: "u2758571",
                li4: "u2758572"
            }
        },
        "zhizhu": {
            "baidu": {
                li: "u2758560",
                li2: "u2758570",
                li3: "u2758573",
                li4: "u2758575"
            }
        },
        "weimillq": {
            "sogou": {
                li: "745034",
                li2: "745034",
                li3: "745034",
                li4: "745034"
            }
        },
        "chaoliu01": {
            "baidu": {
                li: "u2760161",
                li2: "u2760167",
                li3: "u2760168",
                li4: "u2760169"
            }
        },
        "wifixhzqq": {
            "baidu": {
                li: "u2760755",
                li2: "u2760761",
                li3: "u2760763",
                li4: "u2760764"
            }
        },
        "newtank": {
            "baidu": {
                li: "u2761354",
                li2: "u2761360",
                li3: "u2761361",
                li4: "u2761364"
            }
        },
        "gaosumz": {
            "baidu": {
                li: "u2580275",
                li2: "u2761367",
                li3: "u2761368",
                li4: "u2761370"
            }
        },
        "dxtanchu": {
            "baidu": {
                li: "u2761388",
                li2: "u2761395",
                li3: "u2761397",
                li4: "u2761398"
            }
        },
        "m021_waitui041": {
            "baidu": {
                li: "u2727641",
                li2: "u2727652",
                li3: "u2727654",
                li4: "u2761677"
            }
        },
        "m021_waitui042": {
            "baidu": {
                li: "u2727667",
                li2: "u2727677",
                li3: "u2727682",
                li4: "u2761678"
            }
        },
        "m021_waitui043": {
            "baidu": {
                li: "u2727684",
                li2: "u2727693",
                li3: "u2727698",
                li4: "u2761679"
            }
        },
        "m021_waitui044": {
            "baidu": {
                li: "u2727702",
                li2: "u2727707",
                li3: "u2727709",
                li4: "u2761680"
            }
        },
        "m021_waitui045": {
            "baidu": {
                li: "u2727715",
                li2: "u2727721",
                li3: "u2727722",
                li4: "u2761682"
            }
        },
        "m021_waitui046": {
            "baidu": {
                li: "u2727723",
                li2: "u2727728",
                li3: "u2727729",
                li4: "u2761683"
            }
        },
        "m021_waitui047": {
            "baidu": {
                li: "u2727555",
                li2: "u2727566",
                li3: "u2727568",
                li4: "u2761685"
            }
        },
        "m021_waitui048": {
            "baidu": {
                li: "u2727615",
                li2: "u2727634",
                li3: "u2727636",
                li4: "u2761686"
            }
        },
        "m021_waitui049": {
            "baidu": {
                li: "u2727647",
                li2: "u2727666",
                li3: "u2727668",
                li4: "u2761689"
            }
        },
        "m021_waitui050": {
            "baidu": {
                li: "u2727686",
                li2: "u2727699",
                li3: "u2727705",
                li4: "u2761690"
            }
        },
        "yidian": {
            "baidu": {
                li: "u2761664",
                li2: "u2761672",
                li3: "u2761673",
                li4: "u2761674"
            }
        },
        "intely": {
            "baidu": {
                li: "u2761707",
                li2: "u2761713",
                li3: "u2761715",
                li4: "u2761717"
            }
        },
        "shaibo": {
            "baidu": {
                li: "u2761777",
                li2: "u2761788",
                li3: "u2761789",
                li4: "u2761790"
            }
        },
        "youmeng": {
            "baidu": {
                li: "u2761794",
                li2: "u2761801",
                li3: "u2761803",
                li4: "u2761804"
            }
        },
        "juhong02": {
            "baidu": {
                li: "u2765145",
                li2: "u2765154",
                li3: "u2765156",
                li4: "u2765157"
            }
        },
        "mugen": {
            "baidu": {
                li: "u2766713",
                li2: "u2766722",
                li3: "u2766723",
                li4: "u2766725"
            }
        },
        "dianyou": {
            "baidu": {
                li: "u2767329",
                li2: "u2767335",
                li3: "u2767336",
                li4: "u2767339"
            }
        },
        "juhong03": {
            "baidu": {
                li: "u2767951",
                li2: "u2767957",
                li3: "u2767959",
                li4: "u2767960"
            }
        },
        "jinlipush": {
            "baidu": {
                li: "u2768019",
                li2: "u2768035",
                li3: "u2768038",
                li4: "u2768040"
            }
        },
        "2345push": {
            "baidu": {
                li: "u2769060",
                li2: "u2769065",
                li3: "u2769066",
                li4: "u2769068"
            }
        },
        "zhilewang": {
            "baidu": {
                li: "u2769092",
                li2: "u2769098",
                li3: "u2769099",
                li4: "u2769100"
            }
        },
        "biling01": {
            "baidu": {
                li: "u2770212",
                li2: "u2770218",
                li3: "u2770219",
                li4: "u2770221"
            }
        },
        "139web": {
            "baidu": {
                li: "u2771290",
                li2: "u2771298",
                li3: "u2771299",
                li4: "u2771300"
            }
        },
        "moshi": {
            "baidu": {
                li: "u2773111",
                li2: "u2773116",
                li3: "u2773119",
                li4: "u2773120"
            }
        },
        "10086wy01": {
            "baidu": {
                li: "u2773393",
                li2: "u2773400",
                li3: "u2773401",
                li4: "u2773402"
            }
        },
        "bdxxl001": {
            'baidu': {li: 'u2774085', li2: 'u2774088', li3: 'u2774090', li4: 'u2774091'}
        },
        "bdxxl002": {
            'baidu': {li: 'u2774106', li2: 'u2774109', li3: 'u2774112', li4: 'u2774114'}
        },
        "bdxxl003": {
            'baidu': {li: 'u2774123', li2: 'u2774125', li3: 'u2774127', li4: 'u2774130'}
        },
        "bdxxl004": {
            'baidu': {li: 'u2774139', li2: 'u2774141', li3: 'u2774143', li4: 'u2774145'}
        },
        "bdxxl005": {
            'baidu': {li: 'u2774156', li2: 'u2774158', li3: 'u2774160', li4: 'u2774161'}
        },
        "bdxxl006": {
            'baidu': {li: 'u2774172', li2: 'u2774174', li3: 'u2774176', li4: 'u2774178'}
        },
        "bdxxl007": {
            'baidu': {li: 'u2774196', li2: 'u2774198', li3: 'u2774201', li4: 'u2774203'}
        },
        "bdxxl008": {
            'baidu': {li: 'u2774215', li2: 'u2774217', li3: 'u2774219', li4: 'u2774220'}
        },
        "bdxxl009": {
            'baidu': {li: 'u2774229', li2: 'u2774231', li3: 'u2774233', li4: 'u2774235'}
        },
        "bdxxl010": {
            'baidu': {li: 'u2774244', li2: 'u2774246', li3: 'u2774247', li4: 'u2774249'}
        },
        "bdxxl011": {
            'baidu': {li: 'u2774260', li2: 'u2774262', li3: 'u2774264', li4: 'u2774265'}
        },
        "bdxxl012": {
            'baidu': {li: 'u2774248', li2: 'u2774255', li3: 'u2774257', li4: 'u2774258'}
        },
        "bdxxl013": {
            'baidu': {li: 'u2774230', li2: 'u2774232', li3: 'u2774234', li4: 'u2774236'}
        },
        "bdxxl014": {
            'baidu': {li: 'u2774213', li2: 'u2774214', li3: 'u2774216', li4: 'u2774218'}
        },
        "bdxxl015": {
            'baidu': {li: 'u2774192', li2: 'u2774195', li3: 'u2774197', li4: 'u2774199'}
        },
        "bdxxl016": {
            'baidu': {li: 'u2774177', li2: 'u2774179', li3: 'u2774180', li4: 'u2774182'}
        },
        "bdxxl017": {
            'baidu': {li: 'u2774157', li2: 'u2774159', li3: 'u2774162', li4: 'u2774164'}
        },
        "bdxxl018": {
            'baidu': {li: 'u2774138', li2: 'u2774140', li3: 'u2774142', li4: 'u2774144'}
        },
        "bdxxl019": {
            'baidu': {li: 'u2774120', li2: 'u2774122', li3: 'u2774124', li4: 'u2774126'}
        },
        "bdxxl020": {
            'baidu': {li: 'u2774094', li2: 'u2774098', li3: 'u2774101', li4: 'u2774102'}
        },
        "juruan01": {
            'sogou': {li: '572718', li2: '572718', li3: '572718', li4: '572718'}
        },
        "f820078": {
            'baidu': {li: 'u2774509', li2: 'u2774510', li3: 'u2774511', li4: 'u2774515'}
        },
        "yunshichang": {
            'baidu': {li: 'u2774540', li2: 'u2774541', li3: 'u2774542', li4: 'u2774543'}
        },
        "87DH": {
            'baidu': {li: 'u2776431', li2: 'u2776432', li3: 'u2776433', li4: 'u2776434'}
        },
        "m021_wy017": {
            'baidu': {li: 'u2536442', li2: 'u2713062', li3: 'u2714327', li4: 'u2732092'}
        },
        "dcdc": {
            'baidu': {li: 'u2781935', li2: 'u2781936', li3: 'u2781938', li4: 'u2781939'}
        },
        "m021_404": {
            'baidu': {li: 'u2781960', li2: 'u2781961', li3: 'u2781962', li4: 'u2781963'}
        },
        "zhuomianqdq": {
            'baidu': {li: 'u2782801', li2: 'u2782802', li3: 'u2782803', li4: 'u2782804'}
        },
        "yueguangbh": {
            'baidu': {li: 'u2782821', li2: 'u2782820', li3: 'u2782827', li4: 'u2782826'}
        },
        "wappush": {
            'baidu': {li: 'u2782839', li2: 'u2782840', li3: 'u2782841', li4: 'u2782844'}
        },
        "gwifi": {
            'baidu': {li: 'u2784168', li2: 'u2784169', li3: 'u2784170', li4: 'u2784173'}
        },
        "webdibu": {
            'baidu': {li: 'u2784181', li2: 'u2784182', li3: 'u2784186', li4: 'u2784184'}
        },
        "gouwudating02": {
            'baidu': {li: 'u2784804', li2: 'u2784806', li3: 'u2784808', li4: 'u2784809'}
        },
        "haitun01": {
            'baidu': {li: 'u2786314', li2: 'u2786315', li3: 'u2786316', li4: 'u2786317'}
        },
        "weizhang": {
            'baidu': {li: 'u2787180', li2: 'u2787182', li3: 'u2787183', li4: 'u2787184'}
        },
        "xianguo01": {
            'baidu': {li: 'u2791281', li2: 'u2791283', li3: 'u2791285', li4: 'u2791287'}
        },
        "anquanguanjia": {
            'baidu': {li: 'u2791462', li2: 'u2791463', li3: 'u2791465', li4: 'u2791468'}
        },
        "jinmubiao": {
            'baidu': {li: 'u2793374', li2: 'u2793376', li3: 'u2793379', li4: 'u2793380'}
        },
        "360tianqi": {
            'baidu': {li: 'u2794838', li2: 'u2794839', li3: 'u2794840', li4: 'u2794841'}
        },
        "lemonbrowser02": {
            'baidu': {li: 'u2796973', li2: 'u2796974', li3: 'u2796975', li4: 'u2796977'}
        },
        "ningmengzhuomian01": {
            'baidu': {li: 'u2797062', li2: 'u2797063', li3: 'u2797064', li4: 'u2797066'}
        },
        "liuliangzhuanxiang": {
            'baidu': {li: 'u2798267', li2: 'u2798271', li3: 'u2798272', li4: 'u2798273'}
        },
        "lemonbrowser03": {
            'baidu': {li: 'u2798891', li2: 'u2798893', li3: 'u2798894', li4: 'u2798896'}
        },
        "wochacha": {
            'baidu': {li: 'u2801400', li2: 'u2801401', li3: 'u2801402', li4: 'u2801403'}
        },
        "yingyinxianfeng": {
            'baidu': {li: 'u2801650', li2: 'u2801652', li3: 'u2801653', li4: 'u2801655'}
        },
        "wifidaohang": {
            'baidu': {li: 'u2803821', li2: 'u2803822', li3: 'u2803824', li4: 'u2803825'}
        },
        "chelaile": {
            'baidu': {li: 'u2804387', li2: 'u2804388', li3: 'u2804390', li4: 'u2804392'}
        },
        "kubishouji": {
            'baidu': {li: 'u2805263', li2: 'u2805265', li3: 'u2805266', li4: 'u2805270'}
        },
        "huashengditie": {
            'baidu': {li: 'u2805370', li2: 'u2805371', li3: 'u2805372', li4: 'u2805373'}
        },
        "baimilife": {
            'baidu': {li: 'u2804827', li2: 'u2804828', li3: 'u2804830', li4: 'u2804831'}
        },
        "xhsjsfs": {
            'baidu': {li: 'u2806034', li2: 'u2806037', li3: 'u2806040', li4: 'u2806041'}
        },
        "walidh": {
            'baidu': {li: 'u2806092', li2: 'u2806094', li3: 'u2806096', li4: 'u2806097'}
        },
        "lianlewuxianin": {
            'baidu': {li: 'u2572231', li2: 'u2806198', li3: 'u2806199', li4: 'u2806200'}
        },
        "lianlewuxianin01": {
            'baidu': {li: 'u2806325', li2: 'u2806326', li3: 'u2806327', li4: 'u2806328'}
        },
        "zhicaidao": {
            'baidu': {li: 'u2807221', li2: 'u2807225', li3: 'u2807226', li4: 'u2807228'}
        },
        "yunyingshang01": {
            'baidu': {li: 'u2809955', li2: 'u2809958', li3: 'u2809959', li4: 'u2809960'}
        },
        "lanwawangluossl": {
            'baidu': {li: 'u2810170', li2: 'u2810171', li3: 'u2810172', li4: 'u2810176'}
        },
        "xinjia": {
            'baidu': {li: 'u2811014', li2: 'u2811015', li3: 'u2811017', li4: 'u2811018'}
        },
        "shenmaks": {
            'baidu': {li: 'u2811967', li2: 'u2811968', li3: 'u2811970', li4: 'u2811971'}
        },
        "360rili": {
            'baidu': {li: 'u2812139', li2: 'u2812140', li3: 'u2812141', li4: 'u2812142'}
        },
        "junshu": {
            'baidu': {li: 'u2812391', li2: 'u2812392', li3: 'u2812394', li4: 'u2812395'}
        },
        "youhuatong": {
            'baidu': {li: 'u2812830', li2: 'u2812831', li3: 'u2812832', li4: 'u2812833'}
        },
        "jichangwifi": {
            'baidu': {li: 'u2812842', li2: 'u2812843', li3: 'u2812846', li4: 'u2812847'}
        },
        "xianyou": {
            'baidu': {li: 'u2813192', li2: 'u2813193', li3: 'u2813194', li4: 'u2813195'}
        },
        "zazhisuoping": {
            'baidu': {li: 'u2813507', li2: 'u2813508', li3: 'u2813509', li4: 'u2813510'}
        },
        "kuaiguo": {
            'baidu': {li: 'u2813351', li2: 'u2813354', li3: 'u2813358', li4: 'u2813374'}
        },
        "wifichakanqi": {
            'baidu': {li: 'u2814251', li2: 'u2814259', li3: 'u2814261', li4: 'u2814262'}
        },
        "qunkong": {
            'baidu': {li: 'u2814372', li2: 'u2814373', li3: 'u2814374', li4: 'u2814377'}
        },
        "haibaolicai":{
            'baidu': {li: 'u2816314', li2: 'u2816315', li3: 'u2816317', li4: 'u2816318'}
        },
        "nvfangshensdt":{
            'baidu': {li: 'u2817182', li2: 'u2817183', li3: 'u2817184', li4: 'u2817185'}
        },
        "haibaolicai01":{
            'baidu': {li: 'u2817684', li2: 'u2817685', li3: 'u2817686', li4: 'u2817687'}
        },
        "sytest20":{
            'baidu': {li: 'u2818052', li2: 'u2818053', li3: 'u2818054', li4: 'u2818055'}
        },
        "bdxxl021":{
            'baidu': {li: 'u2819463', li2: 'u2819464', li3: 'u2819467', li4: 'u2819468'}
        },
        "wifipw":{
            'baidu': {
                li: 'xp3a1ecf92f0c3f13ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'zr3a1ecf92f0c3f13fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'ha3a1ecf92f0c3f03ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'ng3a1ecf92f0c3ff39db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "jrqs":{
            'baidu': {li: 'u2818577', li2: 'u2818580', li3: 'u2818582', li4: 'u2818583'}
        },
        "wsxxpush":{
            'sogou': {li: '745037', li2: '745037', li3: '745037', li4: '745037'}
        },
        "wdcx03":{
            'baidu': {li: 'u2819222', li2: 'u2819225', li3: 'u2819226', li4: 'u2819230'}
        },
        "wfbl":{
            'baidu': {li: 'u2819811', li2: 'u2819813', li3: 'u2819814', li4: 'u2819817'}
        },
        "bdxxl022":{
            'baidu': {li: 'u2819529', li2: 'u2819532', li3: 'u2819534', li4: 'u2819535'}
        },
        "bdxxl023":{
            'baidu': {li: 'u2819544', li2: 'u2819545', li3: 'u2819547', li4: 'u2819548'}
        },
        "bdxxl024":{
            'baidu': {li: 'u2819557', li2: 'u2819559', li3: 'u2819561', li4: 'u2819563'}
        },
        "bdxxl025":{
            'baidu': {li: 'u2819573', li2: 'u2819576', li3: 'u2819577', li4: 'u2819579'}
        },
        "bdxxl026":{
            'baidu': {li: 'u2819551', li2: 'u2819553', li3: 'u2819555', li4: 'u2819556'}
        },
        "bdxxl027":{
            'baidu': {li: 'u2819578', li2: 'u2819580', li3: 'u2819584', li4: 'u2819587'}
        },
        "bdxxl028":{
            'baidu': {li: 'u2819598', li2: 'u2819599', li3: 'u2819601', li4: 'u2819602'}
        },
        "bdxxl029":{
            'baidu': {li: 'u2819630', li2: 'u2819632', li3: 'u2819633', li4: 'u2819634'}
        },
        "bdxxl030":{
            'baidu': {li: 'u2819640', li2: 'u2819641', li3: 'u2819642', li4: 'u2819643'}
        },
        "baijiarss":{
            'baidu': {li: 'u2821251', li2: 'u2821252', li3: 'u2821255', li4: 'u2821257'}
        },
        "zmkj":{
            'baidu': {li: 'u2822725', li2: 'u2822726', li3: 'u2822727', li4: 'u2822729'}
        },
        "xzhe":{
            'baidu': {li: 'u2823318', li2: 'u2823321', li3: 'u2823325', li4: 'u2823330'}
        },
        "cjwf":{
            'baidu': {li: 'u2823804', li2: 'u2823805', li3: 'u2823808', li4: 'u2823810'}
        },
        "360zs":{
            'baidu': {li: 'u2824447', li2: 'u2824451', li3: 'u2824454', li4: 'u2824458'}
        },
        "wxsk":{
            'baidu': {li: 'u2825160', li2: 'u2825167', li3: 'u2825170', li4: 'u2825172'}
        },
        "wxsk01":{
            'baidu': {li: 'u2825182', li2: 'u2825184', li3: 'u2825186', li4: 'u2825190'}
        },
        "wxsk02":{
            'baidu': {li: 'u2825207', li2: 'u2825209', li3: 'u2825210', li4: 'u2825214'}
        },
        "llqnz":{
            'baidu': {li: 'u2825973', li2: 'u2825975', li3: 'u2825977', li4: 'u2825979'}
        },
        "llqnz01":{
            'baidu': {li: 'u2825992', li2: 'u2825998', li3: 'u2826002', li4: 'u2826004'}
        },
        "alkj":{
            'baidu': {li: 'u2826045', li2: 'u2826054', li3: 'u2826057', li4: 'u2826060'}
        },
        "kdaohang":{
            'baidu': {li: 'u2826847', li2: 'u2826849', li3: 'u2826851', li4: 'u2826853'}
        },
        "dtsq":{
            'baidu': {li: 'u2827724', li2: 'u2827734', li3: 'u2827736', li4: 'u2827738'}
        },
        "miz":{
            'baidu': {li: 'u2828188', li2: 'u2828190', li3: 'u2828192', li4: 'u2828193'}
        },
        "gtwf":{
            'baidu': {li: 'u2828269', li2: 'u2828271', li3: 'u2828276', li4: 'u2828279'}
        },
        "ltrj":{
            'baidu': {li: 'u2828349', li2: 'u2828351', li3: 'u2828352', li4: 'u2828353'}
        },
        "zdrl":{
            'baidu': {li: 'u2830274', li2: 'u2830277', li3: 'u2830279', li4: 'u2830281'}
        },
        "mrzd":{
            'baidu': {li: 'u2831734', li2: 'u2831735', li3: 'u2831739', li4: 'u2831742'}
        },
        "dxtc":{
            'baidu': {li: 'u2832036', li2: 'u2832037', li3: 'u2832038', li4: 'u2832040'}
        },
        "akly":{
            'baidu': {li: 'u2832405', li2: 'u2832408', li3: 'u2832410', li4: 'u2832411'}
        },
        "52pk":{
            'baidu': {li: 'u2832517', li2: 'u2832521', li3: 'u2832528', li4: 'u2832530'}
        },
        "sgllq":{
            'baidu': {li: 'u2833062', li2: 'u2833063', li3: 'u2833064', li4: 'u2833065'}
        },
        "wxfans":{
            'baidu': {li: 'u2833245', li2: 'u2833247', li3: 'u2833250', li4: 'u2833253'}
        },
        "wxfs":{
            'baidu': {li: 'u2834113', li2: 'u2834114', li3: 'u2834116', li4: 'u2834129'}
        },
        "whhflh":{
            'baidu': {li: 'u2835750', li2: 'u2835751', li3: 'u2835752', li4: 'u2835766'}
        },
        "yuedu":{
            'baidu': {li: 'u2838192', li2: 'u2838195', li3: 'u2838198', li4: 'u2838200'}
        },
        "wfkj":{
            'baidu': {li: 'u2838494', li2: 'u2838496', li3: 'u2838497', li4: 'u2838498'}
        },
        "coolpadbrowser01":{
            'baidu': {li: 'u2838509', li2: 'u2838511', li3: 'u2838514', li4: 'u2838515'}
        },
        "smuc":{
            'baidu': {
                li: 'rp3a1ecf93f0c8f63ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'sq3a1ecf93f0c8f63edb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'vt3a1ecf93f0c8f631db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'zx3a1ecf93f0c8f53bdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "xmgz":{
            'baidu': {li: 'u2840194', li2: 'u2840197', li3: 'u2840199', li4: 'u2840200'}
        },
        "aqy":{
            'baidu': {li: 'u2840181', li2: 'u2840182', li3: 'u2840186', li4: 'u2840203'}
        },
        "zmtb":{
            'baidu': {li: 'u2840461', li2: 'u2840462', li3: 'u2840464', li4: 'u2840465'}
        },
        "hangu02":{
            'baidu': {li: 'u2840432', li2: 'u2840435', li3: 'u2840437', li4: 'u2840438'}
        },
        "dxgj":{
            'baidu': {li: 'u2841299', li2: 'u2841306', li3: 'u2841312', li4: 'u2841320'}
        },
        "2345tqw":{
            'baidu': {li: 'u2841415', li2: 'u2841416', li3: 'u2841417', li4: 'u2841418'}
        },
        "mxtt":{
            'baidu': {
                li: 'hr3a1ecf94f3caf63fdb14798aafed22e01be7dc172fe630fb51322bda',
                li2: 'is3a1ecf94f3caf630db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'jt3a1ecf94f3caf631db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'ku3a1ecf94f3caf538db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "yunyingshang02":{
            'baidu': {
                li: 'wu3a1ecf94f3c9f038db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'xv3a1ecf94f3c9f039db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'yw3a1ecf94f3c9f03adb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'ay3a1ecf94f3c9f03cdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "coolpadbrowser02":{
            'baidu': {
                li: 'de3a1ecf94f2caf031db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'fg3a1ecf94f2caff39db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'ij3a1ecf94f2caff3cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'jk3a1ecf94f2caff3ddb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "173sy":{
            'baidu': {
                li: 'jt3a1ecf94f2c9f631db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'lv3a1ecf94f2c9f539db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'nx3a1ecf94f2c9f53bdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'te3a1ecf94f2c9f531db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "yspdf":{
            'baidu': {
                li: 'ny3a1ecf94f2c9f331db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'se3a1ecf94f2c9f23cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'fr3a1ecf94f2c9f13fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'ht3a1ecf94f2c9f131db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "edkj":{
            'baidu': {
                li: 'lj3a1ecf94f1c9f731db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'mk3a1ecf94f1c9f638db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'pn3a1ecf94f1c9f63bdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'rp3a1ecf94f1c9f63ddb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "sfw":{
            'baidu': {
                li: 'yv3a1ecf94f1c8fe3edb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'zw3a1ecf94f1c8fe3fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'ax3a1ecf94f1c8fe30db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'by3a1ecf94f1c8fe31db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "ydjc":{
            'baidu': {
                li: 'zy3a1ecf94f1c9f331db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'dd3a1ecf94f1c9f23bdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'ff3a1ecf94f1c9f23ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'ii3a1ecf94f1c9f230db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "2345tianqiwang":{
            'baidu': {
                li: 'su3a1ecf94f1cef538db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'tv3a1ecf94f1cef539db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'uw3a1ecf94f1cef53adb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'vx3a1ecf94f1cef53bdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "jcjx01":{
            'baidu': {
                li: 'uj3a1ecf94f1cdf43cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'xm3a1ecf94f1cdf43fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'yn3a1ecf94f1cdf430db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'bq3a1ecf94f1cdf339db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "jcjxgvbj":{
            'baidu': {
                li: 'si3a1ecf94f1cdf230db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'uk3a1ecf94f1cdf138db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'vl3a1ecf94f1cdf139db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'wm3a1ecf94f1cdf13adb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "mreyd":{
            'baidu': {
                li: 'md3a1ecf94f1cdf030db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'ne3a1ecf94f1cdf031db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'qh3a1ecf94f1cdff3adb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'vm3a1ecf94f1cdff3fdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "cha":{
            'baidu': {
                li: 'vi3a1ecf94f0c9f43bdb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'wj3a1ecf94f0c9f43cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'zm3a1ecf94f0c9f43fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'bo3a1ecf94f0c9f431db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "xiaozhinew":{
            'baidu': {
                li: 'qk3a1ecf94f0cff638db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'rl3a1ecf94f0cff639db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'sm3a1ecf94f0cff63adb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'tn3a1ecf94f0cff63bdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "zmnz01":{
            'baidu': {
                li: 'bj3a1ecf94fecbf231db14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'dl3a1ecf94fecbf139db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'em3a1ecf94fecbf13adb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'go3a1ecf94fecbf13cdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "xymini":{
            'baidu': {
                li: 'la3a1ecf94fec3f03ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'od3a1ecf94fec3f030db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'uj3a1ecf94fec3ff3cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'wl3a1ecf94fec3ff3edb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "sgllq01":{
            'baidu': {
                li: 'ri3a1ecf95f7caf43bdb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'sj3a1ecf95f7caf43cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'ul3a1ecf95f7caf43edb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'wn3a1ecf95f7caf430db14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "sgllq02":{
            'baidu': {
                li: 'ph3a1ecf95f7caf23fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'qi3a1ecf95f7caf230db14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'sk3a1ecf95f7caf138db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'um3a1ecf95f7caf13adb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "huisuoping01":{
            'baidu': {
                li: 'tp3a1ecf95f7c2f63ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'uq3a1ecf95f7c2f63edb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'xt3a1ecf95f7c2f631db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'eb3a1ecf95f7c2f53edb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "jyhx":{
            'baidu': {
                li: 'hk3a1ecf95f7c3ff3ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'il3a1ecf95f7c3ff3edb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'kn3a1ecf95f7c3ff30db14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'nr3a1ecf95f6caf63fdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "sfwl":{
            'baidu': {
                li: 'mr3a1ecf95f6caf33adb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'ot3a1ecf95f6caf33cdb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'qv3a1ecf95f6caf33edb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'rw3a1ecf95f6caf33fdb14798aafed22e01be7dc172fe630fb51322bda'
            }
        },
        "10086mz":{
            'baidu': {
                li: 'xk3a1ecf95f6c8f43ddb14798aafed22e01be7dc172fe630fb51322bda', 
                li2: 'yl3a1ecf95f6c8f43edb14798aafed22e01be7dc172fe630fb51322bda', 
                li3: 'zm3a1ecf95f6c8f43fdb14798aafed22e01be7dc172fe630fb51322bda', 
                li4: 'bo3a1ecf95f6c8f431db14798aafed22e01be7dc172fe630fb51322bda'
            }
        }

    }
};
// 注意：下面两个广告ID数组的位置不能轻易调整，否则会影响广告组统计出错。
// 下拉40个广告ID
GLOBAL.Et.ggForPullDown = [
    'rf3a1ecf92f4c3f23ddb14798aafed22e01be7dc172fe630fb51322bda',
    'xl3a1ecf92f4c3f139db14798aafed22e01be7dc172fe630fb51322bda',
    'zn3a1ecf92f4c3f13bdb14798aafed22e01be7dc172fe630fb51322bda',
    'dr3a1ecf92f4c3f13fdb14798aafed22e01be7dc172fe630fb51322bda',
    'ky3a1ecf92f4c3f03cdb14798aafed22e01be7dc172fe630fb51322bda',
    'pe3a1ecf92f4c3f031db14798aafed22e01be7dc172fe630fb51322bda',
    'ti3a1ecf92f4c3ff3bdb14798aafed22e01be7dc172fe630fb51322bda',
    'zo3a1ecf92f4c3ff31db14798aafed22e01be7dc172fe630fb51322bda',
    'fu3a1ecf92f4c3fe3ddb14798aafed22e01be7dc172fe630fb51322bda',
    'jy3a1ecf92f4c3fe31db14798aafed22e01be7dc172fe630fb51322bda',
    'oe3a1ecf92f3caf73cdb14798aafed22e01be7dc172fe630fb51322bda',
    'qg3a1ecf92f3caf73edb14798aafed22e01be7dc172fe630fb51322bda',
    'si3a1ecf92f3caf730db14798aafed22e01be7dc172fe630fb51322bda',
    'wm3a1ecf92f3caf63adb14798aafed22e01be7dc172fe630fb51322bda',
    'zp3a1ecf92f3caf63ddb14798aafed22e01be7dc172fe630fb51322bda',
    'cs3a1ecf92f3caf630db14798aafed22e01be7dc172fe630fb51322bda',
    'eu3a1ecf92f3caf538db14798aafed22e01be7dc172fe630fb51322bda',
    'iy3a1ecf92f3caf53cdb14798aafed22e01be7dc172fe630fb51322bda',
    'md3a1ecf92f3caf530db14798aafed22e01be7dc172fe630fb51322bda',
    'of3a1ecf92f3caf438db14798aafed22e01be7dc172fe630fb51322bda',
    'tk3a1ecf92f3caf43ddb14798aafed22e01be7dc172fe630fb51322bda',
    'vm3a1ecf92f3caf43fdb14798aafed22e01be7dc172fe630fb51322bda',
    'ar3a1ecf92f3caf33adb14798aafed22e01be7dc172fe630fb51322bda',
    'ct3a1ecf92f3caf33cdb14798aafed22e01be7dc172fe630fb51322bda',
    'ia3a1ecf92f3caf238db14798aafed22e01be7dc172fe630fb51322bda',
    'kc3a1ecf92f3caf23adb14798aafed22e01be7dc172fe630fb51322bda',
    'me3a1ecf92f3caf23cdb14798aafed22e01be7dc172fe630fb51322bda',
    'og3a1ecf92f3caf23edb14798aafed22e01be7dc172fe630fb51322bda',
    'ph3a1ecf92f3caf23fdb14798aafed22e01be7dc172fe630fb51322bda',
    'sk3a1ecf92f3caf138db14798aafed22e01be7dc172fe630fb51322bda',
    'um3a1ecf92f3caf13adb14798aafed22e01be7dc172fe630fb51322bda',
    'wo3a1ecf92f3caf13cdb14798aafed22e01be7dc172fe630fb51322bda',
    'yq3a1ecf92f3caf13edb14798aafed22e01be7dc172fe630fb51322bda',
    'cu3a1ecf92f3caf038db14798aafed22e01be7dc172fe630fb51322bda',
    'fx3a1ecf92f3caf03bdb14798aafed22e01be7dc172fe630fb51322bda',
    'ha3a1ecf92f3caf03ddb14798aafed22e01be7dc172fe630fb51322bda',
    'jc3a1ecf92f3caf03fdb14798aafed22e01be7dc172fe630fb51322bda',
    'le3a1ecf92f3caf031db14798aafed22e01be7dc172fe630fb51322bda',
    'pi3a1ecf92f3caff3bdb14798aafed22e01be7dc172fe630fb51322bda',
    'rk3a1ecf92f3caff3ddb14798aafed22e01be7dc172fe630fb51322bda'
];
// GLOBAL.Et.ggForPullDown = ['u2760525', 'u2760523', 'u2760521', 'u2760520', 'u2760518', 'u2760515', 'u2760513', 'u2760511', 'u2760509', 'u2760506', 'u2760504', 'u2760501', 'u2760499', 'u2760497', 'u2760495', 'u2760493', 'u2760491', 'u2760489', 'u2760486', 'u2760482', 'u2763099', 'u2763097', 'u2763096', 'u2763095', 'u2763093', 'u2763092', 'u2763091', 'u2763090', 'u2763089', 'u2763088', 'u2763087', 'u2763086', 'u2763085', 'u2763084', 'u2763083', 'u2763082', 'u2763080', 'u2763079', 'u2763077', 'u2763075'];
// 上拉60个广告ID
GLOBAL.Et.ggForPullUp = [
    'er3a1ecf92f4c3f33adb14798aafed22e01be7dc172fe630fb51322bda',
    'iv3a1ecf92f4c3f33edb14798aafed22e01be7dc172fe630fb51322bda',
    'kx3a1ecf92f4c3f330db14798aafed22e01be7dc172fe630fb51322bda',
    'pd3a1ecf92f4c3f23bdb14798aafed22e01be7dc172fe630fb51322bda',
    'sg3a1ecf92f4c3f23edb14798aafed22e01be7dc172fe630fb51322bda',
    'wk3a1ecf92f4c3f138db14798aafed22e01be7dc172fe630fb51322bda',
    'ao3a1ecf92f4c3f13cdb14798aafed22e01be7dc172fe630fb51322bda',
    'ft3a1ecf92f4c3f131db14798aafed22e01be7dc172fe630fb51322bda',
    'mb3a1ecf92f4c3f03edb14798aafed22e01be7dc172fe630fb51322bda',
    'sh3a1ecf92f4c3ff3adb14798aafed22e01be7dc172fe630fb51322bda',
    'yn3a1ecf92f4c3ff30db14798aafed22e01be7dc172fe630fb51322bda',
    'et3a1ecf92f4c3fe3cdb14798aafed22e01be7dc172fe630fb51322bda',
    'ix3a1ecf92f4c3fe30db14798aafed22e01be7dc172fe630fb51322bda',
    'nd3a1ecf92f3caf73bdb14798aafed22e01be7dc172fe630fb51322bda',
    'uk3a1ecf92f3caf638db14798aafed22e01be7dc172fe630fb51322bda',
    'yo3a1ecf92f3caf63cdb14798aafed22e01be7dc172fe630fb51322bda',
    'br3a1ecf92f3caf63fdb14798aafed22e01be7dc172fe630fb51322bda',
    'dt3a1ecf92f3caf631db14798aafed22e01be7dc172fe630fb51322bda',
    'hx3a1ecf92f3caf53bdb14798aafed22e01be7dc172fe630fb51322bda',
    'ne3a1ecf92f3caf531db14798aafed22e01be7dc172fe630fb51322bda',
    'sj3a1ecf92f3caf43cdb14798aafed22e01be7dc172fe630fb51322bda',
    'wn3a1ecf92f3caf430db14798aafed22e01be7dc172fe630fb51322bda',
    'bs3a1ecf92f3caf33bdb14798aafed22e01be7dc172fe630fb51322bda',
    'hy3a1ecf92f3caf331db14798aafed22e01be7dc172fe630fb51322bda',
    'ld3a1ecf92f3caf23bdb14798aafed22e01be7dc172fe630fb51322bda',
    'nf3a1ecf92f3caf23ddb14798aafed22e01be7dc172fe630fb51322bda',
    'rj3a1ecf92f3caf231db14798aafed22e01be7dc172fe630fb51322bda',
    'vn3a1ecf92f3caf13bdb14798aafed22e01be7dc172fe630fb51322bda',
    'zr3a1ecf92f3caf13fdb14798aafed22e01be7dc172fe630fb51322bda',
    'dv3a1ecf92f3caf039db14798aafed22e01be7dc172fe630fb51322bda',
    'gy3a1ecf92f3caf03cdb14798aafed22e01be7dc172fe630fb51322bda',
    'ib3a1ecf92f3caf03edb14798aafed22e01be7dc172fe630fb51322bda',
    'kd3a1ecf92f3caf030db14798aafed22e01be7dc172fe630fb51322bda',
    'mf3a1ecf92f3caff38db14798aafed22e01be7dc172fe630fb51322bda',
    'sl3a1ecf92f3caff3edb14798aafed22e01be7dc172fe630fb51322bda',
    'wp3a1ecf92f3cafe38db14798aafed22e01be7dc172fe630fb51322bda',
    'at3a1ecf92f3cafe3cdb14798aafed22e01be7dc172fe630fb51322bda',
    'cv3a1ecf92f3cafe3edb14798aafed22e01be7dc172fe630fb51322bda',
    'ga3a1ecf92f3cbf738db14798aafed22e01be7dc172fe630fb51322bda',
    'jd3a1ecf92f3cbf73bdb14798aafed22e01be7dc172fe630fb51322bda',
    'lf3a1ecf92f3cbf73ddb14798aafed22e01be7dc172fe630fb51322bda',
    'oi3a1ecf92f3cbf730db14798aafed22e01be7dc172fe630fb51322bda',
    'rl3a1ecf92f3cbf639db14798aafed22e01be7dc172fe630fb51322bda',
    'tn3a1ecf92f3cbf63bdb14798aafed22e01be7dc172fe630fb51322bda',
    'wq3a1ecf92f3cbf63edb14798aafed22e01be7dc172fe630fb51322bda',
    'ys3a1ecf92f3cbf630db14798aafed22e01be7dc172fe630fb51322bda',
    'bv3a1ecf92f3cbf539db14798aafed22e01be7dc172fe630fb51322bda',
    'ey3a1ecf92f3cbf53cdb14798aafed22e01be7dc172fe630fb51322bda',
    'fa3a1ecf92f3cbf53ddb14798aafed22e01be7dc172fe630fb51322bda',
    'id3a1ecf92f3cbf530db14798aafed22e01be7dc172fe630fb51322bda',
    'je3a1ecf92f3cbf531db14798aafed22e01be7dc172fe630fb51322bda',
    'ni3a1ecf92f3cbf43bdb14798aafed22e01be7dc172fe630fb51322bda',
    'oj3a1ecf92f3cbf43cdb14798aafed22e01be7dc172fe630fb51322bda',
    'ql3a1ecf92f3cbf43edb14798aafed22e01be7dc172fe630fb51322bda',
    'sn3a1ecf92f3cbf430db14798aafed22e01be7dc172fe630fb51322bda',
    'to3a1ecf92f3cbf431db14798aafed22e01be7dc172fe630fb51322bda',
    'vq3a1ecf92f3cbf339db14798aafed22e01be7dc172fe630fb51322bda',
    'xs3a1ecf92f3cbf33bdb14798aafed22e01be7dc172fe630fb51322bda',
    'yt3a1ecf92f3cbf33cdb14798aafed22e01be7dc172fe630fb51322bda',
    'av3a1ecf92f3cbf33edb14798aafed22e01be7dc172fe630fb51322bda'
];
// GLOBAL.Et.ggForPullUp = ['u2760553', 'u2760552', 'u2760551', 'u2760550', 'u2760549', 'u2760548', 'u2760547', 'u2760546', 'u2760545', 'u2760544', 'u2760543', 'u2760542', 'u2760541', 'u2760540', 'u2760539', 'u2760538', 'u2760537', 'u2760536', 'u2760534', 'u2760533', 'u2760532', 'u2760531', 'u2760530', 'u2760529', 'u2760527', 'u2760526', 'u2760524', 'u2760522', 'u2760519', 'u2760517', 'u2760516', 'u2760514', 'u2760512', 'u2760510', 'u2760508', 'u2760507', 'u2760505', 'u2760503', 'u2760502', 'u2760500', 'u2760498', 'u2760496', 'u2760494', 'u2760492', 'u2760490', 'u2760488', 'u2760485', 'u2760481', 'u2760479', 'u2760478', 'u2763059', 'u2763060', 'u2763061', 'u2763062', 'u2763063', 'u2763065', 'u2763067', 'u2763068', 'u2763070', 'u2763071'];

GLOBAL.Et.ggForDsp = [
    'po3a1ecf93f3ccf431db14798aafed22e01be7dc172fe630fb51322bda',
    'qp3a1ecf93f3ccf338db14798aafed22e01be7dc172fe630fb51322bda',
    'rq3a1ecf93f3ccf339db14798aafed22e01be7dc172fe630fb51322bda',
    'ts3a1ecf93f3ccf33bdb14798aafed22e01be7dc172fe630fb51322bda',
    'vu3a1ecf93f3ccf33ddb14798aafed22e01be7dc172fe630fb51322bda',
    'mm3a1ecf93f3ccf13adb14798aafed22e01be7dc172fe630fb51322bda',
    'ss3a1ecf93f3ccf130db14798aafed22e01be7dc172fe630fb51322bda',
    'uu3a1ecf93f3ccf038db14798aafed22e01be7dc172fe630fb51322bda',
    'xx3a1ecf93f3ccf03bdb14798aafed22e01be7dc172fe630fb51322bda',
    'ab3a1ecf93f3ccf03edb14798aafed22e01be7dc172fe630fb51322bda',
    'bc3a1ecf93f3ccf03fdb14798aafed22e01be7dc172fe630fb51322bda',
    'ef3a1ecf93f3ccff38db14798aafed22e01be7dc172fe630fb51322bda',
    'op3a1ecf93f3ccfe38db14798aafed22e01be7dc172fe630fb51322bda',
    'pq3a1ecf93f3ccfe39db14798aafed22e01be7dc172fe630fb51322bda',
    'rs3a1ecf93f3ccfe3bdb14798aafed22e01be7dc172fe630fb51322bda',
    'st3a1ecf93f3ccfe3cdb14798aafed22e01be7dc172fe630fb51322bda',
    'tu3a1ecf93f3ccfe3ddb14798aafed22e01be7dc172fe630fb51322bda',
    'uv3a1ecf93f3ccfe3edb14798aafed22e01be7dc172fe630fb51322bda',
    'bd3a1ecf93f3cdf73bdb14798aafed22e01be7dc172fe630fb51322bda',
    'ce3a1ecf93f3cdf73cdb14798aafed22e01be7dc172fe630fb51322bda',
    'fh3a1ecf93f3cdf73fdb14798aafed22e01be7dc172fe630fb51322bda',
    'hj3a1ecf93f3cdf731db14798aafed22e01be7dc172fe630fb51322bda',
    'jl3a1ecf93f3cdf639db14798aafed22e01be7dc172fe630fb51322bda',
    'ln3a1ecf93f3cdf63bdb14798aafed22e01be7dc172fe630fb51322bda',
    'qs3a1ecf93f3cdf630db14798aafed22e01be7dc172fe630fb51322bda',
    'tv3a1ecf93f3cdf539db14798aafed22e01be7dc172fe630fb51322bda',
    'vx3a1ecf93f3cdf53bdb14798aafed22e01be7dc172fe630fb51322bda',
    'xa3a1ecf93f3cdf53ddb14798aafed22e01be7dc172fe630fb51322bda',
    'yb3a1ecf93f3cdf53edb14798aafed22e01be7dc172fe630fb51322bda',
    'zc3a1ecf93f3cdf53fdb14798aafed22e01be7dc172fe630fb51322bda',
    'xb3a1ecf93f3cdf239db14798aafed22e01be7dc172fe630fb51322bda',
    'ux3a1ecf93f3cdf330db14798aafed22e01be7dc172fe630fb51322bda',
    'tw3a1ecf93f3cdf33fdb14798aafed22e01be7dc172fe630fb51322bda',
    'sv3a1ecf93f3cdf33edb14798aafed22e01be7dc172fe630fb51322bda',
    'qt3a1ecf93f3cdf33cdb14798aafed22e01be7dc172fe630fb51322bda',
    'ps3a1ecf93f3cdf33bdb14798aafed22e01be7dc172fe630fb51322bda',
    'or3a1ecf93f3cdf33adb14798aafed22e01be7dc172fe630fb51322bda',
    'nq3a1ecf93f3cdf339db14798aafed22e01be7dc172fe630fb51322bda',
    'lo3a1ecf93f3cdf431db14798aafed22e01be7dc172fe630fb51322bda',
    'il3a1ecf93f3cdf43edb14798aafed22e01be7dc172fe630fb51322bda'
];
// GLOBAL.Et.ggForDsp = ['u2765641', 'u2765644', 'u2765645', 'u2765647', 'u2765649', 'u2765651', 'u2765653', 'u2765655', 'u2765657', 'u2765658', 'u2765662', 'u2765663', 'u2765665', 'u2765667', 'u2765669', 'u2765671', 'u2765673', 'u2765675', 'u2765677', 'u2765679', 'u2765682', 'u2765683', 'u2765688', 'u2765690', 'u2765692', 'u2765693', 'u2765695', 'u2765697', 'u2765699', 'u2765701'];

/**
 * 只投放搜狗广告的渠道
 * @type {Array}
 */
GLOBAL.Et.onlySogouQid = [
    {qid: 'wifilwsq', ggid: '542152'},
    {qid: 'weimibrowser', ggid: '745021'},
    {qid: '28app', ggid: '745018'},
    {qid: 'yystanchuang', ggid: '745022'},
    {qid: 'juruan', ggid: '745023'},
    {qid: 'weimibrowser01', ggid: '745026'},
    {qid: 'weimibrowser02', ggid: '745027'},
    {qid: 'weimibrowser03', ggid: '745030'},
    {qid: 'weimipush', ggid: '745017'},
    {qid: 'juruan01', ggid: '572718'},
    {qid: 'weimillq', ggid: '745034'}
];

// 双11活动特殊渠道
GLOBAL.Et.dbelevenSpecialQids = ['vivobrowser', 'zhongyangtianqi', 'ucllqsun01', '28app', 'weimipush', 'weimillq', 'weimibrowsermm', 'weimibrowser', 'hangu01', 'hangu', 'cvbrowser', 'weimibrowser03', 'weimibrowser02', 'weimibrowser01', 'xiaozhih5', 'xiaomi', 'shenzhishoudiantong', 'huisuoping', 'coolpadbrowser', 'zjzy', 'zjxw', 'gaosu', 'gaosubrowser', 'aishangbrowser'];
(function(){
	var i = 0,
		ggBaidu = null,
        ggSogou = null,
        ggGdt = null,
        noGgQid = ['tashequ', 'm021_wy001', 'm021_wy002', 'm021_wy083', 'quannengxiangji','ruyizhuomian'];
	try	{
		// 缓存用户id（365天）
	    GLOBAL.Et.uid = Cookies.get('user_id');
	    if (!GLOBAL.Et.uid) {
	        GLOBAL.Et.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
	        Cookies.set('user_id', GLOBAL.Et.uid, { expires: 365, path: '/', domain: 'eastday.com' });
	    }
	    // 缓存渠道号（3天）（渠道不存在得情况下使用默认渠道'null'）
	    GLOBAL.Et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';
	    if (GLOBAL.Et.qid) {
	        Cookies.set('qid', GLOBAL.Et.qid, { expires: 3, path: '/', domain: 'eastday.com' });
	    }
	} catch (e) {
		console.error('set uid and qid has error: \n', e);
	}

	try {

		// 当前渠道广告商数组
	    GLOBAL.Et.ggTypeArr = [];
	    // 当前渠道广告ID数组（渠道无效的情况下使用默认渠道'null'的广告）
	    GLOBAL.Et.gg = GLOBAL.Et.ggData.root[GLOBAL.Et.qid] || GLOBAL.Et.ggData.root['null'];
	    for (i = 0; i < GLOBAL.Et.channelArr.length; i++) {
	        if (GLOBAL.Et.gg && GLOBAL.Et.gg.hasOwnProperty(GLOBAL.Et.channelArr[i])) {
	            GLOBAL.Et.ggTypeArr.push(GLOBAL.Et.channelArr[i]);
	        }
	    }

	    // 对广告ID处理（为了方便获取、判断）
	    ggBaidu = GLOBAL.Et.gg.baidu;
	    ggSogou = GLOBAL.Et.gg.sogou;
	    ggGdt = GLOBAL.Et.gg.gdt;
	    GLOBAL.namespace('GLOBAL.Et.gg.my');
	    // li - baidu/sogou/gdt
	    GLOBAL.Et.gg.my.li = (ggGdt ? (ggGdt.li ? 'gdt_' + ggGdt.li : '') : '') ||
	        (ggBaidu ? (ggBaidu.li ? 'baidu_' + ggBaidu.li : '') : '') ||
	        (ggSogou ? (ggSogou.li ? 'sogou_' + ggSogou.li : '') : '') ||
	        GLOBAL.Et.ggData.root['null'].baidu.li;
	    // li2 - baidu/sogou/gdt
	    GLOBAL.Et.gg.my.li2 = (ggGdt ? (ggGdt.li2 ? 'gdt_' + ggGdt.li2 : '') : '') ||
	        (ggBaidu ? (ggBaidu.li2 ? 'baidu_' + ggBaidu.li2 : '') : '') ||
	        (ggSogou ? (ggSogou.li2 ? 'sogou_' + ggSogou.li2 : '') : '') ||
	        GLOBAL.Et.ggData.root['null'].baidu.li2;
        // li3 - baidu/sogou/gdt
        GLOBAL.Et.gg.my.li3 = (ggGdt ? (ggGdt.li3 ? 'gdt_' + ggGdt.li3 : '') : '') ||
            (ggBaidu ? (ggBaidu.li3 ? 'baidu_' + ggBaidu.li3 : '') : '') ||
            (ggSogou ? (ggSogou.li3 ? 'sogou_' + ggSogou.li3 : '') : '') ||
            GLOBAL.Et.ggData.root['null'].baidu.li3;
	    // li4 - baidu/sogou/gdt
	    GLOBAL.Et.gg.my.li4 = (ggGdt ? (ggGdt.li4 ? 'gdt_' + ggGdt.li4 : '') : '') ||
	        (ggBaidu ? (ggBaidu.li4 ? 'baidu_' + ggBaidu.li4 : '') : '') ||
	        (ggSogou ? (ggSogou.li4 ? 'sogou_' + ggSogou.li4 : '') : '') ||
	        GLOBAL.Et.ggData.root['null'].baidu.li4;
	} catch (e) {
		console.error('广告处理出现问题: \n', e);
	}

    // 无广告情况处理
    try {
        if(noGgQid.contains(GLOBAL.Et.qid)){
            GLOBAL.Et.gg.my.nogg = true;
            GLOBAL.Et.gg.my.li = null;
            GLOBAL.Et.gg.my.li2 = null;
            GLOBAL.Et.gg.my.li3 = null;
            GLOBAL.Et.gg.my.li4 = null;
        }
    } catch (e) {console.error(e);}

}());

try {
     /*嵩恒_头条_h5_wifijl_度宝li*/ 
    if(GLOBAL.Et.qid === 'wifijl'){
        document.write('<scr' + 'ipt type="text/javascript">var cpro_id = "u2756441";</scr' + 'ipt><scr' + 'ipt src="//cpro.baidustatic.com/cpro/ui/cm.js" type="text/javascript"></scr' + 'ipt>');
    }
} catch (e) {
    console.error('wifijl_度宝li has error: \n', e);
}

try {
    // 苹果助手渠道 
    // 去掉或替换(<link rel="apple-touch-icon-precomposed" href="//mini.eastday.com/toutiaoh5/img/favicon.ico">)
    if(GLOBAL.Et.qid && GLOBAL.Et.qid.indexOf('pgzskjfs') > -1){
        $('link[rel="apple-touch-icon-precomposed"]').remove();
    }
} catch (e) {
    console.error('favicon.ico has error: \n', e);
}

/* global window */
/* global WeixinJSBridge */
try {
    if(GLOBAL.Browser && GLOBAL.Browser.wechat){
        if(!!Cookies.get('DFTT_DETAIL_TO_INDEX')){
            window.history.pushState({}, document.title, "?ps");
            Cookies.remove('DFTT_DETAIL_TO_INDEX');
        }
        var bool=false;
        window.addEventListener("popstate", function() {
            // 防止微信中一进入就触发"popstate"事件
            if(bool){
                // 微信端
                window.WeixinJSBridge && WeixinJSBridge.invoke('closeWindow', {}, function() {});   // jshint ignore:line
            }
        }, false);
        // 设置延时是为了解决：在微信中进入页面就触发了popstate事件
        setTimeout(function(){
            bool=true;
        }, 2000);
    }
} catch (e) {console.error(e);}

// 为了方便后续判断，在此提取出只有搜狗广告的ID。
try {
    var onlySogouQid = GLOBAL.Et.onlySogouQid,
        len = onlySogouQid.length;
    GLOBAL.Et.onlySogouGgId = null;
    for (var i = 0; i < len; i++) {
        if(GLOBAL.Et.qid === onlySogouQid[i].qid){
            GLOBAL.Et.onlySogouGgId = onlySogouQid[i].ggid;
            break;
        }
    }
} catch (e) {}
    return GLOBAL;
})

