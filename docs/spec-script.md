MIP 扩展组件规范 - 脚本开发
==============

在本文档中，使用的关键字会以中文+括号包含的关键字英文表示：必须(MUST)。关键字 "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", 和 "OPTIONAL"被定义在rfc2119中。


Style Guide
------

组件的脚本开发 **必须(MUST)** 遵守 [JavaScript Style Guide](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md)。

开发时，我们可以通过 [FECS](http://fecs.baidu.com/) 工具进行检查。


文件
----

### 所有脚本文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

解释: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。


模块化
------

### 一个脚本文件 **只允许(MUST)** 包含一个 AMD 模块定义的语句

解释: 按照文件即模块的原则，一个脚本文件内 **只允许(MUST)** 包含一个 define 语句，**不允许(MUST NOT)** 包含其他语句。

```javascript
// good
define(function (require) {
    // bala bala ...
});


// bad
define(function (require) {
    // bala bala ...
});
require(['mip-sample']);


// bad
(function () {
    var module = xxx;
    // bala bala ...

    define(module);
})();
```


### 模块声明 **不允许(MUST NOT)** 指定 ID

```javascript
// good
define(function (require) {
    // bala bala ...
});


// bad
define('mip-sample', function (require) {
    // bala bala ...
});
```

### 依赖 **必须(MUST)** 在 factory 内部通过 require 引用

解释: **不允许(MUST NOT)** 在声明时指定 dependencies 参数。

```javascript
// good
define(function (require) {
    var zepto = require('zepto');
    // bala bala ...
});


// bad
define(['zepto'], function (zepto) {
    // bala bala ...
});
```


### 扩展组件内部的模块依赖，**必须(MUST)** 通过 Relative ID 引用

解释: **不允许(MUST NOT)** 通过 Top-Level ID 引用。通过 Relative ID 引用内部的模块依赖，拥有更好的内聚与灵活性。

```javascript
// good
define(function (require) {
    var util = require('./util');
    // bala bala ...
});


// bad
define(function (require) {
    var util = require('mip-sample/util');
    // bala bala ...
});
```
