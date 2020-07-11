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
      thresholds: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      oriData: d3.range(1000).map(function() {
        return d3.randomBates(10)();
      })
    };
  },
  methods: {
    layout() {
      this.xScale = d3
        .scaleLinear()
        .range([this.padding.left, this.width - this.padding.right]);

      this.layouter = d3
        .histogram()
        .domain(this.xScale.domain())
        .thresholds(this.thresholds);
      this.layoutData = this.layouter(this.oriData);

      this.yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.layoutData, function(d) {
            return d.length;
          })
        ])
        .range([this.height - this.padding.bottom, this.padding.top]);
      this.xAxis = d3
        .axisBottom()
        .scale(this.xScale)
        .ticks(10);
      this.yAxis = d3
        .axisLeft()
        .scale(this.yScale)
        .ticks(10);
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
      svg
        .append("g")
        .call(this.xAxis)
        .attr(
          "transform",
          "translate(0," + (this.height - this.padding.bottom) + ")"
        )
        .attr("color", "White");

      svg
        .append("g")
        .call(this.yAxis)
        .attr("transform", "translate(" + this.padding.left + ",0)")
        .attr("color", "White");

      const bar = svg
        .selectAll(".bar")
        .data(this.layoutData)
        .join("g")
        .attr("class", "bar")
        .attr("transform", d => {
          return (
            "translate(" + this.xScale(d.x0) + "," + this.yScale(d.length) + ")"
          );
        });

      // 构造柱
      bar
        .append("rect")
        .attr("x", 1)
        .attr("fill", (d, i) => this.color(i))
        .attr(
          "width",
          this.xScale(this.layoutData[0].x1) -
            this.xScale(this.layoutData[0].x0) -
            1
        )
        .attr("height", d => {
          return this.height - this.yScale(d.length) - this.padding.bottom;
        });

      bar
        .append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr(
          "x",
          (this.xScale(this.layoutData[0].x1) -
            this.xScale(this.layoutData[0].x0)) /
            2
        )
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "White")
        .text(function(d) {
          return d.length;
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
