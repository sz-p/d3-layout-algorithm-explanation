## 层包Pack

![](https://img.sz-p.cn/d3Layout-pack.png)

图使用嵌套来表示层次结构。最里层表示叶节点的圆的大小用来编码定量的维度值。每个圆都表示当前节点的近似累计大小，因为有空间浪费以及变形；仅仅只有叶节点可以准确的比较。尽管 circle packing 不能高效的利用空间，但是能更突出的表示层次结构。

该模块利用[层级布局](https://sz-p.cn/blog/index.php/2019/07/08/207.html)的数据进行包布局[坐标计算](#核心代码)。为层级布局数据添加[布局信息](#布局信息)用于绘制图形。以及一些内置[API](#API)来设置或获取一些参数来辅助图形的坐标计算。

### API
[#](https://d3js.org.cn/document/d3-hierarchy/#pack) d3.**pack**()

使用默认的设置创建一个打包布局。

[#](https://d3js.org.cn/document/d3-hierarchy/#_pack) *pack*(*root*) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L15)

对 *root* [hierarchy](https://d3js.org.cn/document/d3-hierarchy/#hierarchy) 进行布局，*root* 节点以及每个后代节点会被附加以下属性:

- *node*.x - 节点中心的 *x*- 坐标
- *node*.y - 节点中心的 *y*- 坐标
- *node*.r - 圆的半径

在传入布局之前必须调用 [*root*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum)。可能还需要调用 [*root*.sort](https://d3js.org.cn/document/d3-hierarchy/#node_sort) 对节点进行排序。

[#](https://d3js.org.cn/document/d3-hierarchy/#pack_radius) *pack*.**radius**([*radius*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L30)

如果指定了 *radius* 则将半径访问器设置为指定的函数并返回 `pack` 布局。如果没有指定 *radius* 则返回当前半径访问器，默认为 `null`, 表示叶节点的圆的半径由叶节点的 *node*.value(通过 [*node*.sum](https://d3js.org.cn/document/d3-hierarchy/#node_sum) 计算) 得到；然后按照比例缩放以适应 [layout size](https://d3js.org.cn/document/d3-hierarchy/#pack_size)。如果半径访问器不为 `null` 则叶节点的半径由函数精确指定。

[#](https://d3js.org.cn/document/d3-hierarchy/#pack_size) *pack*.**size**([*size*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L34)

如果指定了 *size* 则将当前 `pack` 布局的尺寸设置为指定的二元数值类型数组: [*width*, *height*] 并返回当前 `pack` 布局。如果没有指定 *size* 则返回当前的尺寸，默认为 [1, 1]。

[#](https://d3js.org.cn/document/d3-hierarchy/#pack_padding) *pack*.**padding**([*padding*]) [<源码>](https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L38)

如果指定了 *padding* 则设置布局的间隔访问器为指定的数值或函数并返回 `pack` 布局。如果没有指定 *padding* 则返回当前的间隔访问器，默认为常量 `0`。当兄弟节点被打包时，节点之间的间隔会被设置为指定的间隔；外层包裹圆与字节点之间的间隔也会被设置为指定的间隔。如果没有指定 [explicit radius(明确的半径)](https://d3js.org.cn/document/d3-hierarchy/#pack_radius)，则间隔是近似的，因为需要一个双通道算法来适应 [layout size](https://d3js.org.cn/document/d3-hierarchy/#pack_size)：这些圆首先没有间隙；一个用于计算间隔的比例因子会被计算；最后，这些圆被填充了。

### 布局信息
`x`:节点中心的 x- 坐标
`y`:节点中心的 y- 坐标
`r`:圆的半径
`parent`,`children`分别代表当前节点的父节点和子节点

```javascript
const nodes = [
  {
    height: 2,
    depth: 0,
    parent: null,
    value: 950,
    x: 200,
    y: 300,
    r: 199.99999999999997,
    children:[Node,Node]
  }
]

```



### 基本数据
TODO

### 执行逻辑

1. 如果有默认的半径会采用传入的半径 如果没有会根据size计算一个默认的半径
   
2. 将叶子节点的大小，写入节点的r属性
   
3. 根据层级关系，对节点进行布局。(计算node.x,node.y值)(详见核心算法2)
   
4. 根据层级关系将子节点移到父节点上(详见核心算法3)
   

### 核心算法

要实现pack布局，将一些已知半径的圆进行布局，并且求出最小外接圆，当圆的个数小于三时容易解决。当圆的个数大于三时可以将该问题分解为三个子问题。

1. **已知两圆的圆心和半径，第三圆的半径，且三圆两两相切，求第三圆圆心坐标。**
   
   设圆1圆心,半径为 $$ x_1,y_1,r_1 $$ , 圆2 $$ x_2,y_2,r_2 $$ 。圆3 $$ x_3,y_3,r_3 $$ 即可得
   
   1. 公式1.1 $$ (x_3-x_1)^2 + (y_3-y_1)^2 = (r_3+r_1)^2 = d31 $$
   
   2. $$ (x_3-x_2)^2 + (y_3-y_2)^2 = (r_3+r_2)^2 = d32 $$
   
   3. $$ (x_2-x_1)^2 + (y_2-y_1)^2 = (r_1+r_2)^2 = d21 $$
   
   根据1、2、3式即得：
   
   1. $$ x = (d21+d32-d31)/(2*d21) $$
   
   2. $$ y = \sqrt{d32/d21 - x^2} $$

2. **确定新圆在布局中，插入哪两个节点之间其最小外接圆半径最小**
   
   例如现在有ABC三个圆，新圆是以AB为基准插入、还是以AC，BC为基准插入。
   这部分没看懂 留着补

   1. 构建一个双向链表存储外围节点如下图，例如有节点`a`,`b`,由`核心算法1`可以计算节点`c`的坐标。构成链表`a<->b,b<->c,c<->a`
   ![](https://img.sz-p.cn/pack-1.jpg)

   2. 计算节点`a,b,c`中距离中心最近的节点作为节点`a`当作下一个准备插入节点的基准点。
   
   2. 以节点`a`以及节点`a`的下一个节点`b`作为基准点准备插入节点`c`
   
   3. 以`a`,`b`为基准点计算节点`c`的坐标，遍历双向链，判断有无重合，无重合则插入链表，有重合则跳转**步骤5**
   
   4. 判断节点`a`和节点`b`谁的半径大，如果`a`的半径大则以`a`为中心向双向链的后方进行搜索，同时从双链中移除节点`b`,即尝试以节点`a`,`c`为基准点插入新节点(`a->b,b->c`)。同理如果`b`节点圆心较大则以`b`为基准向双链的前方搜索。并移除节点`a`跳转**步骤4**继续判断是否有重合，无重合后插入节点。
   ![](https://img.sz-p.cn/pack-2.jpg)
   
   5. 跳转**步骤2**继续插入新的节点。

3. **求多个圆的最小外接圆**
   
   这个问题可以转化成   
   TODO


### 算法理论
每个圆必须包含 circle.r 属性表示半径，以及 circle.x 以及 circle.y 属性表示圆的中心，最小包裹圆的实现见 论文 [Matoušek-Sharir-Welzl algorithm](https://inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf)。

包布局布局算法见论文[Visualization of Large Hierarchical Data by Circle Packing](https://dl.acm.org/doi/epdf/10.1145/1124772.1124851)


### 核心代码
```javascript
// 默认的求半径方法
function defaultRadius(d) {
  return Math.sqrt(d.value);
}
function () {
  var radius = null,
      dx = 1,
      dy = 1,
      padding = constantZero;

  // 核心方法
  function pack(root) {
    root.x = dx / 2, root.y = dy / 2;
    // 如果有默认的半径会采用传入的半径 如果没有会根据size计算一个默认的半径
    if (radius) {
      //将叶子节点的大小，写入节点的r属性
      root.eachBefore(radiusLeaf(radius))
        //根据层级关系，对节点进行布局。(计算node.x,node.y值)
        .eachAfter(packChildren(padding, 0.5))
        //根据层级关系将子节点移到父节点上,由于指定了r就不再对node.r进行zoom
        .eachBefore(translateChild(1));
    } else {
      //将叶子节点的大小，写入节点的r属性
      root.eachBefore(radiusLeaf(defaultRadius))
        //根据层级关系，对节点进行布局。(计算node.x,node.y值)
        .eachAfter(packChildren(constantZero, 1))
        //对padding做了一些调整
        .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
        //根据画布最小圆与root.r的比值对node.r进行zoom。 以及根据层级关系将子节点移到父节点上
        .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function (x) {
    return arguments.length ? (radius = optional(x), pack) : radius;
  };

  pack.size = function (x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
  };

  pack.padding = function (x) {
    return arguments.length ? (padding = typeof x === "function" ? x : constant(+x), pack) : padding;
  };

  return pack;
}

function radiusLeaf(radius) {
  return function (node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}


function packChildren(padding, k) {
  return function (node) {
    if (children = node.children) {
      var children,
          i,
          n = children.length,
          r = padding(node) * k || 0,
          e;
      // 针对padding的一些处理 如果padding不为0的话 先给子节点加上。
      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      // 定位算法 这里写入了node.x node.y。
      // 这里利用r做了一些操作。
      e = packEnclose(children);
      // 再给子节点减去
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function packEnclose(circles) {
  if (!(n = circles.length)) return 0;
  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // 第一个节点 直接初始化节点坐标为[0,0]
  a = circles[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r; 

  // 这里将第二个节点放在了第一个节点的左侧(只要和第一个节点相切即可)
  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r; 

  // 在a和b之间放置第三个节点c
  place(b, a, c = circles[2]); 

  // 根据前三个节点初始化前链
  a = new Node(a), b = new Node(b), c = new Node(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a; 

  pack: for (i = 3; i < n; ++i) {
    // 在a和b节点上继续布局节第四个节点
    
    // 节点a是链上距离中心最近的节点。
    place(a._, b._, c = circles[i]), c = new Node(c);
    

    // 找到链上最近的重叠节点
    // “紧密度”由沿前链的直线距离决定。
    // “前”或“后”同样由线性距离决定。
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;

    // 解决在ab节点上插入节点c，节点c可能与其他节点重合的问题。
    // 遍历链上的节点 判断当前节点是否与链上的节点重合
    // 在链上搜索的时候以两个节点中半径大的为中心去搜索，即如果a大于b则向后搜索，如果b大于a则向前搜索。
    do {
      if (sj <= sk) {
        // 判断节点c是否和当前节点重合
        if (intersects(j._, c._)) {
          // 因为是在向前搜索，节点c和j重合后，节点b出链，节点j进链，重新计算以a,j为节点构建相切节点c的圆心坐标。之后再判断节点c是否与链上的节点有重合
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }

        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }

        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);

    // 解决掉重叠问题后插入节点
    // 在ab节点之后插入节点c
    c.previous = a, c.next = b, a.next = b.previous = b = c; 

    // 重新计算最近的距离中心最近的节点，作为节点a
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }

    b = a.next;
  } 

  //计算前链的包围圈。
  a = [b._], c = b;

  while ((c = c.next) !== b) a.push(c._);

  c = enclose(a); 


  //平移圆以使包围圆围绕原点。
  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

// 详见核心算法 1
// 由于a节点恒是前节点b节点恒是后节点、即由a->b计算节点c的一直在a->b节点的一侧
function place(b, a, c) {
  // 计算了a b节点之间的距离
  var dx = b.x - a.x,
      x,
      a2,
      dy = b.y - a.y,
      y,
      b2,
      d2 = dx * dx + dy * dy;

  if (d2) {
    a2 = a.r + c.r, a2 *= a2;
    b2 = b.r + c.r, b2 *= b2;

    if (a2 > b2) {
      // 见公式1.4
      x = (d2 + b2 - a2) / (2 * d2);
      // 见公式1.5
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      // 见公式1.4
      x = (d2 + a2 - b2) / (2 * d2);
      // 见公式1.5 
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }
}

// 判断ab是否相交
function intersects(a, b) {
  var dr = a.r + b.r - 1e-6,
      dx = b.x - a.x,
      dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

// 由于这里还没平移，中心点的坐标为(0,0)这里计算了圆心到图形中心的距离
function score(node) {
  var a = node._,
      b = node.next._,
      ab = a.r + b.r,
      dx = (a.x * b.r + b.x * a.r) / ab,
      dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}
```



## 参考 & 引用

https://dl.acm.org/doi/epdf/10.1145/1124772.1124851

https://github.com/xswei/d3-hierarchy/blob/master/README.md#node_sum

https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L15

https://github.com/d3/d3-hierarchy/blob/master/src/pack/enclose.js

https://github.com/d3/d3-hierarchy/blob/master/src/pack/siblings.js

https://d3js.org.cn/document/d3-hierarchy/#pack

https://dl.acm.org/doi/10.1145/1124772.1124851

http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf

