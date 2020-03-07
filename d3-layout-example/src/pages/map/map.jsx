import React, { useRef, useEffect, useCallback } from 'react';
import styles from "./map.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import chinaMap from './china.json';

function Map() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;

  const projection = d3
    .geoMercator()
    .center([107, 31])
    .scale(350)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  let color = d3.scaleOrdinal(d3.schemeCategory10)

  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
      .selectAll('g')
      .data(chinaMap.features)
      .enter()
      .append('g')
      .append('path')
      .attr('d', path)
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('opacity', 0.6)
      .attr('fill', (d, i) => color(i))
      .on('mouseover', function () {
        d3.select(this).attr('opacity', 1);
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', 0.6);
      });

    svg
      .selectAll('g')
      .append('text')
      .attr('font-size', 8)
      .attr('text-anchor', 'middle')
      .attr('x', d => {
        const position = projection(d.properties.centroid || [0, 0]);
        return position[0];
      })
      .attr('y', d => {
        const position = projection(d.properties.centroid || [0, 0]);
        return position[1];
      })
      .attr('dy', d => {
        if (d.properties.name === '澳门') {
          return 15;
        }
      })
      .text(d => d.properties.name);

  }, [color, path, projection])



  return (
    [<div key={'map'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Map;
