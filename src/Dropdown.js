import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const MainContent6 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const data = useSelector((state) => state.data); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEmployeeSelect = (employeeName) => {
   
    const selected = data.find((employee) => employee.employee_name === employeeName);
    setSelectedEmployee(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <div
          className={`inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 ${
            isOpen ? 'rounded-tl-md' : 'rounded-md'
          }`}
          onClick={toggleDropdown}
        >
          {selectedEmployee ? selectedEmployee.employee_name : 'Select an employee'}
          {isOpen ? (
            <ChevronLeftIcon className="ml-2 h-5 w-5" />
          ) : (
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {data.map((employee) => (
              <button
                key={employee.employee_name}
                className="text-gray-700 block px-4 py-2 text-sm leading-5 text-left hover:bg-gray-100"
                onClick={() => handleEmployeeSelect(employee.employee_name)}
              >
                {employee.employee_name}
              </button>
            ))}
          </div>
        </div>
      )}


      {selectedEmployee && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Employee Details</h2>
          <p>Name: {selectedEmployee.employee_name}</p>
          <p>Age: {selectedEmployee.employee_age}</p>
          <p>Salary: {selectedEmployee.employee_salary}</p>
        </div>
      )}
    </div>
  );
};

export default MainContent6;

