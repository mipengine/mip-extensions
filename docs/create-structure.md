创建 MIP 扩展组件结构
==============

创建 MIP 扩展组件结构的方法很简单：

1. 创建 MIP 扩展组件目录
2. 在目录下创建 package.json 文件
3. 在目录下创建 README.md 文件


创建组件目录
---------

在完成 [准备](./prepare.md) 工作后，我们的本地将拥有一个 `mip-extensions` 目录，在这个目录下我们可以看到很多 `mip-` 前缀的子目录，每个子目录代表一个 MIP 扩展组件。

我们需要在 `mip-extensions` 内，为将要开发的 MIP 扩展组件创建一个 `mip-[组件名]` 目录。除了要求必须是 `mip-` 前缀外，目录的命名请参考 [MIP 扩展组件规范](./spec.md)。

```
$ mkdir mip-组件名
```

创建 package.json
---------

我们刚才创建了一个空的 **MIP 扩展组件目录**，现在我们要在这个目录内创建 `package.json` 文件。该文件内容必须是 [JSON](http://json.org/) 格式，用于声明当前 MIP 扩展组件的元信息。下面是 `package.json` 文件的一个简单示例：

```json
{
    "name": "mip-sample",
    "version": "1.0.0",

    "author": {
        "name": "author",
        "email": "author@email.com"
    },

    "engines": {
        "mip": ">=1.1.0"
    }
}
```

`package.json` 文件必须符合 [MIP 扩展组件 package.json 规范](./spec-package-json.md)，该文档详细描述了 `package.json` 文件中可以具备的字段和要求，请仔细阅读这篇文档。


创建 README.md
---------

接下来，我们要在 **MIP 扩展组件目录** 下创建 `README.md` 文件。该文件内容必须是 **UTF-8** 编码格式，用于对当前 MIP 扩展组件进行详细说明：

1. 组件描述、属性说明与示例对使用者有指导作用，可直接阅读
2. 组件描述、属性说明将被提取，进行自文档化
3. 组件示例将被开发调试工具自动解析，生成调试页面


`README.md` 文件必须符合 [MIP 扩展组件 README.md 规范](./spec-readme-md.md)，该文档详细描述了 `README.md` 文件中需要包含的内容与格式，请仔细阅读这篇文档。

手写 `README.md` 可能比较麻烦，我们可以通过模仿或复制 [README.md 样例](https://raw.githubusercontent.com/mipengine/mip-extensions/master/mip-sample/README.md) 来创建 `README.md`。
