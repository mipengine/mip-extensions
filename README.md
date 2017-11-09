# MIP 组件

MIP 组件包括官方组件和开发者自定义组件，是用于定制站点页面功能的利器。

## 组件编译

- 安装依赖

	```
	npm install
	```

- 执行编译

	组件编译集成了 [mip-extension-optimizer](https://github.com/mipengine/mip-extension-optimizer) 工具，并通过 npm script 命令提供出来，如：

	```
	npm run build
	```

- 指定参数

	如果需要指定编译参数（参数使用与 mip-extension-optimizer 一致），以 `--` 分割，如指定输出目录和需编译的个别组件：

	```
	npm run build -- -o output mip-form mip-access
	```

## 脚本引用

使用该仓库下的组件前，需在页面中引入组件对应脚本。

- 格式

	```
	https://c.mipcdn.com/static/v1/{组件名}/{组件名}.js
	```

- 示例

	```
	<script async src="https://c.mipcdn.com/static/v1/mip-form/mip-form.js"></script>
	```

## 组件预览

组件的预览支持两种方式，具体如下：

- 页面预览

	将当前开发的脚本引用到示例页面，并通过 mip cli 开启本地服务，预览页面功能。该方法需要开发者构建预览所需的 MIP 页面。具体可以参考官方博客中的[MIP-CLI工具调试组件](http://www.cnblogs.com/mipengine/p/mip_cli_3_extension.html)文档。

- README 预览

	通过在 README 中书写 html，并借助 mip cli 来预览效果。该方法会抓取 README 中预览所需 html 来达成预览效果。具体细节可参考[调试 MIP 扩展组件](https://github.com/mipengine/mip-extensions/blob/master/docs/debug.md)文档。

## 组件相关资料

- [官方组件列表](https://www.mipengine.org/doc/3-widget/10-widgets.html)
- [组件开发手册](https://github.com/mipengine/mip-extensions/blob/master/docs/README.md)