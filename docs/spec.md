MIP 扩展组件规范
==============


源文件仓库
--------

MIP 扩展组件的中央仓库是 [https://github.com/mipengine/mip-extensions](https://github.com/mipengine/mip-extensions)。中央仓库 master 分支下的代码永远是稳定的。根目录下，每个 `mip-` 前缀的目录为一个扩展组件。


开发方式
--------

MIP 扩展组件开发采用 [Forking工作流](https://github.com/oldratlee/translations/blob/master/git-workflows-and-tutorials/workflow-forking.md) 的方式。

1. 开发者需要 fork [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions)
2. 开发者在自己的仓库下开发
3. 开发完成后通过 pull-request 提交修改，由 MIP 开发小组审核与合并

不允许在中央仓库 [https://github.com/mipengine/mip-extensions](https://github.com/mipengine/mip-extensions) 下开发。


组件结构
--------

[MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions) 下，每个 `mip-` 前缀的目录为一个扩展组件。其中：

- 目录名称为组件名称
- 目录名称（组件名称）必须是 `mip-` 为前缀的全小写字符串
- 必须包含符合 [MIP 扩展组件 package.json 规范](./spec-package-json.md) 的 `package.json` 文件
- 必须包含符合 [MIP 扩展组件 README.md 规范](./spec-readme-md.md) 的 `README.md` 文件
- 通过 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 进行模块管理
- 必须包含主模块文件，可以是 `[组件名].js` 或 `main.js`
- 可以包含主样式文件，可以是 `[组件名].css`、`[组件名].less`、`main.css` 或 `main.less` 


审核标准
--------

MIP 开发小组在审核扩展组件时，将首先检查组件结构是否符合要求，然后根据下面的规范文档中的要求进行检查。

- [MIP 扩展组件 package.json 规范](./spec-package-json.md)
- [MIP 扩展组件 README.md 规范](./spec-readme-md.md)
- [MIP 扩展组件脚本开发规范](./spec-script.md)
- [MIP 扩展组件样式开发规范](./spec-style.md)

上线
--------


### 上线时间

`每周2、周4` 上线两次，`15:00` 上线。`14:00` 代码需要 ready，错过时间只能等待下次上线窗口。


### 上线地址

目前新增的组件都会放至 v1.2 目录下，如示例：

```
http[s]://mipcache.bdstatic.com/static/v1.2/[组件名].js
```

TODO:  
后续使用无版本号的策略，静态文件上线地址近期会有更新，更新后旧地址仍会保留，请大家关注官网动态。



