/**
 * @file 手百相关接口
 * @author cxtom <cxtom2008@gmail.com>
 */

define(function (require) {

    var ua = navigator.userAgent;

    var Box = {};

    Box.isBox = / baiduboxapp\//i.test(ua) && !/ (lite|info) baiduboxapp/.test(ua);

    function getVersion() {
        var back = 0;
        if (window.baiduboxapp_version) {
            back = window.baiduboxapp_version;
        }
        else if (Box.isBox) {
            var a;
            if (a = /([\d+.]+)_(?:diordna|enohpi)_/.exec(ua)) {
                a = a[1].split('.');
                back = a.reverse().join('.');
            }
            else if (a = /baiduboxapp\/([\d+.]+)/.exec(ua)) {
                back = a[1];
            }
        }
        return back;
    }

    function versionCompare(version1, version2) {
        version2 += '';
        version1 += '';

        var a = version1.split('.');
        var b = version2.split('.');
        var i = 0;
        var len = Math.max(a.length, b.length);

        for (; i < len; i++) {
            if ((a[i] && !b[i] && parseInt(a[i], 10) > 0) || (parseInt(a[i], 10) > parseInt(b[i], 10))) {
                return 1;
            }
            else if ((b[i] && !a[i] && parseInt(b[i], 10) > 0) || (parseInt(a[i], 10) < parseInt(b[i], 10))) {
                return -1;
            }
        }
        return 0;
    }

    function execCaller(nameSpace, funcName, funcArgs) {
        // 保证要有[]
        var caller = {
            obj: nameSpace,
            func: funcName,
            args: funcArgs ? funcArgs : []
        };
        try {
            return window.prompt('BdboxApp:' + JSON.stringify(caller));
        }
        catch (e) {
            return {
                error: 201
            };
        }
    }

    function invokeApp(name, func, args) {

        if (!Box.isBox || !name) {
            return;
        }

        // 如果存在就执行，如果不存在就通过版本号来判断
        if (window[name] && window[name][func]) {
            var result = window[name][func].apply(window[name], args);
            // 直接调用
            return {
                error: 0,
                result: result,
                from: 'js' // 打个标记
            };
        }

        var back = execCaller(name, func, args);

        back = back ? JSON.parse(back) : {};
        back.from = 'app';
        return back;
    }

    Box.version = getVersion();
    Box.versionCompare = versionCompare;
    Box.invokeApp = invokeApp;

    return Box;
});
