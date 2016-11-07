# mip-hk-feed

好看feed流

|标题|内容|
|---|---|
|类型|业务|
|支持布局|N/S|
|所需脚本||

## 示例

在MIP HTML中,直接使用标签, 用于百度好看信息流。示例:

```
 <mip-hk-feed type="video"></mip-hk-feed>
```

## 属性

### type

说明：信息流类型
必选项：否
类型：字符串
取值范围：video

### 需要在页面定义如下参数

说明：页面定义参数
必选项：否 (如果页面为HTTPS则为必选项)
取值范围：
```
<script type="application/json" id="J_https_map">
{
    "http:\/\/www.baidu.com":"https:\/\/www.baidu.com",
    "http:\/\/hm.baidu.com\/":"https:\/\/hm.baidu.com\/",
    "http:\/\/m.hao123.com":"https:\/\/m.hao123.com",
    "http:\/\/wap.hao123.com":"https:\/\/wap.hao123.com",
    "http:\/\/www.hao123.com":"https:\/\/www.hao123.com",
    "http:\/\/nsclick.baidu.com":"https:\/\/gsp1.baidu.com\/8qUJcD3n0sgCo2Kml5_Y_D3",
    "http:\/\/static.tieba.baidu.com":"https:\/\/gsp0.baidu.com\/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK",
    "http:\/\/nssug.baidu.com":"https:\/\/gsp1.baidu.com\/8qUZeT8a2gU2pMbgoY3K",
    "http:\/\/suggestion.baidu.com":"https:\/\/gsp0.baidu.com\/5a1Fazu8AA54nxGko9WTAnF6hhy",
    "http:\/\/hdj.baidu.com":"https:\/\/gsp1.baidu.com\/7LAAsjip0QIZ8tyhnq",
    "http:\/\/suez.baidu.com":"\/\/suez.baidu.com"
}
</script>
```
