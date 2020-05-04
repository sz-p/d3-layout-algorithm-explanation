import React, { useRef, useEffect } from 'react';
import styles from "./chord.scss";
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

function Chord() {
  const chartArea = useRef();

  const width = 400;
  const height = 600;

  const padding = 30;

  const city_name = ["北京", "上海", "广州", "深圳", "香港"];
  const matrix = [
    [1000, 3045, 4567, 1234, 3714],
    [3214, 2000, 2060, 124, 3234],
    [8761, 6545, 3000, 8045, 647],
    [3211, 1067, 3214, 4000, 1006],
    [2146, 1034, 6745, 4764, 5000]
  ];

  const chord = d3
    .chord()
    .padAngle(0.03)
    .sortSubgroups(d3.descending);


  let color = d3.scaleOrdinal(d3.schemeCategory10)

  const outerRadius = Math.min(width, height) * 0.5 - 40;
  const innerRadius = outerRadius - 30;
  const formatValue = d3.formatPrefix(",.0", 1e3);
  const ribbon = d3.ribbon().radius(innerRadius);

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


  useEffect(() => {
    const svg = d3.select(chartArea.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', () => `-${padding},-${padding},${width + padding},${height + padding}`)
      .style("border", "1px dashed #ccc");

    var g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .datum(chord(matrix));
    var group = g
      .append("g")
      .attr("class", "groups")
      .selectAll("g")
      .data(function (chords) {
        return chords.groups;
      })
      .enter()
      .append("g");

    group
      .append("path")
      .style("fill", function (d) {
        return d3.schemeCategory10[d.index];
      })
      .style("stroke", function (d) {
        return d3.rgb(color(d.index)).darker();
      })
      .attr("class", "outerPath")
      .attr("d", arc);
    g
      .selectAll(".outerText")
      .data(chord(matrix).groups)
      .enter()
      .append("text")
      .each(function (d, i) {
        d.angle = (d.startAngle + d.endAngle) / 2;
        d.name = city_name[i];
      })
      .attr("class", "outText")
      .attr("dy", ".35em")
      .attr("transform", function (d) {
        var result = "rotate(" + d.angle * 180 / Math.PI + ")";
        result += "translate(0," + -1.0 * (outerRadius + 10) + ")";
        if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) {
          result += "rotate(180)";
        }
        return result;
      })
      .text(function (d) {
        return d.name;
      });

    g
      .selectAll(".innerPath")
      .data(chord(matrix))
      .enter()
      .append("path")
      .attr("class", "innerPath")
      .attr("d", ribbon)
      .style("fill", function (d) {
        return d3.schemeCategory10[d.source.index];
      });

  }, [arc, chord, city_name, color, matrix, outerRadius, ribbon])



  return (
    [<div key={'chord'} ref={chartArea} className={styles.page}></div>, <Link key={'link'} to={'/'}>返回</Link>]
  );
}
export default Chord;
