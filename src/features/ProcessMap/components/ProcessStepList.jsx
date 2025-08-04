import React, { useState } from 'react';
import ProcessStep from './ProcessStep.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import { Button } from '../../../components/Button.jsx';
import { Input } from '../../../components/Input.jsx';

const ProcessStepList = ({ mapId }) => {
  const { maps, addStep } = useProcessMapStore();
  const [newStepName, setNewStepName] = useState('');
  const [newStepTime, setNewStepTime] = useState(0);
  const [newEmployeeFunction, setNewEmployeeFunction] = useState('');
  const [newCycleCost, setNewCycleCost] = useState(0);
  const [newInventoryCosts, setNewInventoryCosts] = useState(0);

  const currentMap = maps.find(map => map.id === mapId);
  const steps = currentMap ? currentMap.steps || [] : [];

  const handleAddStep = () => {
    addStep(newStepName, newStepTime, newEmployeeFunction, newCycleCost, newInventoryCosts);
    setNewStepName('');
    setNewStepTime(0);
    setNewEmployeeFunction('');
    setNewCycleCost(0);
    setNewInventoryCosts(0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Process Steps</h2>
      <div className="space-y-2 mb-4 p-4 border rounded-lg">
        <Input
          type="text"
          value={newStepName}
          onChange={(e) => setNewStepName(e.target.value)}
          placeholder="New step name"
        />
        <Input
          type="number"
          value={newStepTime}
          onChange={(e) => setNewStepTime(Number(e.target.value))}
          placeholder="Time (minutes)"
        />
        <Input
          type="text"
          value={newEmployeeFunction}
          onChange={(e) => setNewEmployeeFunction(e.target.value)}
          placeholder="Employee Function"
        />
        <Input
          type="number"
          value={newCycleCost}
          onChange={(e) => setNewCycleCost(Number(e.target.value))}
          placeholder="Cycle Cost"
        />
        <Input
          type="number"
          value={newInventoryCosts}
          onChange={(e) => setNewInventoryCosts(Number(e.target.value))}
          placeholder="Inventory Costs"
        />
        <Button onClick={handleAddStep}>Add Step</Button>
      </div>
      <div>
        {steps.length === 0 ? (
          <div className="text-center text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg">
            <p>No process steps defined for this map.</p>
            <p className="text-sm">Use the form above to add the first step.</p>
          </div>
        ) : (
          steps.map((step, index) => (
            <ProcessStep key={index} mapId={mapId} step={step} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProcessStepList;
