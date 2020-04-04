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
function pack(root) {
  root.x = dx / 2, root.y = dy / 2;
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
   设圆1圆心,半径为$x_1$,$y_1$,$r_1$, 圆2$x_2$,$y_2$,$r_2$。圆3$x_3$,$y_3$,$r_3$即可得
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
https://github.com/xswei/d3-hierarchy/blob/master/README.md#node_sum

https://github.com/d3/d3-hierarchy/blob/master/src/pack/index.js#L15

https://github.com/d3/d3-hierarchy/blob/master/src/pack/enclose.js

https://github.com/d3/d3-hierarchy/blob/master/src/pack/siblings.js

https://d3js.org.cn/document/d3-hierarchy/#pack

https://dl.acm.org/doi/10.1145/1124772.1124851

http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf

