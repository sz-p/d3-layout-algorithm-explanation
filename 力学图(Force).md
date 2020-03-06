## 力学图(Force)

![](https://img.sz-p.cn/d3Layoutforce.png)

这个模块实现了用以模拟粒子物理运动的 [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) 数值积分器。仿真的演化: 它假设任意单位时间步长 Δ*t* = 1，所有的粒子的单位质量常量 *m* = 1。作用在每个粒子上的合力 *F* 相当于在单位时间 Δ*t* 内的恒定加速度 *a*。并且可以简单的通过为每个粒子添加速度并计算粒子的位置来模拟仿真。

该模块依赖`节点和连接信息`，以及一些`基本力`。向`节点信息`中写入每个节点的坐标，将`连接信息`中的`source`，`target`部分修改为对应的节点引用。

### API

[#](https://d3js.org.cn/document/d3-force/#forceSimulation) d3.**forceSimulation**([*nodes*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js)

使用指定的 [*nodes*](https://d3js.org.cn/document/d3-force/#simulation_nodes) 创建一个新的没有任何 [forces(力学模型)](https://d3js.org.cn/document/d3-force/#simulation_force) 的仿真。如果没有指定 *nodes* 则默认为空数组。仿真会自动 [starts](https://d3js.org.cn/document/d3-force/#simulation_restart)；使用 [*simulation*.on](https://d3js.org.cn/document/d3-force/#simulation_on) 来监听仿真运行过程中的 `tick` 事件。如果你想手动运行仿真，则需要调用 [*simulation*.stop](https://d3js.org.cn/document/d3-force/#simulation_stop) 然后根据需求调用 [*simulation*.tick](https://d3js.org.cn/document/d3-force/#simulation_tick)。

[#](https://d3js.org.cn/document/d3-force/#simulation_restart) *simulation*.**restart**() [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L80)

重新调用仿真的定时器并且返回仿真。与 [*simulation*.alphaTarget](https://d3js.org.cn/document/d3-force/#simulation_alphaTarget) 或 [*simulation*.alpha](https://d3js.org.cn/document/d3-force/#simulation_alpha) 结合使用，这个方法可以再次激活仿真，在有些交互比如拖拽节点或者在使用 [*simulation*.stop](https://d3js.org.cn/document/d3-force/#simulation_stop) 临时暂停仿真时候使用。

[#](https://d3js.org.cn/document/d3-force/#simulation_stop) *simulation*.**stop**() [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L84)

暂停仿真内部的定时器并返回当前仿真。如果仿真内部定时器已经处于停止状态则什么都不做。这个方法在手动运行仿真时很有用，参考 [*simulation*.tick](https://d3js.org.cn/document/d3-force/#simulation_tick)。

[#](https://d3js.org.cn/document/d3-force/#simulation_tick) *simulation*.**tick**() [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L38)

通过 ([*alphaTarget*](https://d3js.org.cn/document/d3-force/#simulation_alphaTarget) - *alpha*) × [*alphaDecay*](https://d3js.org.cn/document/d3-force/#simulation_alphaDecay) 递增当前的 [*alpha*](https://d3js.org.cn/document/d3-force/#simulation_alpha) 值。然后调用每个注册的 [force](https://d3js.org.cn/document/d3-force/#simulation_force) 并传递新的 *alpha*。然后通过 *velocity* × [*velocityDecay*](https://d3js.org.cn/document/d3-force/#simulation_velocityDecay) 来递减每个节点的速度并调整节点的位置。

这个方法不会分发 [events](https://d3js.org.cn/document/d3-force/#simulation_on)，事件仅仅在 [creation](https://d3js.org.cn/document/d3-force/#forceSimulation) 仿真或者调用 [*simulation*.restart](https://d3js.org.cn/document/d3-force/#simulation_restart) 的时候才会被分发。从仿真开始到结束的 `tick` 次数为 ⌈*log*([*alphaMin*](https://d3js.org.cn/document/d3-force/#simulation_alphaMin)) / *log*(1 - [*alphaDecay*](https://d3js.org.cn/document/d3-force/#simulation_alphaDecay))⌉ 也就是默认为 300 次。

这个方法可以与 [*simulation*.stop](https://d3js.org.cn/document/d3-force/#simulation_stop) 结合使用来创建 [static force layout(静态力学布局)](https://bl.ocks.org/mbostock/1667139)。对于大规模图而言静态布局应该 [in a web worker(在worker)](https://bl.ocks.org/mbostock/01ab2e85e8727d6529d20391c0fd9a16) 中计算以避免阻塞 UI 进程。

[#](https://d3js.org.cn/document/d3-force/#simulation_nodes) *simulation*.**nodes**([*nodes*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L88)

如果指定了 *nodes* 则将仿真的节点设置为指定的对象数组，并根据需要创建它们的位置和速度，然后 [re-initializes(重新初始化)](https://d3js.org.cn/document/d3-force/#force_initialize) 并且绑定 [forces(力模型)](https://d3js.org.cn/document/d3-force/#simulation_force) 返回当前仿真。如果没有指定 *nodes* 则返回当前仿真的节点数组。

每个 *node* 必须是一个对象类型，下面的几个属性将会被仿真系统添加:

- `index` - 节点在 *nodes* 数组中的索引
- `x` - 节点当前的 *x*-坐标
- `y` - 节点当前的 *y*-坐标
- `vx` - 节点当前的 *x*-方向速度
- `vy` - 节点当前的 *y*-方向速度

位置 ⟨*x*,*y*⟩ 以及速度 ⟨*vx*,*vy*⟩ 随后可能被仿真中的 [forces](https://d3js.org.cn/document/d3-force/#forces) 修改. 如果 *vx* 或 *vy* 为 NaN, 则速度会被初始化为 ⟨0,0⟩. 如果 *x* 或 *y* 为 NaN, 则位置会按照 [phyllotaxis arrangement(布局算法)](http://bl.ocks.org/mbostock/11478058) 被初始化, 这样初始化布局是为了能使得节点在原点周围均匀分布。

如果想要某个节点固定在一个位置，可以指定以下两个额外的属性:

- `fx` - 节点的固定 *x*-位置
- `fy` - 节点的固定 *y*-位置

每次 [tick](https://d3js.org.cn/document/d3-force/#simulation_tick) 结束后，节点的 *node*.x 会被重新设置为 *node*.fx 并且 *node*.vx 会被设置为 0；理 *node*.y 会被重新替换为 *node.fy* 并且 *node*.vy 被设置为 0；如果想要某个节点解除固定，则将 *node*.fx 和 *node*.fy 设置为 null 或者删除这两个属性。

如果指定的节点数组发生了变化，比如添加或删除了某些节点，则这个方法必须使用新的节点数组重新被调用一次以通知仿真发生了变化。仿真不会对输入数组做副本。

[#](https://d3js.org.cn/document/d3-force/#simulation_alpha) *simulation*.**alpha**([*alpha*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L92)

如果指定了 *alpha* 则将仿真的当前 *alpha* 值设置为指定的值，必须在 [0,1] 之间。如果没有指定 *alpha* 则返回当前的 *alpha* 值，默认为 1。

[#](https://d3js.org.cn/document/d3-force/#simulation_alphaMin) *simulation*.**alphaMin**([*min*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L96)

如果指定了 *min* 则将 *alpha* 的最小值设置为指定的值，需要在 [0, 1] 之间。如果没有指定 *min* 则返回当前的最小 *alpha* 值，默认为 0.001. 在仿真内部，会不断的减小 [*alpha*](https://d3js.org.cn/document/d3-force/#simulation_alpha) 值直到 [*alpha*](https://d3js.org.cn/document/d3-force/#simulation_alpha) 值小于 最小 *alpha*。默认的 [alpha decay rate(alpha 衰减系数)](https://d3js.org.cn/document/d3-force/#simulation_alphaDecay) 为 ~0.0228，因此会进行 300 次迭代。

[#](https://d3js.org.cn/document/d3-force/#simulation_alphaDecay) *simulation*.**alphaDecay**([*decay*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L100)

如果指定了 *decay* 则将当前的 [*alpha*](https://d3js.org.cn/document/d3-force/#simulation_alpha) 衰减系数设置为指定的值，要在[0, 1] 之间。如果没有指定 *decay* 则返回当前的 *alpha* 衰减系数，默认为 0.0228… = 1 - *pow*(0.001, 1 / 300)，其中 0.001 是默认的 [最小 *alpha*](https://d3js.org.cn/document/d3-force/#simulation_alphaMin).

*alpha* 衰减系数定义了当前的 *alpha* 值向 [target *alpha*](https://d3js.org.cn/document/d3-force/#simulation_alphaTarget) 迭代快慢。默认的目标 *alpha* 为 0 因此从布局形式上可以认为衰减系数决定了布局冷却的快慢。衰减系数越大，布局冷却的越快，但是衰减系数大的话会引起迭代次数不够充分，导致效果不够好。衰减系数越小，迭代次数越多，最终的布局效果越好。如果想要布局永远停不下来则可以将衰减系数设置为 0；也可以设置 [target *alpha*](https://d3js.org.cn/document/d3-force/#simulation_alphaTarget) 大于 [minimum *alpha*](https://d3js.org.cn/document/d3-force/#simulation_alphaMin) 达到相同的效果。

[#](https://d3js.org.cn/document/d3-force/#simulation_alphaTarget) *simulation*.**alphaTarget**([*target*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L104)

如果指定了 *target* 则将当前的目标 [*alpha*](https://d3js.org.cn/document/d3-force/#simulation_alpha) 设置为指定的值，需要在 [0, 1] 之间。如果没有指定 *target* 则返回当前默认的目标 *alpha* 值, 默认为 0.

[#](https://d3js.org.cn/document/d3-force/#simulation_velocityDecay) *simulation*.**velocityDecay**([*decay*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L108)

如果指定了 *decay* 则设置仿真的速度衰减系数并返回仿真，范围为 [0, 1]。如果没有指定 *decay* 则返回当前的速度衰减系数，默认为 0.4，衰减系数类似于阻力。每次 `tick` 结束后每个节点的速度都会乘以 1 - *decay* 以降低节点的运动速度。速度衰减系数与 [alpha decay rate](https://d3js.org.cn/document/d3-force/#simulation_alphaDecay) 类似，较低的衰减系数可以使得迭代次数更多，其布局结果也会更理性，但是可能会引起数值不稳定从而导致震荡。

[#](https://d3js.org.cn/document/d3-force/#simulation_force) *simulation*.**force**(*name*[, *force*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L112)

如果指定了 *force* 则表示为仿真添加指定 *name* 的 [force(力学模型)](https://d3js.org.cn/document/d3-force/#forces) 并返回仿真。如果没有指定 *force* 则返回当前仿真的对应 *name* 的力模型，如果没有对应的 *name* 则返回 `undefined`. (默认情况下仿真没有任何力学模型，需要手动添加). 例如创建一个用来对图进行布局的仿真，可以如下:

```js
var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter());
```

如果要移除对应的 *name* 的仿真，可以为其指定 `null`，比如:

```js
simulation.force("charge", null);
```

[#](https://d3js.org.cn/document/d3-force/#simulation_find) *simulation*.**find**(*x*, *y*[, *radius*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L116)

返回距离 ⟨*x*,*y*⟩ 位置最近的节点，并可以指定搜索半径 *radius*. 如果没有指定 *radius* 则默认为无穷大。如果在指定的搜索区域内没有找到节点，则返回 `undefined`.

[#](https://d3js.org.cn/document/d3-force/#simulation_on) *simulation*.**on**(*typenames*, [*listener*]) [<>](https://github.com/d3/d3-force/blob/master/src/simulation.js#L139)

如果指定了 *listener* 则将其指定的 *typenames* 的回调。如果对应的 *typenames* 已经存在事件监听器，则将其替换。如果 *listener* 为 `null` 则表示移除对应 *typenames* 的事件监听器。如果没有指定 *listener* 则返回第一个符合条件的 *typenams* 对应的事件监听器，当指定的事件触发时，每个回调都会被调用，回调中 `this` 指向仿真本身。

*typenames* 可以由多个由空格隔开的 *typename*。每个 *typename* 都由 *type* 和可选的 *name* 组成，用 (`.`) 连接。比如 `tick.foo` 和 `tick.bar`。也就是可以为同一种事件类型注册多个事件监听器。其中 *type* 必须为以下几种:

- `tick` - 仿真内部定时器每次 `tick` 之后.
- `end` - 当 *alpha* < [*alphaMin*](https://d3js.org.cn/document/d3-force/#simulation_alphaMin) 时仿真内部定时器停止.

需要注意的是，`tick` 事件在手动调用 [*simulation*.tick](https://d3js.org.cn/document/d3-force/#simulation_tick) 时不会执行。`tick` 事件只会被内部定时器调用用以模拟布局过程。如果需要个性化调整布局，应该在 [forces](https://d3js.org.cn/document/d3-force/#simulation_force) 中注册而不是在每次 `tick` 时修改节点位置。

### 布局信息

布局信息分为`nodes`和`links`,都是数组结构，
其中`nodes`表示节点力学图中的节点列表，其中`x`,`y`代表其坐标信息。
`links`表示连接列表，其中`source`,`target`表示起止节点，是一个`nodes`节点的引用。

```javascript
{
    nodes:[
        {
            id: "Myriel"
            group: 1,
            index: 0,
            x: 46.38649232626505,
            y: 386.9555414528223,
            vy: -0.0006691095177627861,
            vx: 0.0011235465030445093
        },
        {
           id: "Napoleon",
            group: 1,
            index: 1,
            x: 21.183168975952462,
            y: 420.6280997789074,
            vy: -0.00031141180558930744,
            vx: 0.0016790833308051134
        },
    ],
    links:[
        {source:{id: "Myriel", ...},target:{id: "Napoleon", ...},index:0}
    ]
}
```
### 基本数据

**节点信息**

```javascript
[
    {"id": "Myriel", "group": 1},
    {"id": "Napoleon", "group": 1}
]
```

**连接信息**

```javascript
[
    {"source": "Myriel", "target": "Myriel"}
]
```

**节点和连接信息**

```javascript
{
    nodes:[
      {"id": "Myriel", "group": 1},
      {"id": "Napoleon", "group": 1}
    ],
    links:[
      {"source": "Myriel", "target": "Myriel"}
    ]
}
```

**基本力**

```javascript
// 各个连接节点之间的引力 两个节点连接后 会产生节点间引力 详见核心代码
d3.forceLink()

// 各个连接节点之间的斥里，所有厂中的节点之间都有一个斥力，参照库仑斥力 详见核心代码
d3.forceManyBody()

// 所有节点会有一个向中心的中心引力 参照万有引力 详见核心代码
d3.forceCenter(width / 2, height / 2)
```



### 执行逻辑

### 核心代码

**仿真部分**

该部分初始化了nodes的节点数据，向`节点信息`中写入每个节点初始化的坐标。这些节点分布在一个圆形区域内。并根据给出的力启动了力学仿真。一些常用的基本力见下文。

```javascript
var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

export default function(nodes) {
  var simulation,
      alpha = 1, // 是一个衰减系数，表示各个各个力当前的强度。当衰减为alphaMin时停止力仿真
      alphaMin = 0.001, // 表示最小的力系数。
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0, // 表示 最终的 alpha 值 即 alpha 向 alphaTarget 衰减
      velocityDecay = 0.6,
      forces = map(),
      //step 4 启动各个力仿真
      stepper = timer(step),
      event = dispatch("tick", "end");

  if (nodes == null) nodes = [];
  
  // step 4 启动各个力仿真
  function step() {
    // 触发一个tick
    tick();
    // 触发回调函数
    event.call("tick", simulation);
    // 判断终止态
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }
  
  // 每一步访问各个力对nodes的速度进行计算，并将根据速度移动节点
  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;
    
    for (var k = 0; k < iterations; ++k) {
      // 对力系数进行衰减
      alpha += (alphaTarget - alpha) * alphaDecay;
        
      // step 5 每一步访问各个力对nodes的速度进行计算
      forces.each(function (force) {
        force(alpha);
      });
      
      // step 6 根据速度移动节点,并将速度重置为0，方便下一步进行计算
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }
  // 初始化nodes对象
  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      // 初始化nodes的index信息
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        // 这里在一个圆形区域内初始化了节点的坐标。
        // TODO 这里为什么这么初始化其实可以挖一下
        var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      // 初始化各个节点的x，y方向上的速度为0
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  // 启动各个力仿真
  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes);
    return force;
  }
  // step 1 初始化nodes对象
  initializeNodes();
    
  // step 2 返回了仿真对象
  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },
      
    // 在一个map里维护各个力（即各个对nodes的速度(vx,vy)坐标进行处理的方法）
    force: function(name, _) {
      return arguments.length > 1 
          ? ((_ == null 
              ? forces.remove(name) 
              : forces.set(name, initializeForce(_))), simulation) 
      : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

```

**d3.forceLink()**

已连接节点的节点间引力。

该部分依赖一个`节点访问器`，

```javascript
export default function(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = constant(30),
      distances,
      nodes,
      count,
      bias,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || jiggle();
        y = target.y + target.vy - source.y - source.vy || jiggle();
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = map(nodes, id),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
  };

  return force;
}
```



## 参考 & 引用

https://d3js.org.cn/document/d3-force/

https://blockbuilder.org/ColinEberhardt/6ceb7ca74aabac9c8534d7120d31b382

