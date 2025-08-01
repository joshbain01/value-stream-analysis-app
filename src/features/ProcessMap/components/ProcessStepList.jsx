import React, { useState, useEffect } from 'react';
import ProcessStep from './ProcessStep.jsx';
import { useProcessMapStore } from '../useProcessMapStore';

const ProcessStepList = ({ mapId }) => {
  const { maps, addStep } = useProcessMapStore();
  const [newStepName, setNewStepName] = useState('');

  const currentMap = maps.find(map => map.id === mapId);
  const steps = currentMap ? currentMap.steps || [] : [];

  const handleAddStep = () => {
    addStep(newStepName);
    setNewStepName('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Process Steps</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newStepName}
          onChange={(e) => setNewStepName(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="New step name"
        />
        <button onClick={handleAddStep} className="bg-blue-500 text-white p-2 ml-2">Add Step</button>
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