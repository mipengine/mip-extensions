define(function(require) {

    var customElem = require('customElement').create();

    function setCnzz(){
        var doc = document,
             = doc.querySelector('mip-diyiyou-cnzz').getAttribute('token');
            idList = mipCnzzId.split(',');

        //添加统计代码
        for(var x = 0, l = idList.length; x < l; x++ ){
            var s = doc.createElement('script');
            s.type = "text/javascript"; 
            s.src="http://s4.cnzz.com/z_stat.php?id=" + idList[x] + "&web_id=" + idList[x]; 
            doc.body.appendChild(s);
        }

    }

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        
        setCnzz();

    };
    return customElem;
});