import React from 'react';
import { Route,Routes } from 'react-router-dom'; // Import Route from react-router-dom
import MainContent4 from './MainContent4';
import MainContent5 from './MainContent5';
import MainContent6 from './MainContent6';

const RouterComponent = () => {
  return (
    <>
    <Routes>
      <Route path="/option1" element={<MainContent4 />} />
      <Route path="/option2" element={<MainContent5 />} />
      <Route path="/option3" component={<MainContent6 />} />
      </Routes>
    </>
  );
};

export default RouterComponent;
