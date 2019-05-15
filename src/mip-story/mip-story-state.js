/**
 *  @file 处理一些主题模板样式的的正则匹配
 */

define(function (require) {
    var util = require('util');
    var hash = require('hash');

    // 记住状态
    var storage = require('./mip-story-storage');
    var constConfig = require('./mip-story-config');
    var prefix = constConfig.STORY_PREFIX;
    var preloadLenght = constConfig.PRELOAD_PAGES;
    var originalUrl = util.getOriginalUrl().split('?')[0].split('#')[0];
    var currentPageIndex = getState() || 0;

    function getState() {
        var hashPageIndex = hash.hashTree[prefix] && hash.hashTree[prefix].value;
        var pageIndex = 0;
        try {
            pageIndex = storage.get(originalUrl) || parseInt(hashPageIndex);
        } catch (e) {}
        return pageIndex;
    }

    function setState(index) {
        storage.set(originalUrl, index);
        // var hashStr = '#';
        // var tree = hash.hashTree
        // for (var item in tree) {
        //     if (item === prefix){
        //         continue;
        //     }
        //     hashStr += item + tree[item].sep + tree[item].value + '&';
        // }
        // currentHash = hashStr + prefix + '=' + index;
        // window.top.location.replace(currentHash);
    }

    function getPageStateIndex (viewsLength) {
        var maxIndex = viewsLength - 1;
        var curIndex =  currentPageIndex > maxIndex ? maxIndex : currentPageIndex;
        currentIndex = curIndex;
        preIndex = curIndex > 0 ? curIndex - 1 : 0;
        nextIndex = curIndex < maxIndex ?  curIndex + 1 : maxIndex;
        return [preIndex, currentIndex, nextIndex];
    }

    function getPreloadIndex (viewsLength) {
        var preloadIndex = [];
        var pageState = getPageStateIndex(viewsLength);
        var minIndex = pageState[0] - 1 >= 0 ? pageState[0] - 1 : 0;
        var maxIndex = pageState[2] >=  viewsLength - 1 ? pageState[2] : pageState[2] + 1;

        preloadIndex.push(minIndex);
        preloadIndex = preloadIndex.concat(pageState);
        preloadIndex.push(maxIndex);

        return unique(preloadIndex);
    }

    function unique(array) {
        var res = [];
        for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
            for (var j = 0, resLen = res.length; j < resLen; j++ ) {
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

    return {
        currentPageIndex: currentPageIndex,
        setState: setState,
        getPageStateIndex: getPageStateIndex,
        getPreloadIndex: getPreloadIndex
    }

});