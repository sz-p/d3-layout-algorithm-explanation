import React, { useRef, useEffect } from 'react';
import styles from "./pack.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import hierarchyData from '../../components/hierarchy';
import { transform } from '@babel/core';

function Pack() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;

  console.log(hierarchyData);
  const packData = d3.pack()
    .size([width, height])(hierarchyData).descendants();
  console.log(packData);


  let color = d3.scaleOrdinal(d3.schemeCategory10)

  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const nodes = svg.selectAll('.node')
      .data(packData)
      .enter()
      .append('g')
      .attr('transform', d => "translate(" + d.x + "," + d.y + ")")
      .attr('class', 'node')

    nodes.append("circle")
      .attr('fill', (d, i) => color(i))
      .attr("r", d => d.r);

    nodes.append('text')
      .text((d) => { if (!d.children) return d.data.name })
      .attr('font-size', (d) => { return 14 - d.depth + 'px' })
      .attr('text-anchor', "middle")
      .attr('dominant-baseline', "middle")
      .attr('fill', '#ffffff')

  }, [color, packData])



  return (
    [<div key={'pack'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Pack;
