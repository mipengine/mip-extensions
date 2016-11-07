/**
 * @accordion
 * @author fengchuantao
 * 
 * @time 2016.08.12
 */
define(function (require) {
   var customElement = require('customElement').create();
   var $ = require('zepto');
   var localurl = location.href;

    /**
     * 恢复用户上次选择
     */
    function userselect(id) {
         var self = this;
         var sessionsKey = "MIP-" + id + "-" + localurl;
         var datajson = getsession(sessionsKey);
         
         for(var index in datajson) {
            var expand = datajson[index];
            if(expand) {
                var content = $("#" + index, self);
                content.attr("aria-expanded", "open");
                content.parents("section").attr("expanded", "open");
            }
         }
    }

    /**
     * 绑定事件
     */
    function bindEven(element) {
        var $element = $(element);
        $element.on("click",".mip-accordion-header",function() {
            var targetId = $(this).attr("aria-controls");
            var $targetdom = $("#"+ targetId);
            var expanded =  $targetdom.attr("aria-expanded");

            if(expanded === "open") {
                $targetdom.attr("aria-expanded","close");
                $(this).parents("section").removeAttr("expanded");
                setsession(element,targetId,false);
            } else {
                $targetdom.attr("aria-expanded","open");
                $(this).parents("section").attr("expanded","open");
                setsession(element,targetId,true);
            }
        });
    }


    /**
     * 设置session storage
     * 存储
     */
    
    function setsession(element, obj, expand) {
        var sessionsKey = "MIP-" 
                        + element.getAttribute("sessions-key")
                        + "-" 
                        + localurl;
        
        var objsession = getsession(sessionsKey);
        objsession[obj] = expand;
        sessionStorage[sessionsKey]  = JSON.stringify(objsession);
        
    }

    /**
     * 获取sission
     */
    
    function getsession(sessionsKey) {
        var data = sessionStorage[sessionsKey];
        return data ? JSON.parse(data) : {};
    }


    /**
     * 初始化
     *
     */
    customElement.prototype.build = function() {
        var self = this;
        var element = this.element;

        this.type_ = $(element).attr('type') || 'automatic';
        this.sections_ = $(element).find("section");
        this.id_ = $(element).attr('sessions-key');
        this.element.setAttribute('role', 'tablist');
        this.currentState_ = getsession.call(this);
        this.sections_.map(function(index, section) {
            const header = $(section.children.item(0));
            const content = header.next(); 

            header.addClass('mip-accordion-header');
            content.addClass('mip-accordion-content');

            // id 初始化
            var id = content.attr('id');
            if(!id) {
                id = "MIP_" + self.id_ + "_content_" + index;
                content.attr({"id": id});
            }

            // tab 状态[展开|收起]判断
            if (self.currentState_[id]) {
                section.attr('expanded', '');
            } else if (self.currentState_[id] == false) {
                section.removeAttribute('expanded');
            }

            // 手动控制或者自动根据用户操作控制
            if(self.type_ === 'manual' && section.hasAttribute('expanded')) {
                content.attr('aria-expanded','open');
                setsession(element,$(element).attr('aria-controls'),true);
            } 
            else if(self.type_ === 'automatic') {
                content.attr('aria-expanded', 
                    section.hasAttribute('expanded').toString());
            }
            header.attr("aria-controls", id);
        });

        if(self.type_ === 'automatic') {
            userselect.call(element, this.id_);
        }

        bindEven(element);
    }

    return customElement;

});

