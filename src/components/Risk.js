import React from 'react';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

const Risk = ({ mapId, step, risk }) => {
  const handleDelete = async () => {
    const mapRef = doc(db, 'valueStreamMaps', mapId);
    await updateDoc(mapRef, {
      steps: step.risks.filter(r => r.description !== risk.description)
    });
  };

  return (
    <div className="border p-2 mt-2">
      <p>{risk.description}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white p-1 mt-2">Delete</button>
    </div>
  );
};

export default Risk;
