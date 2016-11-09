# mip-sidebar

## 示例

```
<header>
    <div id="hamburger" class="mip-button" on="tap:sidebar.open">
    	<div id="logo" href="/">Open mip-sidebar</div>
    </div>
</header>
<mip-sidebar 
	  layout="nodisplay"
    id='sidebar'
    layout="nodisplay"
    side="right">
    <ul>
      <li>
        <a href="/">Home</a>
        <button class="mip-button" on="tap:sidebar.close"> X </button>
      </li>
      <li> Nav item 1</li>
      <li>
        <amp-fit-text width="220"
            height="20"
            layout="responsive"
            max-font-size="24">
          Nav item 2 - &lt;amp-fit-text&gt;
        </amp-fit-text>
      </li>
      <li>
        <amp-fit-text width="220"
            height="20"
            layout="responsive"
            max-font-size="24">
          Nav item 3 - &lt;amp-fit-text&gt; longer text
        </amp-fit-text>
      </li>
      <li> Nav item 4 - Image
        <amp-img class='amp-sidebar-image'
            src="/img/favicon.png"
            width="20"
            height="20"
            alt="an image"></amp-img>
      </li>
      <li> Nav item 5</li>
      <li> Nav item 6</li>
</mip-sidebar>
```