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
      this.layouter = d3.tree().size([this.width, this.height]);
      // 输出
      this.layoutData = this.layouter(nodeData);
      this.getPath = function (d) {
        return (
          "M" +
          d.source.x +
          "," +
          d.source.y +
          "H" +
          d.target.x +
          "V" +
          d.target.y
        );
      };
      this.nodeR = function (d) {
        return 40 - d.depth * 12;
      };
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr(
          "viewBox",
          () =>
            `-${this.padding.padding + 30},-${this.padding.padding + 30},${
              this.width + this.padding.padding + 30
            },${this.height + this.padding.padding + 80}`
        );

      svg
        .selectAll(".link")
        .data(this.layoutData.links())
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1)
        .attr("d", (d) => this.getPath(d));

      const nodes = svg
        .selectAll(".node")
        .data(this.layoutData.descendants())
        .enter()
        .append("g")
        .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
        .attr("class", "node");

      nodes
        .append("circle")
        .attr("fill", (d, i) => this.color(i))
        .attr("r", (d) => this.nodeR(d));

      nodes
        .append("text")
        .text((d) => d.data.name)
        .attr("font-size", (d) => {
          return this.nodeR(d) / 2 + "px";
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#ffffff");
    },
  },
  mounted() {
    getDefauteParams.bind(this)();
    this.layout();
    this.render();
  },
};
</script>
<style lang="less" scoped>
.svgBox {
  width: 100%;
  height: 300px;
  background: rgb(40, 44, 52);
}
</style>
