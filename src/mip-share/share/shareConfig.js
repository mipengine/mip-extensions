/**
 * @file 支持微信2次分享封装
 * @description 手百提供代码，原始文档在这儿 http://agroup.baidu.com/box/md/view/294700
 * @author fct
 */
/* eslint-disable */
define(function (require) {

    // ------------------------------------- 手百提供分享代码 -------------------------------------
    var UA = navigator.userAgent;
    var isWX = /micromessenger\//i.test(UA); // 微信
    var isBox = / baiduboxapp\//i.test(UA); // 手百
    var isQQ = /\bqq\b/i.test(UA); // QQ
    var isWeibo = /\bweibo\b/i.test(UA); // weibo
    var emptyFn = function () { };
    var protocol = location.protocol;
    var href = location.href;
    var defaultTitle = '百度App';
    var defaultDesc = '百度App';
    var defaultIcon = 'https://b.bdstatic.com/searchbox/icms/searchbox/img/po/act/newuserredpack/box_logo.png';
    // 存储 init 时的 options 参数
    var OPTIONS;
    // ------------------------------------- 工具函数 -------------------------------------

    // 数组去重, 微信获取签名数据时，站长传回的jsApiList可能和默认值重复
    function unique (array) {
        var res = [];
        for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
            for (var j = 0, resLen = res.length; j < resLen; j++) {
                if (array[i] === res[j]) {
                    break;
                }
            }
            if (j === resLen) {
                res.push(array[i])
            }
        }
        return res;
    }

    function objForEach (obj, fn) {
        var key, result
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result = fn.call(obj, key, obj[key])
                if (result === false) {
                    break
                }
            }
        }
    }
    // 将 {a:10,b:20} 变为 a=10&b=20
    function json2Query (json) {
        if (typeof json === 'string') {
            return json
        }
        var arr = []
        for (var i in json) {
            arr.push(i + '=' + json[i])
        }
        return arr.join('&')
    }
    function trim (s) {
        return s.replace(/^\s+/, function () {
            return ''
        }).replace(/\s+$/, function () {
            return ''
        })
    }
    // JSONP 加载器
    function loadJS (opts) {
        var HEAD = document.head || document.getElementsByTagName('head')[0] || document.documentElement
        var js = document.createElement('script')
        js.type = 'text/javascript'
        var url, data, success, error, timeout
        url = opts.url
        data = opts.data
        success = opts.success || emptyFn
        error = opts.error || emptyFn
        timeout = opts.timeout || 2e4 // 20秒超时
        if (typeof data === 'object') {
            data = json2Query(data)
        }
        if (data) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + data
        }
        url = url.replace(/[&?]{1,2}/, '?')
        var callbackName
        if (/=\?/.test(url)) {
            callbackName = '_box_jsonp' + Date.now()
            url = url.replace(/=\?/, '=' + callbackName)
        }
        js.src = url
        var done = true,
            timer
        var clear = function () {
            // 防止多次回调
            if (callbackName) {
                delete window[callbackName]
            }
            timer && clearTimeout(timer)
            js.onload = js.onreadystatechange = js.onerror = null
            // HEAD.removeChild(js)
            js = null
        }
        var cb = function (evt, isTimeout) {
            if (js && (!js.readyState || /loaded|complete/.test(js.readyState))) {
                clear()
                if (done && typeof success === 'function') {
                    success.apply(null, [].slice.call(arguments))
                }
                done = false
            }
        }
        var errorCallback = function (evt) {
            clear()
            if (done) {
                error(evt)
            }
            done = false
        }
        if (callbackName) {
            window[callbackName] = cb
        }
        timer = setTimeout(function () {
            clear()
            if (done) {
                error('timeout')
            }
            done = false
        }, timeout)
        js.onload = js.onreadystatechange = js.onerror = cb
        js.onerror = errorCallback
        HEAD.appendChild(js)
    }
    // 获取一个 elem 的 text
    function getText (elem) {
        if (elem.nodeType !== 1) {
            return ''
        }
        var result = elem.innerHTML.replace(/\n/img, function () {
            return ''
        }).replace(/<script.*?script>/img, function () {
            return ''
        }).replace(/(<.*?>)|(<script>.*?<\/script>)/igm, function () {
            return ''
        })
        return trim(result)
    }
    // 获取页面上大于 290 * 290 的图片
    function getShareImg (callback, defaultUrl) {
        // 获取页面的图片
        var imgsOfPage = document.getElementsByTagName('img')
        var index, item
        var length = imgsOfPage.length
        // 只取前10个图片，多了忽略
        length = length <= 10 ? length : 10
        // 遍历
        for (index = 0; index < length; index++) {
            item = imgsOfPage[index];
            (function (src) {
                var newImg = document.createElement('img')
                newImg.src = src
                newImg.onload = function () {
                    if (newImg.width > 290 && newImg.height > 290) {
                        callback(newImg.src)
                    }
                }
            })(item.src)
        }
        // 1s 之后还没搞定，则返回默认值
        setTimeout(function () {
            callback(defaultUrl)
        }, 1000)
    }
    // ------------------------------------- 错误打点 -------------------------------------
    function sendErrorLog (evt, msg) {
        if (Math.random() <= 0.95 && href.indexOf('share_config_random=1') < 0) {
            // 抽样 0.05 概率
            return
        }
        if (!evt || !msg) {
            return
        }
        msg = encodeURIComponent(msg)
        // 特定的 pageid
        var page_id = '300_001'
        // 往 tcbox 打点
        var tcboxUrl = '//m.baidu.com/tcbox?service=bdbox&action=pblog&data=' + encodeURIComponent(JSON.stringify({
            appid: 1,
            dataid: 2,
            cateid: 26,
            actionid: 2,
            actiontype: "0",
            actiondata: {
                type: 0,
                timestamp: Date.now(),
                content: {
                    page_id: page_id,
                    logtype: 3,
                    type: 'c_' + evt,
                    msg: msg
                }
            }
        }))
        // 往 ispeed 打点
        var ispeedUrl = '//ispeed.baidu.com/e.gif?t=' + Date.now() + '&page_id=' + page_id + '&evt=c_' + evt + '&msg=' + msg
        // 根据协议判断打点链接
        var urls = [
            protocol + tcboxUrl,
            protocol + ispeedUrl
        ]
        // 发送打点
        urls.forEach(function (url) {
            // 开始打点
            var img = document.createElement('img')
            img.onload = img.onerror = img.onabort = function () {
                img = null
            }
            img.src = url
        })
    }
    // ------------------------------------- 配置分享信息 -------------------------------------
    function shareHandle (options, success, fail) {
        var debug = !!options.debug
        if (isBox) {
            //处于手百环境
            delete options.wx
            var bdbox = options.bdbox || {}
            if (!bdbox.source) {
                sendErrorLog('no_bdbox_source', href)
                if (debug) {
                    // alert('使用手百分享必须配置 source 参数')
                }
                return
            }
            var data = {
                type: 'url',
                mediaType: 'all',
                linkUrl: href,
                source: bdbox.source
            }
            for (var i in options) {
                if (i !== 'bdbox') {
                    data[i] = options[i]
                }
            }
            window['__BdboxShare_success__'] = success || console.log
            window['__BdboxShare_fail__'] = fail || console.log
            window.BoxShareData = {
                'options': data,
                successcallback: '__BdboxShare_success__',
                errorcallback: '__BdboxShare_fail__'
            }
        } else if (isWX || isQQ) {
            // 微信或者 QQ 中
            delete options.bdbox
            //初始化微信配置参数
            options.wx = options.wx || {}
            options.wx.appId = options.wx.appId || 'wxadc1a0c6b9096e89' // 默认百家号公共帐号，安全域是 baidu.com
            options.wx.jsApiList = options.wx.jsApiList || []
            options.wx.jsApiList = options.wx.jsApiList.concat(['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']) //@Todo去重
            options.wx.jsApiList = unique(options.wx.jsApiList);

            // 动态获取微信签名
            loadJS({
                url: protocol + options.wx.api,
                data: {
                    url: encodeURIComponent(href),
                    callback: '?',
                    ts: Date.now()
                },
                success: function (res) {
                    if (res.errno != 0) {
                        sendErrorLog('wx_gettoken_err', href)
                        if (debug) {
                            // alert('获取签名的接口错误：' + res.errmsg)
                        }
                        return
                    }
                    var data = res.data || {}
                    // --------------- 微信分享配置 ---------------
                    if (isWX) {
                        //初始化微信jssdk
                        wx.config({
                            debug: debug,
                            jsApiList: options.wx.jsApiList,
                            appId: data.appId,
                            nonceStr: data.nonceStr,
                            timestamp: data.timestamp,
                            signature: data.signature
                        })
                        // 各个分享的配置
                        var configData = {
                            title: options.title,
                            desc: options.content,
                            link: options.linkUrl,
                            imgUrl: options.iconUrl,
                            success: function () {
                                success && success()
                            },
                            cancel: function () {
                                fail && fail()
                            }
                        }
                        wx.ready(function () {
                            //配置微信朋友圈分享
                            wx.onMenuShareTimeline(configData)
                            //配置微信消息分享
                            wx.onMenuShareAppMessage(configData)
                            //配置QQ分享
                            wx.onMenuShareQQ(configData)
                            //配置腾讯微博
                            wx.onMenuShareWeibo(configData)
                            //配置QQ空间分享
                            wx.onMenuShareQZone(configData)
                        })
                    }
                    // --------------- QQ分享配置 ---------------
                    if (isQQ) {
                        setShareInfo({
                            title: options.title,
                            summary: options.content,
                            pic: options.iconUrl,
                            url: options.linkUrl,
                            // 微信权限验证配置信息，若不在微信传播，可忽略
                            WXconfig: {
                                swapTitleInWX: false, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
                                appId: data.appId, // 公众号的唯一标识
                                timestamp: data.timestamp, // 生成签名的时间戳
                                nonceStr: data.nonceStr, // 生成签名的随机串
                                signature: data.signature // 签名
                            }
                        })
                    }
                } // success end
            }) // loadJS end
        }
    }
    // ------------------------------------- 初始化配置 -------------------------------------
    function initConfig (options, success, fail) {
        if (typeof options !== 'object') {
            // console.log('shareConfig.init 参数错误')
            return
        }
        // 全局存储下来
        OPTIONS = options
        // debug
        var debug = !!options.debug
        // 判断依赖的 sdk 是否加载完
        if (isWX && !window.wx) {
            // wx.js 还没加载完
            if (debug) {
                // alert('微信 SDK 未加载完成')
            }
            return
        }
        if (isQQ && !window.setShareInfo) {
            // QQ 的 share.js 还没加载完
            if (debug) {
                // alert('QQ SDK 未加载完成')
            }
            return
        }
        // default 信息（即为配置，且又没有抓取到时，使用的信息）的补充
        if (!options.titleDefault) {
            // 保底方案，显示“百度App”
            options.titleDefault = defaultTitle
        }
        if (!options.contentDefault) {
            // 保底方案，显示“百度App”
            options.contentDefault = defaultDesc
        }
        if (!options.iconUrlDefault) {
            // 保底方案，显示手百 logo
            options.iconUrlDefault = defaultIcon
        }
        // 配置 title
        if (!options.title) {
            options.title = trim(document.title)
            if (!options.title) {
                // 抓取不到使用保底方案
                options.title = options.titleDefault
            }
        }
        // 配置 linkUrl
        if (!options.linkUrl) {
            options.linkUrl = href
        }
        // 配置 content
        if (!options.content) {
            // 默认值为 body
            options.content = document.body
        }
        if (options.content.nodeType === 1) {
            // elem 节点
            options.content = getText(options.content)
        }
        if (!options.content || typeof options.content !== 'string') {
            // 抓取不到使用保底方案
            options.content = options.contentDefault
        }
        if (options.content.length > 50) {
            // 限制长度，否则手百内调起其他app可能会有问题
            options.content = options.content.slice(0, 50) + '...'
        }
        // 配置 iconUrl
        var _isGetImgCalled = false
        if (!options.iconUrl) {
            // 无图片，先试图获取图片再执行
            getShareImg(function (result) {
                // 记录状态，不重复调用
                if (_isGetImgCalled) {
                    return
                }
                _isGetImgCalled = true
                // 设置 icon 值并执行
                options.iconUrl = result
                shareHandle(options, success, fail)
            }, options.iconUrlDefault)
        } else {
            // 有图片，则直接执行
            shareHandle(options, success, fail)
        }
    }
    var sealConfig = {
        init: function () {
            var _arguments = arguments
            if (isWX) {
                // 在微信中
                if (window.wx) {
                    // 已经引入微信 jssdk
                    initConfig.apply(this, _arguments);

                } else {
                    require(["./weixinsdk"], function (wx) {
                        wx();
                        initConfig.apply(this, _arguments)
                    });
                }
            } else {
                // 其他环境中
                initConfig.apply(this, _arguments)
            }
        },
        update: function (options) {
            if (!OPTIONS) {
                return
            }
            // 更新信息
            objForEach(OPTIONS, function (key, val) {
                if (options[key] == null) {
                    options[key] = val
                }
            })
            if (isWX) {
                if (window.wx) {
                    initConfig.call(this, options)
                }
            } else {
                initConfig.call(this, options)
            }
        }
    }
    // ------------------------------------- 手百提供分享代码 -------------------------------------
    /**
     * 全局入口配置函数
     */
    function shareConfig (options) {
        var defaultConfig = options;
        defaultConfig["channel"] = "pageSeach";
        defaultConfig["debug"] = false;
        defaultConfig["linkUrl"] = location.href;
        sealConfig.init(defaultConfig);
    }
    shareConfig.prototype.update = function (options) {
        sealConfig.update(options)
    }
    return shareConfig;
});