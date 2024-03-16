import React from 'react';
import MainContent6 from './MainContent6';

function Sidebar({ onGenerateChart, onToggleSidebar, sidebarCollapsed }) {
  return (
    <div className="lg:w-1/5 p-4 bg-gray-200 bg-opacity-75"> {/* Changed background color to darke,r gray with opacity */}
       {sidebarCollapsed ? (
        <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onToggleSidebar}>
          &larr; Expand Sidebar
        </button>
      ) : (
        <button className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onToggleSidebar}>
          Collapse Sidebar &rarr;
        </button>
      )}
      <div>
      <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onGenerateChart}>
        Generate Chart
      </button>
      </div>
      <div>
      <MainContent6 />
      </div>
     
    </div>
  );
}

export default Sidebar;




