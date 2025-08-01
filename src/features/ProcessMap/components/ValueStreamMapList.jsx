import React, { useState, useEffect } from 'react';
import ProcessStepList from './ProcessStepList.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import Button from '../../../components/Button.jsx';
import InputField from '../../../components/InputField.jsx';
import Card from '../../../components/Card.jsx';

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

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [mapToDeleteId, setMapToDeleteId] = useState(null);

  const handleDeleteMapClick = (id) => {
    setMapToDeleteId(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteMap = () => {
    deleteMap(mapToDeleteId);
    setShowConfirmDialog(false);
    setMapToDeleteId(null);
  };

  const cancelDeleteMap = () => {
    setShowConfirmDialog(false);
    setMapToDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-text">Value Stream Maps</h2>
        <div className="flex gap-2">
          <InputField
            type="text"
            value={newMapName}
            onChange={(e) => setNewMapName(e.target.value)}
            placeholder="New map name"
            className="flex-grow"
          />
          <Button onClick={handleCreateMap}>Create</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-surface p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-text">Your Maps</h3>
          <ul className="space-y-3">
            {maps.map(map => (
              <Card
                key={map.id}
                className={`cursor-pointer flex justify-between items-center ${selectedMapId === map.id ? 'bg-primary-light border-primary' : 'hover:bg-surface-light'}`}
                onClick={() => setSelectedMapId(map.id)}
              >
                <span className="font-medium text-text">{map.name}</span>
                {map.createdAt && <span className="text-sm text-gray-500">{new Date(map.createdAt).toLocaleDateString()}</span>}
                <Button onClick={(e) => {e.stopPropagation(); handleDeleteMapClick(map.id)}} variant="danger" className="ml-2 p-1 text-sm">Delete</Button>
              </Card>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          {selectedMapId && <ProcessStepList mapId={selectedMapId} />}
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 space-y-4 max-w-sm mx-auto rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-text">Confirm Deletion</h3>
            <p className="text-text">Are you sure you want to delete this value stream map? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <Button onClick={cancelDeleteMap} variant="secondary">Cancel</Button>
              <Button onClick={confirmDeleteMap} variant="danger">Delete</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ValueStreamMapList;