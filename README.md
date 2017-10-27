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
npm run build -- --o output mip-form mip-access
```

## 脚本引用

使用该仓库下的组件前，需在页面中引入对应脚本，引用格式如下：

`https://c.mipcdn.com/static/v1/{组件名}/{组件名}.js`

## 示例

```
<script async src="https://c.mipcdn.com/static/v1/mip-form/mip-form.js"></script>
```

## 组件相关资料

- [官方组件列表](https://www.mipengine.org/doc/3-widget/10-widgets.html)
- [组件开发手册](https://github.com/mipengine/mip-extensions/blob/master/docs/README.md)