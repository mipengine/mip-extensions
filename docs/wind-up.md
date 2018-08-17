完成 MIP 扩展组件开发
==============

当 MIP 扩展组件的开发工作完成后，我们还需要进行一些收尾工作：

1. 更新版本号
2. 通过 pull request 提交审核


更新版本号
------

MIP 扩展组件 的版本信息保存在 `package.json` 文件中的 `version` 字段，它的值必须符合 [Semver](http://semver.org/) 格式。详细信息请参考 [MIP 扩展组件 package.json 规范](./spec-package-json.md)。


在提交审核之前，我们必须检查并更新我们的版本信息。如果是全新开发的组件，我们需要设置一个初始版本；如果是一次对现有组件的升级，我们需要提升版本号。下面是一些原则性的建议：

1. 新的 MIP 扩展组件，版本号从 `1.0.0` 开始
2. bug 修复的升级，更新第三位版本号。如 `1.0.1`
3. 添加新特性，更新第二位版本号。如 `1.1.0`
4. 重大升级或导致无法前向兼容的，更新第一位版本号。如 `2.0.0`

`提示`: 更新完版本号后，在提交审核前，别忘了 `commit` 和 `push`。


提交审核
-----

之前，我们已经根据 [准备工作](./prepare.md)，fork [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions) 到自己的 GitHub 账号下。现在，我们要将自己的开发代码通过 [pull-request](https://help.github.com/articles/about-pull-requests/) 提交回 [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions)。

通常，只需要在浏览器中访问你的账号仓库 `https://github.com/YOUR-NAME/mip-extensions`，点击 **new pull request** 按钮，然后跟着提示逐步操作就可以了。

GitHub 的 help 文档 [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) 详细描述了如何创建一个 pull request。
