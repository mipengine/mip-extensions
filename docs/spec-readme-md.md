MIP 扩展组件规范 - README.md
==============

在本文档中，使用的关键字会以中文 + 括号包含的关键字英文表示：必须(MUST)。关键字 "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", 和 "OPTIONAL"被定义在rfc2119中。

对照着 [README.md 示例文件](https://raw.githubusercontent.com/mipengine/mip-extensions/master/mip-sample/README.md) 阅读此文档，可以更容易理解些。

文件
----

### README.md 文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

解释: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。


标题与描述
----

```markdown
# mip-sample

mip-sample 实现了一个简单的卡牌元素，手指滑过卡牌时可向滑动方向翻牌。
```

### README.md 文件 **必须(MUST)** 以一级标题开头，一级标题 **必须(MUST)** 是组件名

解释: 在文档最开始就应该以一级标题显著地告诉阅读者这是什么组件。一级标题和 `package.json` 中的 `name` 字段应该是一致的。


### 一级标题后紧跟着的段落 **必须(MUST)** 是组件描述

解释: 此处的描述无须与 `package.json` 中的 `description` 字段完全相同，可以更详细些。


组件元信息
----

紧跟着组件描述后，我们 **必须(MUST)** 以一个表格来描述组件的以下元信息：类型、布局、引用脚本。

```markdown
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sample/mip-sample.js
```

### 类型

组件 **必须(MUST)** 声明属于哪种类型。组件的类型可以是下面列表中的一个或多个，多个类型之间以 `,` 分隔。

- 通用：表示组件是通用的组件，组件定位是所有网站可用
- 业务：即所开发网站的业务组件，不具有通用性 
- 广告：广告组件
- 定制：针对某个网站或某种业务的组件，具有一定通用性，如视频网站的播放组件

以优酷视频播放组件为例，它的类型应该是：通用,定制


### 布局

组件 **必须(MUST)** 声明支持的布局方式。通常组件会支持多种布局，多种布局之间以 `,` 分隔。布局种类请参考 [组件布局文档](https://www.mipengine.org/doc/4-widget/1-widgetlayout.html)。


### 引用脚本

组件 **必须(MUST)** 声明脚本上线后的地址。在 README.md 中声明有助于方便使用者引用。

脚本上线地址的规则请参考 [MIP 扩展组件规范](./spec.md) 中的 **上线地址** 章节。


示例
----

README.md 文件 **必须(MUST)** 包含 **示例** 章节。**示例** 章节以一个文字为 *示例* 的二级标题开始，到下一个二级标题或文件尾结束。

示例章节 **可以(MAY)** 包含一个或多个示例。每个示例包含一个 **可选(OPTIONAL)** 的介绍段落，和一个 **必选(MUST)** 的 HTML 代码片段：

- 一个示例的格式: 一个示例介绍的段落，跟着一段 html 的代码片段
- 多个示例的格式: 每个示例以一个三级标题开头，然后是一个示例介绍的段落，再跟着一段 html 的代码片段

注意: 下面的示例，如果想复制去用，请去掉代码片段结尾标识开头中的斜杠。

```markdown
## 示例

### 单卡牌式

```html
<mip-sample delay="100" duration="1000">
    <div class="mip-sample-front">正面内容</div>
    <div class="mip-sample-back">反面内容</div>
</mip-sample>
\```

### 多卡牌式

可支持多张卡牌，最后一张为不可翻卡牌。

```html
<mip-sample duration="1000">
    <div class="mip-sample-list">第一张</div>
    <div class="mip-sample-list">第二张</div>
    <div class="mip-sample-list">第三张</div>
    <div class="mip-sample-list">第四张</div>
    <div class="mip-sample-list">第五张</div>
    <div class="mip-sample-list">第六张</div>
    <div class="mip-sample-list">第七张</div>
    <div class="mip-sample-list">第八张</div>
    <div class="mip-sample-list">第九张</div>
    <div class="mip-sample-list mip-sample-list-last">最后一张</div>
</mip-sample>
\```
```

提示: 示例章节非常重要。除了起到使用说明的作用外，调试工具将基于示例代码生成调试页面。示例信息也将被抽取生成在线的效果展示。请认真为组件编写示例。


属性
----

除非组件完全不需要任何属性，组件 **必须(MUST)** 在 **属性** 章节描述支持的所有属性。**属性** 章节以一个文字为 *属性* 的二级标题开始，到下一个二级标题或文件尾结束。

每个组件的描述格式为：

- 以属性名称为三级标题开头
- 接下来一个段落包含组件的信息
- 段落的每一行是一个字段信息，每个字段信息格式为`[字段名]: [字段描述]`
- 每行字段信息后 **必须(MUST)** 添加两个空格，使 markdown 在渲染时能有换行效果
- **必须(MUST)** 包含 *说明*、*必填* 字段，**可选(OPTIONAL)** 字段有 *格式*、*取值*、*单位*、*默认值*、*使用限制*

```markdown
## 属性

### delay

说明：延迟翻转  
必选项：否  
类型：数字  
取值范围：>0  
单位：毫秒(ms)  
默认值：0  

### duration

说明：动画持续时间  
必选项：否  
类型：数字  
取值范围：>0  
单位：毫秒(ms)  
默认值：400  
```

下面是每个字段的描述：

- 说明: 文字描述，说明属性用途
- 必填: 是或否
- 格式: 属性格式 数字，字符串等。如属性是 10px 类型，那么格式应该是 数字+单位
- 取值: 属性的取值范围。如果是泛数字类型，应该用数学符号表示，如 > 10 或者 > 10px；如果是限定类型的取值可用 `,` 隔开，如 left,top,right,bottom
- 单位： 属性的单位。如果属性可以用多个单位，可用 `,` 隔开，如 px,em,pt,rem
- 默认值: 如果有默认值，可在此声明
- 使用限制: 说明属性的使用限制

注意事项
------

README.md 文件 **可以(OPTIONAL)** 包含 **注意事项** 章节。**注意事项** 章节以一个文字为 *注意事项* 的二级标题开始，到下一个二级标题或文件尾结束。

**注意事项** 章节 **可以(MAY)** 包含一个或多个注意事项主题：

- 一个注意事项主题: 直接是描述，直到碰到下一个二级标题或文件尾结束
- 多个注意事项主题: 每个注意事项主题以三级标题开头，接下来是描述，直到碰到下一个三级标题、二级标题或文件尾结束

```markdown
## 注意事项

1. 单卡牌与多卡牌有冲突。
2. mip-sample-list-last 的作用是翻牌时保留最后一张，不加也不会有问题。
```
