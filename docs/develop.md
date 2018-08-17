开发 MIP 扩展组件
==============

开发组件脚本
------

在开始开发组件脚本之前，我们可以查阅 [MIP 扩展组件脚本开发规范](./spec-script.md)。不符合规范的组件将无法通过 [审核](./approve.md)。


### 模块管理方式

MIP 扩展组件通过 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 进行模块管理。详细了解 AMD 可以参考下面的一些资料：

#### 为什么选择 AMD

- [前端为什么需要模块化? (WHY WEB MODULES?)](http://requirejs.org/docs/why.html)
- [为什么需要使用AMD? (WHY AMD?)](http://requirejs.org/docs/whyamd.html)

#### AMD 的设计思路与应用实践

- [玩转AMD系列 - 设计思路篇](http://efe.baidu.com/blog/dissecting-amd-what/)
- [玩转AMD系列 - 应用实践篇](http://efe.baidu.com/blog/dissecting-amd-how/)

#### AMD 规范

- [AMD Spec](https://github.com/amdjs/amdjs-api/wiki/AMD)
- [AMD Require](https://github.com/amdjs/amdjs-api/wiki/require)
- [AMD Common-Config](https://github.com/amdjs/amdjs-api/wiki/Common-Config)
- [AMD Loader-Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)


### 组件主模块

首先我们需要创建一个主模块文件。主模块文件是一个 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 模块，返回一个 `customElement` 对象。命名可以在下面两个中选择：

- mip-[组件名].js
- main.js

```javascript
define(function(require) {
    var customElem = require('customElement').create();

    // bala bala ...
    return customElem;
});
```

### 组件生命周期

MIP 扩展组件在运行中将经历下面 6 个生命周期：

```
init                   # 初始化  
  ↓  
create                 # 创建元素  
  ↓  
attached               # 插入到文档中  
  ↓   
build                  # 执行build，只会被执行一次   
  ↓     
viewport(in or out)    # 进入或离开可视区域   
  ↓    
detached               # 从文档中移除
```

下面的组件定义代码展示了生命周期的相关钩子函数如何使用：

```javascript
define(function(require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    
    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        element._index = index ++;
    };

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        console.log(isInView);
    };
    // 控制viewportCallback、firstInviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };
    /* 生命周期 function list，根据组件情况选用 end */

    return customElem;
});
```

### 支持的依赖包

MIP 开发团队在环境中内置了一些依赖包，在开发 MIP 扩展组件时我们可以引用，让开发更便利。当前支持的依赖包如下：

- zepto

我们可以在模块内通过 `require` 去引用它们。

```javascript
define(function(require) {
    var zepto = require('zepto');

    // bala bala ...
});
```


### 分模块开发

划分多个模块与文件可以让结构更清晰，提高可维护性，是开发的常用手段。

我们可以在 `mip-[组件名]` 目录或子目录下创建 `.js` 文件，每个文件必须是一个 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 模块。

```javascript
// mip-[组件名]/util.js
define(function(require) {
    return {
        trim: function (source) {
            return source.replace(/(^\s+|\s+$)/g, '');
        }
    };
});
```

然后，通过 `require` 我们可以引用到这个模块。引用时必须使用 `Relative ID`，不允许使用 `Top-Level ID`。

```javascript
// mip-[组件名]/mip-[组件名].js
define(function(require) {
    var util = require('./util');

    // bala bala ...
    util.trim(input.value);
});
```

### 异步引用模块

我们可以把部分功能封装到独立的模块，并通过 `async require` 去加载它们。通常需要这么做的场景有：

- 组件比较大，并且初始化时不希望加载一些二次交互才会用到的功能
- 组件在一次展示中不需要用到所有功能

该方法能有效缩短大组件的初始化时间。

```javascript
// mip-[componentname]/mip-[componentname].js
define(function(require) {
    // bala bala ...
    
    require(['./action-' + actionType], function (action) {
        // bala bala ...
    });
});
```

注意: 异步引用内部模块时依然必须使用 `Relative ID`，不允许使用 `Top-Level ID`。


开发组件样式
------

在开始开发组件样式之前，我们可以查阅 [MIP 扩展组件样式开发规范](./spec-style.md)。不符合规范的组件将无法通过 [审核](./approve.md)。

组件不一定要包含自定义样式。如果我们并不想定制样式，可以忽略本章节。


### 预编译工具

我们可以使用 CSS 来开发组件的自定义样式，也可以使用 [LESS](http://lesscss.org/)。MIP 扩展组件的编译过程将对后缀为 `.less` 的文件进行预编译。


### 样式主文件

首先我们需要创建一个样式主文件。命名可以在下面中选择：

- mip-[组件名].css
- main.css
- mip-[组件名].less
- main.less

```css
mip-sample {
    position: relative;
    display: inline-block;
}
```

### 分文件开发

通常情况下，自定义样式的代码不会太多，只需要样式主文件就够了。但是如果我们想要分文件开发样式，只能通过 [LESS](http://lesscss.org/) 的 `@import` 引用。

```less
@import "variable.less";

mip-sample {
    position: relative;
    display: inline-block;
    background: @background;
}
```



调试组件
------

开发过程中，我们需要依赖 mip-cli 工具进行组件的调试和预览。mip-cli 将根据 `README.md` 的示例章节生成调试页面，所以，在调试之前我们需要编写好 `README.md`。详细信息请参考 [调试组件](./debug.md)、[MIP 扩展组件 README.md 规范](./spec-readme-md.md) 文档。

