# mip-hk-keep

mip-hk-keep 百度好看详情页下载app安装打开对应详情页接口

| 描述 | 保持下载APP对应详情页|
|---|---|
|可用性	|完成 |
|所需脚本| mip-hk-keep |

# 使用方法

在MIP HTML中,直接使用标签, 详情页下载app安装打开对应详情页接口。示例如下:
```
 <mip-hk-keep type="video" urlKey="http://www.internal.video.baidu.com/23f7c713a6de54bf80d13a6e1f49c1a3.html"></mip-hk-keep>
```

# 属性

- **type**

    - 是否必填：是

    - 说明：客户端页面类型  ['article', 'topic', 'video', 'gallery', 'beauty', 'activity']

- **urlKey**

    - 是否必填：是

    - 说明：客户端所需参数
