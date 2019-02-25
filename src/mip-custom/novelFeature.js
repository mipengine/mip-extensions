/**
 * @file mip-custom/novel
 * @author liujing37
 */
define(function (require) {

  var globalCustomElementInstance;
  var initElement;
  var dom = require('mip-custom/dom');
  var util = require('util');

  /**
   * [addNovelListener 添加小说相关的事件监听]
   *
   */
  function handler(e) {
    var me = globalCustomElementInstance;
    var detailData = e && e.detail && e.detail[0] || {};
    me.customId = detailData.customId;
    me.novelData = detailData.novelData;
    if (detailData.fromSearch) {
        me.fromSearch = detailData.fromSearch;
    }
    // XXX:解决window实例和组件实例的诡异的问题。。。。。。
    if (me.customId === window.MIP.viewer.page.currentPageId
        && me.element.querySelector('.mip-custom-placeholder')) {
        // 广告合并的策略
        var novelInstance = window.MIP.viewer.page.isRootPage
            ? window.MIP.novelInstance
            : window.parent.MIP.novelInstance;
        novelInstance = novelInstance || {};
        var adsCache = novelInstance.adsCache || {};
        //   common 正常发送
        window.MIP.setCommonFetch = true;
        initElement.apply(me, [dom]);
        window.removeEventListener('showAdvertising', handler);
    }
    // 当广告合并后首次请求后需要告知RD该页展现的广告，额外多一次广告请求，但是本次请求忽略
    if (me.customId === window.MIP.viewer.page.currentPageId
        && adsCache.ignoreSendLog) {
          initElement.apply(me, [dom]);
    }
  }

  /**
   * [addNovelListener 添加小说相关的事件监听]
   *
   * @param {Function} cb 回调函数，用来初始化ele
   */
  function addNovelListener(cb) {
    var me = this;
    dom.addPlaceholder.apply(this);
    globalCustomElementInstance = this;
    initElement = cb;
    window.addEventListener('ignoreSendLogFetch', function (e) {
        var detailData = e && e.detail && e.detail[0] || {};
        me.customId = detailData.customId;
        me.novelData = detailData.novelData;
        initElement.apply(me, [dom]);
    });
    // 监听小说shell播放的广告请求的事件
    window.addEventListener('showAdvertising', handler);
    // 当小说shell优先加载时——向小说shell发送custom已经ready的状态以方便后续事件的执行
    var shellWindow = window.MIP.viewer.page.isRootPage ? window : window.parent;
    // 定制化再加确认事件事件防止
    window.addEventListener('customReadyConfirm', function () {
        window.MIP.viewer.page.emitCustomEvent(shellWindow, false, {
            name: 'customReady',
            data: {
                customPageId: window.MIP.viewer.page.currentPageId
            }
        });
    });
    window.MIP.viewer.page.emitCustomEvent(shellWindow, false, {
        name: 'customReady',
        data: {
            customPageId: window.MIP.viewer.page.currentPageId
        }
    });
  }

  /**
   * [getNovelDate 小说的特殊参数——novelData和fromSearch]
   *
   * @param {string} urlParam 实际的common的URL
   */
  function addNovelDate (urlParam) {
    var url = urlParam;
    if (this.novelData) {
        var novelData = encodeURIComponent(JSON.stringify(this.novelData));
        url = url + '&novelData=' + novelData;
    }
    if (this.fromSearch) {
        url = url + '&fromSearch=' + this.fromSearch;
    }
    return url;
  }

  /**
   * 获取当前定制化页面的window——小说垂类
   *
   * @return {window} 当前iframe的window
   */
  function getCurrentWindow() {
    var pageId = window.MIP.viewer.page.currentPageId || '';
    var pageInfo = window.MIP.viewer.page.getPageById(pageId);
    return pageInfo.targetWindow;
  }

  /**
   * [getNovelDate 小说的特殊参数——novelData和fromSearch]
   *
   * @param {Object} data fetch返回的数据
   * @param {HTMLElement} element 数据返回后需要渲染的element
   * @param {resolve} resolve promise
   */
  function renderNovelCacheAdData (data, element, resolve) {
    var currentWindow = getCurrentWindow();
    var isRootPage = currentWindow.MIP.viewer.page.isRootPage;
    var novelInstance = isRootPage ? window.MIP.novelInstance : window.parent.MIP.novelInstance;
    var adsCache = novelInstance.adsCache || {};
    var rendered = false;
    if (JSON.stringify(adsCache) === "{}") {
        // 当请求走的是小流量的广告合并时，需要走新的逻辑，用schema字段来区分，需要修改data.data
        var adTime = +new Date();
        data.data.adTime = adTime;
        window.addEventListener('showAdStrategyCache', function (e) {
            var adData = e && e.detail && e.detail[0] || {};
            // 模板的前端渲染
            rendered = true;
            resolve && resolve(adData)
        });
        window.MIP.viewer.page.emitCustomEvent(isRootPage ? window : window.parent, false, {
            name: 'adDataReady',
            data: {
                pageId: window.MIP.viewer.page.currentPageId,
                adData: data.data
            }
        });
    }
    // 将各种情况统一，这里需谨慎
    if ((!rendered && adsCache.directRender != null && !adsCache.ignoreSendLog) ||
        (!rendered && adsCache.noAdsRender != null && adsCache.noAdsRender)
    ) {
        renderWithNoCache(data, element, resolve);
    }
    
  }
  /**
   * 给 renderCacheDataByTpl 套一层事件，让 mip-custom 等待小说的 nocache 返回的数据
   *
   * @param {Object} data common 返回数据
   * @param {HTMLElement} element 数据返回后需要渲染的element
   * @param {resolve} resolve promise
   */
  function renderWithNoCache (data, element, resolve) {
    var win = getCurrentWindow();
    var isRootPage = win.MIP.viewer.page.isRootPage;
    // 自测的时候发现不知道为啥会调用多次
    var once = true;
    win.addEventListener('addNoCacheAds', function () {
        once && (renderCacheDataByTpl (data, element, resolve));
        once = false;
    });
    win.MIP.viewer.page.emitCustomEvent(isRootPage ? win : win.parent, false, {
        name: 'noCacheAdDataReady',
        data: {
            pageId: win.MIP.viewer.page.currentPageId,
            adData: data.data
        }
    });
    setTimeout(function (){
        renderCacheDataByTpl (data, element, resolve)
    }, 1000);
  }
  /**
   * 获取当前定制化页面的window——小说垂类
   *
   * @param {Object} data fetch返回的数据
   * @param {HTMLElement} element 数据返回后需要渲染的element
   * @param {resolve} resolve promise
   */
  function renderCacheDataByTpl (data, element, resolve) {
    var currentWindow = getCurrentWindow();
    var isRootPage = currentWindow.MIP.viewer.page.isRootPage;
    var novelInstance = isRootPage
        ? currentWindow.MIP.novelInstance
        : currentWindow.parent.MIP.novelInstance;
    var adsCache = novelInstance.adsCache || {};
    var novelAds = adsCache.adStrategyCacheData && adsCache.adStrategyCacheData.template || [];
    // 对小说传入的广告数据中的template进行遍历，把请求回来的tpl拼入
    if (novelAds) {
        novelAds.map(function (value) {
            // 由于template的结构是数组嵌套数组
            if (Array.isArray(value)) {
                value.map(function (ad) {
                    if (ad.tpl == null && data.data.template[ad.tplName]) {
                        ad.tpl = data.data.template[ad.tplName];
                    }
                });
            }
        });
        util.fn.extend(adsCache.fetchedData.adData.template, data.data.template);
    }
    resolve && resolve(adsCache.adStrategyCacheData)
  }

  return {
    addNovelListener: addNovelListener,
    addNovelDate: addNovelDate,
    renderNovelCacheAdData: renderNovelCacheAdData
  };
});
