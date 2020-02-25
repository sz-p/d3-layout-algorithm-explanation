## 堆叠图(Stack)

![](https://img.sz-p.cn/d3Layout-stack.png)

该模块依赖`数据项(keys)`其提供了`原始数据数据(data)`中所需要堆积的数据项的条目。最终返回`堆积数据(stackData)`。堆积数据包含`原始数据数据(data)`中每一项的所占的起始值和结束值。详情见[基本数据](#基本数据)。

### API

### 基本数据

**数据项(keys)**
```javascript
["apple", "samsung", "huawei", "oppo", "xiaomi", "others"]
```

**原始数据数据(data)**
```javascript
const data = [
    { year: 2017, quarter: 2, samsung: 0.229, apple: 0.118, huawei: 0.110, oppo: 0.08, xiaomi: 0.062, others: 0.401},
    { year: 2017, quarter: 3, samsung: 0.221, apple: 0.124, huawei: 0.104, oppo: 0.081, xiaomi: 0.075, others: 0.396},
    { year: 2017, quarter: 4, samsung: 0.189, apple: 0.196, huawei: 0.107, oppo: 0.069, xiaomi: 0.071, others: 0.368},
    { year: 2018, quarter: 1, samsung: 0.235, apple: 0.157, huawei: 0.118, oppo: 0.074, xiaomi: 0.084, others: 0.332}
]
```

**堆积数据(stackData)**
这里计算完毕之后 给每个数据项赋了一个当前的原始数据，数据较长这里就不再贴出。详情数据见原始数据。
简单说明一下堆积数据

数据分为两层数组
第一层数据
```javascript
[[0,0.118],[0,0.124],[0,0.196],[0,0.157],key: "apple", index: 0]
```
代表`apple`的数据,。 
其中`key`字段即为`数据项(keys)`中的值。`index`反应的是`apple`数据在堆积图中所占的位置0,就是代表处在首位。

第二层数据
`apple`中的四项，分别对应`apple`的数据在`data`中四项中所占的`比例`。
```javascript
[0,0.118]
```
第一项与第二项分别代表`开始值`和`结束值`。总值

```javascript
[
    [[0,0.118],[0,0.124],[0,0.196],[0,0.157],key: "apple", index: 0],
    [[0.118,0.347],[0.124,0.345],[0.196,0.385],[0.157,0.392],key: "samsung", index: 1],
    [[0.347,0.45699999999999996],[0.345,0.44899999999999995],[0.385,0.492],[0.392,0.51],key: "huawei", index: 2],
    [[0.45699999999999996,0.5369999999999999],[0.44899999999999995,0.5299999999999999],[0.492,0.5609999999999999],[0.51,0.584],key: "oppo", index: 3],
    [[0.5369999999999999,0.599],[0.5299999999999999,0.6049999999999999],[0.5609999999999999,0.6319999999999999],[0.584,0.6679999999999999],key: "xiaomi", index: 4],
    [[0.599,1],[0.6049999999999999,1.001],[0.6319999999999999,0.9999999999999999],[0.6679999999999999,1],key: "others", index: 5]
]
```

### 执行逻辑

1. 根据提供的**数据项(keys)**的长度创建**堆积数据(stackData)**数组
2. 遍历**原始数据数据(data)**将原始数据中各个数据项的值写入**堆积数据(stackData)**构建成`[0,value]`的格式
3. 对**堆积数据(stackData)**中每个数据项目进行列循环,每一行的值等于上一行的值加上本行值的和

### 核心代码
```javascript
function stack(data) {
var kz = keys.apply(this, arguments),
    i,
    m = data.length,
    n = kz.length,
    sz = new Array(n),
    oz;

for (i = 0; i < n; ++i) {
    // 创建 堆积数据(stackData) 数组
    for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        // 这里仅仅返回了数据值
        // 这里的值从0开始,以该数据项值结束
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
    }
    si.key = ki;
}

for (i = 0, oz = order(sz); i < n; ++i) {
    sz[oz[i]].index = i;
}
// 这里将堆积数据(stackData)做了重置
offset(sz, oz);
return sz;
}

function value(d, key) {
  return d[key];
}
function offset(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    // 主意 这里 里层是对 数组的长度进行的循环 这个二重循环是先循环的列再循环的行
    for (j = 0; j < m; ++j) {
      // 这里对数组每一项都加了前一项
      // 其实这里有些问题 由于加的次数比较多 
      // 0.1 + 0.2 = 0.30000000000000004 的问题 相对来说会比较明显

      // 由于这里是原始值，并不是坐标信息，并不能对值做特殊处理，所以会遗留这种现象。
      // 矩阵树中 计算完坐标后 由于坐标是像素信息 可以选择对坐标进行四舍五入处理。
      
      // 整个堆积图的核心代码是这一行
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
```

## 参考 & 引用
https://www.jianshu.com/p/dac8d1d698d8
https://github.com/Yixian15/d3-tutorial/blob/master/marletShareStack.html