# mip-bind

mip-bind 数据驱动组件，可以允许开发者在页面中动态操作数据，进行双向数据绑定，进而实现业务功能。

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js

MIP Bind 是以数据驱动页面更新的功能，开发者通过配置数据信息，并绑定在相应 DOM 上，就可以轻松做到数据变动后 DOM 元素随之变动的效果。

## 使用方法

### 设置数据

```
<mip-data>
    <script type="application/json">
    {
        "data": {
            "name": "Jack",
            "age": 23
        },
        "common": {
            "baiduId": "92031238234"
        }
    }
    </script>
</mip-data>

<mip-data src="https://www.example.org/data">
</mip-data>
```

其中 mip-data 元素用于在页面中设置数据源，可以设置两种形式：

- 固定数据：不经过请求，可通过 json 形式写入 script 脚本中；
- 请求数据：如果需要请求，则指定 src 地址，在请求回来之后自动 merge 到数据表里；

### 绑定指令

目前绑定数据只支持两种功能：

- m-bind

    具体格式为 m-bind:attrs=value，即：将 attrs 属性值设置为 value 的值，如：

    ```
    <p m-bind:title="title">Hello World!</p>
    ```

- m-text

    具体格式为 m-text=value，即：将元素的 textContent 设置为 value 的值，如：

    ```
    <p m-text="content"></p>
    ```

### 修改数据

设置数据也是通过在 html 元素中加入事件来完成，方式是在元素中加入 on 属性来完成。

- 具体格式

    事件绑定形式如下，可支持多个事件同时定义。

    ```
    on="事件:MIP.setData({}) 事件:MIP.setData({}) 事件:MIP.setData({})"
    ```

- 事件类型

    - 针对所有元素

        事件|描述
        ---|---
        tap|单击事件
        doubletap|双击事件
        swip|滑动事件

    - input 元素

        事件|描述
        ---|---
        change|输入框内容发生变化时候触发

    - mip-form 元素

        事件|描述
        ---|---
        submit|提交时触发的事件
        submitSuccess|提交成功后触发的事件
        submitError|提交失败后触发的事件

- 修改数据

    - API

        - setdata

            该方法会将新增数据加入到数据源中，重复数据会进行覆盖，但该方法在使用时并不会再次编译 DOM （将 DOM 和当前数据源进行绑定），即对于异步返回的，通过改方法进行修改是不会出发 DOM 改变的。

        - $set

            该方法和 setdata 方法类似，但不同点是通过改方法设置数据时，会对页面 DOM 进行编译，如果异步数据此时返回，同时在此时修改了数据，是会触发页面变动的。**但，由于设计到 DOM 操作，有一定性能成本，需要谨慎使用**。

    - 数据源

        设置的数据按照层级被合并到总的数据源中，后设置的数据会覆盖前者，如

        ```
        <mip-data>
            <script type="application/json">
            {
                name: 'Jackson',
                age: '25'
            }
            </script>
        </mip-data>
        <mip-data>
            <script type="application/json">
            {
                home: 'earth'
            }
            </script>
        </mip-data>
        ```

        此时页面维护的数据源为

        ```
        {
            name: 'Jackson',
            age: '25',
            home: 'earth'
        }
        ```

        如果此时在进行数据的设置

        ```
        <div on="tap:MIP.setData({job:'coding', home: 'beijing'})"></div>

        ```

        此时数据源将变为

        ```
        {
            name: 'Jackson',
            age: '25',
            home: 'beijing',
            job: 'coding'
        }
        ```

    - 数据表达式

        - 支持运算表达式解析，如

        ```
        <div on="tap:MIP.setData({number:'3*2', home: 'beijing'})"></div>
        <div on="tap:MIP.setData({number:'3*m.count', home: 'beijing'})"></div>
        ```

        - 支持 dom 元素解析

        mip bind 支持 dom 元素解析，在设置的数据中，可通过 DOM 变量来表示当前事件触发的源 dom 元素，并可通过其获取元素上的属性值等，如：

        ```
        <div on="tap:MIP.setData({num:'DOM.value'})"></div>
        ```


### 自定义事件

目前官方只提供部分事件，如果站长在组件中有需要触发设置数据的时机，可以通过自定义事件来完成，具体实现方式如下：

```
var viewer = require('viewer');
viewer.eventAction.execute(自定义事件名, 触发时机元素, 事件);
```

如

```
btn.addEventListener('blur', function (event) {
    viewer.eventAction.execute('blur', event.target, event);
}
```

此时就可以在 DOM 中通过改事件进行数据的设置

```
<div on="blur:MIP.setData({title: 'Hello World!'})"></div>
```