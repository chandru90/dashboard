import React from 'react';
import { useSelector } from 'react-redux';

const Employeecards = () => {
  const data = useSelector((state) => state.data);

  const totalEmployees = data.length;

  const totalAge = data.reduce((acc, person) => acc + parseInt(person.employee_age || 0), 0);
  const averageAge = totalEmployees ? totalAge / totalEmployees : 0;

  const totalSalary = data.reduce((acc, person) => acc + parseInt(person.employee_salary || 0), 0);
  const averageSalary = totalEmployees ? totalSalary / totalEmployees : 0;

  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-2xl font-bold text-center mb-4">Employee Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Employees</h2>
          <p className="text-3xl font-bold">{totalEmployees}</p>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-2">Average Age</h2>
          <p className="text-3xl font-bold">{averageAge.toFixed(2)}</p>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-2">Average Salary</h2>
          <p className="text-3xl font-bold">${averageSalary.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Employeecards;





