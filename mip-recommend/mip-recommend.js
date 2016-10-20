/**
 * @file 新闻推荐组件
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    var recommend = require('./recommend');

    /**
     * isHttps
     *
     * @type {boolean}
     */
    var isHttps = /^https/.test(location.protocol);

    /**
     * 数据源类型
     *
     * @type {Object}
     */
    var serverMap = {
        'olympic': (isHttps
            ? 'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/olympic.pae.baidu.com'
            : 'http://olympic.pae.baidu.com')
            + '/pae/olympic/api/reclist',
        'headline': '//headline.baidu.com/doc/recommended'
    };

    /**
     * 异步取数据
     *
     * @param  {string}   url      url
     * @return {Promise}
     */
    
    function fetchData(url) {

        var _promise =  new Promise(function(resolve,reject){
            $.ajax({
                'url': url,
                'dataType': 'jsonp',
                'jsonp': 'cb',
                'data': {
                    'url_key': location.href
                },
                success:function(data){
                    resolve(data);
                },error:function(data){
                    reject(data);
                }
            });
        });
        return _promise;
    }


    /**
     * 渲染
     */
    customElement.prototype.build = function () {
        var _element = this.element;

        var url = _element.getAttribute('src');
        var server = _element.getAttribute('server') || 'olympic';

        if (!url) {
            url = serverMap[server];
        }

        recommend.init();

        // 推荐列表
        fetchData(url).then(function(res) {
            recommend.render(res.data);
            recommend.renderHot(res.data);
        },function(data){}); 

    }

    return customElement;

});
