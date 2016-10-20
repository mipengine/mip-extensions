MIP 扩展组件开发手册
============

在本手册中，我们将向你展示，完成一个 MIP 扩展组件的开发需要做哪些事情。在此之前，我们假定你：

- 有一定的 HTML、CSS 和 JavaScript 基础
- 了解 AMD 的模块管理方式
- 熟悉版本管理工具 Git
- 有自己的 GitHub 账号
- 懂得使用 npm


步骤
----


通常情况下，从零开始开发一个 MIP 扩展组件并上线，需要经过下面的几个步骤：

1. [准备](./prepare.md): 在 GitHub 上 fork MIP 扩展组件的仓库，并 clone 到本地
2. [创建结构](./create-structure.md): 包括组件目录、package.json 和 README.md
3. [开发](./develop.md): 编写组件的代码，以及[调试组件](./debug.md)
4. [完成开发](./wind-up.md): 更新组件的版本，并发起 pull-request
5. [MIP 开发组审核](./approve.md): 审核通过将接受 pull-request 并上线，审核不通过则反馈并继续修改

点击上面步骤中的链接，可以了解每个步骤的详细做法。

`提示`: 升级一个现有的 MIP 扩展组件无需经历步骤 **2** 。如果你曾经 fork 过 MIP 扩展组件的仓库，步骤 **1** 也将省略。


参考
----

- [MIP 扩展组件规范](./spec.md) - MIP 扩展组件的组织方式与管理方式
- [MIP 扩展组件 package.json 规范](./spec-package-json.md) - MIP 扩展组件 package.json 的规范
- [MIP 扩展组件 README.md 规范](./spec-readme-md.md) - MIP 扩展组件 README.md 的规范


