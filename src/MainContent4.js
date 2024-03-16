import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

function MainContent4() {
  const data = useSelector((state) => state.data);
  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);

    
    const ageSalaryData = data.reduce((acc, person) => {
      const ageGroup = Math.floor(person.employee_age / 10) * 10; 
      if (!acc[ageGroup]) {
        acc[ageGroup] = { sum: 0, count: 0 };
      }
      acc[ageGroup].sum += parseInt(person.employee_salary);
      acc[ageGroup].count++;
      return acc;
    }, {});

    const avgSalaryData = Object.entries(ageSalaryData).map(([ageGroup, { sum, count }]) => ({
      ageGroup: `${ageGroup}-${parseInt(ageGroup) + 9}`, 
      avgSalary: sum / count
    }));

    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const x = d3
      .scaleBand()
      .domain(avgSalaryData.map(d => d.ageGroup))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(avgSalaryData, d => d.avgSalary)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(avgSalaryData)
      .join('rect')
      .attr('x', d => x(d.ageGroup))
      .attr('y', d => y(0))
      .attr('height', 0) 
      .attr('width', x.bandwidth())
      
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100) 
      .attr('y', d => y(d.avgSalary))
      .attr('height', d => y(0) - y(d.avgSalary));

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)') 
      .attr('text-anchor', 'end');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d => `$${d.toLocaleString()}`)); 

  }, [data]);

  return (
    <div className="chart-container bg-gray-100 p-4">
      {data.length > 0 && (
        <svg ref={svgRef} width="600" height="400" className="rounded-lg shadow-md"></svg>
      )}
    </div>
  );
}

export default MainContent4;

