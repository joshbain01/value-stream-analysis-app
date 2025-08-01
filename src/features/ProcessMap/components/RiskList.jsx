import React, { useState } from 'react';
import Risk from './Risk.jsx';
import { useProcessMapStore } from '../useProcessMapStore';

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
    <div className="mt-4">
      <h4 className="text-lg font-bold">Risks</h4>
      <div className="flex flex-col mt-2">
        <input
          type="text"
          value={newRiskDescription}
          onChange={(e) => setNewRiskDescription(e.target.value)}
          className="border p-2 mb-2"
          placeholder="New risk description"
        />
        <input
          type="number"
          value={newTimeImpact}
          onChange={(e) => setNewTimeImpact(Number(e.target.value))}
          className="border p-2 mb-2"
          placeholder="Time Impact (minutes)"
        />
        <input
          type="number"
          value={newProbability}
          onChange={(e) => setNewProbability(Number(e.target.value))}
          className="border p-2 mb-2"
          placeholder="Probability (0-1)" step="0.01"
        />
        <input
          type="number"
          value={newCost}
          onChange={(e) => setNewCost(Number(e.target.value))}
          className="border p-2 mb-2"
          placeholder="Cost"
        />
        <button onClick={handleAddRisk} className="bg-blue-500 text-white p-2">Add Risk</button>
      </div>
      <div>
        {step.risks && step.risks.map((risk, index) => (
          <Risk key={index} mapId={mapId} step={step} risk={risk} />
        ))}
      </div>
    </div>
  );
};

export default RiskList;