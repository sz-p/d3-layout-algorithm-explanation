## 层级布局(Hierarchy)
一个好的层次结构可视化能促进快速的促进多尺度推理: 对单个单元的微观观察和对整体的宏观观察.

许多数据集从从本质上是嵌套结构的。例如一个[族谱结构](#族谱结构)。
该模块实现了对层级结构的基础数据计算[核心代码](#核心代码)。

该模块构建了一个[新的结构](#Node节点)来存储层级结构的一些[基本数据](#基本数据)。以及一些[内置方法](#内置方法)来进行层级间的计算。

### 族谱结构
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

### 基本数据

```javascript
node.data: 节点的数据
node.depth: 节点的深度
node.height: 节点的高度
node.parent: 节点的父节点
node.children: 节点的子节点
node.value: 节点的父节点
```
### 内置方法

```javascript
node.ancestors(): 返回祖先节点数组，第一个节点为自身，然后依次为从自身到根节点的所有节点。
node.descendants(): 返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序。
node.leaves(): 返回叶节点数组，叶节点是没有孩子节点的节点。
node.path(target): 返回从当前 node 到指定 target 节点的最短路径。路径从当前节点开始，遍历到当前 node 和 target 节点共同最近祖先，然后到 target 节点。
node.links(): 返回当前 node 的 links 数组, 其中每个 link 是一个定义了 source 和 target 属性的对象。每个 link 的 source 为父节点, target 为子节点。
node.sum(value): 为当前节点以及每个后代节点调用指定的 value 函数，并返回当前 node。这个过程会为每个节点附加 node.value 数值属性.
node.count(): 计算当前 node 下所有叶节点的数量，并将其分配到 node.value 属性。
node.sort(compare): 对当前 node 以及其所有的后代节点的子节点进行排序。
node.each(function): 广度优先遍历节点。
node.eachAfter(function)：后序遍历节点。
node.eachBefore(function)：前序遍历节点。
node.copy():以当前节点 node 为根节点，返回子树的深拷贝副本。(但是副本与当前子树仍然共享同一份数据)。
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
