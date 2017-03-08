/**
 * @accordion
 * @author fengchuantao
 * @file mip-accordion
 * @time 2016.08.12
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var localurl = location.href;

    // 恢复用户上次选择
    function userSelect(id) {
        var self = this;
        var sessionsKey = 'MIP-' + id + '-' + localurl;
        var datajson = getSession(sessionsKey);

        for (var prop in datajson) {
            if (!datajson.hasOwnProperty(prop)) {
                return;
            }

            var expand = datajson[prop];
            if (expand) {
                var content = $('#' + prop, self);
                content.attr('aria-expanded', 'open');
                content.parents('section').attr('expanded', 'open');
            }

        }
    }

    // 绑定事件
    function bindEven(element) {
        var $element = $(element);
        $element.on('click', '.mip-accordion-header', function () {
            var targetId = $(this).attr('aria-controls');
            var $targetdom = $('#' + targetId);
            var expanded = $targetdom.attr('aria-expanded');
            var $showMore = $(this).parents('section').find('.show-more');
            var $showLess = $(this).parents('section').find('.show-less');

            if (expanded === 'open') {
                $targetdom.attr('aria-expanded', 'close');
                $(this).parents('section').removeAttr('expanded');
                if (!!$showMore.length && !!$showLess.length) {
                    $showMore.css('display', 'block');
                    $showLess.css('display', 'none');
                }

                setSession(element, targetId, false);
            }
            else {

                // 同时只能展开一个节点

                if (element.hasAttribute('expaned-limit')) {
                    var sections = element.querySelectorAll('section');
                    for (var i = 0; i < sections.length; i++) {

                        var cont = sections[i].querySelector('.mip-accordion-content');
                        var header = sections[i].querySelector('.mip-accordion-header');
                        var id = header.getAttribute('aria-controls');

                        sections[i].removeAttribute('expanded');
                        cont.removeAttribute('aria-expanded');
                        setSession(element, id, false);
                    }
                }

                $targetdom.attr('aria-expanded', 'open');
                $(this).parents('section').attr('expanded', 'open');
                if (!!$showMore.length && !!$showLess.length) {
                    $showLess.css('display', 'block');
                    $showMore.css('display', 'none');
                }

                setSession(element, targetId, true);
            }
        });
    }


    // 设置session storage
    function setSession(element, obj, expand) {
        var sessionsKey = 'MIP-' + element.getAttribute('sessions-key') + '-' + localurl;

        var objsession = getSession(sessionsKey);
        objsession[obj] = expand;
        sessionStorage[sessionsKey] = JSON.stringify(objsession);
    }

    // 获取sission
    function getSession(sessionsKey) {
        var data = sessionStorage[sessionsKey];
        return data ? JSON.parse(data) : {};
    }

    // 初始化
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;

        this.type = $(element).attr('type') || 'automatic';
        this.sections = $(element).find('section');
        this.id = $(element).attr('sessions-key');
        this.element.setAttribute('role', 'tablist');
        this.currentState = getSession.call(this);
        this.sections.map(function (index, section) {
            var header = $(section).find('[accordionbtn]');
            var content = $(section).find('[accordionbox]');

            if (!header.length || !content.length) {
                header = $(section.children.item(0));
                content = header.next();
            }

            header.addClass('mip-accordion-header');
            content.addClass('mip-accordion-content');

            // id 初始化
            var id = content.attr('id');
            if (!id) {
                id = 'MIP_' + self.id + '_content_' + index;
                content.attr({
                    id: id
                });
            }

            // tab 状态[展开|收起]判断
            if (self.currentState[id]) {
                section.attr('expanded', '');
            }
            else if (self.currentState[id] === false) {
                section.removeAttribute('expanded');
            }

            // 手动控制或者自动根据用户操作控制
            if (self.type === 'manual' && section.hasAttribute('expanded')) {
                content.attr('aria-expanded', 'open');
                setSession(element, $(element).attr('aria-controls'), true);
            }
            else if (self.type === 'automatic') {
                content.attr('aria-expanded', section.hasAttribute('expanded').toString());
            }

            header.attr('aria-controls', id);
        });

        if (self.type === 'automatic') {
            userSelect.call(element, this.id);
        }

        bindEven(element);
    };

    return customElement;

});
