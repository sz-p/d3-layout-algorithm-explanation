<template>
  <div ref="svgBox" class="svgBox"></div>
</template>
<script>
import * as d3 from "d3";
import { getDefauteParams } from "./utils";
import nodeData from "./Hierarchy";

export default {
  data() {
    return {};
  },
  methods: {
    layout() {
      this.layouter = d3
        .treemap()
        .size([this.width, this.height])
        .tile(d3.treemapResquarify);
      // 输出
      this.layoutData = this.layouter(nodeData).leaves();
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      const g = svg
        .selectAll(".rects")
        .data(this.layoutData)
        .enter()
        .append("g")
        .attr("class", "rects");
      // 添加矩阵
      g.append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .style("fill", d => this.color(d.parent.data.name))
        .style("stroke", "#cccccc");
      // 添加描述
      g.append("text")
        .attr("x", d => (d.x1 - d.x0) / 2 + d.x0)
        .attr("y", d => (d.y1 - d.y0) / 2 + d.y0)
        .attr("dx", d => {
          return -d.data.name.length / 2 + "em";
        })
        .attr("dy", d => {
          return "-0.5em";
        })
        .text(d => {
          return d.data.name;
        })
        .attr("font-size", d => {
          return 14 - d.depth + "px";
        })
        .attr("fill", "#f0f0f0");
      g.append("text")
        .attr("x", d => (d.x1 - d.x0) / 2 + d.x0)
        .attr("y", d => (d.y1 - d.y0) / 2 + d.y0)
        .attr("dx", d => {
          return -(d.value.toString().length + 2) / 4 + "em";
        })
        .attr("dy", d => {
          return "1em";
        })
        .text(d => {
          return "(" + d.value + ")";
        })
        .attr("font-size", d => {
          return 14 - d.depth + "px";
        })
        .attr("fill", "#ffffff");
    }
  },
  mounted() {
    getDefauteParams.bind(this)();
    this.layout();
    this.render();
  }
};
</script>
<style lang="less" scoped>
.svgBox {
  width: 100%;
  height: 300px;
  background: rgb(40, 44, 52);
}
</style>
