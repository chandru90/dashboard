import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const Salarydistribute =() => {
  const data = useSelector((state) => state.data);
  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);

    
    const ageCategories = {
      '0-30': 0,
      '31-60': 0,
      '61-90': 0
    };

    data.forEach(person => {
      const age = parseInt(person.employee_age); 
      if (age >= 0 && age <= 30) {
        ageCategories['0-30']++;
      } else if (age >= 31 && age <= 60) {
        ageCategories['31-60']++;
      } else if (age >= 61 && age <= 90) {
        ageCategories['61-90']++;
      }
    });

    
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const x = d3
      .scaleBand()
      .domain(Object.keys(ageCategories))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(Object.values(ageCategories))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(Object.entries(ageCategories))
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(0) - y(d[1]))
      .attr('width', x.bandwidth());

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data]);

  return (
    <main className="main-content">
      <h1 className="text-2xl font-bold text-center mb-4">Average Age distribution of Employees in an organization</h1>
      <div className="chart-container border border-gray-300 rounded-lg p-4 relative overflow-hidden">
        {data.length > 0 && <svg ref={svgRef} width="600" height="400" className="animate-pulse-slow bg-gradient-to-b from-gray-100 to-gray-200"></svg>}
      </div>
    </main>
  );
}

export default Salarydistribute;





