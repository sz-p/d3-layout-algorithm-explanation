<template>
  <div ref="svgBox" class="svgBox"></div>
</template>
<script>
import * as d3 from "d3";
import { getDefauteParams } from "./utils";
import nodeData from "./Hierarchy";

export default {
  data() {
    return {
      //输入
      startAngle: 0,
      endAngle: Math.PI * 2,
      oriData: [
        { x: "A计划", y: 20 },
        { x: "B计划", y: 40 },
        { x: "C计划", y: 90 },
        { x: "D计划", y: 80 },
        { x: "E计划", y: 120 },
        { x: "F计划", y: 100 },
        { x: "G计划", y: 60 }
      ]
    };
  },
  methods: {
    layout() {
      this.layouter = d3.partition().size([this.width, this.height]);

      // 输出
      this.layoutData = this.layouter(nodeData).descendants();
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      let g = svg
        .selectAll("g")
        .data(this.layoutData)
        .enter()
        .append("g");

      g.append("rect")
        .attr("x", function(d) {
          return d.x0;
        })
        .attr("y", function(d) {
          return d.y0;
        })
        .attr("width", function(d) {
          return d.x1 - d.x0;
        })
        .attr("height", function(d) {
          return d.y1 - d.y0;
        })
        .style("stroke", "#ccc")
        .style("fill", d => {
          return this.color(d.data.name);
        });
      g.append("text")
        .attr("x", function(d) {
          return d.x0;
        })
        .attr("y", function(d) {
          return d.y0;
        })
        .attr("dx", function(d) {
          return (d.x1 - d.x0) / 2;
        }) // 文字水平居中
        .attr("dy", function(d) {
          return (d.y1 - d.y0) / 2 - (d.data.name.length / 2) * 12;
        }) // 文字垂直居中,有点瑕疵
        .attr("font-size", function(d) {
          return 12 - d.depth + "px";
        }) // 文字按深度缩小
        .attr("writing-mode", "tb") // 文字从上往下书写
        .text(function(d) {
          return d.data.name;
        });
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
