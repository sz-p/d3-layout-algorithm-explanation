# D3 布局算法详解

本文会陆续更新一些D3的布局算法说明，包括数据的**输入**，**输出**，代码的**执行逻辑**，以及**源码注释**。

## [饼图Pie](./饼图.md)

<RecoDemo>
  <Demo-Pie slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Pie.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Pie.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Pie.vue?style
  </template>
</RecoDemo>

饼图是一种将数据大小映射到扇形角度的可视化图表。

该模块以`开始角度`、`结束角度`作为输入，将数据中给出的值按比例映射到`开始角度`到`结束角度`这个区间内。

## [直方图Histogram](./直方图.md)

<RecoDemo>
  <Demo-Histogram slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Histogram.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Histogram.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Histogram.vue?style
  </template>
</RecoDemo>


直方图(Histogram)，又称质量分布图，是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。 一般用横轴表示数据类型，纵轴表示分布情况。

该模块依赖一个`区间(domain)`以及`阈值(threshold)`,统计`数据(data)`的分布情况,输出一个`分箱(bins)`每个`箱`划分了箱子的范围以及包含的值,区间限定了值的范围,通常为`数据(data)`值的范围,`阈值(threshold)`规定了每个箱子的范围。

## [弦图Chord](./弦图.md)

<RecoDemo>
  <Demo-Chord slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Chord.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Chord.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Chord.vue?style
  </template>
</RecoDemo>

弦图主要用于展示多个对象之间的关系，连接圆上任意两点的线段叫做弦，弦（两点之间的连线）就代表着两者之间的关联关系。弦图主要有以下特点：

+ 用圆上的两点的连线来表示两者的关系。
+ 连接线的宽度可以表示两个数据之间的关系程度或者比例关系。
+ 弧线与圆的接触面积上的宽度也可以用来表示关系程度和比例关系。
+ 可以使用不同的颜色来区分不同的关系。

该模块依赖一个`n*n`的`matrix`矩阵,以及各行**数据的名称**和**间隔角度**，输出一个包含**连接信息**和**分区信息**的布局结果。其中**连接信息**包含`source`,`target`分别描述起止节点，其中又包含`startAngle`,`endAngle`分别表示**开始点**的起止角度和**结束点**的起止角度。单位为弧度制。**分区信息**包含`startAngle`,`endAngle`来描述各个分区的起止角度。

## [堆叠图Stack](./堆叠图.md)

<RecoDemo>
  <Demo-Stack slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Stack.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Stack.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Stack.vue?style
  </template>
</RecoDemo>

该模块依赖`数据项(keys)`其提供了`原始数据数据(data)`中所需要堆积的数据项的条目。最终返回`布局信息`。堆积数据包含`原始数据数据(data)`中每一项的所占的起始值和结束值。详情见[输入](/堆叠图#输入),及[输出](/堆叠图#输出)。

## [力学图Force](./力学图)

<RecoDemo>
  <Demo-Force slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Force.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Force.vue?script
  </template>
  <template slot="code-data">
    <<< @/docs/.vuepress/components/Demo/ForceData/data.json?json
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Force.vue?style
  </template>
</RecoDemo>

这个模块实现了用以模拟粒子物理运动的 [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) 数值积分器。仿真的演化: 它假设任意单位时间步长 Δ*t* = 1，所有的粒子的单位质量常量 *m* = 1。作用在每个粒子上的合力 *F* 相当于在单位时间 Δ*t* 内的恒定加速度 *a*。并且可以简单的通过为每个粒子添加速度并计算粒子的位置来模拟仿真。

该模块依赖[节点和连接信息](/力学图#节点和连接信息)，以及一些[基本力](/力学图#基本力)。向[节点信息](/力学图#节点信息)中写入每个节点的坐标，将[连接信息](/力学图#连接信息)中的`source`，`target`部分修改为对应的节点引用。


## [层级布局Hierarchy](./层级布局.md)

> 层级布局模块一般不直接用于绘图，而是为一些基于层级布局结构的布局算法提供基础数据结构。

一个好的层次结构可视化能促进快速的促进多尺度推理: 对单个单元的微观观察和对整体的宏观观察.

许多数据集从从本质上是嵌套结构的。例如一个[族谱结构](/层级布局#族谱结构)。

该模块依赖一个`族谱结构`，将族谱结构的的数据按照层级结构进行格式化，最终生成`布局信息`。详情见[输入](/层级布局#输入)，[输出](/层级布局#输出)。

## [集群Cluster](./集群)

<RecoDemo>
  <Demo-Cluster slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Cluster.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Cluster.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Cluster.vue?style
  </template>
</RecoDemo>


集群,是[层级布局(Hierarchy)](/层级布局)的一种。

该模块依赖一个[层级布局(Hierarchy)](./层级布局#布局信息)结果,和一个[画布区大小(size)](/集群#画布区大小size)。输出一个[集群数据Cluster](/集群#布局信息),将层级布局数据中的节点赋予`x`和`y`坐标。集群图从叶子节点开始，自底向上，每一层节点对齐。

## [矩阵树Treemap](./矩阵树)

<RecoDemo>
  <Demo-TreeMap slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/TreeMap.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/TreeMap.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/TreeMap.vue?style
  </template>
</RecoDemo>

矩阵树,是[层级布局(Hierarchy)](/层级布局)的一种。

该模块依赖一个[层级布局(Hierarchy)](./层级布局#布局信息)结果,和一个[画布区大小(size)](/矩阵树#画布区大小size)。输出一个[矩阵树数据Treemap](/矩阵树#布局信息),本质上是给[层级布局(Hierarchy)](./层级布局#布局信息)写入了两个坐标，这两个坐标构成的区域即为该分区的可视化信息。详情见[输入](/矩阵树#输入),及[输出](/矩阵树#输出)。


## [分区Partition](./分区图.md)

<RecoDemo>
  <Demo-Partition slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Partition.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Partition.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Partition.vue?style
  </template>
</RecoDemo>

分区图，是[层级布局(Hierarchy)](/层级布局)的一种

该模块依赖一个[层级布局(Hierarchy)](/层级布局#布局信息)结果,和一个`画布区大小(size)`。输出一个`布局信息`,`布局信息`本质上是给`层级布局(Hierarchy)`写入了两个坐标，这两个坐标构成的区域即为该分区的可视化信息。详情见[输入](/分区图#输入)，及[输出](/分区图#输出)。

## [层包Pack](./层包.md)

<RecoDemo>
  <Demo-Pack slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Demo/Pack.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Demo/Pack.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Demo/Pack.vue?style
  </template>
</RecoDemo>

图使用嵌套来表示层次结构。最里层表示叶节点的圆的大小用来编码定量的维度值。每个圆都表示当前节点的近似累计大小，因为有空间浪费以及变形；仅仅只有叶节点可以准确的比较。尽管 circle packing 不能高效的利用空间，但是能更突出的表示层次结构。

该模块利用[层级布局(Hierarchy)](/层级布局#布局信息)的数据进行包布局[坐标计算](#核心代码)。为层级布局数据添加[布局信息](#布局信息)用于绘制图形。
