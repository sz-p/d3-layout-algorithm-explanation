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
      city_name: ["北京", "上海", "广州", "深圳", "香港"],
      padAngle: 0.03,
      oriData: [
        [1000, 3045, 4567, 1234, 3714],
        [3214, 2000, 2060, 124, 3234],
        [8761, 6545, 3000, 8045, 647],
        [3211, 1067, 3214, 4000, 1006],
        [2146, 1034, 6745, 4764, 5000]
      ]
    };
  },
  methods: {
    layout() {
      this.layouter = d3
        .chord()
        .padAngle(this.padAngle)
        .sortSubgroups(d3.descending);
      // 输出
      this.layoutData = this.layouter(this.oriData);

      this.outerRadius = Math.min(this.width, this.height) * 0.5 - 40;
      this.innerRadius = this.outerRadius - 30;
      this.ribbon = d3.ribbon().radius(this.innerRadius);
      this.arc = d3
        .arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius);
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
            `-${this.padding.padding},-${this.padding.padding},${this.width +
              this.padding.padding},${this.height + this.padding.padding}`
        );

      var g = svg
        .append("g")
        .attr(
          "transform",
          "translate(" + this.width / 2 + "," + this.height / 2 + ")"
        )
        .datum(this.layoutData);

      var group = g
        .append("g")
        .attr("class", "groups")
        .selectAll("g")
        .data(function(chords) {
          return chords.groups;
        })
        .enter()
        .append("g");

      group
        .append("path")
        .style("fill", function(d) {
          return d3.schemeCategory10[d.index];
        })
        .style("stroke", d => {
          return d3.rgb(this.color(d.index)).darker();
        })
        .attr("class", "outerPath")
        .attr("d", this.arc);
      g.selectAll(".outerText")
        .data(this.layoutData.groups)
        .enter()
        .append("text")
        .each((d, i) => {
          d.angle = (d.startAngle + d.endAngle) / 2;
          d.name = this.city_name[i];
        })
        .attr("class", "outText")
        .attr("fill", "#fff")
        .attr("dy", ".35em")
        .attr("transform", d => {
          var result = "rotate(" + (d.angle * 180) / Math.PI + ")";
          result += "translate(0," + -1.0 * (this.outerRadius + 10) + ")";
          if (d.angle > (Math.PI * 3) / 4 && d.angle < (Math.PI * 5) / 4) {
            result += "rotate(180)";
          }
          return result;
        })
        .text(function(d) {
          return d.name;
        });

      g.selectAll(".innerPath")
        .data(this.layoutData)
        .enter()
        .append("path")
        .attr("class", "innerPath")
        .attr("d", this.ribbon)
        .style("fill", function(d) {
          return d3.schemeCategory10[d.source.index];
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
