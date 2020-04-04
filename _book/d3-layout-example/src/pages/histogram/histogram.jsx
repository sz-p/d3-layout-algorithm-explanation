import React, { useRef, useEffect } from 'react';
import styles from "./histogram.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

function Histogram() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;

  const padding = {
    top: 10,
    right: 40,
    bottom: 40,
    left: 40
  };;

  const data = d3.range(1000).map(function () {
    return d3.randomBates(10)();
  });

  console.log(data);
  const xScale = d3.scaleLinear()
    .range([padding.left, width - padding.right]);


  const histogramData = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(10))(data);

  console.log(histogramData);


  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(10);
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(histogramData,
      function (d) {
        return d.length;
      })])
    .range([height - padding.bottom, padding.top]);
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10);
  let color = d3.scaleOrdinal(d3.schemeCategory10)

  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.append('g')
      .call(xAxis)
      .attr("transform", "translate(0," + (height - padding.bottom) + ")");

    svg.append('g')
      .call(yAxis)
      .attr("transform", "translate(" + padding.left + ",0)");

    const bar = svg.selectAll(".bar")
      .data(histogramData)
      .join("g")
      .attr("class", "bar")
      .attr("transform",
        function (d) {
          return "translate(" + xScale(d.x0) + "," + yScale(d.length) + ")";
        });
    // 构造柱
    bar.append("rect")
      .attr("x", 1)
      .attr('fill', (d, i) => color(i))
      .attr("width", xScale(histogramData[0].x1) - xScale(histogramData[0].x0) - 1)
      .attr("height",
        function (d) {
          return height - yScale(d.length) - padding.bottom;
        });

    bar.append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", (xScale(histogramData[0].x1) - xScale(histogramData[0].x0)) / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("fill", "White")
      .text(function (d) {
        return d.length;
      });
  }, [color, histogramData, padding.bottom, padding.left, xAxis, xScale, yAxis, yScale])



  return (
    [<div key={'histogram'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Histogram;
