## 矩阵树(Treemap)

![](https://img.sz-p.cn/d3Layout-treemap.png)

矩阵树,是[层级布局(Hierarchy)](https://sz-p.cn/blog/index.php/2019/07/08/207.html)的一种

该模块依赖一个[层级布局(Hierarchy)](./层级布局(Hierarchy).md)结果,和一个`画布区大小(size)`。输出一个`矩阵树数据(Treemap)`,`矩阵树数据(Treemap)`本质上是给`层级布局(Hierarchy)`写入了两个坐标，这两个坐标构成的区域即为该分区的可视化信息。详情见[基本数据](#基本数据)。

### API

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap) d3.**treemap**()

使用默认的配置创建一个新的 `treemap` 布局。

[#](https://d3js.org.cn/document/d3-hierarchy/#_treemap) *treemap*(*root*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L18)

对指定的 *root* [hierarchy](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 进行布局，为 *root* 以及每个后代节点附加以下属性:

- *node*.x0 - 矩形的左边缘
- *node*.y0 - 矩形的上边缘
- *node*.x1 - 矩形的右边缘
- *node*.y1 - 矩形的下边缘

在将层次数据传递给 `treemap` 布局之前，必须调用 [*root*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum)。在计算布局之前还可能需要调用 [*root*.sort](https://d3js.org.cn/document/d3-hierarchy/#node_sort) 对节点进行排序。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_tile) *treemap*.**tile**([*tile*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L61)

如果指定了 *tile* 则设置 [tiling method](https://d3js.org.cn/document/d3-hierarchy/#treemap-tiling) 为指定的函数并返回当前 `treemap` 布局。如果没有指定 *tile* 则返回当前铺设方法，默认为 [d3.treemapSquarify](https://d3js.org.cn/document/d3-hierarchy/#treemapSquarify)，也就是切分的矩形的长宽比遵循黄金比例。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_size) *treemap*.**size**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L57)

如果指定了 *size* 则将当前的布局尺寸设置为指定的二元数值数组：[*width*, *height*]，并返回当前 `treemap` 布局。如果没有指定 *size* 则返回当前尺寸，默认为 [1, 1]。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_round) *treemap*.**round**([*round*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L53)

如果指定了 *round* 则根据指定的布尔类型值启用或禁用四舍五入，并返回当前 `treemap` 布局。如果 *round* 没有指定则返回当前 `rounding` 状态，默认为 `false`。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_padding) *treemap*.**padding**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L65)

如果指定了 *padding* 则同时设置 [inner](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingInner) 和 [outer](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingOuter) 间隔为指定的数值或函数，并返回当前 `treemap` 布局。如果没有指定 *padding* 则返回当前的 `inner` 间隔函数。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingInner) *treemap*.**paddingInner**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L69)

如果指定了 *padding* 则将当前 `inner` 间隔设置为指定的数值或函数并返回当前的 `treemap` 布局。如果 *padding* 没有指定则返回当前 `inner` 间隔函数，默认为常数 `0`。如果 `padding` 为函数则会为每个包含子节点的节点调用并传递当前节点。`inner` 间隔用来设置节点相邻两个子节点之间的间隔。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingOuter) *treemap*.**paddingOuter**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L73)

如果指定了 *padding* 则将 [top](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingTop), [right](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingRight), [bottom](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingBottom) 和 [left](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingLeft) 间隔设置为指定的数值或函数，并返回当前 `treemap` 布局，如果没有指定 *padding* 则返回当前 `top` 间隔函数。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingTop) *treemap*.**paddingTop**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L77)

如果指定了 *padding* 则将 `top` 间隔设置为指定的数值或函数并返回当前 `treemap` 布局。如果没有指定 `padding` 则返回当前 `top` 间隔函数，默认为常量 `0`。如果 `padding` 为会为每个包含子节点的节点调用并传递当前节点。`top` 间隔用来将节点的顶部边缘与其子节点分开。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingRight) *treemap*.**paddingRight**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L81)

如果指定了 *padding* 则将 `right` 间隔设置为指定的数值或函数并返回当前 `treemap` 布局。如果没有指定 `padding` 则返回当前 `right` 间隔函数，默认为常量 `0`。如果 `padding` 为会为每个包含子节点的节点调用并传递当前节点。`right` 间隔用来将节点的右侧边缘与其子节点分开。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingBottom) *treemap*.**paddingBottom**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L85)

