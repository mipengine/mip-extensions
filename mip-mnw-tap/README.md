# mip-mnw-tap

点击切换组件

描述|注册点击事件
----|----
类型|事件
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-mnw-tap/mip-mnw-tap.js

## 示例

### 切换

```
<mip-mnw-tap>
	<dl class="f">
        <dt>
            <a href="javascript:;" class="sel" group="1" id="1-0">测试1</a>
            <a href="javascript:;" group="1" id="1-1">测试2</a>
        </dt>
        <dd group="1" id="1-0">
            测试1
        </dd>
        <dd group="1" id="1-1" style="display:none">
            测试2
        </dd>
    </dl>
    <dl class="f">
        <dt>
            <a href="javascript:;" class="sel" group="2" id="2-0">测试3</a>
            <a href="javascript:;" group="2" id="2-1">测试4</a>
        </dt>
        <dd group="2" id="2-0">
            测试3
        </dd>
        <dd group="2" id="2-1" style="display:none">
            测试4
        </dd>
    </dl>
</mip-mnw-tap>
```


