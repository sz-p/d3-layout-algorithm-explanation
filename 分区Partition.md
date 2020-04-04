## 分区Partition

![](https://img.sz-p.cn/d3Layout-partition.png)

分区图，是[层级布局(Hierarchy)](./层级布局(Hierarchy).md)的一种

该模块依赖一个`层级布局(Hierarchy)`结果,和一个`画布区大小(size)`。输出一个`布局信息`,`布局信息`本质上是给`层级布局(Hierarchy)`写入了两个坐标，这两个坐标构成的区域即为该分区的可视化信息。详情见[基本数据](#基本数据)，及[布局信息](#布局信息)。

### API

[#](https://d3js.org.cn/document/d3-hierarchy/#partition) d3.**partition**()

使用默认的设置创建一个分区图布局。

[#](https://d3js.org.cn/document/d3-hierarchy/#_partition) *partition*(*root*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/partition.js#L10)

对指定的 *root* [hierarchy](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 进行布局，*root* 节点以及每个后代节点会被附加以下属性:

- *node*.x0 - 矩形的左边缘
- *node*.y0 - 矩形的上边缘
- *node*.x1 - 矩形的右边缘
- *node*.y1 - 矩形的下边缘

在将层次数据传递给 `treemap` 布局之前，必须调用 [*root*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum)。在计算布局之前还可能需要调用 [*root*.sort](https://d3js.org.cn/document/d3-hierarchy/#node_sort) 对节点进行排序。

[#](https://d3js.org.cn/document/d3-hierarchy/#partition_size) *partition*.**size**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/partition.js#L43)

如果指定了 *size* 则将当前的布局尺寸设置为指定的二元数值数组：[*width*, *height*]，并返回当前 `treemap` 布局。如果没有指定 *size* 则返回当前尺寸，默认为 [1, 1]。

[#](https://d3js.org.cn/document/d3-hierarchy/#partition_round) *partition*.**round**([*round*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/partition.js#L39)

如果指定了 *round* 则根据指定的布尔类型值启用或禁用四舍五入，并返回当前 `treemap` 布局。如果 *round* 没有指定则返回当前 `rounding` 状态，默认为 `false`。

[#](https://d3js.org.cn/document/d3-hierarchy/#partition_padding) *partition*.**padding**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/partition.js#L47)

如果指定了 *padding* 则设将当前分区布局的间隔设置为指定的数值或函数，并返回当前 `partition` 布局。如果没有指定 *padding* 则返回当前的间隔，默认为 `0`。间隔用于分离节点的相邻子节点。

### 布局信息
其中`x0,y0`,`x1,y1`两个坐标点构成了一个区域。这个区域即为`分区数据(Partition)`的可视化信息。

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
    y1:300,
    children: [
        {
            data:{name:'浙江',...NodeData.children[0]}
            parent: Hierarchy,
            value: 100,
            x0:0,
            x1:100,
            y0:300,
            y1:600,
        },
        {
            data:{name:'广西',...NodeData.children[1]}
            parent: Hierarchy,
            value: 300,
            x0:100,
            x1:300,
            y0:300,
            y1:600,
        }
    ]
}
```

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

### 执行逻辑

1. 根据**分区数据(Partition)**的深度将画布高度均分，每一层节点所占的高度为`画布的高度/节点的总深度`
2. 根据给出的**画布区大小(size)**给根节点写入`x0,y0 x1,y1`。根节点的宽度即为画布的宽度，高度即为画布的高度/**分区数据(Partition)**的深度。
3. 将父节点的`x0,y0 x1,y1`传入子节点
4. 子节点根据父节点的`x0,y0 x1,y1`数据，和自身value值计算每一个子节点的高度和宽度
   根据当前节点的深度和每层节点的高度写入`y0 y1`数据
   根据当前节点的value值和父节点的value值的比例计算出当前节点的`x0 x1`

### 核心代码
```javascript
// 写入size信息

var dx = 1,
    dy = 1,
    padding = 0,
    round = false;

partition.size = function (x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
};

function partition(root) {
    var n = root.height + 1;
    // 根据 给出的size信息 将可视化信息写入层级布局(Hierarchy)的根节点
    // x1 y1 都是 0 或给出的padding
    root.x0 =
    root.y0 = padding;
    // 根节点的宽度为整个图表的宽度
    root.x1 = dx;
    // 高度为整个图表的高度除以树的深度
    root.y1 = dy / n;
    // 这里对节点做了一个层次遍历
    root.eachBefore(positionNode(dy, n));
    
    // 如果必要的话 会对所有的节点坐标做一个 四舍五入的处理
    if (round) root.eachBefore(roundNode);
    return root;
}

function positionNode(dy, n) {
    // 层次遍历的回调函数 对节点进行布局
    return function(node) {
        // 首先访问的是根节点,partition中已经写入了 根节点的 x0 y0 x1 y1数据
        if (node.children) {
            // 对子节点的分区(Partition)数据进行写入
            treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
        }
    
        // 这里对每个区块的padding做了处理 
        var x0 = node.x0,
            y0 = node.y0,
            x1 = node.x1 - padding,
            y1 = node.y1 - padding;
        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
        node.x0 = x0;
        node.y0 = y0;
        node.x1 = x1;
        node.y1 = y1;
    };
}
/**
 *
 *
 * @param {*} parent 父节点
 * @param {*} x0 所有子节点开始的x0
 * @param {*} y0 子节点的y0
 * @param {*} x1 所有子节点结束的x1
 * @param {*} y1 子节点的y1
 */
function treemapDice(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      // 这里拿到了当前节点value值为1是所占的宽度
      k = parent.value && (x1 - x0) / parent.value;

  while (++i < n) {
    // 先将原始Node数据赋给节点
    // y0 y1 直接赋值
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    // 这里写的比较抽象 就是先给出x0 然后根据当前value值计算当前节点的宽度
    // 然后将这个值赋给下一个节点的x0 依次遍历这个列表
    node.x0 = x0, node.x1 = x0 += node.value * k;
  }
}
```

## 参考 & 引用
https://blog.csdn.net/dkr380205984/article/details/81668378
