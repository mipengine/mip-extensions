MIP 扩展组件规范 - 样式开发
==============

在本文档中，使用的关键字会以中文+括号包含的关键字英文表示：必须(MUST)。关键字 "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", 和 "OPTIONAL"被定义在rfc2119中。


Style Guide
------

组件的样式开发 **必须(MUST)** 遵守 [CSS Style Guide](https://github.com/ecomfe/spec/blob/master/css-style-guide.md)。如果你使用了 [LESS](http://lesscss.org/) ，还 **必须(MUST)** 遵守 [LESS Code Style](https://github.com/ecomfe/spec/blob/master/less-code-style.md)。

开发时，我们可以通过 [FECS](http://fecs.baidu.com/) 工具进行检查。



文件
----

### 所有样式文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

解释: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。



选择器
-----


### **不允许(MUST NOT)** 使用 ID 选择器

解释: 组件的设计，需要考虑一个页面上同时存在多个组件的场景。所以组件及内部元素都不应该拥有 hard code 的 `id` 属性。


### 选择器的第一层如果是标签选择器，**只允许(MUST)** 使用组件自身标签

解释: 组件的样式定义应只对组件本身以及组件内部生效。

```css
/* good */
mip-sample span {
    color: red;
}

/* bad */
span {
    color: red;
}
```

### class 选择器的命名 **必须(MUST)** 为组件名，或以组件名为前缀

解释: 组件的样式定义应尽量避免对使用方页面产生影响。短小简洁的 class 容易与使用方页面产生冲突。

```css
/* good */
.mip-sample-title {
    color: red;
}

/* bad */
.title {
    color: red;
}
```
