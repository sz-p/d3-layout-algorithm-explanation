import React, { useRef, useEffect } from 'react';
import styles from "./treemap.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import hierarchyData from '../../components/hierarchy';

function TreeMap() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;



  let color = d3.scaleOrdinal(d3.schemeCategory10)
  let treemap = d3.treemap();
  treemap.size([width, height]);
  treemap.tile(d3.treemapResquarify);

  console.log(hierarchyData);
  let treemapData = treemap(hierarchyData);
  console.log(treemapData);
  const leaves = treemapData.leaves() // 将生成的树形结构转化成叶子节点数组
  console.log(leaves);
  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const g = svg.selectAll('.rects')
      .data(leaves)
      .enter()
      .append('g')
      .attr('class', 'rects')
    // 添加矩阵
    g.append('rect')
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('width', (d) => (d.x1 - d.x0))
      .attr('height', (d) => (d.y1 - d.y0))
      .style('fill', (d) => color(d.parent.data.name))
      .style('stroke', '#cccccc')
    // 添加描述
    g.append('text')
      .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
      .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
      .attr('dx', (d) => { return -d.data.name.length / 2 + 'em' })
      .attr('dy', (d) => { return '-0.5em' })
      .text((d) => { return d.data.name })
      .attr('font-size', (d) => { return 14 - d.depth + 'px' })
      .attr('fill', '#f0f0f0')
    g.append('text')
      .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
      .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
      .attr('dx', (d) => { return -(d.value.toString().length + 2) / 4 + 'em' })
      .attr('dy', (d) => { return '1em' })
      .text((d) => { return '(' + d.value + ')' })
      .attr('font-size', (d) => { return 14 - d.depth + 'px' })
      .attr('fill', '#ffffff')

  }, [color, leaves])



  return (
    [<div key={'treemap'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default TreeMap;
