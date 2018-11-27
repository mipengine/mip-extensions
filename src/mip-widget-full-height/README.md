# mip-widget-full-height

全高页面组件。该组件设计用于展现全高的 MIP 页面，需要配合 iframe-shell 使用。

标题|内容
----|----
类型|通用
支持布局|nodisplay
所需脚本|https://c.mipcdn.com/static/v1/mip-widget-full-height/mip-widget-full-height.js

## 示例

### 基本用法

直接在页面中插入该标签即可，无需额外设置。

```html
<mip-widget-full-height></mip-widget-full-height>
<p>以下是一些演示代码，用于撑高页面</p>
<style>pre, code {white-space: pre-wrap;word-wrap: break-word;}</style>
<script src="https://c.mipcdn.com/static/v1/mip-showmore/mip-showmore.js" async></script>
<mip-showmore maxheight='40' animatetime='.3' id="showmore01">
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
</mip-showmore>
<div on="tap:showmore01.toggle" data-closetext="收起" class="mip-showmore-btn">点击显示</div>
<article class="doc-article"><header class="article-header"><h1 class="article-title">新手指南</h1><a href="https://github.com/mipengine/www.mipengine.org/edit/master/source/doc/00-mip-101.md" class="article-edit-link" title="点击编辑该页面"><i class="fa fa-pencil"></i>编辑</a></header><div class="doc-article-content markdown-body"><p>MIP（Mobile Instant Pages - 移动网页加速器）主要用于移动端页面加速。</p><p>这篇文档将带你快速创建一个 MIP 页面。</p><h2 id="markdown-doc-1.%20%E5%88%9B%E5%BB%BA%20HTML%20%E6%96%87%E4%BB%B6">1. 创建 HTML 文件</h2><p>首先创建一个标准的 HTML 文件，注意：</p><ul><li>在 <code>&lt;html&gt;</code> 标签中增加 <code>mip</code> 属性标识。</li><li>编码为 <code>utf-8</code> 。</li><li>添加 <code>meta-viewport</code>，用于移动端展现。</li></ul><pre><code class="hljs lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">mip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,minimum-scale=1,initial-scale=1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h2 id="markdown-doc-2.%20%E6%B7%BB%E5%8A%A0%20MIP%20%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83">2. 添加 MIP 运行环境</h2><p>在 HTML 代码中，添加 MIP 依赖的 <code>mip.js</code> 和 <code>mip.css</code> 。</p><pre><code class="hljs lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">mip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,minimum-scale=1,initial-scale=1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.css"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h2 id="markdown-doc-3.%20%E6%B7%BB%E5%8A%A0%20MIP%20%E5%85%B3%E8%81%94%E6%A0%87%E7%AD%BE">3. 添加 MIP 关联标签</h2><p><code>&lt;link rel="miphtml"&gt;</code> 和 <code>&lt;link rel="canonical"&gt;</code> 主要用于告知搜索引擎页面间的关系。添加关联标签后，MIP 页的会继承 <strong>原页面</strong>(移动端) 的点击权重，同时 <strong>MIP 页</strong> 将作为搜索引擎的首选导流页面。</p><p>使用规则：</p><ul><li><code>&lt;link rel="miphtml"&gt;</code> 在移动端页面（H5）使用，指向对应内容的 MIP 页，方便搜索引擎发现对应的 MIP 页。</li><li><code>&lt;link rel="canonical"&gt;</code> 在 MIP 页中使用，指向内容对应的移动端页面（H5）。</li><li>若没有移动端页面（H5），则指向内容对应的 PC 页。</li><li>若直接在原链接修改 MIP，则 Canonical 指向当前 URL 。</li></ul><pre><code class="hljs lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">mip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,minimum-scale=1,initial-scale=1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.css"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- canonical 中的链接优先填写对应内容的移动端页面（H5）地址 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"canonical"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.example.com/your/path.html"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h2 id="markdown-doc-4.%20%E6%B7%BB%E5%8A%A0%E6%A0%B7%E5%BC%8F">4. 添加样式</h2><p>出于速度考虑，建议內联使用 CSS 样式。所有样式写在 <code>&lt;style mip-custom&gt;&lt;/style&gt;</code> 中，注意：<code>style</code> 标签仅允许出现一次。</p><pre><code class="hljs lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">mip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,minimum-scale=1,initial-scale=1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.css"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- canonical 中的链接优先填写对应内容的移动端页面（H5）地址 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"canonical"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.example.com/your/path.html"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">mip-custom</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">h1</span> { <span class="hljs-attribute">color</span>: red;}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h2 id="markdown-doc-5.%20%E6%9B%BF%E6%8D%A2%E7%A6%81%E7%94%A8%20HTML%20%E6%A0%87%E7%AD%BE">5. 替换禁用 HTML 标签</h2><p class="para-tip para-notice"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> <span class="para-content"><span class="para-tip-text">注意：</span>MIP 十分关注页面速度，也因此禁用了一些引起拖慢速度的 HTML 标签（<a data-type="mip" href="/doc/2-tech/1-mip-html.html">禁用列表</a>）。例如，<code>&lt;img&gt;</code> 标签会引起浏览器的 repaint 和 reflow，为了避免这些，MIP 提供了替代标签 <code>&lt;mip-img&gt;</code> ，详见 <a data-type="mip" href="/examples/mip/mip-img.html"><code>&lt;mip-img&gt;</code>使用文档</a> 。</span></p><pre><code class="hljs lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">mip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,minimum-scale=1,initial-scale=1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.css"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- canonical 中的链接优先填写对应内容的移动端页面（H5）地址 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"canonical"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.example.com/your/path.html"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">mip-custom</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">h1</span> { <span class="hljs-attribute">color</span>: red;}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mip-img</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">"responsive"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"263"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.mipengine.org/static/img/mip_logo_3b722d7.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"MIP LOGO"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mip-img</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h2 id="markdown-doc-6.%20%E4%BD%BF%E7%94%A8%20MIP%20%E7%BB%84%E4%BB%B6">6. 使用 MIP 组件</h2><p class="para-tip para-warning"><i class="fa fa-window-close" aria-hidden="true"></i> <span class="para-content"><span class="para-tip-text">警告：</span>出于对代码质量和性能的考虑，MIP 页中不允许自定义 JavaScript 代码。</span></p><p>在一个合法的 MIP 页面中，所有的交互通过引入 MIP 组件实现。MIP 组件可以理解为封装了 JS 的自定义 HTML 标签。上一步中的 <code>&lt;mip-img&gt;</code> 也是一个 MIP 组件，<a data-type="mip" href="/doc/3-widget/10-widgets.html">点击这里</a> 查看更多组件。</p><p>我们以分享组件为例，根据<a data-type="mip" href="/examples/mip-extensions/mip-share.html">分享组件文档</a>，组件对应的 HTML 标签为 <code>&lt;mip-share&gt;</code> ，需要依赖 <a href="https://c.mipcdn.com/static/v1/mip-share/mip-share.js" target="_blank" rel="noopener">https://c.mipcdn.com/static/v1/mip-share/mip-share.js</a> 脚本，用在页面里就是这样：</p><pre><code class="hljs lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">mip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,minimum-scale=1,initial-scale=1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.css"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- canonical 中的链接优先填写对应内容的移动端页面（H5）地址 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"canonical"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.example.com/your/path.html"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">mip-custom</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">h1</span> { <span class="hljs-attribute">color</span>: red;}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mip-img</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">"responsive"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"350"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"263"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.mipengine.org/static/img/mip_logo_3b722d7.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"MIP LOGO"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mip-img</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mip-share</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"分享：我的第一个 MIP 页面 "</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mip-share</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://c.mipcdn.com/static/v1/mip-share/mip-share.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>在使用组件时，请注意阅读组件文档，查看组件是否依赖所需脚本。如果依赖，请在 <code>mip.js</code> 之后引入脚本。</p><h2 id="markdown-doc-7.%20%E9%A2%84%E8%A7%88">7. 预览</h2><p>开发完成后，可以使用 <a href="//www.mipengine.org/validator/validate">MIP 校验工具</a> 保证代码规范。</p><p class="para-tip para-info"><i class="fa fa-info-circle" aria-hidden="true"></i> <span class="para-content"><span class="para-tip-text">提示：</span>校验代码，使用 <a href="//www.mipengine.org/validator/validate">MIP 校验工具</a>。<br>预览线上 URL 异步打开效果，使用 <a href="//www.mipengine.org/validator/preview">MIP 预览工具</a>。</span></p><p>MIP 页文件可以直接运行，你可以选择如下方式，像预览普通 HTML 站点一样预览 MIP-HTML 页面：</p><ul><li>直接在浏览器中打开（由于 XML HTTP Requests 失败可能会导致某些元素预览失败）。</li><li>在本地部署一个服务，如 Apache，Nginx 等。</li><li>使用 MIP-CLI 辅助预览，使用方法见 MIP 博客：<a href="http://www.cnblogs.com/mipengine/p/mip_cli_1_install.html" target="_blank" rel="noopener">开发教程一</a>。</li></ul><h2 id="markdown-doc-8.%20%E8%B5%B7%E9%A3%9E">8. 起飞</h2><p>到目前为止，你已经创建好了一个 MIP 页面。这个页面有图、有文、能分享，可以在浏览器中运行。</p><p>进阶的内容，请参考：</p><ul><li><a data-type="mip" href="/doc/2-tech/1-mip-html.html">MIP-HTML 规范</a></li><li><a data-type="mip" href="/doc/3-widget/11-widget-layout.html">组件布局</a></li><li><a data-type="mip" href="/doc/03-principle-of-mip.html">MIP 加速原理</a></li><li><a data-type="mip" href="/doc/2-tech/4-mip-widget.html">扩展组件开发规范</a></li></ul><p class="para-tip para-info"><i class="fa fa-info-circle" aria-hidden="true"></i> <span class="para-content"><span class="para-tip-text">提示：</span>MIP 开发系列视频教程：<a href="https://bit.baidu.com/course/datalist/column/120.html" target="_blank" rel="noopener">https://bit.baidu.com/course/datalist/column/120.html</a></span></p></div></article>

<mip-showmore maxheight='40' animatetime='.3' id="showmore02">
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
</mip-showmore>
<div on="tap:showmore02.toggle" data-closetext="收起" class="mip-showmore-btn">点击显示</div>
```
