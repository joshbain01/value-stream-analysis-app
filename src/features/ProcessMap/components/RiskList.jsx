import React, { useState } from 'react';
import Risk from './Risk.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import { Input } from '../../../components/Input.jsx';
import { Button } from '../../../components/Button.jsx';

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
    <div className="mt-6 p-4 border rounded-lg bg-surface">
      <h4 className="text-lg font-bold mb-3">Risks</h4>
      <div className="space-y-2 mb-4">
        <Input
          type="text"
          value={newRiskDescription}
          onChange={(e) => setNewRiskDescription(e.target.value)}
          placeholder="New risk description"
        />
        <Input
          type="number"
          value={newTimeImpact}
          onChange={(e) => setNewTimeImpact(Number(e.target.value))}
          placeholder="Time Impact (minutes)"
        />
        <Input
          type="number"
          value={newProbability}
          onChange={(e) => setNewProbability(Number(e.target.value))}
          placeholder="Probability (%)"
        />
        <Input
          type="number"
          value={newCost}
          onChange={(e) => setNewCost(Number(e.target.value))}
          placeholder="Additional Cost"
        />
        <Button onClick={handleAddRisk}>Add Risk</Button>
      </div>
      <div className="space-y-2">
        {(!step.risks || step.risks.length === 0) ? (
          <div className="text-center text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg">
            <p>No risks defined for this step.</p>
            <p className="text-sm">Use the form above to add a risk.</p>
          </div>
        ) : (
          step.risks.map((risk, index) => (
            <Risk key={index} mapId={mapId} step={step} risk={risk} />
          ))
        )}
      </div>
    </div>
  );
};

export default RiskList;
