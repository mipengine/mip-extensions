# mip-inno-nav

 实现innotopia的个性化响应式的菜单

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed


## 示例
```html

<mip-inno-nav layout="responsive" width="640" height="800">
        <span class="menu"></span>

      <menu>
                  <span class="close"></span>
                  <div class="logo"></div>
                  <mip-link href="http://m.innotopia.cn/index.html" target="_blank">首页</mip-link>
                  <hr/>
                  <mip-link href="http://m.innotopia.cn/product.html">产品</mip-link>
                  <hr/>
                  <mip-link href="http://m.innotopia.cn/cases.html">案例</mip-link>
                  <hr/>
                  <mip-link href="tel:4001338787">联系我们</mip-link>
              </menu>
</mip-inno-nav>

```

