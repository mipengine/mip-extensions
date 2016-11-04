# mip-hk-call

mip-hk-call 百度好看调起客户端

| 描述 | 百度好看调起客户端|
|---|---|
|可用性	|完成 |
|所需脚本| mip-hk-call |

# 使用方法

在MIP HTML中,直接使用标签, 用于调起百度好看客户端。示例:
```
    <mip-hk-call class="haokan-dl-link-w" type="article" urlKey="http://news.yesky.com/focus/145/106124645.shtml" apk="5" page="erji_detail_news">
        <a target="_blank" href="###" class="J_app_call">立即下载</i></a>
    </mip-hk-call>
```

# 属性

- **type**

    - 是否必填：是

    - 说明：调起客户端页面类型  ['article', 'topic', 'video', 'gallery', 'beauty', 'activity']
- **urlKey**

    - 是否必填：是

    - 说明：客户端参数
- **apk**

    - 是否必填：否

    - 说明：统计不同位置不同统计参数
- **page**

    - 是否必填：否

    - 说明：页面统计参数
