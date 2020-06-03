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
TODO

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
      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packEnclose(children);
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

  // 放置第三个节点
  place(b, a, c = circles[2]); 

  // 根据前三个节点初始化前链
  a = new Node(a), b = new Node(b), c = new Node(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a; // Attempt to place each remaining circle…

  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c = circles[i]), c = new Node(c); // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.

    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;

    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
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
    } while (j !== k.next); // Success! Insert the new circle c between a and b.


    c.previous = a, c.next = b, a.next = b.previous = b = c; // Compute the new closest circle pair to the centroid.

    aa = score(a);

    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }

    b = a.next;
  } // Compute the enclosing circle of the front chain.


  a = [b._], c = b;

  while ((c = c.next) !== b) a.push(c._);

  c = enclose(a); // Translate the circles to put the enclosing circle around the origin.

  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

function place(b, a, c) {
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
      x = (d2 + b2 - a2) / (2 * d2);
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      x = (d2 + a2 - b2) / (2 * d2);
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }
}
```

#### 详解
1. **将叶子节点的大小，写入节点的r属性**
    `root.eachBefore(radiusLeaf(defaultRadius))`第一趟对节点的先序遍历，这里取`node.value`属性、开方得到`node.r`属性。
    ```javascript
    function defaultRadius(d) {
      return Math.sqrt(d.value);
    }
    ```
2. **根据层级关系，对节点进行布局。(计算node.x,node.y值)**
    `.eachAfter(packChildren(constantZero, 1))`第二趟对节点后续遍历，如果是父节点则将该节点的子节点作为一组对节点进行[定位](#定位算法)。
    ```javascript
    function packChildren(padding, k /* 一个padding的比例系数 */) {
      return function (node) {
        if (children = node.children) {
          var children, i, n = children.length,
            r = padding(node) * k || 0,
            e;

          // 针对padding的一些处理 如果padding不为0的话 先给子节点加上。
          if (r)
            for (i = 0; i < n; ++i)
              children[i].r += r;
          
          // 定位算法 这里写入了node.x node.y。
          // 这里利用r做了一些操作。
          e = packEnclose(children);

          // 再给子节点减去
          if (r)
            for (i = 0; i < n; ++i)
              children[i].r -= r;

          node.r = e + r;
        }
      };
    }
    ```
3. **根据画布最小圆与root.r的比值对node.r进行zoom。 以及根据层级关系将子节点移到父节点上**
   `.eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)))`第四趟先序遍历，确定最小圆直径与`root.value`(root.r = Math.sqrt(node.value))的比值，根据这个比值对node.r进行zoom操作。
   根据层级进行打包时，对一个层级的节点是进行独立打包的，这里将子节点移动到父节点上。
   ```javascript
   function translateChild(k) {
      return function (node) {
        var parent = node.parent;
        node.r *= k;
        if (parent) {
          node.x = parent.x + k * node.x;
          node.y = parent.y + k * node.y;
        }
      };
    }
   ```

### 核心算法

要实现pack布局，将一些已知半径的圆进行布局，并且求出最小外接圆，当圆的个数小于三时容易解决。当圆的个数大于三时可以将该问题分解为三个子问题。

1. **已知两圆的圆心和半径，第三圆的半径，且三圆两两相切，求第三圆圆心坐标。**
   
   设圆1圆心,半径为 $$ x_1,y_1,r_1 $$ , 圆2 $$ x_2,y_2,r_2 $$ 。圆3 $$ x_3,y_3,r_3 $$ 即可得
   
   1. $$ (x_3-x_1)^2 + (y_3-y_1)^2 = (r_3+r_1)^2 = d31 $$
   2. $$ (x_3-x_2)^2 + (y_3-y_2)^2 = (r_3+r_2)^2 = d32 $$
   3. $$ (x_2-x_1)^2 + (y_2-y_1)^2 = (r_1+r_2)^2 = d21 $$
   
   根据1、2、3式即得：
   
   1. $$ x = (d21+d32-d31)/(2*d21) $$
   2. $$ y = \sqrt{d32/d21 - x^2} $$

2. **确定新圆在布局中，插入哪两个节点之间其最小外接圆半径最小**
   
   例如现在有ABC三个圆，新圆是以AB为基准插入、还是以AC，BC为基准插入。
   这部分没看懂 留着补
   
   TODO

3. **求多个圆的最小外接圆**
   
   这个问题可以转化成   
   TODO

### 算法理论
每个圆必须包含 circle.r 属性表示半径，以及 circle.x 以及 circle.y 属性表示圆的中心，最小包裹圆的实现见 论文 [Matoušek-Sharir-Welzl algorithm](https://inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf)。

## 参考 & 引用

https://dl.acm.org/doi/epdf/10.1145/1124772.1124851

https://github.com/xswei/d3-hierarchy/blob/master/README.md#node_sum

https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L15

https://github.com/d3/d3-hierarchy/blob/master/src/pack/enclose.js

https://github.com/d3/d3-hierarchy/blob/master/src/pack/siblings.js

https://d3js.org.cn/document/d3-hierarchy/#pack

https://dl.acm.org/doi/10.1145/1124772.1124851

http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf

