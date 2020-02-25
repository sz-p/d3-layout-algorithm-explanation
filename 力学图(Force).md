## 力学图(Force)

![](https://img.sz-p.cn/d3Layoutforce.png)

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
### 基本数据
### 执行逻辑
### 核心代码

## 参考 & 引用
