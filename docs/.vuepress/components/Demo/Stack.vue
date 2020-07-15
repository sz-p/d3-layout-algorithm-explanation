<template>
  <div ref="svgBox" class="svgBox"></div>
</template>
<script>
import * as d3 from "d3";
import { getDefauteParams } from "./utils";
export default {
  data() {
    return {
      keys: ["apple", "samsung", "huawei", "oppo", "xiaomi", "others"],
      oriData: [
        {
          year: 2017,
          quarter: 2,
          samsung: 0.229,
          apple: 0.118,
          huawei: 0.11,
          oppo: 0.08,
          xiaomi: 0.062,
          others: 0.401
        },
        {
          year: 2017,
          quarter: 3,
          samsung: 0.221,
          apple: 0.124,
          huawei: 0.104,
          oppo: 0.081,
          xiaomi: 0.075,
          others: 0.396
        },

        {
          year: 2017,
          quarter: 4,
          samsung: 0.189,
          apple: 0.196,
          huawei: 0.107,
          oppo: 0.069,
          xiaomi: 0.071,
          others: 0.368
        },
        {
          year: 2018,
          quarter: 1,
          samsung: 0.235,
          apple: 0.157,
          huawei: 0.118,
          oppo: 0.074,
          xiaomi: 0.084,
          others: 0.332
        }
      ],
      barWidth: 50
    };
  },
  methods: {
    layout() {
      this.getTimePoint = d => {
        const _d = d.data ? d.data : d;
        return `${_d.year}-${_d.quarter}`;
      };
      this.stackMax = serie => d3.max(serie, d => (d ? d[1] : 0));
      this.stackMin = serie => d3.min(serie, d => (d ? d[0] : 0));

      this.layouter = d3
        .stack()
        .keys(this.keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

      // 输出
      this.layoutData = this.layouter(this.oriData);

      this.y = d3
        .scaleLinear()
        .domain([
          d3.max(this.layoutData, this.stackMax),
          d3.min(this.layoutData, this.stackMin)
        ])
        .range([0, this.height - this.padding.bottom]);
      this.xScale = d3
        .scalePoint()
        .domain(this.oriData.map(this.getTimePoint))
        .range([0, this.width])
        .padding(0.2);

      this.xScalePoint = d3
        .scalePoint()
        .domain(this.oriData.map(this.getTimePoint))
        .range([0, this.width])
        .padding(0.2);
    },
    render() {
      const svg = d3
        .select(this.dom)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      const g = svg
        .selectAll("g")
        .data(this.layoutData)
        .enter()
        .append("g")
        .attr("fill", (d, i) => this.color(i))
        .selectAll("rect")
        .data(d => d)
        .enter()
        .append("rect")
        .attr("x", d => {
          const scaledX = this.xScale(this.getTimePoint(d));
          return scaledX - this.barWidth / 2;
        })
        .attr("y", d => this.y(d[1]))
        .attr("width", this.barWidth)
        .attr("height", d => {
          return this.y(d[0]) - this.y(d[1]);
        });

      const axis = d3.axisBottom(this.xScalePoint);
      svg
        .append("g")
        .attr("transform", `translate(0, ${this.height - this.padding.bottom})`)
        .attr("color", "White")
        .call(axis);

      d3.select(this.dom)
        .append("div")
        .style("width", this.width + "px")
        .style("display", "flex")
        .style("justify-content", "space-around")
        .style("position", "absolute")
        .selectAll(".legend")
        .data(this.keys)
        .enter()
        .append("div")
        .attr("class", "legend")
        .text(d => d)
        .style("color", (d, i) => this.color(i));
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
