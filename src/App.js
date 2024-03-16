import React, { useState } from 'react';

import Sidebar from './Sidebar';
import EmployeeDetails from './EmployeeDetails';

import Saldis from './Saldis';

import Piechart from './piechart';

import Ageandsalary from './Ageandsalary';
import Employeecards from './Employeecards';


function App() {
  const [showChart, setShowChart] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleGenerateChart = () => {
    setShowChart(true);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleToggleSidebarPosition = () => {
    setSidebarCollapsed(false); 
  };

  return (
    <div>
    <div className="relative flex flex-col lg:flex-row">
      {!sidebarCollapsed && <Sidebar onGenerateChart={handleGenerateChart} onToggleSidebar={handleToggleSidebar} />}
      <div className="lg:w-20/30">
    
        <EmployeeDetails />
      </div>
      <div className="lg:w-10/30">
        {showChart && (
          <>
            
            <Piechart />
            <Employeecards/>
            
            <Saldis />
            
            
          
            
          </>
        )}
      </div>
      {sidebarCollapsed && (
        <button
          className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleToggleSidebarPosition}
        >
          &uarr; Expand Sidebar
        </button>
      )}
    </div>
<div>

{showChart && (
  <>
  <Ageandsalary />
 
  </>)}
</div>
    </div>
  );

}
export default App;




