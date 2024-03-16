// MainContent3.js
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

function MainContent5() {
  const data = useSelector((state) => state.data);
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  useEffect(() => {
    if (data.length === 0) return;

    const salaryRanges = {
      '0-50000': 0,
      '50001-100000': 0,
      '100001-150000': 0,
      '150001-200000': 0,
      '200001-250000': 0,
      '250001-300000': 0,
      '300001-350000': 0,
      '350001-900000': 0 
    };

    data.forEach(person => {
      const salary = parseInt(person.employee_salary);
      if (salary >= 0 && salary <= 50000) {
        salaryRanges['0-50000']++;
      } else if (salary >= 50001 && salary <= 100000) {
        salaryRanges['50001-100000']++;
      } else if (salary >= 100001 && salary <= 150000) {
        salaryRanges['100001-150000']++;
      } else if (salary >= 150001 && salary <= 200000) {
        salaryRanges['150001-200000']++;
      } else if (salary >= 200001 && salary <= 250000) {
        salaryRanges['200001-250000']++;
      } else if (salary >= 250001 && salary <= 300000) {
        salaryRanges['250001-300000']++;
      } else if (salary >= 300001 && salary <= 350000) {
        salaryRanges['300001-350000']++;
      } else if (salary >= 350001 && salary <= 900000) {
        salaryRanges['350001-900000']++;
      }
    });

    const chartData = {
      labels: Object.keys(salaryRanges),
      datasets: [{
        data: Object.values(salaryRanges),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(193, 112, 255, 0.7)',
          'rgba(103, 162, 255, 0.7)',
          'rgba(53, 142, 255, 0.7)'
        ]
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.label || '';
              var value = context.parsed;
              if (value !== null && value !== undefined) {
                label += ': ' + value.toLocaleString(); 
              }
              return label;
            }
          }
        }
      }
    };

   
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: options
    });

  }, [data]);

  return (
    <div className="chart-container">
      {data.length > 0 && <canvas ref={chartRef}></canvas>}
      {data.length === 0 && <p>No data available.</p>}
    </div>
  );
}

export default MainContent5;




