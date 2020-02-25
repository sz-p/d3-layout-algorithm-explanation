## 饼图(Pie)

![](https://img.sz-p.cn/d3Layout-pie.png)

该模块依赖。`开始角度`,`结束角度`。将原始数据中给出的值按比例映射到`开始角度`到`结束角度`这个区间内。详情见[基本数据](#基本数据)。

### API
[#](https://d3js.org.cn/document/d3-shape/#pie) d3.**pie**() [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js)

构建一个新的使用默认配置的 `pie` 生成器。

[#](https://d3js.org.cn/document/d3-shape/#_pie) *pie*(*data*[, *arguments…*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L14)

根据指定的 *data* 数组生成一组对象数组，其中每个对象包含每个传入的数据经过计算后的角度信息。可以包含其他的额外 *argements*，这些额外的参数会直接被传递给当前数据计算后生成的对象或饼图生成器的访问器。返回数组的长度与 *data* 长度一致，其中第 *i* 个元素与输入数据中的第 *i* 个元素对应。返回数组中的每个对象包含以下属性:

- `data` - 输入数据; 对应输入数组中的数据元素.
- `value` - `arc` 对应的 [value](https://d3js.org.cn/document/d3-shape/#pie_value).
- `index` - `arc` 基于 `0` 的 [sorted index(排序后的索引)](https://d3js.org.cn/document/d3-shape/#pie_sort).
- `startAngle` - `arc` 的 [start angle](https://d3js.org.cn/document/d3-shape/#pie_startAngle).
- `endAngle` - `arc` 的 [end angle](https://d3js.org.cn/document/d3-shape/#pie_endAngle).
- `padAngle` - `arc` 的 [pad angle](https://d3js.org.cn/document/d3-shape/#pie_padAngle).

这种形式的设计可以兼容 `arc` 生成器的默认 [startAngle](https://d3js.org.cn/document/d3-shape/#arc_startAngle), [endAngle](https://d3js.org.cn/document/d3-shape/#arc_endAngle) 和 [padAngle](https://d3js.org.cn/document/d3-shape/#arc_padAngle) 访问器。角度单位是任意的，但是如果你想将饼图生成器和 `arc` 生成器结合使用，则应该以弧度的形式指定角度值，其中 `12` 点钟方向为 `0` 度并且顺时针方向为正。

给定一个小数据集，下面为如何计算其每个数据的角度信息:

```js
var data = [1, 1, 2, 3, 5, 8, 13, 21];
var arcs = d3.pie()(data);
```

`pie()` [constructs(构造)](https://d3js.org.cn/document/d3-shape/#pie) 一个默认的 `pie` 生成器。`pie()(data)` 为指定的数据集 [invokes(调用)](https://d3js.org.cn/document/d3-shape/#_pie) 饼图生成器，返回一组对象数组:

```json
[
  {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
  {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
  {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
  {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
  {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
  {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
  {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
  {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
]
```

需要注意的是，返回的数组与传入的数据集的次序是一致的，无论数据元素的值大小。

[#](https://d3js.org.cn/document/d3-shape/#pie_value) *pie*.**value**([*value*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L54)

如果指定了 *value* 则设置当前饼图生成器的值访问器为指定的函数或数值，并返回当前饼图生成器。如果没有指定 *value* 则返回当前的值访问器默认为:

```js
function value(d) {
  return d;
}
```

当生成饼图时，值访问器会为传入的数据的每个元素调用并传递当前数据元素 *d*, 索引 `i` 以及当前数组 `data` 三个参数。默认的值访问器假设传入的数据每个元素为数值类型，或者可以使用 [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) 转为数值类型的值。如果你的数据不是简单的数值，你应该指定一个返回数值类型的值访问器。例如:

```js
var data = [
  {"number":  4, "name": "Locke"},
  {"number":  8, "name": "Reyes"},
  {"number": 15, "name": "Ford"},
  {"number": 16, "name": "Jarrah"},
  {"number": 23, "name": "Shephard"},
  {"number": 42, "name": "Kwon"}
];

var arcs = d3.pie()
    .value(function(d) { return d.number; })
    (data);
```

这与 [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 类似，在调用饼图生成器之前，对数据进行预处理:

```js
var arcs = d3.pie()(data.map(function(d) { return d.number; }));
```

访问器的好处是输入数据仍然与返回的对象相关联，从而使访问数据的其他字段变得更容易，例如设置颜色或添加文本标签。

[#](https://d3js.org.cn/document/d3-shape/#pie_sort) *pie*.**sort**([*compare*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L62)

如果指定了 *compare* 则将数据比较函数设置为指定的函数并返回饼图生成器。如果没有指定 *compare* 则返回当前的数据对比函数，默认为 `null`。如果数据比较函数和值比较函数都为 `null` 则返回的 `arc` 会保持数据的次序。否则，返回的结果会安装相应的比较函数进行排序。设置数据对比函数默认会将 [value comparator(值比较函数)](https://d3js.org.cn/document/d3-shape/#pie_sortValues) 设置为 `null`。

*compare* 函数会传递两个参数 *a* 和 *b*, 每个元素都来自输入数据。如果数据 *a* 对应的扇形在 *b* 前面，则比较函数应该返回小于 `0` 的值; 如果 *a* 对应的扇形在 *b* 的后面则比较函数应返回大于 `0` 的值;返回 `0` 表示 *a* 和 *b* 的相对位置不做任何调整。例如根据 `name` 对生成的扇形数组进行排序:

```js
pie.sort(function(a, b) { return a.name.localeCompare(b.name); });
```

排序操作不会影响 [generated arc array(生成的数组次序)](https://d3js.org.cn/document/d3-shape/#_pie), 生成的数据次序与传入的数组次序保持一致。排序操作是通过修改每个生成的元素的起始角度值来实现排序的。

[#](https://d3js.org.cn/document/d3-shape/#pie_sortValues) *pie*.**sortValues**([*compare*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L58)

如果指定了 *compare* 则将 `value` 比较函数设置为指定的函数并返回当前的饼图生成器。如果没有指定 *compare* 则返回当前的值比较函数，默认为降序。默认的值比较函数实现形式为:

```js
function compare(a, b) {
  return b - a;
}
```

如果数据比较函数和值比较函数都为 `null` 则生成的数组次序与输入数据的次序保持一致。否则，数据会按照数据比较函数进行排序。设置值比较函数默认将 [data comparator](https://d3js.org.cn/document/d3-shape/#pie_sort) 设置为 `null`.

值比较函数与 [data comparator](https://d3js.org.cn/document/d3-shape/#pie_sort) 类似，只不过两个参数 *a* 和 *b* 是经过 [value accessor](https://d3js.org.cn/document/d3-shape/#pie_value) 计算之后的值，而不是原始的数据元素。如果 *a* 应该在 *b* 前则返回小于 `0` 的值，如果 *a* 应该在 *b* 后面则返回大于 `0` 的值。返回 `0` 表示 *a* 和 *b* 的相对位置不改变。例如根据值进行排序:

```js
pie.sortValues(function(a, b) { return a - b; });
```

排序操作不会影响 [generated arc array(生成的数组次序)](https://d3js.org.cn/document/d3-shape/#_pie), 生成的数据次序与传入的数组次序保持一致。排序操作是通过修改每个生成的元素的起始角度值来实现排序的。

[#](https://d3js.org.cn/document/d3-shape/#pie_startAngle) *pie*.**startAngle**([*angle*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L66)

如果指定了 *angle* 则将饼图的布局起始角度设置为指定的函数或数值并返回饼图生成器。如果没有指定则返回当前起始角度访问器默认为:

```js
function startAngle() {
  return 0;
}
```

起始角度是整个饼图的开始角度，也就是第一个扇区的开始角度。起始角度访问器只会调用一次，并传递当前数据为参数，其中 `this` 指向 [pie generator](https://d3js.org.cn/document/d3-shape/#_pie)。*angle* 的单位是任意的，但是如果要将饼图生成器与弧生成器结合使用则应该以弧度指定，`12点钟` 方向为 `0` 度方向，并且顺时针为正。

[#](https://d3js.org.cn/document/d3-shape/#pie_endAngle) *pie*.**endAngle**([*angle*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L70)

如果指定了 *angle* 则将整个饼图的终止角度设置为指定的函数或数值并返回当前饼图生成器。如果没有指定 *angle* 则返回当前的终止角度访问器。默认为:

```js
function endAngle() {
  return 2 * Math.PI;
}
```

终止角度也就是整个饼图的结束角度，即最后一个扇区的终止角度。终止角度访问器会被调用一次病传递当前数据，其中 `this` 指向 [pie generator](https://d3js.org.cn/document/d3-shape/#_pie)，角度的单位是任意的，但是如果要将饼图生成器与弧生成器结合使用则应该以弧度指定，`12点钟` 方向为 `0` 度方向，并且顺时针为正。

终止角度可以被设置为 [startAngle](https://d3js.org.cn/document/d3-shape/#pie_startAngle) ± τ，这样就能保证 |endAngle - startAngle| ≤ τ.

[#](https://d3js.org.cn/document/d3-shape/#pie_padAngle) *pie*.**padAngle**([*angle*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/pie.js#L74)

如果指定了 *angle* 则将饼图扇形之间的间隔设置为指定的函数或数值，并返回当前饼图生成器。如果没有指定 *angle* 则返回当前默认的间隔角度访问器，默认为:

```js
function padAngle() {
  return 0;
}
```

这里的间隔角度也就是两个相邻的扇形之间的间隔。间隔角度的总和等于指定的角度乘以输入数据数组中的元素数量，最大为 |endAngle - startAngle|；然后，剩余的间隔按比例按比例分配，这样每个弧的相对面积就会被保留下来。参考 [pie padding animation](http://bl.ocks.org/mbostock/3e961b4c97a1b543fff2) 获取更详细的说明。间隔访问器只会被调用一次，并传递当前数据集，其中 `this` 上下文指向 [pie generator](https://d3js.org.cn/document/d3-shape/#_pie)。角度的单位是任意的，但是如果要将饼图生成器与弧生成器结合使用则应该以弧度指定。

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