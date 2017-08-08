# mip-ad:ad-imageplus 百度图+广告

mip-ad 的一种类型: 百度图+广告。   
产品介绍：http://imageplus.baidu.com/

## 支持布局

- N/S 

## 示例

### 示例1

#### 非 mip 页投放方式

```html
<!-- 图+原代码位 示例 -->
<script type="text/javascript">
var baiduImagePlus = {
    unionId: "u888888"
};
</script>
<script src="//cpro.baidustatic.com/cpro/ui/mi.js"></script>
```

#### mip 页投放方式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u888888"
    >
</mip-ad>
```

### 示例2

#### 非 mip 页投放方式

```html
<!-- 图+原代码位 示例 -->
<script type="text/javascript">
var baiduImagePlus = {
    unionId: "u888888",
    formList: [{formId:21}, {formId:22}]
};
</script>
<script src="//cpro.baidustatic.com/cpro/ui/mi.js"></script>
```

#### mip 页投放方式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u888888"
    FormList="[{formId:21}, {formId:22}]"
    >
</mip-ad>
```

### 示例3

#### 非 mip 页投放方式

```html
<!-- 图+原代码位 示例 -->
<script type="text/javascript">
var baiduImagePlus = {
    unionId: "u888888",
    formList: [{formId:21}, {formId:22}],
    nopicFormList: [{formId:25}]
};
</script>
<script src="//cpro.baidustatic.com/cpro/ui/mi.js"></script>
```

#### mip 页投放方式

```html
<mip-ad 
    type="ad-imageplus"
    unionId="u888888"
    FormList="[{formId:21}, {formId:22}]"
    nopicFormList="[{formId:25}]"
    >
</mip-ad>
```



## 属性

### type

说明：迁移到mip后的广告类别  
必选项：是  
类型：字符串  
取值：ad-imageplus 
默认值：无

### unionId

说明：广告位id，与原广告位id相同 (原广告位id也可能叫`cpro_id`) 
必选项：是  
类型：字符串  
默认值：无

### FormList

说明：广告样式列表，从原广告位 `formList` 属性拷贝过来即可，原广告位无 `formList` 则省略  
必选项：否  
类型：字符串  
默认值：无

### nopicFormList

说明：广告样式列表，从原广告位`nopicFormList`属性拷贝过来即可，原广告位无`nopicFormList`则省略     
必选项：否  
类型：字符串    
默认值：无

## 注意事项

1. 百度网盟业务端：[http://union.baidu.com](http://union.baidu.com)
2. 图+广告官网：[http://imageplus.baidu.com](http://imageplus.baidu.com)
3. 图+广告代码位会自动在页面上的前4张大图上加载并展现广告
4. 图+广告的<font color="yellowgreen">具体样式勾选</font>，请到 [百度网盟业务端](http://union.baidu.com) 或 [图+广告官网](http://imageplus.baidu.com) 进行操作
5. 一个页面上，只应该出现<font color="yellowgreen">一个图+代码位</font>，即可以支持多个图片上出多个样式的广告的功能
