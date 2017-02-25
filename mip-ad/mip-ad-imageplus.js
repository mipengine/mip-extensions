/**
 * @file 图加广告
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */


define(function (require) {

    function render(element, me) {

        /* 图加功能下线 */
        element.remove();
        return;
        // var unionId = element.getAttribute('unionId');
        // var formList = element.getAttribute('formList') || '';
        // var nopicFormList = element.getAttribute('nopicFormList') || '';

        // var scriptNode = document.createElement('script');
        // scriptNode.innerHTML = [
        //     'var  baiduImagePlus = {',
        //     'unionId: "' + unionId + '"',
        //     '' + formList ? ',formList:' + formList : '',
        //     '' + nopicFormList ? ',nopicFormList:' + nopicFormList : '',
        //     '}' 
        // ].join('');
        // element.appendChild(scriptNode);

        // var node = document.createElement('script');
        // node.src = '//cpro.baidustatic.com/cpro/ui/mi.js';
        // element.appendChild(node);
    }

    return {
        render: render
    };

});



