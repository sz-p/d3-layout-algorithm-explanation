## 地图Map

![](https://img.sz-p.cn/d3Layout-map.png)

以[墨卡托投影](https://baike.baidu.com/item/%E5%A2%A8%E5%8D%A1%E6%89%98%E6%8A%95%E5%BD%B1/5477927?fr=aladdin)算法为例

该模块依赖[GeoJSON](https://baike.baidu.com/item/GeoJson/12011566?fr=aladdin)数据，一个`中心点`以及一个`缩放比`

### API



### 布局信息

```javascript
```

### 基本数据

**GeoJSON**

```javascript
{
  // 特征集
  "type": "FeatureCollection", 
  // 特征
  "features":[
      {
        "type": "Feature",
        // 几何形状
        "geometry": {
            // 多边形
            "type":"MultiPolygon",
            // 坐标
            "coordinates": [[[117.210024,40.082262],...]]
        },
        // 内部属性
        "properties": {
            "adcode":110000,
            "name":"北京市",
            "center":[116.405285,39.904989],
            "centroid":[116.41989,40.189913],
            "childrenNum":16,
            "level":"province",
            "subFeatureIndex":0,
            "acroutes":[100000],
            "parent":{"adcode":100000}
        }
    }
  ]
}
```

**中心点**
```javascript
[107, 31]
```

**缩放比**
```javascript
350
```

### 执行逻辑
### 核心代码

## 参考 & 引用
