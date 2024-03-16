

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const EmployeeDetails =() => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.data);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    if (storeData.length === 0) {
      fetchData();
    } else {
      setEditedData([...storeData]);
    }
  }, [storeData]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
      dispatch({ type: 'UPDATE_DATA', payload: response.data.data });
      setEditedData(response.data.data.map((item) => ({ ...item })));
      console.log("api call made")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (index, column, value) => {
    const newData = [...editedData];
    newData[index][column] = value;
    setEditedData(newData);
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_DATA', payload: editedData });
    console.log(editedData);
  };

  const handleAddRow = () => {
    const newId = editedData.length > 0 ? Math.max(...editedData.map(item => item.id)) + 1 : 1;
    setEditedData([...editedData, { id: newId, employee_name: '', employee_salary: '', employee_age: '' }]);
    
  };

  return (
    <main className="main-content bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Report</h2>
      <div className="grid-container">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Salary</th>
              <th className="py-2 px-4">Age</th>
            </tr>
          </thead>
          <tbody>
            {editedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    value={item.employee_name}
                    onChange={(e) =>
                      handleInputChange(index, 'employee_name', e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    value={item.employee_salary}
                    onChange={(e) =>
                      handleInputChange(index, 'employee_salary', e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    value={item.employee_age}
                    onChange={(e) =>
                      handleInputChange(index, 'employee_age', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddRow}>Add Employee</button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={handleSave}>Save</button>
    </main>
  );
}

export default EmployeeDetails;






