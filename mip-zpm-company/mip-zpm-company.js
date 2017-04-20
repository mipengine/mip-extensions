/**
 * @author: wangjx
 * @date: 2017-04-19
 * @file: mip-zpm-company.js
 */

	define(function (require) {
	    var $ = require('zepto');

	    var render = function () {
	        var $body = $("body"),
		        $rightMore = $(".j_header .rightMore"),
		        $btnmore = $(".prompt-menu .btn"),
		        $cancel = $(".compaydetail-more .cancel"),
		        $userinfo = $("#companydetail").attr("data-id"),
		        $comNuber = $("#companydetail").attr("data-comnuber"),
		        $compName = $("#companydetail").attr("data-compname"),
		        $AttentionList = localStorage.getItem("AttentionList"),
		        $BlockList = localStorage.getItem("BlockList");
	        var newAttentionList, newBlockList;
	        //返回
	        if ($(".r_returnbk").hasClass("goback")) {
	            $(".r_returnbk").click(function () {
	                window.history.back();
	                document.cookie = "resumeReturnCookie=1; path=/";
	            })
	        } else {
	            $(".r_returnbk").click(function () {
	                window.history.back();
	            })
	        }
	        //logo
	        $(".mip-replaced-content").css("border-radius", "50%");

	        //右上角更多操作,关闭/
	        if ($rightMore) {
	            $rightMore.click(function () {
	                event.preventDefault()
	                event.stopPropagation();
	                $(".moreactions").show();
	                $(".prompt-menu").show();
	            })
	        }
	        if ($btnmore) {
	            $btnmore.click(function () {
	                $(".moreactions").hide();
	                $(".prompt-menu").hide();
	            })
	        }
	        
	        //显示隐藏描述
	        if ($(".company-box #btnmore")) {
	            $(".company-box #btnmore").click(function () {
	                event.preventDefault();
	                event.stopPropagation();
	                $(".compdet-more").show();
	                $(".compaydetail-more").show();
	            })
	        }
	        if ($cancel) {
	            $cancel.click(function () {
	                $(".compdet-more").hide();
	                $(".compaydetail-more").hide();
	            })
	        }
	        

	        //关注，拉黑
	        if ($("#Attention")) {
	            $("#Attention").click(function () {
	                if ($userinfo != 0) {
	                    Attention();
	                } else {
	                    userLogin(true);
	                }
	            })
	        }
	        if ($("#BlockCompany")) {
	            $("#BlockCompany").click(function () {
	                if ($userinfo != 0) {
	                    BlockCompany();
	                } else {
	                    userLogin(true);
	                }
	            })
	        }
	        
	        //遮罩层关闭
	        if ($('.jconfirm')) {
	            $('.jconfirm').click(function () {
	                $(".prompt-menu").hide();
	                $(".compdet-more").hide();
	                $(".jconfirm").hide();
	            })
	        }
	        

	        //@*获取关注列表、关注公司、取消关注*@
	        if ($AttentionList == null || $AttentionList == '') {
	            myAttentionList();
	        } else if ($userinfo != null) {
	            if ($AttentionList.indexOf($comNuber) != -1) {
	                $("#Attention").html('取消关注');
	            }
	        }

	        //@*获取列表、拉入黑名单、取消*@
	        if ($BlockList == null || $BlockList == '') {
	            myBlockList();
	        } else if ($userinfo != null) {
	            if ($BlockList.indexOf($compName) != -1) {
	                $("#BlockCompany").html('移出黑名单');
	            }
	        }



	        //底部浮层
	        $(".indexLayer_Close").on("click", function () {
	            $(".indexLayer").hide();
	        })
	        $('#goreg').click(function () {
	            window.location.href = "/account/regist";
	        })
	    }

	    window.onload = function () {
	        render();
	    }
	    /*关注企业，取消关注*/
        function Attention() {
            var Attstate = $("#Attention").attr("data-state");
            if (Attstate == 1 && $("#Attention").html() == "关注公司") {
                $.ajax({
                    url: '/Company/AttentionCompany',
                    type: 'post',
                    data: {
                        number: $comNuber,
                    },
                    success: function (data, textStatus, jqxhr) {
                        $(".moreactions").hide();
                        $(".prompt-menu").hide();
                        if (data.StatusCode == 200) {
                            myAttentionList();
                            $("#Attention").attr("data-state", "0");
                            $("#Attention").html('取消关注');
                            handlePrompt("关注成功");
                        }
                    }
                });
            } else {
                $.ajax({
                    url: '/Company/CancelAttentionCompany',
                    type: 'post',
                    data: {
                        number: $comNuber,
                    },
                    success: function (data, textStatus, jqxhr) {
                        $(".moreactions").hide();
                        $(".prompt-menu").hide();
                        if (data.StatusCode == 200) {
                            myAttentionList();
                            $("#Attention").attr("data-state", "1");
                            $("#Attention").html('关注公司');
                            handlePrompt("取消关注成功");
                        }
                    }
                })
            }
        }

        /*获取关注公司列表*/
        function myAttentionList() {
            $.ajax({
                url: '/company/attentionlistcompany',
                type: 'post',
                data: { version: '6.3.0' },
                success: function (data, textStatus, jqxhr) {
                    for (var a = 0; a < data.List.length; a++) {
                        newAttentionList += data.List[a].Number + ",";
                    }
                    localStorage.removeItem("AttentionList");
                    localStorage.setItem("AttentionList", newAttentionList);
                }
            })
        }

        /*屏蔽企业，取消屏蔽*/
        function BlockCompany() {
            var Blockstate = $("#BlockCompany").attr("data-state");
            if (Blockstate == 0 && $("#BlockCompany").html() == "拉入黑名单") {
                $.ajax({
                    url: '/Company/SaveBlockCompany',
                    type: 'post',
                    data: {
                        companyName: $compName,
                    },
                    success: function (data, textStatus, jqxhr) {
                        $(".moreactions").hide();
                        $(".prompt-menu").hide();
                        if (data.StatusCode == 200) {
                            myBlockList();
                            $("#BlockCompany").attr("data-state", "1");
                            $("#BlockCompany").html('移出黑名单');
                            handlePrompt("已拉入黑名单");
                        }
                    }
                });
            } else {
                $.ajax({
                    url: '/Company/DelBlockCompany',
                    type: 'post',
                    data: {
                        companyName: $compName,
                    },
                    success: function (data, textStatus, jqxhr) {
                        $(".moreactions").hide();
                        $(".prompt-menu").hide();
                        if (data.StatusCode == 200) {
                            myBlockList();
                            $("#BlockCompany").attr("data-state", "0");
                            $("#BlockCompany").html('拉入黑名单');
                            handlePrompt("已移出黑名单");
                        }
                    }
                })
            }
        }

        /*获取黑名单企业列表*/
        function myBlockList() {
            $.ajax({
                url: '/Company/GetBlockCompany',
                type: 'post',
                data: { version: '6.3.0' },
                success: function (data, textStatus, jqxhr) {
                    localStorage.removeItem("BlockList");
                    localStorage.setItem("BlockList", data.Info);
                }
            })
        }
        /**
         * 检查客户端是否已包含登录的cookie
         * @returns 返回bool表示是否已经登录
         * @type Boolean
         */
        function checkCookie() {
            if (window.navigator.cookieEnabled)
                return true;
            else
                return false;
        }

        //跳转登录
        function userLogin(noreturn) {

            if (checkCookie() == false) {
                alert("您的浏览器不支持cookie将无法登录,请使用其它浏览器");
                return;
            }
            if (noreturn) {
                window.location.href = "/account/login?prevUrl=" + escape(window.location.href) + "";
            } else {
                window.location.replace("/account/login?prevUrl=" + escape(window.location.href) + "");
            }

        }

        //====处理反馈完成后弹出提示====
        function handlePrompt(val) {
            $body.append("<div class='handlePrompt'>" + val + "</div>");
            setTimeout(function () {
                $(".handlePrompt").remove();
            }, 3000);
        }

        return {
            render: render
        }
    });
