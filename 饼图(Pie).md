## 饼图(Pie)

![](https:/img.sz-p.cn/d3Layout-pie.png)

该模块依赖。`开始角度`,`结束角度`。将原始数据中给出的值按比例映射到`开始角度`到`结束角度`这个区间内。详情见[基本数据](#基本数据)。

### API
```javascript
// 如果指定了 value 则设置当前饼图生成器的值访问器为指定的函数或数值，并返回当前饼图生成器。如果没有指定 value 则返回当前的值访问器默认为:
// function value(d) {
//   return d;
// }
pie.value([value])

//如果指定了 compare 则将 value 比较函数设置为指定的函数并返回当前的饼图生成器。如果没有指定 compare 则返回当前的值比较函数，默认为降序。默认的值比较函数实现形式为:
//function compare(a, b) {
//  return b - a;
//}
pie.sortValues([compare])

//如果指定了 compare 则将数据比较函数设置为指定的函数并返回饼图生成器。如果没有指定 compare 则返回当前的数据对比函数，默认为 null。如果数据比较函数和值比较函数都为 null 则返回的 arc 会保持数据的次序。否则，返回的结果会安装相应的比较函数进行排序。
pie.sort([compare])

//如果指定了 angle 则将饼图的布局起始角度设置为指定的函数或数值并返回饼图生成器。如果没有指定则返回当前起始角度访问器默认为:
//function startAngle() {
//  return 0;
//}
pie.startAngle([angle]) 

//如果指定了 angle 则将整个饼图的终止角度设置为指定的函数或数值并返回当前饼图生成器。如果没有指定 angle 则返回当前的终止角度访问器。默认为:
//function endAngle() {
//  return 2 * Math.PI;
//
pie.endAngle([angle])

// 如果指定了 angle 则将饼图扇形之间的间隔设置为指定的函数或数值，并返回当前饼图生成器。如果没有指定 angle 则返回当前默认的间隔角度访问器，默认为:
// function padAngle() {
//  return 0;
// }
pie.padAngle([angle])
```
### 布局信息
布局信息整体为一个数组,数组中的每一项代表一个扇区，其中`startAngle`,`endAngle`代表起止角度。单位为弧度制。`padAngle`为各个扇区中间的间距。`outerRadius`为外半径
```javascript
[
    {
        index: 0,
        value: 20,
        startAngle: 0,
        endAngle: 0.28267393361488574,
        padAngle: 0.05
    },
    {
        index: 1,
        value: 40,
        startAngle: 0.28267393361488574,
        endAngle: 0.7980218008446573,
        padAngle: 0.05
    },
    {
        index: 2,
        value: 90,
        startAngle: 0.7980218008446573,
        endAngle: 1.8950545021116434,
        padAngle: 0.05,
        outerRadius: 160
    },
    {
        index: 3,
        value: 80,
        startAngle: 1.8950545021116434,
        endAngle: 2.8757502365711862,
        outerRadius: 160
    },
    {
        index: 4,
        value: 120,
        startAngle: 2.8757502365711862,
        endAngle: 4.321793838260501,
        padAngle: 0.05
    },
    {
        index: 5,
        value: 100,
        startAngle: 4.321793838260501,
        endAngle: 5.535163506334929,
        padAngle: 0.05
    },
    {
        index: 6,
        value: 60,
        startAngle: 5.535163506334929,
        endAngle: 6.283185307179586,
        padAngle: 0.05
    }
]
```
### 基本数据

**原始数据**
```javascript
  const oriData = [
    { 'x': 'A计划', 'y': 20 },
    { 'x': 'B计划', 'y': 40 },
    { 'x': 'C计划', 'y': 90 },
    { 'x': 'D计划', 'y': 80 },
    { 'x': 'E计划', 'y': 120 },
    { 'x': 'F计划', 'y': 100 },
    { 'x': 'G计划', 'y': 60 }
  ];
```

**开始角度**
```javascript
  const startAngle = 0；
```

**结束角度**
```javascript
  const startAngle = Math.PI * 2；
```

### 执行逻辑

1. 计算**原始数据**中的总值
2. 计算了一个比例，代表一个值在起始角度到终止角度这个区间内，减去间隔角度后，所占的大小。
3. 遍历**原始数据**，(原始数据中的值 * **比例**)即当前扇区所占用的角度。当前扇区的起始角度为上一个扇区的终止角度

### 核心代码

```javascript
  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)), // endAngle
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1), // padAngle 即 间隔角度
        v;

    // 这里计算了原始数据中的值的总和
    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // 如果必要的话 会对数据做一个排序操作以使饼图更美观
    // 可以根据以前计算的值或数据对圆弧进行排序。
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // 计算角度
    // 这里 计算了一个比例，代表一个值在起始角度到终止角度这个区间内 减去间隔角度后 所占的大小
    // k = sum ? (da - n * pa) / sum
    // 所以扇区i的实际的开始角度为 arcs[i]+pa*i。
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }
```

## 参考 & 引用
https://blog.csdn.net/mochenangel/article/details/99628761

https://d3js.org.cn/document/d3-shape/#pies