## 直方图(Histogram)

![](https://img.sz-p.cn/d3Layout-histogram.png)

直方图(Histogram)，又称质量分布图，是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。 一般用横轴表示数据类型，纵轴表示分布情况。

直方图是数值数据分布的精确图形表示。 这是一个连续变量（定量变量）的概率分布的估计，并且被卡尔·皮尔逊（Karl Pearson）首先引入。它是一种条形图。 为了构建直方图，第一步是将值的范围分段，即将整个值的范围分成一系列间隔，然后计算每个间隔中有多少值。 这些值通常被指定为连续的，不重叠的变量间隔。 间隔必须相邻，并且通常是（但不是必须的）相等的大小。

直方图也可以被归一化以显示“相对”频率。 然后，它显示了属于几个类别中的每个案例的比例，其高度等于1。

该模块依赖一个`区间(domain)`以及`阈值(threshold)`,统计`数据(data)`的分布情况,输出一个`分箱(bins)`每个`箱`划分了箱子的范围以及包含的值,区间限定了值的范围,通常为`数据(data)`值的范围,`阈值(threshold)`规定了每个箱子的范围。详情见[基本数据](#基本数据)。

### API

[#](https://d3js.org.cn/document/d3-array/#histogram) d3.**histogram**() [<源码>](https://github.com/d3/d3-array/blob/master/src/histogram.js)

使用默认的设置构建一个新的直方图生成器.

[#](https://d3js.org.cn/document/d3-array/#_histogram) *histogram*(*data*) [<源码>](https://github.com/d3/d3-array/blob/master/src/histogram.js#L14)

根据指定的 *data* 样本计算直方图. 返回一个 *bins* (分箱)数组, 每个分箱都是一个包含一组来自 *data* 的数据的数组. 分箱的 `length` 属性用来表示当前分箱中包含输入数据的个数, 每个分箱还包含两个f附加属性:

- `x0` - 当前分箱的最小值(包含).
- `x1` - 当前分箱的最大值(不包含, 除非是最后一个分箱).

[#](https://d3js.org.cn/document/d3-array/#histogram_value) *histogram*.**value**([*value*]) [<源码>](https://github.com/d3/d3-array/blob/master/src/histogram.js#L58)

如果指定了 *value* 则表示设置值访问器为指定的函数并返回当前的直方图生成器. 如果没有指定 *value* 则返回当前的值访问器, 默认为一个恒等函数(返回元素自身).

当直方图被 [generated](https://d3js.org.cn/document/d3-array/#_histogram) 时, 值访问器会在输入数据的每个元素上一次调用, 并传递当前的元素 `d`, 索引 `i` 以及原始输入数据 `data`. 默认情况下直方图假设输入数据是可排序的(可比较的), 比如数值或时间, 当输入数据中的元素不可比较时应该制定访问器并返回一个可比较的值.

这类似于在对数据进行分组前将原数据映射到一个值, 但是能将输入数据与返回的分箱进行关联从而方便的根据数据的其他字段生成直方图.

[#](https://d3js.org.cn/document/d3-array/#histogram_domain) *histogram*.**domain**([*domain*]) [<源码>](https://github.com/d3/d3-array/blob/master/src/histogram.js#L62)

如果指定了 *domain* 则设置当前直方图生成器的输入区间为指定的 *domain* 并返回直方图生成器. 如果没有指定 *domain* 则返回当前的输入区间, 默认为 [extent](https://d3js.org.cn/document/d3-array/#extent). 直方图的输入区间由数组 [*min*, *max*] 定义. *min* 表示直方图生成器可以读取的最小值, *max* 表示直方图生成器可以读取到的最大值. 任何不属于 [*min*, *max*] 的值将会被忽略.

例如, 如果结合 [linear scale](https://github.com/d3/d3-scale/blob/master/README.md#linear-scales) `x` 来生成直方图时, 可以如下定义:

```js
var histogram = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(20));
```

然后通过如下方法获取分箱:

```js
var bins = histogram(numbers);
```

输入区间访问器会在经过计算之后的 [values](https://d3js.org.cn/document/d3-array/#histogram_value) 上进行评估筛选, 而不是原始的输入数据.

[#](https://d3js.org.cn/document/d3-array/#histogram_thresholds) *histogram*.**thresholds**([*count*]) [<源码>](https://github.com/d3/d3-array/blob/master/src/histogram.js#L66)
[#](https://d3js.org.cn/document/d3-array/#histogram_thresholds) *histogram*.**thresholds**([*thresholds*]) [<源码>](https://github.com/d3/d3-array/blob/master/src/histogram.js#L66)

如果指定了 *thresholds* 则将 [threshold generator(阈值生成器)](https://d3js.org.cn/document/d3-array/#histogram-thresholds) 设置为指定的函数或数组并返回当前的直方图生成器. 如果没有指定 *thresholds* 则返回当前的阈值生成器, 默认的阈值生成器参考 [Sturges’ formula](https://d3js.org.cn/document/d3-array/#thresholdSturges) 实现(因此, 默认情况下, 直方图的输入数据必须为数值). 阈值由一组数组定义: [*x0*, *x1*, …]. 小于 *x0* 的值放在第一个分箱中, 小于 *x1* 并且大于等于 *x0* 的放在第二个分箱中, 以此类推. 因此最后的分箱个数等于 *thresholds*.length + 1. 参考 [histogram thresholds](https://d3js.org.cn/document/d3-array/#histogram-thresholds) 获取更多信息.

任何在 [domain](https://d3js.org.cn/document/d3-array/#histogram_domain) 之外的值将会被忽略. 第一个分箱的 *bin*.x0 属性总是等于最小的 *domain* 值, 最后一个分箱的 *bin*.x1 属性总是等于 *domain* 的最大值.

如果指定了 *count* 则表示使用 *count* 代替 *thresholds* 数组, [domain](https://d3js.org.cn/document/d3-array/#histogram_domain) 将会被设置成近似的计数区间, 参考 [ticks](https://d3js.org.cn/document/d3-array/#ticks).

### 基本数据

区间(domain)

```javascript
[0, 1]
```

阈值(threshold)

```javascript
[0, 0.5, 1]
```

数据(data)
```javascript
[0, 0.1, 0.2, 0.15, 0.5, 1]
```

分箱(bins)
```javascript
[
    [x0: 0, x1: 0.5, 0, 0.1, 0.2, 0.2, 0.15, 0.5],
    [x0: 0.5, x1: 1, 1],
]
```

### 执行逻辑
核心逻辑分为了两步
1. 根据给出的 `阈值(threshold)` 初始化 箱子的个数以及各箱子的范围
2. 将`数据(data)`中的值写入 对应的箱子中。核心算法是[二分法](https://sz-p.cn/blog/index.php/2020/02/07/277.html)

### 核心代码
```javascript
/**
 * 本质上是个二分法 确定当前值属于 区间范围中的哪一个的算法
 * @param {*} a 区间范围
 * @param {*} x 当前值
 * @param {*} lo 最小值
 * @param {*} hi 最大值
 * @return 第几个区间内 
 */
bisect(a, x, lo, hi){
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// 初始化分箱的长度，初始化每个箱子的范围
for (i = 0; i <= m; ++i) {
    bin = bins[i] = [];
    bin.x0 = i > 0 ? tz[i - 1] : x0;
    bin.x1 = i < m ? tz[i] : x1;
}

// 给每个箱子赋值 
for (i = 0; i < n; ++i) {
    x = values[i];
    if (x0 <= x && x <= x1) {
        bins[bisect(tz, x, 0, m)].push(data[i]);
    }
}
```

## 参考 & 引用
https://baike.baidu.com/item/%E7%9B%B4%E6%96%B9%E5%9B%BE/1103834?fr=aladdin
https://blog.mn886.net/chenjianhua/show/773c07b3abce/index.html
https://github.com/xswei/d3-array/blob/master/README.md#histogram