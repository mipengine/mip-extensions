# mip-comment-down

mip-comment-down 用来支持文章详情页的评论

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-down-comment/mip-down-comment.js

## 示例

在MIP HTML中,直接使用标签, 用于正常显示隐藏菜单。示例如下:

```
<mip-down-comment>
	<section class="cont" id="comment">
		<b>网友评论</b>
		<div id="view-comment" class="reviews">
			<div class="post"><header>
				<span class="fb">我要跟贴</span></header>
				<ul id="comment-list"></ul>
				<footer class="button-status-complete"><input type="button" value="更多评论" class="button" style="display:none;" /></footer>
			</div>
		</div>
		<mip-form method="POST" url="http://mpc6.zhp.jf95.com/ajax.asp" id="submit" class="post">
			<fieldset class="w-text"><textarea></textarea></fieldset>
			<fieldset class="w-button">
				<input id="verify" class="button disable" type="submit" value="提交跟贴"  hidefocus="true" />
				<span id="cancel" class="button">取消</span>
			</fieldset>
			<input type="hidden" id="app-id" value="109066" />
	    </mip-form>
	</section>
</mip-down-comment>
```
