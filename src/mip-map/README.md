# mip-map

mip-map 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-map/mip-map.js

## 示例

### 基本用法
```html
<mip-map>
    <script type="application/json">
    {
        "ak": "hKhuzfFBrcL6zGm4s9b371NaxaUrhFal",
        "location": {
            "province": "北京",
            "city": "北京市",
            "district": "海淀区",
            "street": "西北旺东路10号院"
        },
        "controls": {
            "NavigationControl": {
            },
            "MapTypeControl": {
            }
        },
        "info": {
            "width" : 250,
            "height": 100,
            "title" : "Hello",
            "content": "<h4>天安门</h4><img style='float:right;' id='imgDemo' width='139' height='104' title='天安门'/><p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p></div>"
        }
    }
    </script>
</mip-map>
```

## 使用说明

地图组件集成了百度地图的服务，目前支持定位、地图中控件加载、地图 marker 点弹窗定制等功能，具体配置和使用如下：

### ak

使用地图组件之前必须要申请成为百度开发者，并创建百度服务密钥（ak），这里的 ak 参数即代表该功能。具体申请方式可以参见[百度地图 Javascript api 文档](http://in.lbsyun.baidu.com/index.php?title=jspopular/guide/getkey)。

### location

定位相关参数，可以根据配置的具体地址来获取精确定位。

- province: 定位所对应的省份或直辖市，如“北京”；
- city: 定位所对应的城市，如“北京市”；
- district: 定位所对应的区或县，如“海淀区”；
- street: 定位所对应的具体街道或门牌信息，如“西北旺东路10号院”。

### controls

在地图绘制完成之后也可以在地图中加入对应的控件，具体是按照 `控件名: 控件参数对象` 的方式设置，如平移缩放控件：

```
<mip-map>
    <script type="application/json">
    {
        "ak": "hKhuzfFBrcL6zGm4s9b371NaxaUrhFal",
        "location": {
            "province": "北京",
            "city": "北京市",
            "district": "海淀区",
            "street": "西北旺东路10号院"
        },
        "controls": {
            "NavigationControl": {
            	"showZoomInfo": true,
            	"enableGeolocation": true
            },
            "MapTypeControl": {
            	"type": BMAP_MAPTYPE_CONTROL_HORIZONTAL
            }
        }
    }
    </script>
</mip-map>
```

具体控件列表和具体参数可以参考[百度地图提供的控件文档](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a2b0)。

### info

地图定位后，点击定位点会出现具体弹层，弹层的各个参数都是可配置的，弹层内容可以通过 content 参数进行设置，其他参数可参考[百度地图提供的弹层文档](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b8).