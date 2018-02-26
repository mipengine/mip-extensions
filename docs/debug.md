调试 MIP 扩展组件
==============

我们提供了 [mip-cli](https://www.npmjs.com/package/mip-cli) 工具，可以帮助你在开发 MIP 扩展组件时进行调试。

### 安装

全局安装 mip-cli 工具，需要通过 `npm install -g` 命令。


``` bash
$ [sudo] npm install -g mip-cli
```


提示: nodejs 5.x, 6.x 安装模块时，可能会报 `node-gyp` 相关错误，安装时需要使用 `--unsafe-perm` 参数


```
$ [sudo] npm install --unsafe-perm -g mip-cli
```

安装成功后，我们就可以使用 `mip` 命令了。

```
$ mip

  Usage: mip <command> [options]

  Commands:

    init         初始化MIP项目
    add          添加一个MIP网页
    addelement   添加一个MIP组件
    validate     验证MIP网页
    server       启动调试服务器
```


直接从官方 npm registry 安装，可能会由于网络原因，导致安装时间较长或安装失败。此时我们可以选择速度更快的 registry。比如：

```
$ [sudo] npm install -g mip-cli --registry=https://registry.npm.taobao.org
```

### 预览组件

进入 [准备](./prepare.md) 阶段 `clone` 出来的 `mip-extensions` 目录中，使用 `mip server` 命令可以启动调试器

在浏览器中访问 [http://127.0.0.1:8000](http://127.0.0.1:8000)，可以查看组件列表，点击我们想要预览的组件链接，即可预览组件的效果。


说明: 组件的预览页面是 mip-cli 工具根据组件 [README.md](./spec-readme-md.md) 中的示例章节抽取和生成的。mip-cli 工具为示例代码创建了页面，引入了相应的 MIP 环境。

其中**需要注意的是**，在开发组件时，如果需要书写额外 CSS 样式时，官方提供了一种机制，该机制允许开发者在组件目录中下构建 `setting` 文件夹，并生成 `example.preset` 的文件，同时将样式写入其中，在这些工作完成后通过工具开启本地预览服务就可以将样式自动加入到预览页面中，如 [mip-accordion](https://github.com/mipengine/mip-extensions/tree/master/src/mip-accordion/setting) 组件。


### 关于 mip-cli

除了调试外，mip-cli 还提供了结构与代码生成、验证等功能。详细请参考 [mip-cli 的 GitHub](https://github.com/mipengine/mip-cli)。


