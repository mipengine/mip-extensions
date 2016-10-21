MIP 扩展组件审核
==============

为了保证 MIP 扩展组件的质量与一致性，MIP 开发团队将对每个 pull-request 进行审核。


审核时间
------

MIP 开发团队在每天 xx:xx 对所有 pull-request 进行审核：

- 审核通过的扩展组件，代码将被 merge 进入 [MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions)，并安排上线
- 审核未通过的扩展组件，MIP 开发团队会在当前 pull-request 下提出修改意见。修改完成后，MIP 开发团队将在下一个审核时间重新 review


如何修改
------

我们非常希望自己的提交能够一次性审核通过，但是有时候可能会因为疏忽等原因，我们提交的 MIP 扩展组件没有遵守 [MIP 扩展组件规范](./spec.md)，导致审核不通过。

如果提交的代码没有审核通过，MIP 开发团队将通过 [pull-request reviews](https://help.github.com/articles/about-pull-request-reviews/) 反馈修改意见。

收到修改意见后，我们需要做的和开发时一样：在本地修改代码、commit 并 push。[MIP 扩展组件仓库](https://github.com/mipengine/mip-extensions) 在该 pull-request 在关闭前，将持续收到你的修改。

如果对 MIP 开发团队提出的意见有质疑，请直接在 GitHub pull-request 页面当前意见的下方进行评论。更多关于 pull-request reviews 的问题请参考 [Reviewing changes in pull requests](https://help.github.com/articles/reviewing-changes-in-pull-requests/) 专题。


常见的问题
------

#### 版本号未更新

这个问题容易发生在组件升级中。我们可能完成了相应功能的开发就急于发起 pull-request，忘记更新版本号了。请按照 [完成开发](./wind-up.md) 文档中的要求更新版本号。

#### 待补充


上线安排
------

根据 [MIP 扩展组件规范](./spec.md)，我们将在 *每周二、周四 15:00* 对审核通过的扩展组件进行上线，上线后可以在页面中通过 script 引用。

```html
<!-- 根据版本引用 -->
<script src="//mipcache.bdstatic.com/static/mip-[componentname]/[version]/mip-[componentname].js"></script>

<!-- 引用最新版 -->
<script src="//mipcache.bdstatic.com/static/mip-[componentname]/latest/mip-[componentname].js"></script>
```
