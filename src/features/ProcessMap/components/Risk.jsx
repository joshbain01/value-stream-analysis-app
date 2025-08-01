import React from 'react';
import { useProcessMapStore } from '../useProcessMapStore';

const Risk = ({ mapId, step, risk }) => {
  const { deleteRisk } = useProcessMapStore();

  const handleDelete = () => {
    deleteRisk(step, risk.description);
  };

  return (
    <div className="border p-2 mt-2">
      <p>{risk.description}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white p-1 mt-2">Delete</button>
    </div>
  );
};

export default Risk;