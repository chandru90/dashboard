import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import MainContent2 from './MainContent2';
import MainContent3 from './MainContent3';
import MainContent4 from './MainContent4';
import MainContent5 from './MainContent5';
import MainContent7 from './MainContent7';

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
      <div className="lg:w-2/3">
        <Navbar />
        <MainContent />
      </div>
      <div className="lg:w-1/3">
        {showChart && (
          <>
            <MainContent2 />
            <MainContent3 />
            <MainContent4 />
            <MainContent5 />
            
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
  <MainContent7 />
  </>)}
</div>
    </div>
  );
}

export default App;




