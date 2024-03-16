import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const Ageandsalary = () => {
  const data = useSelector((state) => state.data);
  const svgRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedAttribute, setSelectedAttribute] = useState('age');
  const minDataPoints = 15; 
  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 100, left: 100 };
    const containerWidth = chartRef.current.clientWidth;
    const containerHeight = 600;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Limit the number of data points displayed if less than the minimum
    const displayData = data.slice(0, Math.max(minDataPoints, data.length));

    const x = d3.scaleBand()
      .domain(displayData.map(person => person.employee_name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = selectedAttribute === 'age' ? d3.scaleLinear()
      .domain([0, d3.max(displayData, d => d.employee_age)])
      .range([height - margin.bottom, margin.top]) :
      d3.scaleLinear()
      .domain([0, d3.max(displayData, d => d.employee_salary)])
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll("*").remove();
    svg.append("g")
      .selectAll("rect")
      .data(displayData)
      .join("rect")
      .attr("x", d => x(d.employee_name))
      .attr("y", height - margin.bottom)
      .attr("height", 0)
      .attr("width", x.bandwidth())
      .attr("fill", d => selectedAttribute === 'age' ? 'lightblue' : 'lightgreen')
      .attr("rx", 8)
      .attr("ry", 8)
      .style("opacity", 0.7)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", d => selectedAttribute === 'age' ? y(d.employee_age) : y(d.employee_salary))
      .attr("height", d => selectedAttribute === 'age' ? height - margin.bottom - y(d.employee_age) : height - margin.bottom - y(d.employee_salary))
      .attr("fill", d => selectedAttribute === 'age' ? 'darkblue' : 'darkgreen');

    svg.append("g").call(xAxis).selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-65)");
    svg.append("g").call(yAxis);

  }, [data, selectedAttribute, minDataPoints]);

  useEffect(() => {
    function handleResize() {
      setSelectedAttribute(selectedAttribute);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedAttribute]);

  return (
    <div ref={chartRef} className="chart-container w-full border border-gray-300 rounded-lg p-4 bg-gray-100">
      <div className="flex justify-center mb-4">
        <label className="mr-2 text-gray-700 font-bold">Select Age or Salary</label>
        <select className="p-2" value={selectedAttribute} onChange={(e) => setSelectedAttribute(e.target.value)}>
          <option value="age">Age</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      {data.length > 0 && <svg ref={svgRef} className="w-full" height="600"></svg>}
    </div>
  );
}

export default Ageandsalary;








