<template>
  <div ref="svgBox" class="svgBox"></div>
</template>
<script>
import * as d3 from "d3";
import { getDefauteParams } from "./utils";
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
      this.radius = (Math.min(this.width, this.height) * 0.8) / 2;
      this.arc = d3.arc().innerRadius(0);

      this.layouter = d3
        .pie()
        .value(function(d) {
          return d.y;
        })
        .sort(null)
        .sortValues(null)
        .startAngle(this.startAngle)
        .endAngle(this.endAngle);

      // 输出
      this.layoutData = this.layouter(this.oriData);
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
      const g = svg.append("g");

      g.append("g")
        .attr(
          "transform",
          "translate( " + this.width / 2 + ", " + this.height / 2 + " )"
        )
        .selectAll("path")
        .data(this.layoutData)
        .enter()
        .append("path")
        .attr("stroke", d => this.color(d.index))
        .attr("stroke-width", 1)
        .attr("fill", d => this.color(d.index))
        .attr("d", d => {
          d.outerRadius = this.radius;
          return this.arc(d);
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
