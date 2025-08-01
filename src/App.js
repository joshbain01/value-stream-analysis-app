import React from 'react';
import ValueStreamMapList from './components/ValueStreamMapList';
import Metrics from './components/Metrics';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Value Stream Mapping App</h1>
      <ValueStreamMapList />
      <Metrics />
    </div>
  );
}

export default App;