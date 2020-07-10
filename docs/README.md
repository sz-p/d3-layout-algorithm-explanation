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

饼图是一种将数据大小映射到扇形角度的可视化图表。该模块以`开始角度`、`结束角度`作为输入，将数据中给出的值按比例映射到`开始角度`到`结束角度`这个区间内。

## [直方图Histogram](./直方图.md)

<RecoDemo>
  <Demo-Histogram slot="demo" />
  <template slot="code-template">
    <<< @/docs/.vuepress/components/Histogram/Pie.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/components/Histogram/Pie.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/components/Histogram/Pie.vue?style
  </template>
</RecoDemo>


直方图(Histogram)，又称质量分布图，是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。 一般用横轴表示数据类型，纵轴表示分布情况。该模块依赖一个`区间(domain)`以及`阈值(threshold)`,统计`数据(data)`的分布情况,输出一个`分箱(bins)`每个`箱`划分了箱子的范围以及包含的值,区间限定了值的范围,通常为`数据(data)`值的范围,`阈值(threshold)`规定了每个箱子的范围。
