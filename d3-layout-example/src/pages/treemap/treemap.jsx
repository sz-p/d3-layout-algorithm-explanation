import React, { useRef, useEffect } from 'react';
import styles from "./treemap.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

function TreeMap() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;

  let data = {
    'name': '中国',
    'value': '950',
    'children': [
      {
        'name': '浙江',
        'value': '450',
        'children':
          [
            { 'name': '杭州', 'value': '150' },
            { 'name': '宁波', 'value': '120' },
            { 'name': '温州', 'value': '130' },
            { 'name': '绍兴', 'value': '50' }
          ]
      },
      {
        'name': '广西',
        'value': '200',
        'children': [
          { 'name': '桂林', 'value': '80' },
          { 'name': '南宁', 'value': '50' },
          { 'name': '柳州', 'value': '30' },
          { 'name': '防城港', 'value': '40' }
        ]
      },
      {
        'name': '黑龙江',
        'value': '200',
        'children': [
          { 'name': '哈尔滨', 'value': '50' },
          { 'name': '齐齐哈尔', 'value': '40' },
          { 'name': '牡丹江', 'value': '60' },
          { 'name': '大庆', 'value': '50' }
        ]
      },
      {
        'name': '新疆',
        'value': '100',
        'children':
          [
            { 'name': '乌鲁木齐', 'value': '30' },
            { 'name': '克拉玛依', 'value': '20' },
            { 'name': '吐鲁番', 'value': '25' },
            { 'name': '哈密', 'value': '25' }
          ]
      }
    ]
  }

  let color = d3.scaleOrdinal(d3.schemeCategory10)
  console.log(data);
  let treemap = d3.treemap();
  treemap.size([width, height]);
  treemap.tile(d3.treemapResquarify);

  let hierarchyData = d3.hierarchy(data)
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
