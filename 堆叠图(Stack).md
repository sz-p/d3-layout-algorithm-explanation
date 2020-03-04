## 堆叠图(Stack)

![](https://img.sz-p.cn/d3Layout-stack.png)

该模块依赖`数据项(keys)`其提供了`原始数据数据(data)`中所需要堆积的数据项的条目。最终返回`布局信息`。堆积数据包含`原始数据数据(data)`中每一项的所占的起始值和结束值。详情见[基本数据](#基本数据),及`布局信息`。

### API

[#](https://d3js.org.cn/document/d3-shape/#stack) d3.**stack**() [<源码>](https://github.com/xswei/d3-shape/blob/master/src/stack.js)

使用默认的设置构造一个新的堆叠布局生成器。

[#](https://d3js.org.cn/document/d3-shape/#_stack) *stack*(*data*[, *arguments…*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/stack.js#L16)

根据指定的数据数组 *data* 生成一个堆叠布局，返回形式为序列数组。可以传递任意 *arguments*，它们会被直接传递给访问器。

返回的序列由 [keys accessor](https://d3js.org.cn/document/d3-shape/#stack_keys) 决定。每个序列 *i* 对应第 *i* 个 `key`。每个序列都是一组点数组，每个点 *j* 表示输入数据中的第 *j* 个元素。最后每个点都会被表示为一个数组 `[y0, y1]`, 其中 *y0* 表示这个点的下限值(基线)，*y1* 表示这个点的上限值(顶线); *y0* 和 *y1* 之间的差值对应当前点的计算 [value](https://d3js.org.cn/document/d3-shape/#stack_value)。每个系列的 `key` 与 *series*.key 对应, 并且 [index](https://d3js.org.cn/document/d3-shape/#stack_order) 等于 *series*.index. 每个点的输入数据元素对应 *point*.data.

例如，考虑如下的表示几种水果的月销售数据的表格:

| Month  | Apples | Bananas | Cherries | Dates |
| ------ | ------ | ------- | -------- | ----- |
| 1/2015 | 3840   | 1920    | 960      | 400   |
| 2/2015 | 1600   | 1440    | 960      | 400   |
| 3/2015 | 640    | 960     | 640      | 400   |
| 4/2015 | 320    | 480     | 640      | 400   |

在 `JavaScript` 中可以表示为对象：

```js
var data = [
  {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
  {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
  {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
  {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
];
```

使用这个数据创建一个堆叠布局:

```js
var stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

var series = stack(data);
```

返回的结果是一个包含每个 *series* 的数组。每个系列在每个月都对应一个数据点，每个点都有下限值和上限值用来表示基线和顶线:

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]], // dates
]
```

每个序列通常会被传递给 [area generator](https://d3js.org.cn/document/d3-shape/#areas) 来渲染出区域图，或者直接用来绘制条形图。

[#](https://d3js.org.cn/document/d3-shape/#stack_keys) *stack*.**keys**([*keys*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/stack.js#L40)

如果指定了 *keys* 则将 `keys` 访问器设置为指定的函数或数组，并返回当前堆叠布局生成器。如果没有指定 *keys* 则返回当前的 `keys` 访问器，默认为空数组。一个序列(一层) 对应一个 `key`。`keys` 通常是字符串，但是也可以是任意值。系列的 `key` 会被直接传递给 [value accessor](https://d3js.org.cn/document/d3-shape/#stack_value) 以计算每个数据点的值。

[#](https://d3js.org.cn/document/d3-shape/#stack_value) *stack*.**value**([*value*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/stack.js#L44)

如果指定了 *value* 则将值访问器设置为指定的函数或数值并返回当前堆叠布局生成器。如果没有指定则返回当前的值访问器，默认为:

```js
function value(d, key) {
  return d[key];
}
```

因此，默认情况下堆叠布局生成器假设输入数据是一个对象数组，每个对象都包含了一个值为数值类型的属性。参考 [*stack*](https://d3js.org.cn/document/d3-shape/#_stack)。

[#](https://d3js.org.cn/document/d3-shape/#stack_order) *stack*.**order**([*order*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/stack.js#L48)

如果指定了 *order* 则将顺序访问器设置为指定的函数或数组并返回当前堆叠布局生成器。如果没有指定 *order* 则返回当前顺序访问器默认为 [stackOrderNone](https://d3js.org.cn/document/d3-shape/#stackOrderNone)；也就是使用 [key accessor](https://d3js.org.cn/document/d3-shape/#stack_key) 指定的次序。参考 [stack orders](https://d3js.org.cn/document/d3-shape/#stack-orders) 获取内置顺序。

如果 *order* 为函数则会传递生成的系列数组，并且必须返回数组。例如默认的顺序访问器被定义为:

```js
function orderNone(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}
```

堆叠次序是在计算 [offset](https://d3js.org.cn/document/d3-shape/#stack_offset) 之前进行的，因此在计算次序时每个点的下限都为 `0`。每个序列的索引属性在计算完次序之后才会被设置。

[#](https://d3js.org.cn/document/d3-shape/#stack_offset) *stack*.**offset**([*offset*]) [<源码>](https://github.com/xswei/d3-shape/blob/master/src/stack.js#L52)

如果指定了 *offset* 则将偏移访问器设置为指定的函数或数组并返回当前堆叠布局。如果 *offset* 没有指定则返回当前的偏移访问器，默认为 [stackOffsetNone](https://d3js.org.cn/document/d3-shape/#stackOffsetNone); 默认会生成以 `0` 为基线的堆叠图，参考 [stack offsets](https://d3js.org.cn/document/d3-shape/#stack-offsets) 了解内置的偏移。

如果 *offset* 为函数，则会传递系列数组以及顺序索引。偏移函数负责计算更新每个数据点的上下限值。例如默认的偏移被定义为:

```js
function offsetNone(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (var j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = s0[j][1];
    }
  }
```

### 布局信息
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