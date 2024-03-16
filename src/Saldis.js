import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const Saldis =()=> {
  const data = useSelector((state) => state.data);
  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);

    
    const salaries = data.map(person => parseInt(person.employee_salary));
    const names = data.map(person => person.employee_name);

   
    const margin = { top: 20, right: 30, bottom: 100, left: 100}; 
    const width = 800 - margin.left - margin.right; 
    const height = 600 - margin.top - margin.bottom;

   
    const x = d3.scaleBand()
      .domain(names)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(salaries)])
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
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.employee_name)) 
      .attr("y", d => y(parseInt(d.employee_salary)))
      .attr("height", d => y(0) - y(parseInt(d.employee_salary)))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .attr("rx", 8) 
      .attr("ry", 8) 
      .style("opacity", 0.7); 

        svg.append("g").call(xAxis).selectAll("text")
      .style("text-anchor", "end") 
      .attr("dx", "-0.5em") 
      .attr("dy", "0.15em") 
      .attr("transform", "rotate(-65)"); 
    svg.append("g").call(yAxis);

  }, [data]);

  return (
    <>
    <h1 className="text-2xl font-bold text-center mb-4"> Salary distribution of Employees in an organization</h1>
    <div className="chart-container border border-gray-300 rounded-lg p-4">
      {data.length > 0 && <svg ref={svgRef} width="800" height="600"></svg>} 
    </div>
  </>
  );
}

export default Saldis;






