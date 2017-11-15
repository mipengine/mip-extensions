/**
 * @file ghostHunter - 0.2.3
 * Copyright (C) 2014
 * @author Jamal Neufeld (jamal@i11u.me) JennyL(jiaojiaomao220@163.com)
 * MIT Licensed
 * @license
 */
define(function (require) {

    // The lunr 0.4.3 library is included here to perform the fulltext searching.
    // lunr is copyright (C) 2013 Oliver Nightingale. MIT Licensed
    var lunr = require('./lunr.min');
    var $ = require('jquery');

    // This is the main plugin definition
    $.fn.ghostHunter = function (options) {
        // Here we use jQuery's extend to set default values if they weren't set by the user
        var opts = $.extend({}, $.fn.ghostHunter.defaults, options);
        if (opts.results) {
            pluginMethods.init(this, opts);
            return pluginMethods;
        }

    };

    var resultTpl = '<a href=\'<%link%>\'><p><h2><%title%></h2>'
        + '<%description%></p><p><h4><%pubDate%></h4><h4>Tags: <%category%></h4>'
        + '</p></a>';

    $.fn.ghostHunter.defaults = {
        results: false,
        rss: '/rss',
        onKeyUp: false,
        resultTpl: resultTpl,
        infoTpl: '<p>Number of posts found: <%amount%></p>',
        displaySearchInfo: true,
        zeroResultsInfo: true,
        infoMaxLength: 120,
        categorySeparator: '&nbsp;',
        globalSearch: true,
        before: false,
        onComplete: false
    };

    var pluginMethods = {

        isInit: false,

        init: function (target, opts) {

            var that = this;
            this.target = target;
            this.rss = opts.rss;
            this.results = opts.results;
            this.blogData = [];
            this.resultTpl = opts.resultTpl;
            this.infoTpl = opts.infoTpl;
            this.zeroResultsInfo = opts.zeroResultsInfo;
            this.displaySearchInfo = opts.displaySearchInfo;
            this.infoMaxLength = opts.infoMaxLength;
            this.categorySeparator = opts.categorySeparator;
            this.globalSearch = opts.globalSearch;
            this.before = opts.before;
            this.onComplete = opts.onComplete;

            // This is where we'll build the index for later searching. It's not a big deal to build it on every load as it takes almost no space without data
            if (this.globalSearch) {
                this.index = lunr(function () {
                    this.field('title', {
                        boost: 10
                    });
                    this.field('description');
                    this.field('content');
                    this.field('link');
                    this.field('category');
                    this.field('pubDate');
                    this.ref('id');
                });
            }
            else {
                this.index = lunr(function () {
                    this.field('title', {
                        boost: 10
                    });
                    this.field('description');
                    this.field('link');
                    this.field('category');
                    this.field('pubDate');
                    this.ref('id');
                });
            }

            target.focus(function () {
                that.loadRSS();
            });

            target.closest('form').submit(function (e) {
                e.preventDefault();
                that.find(target.val());
            });

            if (opts.onKeyUp) {
                that.loadRSS();
                target.keyup(function () {
                    that.find(target.val());
                });
            }

        },

        loadRSS: function () {
            if (this.isInit) {
                return false;
            }

            // Here we load an rss feed, parse it and load it into the index.
            // This function will not call on load to avoid unnecessary heavy
            // operations on a page if a visitor never ends up searching anything.

            var index = this.index;
            var rssURL = this.rss;
            var blogData = this.blogData;
            var maxLength = this.infoMaxLength;
            var separator = this.categorySeparator;
            var globalSearch = this.globalSearch;

            $.ajax({
                url: rssURL,
                success: function (data) {
                    var posts = $(data).find('item');

                    for (var i = 0; posts && i < posts.length; i++) {
                        var post = posts.eq(i);
                        var parsedData;
                        if (globalSearch) {
                            parsedData = {
                                id: i + 1,
                                title: post.find('title').text(),
                                description: $(post.find('description').text()).text().substr(0, maxLength),
                                content: post.find('encoded').text(),
                                category: post.find('category').toArray().map(function (v) {
                                    return v.textContent;
                                }).join(separator),
                                pubDate: new Date(post.find('pubDate').text()).toLocaleDateString(),
                                link: post.find('link').text()
                            };
                        }
                        else {
                            parsedData = {
                                id: i + 1,
                                title: post.find('title').text(),
                                description: $(post.find('description').text()).text().substr(0, maxLength),
                                category: post.find('category').toArray().map(function (v) {
                                    return v.textContent;
                                }).join(separator),
                                pubDate: new Date(post.find('pubDate').text()).toLocaleDateString(),
                                link: post.find('link').text()
                            };
                        }

                        index.add(parsedData);
                        blogData.push(parsedData);
                    }
                }
            });

            this.isInit = true;

        },

        find: function (value) {
            console.log('find: ' + value);
            var searchResult = this.index.search(value);
            var results = $(this.results);
            var resultsData = [];
            results.empty();

            if (this.before) {
                this.before();
            }

            if (this.zeroResultsInfo || searchResult.length > 0) {
                if (this.displaySearchInfo) {
                    results.append(this.format(this.infoTpl, {
                        amount: searchResult.length
                    }));
                }
            }

            for (var i = 0; i < searchResult.length; i++) {
                var postData = this.blogData[searchResult[i].ref - 1];
                results.append(this.format(this.resultTpl, postData));
                resultsData.push(postData);
            }

            if (this.onComplete) {
                this.onComplete(resultsData);
            }
        },

        clear: function () {
            $(this.results).empty();
            this.target.val('');
        },

        format: function (t, d) {
            return t.replace(/<%([^\%\<\>]*)%>/g, function (a, b) {
                var r = d[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        }
    };
    return $;
});
