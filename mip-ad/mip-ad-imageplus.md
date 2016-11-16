# 类型: ad-imageplus 图加广告

图加广告

## 支持布局

- N/S 

## 示例

### 基本使用

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u2816363"
    >
</mip-ad>
```

### 贴片样式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u2816363"
    FormList="[{formId:21}"
    >
</mip-ad>
```

### TAG 样式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u2816363"
    FormList="[{formId:22}"
    >
</mip-ad>
```

### 图集样式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u2816363"
    FormList="[{formId:23}"
    >
</mip-ad>
```

### 飞流样式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u2816363"
    nopicFormList="[{formId:25}]"
    >
</mip-ad>
```

### 综合样式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u2816363"
    FormList="[{formId:21},{formId:22},{formId:23}]"
    nopicFormList="[{formId:25}]"
    >
</mip-ad>
```

## 属性

### type

说明：广告类型  
必选项：是  
类型：字符串  
取值：ad-imageplus 
默认值：无

### unionId

说明：广告投放id  
必选项：是  
类型：字符串  
默认值：无

### FormList

说明：站点选择的样式id  
必选项：否  
类型：对象数组  
默认值：无

### nopicFormList

说明：站点选择的样式id，飞流样式需要设置     
必选项：否  
类型：数组  
默认值：无

## 注意事项

1. 图加广告会为页面前4张图片自动添加广告，所以无需可以在组件中加mip-img标签，示例是为展示效果
2. 图加广告的四种样式可以同时设置，如示例的综合样式
