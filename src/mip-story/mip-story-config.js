/**
 *  @file mip-story-config.js 存储小故事的配置常量
 *  
 */

define(function (require) {
    var viewport = require('viewport');

    // 小故事标识
    var MIP_I_STORY_STANDALONE = 'mip-i-story-standalone';

    // 小故事页面类型
    var PAGE_ROLE = {
        contentPage: 'contentPage',
        sharePage: 'sharePage'
    };

    // 进度条状态class
    var PROGRESS_STATE = {
        active: 'mip-story-page-progress-bar-active',
        visited: 'mip-story-page-progress-bar-visited'
    };

    // 背景音乐配置属性
    var BACKGROUND_AUDIO = 'background-audio';

    // 翻页阈值 
    var SWITCHPAGE_THRESHOLD = {
        horizontal: viewport.getWidth() * 0.15, // 水平翻页阈值
        vertical: viewport.getHeight() * 0.1 // 垂直翻页阈值
    };

    // 翻页走向
    var DIRECTIONMAP = {
        back: 'back',
        goto: 'goto'
    };

    // 当前页状态
    var PAGE_STATE = {
        current: 'current',
        active: 'active'
    };

    // 熊掌号api
    var MSITEAPI = 'https://msite.baidu.com/home/bar?office_id=';
    
    // 预加载页数
    var PRELOAD_PAGES = 2;

    return {
        MIP_I_STORY_STANDALONE: MIP_I_STORY_STANDALONE,
        PAGE_ROLE: PAGE_ROLE,
        PROGRESS_STATE: PROGRESS_STATE,
        BACKGROUND_AUDIO: BACKGROUND_AUDIO,
        SWITCHPAGE_THRESHOLD: SWITCHPAGE_THRESHOLD,
        DIRECTIONMAP: DIRECTIONMAP,
        PAGE_STATE: PAGE_STATE,
        MSITEAPI: MSITEAPI,
        PRELOAD_PAGES: PRELOAD_PAGES
    }
});