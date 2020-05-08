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

布局信息分为两部分、一部分描述连接信息，一部分描述分区信息。

其中连接信息包含`source`,`target`分别描述起止信息，其中又包含`startAngle`,`endAngle`分别表示开始点的起止角度和结束点的起止角度。单位为弧度制。

分区信息包含`startAngle`,`endAngle`来描述各个分区的起止角度。

```javascript
[
    {
      source:{
        endAngle: 0.9974692393028675
        index: 0
        startAngle: 0.9239095608882018
        subindex: 0
        value: 1000
      },
      target:{
        endAngle: 0.9974692393028675
        index: 0
        startAngle: 0.9239095608882018
        subindex: 0
        value: 1000
      }
    }
]
groups:[
  {
    angle: 0.49873461965143373
    endAngle: 0.9974692393028675
    index: 0
    name: "北京"
    startAngle: 0
    value: 13560
  }
]
```

### 基本数据

**原始数据**
`city_name`容易理解即数据有几列,`matrix`为一个`n*n`的矩阵，分别表示各个数据项与各个数据项`n*n`的对应关系。

```javascript
  const city_name = ["北京", "上海", "广州", "深圳", "香港"];
  const matrix = [
    [1000, 3045, 4567, 1234, 3714],
    [3214, 2000, 2060, 124, 3234],
    [8761, 6545, 3000, 8045, 647],
    [3211, 1067, 3214, 4000, 1006],
    [2146, 1034, 6745, 4764, 5000]
  ];
```

**间隔角度**

```javascript
0.03
```

### 执行逻辑

1. 计算矩阵的、总和、每行的和(作为其中一个group的值)
2. 根据给出的间隔角度计算**单位数值**占2*pi的比例
3. 计算矩阵中的每一个数据项的起止角度，后一个数据项的开始角度为上一个数据项的结束角度

### 核心代码

```javascript
function chord(matrix) {
    var n = matrix.length,
        groupSums = [],
        groupIndex = range(n),
        subgroupIndex = [],
        chords = [],
        groups = chords.groups = new Array(n),
        subgroups = new Array(n * n),
        k,
        x,
        x0,
        dx,
        i,
        j;

    // 这里计算了每个数据项的和
    // 例如计算了北京的数据总和为 13560
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(range(n));
      k += x;
    }

    // 必要的话 会对组 也就是表述环大小的数据 做个排序使图更好看
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a], groupSums[b]);
    });

    // 必要的话 会对组内的各个数据项 也就是表示连接关系数据 做个排序使图更好看
    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
      d.sort(function(a, b) {
        return sortSubgroups(matrix[i][a], matrix[i][b]);
      });
    });


    k = max(0, tau - padAngle * n) / k;
    // 计算了单位数值 占的角度大小
    dx = k ? padAngle : tau / n;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            // 起止角度从0开始算，每个数据项的角度为 当前数据项数值*k
            // 下一个数据项的开始角度为上一个数据项的终止角度加间隔角度
            a0 = x,
            a1 = x += v * k;

        // 这里根据 当前数据项的值 计算了每一个子项的起止角度，并给了一个编号
        subgroups[dj * n + di] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      // 计算了每个组的起止角度 原理相同
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: groupSums[di]
      };
      x += dx;
    }

    // 根据n*n矩阵自带的对应关系,从subgroups中取出对应的数据项在对应的组中的起止角度。
    // 并写入 source target
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[j * n + i],
            target = subgroups[i * n + j];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    return sortChords ? chords.sort(sortChords) : chords;
  }

```

## 参考 & 引用

https://d3js.org.cn/document/d3-chord/#api-reference

https://www.jianshu.com/p/4b44c708c2da

https://www.pianshen.com/article/9705100564/
