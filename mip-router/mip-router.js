/**
 * @file mip-router 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = this.element;

        var packageName = element.getAttribute('packageName')
        var appName = element.getAttribute('appName')
        var page = element.getAttribute('page')
        var confirm = !!element.getAttribute('confirm')
        var appRouter = !!element.getAttribute('appRouter')

        console.info('Parse element attributes: ', packageName, appName, page, confirm, appRouter)

        // 事件绑定
        this.addEventAction("evtAppRouter", function (event, str) {
            self.appRouter(packageName, page, null, confirm)
        });
        this.addEventAction("evtInstallShortcut", function (event, str) {
            self.installShortcut(packageName, appName)
        });

        // 启动服务
        if (appRouter) {
          this.appRouter(packageName, page, null, confirm)
        }
    };

    customElement.prototype.appRouter = function (packageName, page, params, confirm) {
        params = params || {}

        if (confirm) {
            params['__PROMPT__'] = 1;
            params['__NAME__'] = confirm;
        }

        return this.callNative(packageName, page, params);
    };

    customElement.prototype.installShortcut = function (packageName, appName) {
        return this.callNative('command', '', {
            'type' : 'shortcut',
            'package' : packageName,
            'name' : appName
        });
    };

    /**
     * 交互调用的实现
     * @param packageName
     * @param page
     * @param params
     */
    customElement.prototype.callNative = function (packageName, page, params) {
        var src = 'http://thefatherofsalmon.com';
        var query = '';
        if (packageName) {
          src = src + '?i=' + packageName;
        }
        if (page) {
          src = src + '&p=' + page;
        }

        function isEmptyObject(obj) {
          if (!obj) {
            return !0;
          }
          var t = void 0;
          for (t in obj) {
            return !1;
          }
          return !0;
        }

        if (isEmptyObject(params)) {
          var url = window.location.search;
          var index = url.indexOf('?');
          if (index > -1) {
            query = url.substr(1);
          }
        } else {
          var items = Object.keys(params).map(function (key) {
            return key + '=' + encodeURIComponent(params[key]);
          });
          query = items.join('&');
        }

        if (query !== '') {
          src = src + '&a=' + encodeURIComponent(query);
        }

        fetchJsonp(src)
          .then(function(response) {
            return response.text()
          }).then(function(json) {
            console.info('parsed json', json)
          }).catch(function(ex) {
            console.info('parsing failed', ex)
          })
      }

    return customElement;
});
