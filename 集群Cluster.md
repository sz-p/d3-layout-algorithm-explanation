## 集群Cluster

![](https://img.sz-p.cn/d3Layout-Cluster.png)

集群,是[层级布局(Hierarchy)](https://sz-p.cn/blog/index.php/2019/07/08/207.html)的一种

该模块依赖一个[层级布局(Hierarchy)](./层级布局(Hierarchy).md)结果,和一个`画布区大小(size)`。将层级布局数据中的节点赋予`x`和`y`坐标。集群图从叶子节点开始，自底向上，每一层节点对齐。

### API

[#](https://d3js.org.cn/document/d3-hierarchy/#cluster) d3.**cluster**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/cluster.js)

使用默认的配置创建一个新的系统树布局.

[#](https://d3js.org.cn/document/d3-hierarchy/#_cluster) *cluster*(*root*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/cluster.js#L39)

对指定的 *root* [hierarchy](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 进行布局，并为 *root* 以及它的每一个后代附加两个属性:

- *node*.x - 节点的 *x*- 坐标
- *node*.y - 节点的 *y*- 坐标

节点的 *x* 和 *y* 坐标可以是任意的坐标系统；例如你可以将 *x* 视为角度而将 *y* 视为半径来生成一个 [radial layout(径向布局)](http://bl.ocks.org/mbostock/4739610f6d96aaad2fb1e78a72b385ab)。你也可以在布局之前使用 [*root*.sort](https://d3js.org.cn/document/d3-hierarchy/#node_sort) 进行排序操作。

[#](https://d3js.org.cn/document/d3-hierarchy/#cluster_size) *cluster*.**size**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/cluster.js#L75)

如果指定了 *size* 则设置当前系统树布局的尺寸为一个指定的二元数值类型数组，表示 [*width*, *height*] 并返回当前系统树布局。如果 *size* 没有指定则返回当前系统树布局的尺寸，默认为 [1, 1]。如果返回的布局尺寸为 `null` 时则表示实际的尺寸根据 [node size](https://d3js.org.cn/document/d3-hierarchy/#cluster_nodeSize) 确定。坐标 *x* 和 *y* 可以是任意的坐标系统；例如如果要生成一个 [radial layout(径向布局)](http://bl.ocks.org/mbostock/4739610f6d96aaad2fb1e78a72b385ab) 则可以将其设置为 [360, *radius*] 用以表示角度范围为 `360°` 并且半径范围为 *radius*。

[#](https://d3js.org.cn/document/d3-hierarchy/#cluster_nodeSize) *cluster*.**nodeSize**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/cluster.js#L79)

如果指定了 *size* 则设置系统树布局的节点尺寸为指定的数值二元数组，表示为 [*width*, *height*] 并返回当前系统树布局。如果没有指定 *size* 则返回当前节点尺寸，默认为 `null`。如果返回的尺寸为 `null` 则表示使用 [layout size](https://d3js.org.cn/document/d3-hierarchy/#cluster_size) 来自动计算节点大小。当指定了节点尺寸时，根节点的位置总是位于 ⟨0, 0⟩。

[#](https://d3js.org.cn/document/d3-hierarchy/#cluster_separation) *cluster*.**separation**([*separation*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/cluster.js#L71)

如果指定了 *seperation*, 则设置间隔访问器为指定的函数并返回当前系统树布局。如果没有指定 *seperation* 则返回当前的间隔访问器，默认为:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

间隔访问器用来设置相邻的两个叶节点之间的间隔。指定的间隔访问器会传递两个叶节点 *a* 和 *b*，并且必须返回一个期望的间隔值。这些节点通常是兄弟节点，如果布局将两个节点放置到相邻的位置，则可以通过配置间隔访问器设置相邻节点之间的间隔控制其期望的距离。

### 布局信息

`x`:节点中心的 x- 坐标
`y`:节点中心的 y- 坐标
`parent`,`children`分别代表当前节点的父节点和子节点

```javascript
const nodes = [
  {
    data: {name: "中国", value: "950", children: Array(4)},
    height: 3,
    depth: 0,
    parent: null,
    value: 950,
    children: (4) [Node, Node, Node, Node],
    x: 208.33333333333334,
    y: 0,
  }
]
```

### 基本数据

**画布区大小(size)**

```javascript
[400,600]
```

### 执行逻辑

1. 对节点树进行**后续遍历**，并维护上一个叶子节点信息
2. 初始化第一个叶子节点数据横纵坐标均为0
3. 对叶子节点进行计数，同一个父节点的叶子节点间隔为1，不同父节点的叶子节点间隔为2，对叶子节点和横坐标进行累加，纵坐标均为0
4. **对子节点的横坐标求平均值得到本节点的横坐标，对子节点的纵坐标的最大值+1得到本节点的纵坐标**
5. 重复步骤4 直至计算完毕整个树的相对坐标
6. 获取节点树的轮廓信息，即x_min, x_max, y_min, y_max
7. 对节点树进行**第二次后序遍历**
8. 将表示本节点相对位置的的x,y坐标映射到画布区

### 核心代码

```javascript
export default function() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = false;

  function cluster(root) {
    var previousNode,
        x = 0;

    // 第一步 计算初始的 x 和 y 坐标 
    // 这时的 xy仅 表示相对位置
    // 这里对树进行后续遍历 即 先访问所有的子节点再访问该节点。
    root.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        // 叶子节点 x 坐标 根据当前叶子节点的排序 递增确定 相同父节点+1 不同父节点+2
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        // 叶子节点 y 坐标统一为 0
        node.y = 0;
        // 这里维护了变量表示上一个 子节点
        previousNode = node;
      }
    });
      
    // 这里拿到了 最左侧，最右侧的节点的x坐标
    var left = leafLeft(root),
        right = leafRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;
    
    // 第二次遍历 将表示相对位置的x,y坐标映射到画布区
    return root.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root.x) * dx;
      node.y = (root.y - node.y) * dy;
    } : function(node) {
      // 这里对横坐标做了一个简单的线性映射
      node.x = (node.x - x0) / (x1 - x0) * dx;
      // 同样这里对纵坐标做了一个线性映射
      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
    });
  }
// 返回 a b 两个节点的间距，如果是同一个父节点，两节点间距为1 否则为2
function separation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// 父节点的 x值 取 子节点的 x值的 平均值
function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}
    
// 父节点的 y值 取 子节点的 最大的y值的 +1
function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}
```



## 参考 & 引用

https://blog.csdn.net/selina_chan/article/details/51260516

https://d3js.org.cn/document/d3-hierarchy/#cluster