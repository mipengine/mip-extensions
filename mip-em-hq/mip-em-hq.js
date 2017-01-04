define(function (require) {
    var node = document.createElement('script');
    node.setAttribute('src', 'http://cp.eastmoney.com/mip/stockquote.js');
    node.setAttribute('ignoreapd', '1');
    document.body.appendChild(node);
});
