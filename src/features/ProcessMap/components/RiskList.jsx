import React, { useState } from 'react';
import Risk from './Risk.jsx';
import { useProcessMapStore } from '../useProcessMapStore';

const RiskList = ({ mapId, step }) => {
  const { addRisk } = useProcessMapStore();
  const [newRiskDescription, setNewRiskDescription] = useState('');

  const handleAddRisk = () => {
    addRisk(step, newRiskDescription);
    setNewRiskDescription('');
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-bold">Risks</h4>
      <div className="flex mt-2">
        <input
          type="text"
          value={newRiskDescription}
          onChange={(e) => setNewRiskDescription(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="New risk description"
        />
        <button onClick={handleAddRisk} className="bg-blue-500 text-white p-2 ml-2">Add Risk</button>
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