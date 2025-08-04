import React, { useState, useEffect } from 'react';
import ProcessStepList from './ProcessStepList.jsx';
import { useProcessMapStore } from '../useProcessMapStore';
import { Button } from '../../../components/Button.jsx';
import { Input } from '../../../components/Input.jsx';
import { Card, CardContent } from '../../../components/Card.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/AlertDialog.jsx"

const ValueStreamMapList = () => {
  const { maps, selectedMapId, fetchMaps, createMap, deleteMap, setSelectedMapId } = useProcessMapStore();
  const [newMapName, setNewMapName] = useState('');

  useEffect(() => {
    const unsubscribe = fetchMaps();
    return () => unsubscribe();
  }, [fetchMaps]);

  const handleCreateMap = () => {
    if (newMapName.trim()) {
      createMap(newMapName);
      setNewMapName('');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-text">Value Stream Maps</h2>
        <div className="flex gap-2">
          <Input
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
          {maps.length === 0 ? (
            <div className="text-center text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg">
              <p>No value stream maps found.</p>
              <p className="text-sm">Create your first map using the input above.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {maps.map(map => (
                <Card
                  key={map.id}
                className={`cursor-pointer ${selectedMapId === map.id ? 'bg-primary/20 border-primary' : 'hover:bg-surface-light'}`}
                onClick={() => setSelectedMapId(map.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text">{map.title}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this value stream map.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={(e) => { e.stopPropagation(); deleteMap(map.id); }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(map.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                </Card>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-3">
          {selectedMapId && <ProcessStepList mapId={selectedMapId} />}
        </div>
      </div>
    </div>
  );
};

export default ValueStreamMapList;
