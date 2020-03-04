## 层级布局(Hierarchy)
一个好的层次结构可视化能促进快速的促进多尺度推理: 对单个单元的微观观察和对整体的宏观观察.

许多数据集从从本质上是嵌套结构的。例如一个[族谱结构](#族谱结构)。

该模块依赖一个`族谱结构`，将族谱结构的的数据按照层级结构进行格式化，最终生成`布局信息`。详情见[基本数据](#基本数据)，[布局信息](#布局信息)。

### API
在计算层次布局之前，你需要一个根节点。如果你的数据已经是层次结构，比如 `JSON`。你可以直接将其传递给 [d3.hierarchy](https://d3js.org.cn/document/d3-hierarchy/#hierarchy); 此外，你可以重新排列扁平数据，比如将 `CSV` 使用 [d3.stratify](https://d3js.org.cn/document/d3-hierarchy/#stratify) 重组为层次结构数据。

[#](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) d3.**hierarchy**(*data*[, *children*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/index.js#L12)

根据指定的层次结构数据构造一个根节点。指定的数据 *data* 必须为一个表示根节点的对象。比如:

```json
{
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
}
```

指定的 *children* 访问器会为每个数据进行调用，从根 *data* 开始，并且必须返回一个数组用以表示当前数据的子节点，返回 `null` 表示当前数据没有子节点。如果没有指定 *children* 则默认为:

```js
function children(d) {
  return d.children;
}
```

返回的节点和每一个后代会被附加如下属性:

- *node*.data - 关联的数据，由 [constructor](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 指定.
- *node*.depth - 当前节点的深度, 根节点为 `0`.
- *node*.height - 当前节点的高度, 叶节点为 `0`.
- *node*.parent - 当前节点的父节点, 根节点为 `null`.
- *node*.children - 当前节点的孩子节点(如果有的话); 叶节点为 `undefined`.
- *node*.value - 当前节点以及 [descendants](https://d3js.org.cn/document/d3-hierarchy/#node_descendants)(后代节点) 的总计值; 可以通过 [*node*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum) 和 [*node*.count](https://d3js.org.cn/document/d3-hierarchy/#node_count) 计算.

这个方法也可以用来测试一个节点是否是 `instanceof d3.hierarchy` 并且可以用来扩展节点原型链。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_ancestors) *node*.**ancestors**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/ancestors.js)

返回祖先节点数组，第一个节点为自身，然后依次为从自身到根节点的所有节点。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_descendants) *node*.**descendants**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/descendants.js)

返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_leaves) *node*.**leaves**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/leaves.js)

返回叶节点数组，叶节点是没有孩子节点的节点。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_path) *node*.**path**(*target*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/path.js)

返回从当前 *node* 到指定 *target* 节点的最短路径。路径从当前节点开始，遍历到当前 *node* 和 *target* 节点共同最近祖先，然后到 *target* 节点。这个方法对 [hierarchical edge bundling](https://bl.ocks.org/mbostock/7607999)(分层边捆绑) 很有用。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_links) *node*.**links**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/links.js)

返回当前 *node* 的 `links` 数组, 其中每个 *link* 是一个定义了 *source* 和 *target* 属性的对象。每个 `link` 的 `source` 为父节点, `target` 为子节点。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_sum) *node*.**sum**(*value*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/sum.js)

