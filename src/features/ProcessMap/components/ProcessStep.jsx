import React, { useState } from 'react';
import RiskList from './RiskList.jsx';
import { useProcessMapStore } from '../useProcessMapStore';

const ProcessStep = ({ mapId, step }) => {
  const { updateStep, deleteStep } = useProcessMapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedStep, setEditedStep] = useState(step);

  const handleUpdate = () => {
    updateStep(step, editedStep);
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
            placeholder="Step Name"
          />
          <input
            type="number"
            value={editedStep.time}
            onChange={(e) => setEditedStep({ ...editedStep, time: Number(e.target.value) })}
            className="border p-2 mb-2 w-full"
            placeholder="Time (minutes)"
          />
          <input
            type="text"
            value={editedStep.employeeFunction}
            onChange={(e) => setEditedStep({ ...editedStep, employeeFunction: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Employee Function"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white p-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 ml-2">Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{step.name}</h3>
          <p>Time: {step.time} minutes</p>
          <p>Employee Function: {step.employeeFunction}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-1 mt-2">Edit</button>
          <button onClick={() => deleteStep(step)} className="bg-red-500 text-white p-1 mt-2 ml-2">Delete</button>
          <RiskList mapId={mapId} step={step} />
        </div>
      )}
    </div>
  );
};

export default ProcessStep;