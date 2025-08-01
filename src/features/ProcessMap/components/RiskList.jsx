import React, { useState } from 'react';
import Risk from './Risk.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import InputField from '../../../components/InputField.jsx';
import Button from '../../../components/Button.jsx';

const RiskList = ({ mapId, step }) => {
  const { addRisk } = useProcessMapStore();
  const [newRiskDescription, setNewRiskDescription] = useState('');
  const [newTimeImpact, setNewTimeImpact] = useState(0);
  const [newProbability, setNewProbability] = useState(0);
  const [newCost, setNewCost] = useState(0);

  const handleAddRisk = () => {
    addRisk(step, newRiskDescription, newTimeImpact, newProbability, newCost);
    setNewRiskDescription('');
    setNewTimeImpact(0);
    setNewProbability(0);
    setNewCost(0);
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h4 className="text-lg font-bold mb-3 text-gray-800">Risks</h4>
      <div className="flex flex-col gap-2 mb-4">
        <InputField
          type="text"
          value={newRiskDescription}
          onChange={(e) => setNewRiskDescription(e.target.value)}
          placeholder="New risk description"
          className="w-full"
        />
        <InputField
          type="number"
          value={newTimeImpact}
          onChange={(e) => setNewTimeImpact(Number(e.target.value))}
          placeholder="Time Impact (minutes)"
          className="w-full"
        />
        <InputField
          type="number"
          value={newProbability}
          onChange={(e) => setNewProbability(Number(e.target.value))}
          placeholder="Probability (0-1)" step="0.01"
          className="w-full"
        />
        <Button onClick={handleAddRisk} variant="primary">Add Risk</Button>
      </div>
      <div className="space-y-2">
        {step.risks && step.risks.map((risk, index) => (
          <Risk key={index} mapId={mapId} step={step} risk={risk} />
        ))}
      </div>
    </div>
  );
};

export default RiskList;