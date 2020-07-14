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
      this.layouter = d3.pack().size([this.width, this.height]);
      // 输出
      this.layoutData = this.layouter(nodeData).descendants();
      console.log(this.layouter(nodeData))
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      const nodes = svg
        .selectAll(".node")
        .data(this.layoutData)
        .enter()
        .append("g")
        .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
        .attr("class", "node");

      nodes
        .append("circle")
        .attr("fill", (d, i) => this.color(i))
        .attr("r", d => d.r);

      nodes
        .append("text")
        .text(d => {
          if (!d.children) return d.data.name;
        })
        .attr("font-size", d => {
          return 14 - d.depth + "px";
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
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
