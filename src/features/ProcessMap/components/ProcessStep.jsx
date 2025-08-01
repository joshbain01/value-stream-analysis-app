import React, { useState } from 'react';
import RiskList from './RiskList.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import Card from '../../../components/Card.jsx';
import InputField from '../../../components/InputField.jsx';
import Button from '../../../components/Button.jsx';

const ProcessStep = ({ mapId, step }) => {
  const { updateStep, deleteStep } = useProcessMapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedStep, setEditedStep] = useState(step);

  const handleUpdate = () => {
    updateStep(step, editedStep);
    setIsEditing(false);
  };

  return (
    <Card className="mb-4">
      {isEditing ? (
        <div>
          <InputField
            type="text"
            value={editedStep.name}
            onChange={(e) => setEditedStep({ ...editedStep, name: e.target.value })}
            className="mb-2 w-full"
            placeholder="Step Name"
          />
          <InputField
            type="number"
            value={editedStep.time}
            onChange={(e) => setEditedStep({ ...editedStep, time: Number(e.target.value) })}
            className="mb-2 w-full"
            placeholder="Time (minutes)"
          />
          <InputField
            type="text"
            value={editedStep.employeeFunction}
            onChange={(e) => setEditedStep({ ...editedStep, employeeFunction: e.target.value })}
            className="mb-2 w-full"
            placeholder="Employee Function"
          />
          <InputField
            type="number"
            value={editedStep.cycleCost}
            onChange={(e) => setEditedStep({ ...editedStep, cycleCost: Number(e.target.value) })}
            className="mb-2 w-full"
            placeholder="Cycle Cost"
          />
          <InputField
            type="number"
            value={editedStep.inventoryCosts}
            onChange={(e) => setEditedStep({ ...editedStep, inventoryCosts: Number(e.target.value) })}
            className="mb-2 w-full"
            placeholder="Inventory Costs"
          />
          <Button onClick={handleUpdate} variant="primary">Save</Button>
          <Button onClick={() => setIsEditing(false)} variant="secondary" className="ml-2">Cancel</Button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{step.name}</h3>
          <p>Time: {step.time} minutes</p>
          <p>Employee Function: {step.employeeFunction}</p>
          <p>Cycle Cost: ${step.cycleCost}</p>
          <p>Inventory Costs: ${step.inventoryCosts}</p>
          <p>Defect Costs: ${((step.risks || []).reduce((totalRiskCost, risk) => {
            const laborRate = 25; // Assuming a labor rate of $25/hour
            const riskCost = (risk.timeImpact / 60) * laborRate + (risk.additionalCost || 0);
            return totalRiskCost + riskCost;
          }, 0)).toFixed(2)}</p>
          <p>Total Cycle Cost: ${((step.cycleCost || 0) + (step.inventoryCosts || 0) + ((step.risks || []).reduce((totalRiskCost, risk) => {
            const laborRate = 25; // Assuming a labor rate of $25/hour
            const riskCost = (risk.timeImpact / 60) * laborRate + (risk.additionalCost || 0);
            return totalRiskCost + riskCost;
          }, 0))).toFixed(2)}</p>
          <Button onClick={() => setIsEditing(true)} variant="secondary">Edit</Button>
          <Button onClick={() => deleteStep(step.id)} variant="danger" className="ml-2">Delete</Button>
          <RiskList mapId={mapId} step={step} />
        </div>
      )}
    </Card>
  );
};

export default ProcessStep;