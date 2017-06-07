# 春雨医生音频播放组件（美化版），适用于聊天场景。

描述|内容
----|----
类型|通用
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-audio/mip-cy-audio.js

## 示例

```
<mip-cy-audio 
	class="left"
	src="https://api.chunyuyisheng.com/media/audios/2017/01/15/0e5e18796229.file.mp3"
></mip-cy-audio>
<mip-cy-audio 
	class="right"
	src="https://api.chunyuyisheng.com/media/audios/2017/01/15/77a92cee55ca.file.mp3"
></mip-cy-audio>

	
```

## 属性

### src

说明：音频地址  
必填：是  
格式：url  
使用限制：必须是https的

### class

说明：自定义类名  
必填：否  
格式：符合css类名规范即可  
