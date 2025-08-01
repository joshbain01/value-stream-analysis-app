import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import Risk from './Risk';

const RiskList = ({ mapId, step }) => {
  const [newRiskDescription, setNewRiskDescription] = useState('');

  const addRisk = async () => {
    if (newRiskDescription.trim() !== '' && mapId) {
      const mapRef = doc(db, 'valueStreamMaps', mapId);
      await updateDoc(mapRef, {
        steps: arrayUnion({ ...step, risks: arrayUnion({ description: newRiskDescription }) })
      });
      setNewRiskDescription('');
    }
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
        <button onClick={addRisk} className="bg-blue-500 text-white p-2 ml-2">Add Risk</button>
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
