import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import RiskList from './RiskList';

const ProcessStep = ({ mapId, step }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStep, setEditedStep] = useState(step);

  const handleUpdate = async () => {
    const mapRef = doc(db, 'valueStreamMaps', mapId);
    const oldStep = { ...step };
    delete oldStep.risks; // Don't compare risks when removing
    await updateDoc(mapRef, {
      steps: arrayRemove(oldStep)
    });
    await updateDoc(mapRef, {
      steps: arrayUnion(editedStep)
    });
    setIsEditing(false);
  };

  return (
    <div className="border p-4 mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedStep.name}
            onChange={(e) => setEditedStep({ ...editedStep, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white p-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 ml-2">Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{step.name}</h3>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-1 mt-2">Edit</button>
          <RiskList mapId={mapId} step={step} />
        </div>
      )}
    </div>
  );
};

export default ProcessStep;