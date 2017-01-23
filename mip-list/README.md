# mip-list

mip-list 列表组件，可以渲染同步数据，或者异步请求数据后渲染

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/static/v1/mip-list/mip-list.js

## 示例

### 基本用法

```html
<mip-list src="https://xxx">
    <template type="mip-mustache">
        <div>
            <li>name: {{name}}</li>
            <li>alias: {{alias}}</li>
        </div>
    </template>
</mip-list>
```

### 定制模板

```html
<mip-list template="mip-template-id" src="https://xxx">
    <template type="mip-mustache" id="mip-template-id">
        <div>
            <li>name: {{name}}</li>
            <li>alias: {{alias}}</li>
        </div>
    </template>
</mip-list>
```

### 同步数据

```html
<mip-list synchronous-data>
    <script type="application/json">
        {
            "items": [
                {
                    "name": "lee",
                    "alias": "xialong"
                }, {
                    "name": "ruige",
                    "alias": "ruimm"
                }, {
                    "name": "langbo",
                    "alias": "bobo"
                }
            ]
        }
    </script>
    <template type="mip-mustache">
        <div>
            <li>name: {{name}}</li>
            <li>alias: {{alias}}</li>
        </div>
    </template>
</mip-list>
```

### 点击加载更多

```html
<mip-list template="mip-template-id" src="http://xxx?" id="mip-list" has-more>
    <template type="mip-mustache" id="mip-template-id">
        <div>
            <li>{{key}}: {{value}}</li>
        </div>
    </template>
</mip-list>
<div class="mip-list-more" on="tap:mip-list.more"> 点击查看更多 </div>
```

## 属性

### src

说明：异步请求的数据接口    
必选项：否    
类型：字符串    
取值范围：必须是https的    
单位：无    
默认值：无

### synchronous-data

说明：使用同步数据开关属性    
必选项：否    
类型：字符串    
取值范围：无    
单位：无    
默认值：无 

### id

说明：mip-list 组件id    
必选项：否    
类型：字符串    
取值范围：字符串    
单位：无    
默认值：无

### has-more

说明：是否有点击展开更多功能   
必选项：否    
类型：字符串    
取值范围：无    
单位：无    
默认值：无 

## 注意事项

- 异步请求的接口需要规范过callback 为 'cb'
- 有has-more 属性时，mip-list标签，必须要有id属性，同时需要有点击按钮的dom节点，并且此节点有on属性，属性值为：tap:你的mip-list的id.more
