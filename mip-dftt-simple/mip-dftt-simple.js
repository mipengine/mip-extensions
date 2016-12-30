define(function(require){
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Cookies=require("./lib/js.cookie");
    var WebStorageCache=require("./lib/web-storage-cache.min");
    var GLOBAL=require("./lib/global1");
    // GLOBAL=require("./lib/gg1");
    var channelsUrl = 'https://mini.eastday.com/toutiaoh5/data/channels.json',  // 新闻频道类别 
        /* ------------------------------------------------------------ */
        refreshUrl = 'http://123.59.62.164/toutiao_h5/RefreshJP',        // 刷新数据(测试)
        pullDownUrl = 'http://123.59.62.164/toutiao_h5/pulldown',        // 下拉加载(测试)
        pullUpUrl = 'http://123.59.62.164/toutiao_h5/NextJP',            // 上拉加载(测试)
        
        /* ------------------------------------------------------------ */
        positionUrl = 'https://position.dftoutiao.com/position/get',            // 获取用户位置
        moodUrl = 'https://toutiao.eastday.com/pjson/zan',                  // 美女点赞（点踩）
        /* ------------------------------------------------------------ */
        logUrl = 'http://123.59.60.170/getwapdata/data',             // 日志（操作统计）(测试)
        onlineUrl = 'http://123.59.60.170/online/online',            // 在线统计(测试)
        showAdLogUrl = 'http://123.59.60.170/getwapdata/advshow',    // 推广信息show统计接口(测试)
        clickAdLogUrl = 'http://106.75.73.203/getwapdata/partner',       // 推广信息show统计接口(测试)
        /* ------------------------------------------------------------ */
        $bannerDiv = '',
        // bannerUrl = 'http://123.59.62.164/partner/banner',
        bannerUrl = 'https://softwords.dftoutiao.com/partner/banner',
        dspUrl = 'http://123.59.62.164/partner/list';   // dsp广告接口（测试）
        // dspUrl = 'http://106.75.73.203/partner/list',    // dsp广告接口
        // dspUrl = 'https://softwords.dftoutiao.com/partner/list',    // dsp广告接口
    var $topMenu = ("#J_top_menu"),
        type = "click",
        newsType = "toutiao",
        $body = $('body'),
        newsTypeArr_all = [],
        newsTypeArr_special = [],
        // tempGgForPullUp = GLOBAL.Et.ggForPullUp.concat(),   // 绝对不能直接赋值
        // tempGgForPullDown = GLOBAL.Et.ggForPullDown.concat(),   // 绝对不能直接赋值
        // tempGgForDsp = GLOBAL.Et.ggForDsp.concat(), // 绝对不能直接赋值
        $loation = $('#J_location'),
        $newsList = $('#J_news_list'),
        $refresh = $('#J_refresh'),
        $newsTabsWrap = $('#J_top_menu'),
        $ggBaidu = $('#J_gg_baidu_id'),
        $ggSogou = $('#J_gg_sogou_id'),
        praiseTrampleFlag = true,
        startPos = 0,               // 滑动开始位置
        touchDistance = 0,          // 滑动距离
        touchDistanceFlag = true,   // 滑动方向判断标志
        isSwipeDown = false,        // 确定向下滑
        isTop = false,              // 顶部判断标志
        $pullDownLoading = null,    // 下拉动画
        TOUCH_DISTANCE = 150,       // 规定滑动加载距离
        pullDownLoadDataTimer = null,       // 规定滑动加载距离
        wsCache = new WebStorageCache(),    // 本地存储对象
        onlineTimer = null,
        isThanAndroid4 = true,  // 安卓4.0以上
        isFirstPage = false,    // 第一屏（即前20条新闻）加载的是渠道对应的百度广告ID
        videoCtg = [
            {name: '推荐', value: 'vtuijian'},
            {name: '搞笑', value: 'vgaoxiao'},
            {name: '拍客', value: 'vpaike'},
            {name: '资讯', value: 'vzixun'},
            {name: '纪录片', value: 'vjilupian'},
            {name: '公益', value: 'vgongyi'},
            {name: '体育', value: 'vtiyu'},
            {name: '汽车', value: 'vqiche'},
            {name: '科技', value: 'vkeji'},
            {name: '财经', value: 'vcaijing'},
            {name: '娱乐', value: 'vyule'},
            {name: '原创', value: 'vyuanchuang'},
            {name: '旅游', value: 'vlvyou'},
            {name: '时尚', value: 'vshishang'},
            {name: '亲子', value: 'vqinzi'},
            {name: '教育', value: 'vjiaoyu'},
            {name: '游戏', value: 'vyouxi'},
            {name: '生活', value: 'vshenghuo'}
        ],
        tempVideoCtg = [],
        currentVideoCtg = {},
        shownVideoCtg = [],
        picCtg = [
            {name: '博览', value: 'pbolan'},
            {name: '搞笑', value: 'pgaoxiao'},
            {name: '美女', value: 'pmeinv'},
            {name: '军事', value: 'pjunshi'},
            {name: '娱乐', value: 'pyule'},
            {name: '体育', value: 'ptiyu'},
            {name: '历史', value: 'plishi'},
            {name: '汽车', value: 'pqiche'},
            {name: '自然', value: 'pziran'},
            {name: '时尚', value: 'pshishang'},
            {name: '科技', value: 'pkeji'},
            {name: '游戏', value: 'pyouxi'},
            {name: '家居', value: 'pjiaju'},
            {name: '旅游', value: 'plvyou'}
        ],
        $picCtgWrap = null;

    try {
        // android 4.0以下不放视频
        if(navigator.userAgent.indexOf('Android') >= 0 && Number(GLOBAL.Util.getOsType().split(' ')[1]) < 4.1){
            isThanAndroid4 = false;
        }
    } catch (e) {
        console.error(e);
    }
    /** [bindEven 绑定事件]
     *
     * @param {Object} element [mip-ajax-data元素]
     * @param {Object} params [来自mip-ajax-data的属性]
     * @param {Booleans} once [是否只执行一次]
     */
    function bindEven(element, params, once) {
        $(element).on("click", 'span', function() {
            wsCache.set('prev_newstype', en.newsType, { exp: 40 * 60});
            wsCache.set('current_newstype', params, {exp: 40 * 60});
            // 更新当前频道
            en.newsType = params;
            // 刷新数据
            en.refreshData(function(){
                en.highlightPraiseTrample();
            });
            // 日志收集
            en.addLog();
        });
        
    }

    /** [构造元素，只会运行一次]
     *
     */
    customElement.prototype.build = function() {
        var self = this;
        var element = this.element;
        var params=$(element).data("type");
        bindEven(element, params,true);
    };
    /**
     * 东方头条对象
     */
    function EastNews(){
        var ct = GLOBAL.Util.getQueryString('type');
        var currentNewsType = ct ? ct : wsCache.get('current_newstype');
        this.newsType = currentNewsType ? currentNewsType : 'toutiao';  // 新闻频道类别
        this.vnewsType = wsCache.get('vnewstype') || 'vtuijian';    // 默认：推荐
        this.pnewsType = wsCache.get('pnewstype') || 'pbolan';  // 默认：博览
        this.readUrl = '';
        this.userId = GLOBAL.Et.uid || Cookies.get('user_id');          // 用户ID
        this.idx = 0;               // 链接索引
        this.pgNum = 1;             // 页码
        this.pulldown_pgNum = 0;    // 下拉页码
        this.pulldown_idx = 0;      // 下拉链接索引
        this.pulldown_num = 0;      // 下拉计数
        // this.toType = GLOBAL.Util.getQueryString('type');    // 
        this.qid = GLOBAL.Et.qid || GLOBAL.Util.getQueryString('qid') || Cookies.get('qid');    // 渠道ID
        this.pullUpFlag = true;     // 上拉加载数据(防止操作过快多次加载)
        this.startKey = {};
        this.endKey = {};
        this.osType = GLOBAL.Util.getOsType();
        this.browserType = GLOBAL.Util.getBrowserType();
    }
    EastNews.prototype={
        /**
         * 初始化
         */
        init: function(){
            var scope = this;
            // 设置广告ID（每次刷新需要设置广告ID，防止广告空白不显示）
            // scope.setGgId();

            /* 获取、存储qid */
            // if(scope.qid){
            //  scope.setQid(scope.qid);
            // } else {
            //  // 无qid的情况，删除cookie中qid
            //  Cookies.remove('qid', {path: '/', domain: 'eastday.com'});
            // }

            /* 获取、存储uid */
            if(!scope.userId){
                scope.userId = (+new Date()) + Math.random().toString(10).substring(2, 6);
                Cookies.set('user_id', scope.userId, { expires: 365, path: '/', domain: 'eastday.com'});
            }

            /* 获取缓存中的已阅读新闻 */
            scope.readUrl = wsCache.get('read_url_all');
            if(!scope.readUrl){scope.readUrl = '';}

            /* 加载新闻频道类别 */
            // scope.initChannels(function(){
            //     alert("initChannels-call");
            //     var $newsTabs = $newsTabsWrap.children('li');
            //     /* 保存所有新闻类别到数组 */
            //     $newsTabs.each(function(){
            //         var $this = $(this),
            //             type = $this.data('type');
            //         // newsTypeArr_all.push(type);
            //         if(type === 'meinv' || type === 'nuanwen'){
            //             newsTypeArr_special.push(type);
            //         }
            //     });

            //     // 插入“视频”频道
            //     $newsTabs.eq($newsTabs.length < 3 ? $newsTabs.length : 2).after('<li data-type="shipin"><mip-dftt-data data-type="shipin"><span>视频</span></mip-dftt-data></li>');
            //     // 插入“图片”频道
            //     $newsTabs.eq($newsTabs.length < 5 ? $newsTabs.length : 4).after('<li data-type="tupian"><mip-dftt-data data-type="tupian"><span>图片</span></mip-dftt-data></li>');
            //     // 插入“奥运”频道
            //     // $newsTabs.eq(0).after('<a data-type="aoyun">奥运</a>');
                
            //     /* 设置当前位置信息 */
            //     // if(wsCache.get('location')){
            //     //     scope.updateDomLocation(wsCache.get('location'));
            //     // } else {
            //     //     scope.location();
            //     // }

            // });
            
            /* 首次加载数据 */
            scope.refreshData(function(){
                scope.highlightPraiseTrample();
            });

            // 记录一次日志（如果是从内页跳转过来的，不需要记录日志，因为内页已经记录过了。）
            if(Cookies.get('FROM_DETAILS_MORE_NEWS') !== '1'){
                scope.addLog();
                // 删除内页跳首页标志
                Cookies.remove('FROM_DETAILS_MORE_NEWS', {path: '/', domain: 'eastday.com'});
            }

            /* 注册下拉事件 */
            scope.pullDown();

            /* 频道类别（菜单）点击事件 */
            // $newsTabsWrap.on('click', 'a', function(){
            //     var $this = $(this),
            //         type = $this.data('type');
            //     if($this.hasClass('active')){
            //         return;
            //     }
            //     // 使当前频道分类显示在导航菜单中间
            //     scope.scrollTo($this, false);
            //     // 存储上一个新闻类别和当前新闻类别
            //     wsCache.set('prev_newstype', scope.newsType, { exp: 40 * 60});
            //     wsCache.set('current_newstype', type, {exp: 40 * 60});
            //     // 更新当前频道
            //     scope.newsType = type;
            //     // 刷新数据
            //     scope.refreshData(function(){
            //         scope.highlightPraiseTrample();
            //     });
            //     // 日志收集
            //     scope.addLog();
            // });
            
            /* 页面滚动监听（当滑到底部时，加载下一页数据。） */
            $(window).on('scroll', function() {
                var scrollTop = GLOBAL.Util.getScrollTop(),
                    loadingOT = Number($('#J_loading').offset().top) - 100,
                    cHeight = GLOBAL.Util.getClientHeight(),
                    timer = null;

                // 缓存当前类别新闻的浏览位置（缓存20分钟）,延迟缓存
                timer && clearTimeout(timer);   // jshint ignore:line
                timer = setTimeout(function(){
                    wsCache.set('news_pos_' + scope.newsType, scrollTop, {exp: 40 * 60});
                }, 200);
                
                // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载)
                if(loadingOT >= cHeight && scrollTop + cHeight >= loadingOT && scope.pullUpFlag){
                    scope.pullUpLoadData();
                }

                // 视频出了屏幕暂停
                $newsList.find('video').each(function(){
                    var $video = $(this),
                        videoTop = $video.offset().top,
                        scrollTop = $body.scrollTop();
                    if(scrollTop >= videoTop || videoTop - scrollTop >= $(window).height() - $video.height()){
                        if(!this.paused){
                            this.pause();
                        }
                    }
                });
            });

            /* 刷新数据 */
            $refresh.on('click', function(){
                if($refresh.hasClass('active')){
                    return;
                }
                scope.reloadData();
            });

            /* 记录阅读过的新闻 */
            $newsList.on('click', 'a', function(){
                var $this = $(this),
                    url = $this.attr('href').split('?')[0];
                url = url.substring(url.lastIndexOf('/') + 1, url.indexOf('.html'));
                scope.cacheReadUrl(url, $this.data('type'), $this.data('subtype'));
                // 点击新闻时，暂停播放中的视频
                $newsList.find('video').each(function(){
                    if(!this.paused){
                        this.pause();
                    }
                });
            });

            /**
             * 赞/踩点击事件
             * @param  {Zepto Object} $target 当前dom对象
             * @param  {String} colname 参数
             * @param  {Number} ctg     类别（1：赞，-1：踩）
             * @return {[type]}         [description]
             */
            function ptClick($target, colname, ctg){
                var rk = $target.data('rowkey'),
                    st = scope.getPraiseTrampleStatus(rk);
                // 已经赞过、踩过就不允许再操作了
                if(st === 1){
                    alert('您已经赞过了！');
                    return;
                } else if(st === -1){
                    alert('您已经踩过了！');
                    return;
                }
                // 防止连点
                if(!praiseTrampleFlag){
                    return;
                }
                praiseTrampleFlag = false;
                $target.addClass('active').text(Number($target.text()) + 1);
                $.ajax({
                    url: moodUrl,
                    dataType : 'jsonp',
                    data : {
                        "colname" : colname,    // 'z0000'、'zd0000'
                        "rowkey" : rk,
                        "praisecnt" : 1
                    },
                    jsonp : 'jsonpcallback',
                    success : function() {
                        scope.cachePraiseTrampleRowkey(ctg, rk);
                        praiseTrampleFlag = true;
                    },
                    error: function(e){
                        console.error(e);
                    }
                });
            }

            /* 已浏览位置，点击刷新事件 */
            $body.on('click', '.J-read-position', function(){
                $body.scrollTop(0);
                // 刷新按钮动画效果
                scope.changeRefreshStatus();
                // 调用下拉加载数据接口
                scope.pullDownLoadData();
            });

            // 推广新闻点击委托事件
            $body.on('click', '.J-promote-news', function(e){
                e.preventDefault();
                var $this = $(this),
                    advUrl = $this.attr('href'),
                    advId = $this.attr('data-advid'),
                    adpgnum = $this.attr('data-adpgnum'),
                    adposition = $this.attr('data-adposition'),
                    clickbackurl = $this.attr('data-clickbackurl'),
                    platform = $this.attr('data-platform'),
                    accurateurl = $this.attr('data-accurateurl');
                scope.sendPromoteNewslog({
                    advUrl: advUrl,
                    advId: advId,
                    accurateurl: accurateurl,
                    adpgnum: adpgnum,
                    adposition: adposition,
                    platform: platform,
                    clickbackurl: clickbackurl,
                    callback: function(){
                        window.location.href = advUrl;
                    }
                });
            });

            // 视频中分类推荐点击事件委托
            $body.on('click', '.J-video-ctg', function(){
                scope.vnewsType = $(this).attr('data-type');
                // 缓存当前视频de类别（缓存20分钟）
                wsCache.set('vnewstype', scope.vnewsType, {exp: 40 * 60});
                // 清空缓存的类别数组
                shownVideoCtg = [];
                // 清空内容
                $newsList.empty();
                scope.reloadData();
            });

            /* 赞 */
            $newsList.on('click', '.J-good', function(){
                ptClick($(this), 'z0000', 1);
            });

            /* 踩 */
            $newsList.on('click', '.J-bad', function(){
                ptClick($(this), 'zd0000', -1);
            });

            /* 在线日志 */
            scope.addOnlineLog();
            onlineTimer = setInterval(function(){
                scope.addOnlineLog();
            }, 10000);
            // 10分钟之后不再上传online日志
            setTimeout(function(){
                clearInterval(onlineTimer);
            }, 10 * 60 * 1000);
        },
        /**
         * 注册下拉事件
         * @return {[type]}            [description]
         */
        pullDown: function(){
            var scope = this,
                svgTop = 0;
            $newsList.on('touchstart', function(e){
                // 防止重复快速下拉
                clearTimeout(pullDownLoadDataTimer);
                startPos = e.touches[0].pageY;
                if($body.scrollTop() <= 0){
                    isTop = true;
                } else {
                    isTop = false;
                }
                if(!$pullDownLoading){
                    svgTop = ($('header').height() - 40);
                    $pullDownLoading = $('<svg id="J_svg" class="svg" style="top: ' + svgTop + 'px"><g id="J_svg_g"><marker id="J_svg_marker" markerWidth="10" markerHeight="10" refX="0" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L0,10 L5,5 L0,0" style="fill: #d43d3d;"></path></marker><path stroke-width="3.5" stroke-linecap="round" id="J_svg_path" marker-end="url(#J_svg_marker)" d="M20,9 A11,11 0 1,1 10.5,14.5" style="stroke: #d43d3d; fill: none;"></path><circle id="J_svg_circle" class="path" fill="none" stroke-width="3.5" stroke-linecap="round" cx="25" cy="25" r="11"></circle></g></svg>');
                } else {
                    $pullDownLoading.removeClass('active').css({
                        'display': 'block',
                        'opacity': 0,
                        'top': svgTop,
                        'transform': 'translateY(0px)',
                        '-webkit-transform': 'translateY(0px)'
                    });
                }
            });
            $newsList.on('touchend', function(){
                // 达到下拉阈值 启动数据加载
                if(isSwipeDown){
                    if(touchDistance >= TOUCH_DISTANCE){
                        $pullDownLoading.animate({
                            // 'transform': 'rotate(0deg)',
                            // '-webkit-transform': 'rotate(0deg)',
                            'top': (svgTop + (TOUCH_DISTANCE / 3)) + 'px'
                        }, 'fast', function(){
                            $pullDownLoading && $pullDownLoading.addClass('active');    // jshint ignore:line
                            clearTimeout(pullDownLoadDataTimer);
                                pullDownLoadDataTimer = setTimeout(function(){
                                // 美女无pulldown接口
                                if(scope.newsType === 'meinv'){
                                    $pullDownLoading && $pullDownLoading.remove();  // jshint ignore:line
                                } else {
                                    scope.changeRefreshStatus();
                                    scope.pullDownLoadData(function(){
                                        setTimeout(function(){
                                            if($pullDownLoading){
                                                $pullDownLoading.fadeOut('fast', function(){
                                                    $pullDownLoading.remove();
                                                });
                                            }
                                        }, 500);
                                    });
                                }
                            }, 200);
                        });
                    } else {    
                        $pullDownLoading && $pullDownLoading.animate({
                            'opacity': 0,
                            // 'translateY': '0',
                            'top': svgTop
                        }, 'fast', function(){
                            $pullDownLoading.remove();
                        }); // jshint ignore:line
                    }
                }
                touchDistanceFlag = true;
                isSwipeDown = false;
            });
            $newsList.on('touchmove', function(e){
                var py = e.touches[0].pageY;
                touchDistance = py - startPos;
                // 根据用户开始的滑动手势判断用户是向下滑还是向上滑
                if(isTop && touchDistanceFlag && touchDistance > 0){
                    isSwipeDown = true;
                    // 根据刚开始的滑动值进行判断，后面用户无论怎么滑都不会触发浏览器滚动。
                    touchDistanceFlag = false;
                }
                if(isTop && isSwipeDown){
                    if($body.find('.svg').length === 0){
                        $pullDownLoading.appendTo('body');
                    }
                    // 下拉加载
                    if(touchDistance >= TOUCH_DISTANCE){
                        $pullDownLoading.find('#J_svg_marker>path').attr('style', 'fill:#2a90d7');
                        $pullDownLoading.find('#J_svg_g>path').attr('style', 'stroke:#2a90d7;fill:none');
                        if(touchDistance >= TOUCH_DISTANCE + 80){
                            touchDistance = TOUCH_DISTANCE + 80;
                        }
                    } else {
                        $pullDownLoading.find('#J_svg_marker>path').attr('style', 'fill:#d43d3d');
                        $pullDownLoading.find('#J_svg_g>path').attr('style', 'stroke:#d43d3d;fill:none');
                    }
                    $pullDownLoading.css({
                        'opacity': touchDistance / TOUCH_DISTANCE,
                        'transform': 'rotate(' + touchDistance / TOUCH_DISTANCE * 720 + 'deg)',
                        '-webkit-transform': 'rotate(' + touchDistance / TOUCH_DISTANCE * 720 + 'deg)',
                        'top': (svgTop + (touchDistance / 3)) + 'px'
                    });
                    e.preventDefault();
                }
            });
        },
        /**
         * 日志收集
         */
        addLog: function(){
            var pixel = GLOBAL.Util.getPixel(),
                scope = this;
            var obj={
                    qid: scope.qid || 'null',                       // 渠道号
                    uid: scope.userId || 'null',                        // 从服务器端获取的uid
                    softtype: 'news',                   // 软件type（当前默认news）
                    softname: 'eastday_wapnews',        // 软件名（当前默认eastday_wapnews）
                    newstype: scope.newsType || 'null',         // 当前新闻类别
                    from: wsCache.get('prev_newstype') || 'null',   // url上追加的fr字段
                    to: wsCache.get('current_newstype') || 'null',// 当前页面
                    os_type: scope.osType || 'null',                // 客户端操作系统
                    browser_type: scope.browserType || 'null',      // 客户端浏览器类别
                    pixel: pixel.w + '*' + pixel.h,     // 客户端分辨率
                    fr_url: GLOBAL.Util.getReferrer() || 'null',    // 浏览器的refer属性
                    loginid: 'null',            // App端分享新闻时url上追加的ttaccid
                    ime: 'null',                    // App端用户imei号
                    idx: 'null',                    // 当前新闻的idx属性
                    ishot: 'null',                  // 当前新闻是不是热点新闻
                    ver: 'null',                    // App版本（1.2.9）url上追加的ver
                    appqid: 'null',                 // App渠道号url上追加的appqid
                    ttloginid: 'null',              // App端分享新闻时url上追加的ttloginid
                    apptypeid: 'null',              // App端的软件类别url上追加的apptypeid
                    appver: 'null',                 // App版本（010209）url上追加的appver
                    recommendtype: 'null',          // 推荐新闻类别url上追加的recommendtype
                    ispush: 'null'                  // 是不是推送新闻url上追加的ispush
                };
            // 发送操作信息
            $.ajax({
                url: logUrl,
                data: {
                    qid: scope.qid || 'null',                       // 渠道号
                    uid: scope.userId || 'null',                        // 从服务器端获取的uid
                    softtype: 'news',                   // 软件type（当前默认news）
                    softname: 'eastday_wapnews',        // 软件名（当前默认eastday_wapnews）
                    newstype: scope.newsType || 'null',         // 当前新闻类别
                    from: wsCache.get('prev_newstype') || 'null',   // url上追加的fr字段
                    to: wsCache.get('current_newstype') || 'null',// 当前页面
                    os_type: scope.osType || 'null',                // 客户端操作系统
                    browser_type: scope.browserType || 'null',      // 客户端浏览器类别
                    pixel: pixel.w + '*' + pixel.h,     // 客户端分辨率
                    fr_url: GLOBAL.Util.getReferrer() || 'null',    // 浏览器的refer属性
                    loginid: 'null',            // App端分享新闻时url上追加的ttaccid
                    ime: 'null',                    // App端用户imei号
                    idx: 'null',                    // 当前新闻的idx属性
                    ishot: 'null',                  // 当前新闻是不是热点新闻
                    ver: 'null',                    // App版本（1.2.9）url上追加的ver
                    appqid: 'null',                 // App渠道号url上追加的appqid
                    ttloginid: 'null',              // App端分享新闻时url上追加的ttloginid
                    apptypeid: 'null',              // App端的软件类别url上追加的apptypeid
                    appver: 'null',                 // App版本（010209）url上追加的appver
                    recommendtype: 'null',          // 推荐新闻类别url上追加的recommendtype
                    ispush: 'null'                  // 是不是推送新闻url上追加的ispush
                },
                dataType: 'jsonp',
                jsonp: 'jsonpcallback',
                success: function(){},
                error: function(){console.error(arguments);}
            });
        },

        /**
         * 收集在线日志
         */
        addOnlineLog: function(){
            var scope = this,
                infostr = GLOBAL.Util.getUrlNoParams() + '\t' + scope.userId + '\t' + scope.qid + '\tnull\tnull\tnull\t' + scope.newsType + '\t10' + '\tnull\tnull\t' + scope.osType + '\tnull';
            $.ajax({
                url : onlineUrl,
                data:{
                    param: encodeURI(infostr)
                },
                dataType : 'jsonp',
                jsonp : 'jsonpcallback'
            });
        },

        /**
         * 刷新数据
         * @param {Function} callback 回调方法
         * @return {[type]} [description]
         */
        refreshData: function(callback){
            var scope = this,
                cacheNews = wsCache.get('news_' + scope.newsType),
                cachePos = wsCache.get('news_pos_' + scope.newsType);
                // cacheGgIdsForPullUp = [],
                // cacheGgIdsForDsp = [],
                // cacheGgIdsForPullDown = [];
            // 活动banner
            try {
                scope.getBannerData();
            } catch (e) {console.error(e);}
            // 更新频道广告ID
            // tempGgForPullUp = GLOBAL.Et.ggForPullUp.concat();
            // tempGgForDsp = GLOBAL.Et.ggForDsp.concat();
            // tempGgForPullDown = GLOBAL.Et.ggForPullDown.concat();
            if(cacheNews){
                console.log("cacheNews")
                $newsList.html(cacheNews);
                // 页面滚到记录的位置处
                if(typeof cachePos === 'number'){
                    $body.scrollTop(cachePos);
                }
                callback && callback(); // jshint ignore:line
                if(scope.newsType === 'tupian'){
                    // 如果是图片频道，需要添加图片分类
                    scope.loadPicCtg();
                } else {
                    // 否则删除图片分类
                    scope.clearPicCtg();
                }
                // 获取上拉加载了的缓存的百度ID 
                // cacheGgIdsForPullUp = wsCache.get('bdggid_pullup_' + scope.newsType) || [];
                // tempGgForPullUp = GLOBAL.Array.difference(GLOBAL.Et.ggForPullUp, cacheGgIdsForPullUp);
                // // 获取上拉加载了的缓存的百度ID 
                // cacheGgIdsForDsp = wsCache.get('bdggid_dsp_' + scope.newsType) || [];
                // tempGgForDsp = GLOBAL.Array.difference(GLOBAL.Et.ggForDsp, cacheGgIdsForDsp);
                // // 获取下拉加载了的缓存的百度ID
                // cacheGgIdsForPullDown = wsCache.get('bdggid_pulldown_' + scope.newsType) || [];
                // tempGgForPullDown = GLOBAL.Array.difference(GLOBAL.Et.ggForPullDown, cacheGgIdsForPullDown);
            } else {
                console.log("else")
                // 未找到缓存的新闻，就删除缓存的广告ID 和 缓存的下拉叠加新闻的idx
                // wsCache.delete('bdggid_pullup_' + scope.newsType);  // jshint ignore:line
                // wsCache.delete('bdggid_dsp_' + scope.newsType); // jshint ignore:line
                // wsCache.delete('bdggid_pulldown_' + scope.newsType);    // jshint ignore:line
                wsCache.delete('pulldown_idx_' + scope.newsType);   // jshint ignore:line
                wsCache.set('pgnum_' + scope.newsType, 1, { exp: 40 * 60});
                scope.pgNum = 1;
                // 非视频新闻
                if(scope.newsType === 'shipin'){    // 视频频道新闻
                    // 获取阅读历史
                    scope.readUrl = scope.getVideoReadUrl();
                    scope.loadVideoData(callback);
                } else if (scope.newsType === 'tupian'){    // 图片频道新闻
                    // 获取阅读历史
                    scope.readUrl = scope.getPicReadUrl();
                    scope.loadPicData(callback);
                } else {
                    // 获取阅读历史
                    scope.readUrl = scope.getNewsReadUrl();
                    scope.loadNewsData(callback);
                }
            }
        },

        /**
         * 加载新闻数据
         */
        loadNewsData: function(callback){
            var scope = this;
            $.ajax({
                url: refreshUrl,
                data: {
                    type: scope.newsType,
                    recgid: scope.userId, // 用户ID
                    qid: scope.qid,
                    picnewsnum : 1,
                    readhistory: scope.readUrl,
                    zdnews:scope.getCacheStickNews("stick_news"),
                    idx: 0,
                    pgnum: 1,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){
                    scope.clearPicCtg();
                    $newsList.html('');
                },
                success: function(data){
                    // idx还原
                    scope.idx = 0; 
                    isFirstPage = true;
                    scope.generateDom(data);
                    // 页面滚到记录的位置处
                    var cachePos = wsCache.get('news_pos_' + scope.newsType);
                    if(cachePos){
                        $body.scrollTop(cachePos);
                    }
                    // scope.getDsp(function(dspData){
                    //     scope.generateDom(data, dspData);
                    //     // 页面滚到记录的位置处
                    //     var cachePos = wsCache.get('news_pos_' + scope.newsType);
                    //     if(cachePos){
                    //         $body.scrollTop(cachePos);
                    //     }
                    // });
                },
                complete: function(){
                    callback && callback(); // jshint ignore:line
                }
            });
        },
        /**
         * 下拉加载数据
         * @param  {Function} callback 回调方法
         * @return {[type]}            [description]
         */
        pullDownLoadData: function(callback){
            var scope = this;
            // 活动banner
            try {
                scope.getBannerData();
            } catch (e) {console.error(e);}
            // 页码（获取之后减1再存储）24h
            scope.pulldown_pgNum = Number(wsCache.get('pulldown_pgnum_' + scope.newsType));
            wsCache.set('pulldown_pgnum_' + scope.newsType, --scope.pulldown_pgNum, { exp: 24 * 3600});
            // 获取链接索引
            scope.pulldown_idx = Number(wsCache.get('pulldown_idx_' + scope.newsType));
            if(!scope.pulldown_idx){scope.pulldown_idx = 0;}
            // 非视频新闻
            if(scope.newsType === 'shipin'){
                // 获取阅读历史
                scope.readUrl = scope.getVideoReadUrl();
                scope.pullDownLoadVideoData(callback);
            } else if(scope.newsType === 'tupian'){
                // 获取阅读历史
                scope.readUrl = scope.getPicReadUrl();
                scope.pullDownLoadPicData(callback);
            } else {    // 视频新闻
                // 获取阅读历史
                scope.readUrl = scope.getNewsReadUrl();
                scope.pullDownLoadNewsData(callback);
            }
        },

        /**
         * 下拉加载新闻数据
         * @param  {Function} callback  回调方法
         */
        pullDownLoadNewsData: function(callback){
            var scope = this;
            $.ajax({
                url: pullDownUrl,
                data: {
                    type: scope.newsType,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    lastkey: wsCache.get('endkey_' + scope.newsType) ? wsCache.get('endkey_' + scope.newsType) : scope.endKey[scope.newsType],
                    pgnum: scope.pulldown_pgNum,
                    zdnews:scope.getCacheStickNews("stick_news"),
                    idx: scope.pulldown_idx,
                    readhistory: scope.readUrl,
                    recgid: scope.userId,
                    qid: scope.qid,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){},
                success: function(data){
                    scope.generateDomForPulldown(data);
                },
                error: function(e){
                    console.error(e);
                },
                complete: function(){
                    callback && callback(); // jshint ignore:line
                }
            });
        },

        /**
         * "视频"频道下拉加载数据
         * @param  {Function} callback  回调方法
         */
        pullDownLoadVideoData: function(callback){
            var scope = this;
            $.ajax({
                url: vpullDownUrl,
                data: {
                    type: scope.vnewsType,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    lastkey: wsCache.get('endkey_' + scope.newsType) ? wsCache.get('endkey_' + scope.newsType) : scope.endKey[scope.newsType],
                    pgnum: scope.pulldown_pgNum,
                    idx: scope.pulldown_idx,
                    readhistory: scope.readUrl,
                    recgid: scope.userId,
                    qid: scope.qid,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){},
                success: function(data){
                    scope.generateVideoDomForPulldown(data);
                },
                error: function(e){
                    console.error(e);
                },
                complete: function(){
                    callback && callback(); // jshint ignore:line
                }
            });
        },

        /**
         * 上拉加载数据
         * @return {[type]} [description]
         */
        pullUpLoadData: function(){
            var scope = this;
            // 页码（获取之后加一再存储）
            scope.pgNum = Number(wsCache.get('pgnum_' + scope.newsType));
            wsCache.set('pgnum_' + scope.newsType, ++scope.pgNum, { exp: 24 * 3600});
            // 获取链接索引
            scope.idx = Number(wsCache.get('idx_' + scope.newsType));
            if(!scope.idx){scope.idx = 0;}
            if(scope.newsType === 'shipin'){
                // 获取阅读历史
                scope.readUrl = scope.getVideoReadUrl();
                scope.pullUpLoadVideoData();
            } else if(scope.newsType === 'tupian'){
                // 获取阅读历史
                scope.readUrl = scope.getPicReadUrl();
                scope.pullUpLoadPicData();
            } else {
                // 获取阅读历史
                scope.readUrl = scope.getNewsReadUrl();
                scope.pullUpLoadNewsData();
            }
        },

        /**
         * 上拉加载新闻数据
         */
        pullUpLoadNewsData: function(){
            var scope = this;
            var obj={
                    type: scope.newsType,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    newsnum: scope.newsType === 'meinv' ? 10 : 20,
                    zdnews:scope.getCacheStickNews("stick_news"),
                    qid: scope.qid,
                    readhistory: scope.readUrl,
                    idx: scope.idx,
                    recgid: scope.userId, // 用户ID
                    pgnum: scope.pgNum,
                    os: scope.osType
                };
            $.ajax({
                url: pullUpUrl,
                data: {
                    type: scope.newsType,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    newsnum: scope.newsType === 'meinv' ? 10 : 20,
                    zdnews:scope.getCacheStickNews("stick_news"),
                    qid: scope.qid,
                    readhistory: scope.readUrl,
                    idx: scope.idx,
                    recgid: scope.userId, // 用户ID
                    pgnum: scope.pgNum,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){
                    scope.pullUpFlag = false;
                    // $newsList.html('');
                    // $loading.show();
                },
                success: function(data){
                    isFirstPage = false;
                    scope.generateDom(data);
                    scope.pullUpFlag = true;

                    // scope.getDsp(function(dspData){
                    //     scope.generateDom(data, dspData);
                    //     // 上拉加载标志（前一页数据未渲染完，不允许加载下一页数据）
                    //     scope.pullUpFlag = true;
                    // });
                },
                error: function(jqXHR, textStatus){
                    console.error(textStatus);
                },
                complete: function(){
                    // scope.pullUpFlag = true;
                    // $loading.hide();
                }
            });
        },
        
        /**
         * 上拉加载"视频"频道数据
         */
        pullUpLoadVideoData: function(){
            var scope = this;
            $.ajax({
                url: vpullUpUrl,
                data: {
                    type: scope.vnewsType,
                    newsnum: 20,
                    idx: scope.idx,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    recgid: scope.userId, // 用户ID
                    qid: scope.qid,
                    domain: 'eastday.com',
                    readhistory: scope.readUrl,
                    pgnum: scope.pgNum,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){
                    scope.pullUpFlag = false;
                    // $newsList.html('');
                    // $loading.show();
                },
                success: function(data){
                    isFirstPage = false;
                    scope.generateVideoDom(data);
                },
                error: function(jqXHR, textStatus){
                    console.error(textStatus);
                },
                complete: function(){
                    scope.pullUpFlag = true;
                    // $loading.hide();
                }
            });
        },

        /**
         * 上拉加载"图片"频道数据
         */
        pullUpLoadPicData: function(){
            var scope = this;
            $.ajax({
                url: ppullUpUrl,
                data: {
                    type: scope.pnewsType,
                    newsnum: 20,
                    idx: scope.idx,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    recgid: scope.userId, // 用户ID
                    qid: scope.qid,
                    domain: 'eastday.com',
                    readhistory: scope.readUrl,
                    pgnum: scope.pgNum,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){
                    scope.pullUpFlag = false;
                    $('#J_loading').children('.spinner').show();
                    $('#J_loading').children('.txt').html('数据加载中');
                },
                success: function(data){
                    scope.generatePicDom(data);
                },
                error: function(jqXHR, textStatus){
                    console.error('pullUpLoadPicData: \n', textStatus);
                },
                complete: function(){
                    scope.pullUpFlag = true;
                }
            });
        },
        
        /**
         * 生成视频频道中的视频分类
         * 规则：每次四个分类，18个分类随机展示（但是保证18个分类在用户滑了2~3页的时候要全部展示完）。
         * @return {[type]} [description]
         */
        getRecommendVideoCtg: function(){
            // 获取除去当前视频频道的频道数组
            tempVideoCtg = this.getDiffFromArr1(this.getTempVideoCtg(), shownVideoCtg);
            var scope = this,
                vcLen = tempVideoCtg.length,
                mySplit = Math.floor(vcLen / 4),
                max = vcLen,
                min = 1,    
                rd = 0,
                i = 0,
                clen = 0,
                ctgArr = [];
            // 随机生成4个分类推荐
            for (i = 0; i < 4; i++) {
                min = mySplit * i;
                if(i !== 3){
                    max = mySplit * (i + 1);
                } else {
                    // 优化，使tempVideoCtg中的每一个值都能被随机取到。
                    max = vcLen;
                }
                // 生成随机数
                rd = Math.floor((max - min) * Math.random() + min);
                // 如果当前频道不在“推荐”频道，推荐频道必须展示在每一栏的第一位
                if(i === 0 && scope.vnewsType !== 'vtuijian'){
                    rd = 0;
                }
                ctgArr[i] = tempVideoCtg[rd];
            }
            // 缓存已经显示过的类别
            for (i = 0, clen = ctgArr.length; i < clen; i++) {
                if(ctgArr[i].value !== 'vtuijian'){
                    shownVideoCtg.push(ctgArr[i]);
                }
            }
            // 清空缓存显示过的类别
            if(videoCtg.length - shownVideoCtg.length < 4){
                shownVideoCtg = [];
            }
            // 将生成的推荐分类打乱再返还（不在推荐频道的话就不打乱了，因为推荐频道必须展示在每一栏的第一位）
            return scope.vnewsType !== 'vtuijian' ? ctgArr : GLOBAL.Util.dislocateArr(ctgArr);
        },

        /**
         * 获取除去了当前视频类别和已经展示的类别的类别数组
         */
        getTempVideoCtg: function(){
            var scope = this,
                i = 0,
                arr = [],
                len = videoCtg.length;
            for (i = 0; i < len; i++) {
                if(videoCtg[i].value !== scope.vnewsType){
                    arr.push(videoCtg[i]);
                } else {
                    currentVideoCtg = videoCtg[i];
                }
            }
            return arr;
        },

        /**
         * 获取数组1中排除和数组2相同值的数组数据
         * @param  {Array} arr1 数组1
         * @param  {Array} arr2 数组2
         * @return {Array}      数组1中排除和数组2相同值的数组数据
         */
        getDiffFromArr1: function(arr1, arr2){
            var len1 = arr1.length,
                len2 = arr2.length,
                temArr = [],
                i = 0,
                j = 0,
                flag = true;
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    if(arr1[i].value === arr2[j].value){
                        flag = false;
                    }
                }
                if(flag){
                    temArr.push(arr1[i]);
                } else {
                    flag = true;
                }
            }
            return temArr;
        },

        /**
          * 动态加载js文件
          * @param  {string}   url      js文件的url地址
          * @param  {Function} callback 加载完成后的回调函数
          */
        getScript: function(url, callback, element) {
            var head = document.getElementsByTagName('head')[0],
                js = document.createElement('script');

            js.setAttribute('type', 'text/javascript'); 
            js.setAttribute('src', url); 
            if(element){
                element.appendChild(js);
            } else {
                head.appendChild(js);
            }
            //执行回调
            var callbackFn = function(){
                if(typeof callback === 'function'){
                    callback();
                }
            };

            if (document.all) { //IE
                js.onreadystatechange = function() {
                    if (js.readyState === 'loaded' || js.readyState === 'complete') {
                        callbackFn();
                    }
                };
            } else {
                js.onload = function() {
                    callbackFn();
                };
            }
        },

        /**
         * 动态创建广告代码
         * @param  {string}   scriptCode     脚本代码
         * @param  {Function} callback   回调
         * @param  {DOM}   element  广告js代码父级标签
         * @return {undefined}    
         */
        createScript: function(scriptCode, callback, element){
            if(scriptCode){
                var head = document.getElementsByTagName('head')[0],
                    js = document.createElement('script');
                js.setAttribute('type', 'text/javascript'); 
                js.innerHTML =  scriptCode;
                if(element){
                    element.appendChild(js);
                } else {
                    head.appendChild(js);
                }
                //执行回调
                callback();
            }
        },

        /**
         * 获取banner数据
         * @return {[type]} [description]
         */
        getBannerData: function(callback){
            var scope = this;
            $.ajax({
                url: bannerUrl,
                data: {
                    type: scope.newsType,
                    qid: scope.qid,
                    uid: scope.userId, // 用户ID
                    readhistory: scope.readUrl,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                success: function(data){
                    if(data.data && ($.isPlainObject(data.data) && !$.isEmptyObject(data.data))){
                        scope.loadBanner(data.data);
                    } else {
                        // banner全部显示完成就删除banner
                        $bannerDiv && $bannerDiv.remove();  // jshint ignore:line
                        $bannerDiv = null;
                    }
                },
                complete: function(){
                    callback && callback(); // jshint ignore:line
                }
            });
        },
        
        /**
         * 从缓存中获取已读历史url
         * @return {String} 已读历史url
         */
        getNewsReadUrl: function(){
            var scope = this,
                ru = '';
            // 获取阅读记录
            if(scope.newsType === 'toutiao' || scope.newsType === 'weikandian'){
                ru = wsCache.get('read_url_all');
            } else {
                ru = wsCache.get('read_url_' + scope.newsType);
            }
            return ru ? ru : null;
        },

        /**
         * 缓存置顶的新闻
         * @return {[type]} [description]
         */
        cacheStickNews:function(urlNum,type){
            var rua = wsCache.get(type),stickNew = urlNum;
            if(rua){
                rua = rua.split(',');
                var eIndex=$.inArray(urlNum,rua);
                if(eIndex>-1){
                    return;
                }
                while(rua.length >= 5){rua.shift();}
                rua.push(urlNum);
                stickNew = rua.join(',');
            }
            wsCache.set(type, stickNew, {exp: 2 * 3600});
        },
        /**
         * 获取缓存置顶的新闻
         * @return {[type]} [description]
         */
        getCacheStickNews:function(type){
            var stick_newsStr=wsCache.get(type);
            if(!stick_newsStr){
                stick_newsStr="";
            }
            return stick_newsStr;
        },
        
        /**
         * 获取处理后的时间字符串
         * @param  {[type]} dateStr [description]
         * @return {[type]}         [description]
         */
        getSpecialTime: function(dateStr){
            var tTime = Date.parse(dateStr.replace(/-/g, "/")),
                cTime = new Date().getTime(),
                eightTime = 8 * 60 * 60 * 1000,
                disTime = Number(cTime - tTime),
                timeFlag = eightTime - disTime, // >0 8小时内的新闻；否则就是8小时前的新闻。
                timeTagStr = timeFlag > 0 ? GLOBAL.Util.getSpecialTimeStr(dateStr) : '';
            return timeTagStr;
        },

        /**
         * 下拉加载数据生成DOM
         * @param  {[type]} d 数据
         * @return {[type]}   [description]
         */
        generateDomForPulldown: function(d){
            var scope = this,
                data = d && d.data,
                len = data.length;

            if(!data || !data.length){
                // $loading.hide();
                return false;
            }
            // 计数
            scope.pulldown_num++;
            scope.startKey[scope.newsType] = d.endkey;
            wsCache.set('startkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
            scope.endKey[scope.newsType] = d.newkey;
            wsCache.set('endkey_' + scope.newsType, d.newkey, {exp: 24 * 3600});
            // 反转数组(reverse方法会改变原来的数组，而不会创建新的数组。)
            data.reverse();
            // 删除阅读历史位置DOM元素（后面重新更新位置）
            $body.find('.J-read-position').remove();
            $newsList.prepend('<a class="J-read-position read-position">上次浏览到这里，点击刷新。</a>');

            // var ranNum = Math.floor((len - 1) * Math.random());
            // 循环生成新闻
            for (var i = 0; i < len; i++) {
                var item = data[i],
                    url = item.url,
                    dateStr = item.date,
                    topic = item.topic,
                    source = item.source,
                    accurateurl = item.accurateurl,
                    imgArr = item.miniimg,
                    recommendtype = item.recommendtype ? item.recommendtype : '-1',
                    hotnews = item.hotnews,
                    ispicnews = item.ispicnews, // 大图新闻(1)、小图新闻(0)、无图新闻(-1)
                    videonews = item.videonews, // 视频新闻
                    videoList = item.videolist, // 视频列表
                    isadv = item.isadv || '',
                    advId = item.adv_id || '',
                    type = item.type,
                    subtype = item.subtype,
                    imgLen = imgArr.length,
                    // rowkey = item.rowkey,
                    hot = Number(item.hotnews),     // 热门
                    video = Number(item.isvideo),   // 视频
                    rec = Number(item.isrecom),     // 推荐
                    nuanwen = Number(item.isnxw),   // 暖文
                    issptopic = Number(item.issptopic),   // 专题
                    commentCount = Number(item.comment_count),  // 评论数
                    urlpv = Number(item.urlpv),             // 浏览量
                    picnums = item.picnums,         // 图片数量
                    // praisecnt = item.praisecnt,      // 顶
                    // tramplecnt = item.tramplecnt,    // 踩
                    commentCountStr = '',
                    urlpvStr = '',
                    advStr = '',
                    tagStr = '';
                
                if(isadv == '1'){   // jshint ignore:line
                    // tagStr = '&nbsp;';
                    tagStr = '<i class="tag tag-gg">广告</i>';
                    advStr = 'class="J-promote-news news-promote" data-advid="' + advId + '"';
                    // 调用show统计接口
                    // scope.sendAdShowLog(advId, url);
                } else if(issptopic){
                    tagStr = '<i class="tag tag-sptopic">专题</i>';
                } else if(hot){
                    tagStr = '<i class="tag tag-hot">热门</i>';
                    if(video){
                        tagStr += '<i class="tag tag-video">视频</i>';
                    }
                } else if(rec){
                    tagStr = '<i class="tag tag-rec">推荐</i>';
                } else if(video){
                    tagStr = '<i class="tag tag-video">视频</i>';
                } else if(nuanwen) {
                    tagStr = '<i class="tag tag-nuanwen">暖文</i>';
                }

                // 阅读量（PV为0就不展示评论数和pv量）
                if(urlpv !== 0){
                    urlpvStr = '<em class="tag tag-view">' + GLOBAL.Util.getSpecialCountStr(urlpv) + '阅读</em>';
                    commentCountStr = '<em class="tag tag-com">' + GLOBAL.Util.getSpecialCountStr(commentCount) + '评论</em>';
                }

                if(scope.newsType === 'meinv'){ // jshint ignore:line
                    url += '?fr=meinv&#&gid=1&pid=1';
                } else {
                    // 非原生广告（原生广告url中不添加参数）
                    if(isadv != '1'){   // jshint ignore:line
                        url += '?idx=' + (scope.pulldown_idx-i-1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + scope.newsType + '&pgnum=' + scope.pulldown_pgNum;
                    }
                }

                // 新规则：5条新闻之后插一条广告，共2个广告，用li、li2位置广告
                // try {
                //     if(i === 1){
                //         // 使用li位置的广告ID插入
                //         scope.insertGgForPullDown();
                //     } else if(i === 6) {
                //         // 使用li2位置的广告ID插入
                //         scope.insertGgForPullDown();
                //     }
                // } catch (e) {
                //     console.error('insertGgForPullDown has error：\n', e);
                // }

                /*==== 新闻流 ====*/
                // 视频模式（直接播放的视频）
                if(videonews == '1'){       // jshint ignore:line
                    urlpvStr = urlpvStr.replace('阅读', '观看');
                    if(isThanAndroid4){
                        var videoImg = (item.lbimg[0] ? item.lbimg[0].src : '');
                        var $itemVideo = $('<section class="news-item news-item-video">' + 
                            '<div class="video-wrap">' + 
                                '<h3>' + topic + '</h3>' + 
                                '<div class="J-video-box video-box">' + 
                                    '<mip-video controls="auto" data-type="' + type + '" data-idx="' + (scope.idx+i+1) + '" poster="' + videoImg + '" autobuffer="true" preload="none">' + 
                                        '<source src="' + videoList[0].src + '" type="video/mp4">您的浏览器不支持该视频播放。' + 
                                    '</mip-video>' + 
                                '</div>' + 
                                '<p class="tags clearfix">' + 
                                    '<em class="tag tag-video">视频</em>' +
                                    '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr +
                                    // '<em class="time"><i class="video">视频</i></em>' +
                                    // '<em class="src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                '</p>' + 
                            '</div>' + 
                        '</section>');
                        $newsList.prepend($itemVideo);
                    }
                // 需要点击进去的视频
                } else if(videonews == '2'){    // jshint ignore:line
                    urlpvStr = urlpvStr.replace('阅读', '观看');
                    if(isThanAndroid4){
                        $newsList.prepend('<section class="news-item news-item-video-link">' + 
                            '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                '<div class="news-wrap clearfix">' + 
                                    '<div class="txt-wrap fl">' + 
                                        '<h3>' + topic + '</h3>' + 
                                        '<p class="tags clearfix">' + 
                                            '<em class="tag tag-video">视频</em>' +
                                            '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr +
                                            // '<em class="time"><i class="video">视频</i></em>' + 
                                            // '<em class="src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                        '</p>' + 
                                    '</div>' + 
                                    '<div class="img-wrap fr">' + 
                                        '<mip-img class="lazy" src="' + imgArr[0].src + '">' + 
                                        '<span class="play-btn"></span>' + 
                                    '</div>' + 
                                '</div>' + 
                            '</a>' + 
                        '</section>');
                    }
                } else {
                    dateStr = scope.getSpecialTime(dateStr);
                    // 大图模式
                    if(ispicnews == '1'){   // jshint ignore:line
                        imgArr = item.lbimg;
                        $newsList.prepend('<section class="pull-down news-item news-item-s3">' + 
                            '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                '<div class="news-wrap">' + 
                                    '<h3>' + topic + '</h3>' + 
                                    '<div class="img-wrap clearfix">' + 
                                        '<mip-img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '">' + 
                                    '</div>' + 
                                    '<p class="tags clearfix">' + 
                                        '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' + 
                                        '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                    '</p>' + 
                                '</div>' + 
                            '</a>' + 
                        '</section>');
                    // 图片新闻
                    } else if(ispicnews == '2'){    // jshint ignore:line
                            imgArr = item.lbimg;
                            $newsList.prepend('<section class="news-item news-item-pic-link-special">' + 
                                '<a data-type="' + type + '" data-subtype="" href="' + url + '">' + 
                                    '<h3>' + topic + '</h3>' + 
                                    '<div class="img-wrap">' + 
                                        '<mip-img src="' + imgArr[0].src + '" alt="">' + 
                                        '<span class="num">' + picnums + '图</span>' + 
                                    '</div>' + 
                                    '<p class="tags clearfix">' + 
                                        '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' +
                                        '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                    '</p>' + 
                                '</a>' + 
                            '</section>');
                    // 无图模式
                    } else if(ispicnews == '-1'){   // jshint ignore:line
                        $newsList.prepend('<section class="news-item news-item-noimg">' + 
                            '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                '<div class="news-wrap">' + 
                                    '<h3>' + topic + '</h3>' + 
                                    '<p class="tags clearfix">' + 
                                        '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' + 
                                        '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                    '</p>' + 
                                '</div>' + 
                            '</a>' + 
                        '</section>');
                    } else if(ispicnews == '0'){    // jshint ignore:line
                        if(imgLen >= 3){
                            $newsList.prepend('<section class="pull-down news-item news-item-s2">' + 
                                '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                    '<div class="news-wrap">' + 
                                        '<h3>' + topic + '</h3>' + 
                                        '<div class="img-wrap clearfix">' + 
                                            '<div class="img fl"><mip-img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div>' + 
                                            '<div class="img fl"><mip-img class="lazy" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"></div>' + 
                                            '<div class="img fl"><mip-img class="lazy" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div>' + 
                                        '</div>' + 
                                        '<p class="tags clearfix">' + 
                                            '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' + 
                                            '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                        '</p>' + 
                                    '</div>' + 
                                '</a>' + 
                            '</section>');
                        } else {
                            $newsList.prepend('<section class="pull-down news-item news-item-s1">' + 
                                '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                    '<div class="news-wrap clearfix">' + 
                                        '<div class="txt-wrap fl">' + 
                                            '<h3>' + topic + '</h3>' + 
                                            '<p class="tags clearfix">' + 
                                                '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' + 
                                                '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                            '</p>' + 
                                        '</div>' + 
                                        '<div class="img-wrap fr"><mip-img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div>' + 
                                    '</div>' + 
                                '</a>' + 
                            '</section>');
                        }
                    } 
                } 
            }
            // 提示推荐新闻条数
            var $rn = $('<p id="J_recommend_news" class="recommend-news">为您推荐<span>' + len + '</span>条新闻</p>');
            $rn.appendTo('body');
            setTimeout(function(){
                $rn.animate({
                    'scale': 0,
                    'opacity': 0.5
                }, '600', function(){
                    $rn.remove();
                });
            }, 1200);
            // 如果下拉加载数据次数超过20次，清空信息流末尾新闻数据。
            if(scope.pulldown_num >= 20){
                scope.pulldown_num = 0;
                var $newsListChildrens = $newsList.children(),
                    newsLen = $newsListChildrens.length;
                for (i = newsLen - 1; i >= newsLen - 20; i--) {
                    $newsListChildrens[i].remove();
                }
            }
            // 记录pulldown_idx
            wsCache.set('pulldown_idx_' + scope.newsType, scope.pulldown_idx - len, {exp: 40 * 60});
            setTimeout(function(){
                // 清除pull-down类
                $newsList.children().removeClass('pull-down');
                // 缓存当前类别加载的新闻（缓存20分钟）
                wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 40 * 60});
            }, 400);
        },

        /**
         * 初始化频道类别
         * @return {[type]} [description]
         */
        initChannels: function(callback){
            alert("initChannels");
            var scope = this,
                myChannels = !!wsCache.get('CUSTOM_CHANNELS_161207') ? wsCache.get('news_channels') : null;
            if(!myChannels){
                /* 获取服务端所有频道 */
                $.ajax({
                    url: channelsUrl,
                    dataType: 'json',
                    success: function(data){
                        scope.generateChannelTabs(data.channels.up);
                        callback && callback(); // jshint ignore:line
                    },
                    error: function(){
                        console.error(arguments);
                    }
                });
            } else {
                scope.generateChannelTabs(myChannels);
                callback && callback(); // jshint ignore:line

            }
        },

        /**
         * 发送推广新闻的点击日志
         * @param  {[type]} advUrl url
         * @param  {[type]} advId  id
         * @param  {[type]} accurateurl  后台统计用（新增的）
         * @param  {[type]} adpgnum  页码（新增的）
         * @param  {[type]} adposition  广告位置（新增的）
         * @return {[type]}        [description]
         */
        sendPromoteNewslog: function(options){
            var scope = this,
                pixel=GLOBAL.Util.getPixel();
            $.ajax({
                url: clickAdLogUrl,
                dataType: 'jsonp',
                data: {
                    "qid": scope.qid || 'null',
                    "uid": scope.userId || 'null',
                    "loginid": 'null',
                    "softtype": 'news',
                    "softname": 'eastday_wapnews',
                    "newstype": 'ad',
                    "pgtype" : 'list',  // 区分dsp广告是位于哪个页面
                    "accurateurl" : options.accurateurl || 'null',
                    "adpgnum" : options.adpgnum || 'null',  // 页码
                    "adposition" : options.adposition || 'null',    // 位置
                    "platform" : options.platform || 'null',    // 平台
                    "clickbackurl" : options.clickbackurl || 'null',    
                    "from": 'null',
                    "to": options.advUrl || 'null',
                    "os_type": scope.osType || 'null',
                    "browser_type": scope.browserType || 'null',
                    "pixel": pixel.w + '*' + pixel.h,
                    "ime": "null",
                    'fr_url': GLOBAL.Util.getUrlNoParams() || 'null',
                    "adv": options.advId || 'null'
                },
                jsonp : 'jsonpcallback',
                timeout: 2000,
                success : function() {},
                complete: function(){
                    options.callback && options.callback(); // jshint ignore:line
                }
            });
        },

        /**
         * 生成频道DOM
         * @param  {[type]} myChannels 频道数据
         * @return {[type]}            [description]
         */
        generateChannelTabs: function(myChannels){
            if(!myChannels || !(myChannels instanceof Array)){
                return;
            }
            var tabsHtml = '',
                i = 0;
            // 安卓4.0及以下版本手机去掉视频频道
            try {
                if(!isThanAndroid4){
                    for (i = 0; i < myChannels.length; i++) {
                        if(myChannels[i].name === 'shipin'){
                            myChannels.splice(i, 1);
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }

            for (i = 0; i < myChannels.length; i++) {
                if(i === 0){
                    tabsHtml += ''+
                    '<li data-type="' + myChannels[i].name + '">'+
                    '                        <mip-dftt-data data-type="' + myChannels[i].name + '">'+
                    '                            <span>'+
                    myChannels[i].value +
                    '                            </span>'+
                    '                        </mip-dftt-data>'+
                    '</li>';
                        
                    // tabsHtml += '<a class="active" data-type="' + myChannels[i].name + '">' + myChannels[i].value + '</a>';
                } else {
                    // tabsHtml += '<a data-type="' + myChannels[i].name + '">' + myChannels[i].value + '</a>';
                    tabsHtml += ''+
                    '<li data-type="' + myChannels[i].name + '">'+
                    '                        <mip-dftt-data data-type="' + myChannels[i].name + '">'+
                    '                            <span>'+
                    myChannels[i].value +
                    '                            </span>'+
                    '                        </mip-dftt-data>'+
                    '</li>';
                }
            }
            $newsTabsWrap.html(tabsHtml);
            // 缓存我的频道
            if(!!wsCache.get('CUSTOM_CHANNELS_161207')) {
                wsCache.set('news_channels', myChannels);
            }
        },

        /**
         * 获取我的频道
         * @param  {Array} sc 服务端频道
         * @param  {Array} cc 本地缓存的频道（用户自定义我的频道）
         * @return {[type]}    [description]
         */
        getMyChannels: function(sc, cc){
            if(!sc || !cc){
                return [];
            }
            var arr = [],
                cLen = cc.length,
                sLen = sc.length;
            // 为了保持和缓存顺序一致，请外层循环使用缓存的频道数组
            for (var i = 0; i < cLen; i++) {
                for (var j = 0; j < sLen; j++) {
                    if(cc[i].name === sc[j].name){
                        arr.push(cc[i]);
                    }
                }
            }
            return arr;
        },

        /**
         * 下拉插入广告
         */
        insertGgForPullDown: function(pos){
            // 无广告情况处理
            try {
                if(GLOBAL.Et.gg.my.nogg){
                    return;
                }
            } catch (e) {console.error(e);}
            var scope = this,
                // ggPos = 'li',
                // myGg = GLOBAL.Et.gg.my,
                // gg = '',
                alliance = '',  // 联盟
                ggId = '',      // 广告ID
                // ifHeight = '',
                iframeId = '',
                $bdDom = '';
            // 对于只能放搜狗广告的渠道做特殊处理
            ggId = GLOBAL.Et.onlySogouGgId;
            if(ggId){
                alliance = 'sogou';
            } else {
                alliance = 'baidu';
                ggId = tempGgForPullDown.shift();
                // 缓存已经显示的广告ID（主要是因为新闻会作缓存，所以广告ID也需要分频道缓存，而且缓存时间必须一致）
                ggId && scope.cacheBdGgIdForPullDown(ggId); // jshint ignore:line
            }
            if(!ggId){
                return;
            }
            switch(alliance) {
                case 'baidu':
                    // 百度三宫格
                    $bdDom = $('<div class="bdgg-wrap" data-ggid="' + ggId + '"></div>');
                    $newsList.prepend($bdDom);
                    scope.loadBaiduGg($bdDom, ggId);
                    break;
                case 'sogou':
                    $newsList.prepend('<div class="gg-wrap">' + 
                        '<iframe src="https://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe>' + 
                    '</div>');
                    break;
            }
        },

        /**
         * 下拉加载视频DOM
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        generateVideoDomForPulldown: function(d){
            var scope = this,
                data = d.data ? d.data : null,
                existVideoCtg = false,
                len = data ? data.length : 0;
            if(!data || !len){
                return false;
            }
            // 计数
            scope.pulldown_num++;
            scope.startKey[scope.newsType] = d.endkey;
            wsCache.set('startkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
            scope.endKey[scope.newsType] = d.newkey;
            wsCache.set('endkey_' + scope.newsType, d.newkey, {exp: 24 * 3600});
            // 反转数组(reverse方法会改变原来的数组，而不会创建新的数组。)
            data.reverse();
            // 删除阅读历史位置DOM元素（后面重新更新位置）
            $body.find('.J-read-position').remove();
            $newsList.prepend('<a class="J-read-position read-position">上次浏览到这里，点击刷新。</a>');
            for (var i = 0; i < len; i++) {
                var item = data[i],
                    miniImg = item.miniimg, // 4:3
                    itemImg = miniImg[0],
                    hotnews = item.hotnews,    
                    recommendtype = item.recommendtype ? item.recommendtype : '-1',
                    dateStr = item.date,
                    type = item.type,
                    topic = item.topic,
                    source = item.source,
                    imgSrc = itemImg.src,
                    imgWidth = itemImg.imgwidth,
                    imgHeight = itemImg.imgheight,
                    commentCount = Number(item.comment_count),  // 评论数
                    urlpv = Number(item.urlpv),                 // 阅读量
                    hot = Number(item.hotnews),     // 热门
                    rec = Number(item.isrecom),     // 推荐
                    url = item.url + '?qid=' + scope.qid + '&idx=' + (scope.idx + i + 1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + GLOBAL.Util.getUrlNoParams() + '&pgnum=' + scope.pulldown_pgNum,
                    ctgArr = [],
                    commentCountStr = '',
                    urlpvStr = '',
                    videoCtgStr = '',
                    tagStr = '';
                if(hot){
                    tagStr = '<i class="tag tag-hot">热门</i>';
                } else if(rec){
                    tagStr = '<i class="tag tag-rec">推荐</i>';
                }

                // 新规则：5条新闻之后插一条广告，共2个广告，用li、li2位置广告
                try {
                    if(i === 1){
                        // 使用li位置的广告ID插入
                        scope.insertGgForPullDown(1);
                    } else if(i === 6) {
                        // 使用li2位置的广告ID插入
                        scope.insertGgForPullDown(2);
                    }
                } catch (e) {
                    console.error('insertGgForPullDown has error：\n', e);
                }

                // 阅读量（PV为0就不展示评论数和pv量）
                if(urlpv !== 0){
                    urlpvStr = '<em class="tag tag-view">' + GLOBAL.Util.getSpecialCountStr(urlpv) + '观看</em>';
                    commentCountStr = '<em class="tag tag-com">' + GLOBAL.Util.getSpecialCountStr(commentCount) + '评论</em>';
                }
                dateStr = scope.getSpecialTime(dateStr);
                $newsList.prepend([
                    '<section class="news-item news-img1 news-video">',
                        '<div class="one-px-border"></div>',
                        '<a data-type="' + type + '" href="' + url + '" class="news-link">',
                            '<div class="info">',
                                '<h3 class="title dotdot line3">' + topic + '</h3>',
                                '<p class="tags">', 
                                    (tagStr ? '<em class="tag tag-time">' + tagStr + '</em>' : (dateStr ? '<em class="tag tag-time">' + dateStr + '</em>' : '')),
                                    commentCountStr,
                                    urlpvStr,
                                    '<em class="tag tag-src">' + source + '</em>',
                                '</p>',
                            '</div>',
                            '<div class="img img-bg"><mip-img class="image" src="' + imgSrc + '" data-width="' + imgWidth + '" data-height="' + imgHeight + '"><span class="video-btn"></span></div>',
                        '</a>',
                    '</section>'
                ].join(''));

                // 插入视频分类列表（第一屏在第6个位置插入，后面每屏在第1、第6个位置插入）
                if((i !== 0) && (i % 1 === 0) && !existVideoCtg){
                    ctgArr = scope.getRecommendVideoCtg();
                    // 对于“纪录片”频道，不加“频道”两字
                    videoCtgStr = scope.vnewsType === 'vjilupian' ? currentVideoCtg.name : currentVideoCtg.name + '频道';
                    if(ctgArr.length !== 0){
                        $newsList.prepend('<section class="news-ctg"><div class="video-ctg-wrap"><div class="wrapper clearfix"><span class="fl">' + videoCtgStr + '</span><div class="link-wrap fl"><a class="J-video-ctg" data-type="' + ctgArr[0].value + '" href="javascript:;">' + ctgArr[0].name + '</a><a class="J-video-ctg" data-type="' + ctgArr[1].value + '" href="javascript:;">' + ctgArr[1].name + '</a><a class="J-video-ctg" data-type="' + ctgArr[2].value + '" href="javascript:;">' + ctgArr[2].name + '</a><a class="J-video-ctg" data-type="' + ctgArr[3].value + '" href="javascript:;">' + ctgArr[3].name + '</a></div></div></div></section>');
                    }
                    existVideoCtg = true;
                }
            }
            // 提示推荐新闻条数
            var $rn = $('<p id="J_recommend_news" class="recommend-news">为您推荐<span>' + len + '</span>条视频</p>');
            $rn.appendTo('body');
            setTimeout(function(){
                $rn.animate({
                    'scale': 0,
                    'opacity': 0.5
                }, '600', function(){
                    $rn.remove();
                });
            }, 1200);
            // 如果下拉加载数据次数超过20次，清空信息流末尾新闻数据。
            if(scope.pulldown_num >= 10){
                scope.pulldown_num = 0;
                var $newsListChildrens = $newsList.children(),
                    newsLen = $newsListChildrens.length;
                for (i = newsLen - 1; i >= newsLen - 10; i--) {
                    $newsListChildrens[i].remove();
                }
            }
            // 记录pulldown_idx
            wsCache.set('pulldown_idx_' + scope.newsType, scope.pulldown_idx - len, {exp: 40 * 60});
            setTimeout(function(){
                // 清除pull-down类
                $newsList.children().removeClass('pull-down');
                // 缓存当前类别加载的新闻（缓存20分钟）
                wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 40 * 60});
            }, 400);
        },

        /**
         * 下拉加载图片DOM
         * @param  {Array} d 图片数据
         * @return {[type]}   [description]
         */
        generatePicDomForPulldown: function(d){
            var scope = this,
                data = d.data ? d.data : null,
                // existGg = false,
                len = data ? data.length : 0,
                min = 0, 
                max = 3, 
                randomNum = len;
            if(!data || !len){
                return false;
            }
            // 计数
            scope.pulldown_num++;
            scope.startKey[scope.newsType] = d.endkey;
            wsCache.set('startkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
            scope.endKey[scope.newsType] = d.newkey;
            wsCache.set('endkey_' + scope.newsType, d.newkey, {exp: 24 * 3600});
            // 反转数组(reverse方法会改变原来的数组，而不会创建新的数组。)
            data.reverse();
            // 删除阅读历史位置DOM元素（后面重新更新位置）
            $body.find('.J-read-position').remove();
            $newsList.prepend('<a class="J-read-position read-position">上次浏览到这里，点击刷新。</a>');
            // 随机位置插入广告(一条)
            if(len > 4 && len < 8){
                min = 0; 
                max = 3;
            } else if(len > 8){
                min = len - 8; 
                max = len - 5;
            }
            randomNum = Math.floor((max - min + 1) * Math.random() + min);
            for (var i = 0; i < len; i++) {
                var item = data[i],
                    // 小图
                    // miniImg = item.miniimg,  // 4:3
                    // itemImg = miniImg[0],
                    // imgSrc = itemImg.src,
                    // imgWidth = itemImg.imgwidth,
                    // imgHeight = itemImg.imgheight,
                    // 大图
                    lbImg = item.lbimg, // 2:1
                    lbItemImg = lbImg[0],
                    lbimgSrc = lbItemImg.src,
                    lbimgWidth = lbItemImg.imgwidth,
                    lbimgHeight = lbItemImg.imgheight,
                    picnums = item.picnums,         // 图片数量 
                    hotnews = item.hotnews,    
                    recommendtype = item.recommendtype ? item.recommendtype : '-1',
                    dateStr = item.date,
                    type = item.type,
                    topic = item.topic,
                    source = item.source,
                    // commentCount = Number(item.comment_count),   // 评论数
                    urlpv = Number(item.urlpv),                 // 阅读量
                    hot = Number(item.hotnews),     // 热门
                    rec = Number(item.isrecom),     // 推荐
                    url = item.url + '?qid=' + scope.qid + '&idx=' + (scope.idx + i + 1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + GLOBAL.Util.getUrlNoParams() + '&pgnum=' + scope.pulldown_pgNum,
                    // ctgArr = [],
                    commentCountStr = '',
                    urlpvStr = '',
                    // videoCtgStr = '',
                    tagStr = '';

                if(hot){
                    tagStr = '<i class="tag tag-hot">热门</i>';
                } else if(rec){
                    tagStr = '<i class="tag tag-rec">推荐</i>';
                }

                // 阅读量（PV为0就不展示评论数和pv量）
                if(urlpv !== 0){
                    urlpvStr = '<em class="tag tag-view">' + GLOBAL.Util.getSpecialCountStr(urlpv) + '浏览</em>';
                    // commentCountStr = '<em class="tag tag-com">' + GLOBAL.Util.getSpecialCountStr(commentCount) + '评论</em>';
                }
                dateStr = scope.getSpecialTime(dateStr);
                // 前面累加 prepend
                $newsList.prepend('<section class="news-item news-item-pic-link">' + 
                    '<a data-type="' + type + '" data-subtype="" href="' + url + '">' + 
                        '<div class="img-wrap">' + 
                            '<mip-img src="' + lbimgSrc + '" alt="" data-width="' + lbimgWidth + '" data-height="' + lbimgHeight + '">' + 
                            '<span class="num">' + picnums + '图</span>' + 
                        '</div>' + 
                        '<h3>' + topic + '</h3>' + 
                        '<p class="tags clearfix">' + 
                            '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' + commentCountStr + urlpvStr +
                            '<em class="tag tag-src">' + source + '</em>' + 
                        '</p>' + 
                    '</a>' + 
                '</section>');
            }
            // 提示推荐新闻条数
            var $rn = $('<p id="J_recommend_news" class="recommend-news">为您推荐<span>' + len + '</span>条更新</p>');
            $rn.appendTo('body');
            setTimeout(function(){
                $rn.animate({
                    'scale': 0,
                    'opacity': 0.5
                }, '600', function(){
                    $rn.remove();
                });
            }, 1200);
            // 如果下拉加载数据次数超过20次，清空信息流末尾新闻数据。
            if(scope.pulldown_num >= 20){
                scope.pulldown_num = 0;
                var $newsListChildrens = $newsList.children(),
                    newsLen = $newsListChildrens.length;
                for (i = newsLen - 1; i >= newsLen - 20; i--) {
                    $newsListChildrens[i].remove();
                }
            }
            // 记录pulldown_idx
            wsCache.set('pulldown_idx_' + scope.newsType, scope.pulldown_idx - len, {exp: 40 * 60});
            setTimeout(function(){
                // 清除pull-down类
                $newsList.children().removeClass('pull-down');
                // 缓存当前类别加载的新闻（缓存20分钟）
                wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 40 * 60});
            }, 400);
        },

        /**
         * 删除图片分类
         */
        clearPicCtg: function(){
            $picCtgWrap && $picCtgWrap.remove();    // jshint ignore:line
            $picCtgWrap = null;
        },

        /**
         * 将已经点过赞、点过踩的图标高亮显示出来
         * @return {[type]} [description]
         */
        highlightPraiseTrample: function(){
            var scope = this;
            if(scope.newsType == 'meinv'){
                $newsList.find('.J-good').each(function(){
                    var $this = $(this);
                    if(scope.getPraiseTrampleStatus($this.data('rowkey')) === 1){
                        $this.addClass('active');
                    }
                });
                $newsList.find('.J-bad').each(function(){
                    var $this = $(this);
                    if(scope.getPraiseTrampleStatus($this.data('rowkey')) === -1){
                        $this.addClass('active');
                    }
                });
            }
        },
        /**
         * "视频"频道下拉加载数据
         * @param  {Function} callback  回调方法
         */
        pullDownLoadPicData: function(callback){
            var scope = this;
            $.ajax({
                url: ppullDownUrl,
                data: {
                    type: scope.pnewsType,
                    startkey: wsCache.get('startkey_' + scope.newsType) ? wsCache.get('startkey_' + scope.newsType) : scope.startKey[scope.newsType],
                    lastkey: wsCache.get('endkey_' + scope.newsType) ? wsCache.get('endkey_' + scope.newsType) : scope.endKey[scope.newsType],
                    pgnum: scope.pulldown_pgNum,
                    idx: scope.pulldown_idx,
                    readhistory: scope.readUrl,
                    recgid: scope.userId,
                    qid: scope.qid,
                    os: scope.osType
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){},
                success: function(data){
                    scope.generatePicDomForPulldown(data);
                },
                error: function(e){
                    console.error(e);
                },
                complete: function(){
                    callback && callback(); // jshint ignore:line
                }
            });
        },

        /**
         * 刷新按钮动画效果
         * @return {[type]} [description]
         */
        changeRefreshStatus: function(){
            $refresh.addClass('active');
            setTimeout(function(){
                $refresh.removeClass('active');
            }, 700);
        },
        /**
         * 将数据组装成html代码
         * @param  {[type]} d 数据
         * @return {[type]}   [description]
         */
        generateDom: function(d, dspData){
            var scope = this;
            var data = d && d.data;
            if(!data || !data.length){
                // $loading.hide();
                return false;
            }
            // 存储加载的新闻中的最后一条新闻的rowkey
            // wsCache.set('rowkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
            scope.startKey[scope.newsType] = d.endkey;
            wsCache.set('startkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});

            var len = data.length;
            // var ranNum = Math.floor((len - 1) * Math.random());
            for (var i = 0; i < len; i++) {
                var item = data[i],
                    url = item.url,
                    dateStr = item.date,
                    topic = item.topic,
                    source = item.source,
                    accurateurl = item.accurateurl,
                    imgArr = item.miniimg,
                    imgLen = imgArr.length,
                    recommendtype = item.recommendtype ? item.recommendtype : '-1',
                    hotnews = item.hotnews,
                    ispicnews = item.ispicnews, // 大图新闻(1)、小图新闻(0)、无图新闻(-1)
                    videonews = item.videonews, // 视频新闻
                    videoList = item.videolist, // 视频列表
                    advId = item.adv_id || '',
                    type = item.type,
                    subtype = item.subtype,
                    rowkey = item.rowkey,
                    isadv = item.isadv || '',
                    iszd = item.zd || '',
                    hot = Number(item.hotnews),     // 热门
                    video = Number(item.isvideo),   // 视频
                    rec = Number(item.isrecom),     // 推荐
                    nuanwen = Number(item.isnxw),   // 暖文
                    issptopic = Number(item.issptopic),
                    commentCount = Number(item.comment_count),  // 评论数
                    urlpv = Number(item.urlpv),             // 浏览量
                    picnums = item.picnums,         // 图片数量
                    praisecnt = item.praisecnt,     // 顶
                    tramplecnt = item.tramplecnt,   // 踩
                    commentCountStr = '',
                    urlpvStr = '',
                    advStr = '',
                    tagStr = '';

                if(isadv == '1'){   // jshint ignore:line
                    // tagStr = '&nbsp;';
                    tagStr = '<i class="tag tag-gg">广告</i>';
                    advStr = 'class="J-promote-news news-promote" data-advid="' + advId + '"';
                    // 调用show统计接口
                    // scope.sendAdShowLog(advId, url);
                } else if(issptopic){
                    tagStr = '<i class="tag tag-sptopic">专题</i>';
                } else if(hot){
                    tagStr = '<i class="tag tag-hot">热门</i>';
                    if(video){
                        tagStr += '<i class="tag tag-video">视频</i>';
                    }
                } else if(rec){
                    tagStr = '<i class="tag tag-rec">推荐</i>';
                } else if(video){
                    tagStr = '<i class="tag tag-video">视频</i>';
                } else if(nuanwen) {
                    tagStr = '<i class="tag tag-nuanwen">暖文</i>';
                } else if(iszd){
                    tagStr = '<i class="tag tag-zd">顶</i>';
                }

                // 置顶新闻缓存
                if(iszd){
                    var newId=url.substring(url.lastIndexOf('/') + 1, url.indexOf('.html'));
                    scope.cacheStickNews(newId,"stick_news");
                }

                if(scope.newsType === 'meinv'){
                    url += '?fr=meinv&#&gid=1&pid=1';
                } else {
                    // 非原生广告（原生广告url中不添加参数）
                    if(isadv != '1'){   // jshint ignore:line
                        url += '?idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + scope.newsType + '&pgnum=' + scope.pgNum;
                    }
                }
                if(scope.newsType === 'meinv'){ // 美女特殊处理
                    $newsList.append('<section class="news-item news-item-s4">' + 
                        '<a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                            '<div class="news-wrap">' + 
                                '<h3>' + topic + '</h3>' + 
                                '<div class="img-wrap clearfix"><mip-img class="lazy fl" src="' + imgArr[0].src + '"></div>' + 
                            '</div>' + 
                        '</a>' + 
                        '<div class="options">' + 
                            '<span class="num">' + picnums + ' 图</span>' + 
                            '<span class="view">' + GLOBAL.Util.getSpecialCountStr(urlpv) + '</span>' + 
                            '<span class="split">|</span>' + 
                            '<span class="J-good good" data-rowkey="' + rowkey + '">' + praisecnt + '</span>' + 
                            '<span class="J-bad bad" data-rowkey="' + rowkey + '">' + tramplecnt + '</span>' + 
                        '</div>' + 
                    '</section>');
                } else {
                    // 阅读量（PV为0就不展示评论数和pv量）
                    if(urlpv !== 0){
                        urlpvStr = '<em class="tag tag-view">' + GLOBAL.Util.getSpecialCountStr(urlpv) + '阅读</em>';
                        commentCountStr = '<em class="tag tag-com">' + GLOBAL.Util.getSpecialCountStr(commentCount) + '评论</em>';
                    }

                    /*======== 新闻流 =========*/
                    // 视频模式（直接播放的视频）
                    if(videonews == '1'){   // jshint ignore:line
                        urlpvStr = urlpvStr.replace('阅读', '观看');
                        if(isThanAndroid4){
                            var videoImg = item.lbimg[0].src;
                            var $itemVideo = $('<section class="news-item news-item-video">' + 
                                '<div class="video-wrap">' + 
                                    '<h3>' + topic + '</h3>' + 
                                    '<div class="J-video-box video-box">' + 
                                        '<mip-video controls="auto" data-type="' + type + '" data-idx="' + (scope.idx+i+1) + '" poster="' + videoImg + '" autobuffer="true" preload="none">' + 
                                            '<source src="' + videoList[0].src + '" type="video/mp4">您的浏览器不支持该视频播放。' + 
                                        '</video>' + 
                                    '</div>' + 
                                    '<p class="tags clearfix">' + 
                                        '<em class="time"><i class="video">视频</i></em>' + 
                                        '<em class="src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                    '</p>' + 
                                '</div>' + 
                            '</section>');
                            $newsList.append($itemVideo);
                        }
                    // 需要点击进去播放的视频
                    } else if(videonews == '2'){        // jshint ignore:line
                        urlpvStr = urlpvStr.replace('阅读', '观看');
                        if(isThanAndroid4){
                            $newsList.append('<section class="news-item news-item-video-link">' + 
                                '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                    '<div class="news-wrap clearfix">' + 
                                        '<div class="txt-wrap fl">' + 
                                            '<h3>' + topic + '</h3>' + 
                                            '<p class="tags clearfix">' + 
                                                '<em class="time"><i class="video">视频</i></em>' + commentCountStr + urlpvStr + 
                                                '<em class="src">' + source + '</em>' + 
                                            '</p>' + 
                                        '</div>' + 
                                        '<div class="img-wrap fr">' + 
                                            '<mip-img class="lazy" src="' + imgArr[0].src + '">' + 
                                            '<span class="play-btn"></span>' + 
                                        '</div>' + 
                                    '</div>' + 
                                '</a>' + 
                            '</section>');
                        }
                    } else{
                        dateStr = scope.getSpecialTime(dateStr);
                        // 大图模式
                        if(ispicnews == '1'){   // jshint ignore:line
                            imgArr = item.lbimg;
                            $newsList.append('<section class="news-item news-item-s3">' + 
                                '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                    '<div class="news-wrap">' + 
                                        '<h3>' + topic + '</h3>' + 
                                        '<div class="img-wrap clearfix"><mip-img class="lazy fl" src="' + imgArr[0].src + '"></div>' + 
                                        '<p class="tags clearfix">' + 
                                            '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' +
                                            '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                        '</p>' + 
                                    '</div>' + 
                                '</a>' + 
                            '</section>');
                        // 图片模式
                        } else if(ispicnews == '2'){    // jshint ignore:line
                            imgArr = item.lbimg;
                            $newsList.append('<section class="news-item news-item-pic-link-special">' + 
                                '<a data-type="' + type + '" data-subtype="" href="' + url + '">' + 
                                    '<h3>' + topic + '</h3>' + 
                                    '<div class="img-wrap">' + 
                                        '<mip-img src="' + imgArr[0].src + '" alt="">' + 
                                        '<span class="num">' + picnums + '图</span>' + 
                                    '</div>' + 
                                    '<p class="tags clearfix">' + 
                                        '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' +
                                        '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                    '</p>' + 
                                '</a>' + 
                            '</section>');
                        // 无图模式
                        } else if(ispicnews == '-1'){   // jshint ignore:line
                            $newsList.append('<section class="news-item news-item-noimg">' + 
                                '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                    '<div class="news-wrap">' + 
                                        '<h3>' + topic + '</h3>' + 
                                        '<p class="tags clearfix">' + 
                                            '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' +
                                            '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                        '</p>' + 
                                    '</div>' + 
                                '</a>' + 
                            '</section>');
                        } else if(ispicnews == '0'){    // jshint ignore:line
                            // 三图模式
                            if(imgLen >= 3){        
                                $newsList.append('<section class="news-item news-item-s2">' + 
                                    '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                        '<div class="news-wrap">' + 
                                            '<h3>' + topic + '</h3>' + 
                                            '<div class="img-wrap clearfix">' + 
                                                '<div class="img fl"><mip-img class="lazy" src="' + imgArr[0].src + '"></div>' + 
                                                '<div class="img fl"><mip-img class="lazy" src="' + imgArr[1].src + '"></div>' + 
                                                '<div class="img fl"><mip-img class="lazy" src="' + imgArr[2].src + '"></div>' + 
                                            '</div>' + 
                                            '<p class="tags clearfix">' + 
                                                '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' +
                                                '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                            '</p>' + 
                                        '</div>' + 
                                    '</a>' + 
                                '</section>');
                            // 单图模式
                            } else if(imgLen >= 1) {    
                                $newsList.append('<section class="news-item news-item-s1">' + 
                                    '<a ' + advStr + ' data-accurateurl="' + accurateurl + '" data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '">' + 
                                        '<div class="news-wrap clearfix">' + 
                                            '<div class="txt-wrap fl">' + 
                                                '<h3>' + topic + '</h3>' + 
                                                '<p class="tags clearfix">' + 
                                                    '<em class="tag tag-time">' + (tagStr ? tagStr : dateStr) + '</em>' +
                                                    '<em class="tag tag-src">' + source + '</em>' + commentCountStr + urlpvStr + 
                                                '</p>' + 
                                            '</div>' + 
                                            '<div class="img-wrap fr"><mip-img class="lazy" src="' + imgArr[0].src + '"></div>' + 
                                        '</div>' + 
                                    '</a>' + 
                                '</section>');
                            }
                        }
                    } 

                    // try {
                    //     scope.loadGg(i, len, dspData);
                    // } catch (e) {
                    //     console.error('loadGg has error：\n', e);
                    // }
                }
            }
            // 记录idx
            wsCache.set('idx_' + scope.newsType, scope.idx + len, {exp: 40 * 60});
            setTimeout(function(){
                // 缓存当前类别加载的新闻（缓存20分钟）
                wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 40 * 60});
            }, 400);
        },
        
        /**
         * 加载广告（dsp广告或者联盟广告--后台根据竞价作判断）
         * @return {[type]} [description]
         */
        loadGg: function(i, len, dspData){
            // 无广告情况处理
            try {
                if(GLOBAL.Et.gg.my.nogg){
                    return;
                }
            } catch (e) {console.error(e);}
            var scope = this,
                data = (dspData && dspData.data) || null,
                dsp_1 = null,
                dsp1 = null,
                dsp2 = null,
                dsp3 = null,
                dsp4 = null,
                dlen = (data instanceof Array) ? data.length : 0,
                di = 0;
            if(dlen){
                // 插入广告
                // 特殊位置广告（最初是DSP广告位置；后来改成只放百度广告；最终改成百度和dsp竞价投放）
                if(i === 6){    
                    // 判断是否放DSP广告，否则放百度广告。
                    for (di = 0; di < dlen; di++) {
                        if(Number(data[di].idx) === -1){
                            dsp_1 = data[di];
                        }
                    }
                    if(dsp_1){
                        scope.loadDsp(dsp_1);
                    } else {
                        // scope.insertGgForPullUp(1);
                        // 特殊位置广告
                        scope.insertGgForDsp();
                    }
                } else if(i === 4){ // li
                    // 判断是否放DSP广告，否则放百度广告。
                    for (di = 0; di < dlen; di++) {
                        if(Number(data[di].idx) === 1){
                            dsp1 = data[di];
                        }
                    }
                    if(dsp1){
                        scope.loadDsp(dsp1);
                    } else {
                        scope.insertGgForPullUp(1);
                    }
                } else if(i === 9){ // li2
                    // 判断是否放DSP广告，否则放百度广告。
                    for (di = 0; di < dlen; di++) {
                        if(Number(data[di].idx) === 2){
                            dsp2 = data[di];
                        }
                    }
                    if(dsp2){
                        scope.loadDsp(dsp2);
                    } else {
                        scope.insertGgForPullUp(2);
                    }
                } else if(i === 14){    // li3
                    // 判断是否放DSP广告，否则放百度广告。
                    for (di = 0; di < dlen; di++) {
                        if(Number(data[di].idx) === 3){
                            dsp3 = data[di];
                        }
                    }
                    if(dsp3){
                        scope.loadDsp(dsp3);
                    } else {
                        scope.insertGgForPullUp(3);
                    }
                } else if(i === 19 || (i < 19 && i === len - 1)){   // li4
                    // 判断是否放DSP广告，否则放百度广告。
                    for (di = 0; di < dlen; di++) {
                        if(Number(data[di].idx) === 4){
                            dsp4 = data[di];
                        }
                    }
                    if(dsp4){
                        scope.loadDsp(dsp4);
                    } else {
                        scope.insertGgForPullUp(4);
                    }
                }
            } else {
                // 插入广告（li: 5（i===4）、li2: 11（i===9）、li3: 17（i===14））、li4: 23（i===19））
                if(i === 6 && scope.newsType !== 'shipin'){
                    // 特殊位置广告
                    scope.insertGgForDsp();
                } else if(i === 4){
                    // li
                    scope.insertGgForPullUp(1);
                } else if(i === 9){
                    // li2
                    scope.insertGgForPullUp(2);
                } else if(i === 14){
                    // li3
                    scope.insertGgForPullUp(3);
                } else if(i === 19 || (i < 19 && i === len - 1)){
                    // li4
                    scope.insertGgForPullUp(4);
                }
            }
        },

        /**
         * 上拉插入广告
         * @param  {[type]} pos 广告位置
         * @return {[type]}     [description]
         */
        insertGgForPullUp: function(pos){
            // 无广告情况处理
            try {
                if(GLOBAL.Et.gg.my.nogg){
                    return;
                }
            } catch (e) {console.error(e);}

            var scope = this,
                ggPos = 'li',
                myGg = GLOBAL.Et.gg.my,
                gg = '',
                alliance = '',  // 联盟
                ggId = '',      // 广告ID
                // ifHeight = '',
                // iframeId = '',
                $bdDom = '';
            // 视频频道全部使用渠道的广告ID
            if(isFirstPage){
            // if(isFirstPage || scope.newsType === 'shipin'){
                switch(pos) {
                    case 1: ggPos = 'li'; break;
                    case 2: ggPos = 'li2'; break;
                    case 3: ggPos = 'li3'; break;
                    case 4: ggPos = 'li4'; break;
                }
                gg = myGg[ggPos];
                if(!gg){
                    return;
                }
                alliance = gg ? gg.split('_')[0] : null;
                ggId = gg ? gg.split('_')[1] : null;
            } else {
                // 对于只能放搜狗广告的渠道做特殊处理
                ggId = GLOBAL.Et.onlySogouGgId;
                if(ggId){
                    alliance = 'sogou';
                } else {
                    alliance = 'baidu';
                    ggId = tempGgForPullUp.shift();
                    // 缓存已经显示的广告ID（主要是因为新闻会作缓存，所以广告ID也需要分频道缓存，而且缓存时间必须一致）
                    ggId && scope.cacheBdGgIdForPullUp(ggId);   // jshint ignore:line
                }
            }
            if(!ggId){
                return;
            }
            switch(alliance) {
                case 'baidu':
                    // 百度三宫格
                    $bdDom = $('<div class="bdgg-wrap" data-ggid="' + ggId + '"></div>');
                    $newsList.append($bdDom);
                    scope.loadBaiduGg($bdDom, ggId);
                    break;
                case 'sogou':
                    $newsList.append('<div class="gg-wrap"><iframe src="https://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe></div>');
                    break;
            }
            
        },

        /**
         * DSP广告下线（用百度广告替换）
         * @return {[type]} [description]
         */
        insertGgForDsp: function(){
            // 无广告情况处理
            try {
                if(GLOBAL.Et.gg.my.nogg || GLOBAL.Et.onlySogouGgId){
                    return;
                }
            } catch (e) {console.error(e);}
            var scope = this,
                $bdDom = '',
                ggId = tempGgForDsp.shift();
            // 缓存已经显示的广告ID（主要是因为新闻会作缓存，所以广告ID也需要分频道缓存，而且缓存时间必须一致）
            ggId && scope.cacheBdGgIdForDsp(ggId);  // jshint ignore:line
            $bdDom = $('<div class="bdgg-wrap" data-ggid="' + ggId + '"></div>');
            $newsList.append($bdDom);
            scope.loadBaiduGg($bdDom, ggId);
        },

        /**
         * 缓存已经加载过的百度广告ID（上拉加载）
         * @param  {[type]} id 广告ID
         * @return {[type]}    [description]
         */
        cacheBdGgIdForPullUp: function(id){
            var scope = this,
                arr = wsCache.get('bdggid_pullup_' + scope.newsType) || [];
            if(!arr.contains(id)){
                arr.push(id);
            }
            wsCache.set('bdggid_pullup_' + scope.newsType, arr, {exp: 40 * 60});
        },

        /**
         * 缓存已经加载过的百度广告ID（上拉加载） ---- 替换dsp广告
         * @param  {[type]} id 广告ID
         * @return {[type]}    [description]
         */
        cacheBdGgIdForDsp: function(id){
            var scope = this,
                arr = wsCache.get('bdggid_dsp_' + scope.newsType) || [];
            if(!arr.contains(id)){
                arr.push(id);
            }
            wsCache.set('bdggid_dsp_' + scope.newsType, arr, {exp: 40 * 60});
        },

        /**
         * 缓存已经加载过的百度广告ID（下拉叠加）
         * @param  {[type]} id 广告ID
         * @return {[type]}    [description]
         */
        cacheBdGgIdForPullDown: function(id){
            var scope = this,
                arr = wsCache.get('bdggid_pulldown_' + scope.newsType) || [];
            if(!arr.contains(id)){
                arr.push(id);
            }
            wsCache.set('bdggid_pulldown_' + scope.newsType, arr, {exp: 40 * 60});
        },

        /**
         * 为了解决百度广告套iframe出现样式bug的问题，对百度广告单独做异步加载处理（去掉iframe）
         */
        loadBaiduGg: function($bdDom, ggId){
            // 分析是5.0广告还是5.0之前的广告
            var scope = this,
                ggConfig = '',
                reg = new RegExp(/^u[0-9]{7}/),
                isV5 = !reg.test(ggId);
            if(isV5){
                $bdDom.append('<div id="' + ggId + '"></div><div class="line"></div>');
                scope.getScript('https://jiaoben.eastday.com/' + ggId + '.js', function(){}, $('#' + ggId)[0]);
            } else {
                ggConfig = '(window.cpro_mobile_slot = window.cpro_mobile_slot || []).push({id : "' + ggId + '",at:"3", pat:"21", ptLH:"30", tn:"template_inlay_all_mobile_lu_native", rss1:"#FFFFFF", titFF:"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", titFS:"12", rss2:"#000000", ptFS:"17", ptFC:"#000000", ptFF:"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", ptFW:"0", conpl:"15", conpr:"15", conpt:"8", conpb:"15", cpro_h:"140", ptn:"1", ptp:"0", itecpl:"10", piw:"0", pih:"0", ptDesc:"2", ptLogo:"0", ptLogoFS:"10", ptLogoBg:"#FFFFFF", ptLogoC:"#999999", ptLogoH:"0", ptLogoW:"0"})';
                $bdDom.append('<div id="cpro_' + ggId + '"></div><div class="line"></div>');
                scope.createScript(ggConfig, function(){
                    scope.getScript('https://jiaoben.eastday.com/cpro/ui/cm.js', function(){}, $('#cpro_' + ggId)[0]);
                }, $('#cpro_' + ggId)[0]);
            }
        },

        /**
         * 获取dsp广告
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getDsp: function(callback){
            var scope = this;
            $.ajax({
                url: dspUrl,
                data: {
                    type: scope.newsType,
                    qid: scope.qid,
                    uid: scope.userId, // 用户ID
                    os: scope.osType,
                    readhistory: scope.readUrl,
                    pgnum: scope.pgNum
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 3000,
                beforeSend: function(){
                },
                success: function(data){
                    callback && callback(data); // jshint ignore:line
                },
                error: function(jqXHR, textStatus){
                    console.error(textStatus);
                    callback && callback(0);    // jshint ignore:line
                }
            });
        },

        /**
         * 重新加载数据
         */
        reloadData: function(){
            var scope = this;
            scope.changeRefreshStatus();
            // 还原缓存内容
            wsCache.delete('news_pos_' + scope.newsType);   // jshint ignore:line
            wsCache.delete('news_' + scope.newsType);   // jshint ignore:line
            wsCache.set('pulldown_pgnum_' + scope.newsType, 0, {exp: 24 * 3600});
            scope.refreshData(function(){
                scope.highlightPraiseTrample();
            });
        },

        /**
         * 加载图片频道的图片分类
         */
        loadPicCtg: function(){
            var scope = this;
            // 添加图片分类
            if(!$picCtgWrap){
                $picCtgWrap = $('<div class="news-pic-ctg"></div>');
                for (var i = 0; i < picCtg.length; i++) {
                    var pc = picCtg[i];
                    if(scope.pnewsType === pc.value){
                        $picCtgWrap.append('<a class="J-pic-ctg active" data-type="' + pc.value + '" href="javascript:;">' + pc.name + '</a>');
                    } else {
                    $picCtgWrap.append('<a class="J-pic-ctg" data-type="' + pc.value + '" href="javascript:;">' + pc.name + '</a>');
                    }
                }
                $newsList.before($picCtgWrap);
                $picCtgWrap.on('click', '.J-pic-ctg', function(){
                    var $this = $(this);
                    $this.addClass('active').siblings().removeClass('active');
                    scope.pnewsType = $this.attr('data-type');
                    // 缓存当前图片频道de类别（缓存20分钟）
                    wsCache.set('pnewstype', scope.pnewsType, {exp: 40 * 60});
                    // 加载点击的频道的数据
                    scope.reloadData();
                    // scope.loadPicData();
                });
            }
        },

    }
    // FastClick.attach(document.body);
    var en = new EastNews();
    en.init();
    return customElement;
    
})