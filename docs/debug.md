调试 MIP 扩展组件
==============

我们提供了 [mip-cli](https://www.npmjs.com/package/mip-cli) 工具，可以帮助你在开发 MIP 扩展组件时进行调试。



### 安装

安装 `mip-cli` 工具，我们需要通过 `npm install -g` 命令。


``` bash
$ [sudo] npm install -g mip-cli
```


`提示`: nodejs 5.x, 6.x 安装模块时，可能会报 `node-gyp` 相关错误，安装时需要使用 `--unsafe-perm`


```
$ [sudo] npm install --unsafe-perm -g mip-cli
```

安装完成后，我们将获得一个 `mip` 命令。

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


直接从官方 npm registry 安装，可能会由于网络原因，导致安装时间较长或安装失败。此时我们可以选择速度更快的 registry。

```
$ [sudo] npm install -g mip-cli --registry=https://registry.npm.taobao.org
```



### 预览组件

进入 [准备](./prepare.md) 阶段 clone 出来的 `mip-extensions` 目录中，使用 `mip server` 命令可以启动调试器

在浏览器中访问 [http://127.0.0.1:8000](http://127.0.0.1:8000)，可以查看组件列表。点击我们想要预览的组件链接，即可预览组件的效果。


`说明`: 组件的预览页面是 mip-cli 工具根据组件 [README.md](./spec-readme-md.md) 中的示例章节抽取和生成的。mip-cli 工具为示例代码创建了页面，引入了相应的 MIP 环境。

### 调试MIP组件

调试项目 `mip-project` 目录结构如下：

```
.
├── mip-sidebar
│   ├── README.md
│   ├── mip-sidebar.js
│   ├── mip-sidebar.less
│   ├── package.json
├── mip-sidebar.html
└── mip.config
```

`mip-sidebar` 为你开发的组件目录，`mip-sidebar.html` 为使用组件的html文件，内容如下：

```html
<!DOCTYPE html>
<html mip>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <title>
    <!-- 标题 -->
  </title>
  <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
  <link rel="canonical" href="对应的原页面地址">
  <style mip-custom>
    /* 自定义样式 */
  </style>
</head>
<body>
  <!-- 正文 -->
  <header>
    <div id="logo" on="tap:sidebar.open">Open mip-sidebar</div>
  </header>
  <mip-sidebar id="sidebar" layout="nodisplay" class="mip-hidden">
    <ul>
      <li>
        <a data-type="mip" href="https://www.mipengine.org/">MIP官网</a>
        <button on="tap:sidebar.close"> X </button>
      </li>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li>
        Nav item 4 - Image
        <mip-img src="https://www.mipengine.org/favicon.ico" width="32" height="32" alt="mipengine ico"></mip-img>
      </li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </mip-sidebar>
  <!-- 引入js -->
  <script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
  <script src="https://mipcache.bdstatic.com/static/v1/mip-sidebar/mip-sidebar.js"></script>
</body>
</html>
```

修改 `mip.config` 文件中的配置 `extensionsDir` 值为 `./`，注意是 `./` 不是 `/`。

运行 `mip server` 命令，启动调试，访问 `mip-sidebar.html`。

### 关于 mip-cli

除了调试外，mip-cli 还提供了结构与代码生成、验证等功能。详细请参考 [mip-cli 的 GitHub](https://github.com/mipengine/mip-cli)。