如果指定了 *padding* 则将 `bottom` 间隔设置为指定的数值或函数并返回当前 `treemap` 布局。如果没有指定 `padding` 则返回当前 `bottom` 间隔函数，默认为常量 `0`。如果 `padding` 为会为每个包含子节点的节点调用并传递当前节点。`bottom` 间隔用来将节点的下侧边缘与其子节点分开。

[#](https://d3js.org.cn/document/d3-hierarchy/#treemap_paddingLeft) *treemap*.**paddingLeft**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/index.js#L89)

如果指定了 *padding* 则将 `left` 间隔设置为指定的数值或函数并返回当前 `treemap` 布局。如果没有指定 `padding` 则返回当前 `left` 间隔函数，默认为常量 `0`。如果 `padding` 为会为每个包含子节点的节点调用并传递当前节点。`left` 间隔用来将节点的左侧边缘与其子节点分开。

### 基本数据

**画布区大小(size)**
```javascript
[400,600]
```

**节点数据(NodeData)**

```javascript
{
    'name': '中国',
    'value': '950',
    'children': [
      {
        'name': '浙江',
        'value': '450'
      },
      {
        'name': '广西',
        'value': '200'
      }
    ]
}
```

**层级布局(Hierarchy)**结果

```javascript
{
    data:{name:'中国',...NodeData}
    height: 2,
    depth: 0,
    parent: null,
    value: 400,
    children: [
        {
            data:{name:'浙江',...NodeData.children[0]}
            parent: Hierarchy,
            value: 100
        },
        {
            data:{name:'广西',...NodeData.children[1]}
            parent: Hierarchy,
            value: 300
        }
    ]
}
```

**长宽比**
```javascript
ratio = (1 + Math.sqrt(5)) / 2
```

**矩阵树(Treemap)**
其中`x0,y0`,`x1,y1`两个坐标点构成了一个区域。这个区域即为`矩阵树(Treemap)`的可视化信息。

```javascript
{
    data:{name:'中国',...NodeData}
    height: 2,
    depth: 0,
    parent: null,
    value: 400,
    x0:0,
    x1:400,
    y0:0,
    y1:600,
    children: [
        {
            data:{name:'浙江',...NodeData.children[0]}
            parent: Hierarchy,
            value: 100,
            x0:0,
            x1:100,
            y0:0,
            y1:600,
        },
        {
            data:{name:'广西',...NodeData.children[1]}
            parent: Hierarchy,
            value: 300,
            x0:100,
            x1:400,
            y0:0,
            y1:600,
        }
    ]
}
```

### 算法简介

`Squarified`算法使得矩形尽量接近正方形，拥有更好的平均长宽比。

D3使用的是最基础的没有对数据集进行倒序处理的`Squarified`算法，默认的长宽比是黄金比例`(sqrt(5) + 1) / 2`。[源码](https://github.com/d3/d3-hierarchy/blob/master/src/treemap/squarify.js)对比示例图在数据集无序和有序的情况下的分割，可以看出数据集的顺序对矩形树图的产生有较大影响，有序的数据集具有更好的长宽比。如果对数据的顺序没有要求的话，建议先对数据集进行排序处理。


### 执行逻辑

**画布区大小(size)**即当前节点的大小。
这里以顶层为例 给出了对`一层`层级数据的布局逻辑。每深入一层即更新当前节点的**画布区大小(size)**重复执行该逻辑

1. 根据给出的**画布区大小(size)**确定长宽比，如果长度大于宽度优先进行`行布局`，如果宽度大于长度优先进行`列布局`。即**按照沿最短边优先开始**。如果进行`行布局`即已经确定该行的宽度即为画布区的宽度，如果进行`列布局`即已经确定该列的高度即为画布区的高度。
2. 根据**长宽比**确定一个`单元`(行或列)的最大范围。如果是行即确定当前行的行高，如果是列即确定该列的列宽。
3. 向该`单元`压入数据，如果是`行布局`即该单元的宽度已经确定，如果是进行`列布局`当前列的高度已经确定。每压入一次数据就可以计算一次该`单元`的长宽比如果超出给出的**长宽比**即停止向当前`单元`压入数据。
4. 确定该`单元`的子节点的和，作为当前`单元`的值。根据子节点的值和当前`单元`的值对子节点进行相应的布局
5. 由于步骤2中创建了一个`单元`占用了一定的空间。重新确定当前空白区域的开始坐标。更新画布区的坐标。
6. 重复步骤1

### 核心代码
```javascript
  function treemap(root) {
    // 根据 给出的size信息 将可视化信息写入矩阵树(Treemap)的根节点
    root.x0 =
    root.y0 = 0;
    // 根节点的宽度为整个图表的宽度
    root.x1 = dx;
    // 根节点的高度为整个图表的高度
    root.y1 = dy;

    // 这里对节点做了一个层次遍历
    root.eachBefore(positionNode);
    paddingStack = [0];
    // 如果必要的话 会对所有的节点坐标做一个 四舍五入的处理
    if (round) root.eachBefore(roundNode);
    return root;
  }

  // 层次遍历的回调函数 对节点进行布局
  function positionNode(node) {
    // 这里对每个区块的padding做了处理 
    var p = paddingStack[node.depth],
        x0 = node.x0 + p,
        y0 = node.y0 + p,
        x1 = node.x1 - p,
        y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    // 这对开始对当前节点的子节点进行布局
    if (node.children) {
      // 还是对节点的padding的处理
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      // 传入父节点的布局信息对子节点进行布局
      tile(node, x0, y0, x1, y1);
    }
  }
  // 以d3默认的treemapSquarify算法为例，其他的还包括treemapBinary、treemapDice、treemapSlice、treemapSliceDice、treemapResquarify。
  function tile(parent, x0, y0, x1, y1,ratio = (1 + Math.sqrt(5)) / 2) {
    var rows = [],
        nodes = parent.children, //当前节点的子节点列表
        row,
        nodeValue,
        i0 = 0,
        i1 = 0,
        n = nodes.length,
        dx, dy,                  // 当前节点的 高度差 与 宽度差
        value = parent.value,    // 父节点的值大小
        sumValue,                // 当前行或列的总值的大小
        minValue,
        maxValue,
        newRatio,
        minRatio,
        alpha,
        beta;
    // 根据当前节点的信息 对 当前节点的子节点进行布局
    while (i0 < n) {
      // 当前节点的 高度差 与 宽度差
      dx = x1 - x0, dy = y1 - y0;
 
      // 找到下一个非空的值
      do sumValue = nodes[i1++].value; while (!sumValue && i1 < n);
      minValue = maxValue = sumValue;
      alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
      beta = sumValue * sumValue * alpha;
      minRatio = Math.max(maxValue / beta, beta / minValue);
 
      // 在纵横比保持或提高时继续添加节点。
      for (; i1 < n; ++i1) {
        // 这里持续对当前单元压入数据
        sumValue += nodeValue = nodes[i1].value;
        if (nodeValue < minValue) minValue = nodeValue;
        if (nodeValue > maxValue) maxValue = nodeValue;
        beta = sumValue * sumValue * alpha;
        newRatio = Math.max(maxValue / beta, beta / minValue);
        // 判断当前单元超出给出的长宽比时停止压入数据。
        if (newRatio > minRatio) { sumValue -= nodeValue; break; }
        minRatio = newRatio;
      }
 
      // 定位并记录行方向。 dice来记录方向 按照沿最短边优先开始
      // 这里拿到了 一行 或者一列 数据 i0 表示数据的起始下标 i1表示结束
      rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});

      // 这里根据 方向 对当前节点的坐标做了计算
      // x1 和 y1 即 当前节点的终止点不会变
      // x0 和 y0 即 当前节点子节点的开始坐标在发生变化
      if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
      else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
      value -= sumValue, i0 = i1;
    }
    return rows;
 }
 
  // 对一行数据进行行布局 进行行布局时确定行的高度
  // 传入的数据为当前行的节点信息parent 以及当前行的开始结束坐标
  // 由于是 沿最短边优先开始 每次布局一行或一列 所以结束坐标不会变化 变化的仅为开始坐标
  function treemapSlice(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
        node,
        i = -1,
        n = nodes.length,
        // 拿到了值为1是占当前行的比例
        k = parent.value && (y1 - y0) / parent.value;

    while (++i < n) {
      node = nodes[i], node.x0 = x0, node.x1 = x1;
      // 根据比例 和 当前节点的值 进行横向布局
      node.y0 = y0, node.y1 = y0 += node.value * k;
    }
  }

  // 对一列数据进行列布局 进行行布局时确定列的宽度
  function treemapDice(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
        node,
        i = -1,
        n = nodes.length,
        // 拿到了值为1是占当前列的比例
        k = parent.value && (x1 - x0) / parent.value;

    while (++i < n) {
      node = nodes[i], node.y0 = y0, node.y1 = y1;
      // 根据比例 和 当前节点的值 进行纵向布局
      node.x0 = x0, node.x1 = x0 += node.value * k;
    }
  }


```

## 参考 & 引用
https://blog.csdn.net/dkr380205984/article/details/81704687
https://zhuanlan.zhihu.com/p/57873460