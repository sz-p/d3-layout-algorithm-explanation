<template>
  <div ref="svgBox" class="svgBox"></div>
</template>
<script>
import * as d3 from "d3";
import data from "./ForceData/data.json";

import { getDefauteParams } from "./utils";
export default {
  data() {
    return {
      currNodes: data.nodes,
      currLinks: data.links
    };
  },
  methods: {
    dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragstarted(d) {
      if (!d3.event.active) this.layouter.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragended(d) {
      if (!d3.event.active) this.layouter.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    layout() {
      this.layouter = d3
        .forceSimulation(this.currNodes)
        .force(
          "link",
          d3.forceLink().id(function(d) {
            return d.id;
          })
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.width / 2, this.height / 2));
      this.layouter.force("link").links(this.currLinks);
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      const link = svg
        .append("g")
        .selectAll("line")
        .data(this.currLinks)
        .enter()
        .append("line")
        .attr("stroke","rgba(255,255,255,0.8)");

      const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.currNodes)
        .enter()
        .append("circle")
        .attr("r", 2.5)
        .attr("fill", d => {
          return this.color(d.group);
        })
        .call(
          d3
            .drag()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
      this.layouter.on("tick", ticked);

      function ticked() {
        link
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        node
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });
      }
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
  height: 500px;
  background: rgb(40, 44, 52);
}
.links line {
  stroke: #fff;
}

.nodes circle {
  pointer-events: all;
  stroke: none;
  stroke-width: 40px;
}
</style>
