import React from 'react';
import { useProcessMapStore } from '../useProcessMapStore';

const Risk = ({ mapId, step, risk }) => {
  const { deleteRisk } = useProcessMapStore();

  const handleDelete = () => {
    deleteRisk(step, risk.description);
  };

  return (
    <div className="border p-2 mt-2">
      <p>Description: {risk.description}</p>
      <p>Time Impact: {risk.timeImpact} minutes</p>
      <p>Probability: {risk.probability}</p>
      <p>Cost: ${risk.cost}</p>
      <p>Calculated Risk Cost: ${risk.probability * risk.cost}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white p-1 mt-2">Delete</button>
    </div>
  );
};

export default Risk;