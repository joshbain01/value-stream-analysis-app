import React, { useState, useEffect } from 'react';
import ProcessStep from './ProcessStep.jsx';
import { useProcessMapStore } from '../useProcessMapStore';

const ProcessStepList = ({ mapId }) => {
  const { maps, addStep } = useProcessMapStore();
  const [newStepName, setNewStepName] = useState('');
  const [newStepTime, setNewStepTime] = useState(0);
  const [newEmployeeFunction, setNewEmployeeFunction] = useState('');

  const currentMap = maps.find(map => map.id === mapId);
  const steps = currentMap ? currentMap.steps || [] : [];

  const handleAddStep = () => {
    addStep(newStepName, newStepTime, newEmployeeFunction);
    setNewStepName('');
    setNewStepTime(0);
    setNewEmployeeFunction('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Process Steps</h2>
      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={newStepName}
          onChange={(e) => setNewStepName(e.target.value)}
          className="border p-2 mb-2"
          placeholder="New step name"
        />
        <input
          type="number"
          value={newStepTime}
          onChange={(e) => setNewStepTime(Number(e.target.value))}
          className="border p-2 mb-2"
          placeholder="Time (minutes)"
        />
        <input
          type="text"
          value={newEmployeeFunction}
          onChange={(e) => setNewEmployeeFunction(e.target.value)}
          className="border p-2 mb-2"
          placeholder="Employee Function"
        />
        <button onClick={handleAddStep} className="bg-blue-500 text-white p-2">Add Step</button>
      </div>
      <div>
        {steps.map((step, index) => (
          <ProcessStep key={index} mapId={mapId} step={step} />
        ))}
      </div>
    </div>
  );
};

export default ProcessStepList;