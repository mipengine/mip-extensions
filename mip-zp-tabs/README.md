# mip-zp-tabs

mip-zp-tabs 用来实现招聘信息标签页的切换

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zp-tabs/mip-zp-tabs.js

## 示例
```
<mip-zp-tabs>
    <div class="container">
            <div class="nav">
                <ul>
                    <li class="active" data-index="0">标签一</li>
                    <li data-index="1">标签二</li>
                    <li data-index="2">标签三</li>
                </ul>
            </div>
            <div class="nav-panel">
                <div class="nav-panel-container">
                    <div class="item active" data-index="0">
                        <p>
                            其实当时在互联网界已经有过一些统一样式表语言的建议了，但CSS是第一个含有“层叠”丰意的样式表语言。在CSS中，一个文件的样式可以从其他的样式表中继承。读者在有些地方可以使用他自己更喜欢的样式，在其他地方则继承或“层叠”作者的样式。这种层叠的方式使作者和读者都可以灵活地加入自己的设计，混合每个人的爱好。
                        </p>
                        <p>
                            哈坤于1994年在芝加哥的一次会议上第一次提出了CSS的建议，1995年的www网络会议上CSS又一次被提出，博斯演示了Argo浏览器支持CSS的例子，哈肯也展示了支持CSS的Arena浏览器。
                        </p>
                        <p>
                            哈坤于1994年在芝加哥的一次会议上第一次提出了CSS的建议，1995年的www网络会议上CSS又一次被提出，博斯演示了Argo浏览器支持CSS的例子，哈肯也展示了支持CSS的Arena浏览器。
                        </p>
                        <p>
                            同年，W3C组织（World WideWeb Consortium）成立，CSS的创作成员全部成为了W3C的工作小组并且全力以赴负责研发CSS标准，层叠样式表的开发终于走上正轨。有越来越多的成员参与其中，例如微软公司的托马斯·莱尔顿(Thomas Reaxdon)，他的努力最终令Internet Explorer浏览器支持CSS标准。哈坤、波斯和其他一些人是这个项目的主要技术负责人。1996年底，CSS初稿已经完成，同年12月，层叠样式表的第一份正式标准（Cascading style Sheets Level 1）完成，成为w3c的推荐标准。
                        </p>
                    </div>
                    <div class="item" data-index="1">
                        <p>
                            CSS为HTML标记语言提供了一种样式描述，定义了其中元素的显示方式。CSS在Web设计领域是一个突破。利用它可以实现修改一个小的样式更新与之相关的所有页面元素。
                        </p>
                    </div>
                    <div class="item" data-index="2">
                        <p>
                            设计伪类和伪元素可以实现其中的一些效果。这两种机制扩充了CSS的表现能力。在CSS1中，使用伪类可以根据一些情况改变文档中链接的样式，如根据链接是否被访问，何时被访问以及用户和文档的交互方式来应用改变。借助于伪元素，可以更改元素的第一个字母和第一行的样式，或者添加源文档中没有出现过的元素。
                        </p>
                        <p>
                            伪类和伪元素都不存在于HTML；也就是说，它们在HTML代码中是不可见的。这两种机制都得到了精心设计以便能够在CSS以后的版本中做进一步地扩充；也就是说实现更多的效果。
                        </p>
                    </div>
                </div>
            </div>
        </div>
</mip-zp-tabs>
```

## 属性

### data-index

说明：标签页的索引值，（Number) 。
必选项：是