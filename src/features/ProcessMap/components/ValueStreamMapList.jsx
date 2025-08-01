import React, { useState, useEffect } from 'react';
import ProcessStepList from './ProcessStepList.jsx';
import { useProcessMapStore } from '../useProcessMapStore';

const ValueStreamMapList = () => {
  const { maps, selectedMapId, fetchMaps, createMap, deleteMap, setSelectedMapId } = useProcessMapStore();
  const [newMapName, setNewMapName] = useState('');

  useEffect(() => {
    const unsubscribe = fetchMaps();
    return () => unsubscribe();
  }, [fetchMaps]);

  const handleCreateMap = () => {
    createMap(newMapName);
    setNewMapName('');
  };

  const handleDeleteMap = (id) => {
    deleteMap(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Value Stream Maps</h2>
        <div className="flex">
          <input
            type="text"
            value={newMapName}
            onChange={(e) => setNewMapName(e.target.value)}
            className="border p-2"
            placeholder="New map name"
          />
          <button onClick={handleCreateMap} className="bg-blue-500 text-white p-2 ml-2">Create</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 border-r pr-4">
          <ul>
            {maps.map(map => (
              <li key={map.id} 
                  className={`p-2 cursor-pointer ${selectedMapId === map.id ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedMapId(map.id)}>
                {map.name}
                <button onClick={(e) => {e.stopPropagation(); handleDeleteMap(map.id)}} className="bg-red-500 text-white p-1 float-right">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          {selectedMapId && <ProcessStepList mapId={selectedMapId} />}
        </div>
      </div>
    </div>
  );
};

export default ValueStreamMapList;