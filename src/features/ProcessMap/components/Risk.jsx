import React from 'react';
import { useProcessMapStore } from '../useProcessMapStore';
import Card from '../../../components/Card.jsx';
import Button from '../../../components/Button.jsx';

const Risk = ({ step, risk }) => {
  const { deleteRisk } = useProcessMapStore();

  const handleDelete = () => {
    deleteRisk(step, risk.id);
  };

  return (
    <Card className="mt-2">
      <p className="text-gray-700">Description: {risk.description}</p>
      <p className="text-gray-700">Time Impact: {risk.timeImpact} minutes</p>
      <p className="text-gray-700">Probability: {risk.probability}</p>
      <p className="text-gray-700">Additional Risk Cost: ${risk.additionalCost}</p>
      <p className="text-gray-700">Calculated Risk Cost: ${((risk.timeImpact / 60) * 25 + (risk.additionalCost || 0)).toFixed(2)}</p>
      <Button onClick={handleDelete} variant="danger" className="mt-2">Delete</Button>
    </Card>
  );
};

export default Risk;