# mip-list

mip-list 列表组件，需要通过url异步请求数据

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

## 注意事项

- 异步请求的接口需要规范过callback 为 'cb'
