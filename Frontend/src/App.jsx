import React from 'react';
import CursorAnimation from './components/CursorAnimation';
import ServiceSection from './components/ServiceSection';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <CursorAnimation />
      <div>
        <ServiceSection />
      </div>
    </div>
  );
};

export default App;