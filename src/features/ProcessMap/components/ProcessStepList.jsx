import React, { useState } from 'react';
import ProcessStep from './ProcessStep.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import Button from '../../../components/Button.jsx';
import InputField from '../../../components/InputField.jsx'; // Import the new InputField component

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
        <InputField
          type="text"
          value={newStepName}
          onChange={(e) => setNewStepName(e.target.value)}
          className="mb-2 w-full"
          placeholder="New step name"
        />
        <InputField
          type="number"
          value={newStepTime}
          onChange={(e) => setNewStepTime(Number(e.target.value))}
          className="mb-2 w-full"
          placeholder="Time (minutes)"
        />
        <InputField
          type="text"
          value={newEmployeeFunction}
          onChange={(e) => setNewEmployeeFunction(e.target.value)}
          className="mb-2 w-full"
          placeholder="Employee Function"
        />
        <Button onClick={handleAddStep}>Add Step</Button>
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