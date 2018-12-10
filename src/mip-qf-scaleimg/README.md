# mip-qf-scaleimg

mip-qf-scaleimg 湖南七风点击查看大图组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-scaleimg/mip-qf-scaleimg.js

## 示例

### 基本用法
```html
<mip-qf-scaleimg scale-width="" scale-height="">
    <div class="origin-img-box">
        <mip-img src="https://m.119you.com/upload/resources/image/2018/08/06/1021145_500x500.jpg?1533543533000" class="origin-img" width="50" height="100">
    </div>
    <div class="origin-img-box">
        <mip-img src="https://m.119you.com/upload/resources/image/2018/08/06/1017089_500x500.jpg?1533543533000" class="origin-img" width="50" height="100">
    </div>
</mip-qf-scaleimg>
```
### 属性

### scale-width

说明：放大后图片宽度
必选项：否
类型：字符串
取值范围：百分比 / 数值 + 'px'

### scale-height

说明：放大后图片高度
必选项：否
类型：字符串
取值范围：百分比 / 数值 + 'px'


## 注意事项

具体样式自己加上相关样式即可，组件内元素类名不可变
