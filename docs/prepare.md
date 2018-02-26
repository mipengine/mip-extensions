准备
==============

按照 [MIP 扩展组件规范](./spec.md)，要进行 MIP 扩展组件开发，我们需要：

1. Fork [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions) 到自己的 GitHub 账号下
2. Clone 到本地
3. 完成开发
4. 将开发完成的扩展组件通过 pull request 进行提交

本篇文档描述如何 fork [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions) 并 `git clone` 到本地


## Fork

首先你需要有一个 GitHub 账号，并 [登录](https://github.com/login)。如果没有的话，可以先进行 [注册](https://github.com/join?source=header-home)。

登录 GitHub 后，访问 [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions)，并点击右上方的 **fork** 按钮，就将 mip-extensions fork 到你的个人账户了。想了解更多的话，可以查阅 GitHub 的 [Fork a repo 文档](https://help.github.com/articles/fork-a-repo/)。

## Clone

我们需要 `git clone` 刚才 fork 后的仓库，通常它的地址是 `https://github.com/[YOUR-USERNAME]/mip-extensions`。通过一行命令就能完成：


``` bash
$ git clone https://github.com/[YOUR-USERNAME]/mip-extensions
```

Clone 完成后，你将在本地获得一个 `mip-extensions` 目录，里面包含了所有的 MIP 扩展组件。到此我们就完成了开发前的准备工作。


GitHub 的 [Cloning a repositor 文档](https://help.github.com/articles/cloning-a-repository/) 详细描述了在 Mac / Linux / Windows 上如何 `clone` 一个仓库到本地。不习惯命令行操作的同学可以参考它。

