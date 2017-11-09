# MIP 组件

MIP 组件包括官方组件和开发者自定义组件，是用于定制站点页面功能的利器。

## 工具使用

- 安装依赖

```
npm install
```

- 编译组件可以使用 npm script 方式处理，如

```
npm run build
```

- 如果需要指定参数，以 `--` 分割，如指定输出目录和需编译的个别组件：

```
npm run build -- -o output mip-form mip-access
```

## 脚本引用

使用该仓库下的组件前，需在页面中引入对应脚本，引用格式如下：

`https://c.mipcdn.com/static/v1/{组件名}/{组件名}.js`

## 预览

组件的预览支持两种方式，具体如下：

- 页面校验引用

将当前开发的脚本引用到示例页面，具体可以参考官方博客中[MIP-CLI工具调试组件](http://www.cnblogs.com/mipengine/p/mip_cli_3_extension.html)文档；

- README 预览方式

通过在 README 中书写 html 来实时做到预览效果，具体开发细节可参考[调试 MIP 扩展组件](https://github.com/mipengine/mip-extensions/blob/master/docs/debug.md)文档

## 示例

```
<script async src="https://c.mipcdn.com/static/v1/mip-form/mip-form.js"></script>
```

## 组件相关资料

- [官方组件列表](https://www.mipengine.org/doc/3-widget/10-widgets.html)
- [组件开发手册](https://github.com/mipengine/mip-extensions/blob/master/docs/README.md)