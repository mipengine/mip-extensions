# km-ys-effect 快猫影视M版组件 

## tab切换

	调用方法 ysSetTabPlugin(className);
	className为父容器类名
	标签容器名为 className + "-tab";
	内容容器类名为 className + "-con";

案例

    <section class="tab-plugin">
    	<section>
    		<em class="tab-plugin-tab"></em>
    		<em class="tab-plugin-tab"></em>
    		<em class="tab-plugin-tab"></em>
    	</section>
    	<section class="tab-plugin-con"></section>
    	<section class="tab-plugin-con"></section>	
    	<section class="tab-plugin-con"></section>	
    </section>
	
	ysSetTabPlugin("tab-plugin")


## 回顶

	调用方法 ysGototop({
		className: 'gotoTop',
        hideTopNum: 100,
        showTime: 2000
	})

	className: 按钮class名  默认为 gotoTop
	hideTopNum： 超过顶部距离后显示  默认为 100
	showTime： 显示时间  默认显示时间 2000 后隐藏

## 弹窗组件
	
案例
	
	<em class="show_popWin" popWinName="popWinA">显示</em>
	<section class="popWinMask">
	  <section class="popWin" popWinName="popWinA">
	    <em class="hide_popWin" popWinName="popWinA">关闭</em>
	  </section>
	</section>

	调用方法： ysInitPopWin()
	show_popWin： 显示弹窗对象
	hide_popWin： 关闭弹窗对象 
	popWinName： 弹窗名
	
	弹窗名需要一致

	显示弹窗 ysShowPopWin(obj)
	参数为需要显示的弹窗对象

	隐藏弹窗 ysHidePopWin(obj)
	参数为需要隐藏的弹窗对象

## 展开收起更多
	
	调用方法： ysSetMoreData()

案例

	<section class="more-data"></section>
	<em class="show-more-btn show">展开</em>
	<em class="hide-more-btn hide">隐藏</em>

	more-data中隐藏的数据需要添加"hide" class；
 
## 自定义锚点
	
	调用方法： ysAnchorLink(btnObj, targetObj)
	btnObj： 触发对象
	targetObj： 锚点的目标对象


## 滚动到顶部
	
	调用方法： ysScrollTopPlugin(options)
	
	支持回调
	$.ysScrollTopPlugin({
		callbackFun: function(){
			.....
		}	
	})


## 滑动到底部

	调用方法： ysScrollBottomPlugin(options)

	支持回调
	$.ysScrollBottomPlugin({
		callbackFun: function(){
			.....
		}	
	})


## 焦点图滚动插件

	调用方法： 
	ysSildeFocusPlugin({
		id:									类名		必填
		startNum: 1,						显示第几张  默认为 1 第一张 
        tabNum: false,						是否自定义tab标签  默认false
        arrowBtn: false,					是否有按钮	默认false
        autoPlay: true,						是否自动播放  默认true
        leftArrowBtnClass: 'leftBtn',		左按钮class名  默认 'leftBtn'
        rightArrowBtnClass: 'rightBtn',		右按钮class名  默认 'rightBtn'
        tabClassName: 'tabList',			tab标签容器class名 	默认 'tabList'
        conClassName: 'conList',			内容容器class名	默认 'conList'
        selectClass: 'cur',					标签选中class名	默认 'cur'
        animateTime: 500,					动画时间		默认 500
        autoPlayTime: 5000,					自动播放时间间隔	 默认 5000
        zIndex: 10,							层级		默认 10
        angleNum: 2,						X轴与Y轴比值 当大于这个数时 执行切换  默认 2
        tabTagName: 'i'						tab标签元素	默认 i
	})