从当前 *node* 开始以 [post-order traversal](https://d3js.org.cn/document/d3-hierarchy/#node_eachAfter) 的次序为当前节点以及每个后代节点调用指定的 *value* 函数，并返回当前 *node*。这个过程会为每个节点附加 *node*.value 数值属性，属性值是当前节点的 `value` 值和所有后代的 `value` 的合计，函数的返回值必须为非负数值类型。*value* 访问器会为当前节点和每个后代节点进行评估，包括内部结点；如果你仅仅想让叶节点拥有内部值，则可以在遍历到叶节点时返回 `0`。例如 [这个例子](http://bl.ocks.org/mbostock/b4c0f143db88a9eb01a315a1063c1d77)，使用如下设置等价于 [*node*.count](https://d3js.org.cn/document/d3-hierarchy/#node_count):

```js
root.sum(function(d) { return d.value ? 1 : 0; });
```

在进行层次布局之前必须调用 *node*.sum 或 [*node*.count](https://d3js.org.cn/document/d3-hierarchy/#node_count)，因为布局需要 *node*.value 属性，比如 [d3.treemap](https://d3js.org.cn/document/d3-hierarchy/#treemap)。`API` 支持方法的 [method chaining](https://en.wikipedia.org/wiki/Method_chaining) (链式调用), 因此你可以在计算布局之前调用 *node*.sum 和 [*node*.sort](https://d3js.org.cn/document/d3-hierarchy/#node_sort), 随后生成 [descendant nodes](https://d3js.org.cn/document/d3-hierarchy/#node_descendants) 数组, 比如:

```js
var treemap = d3.treemap()
    .size([width, height])
    .padding(2);

var nodes = treemap(root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; }))
  .descendants();
```

这个例子假设 `node` 数据包含 `value` 字段.

[#](https://d3js.org.cn/document/d3-hierarchy/#node_count) *node*.**count**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/count.js)

计算当前 *node* 下所有叶节点的数量，并将其分配到 *node*.value 属性, 同时该节点的所有后代节点也会被自动计算其所属下的所有叶节点数量。如果 *node* 为叶节点则 `count` 为 `1`。该操作返回当前 *node*。对比 [*node*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum)。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_sort) *node*.**sort**(*compare*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/sort.js)

以 [pre-order traversal](https://d3js.org.cn/document/d3-hierarchy/#node_eachBefore) 的次序对当前 *node* 以及其所有的后代节点的子节点进行排序，指定的 *compare* 函数以 *a* 和 *b* 两个节点为参数。返回当前 *node*。如果 *a* 在 *b* 前面则应该返回一个比 `0` 小的值，如果 *b* 应该在 *a* 前面则返回一个比 `0` 大的值，否则不改变 *a* 和 *b* 的相对位置。参考 [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 获取更多信息。

与 [*node*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum) 不同，*compare* 函数传递两个 [nodes](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 实例而不是两个节点的数据。例如，如果数据包含 `value` 属性，则根据节点以及此节点所有的后续节点的聚合值进行降序排序，就像 [circle-packing](https://d3js.org.cn/document/d3-hierarchy/#pack) 一样:

```js
root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.value - a.value; });
```

类似的，按高度降序排列 (与任何后代的距离最远) 然后按值降序排列，是绘制 [treemaps](https://d3js.org.cn/document/d3-hierarchy/#treemap) 和 [icicles](https://d3js.org.cn/document/d3-hierarchy/#partition) 的推荐排序方式:

```js
root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
```

先对高度进行降序，然后按照 `id` 进行升序排列，是绘制 [trees](https://d3js.org.cn/document/d3-hierarchy/#tree) 和 [dendrograms](https://d3js.org.cn/document/d3-hierarchy/#cluster) 的推荐排序方式:

```js
root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || a.id.localeCompare(b.id); });
```

如果想在可视化布局中使用排序，则在调用层次布局之前，必须先调用 *node*.sort；参考 [*node*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum)。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_each) *node*.**each**(*function*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/each.js)

以 [breadth-first order](https://en.wikipedia.org/wiki/Breadth-first_search)(广度优先) 的次序为每个 *node* 调用执行的 *function*, 一个给定的节点只有在比其深度更小或者在此节点之前的相同深度的节点都被访问过之后才会被访问。指定的函数会将当前 *node* 作为参数。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_eachAfter) *node*.**eachAfter**(*function*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/eachAfter.js)

以 [post-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Post-order)(后序遍历) 的次序为每个 *node* 调用执行的 *function*，当每个节点被访问前，其所有的后代节点都已经被访问过。指定的函数会将当前 *node* 作为参数。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_eachBefore) *node*.**eachBefore**(*function*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/eachBefore.js)

以 [pre-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order)(前序遍历) 的次序为每个 *node* 调用执行的 *function*，当每个节点被访问前，其所有的祖先节点都已经被访问过。指定的函数会将当前 *node* 作为参数。

[#](https://d3js.org.cn/document/d3-hierarchy/#node_copy) *node*.**copy**() [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/index.js#L39)

以当前节点 *node* 为根节点，返回子树的深拷贝副本。(但是副本与当前子树仍然共享同一份数据)。当前节点为返回子树的根节点，返回的节点的 `parent` 属性总是 `null` 并且 `depth` 总是 `0`.

### 布局信息
```javascript
{
  // 关联的数据
  data: {name: "中国", value: "950", children: Array(4)},
  // 当前节点的高度, 叶节点为 0
  height: 2,
  // 当前节点的深度, 根节点为 0
  depth: 0,
  // 当前节点的父节点, 根节点为 null
  parent: null,
  // 当前节点以及 后代节点 的总计值;
  value: 950,
  // 当前节点的孩子节点(如果有的话); 叶节点为 undefined
  children: (4) [Node, Node, Node, Node]
}
```


### 基本数据

**族谱结构**
```json
{
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
}
```

### Node节点

```javascript
export function Node(data) {
  this.data = data;
  this.depth = 0;
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy
};
```

### 执行逻辑

1. 层次遍历N叉树，写入父节点、当前节点深度、当前值。
3. 先序遍历N叉树写入树高度。

### 核心代码

```javascript
export default function hierarchy(data, children) {
  var root = new Node(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  if (children == null) children = defaultChildren;
  
  // 层次遍历树。
  while (node = nodes.pop()) {
    // 判断该节点是否包含叶子节点切本身包含值。 成立则该节点的值为子节点的值与本身值之和。
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      // 写入 children 节点
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        // 写入父节点
        child.parent = node;
        // 写入深度信息
        child.depth = node.depth + 1;
      }
    }
  }
  // 根据parent信息计算高度。
  return root.eachBefore(computeHeight);
}
```

## 参考 & 引用
https://github.com/xswei/d3-hierarchy/blob/master/README.md#node_sum

https://github.com/d3/d3-hierarchy/blob/master/src/hierarchy/index.js#L12

https://d3js.org.cn/document/d3-hierarchy/#hierarchy
