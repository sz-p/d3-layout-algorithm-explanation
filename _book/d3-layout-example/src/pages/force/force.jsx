import React, { useRef, useEffect, useCallback } from 'react';
import styles from "./force.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import data from './data.json';

function Force() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;
  console.log(data);
  let currNodes = data.nodes;
  let currLinks = data.links;

  var simulation = d3.forceSimulation(currNodes)
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation.on('end', () => {
    console.log(data);
  });


  let color = d3.scaleOrdinal(d3.schemeCategory10)

  const dragstarted = useCallback(d => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }, [simulation])

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  const dragended = useCallback(d => {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }, [simulation])

  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const link = svg.append("g")
      .attr("class", styles.links)
      .selectAll("line")
      .data(currLinks)
      .enter().append("line");

    var node = svg.append("g")
      .attr("class", styles.nodes)
      .selectAll("circle")
      .data(currNodes)
      .enter().append("circle")
      .attr("r", 2.5)
      .attr("fill", function (d) { return color(d.group); })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text(d => d.id);

    simulation
      .on("tick", ticked);

    simulation
      .force("link")
      .links(data.links);

    function ticked() {
      link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
    }

  }, [color, currLinks, currNodes, dragended, dragstarted, simulation])



  return (
    [<div key={'force'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Force;
