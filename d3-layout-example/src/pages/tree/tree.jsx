import React, { useRef, useEffect } from 'react';
import styles from "./tree.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import hierarchyData from '../../components/hierarchy';

function Tree() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;

  const padding = 30;

  console.log(hierarchyData);
  // hierarchyData.eachAfter((d)=>console.log(d));
  // hierarchyData.eachBefore((d)=>console.log(d.data.name));
  const treeData = d3.tree()
    .size([width, height])(hierarchyData);
  console.log(treeData);

  const getPath = function (d) {
    return "M" + d.source.x + "," + d.source.y + "H" + d.target.x + "V" + d.target.y;
  }

  let color = d3.scaleOrdinal(d3.schemeCategory10)

  let nodeR = function (d) {
    return 40 - d.depth * 12;
  }
  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', () => `-${padding},-${padding},${width + padding},${height + padding}`)

    const links = svg.selectAll('.link')
      .data(treeData.links())
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("d", d => getPath(d));

    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('transform', d => "translate(" + d.x + "," + d.y + ")")
      .attr('class', 'node')

    nodes.append("circle")
      .attr('fill', (d, i) => color(i))
      .attr("r", (d) => nodeR(d));

    nodes.append('text')
      .text((d) => d.data.name)
      .attr('font-size', (d) => { return nodeR(d) / 2 + 'px' })
      .attr('text-anchor', "middle")
      .attr('dominant-baseline', "middle")
      .attr('fill', '#ffffff')
  }, [treeData, color])



  return (
    [<div key={'tree'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Tree;
