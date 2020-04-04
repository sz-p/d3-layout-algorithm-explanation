## 弦图Chord

![](https://img.sz-p.cn/d3Layout-chord.png)

### API

[#](https://d3js.org.cn/document/d3-chord/#chord) d3.**chord**() [<源码>](https://github.com/d3/d3-chord/blob/master/src/chord.js)

使用默认的设置创建一个新的弦图布局

[#](https://d3js.org.cn/document/d3-chord/#_chord) *chord*(*matrix*) [<源码>](https://github.com/d3/d3-chord/blob/master/src/chord.js#L19)

对 *matrix* 进行计算，计算出矩阵数据对应的弦图布局数据以备画图。*matrix* 必须为方阵。*matrix*[*i*][*j*] 表示第 *i* 个节点到第 *j* 个节点的流量。*matrix*[*i*][*j*]不能为负数。比如[Circos tableviewer example](http://mkweb.bcgsc.ca/circos/guide/tables/)中的matrix数据:

```js
var matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];
```

*chord*(*matrix*) 的返回值是一组 *chords* ，`chord` 表示两个节点 *i* 和 *j* 之间的流量大小，为对象类型，包含下属性:

- `source` - 该弦的源子分组对象
- `target` - 该弦的目标子分组对象

每一个 `source` 和 `target` 子分组都有以下数属性:

- `startAngle` - 起始角度
- `endAngle` - 终止角度
- `value` - *matrix*[*i*][*j*] 的值
- `index` - 索引 *i*
- `subindex` - 索引 *j*

弦数据通常传递给 [d3.ribbon](https://d3js.org.cn/document/d3-chord/#ribbon) 来显示相互之间的流量关系。

弦图数组也包含了另一个表示分组的属性 *chords*.groups, *chords*.groups表示计算后的分组数组，每个分组包含以下属性:

- `startAngle` - 起始角度
- `endAngle` - 终止角度
- `value` - 从节点 *i* 出去的总量
- `index` - 节点索引 *i*

分组数据传递给[d3.arc](https://github.com/xswei/d3js_doc/blob/master/API_Reference/d3-path/README.md#path_arc)来绘制。

[#](https://d3js.org.cn/document/d3-chord/#chord_padAngle) *chord*.**padAngle**([*angle*]) [<源码>](https://github.com/d3/d3-chord/blob/master/src/chord.js#L104)

设置或获取相邻分组之间的间隔，默认为 0

[#](https://d3js.org.cn/document/d3-chord/#chord_sortGroups) *chord*.**sortGroups**([*compare*]) [<源码>](https://github.com/d3/d3-chord/blob/master/src/chord.js#L108)

设置或获取分组的排序规则。

[#](https://d3js.org.cn/document/d3-chord/#chord_sortSubgroups) *chord*.**sortSubgroups**([*compare*]) [<源码>](https://github.com/d3/d3-chord/blob/master/src/chord.js#L112)

设置或获取子分组的排序规则

[#](https://d3js.org.cn/document/d3-chord/#chord_sortChords) *chord*.**sortChords**([*compare*]) [<源码>](https://github.com/d3/d3-chord/blob/master/src/chord.js#L116)

设置或获取弦的排序规则

### 布局信息
### 基本数据
### 执行逻辑
### 核心代码

## 参考 & 引用