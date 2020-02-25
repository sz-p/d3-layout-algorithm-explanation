## 树(Tree)

![](https://img.sz-p.cn/d3Layout-cluster.png)

### API

[#](https://d3js.org.cn/document/d3-hierarchy/#tree) d3.**tree**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/tree.js)

使用默认的设置创建一个新的树布局。

[#](https://d3js.org.cn/document/d3-hierarchy/#_tree) *tree*(*root*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/tree.js#L106)

对指定的 *root* [hierarchy](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 进行布局，并为 *root* 以及它的每一个后代附加两个属性:

- *node*.x - 节点的 *x*- 坐标
- *node*.y - 节点的 *y*- 坐标

节点的 *x* 和 *y* 坐标可以是任意的坐标系统；例如你可以将 *x* 视为角度而将 *y* 视为半径来生成一个 [radial layout(径向布局)](http://bl.ocks.org/mbostock/2e12b0bd732e7fe4000e2d11ecab0268)。你也可以在布局之前使用 [*root*.sort](https://d3js.org.cn/document/d3-hierarchy/#node_sort) 进行排序操作。

[#](https://d3js.org.cn/document/d3-hierarchy/#tree_size) *tree*.**size**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/tree.js#L228)

如果指定了 *size* 则设置当前系统树布局的尺寸为一个指定的二元数值类型数组，表示 [*width*, *height*] 并返回当前树布局。如果 *size* 没有指定则返回当前系统树布局的尺寸，默认为 [1, 1]。如果返回的布局尺寸为 `null` 时则表示实际的尺寸根据 [node size](https://d3js.org.cn/document/d3-hierarchy/#tree_nodeSize) 确定。坐标 *x* 和 *y* 可以是任意的坐标系统；例如如果要生成一个 [radial layout(径向布局)](http://bl.ocks.org/mbostock/2e12b0bd732e7fe4000e2d11ecab0268) 则可以将其设置为 [360, *radius*] 用以表示角度范围为 `360°` 并且半径范围为 *radius*。

[#](https://d3js.org.cn/document/d3-hierarchy/#tree_nodeSize) *tree*.**nodeSize**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/tree.js#L232)

如果指定了 *size* 则设置系统树布局的节点尺寸为指定的数值二元数组，表示为 [*width*, *height*] 并返回当前树布局。如果没有指定 *size* 则返回当前节点尺寸，默认为 `null`。如果返回的尺寸为 `null` 则表示使用 [layout size](https://d3js.org.cn/document/d3-hierarchy/#tree_size) 来自动计算节点大小。当指定了节点尺寸时，根节点的位置总是位于 ⟨0, 0⟩。

[#](https://d3js.org.cn/document/d3-hierarchy/#tree_separation) *tree*.**separation**([*separation*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/tree.js#L224)

如果指定了 *seperation*, 则设置间隔访问器为指定的函数并返回当前树布局。如果没有指定 *seperation* 则返回当前的间隔访问器，默认为:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

一种更适合于径向布局的变体，可以按比例缩小半径差距:

```js
function separation(a, b) {
  return (a.parent == b.parent ? 1 : 2) / a.depth;
}
```

间隔访问器用来设置相邻的两个节点之间的间隔。指定的间隔访问器会传递两个节点 *a* 和 *b*，并且必须返回一个期望的间隔值。这些节点通常是兄弟节点，如果布局将两个节点放置到相邻的位置，则可以通过配置间隔访问器设置相邻节点之间的间隔控制其期望的距离。

### 布局信息
### 基本数据
### 执行逻辑
### 核心代码

## 参考 & 引用
