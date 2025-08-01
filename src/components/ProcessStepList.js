import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import ProcessStep from './ProcessStep';

const ProcessStepList = ({ mapId }) => {
  const [steps, setSteps] = useState([]);
  const [newStepName, setNewStepName] = useState('');

  useEffect(() => {
    if (mapId) {
      const unsubscribe = onSnapshot(doc(db, 'valueStreamMaps', mapId), (doc) => {
        if (doc.exists()) {
          setSteps(doc.data().steps || []);
        }
      });
      return () => unsubscribe();
    }
  }, [mapId]);

  const addStep = async () => {
    if (newStepName.trim() !== '' && mapId) {
      const mapRef = doc(db, 'valueStreamMaps', mapId);
      await updateDoc(mapRef, {
        steps: arrayUnion({ name: newStepName })
      });
      setNewStepName('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Process Steps</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newStepName}
          onChange={(e) => setNewStepName(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="New step name"
        />
        <button onClick={addStep} className="bg-blue-500 text-white p-2 ml-2">Add Step</button>
      </div>
      <div>
        {steps.map((step, index) => (
          <ProcessStep key={index} mapId={mapId} step={step} />
        ))}
      </div>
    </div>
  );
};

export default ProcessStepList;
