import React, { useState, useMemo } from 'react';
import RiskList from './RiskList.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../../../components/Card.jsx';
import { Input } from '../../../components/Input.jsx';
import { Button } from '../../../components/Button.jsx';

const ProcessStep = ({ mapId, step }) => {
  const { updateStep, deleteStep, maps, selectedMapId } = useProcessMapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedStep, setEditedStep] = useState(step);

  const currentMap = maps.find(map => map.id === selectedMapId);
  const laborRate = currentMap?.laborRate || 25;

  const defectCosts = useMemo(() => {
    return (step.risks || []).reduce((totalRiskCost, risk) => {
      const riskCost = (risk.timeImpact / 60) * laborRate + (risk.additionalCost || 0);
      return totalRiskCost + riskCost;
    }, 0);
  }, [step.risks, laborRate]);

  const totalCycleCost = useMemo(() => {
    return (step.cycleCost || 0) + (step.inventoryCosts || 0) + defectCosts;
  }, [step.cycleCost, step.inventoryCosts, defectCosts]);

  const handleUpdate = () => {
    updateStep(step, editedStep);
    setIsEditing(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{step.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Input
              type="text"
              value={editedStep.name}
              onChange={(e) => setEditedStep({ ...editedStep, name: e.target.value })}
              placeholder="Step Name"
            />
            <Input
              type="number"
              value={editedStep.time}
              onChange={(e) => setEditedStep({ ...editedStep, time: Number(e.target.value) })}
              placeholder="Time (minutes)"
            />
            <Input
              type="text"
              value={editedStep.employeeFunction}
              onChange={(e) => setEditedStep({ ...editedStep, employeeFunction: e.target.value })}
              placeholder="Employee Function"
            />
            <Input
              type="number"
              value={editedStep.cycleCost}
              onChange={(e) => setEditedStep({ ...editedStep, cycleCost: Number(e.target.value) })}
              placeholder="Cycle Cost"
            />
            <Input
              type="number"
              value={editedStep.inventoryCosts}
              onChange={(e) => setEditedStep({ ...editedStep, inventoryCosts: Number(e.target.value) })}
              placeholder="Inventory Costs"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Time:</strong> {step.time} minutes</p>
            <p><strong>Employee Function:</strong> {step.employeeFunction}</p>
            <p><strong>Cycle Cost:</strong> ${step.cycleCost?.toFixed(2)}</p>
            <p><strong>Inventory Costs:</strong> ${step.inventoryCosts?.toFixed(2)}</p>
            <p><strong>Defect Costs:</strong> ${defectCosts.toFixed(2)}</p>
            <p><strong>Total Cycle Cost:</strong> ${totalCycleCost.toFixed(2)}</p>
            <RiskList mapId={mapId} step={step} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button onClick={handleUpdate} variant="default">Save</Button>
            <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)} variant="secondary">Edit</Button>
            <Button onClick={() => deleteStep(step.id)} variant="destructive">Delete</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProcessStep;
