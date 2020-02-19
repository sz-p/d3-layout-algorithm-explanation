import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./pie.scss";
import * as d3 from 'd3';

function Pie() {
  const chartArea = useRef();

  const oriData = [
    { 'x': 'A计划', 'y': 20 },
    { 'x': 'B计划', 'y': 40 },
    { 'x': 'C计划', 'y': 90 },
    { 'x': 'D计划', 'y': 80 },
    { 'x': 'E计划', 'y': 120 },
    { 'x': 'F计划', 'y': 100 },
    { 'x': 'G计划', 'y': 60 }
  ];

  const width = 400;
  const height = 600;

  //设置饼图的半径
  let radius = Math.min(width, height) * 0.8 / 2

  let arc = d3.arc()
    .innerRadius(70)
    .cornerRadius(10)

  let color = d3.scaleOrdinal(d3.schemeCategory10)

  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g')

    console.log(oriData);
    let drawData = d3
      .pie()
      .value(function (d) {
        return d.y
      })
      .sort(null)
      .sortValues(null)
      .startAngle(0)
      .endAngle(Math.PI * 2)
      .padAngle(0.05)(oriData)
    console.log(drawData);

    g.append('g')
      .attr('transform', 'translate( ' + width / 2 + ', ' + height / 2 + ' )')
      .selectAll('path')
      .data(drawData)
      .enter()
      .append('path')
      .attr('stroke', (d) => color(d.index))
      .attr('stroke-width', 1)
      .attr('fill', (d) => color(d.index))
      .attr('d', (d) => {
        d.outerRadius = radius;
        return arc(d)
      });
  }, [arc, color, oriData, radius])



  return (
    [<div key={'treemap'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Pie;
