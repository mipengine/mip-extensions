MIP 扩展组件规范 - package.json
==============


在本文档中，使用的关键字会以中文+括号包含的关键字英文表示：必须(MUST)。关键字 "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", 和 "OPTIONAL"被定义在rfc2119中。


文件
----

### package.json 文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

解释: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。


字段
----

```json
{
    "name": "mip-sample",
    "version": "1.0.0",
    "description": "sample component",
    "engines": {
        "mip": ">=1.1.0"
    }
}
```


### name 字段 **必须(MUST)** 存在

解释: name 字段表示组件的名称，是关键信息，不可或缺。


### name 字段 **必须(MUST)** 是全小写的字符串，以 `mip-` 开头

解释: 组件目录要求与组件名称相同。为了避免在不同操作系统下的分歧，要求组件名称 **必须(MUST)** 是全小写的字符串。`mip-` 为了标识当前 package 是一个 MIP 扩展组件。


### version 字段 **必须(MUST)** 存在

解释: version 字段表示组件的版本号，是关键信息，不可或缺。


### version 字段 **必须(MUST)** 符合 SemVer

解释: [SemVer](http://semver.org/) 在 [npm](https://npmjs.org/) 已经得到广泛使用，被社区与广大开发人员所熟知。[SemVer](http://semver.org/) 的格式为 `MAJOR.MINOR.PATCH`，递增规则如下：

- MAJOR：不兼容的升级变更
- MINOR：向下兼容的功能性新增
- PATCH：向下兼容的问题修正

```
1.0.0
```

### **可以(OPTIONAL)** 通过 description 字段，对组件进行简单描述

解释: 此处描述应尽量言简意赅，限制在一句话内。详细描述可以在 `README.md` 进行。


### **可以(OPTIONAL)** 通过 engine.mip 字段，声明对 MIP 环境的依赖

解释: 该字段是 **可选(OPTIONAL)** 的，不声明意味着能兼容所有版本的 MIP 引擎。声明时，其值 **必须(MUST)** 符合 [Ranges](https://docs.npmjs.com/misc/semver#ranges) 规则。
