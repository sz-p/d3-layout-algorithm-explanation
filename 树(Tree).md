## 树(Tree)

![](https://img.sz-p.cn/d3Layout-tree.png)

集群,是[层级布局(Hierarchy)](https://sz-p.cn/blog/index.php/2019/07/08/207.html)的一种

该模块依赖一个[层级布局(Hierarchy)](./层级布局(Hierarchy).md)结果,和一个`画布区大小(size)`。将层级布局数据中的节点赋予`x`和`y`坐标。树图从根节点开始，自上而下，每一层节点对齐。

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
### 核心代码

```javascript
function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // 默认祖先节点(祖先节点即改节点到根节点的节点链)
  this.a = this; // 祖先节点
  this.z = 0; // 初步的x坐标，自上而下的遍历树时对节点确定的x坐标。
  this.m = 0; // 由于是树的深度遍历，当两颗子树重合时为了使时间复杂度将为On这里起了一个mod的变量用于第二次遍历树时使用。该变量表示该子树(包括子节点)的偏移量。
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // “线程”，用于描述树的轮廓。一个节点链，由于树是从左侧开始排列的。这里表示了树的右侧轮廓。
  this.i = i; // 兄弟节点中的排序。
}

function tree(root) {
  // 构建了一套新的数据结构以开始布局
  var t = treeRoot(root);

  // 使用Buchheim et al等人的算法计算布局。
  t.eachAfter(firstWalk), t.parent.m = -t.z;
  t.eachBefore(secondWalk);

  // 如果必要的话，用给定的节点大小进行布局
  if (nodeSize) root.eachBefore(sizeNode);

  // 用默认的算法对节点进行布局
  else {
    var left = root,
        right = root,
        bottom = root;
    // 这里拿到了最边缘的三个节点。最左，最右及最下。
    root.eachBefore(function(node) {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
      if (node.depth > bottom.depth) bottom = node;
    });
    // dx 画布宽度
    // dy 画布高度
    // kx 节点宽度在画布中的比例
    // ky 节点高度在画布中的比例
    // 这里拿到了节点的位置在画布中的映射，并计算了其在画布中的坐标。
    var s = left === right ? 1 : separation(left, right) / 2,
        tx = s - left.x,
        
        kx = dx / (right.x + s + tx),
        // 这里对树的深度在画布高度上做了一个均分映射，即每层节点作占的高度是一样的。
        ky = dy / (bottom.depth || 1);
    root.eachBefore(function(node) {
      node.x = (node.x + tx) * kx;
      node.y = node.depth * ky;
    });
  }
  return root;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
// applied recursively to the children of v, as well as the function
// APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
// node v is placed to the midpoint of its outermost children.
function firstWalk(v) {
  var children = v.children,
      siblings = v.parent.children,
      w = v.i ? siblings[v.i - 1] : null;
  if (children) {
    executeShifts(v);
    var midpoint = (children[0].z + children[children.length - 1].z) / 2;
    if (w) {
      v.z = w.z + separation(v._, w._);
      v.m = v.z - midpoint;
    } else {
      v.z = midpoint;
    }
  } else if (w) {
    v.z = w.z + separation(v._, w._);
  }
  v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
}

// Computes all real x-coordinates by summing up the modifiers recursively.
function secondWalk(v) {
  v._.x = v.z + v.parent.m;
  v.m += v.parent.m;
}

// The core of the algorithm. Here, a new subtree is combined with the
// previous subtrees. Threads are used to traverse the inside and outside
// contours of the left and right subtree up to the highest common level. The
// vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
// superscript o means outside and i means inside, the subscript - means left
// subtree and + means right subtree. For summing up the modifiers along the
// contour, we use respective variables si+, si-, so-, and so+. Whenever two
// nodes of the inside contours conflict, we compute the left one of the
// greatest uncommon ancestors using the function ANCESTOR and call MOVE
// SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
// Finally, we add a new thread (if necessary).
function apportion(v, w, ancestor) {
  if (w) {
    var vip = v,
        vop = v,
        vim = w,
        vom = vip.parent.children[0],
        sip = vip.m,
        sop = vop.m,
        sim = vim.m,
        som = vom.m,
        shift;
    while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
      vom = nextLeft(vom);
      vop = nextRight(vop);
      vop.a = v;
      shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
      if (shift > 0) {
        moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
        sip += shift;
        sop += shift;
      }
      sim += vim.m;
      sip += vip.m;
      som += vom.m;
      sop += vop.m;
    }
    if (vim && !nextRight(vop)) {
      vop.t = vim;
      vop.m += sim - sop;
    }
    if (vip && !nextLeft(vom)) {
      vom.t = vip;
      vom.m += sip - som;
      ancestor = v;
    }
  }
  return ancestor;
}
```



## 参考 & 引用

https://blog.csdn.net/selina_chan/article/details/51260516

https://d3js.org.cn/document/d3-hierarchy/#tree

https://www.researchgate.net/publication/30508504_Improving_Walker's_Algorithm_to_Run_in_Linear_Time

http://dirk.jivas.de/papers/buchheim02improving.pdf

https://www.cnblogs.com/zhongzihao/p/8976675.html