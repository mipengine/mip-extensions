# mip-html-ajax
mip-html-ajax 评论提交加载

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-html-ajax/mip-html-ajax.js   

## 示例

### 标签使用示例
```html
<mip-html-ajax>
  <script type="application/json">
  {
		"id":"123",
        "add":{"tip":"1","url":"/ajax_comment/?s=1"},
        "get":{"tip":"0","url":"/ajax_comment/?s=2"},
		"val":{"user":"#userName","text":"#cmtMsg"},
		"obj":{"list":".pllist ul","listre":"#relist","more":"#loadmore","morestr":"","arr":"items","rearr":"res"},
		"set":{"txt":"#cmtMsg","btn":"#subCmt","btnstr":""},
		"hta":"<li id='Q{ID}'><p><span class='i'>{User}</span><span class='d'>{Time}</span><span class='l'>{Index}楼</span></p><p class='t'>{Content}</p><div id='relist'>$ReData$</div></li>",
		"htr":"<div class='hf'><p class='hfa'>回答：<br>{Content}</p><p class='hfb'><i>回答者：{User}</i>{Time}</p></div>",
		"nta":"<li><p><span class='i'>{User}</span><span class='d'>{Time}</span><span class='l'>顶楼</span></p><p class='t'>{Content}</p></li>"
  }
  </script>
  <div class="plhtml">
    <div class="pllist"><ul></ul><div id="loadmore" class="loadmore">加载更多</div></div>
    <div class="pladd">
      <val-textarea id="cmtMsg" placeholder="说点什么吧…"></val-textarea>
      <span class="bom">
        <val-input id="userName" type="text" maxlength="10" value="网侠网友"></val-input>
        <val-input type="button" value="提 交" id="subCmt"></val-input>
      </span>
    </div>
  </div>
</mip-html-ajax>
```
