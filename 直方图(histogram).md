## 直方图(Histogram)

![](https:/img.sz-p.cn/d3Layout-histogram.png)

直方图(Histogram)，又称质量分布图，是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。 一般用横轴表示数据类型，纵轴表示分布情况。

直方图是数值数据分布的精确图形表示。 这是一个连续变量（定量变量）的概率分布的估计，并且被卡尔·皮尔逊（Karl Pearson）首先引入。它是一种条形图。 为了构建直方图，第一步是将值的范围分段，即将整个值的范围分成一系列间隔，然后计算每个间隔中有多少值。 这些值通常被指定为连续的，不重叠的变量间隔。 间隔必须相邻，并且通常是（但不是必须的）相等的大小。

直方图也可以被归一化以显示“相对”频率。 然后，它显示了属于几个类别中的每个案例的比例，其高度等于1。

该模块依赖一个`区间(domain)`以及`阈值(threshold)`,统计`数据(data)`的分布情况,输出一个`分箱(bins)`每个`箱`划分了箱子的范围以及包含的值,区间限定了值的范围,通常为`数据(data)`值的范围,`阈值(threshold)`规定了每个箱子的范围。详情见[基本数据](#基本数据)。

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