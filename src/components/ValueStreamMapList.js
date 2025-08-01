import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import ProcessStepList from './ProcessStepList';

const ValueStreamMapList = () => {
  const [maps, setMaps] = useState([]);
  const [newMapName, setNewMapName] = useState('');
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'valueStreamMaps'), (snapshot) => {
      const mapsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMaps(mapsData);
    });
    return () => unsubscribe();
  }, []);

  const createMap = async () => {
    if (newMapName.trim() !== '') {
      const docRef = await addDoc(collection(db, 'valueStreamMaps'), { name: newMapName });
      setNewMapName('');
      setSelectedMap(docRef.id);
    }
  };

  const deleteMap = async (id) => {
    await deleteDoc(doc(db, 'valueStreamMaps', id));
    setSelectedMap(null);
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
          <button onClick={createMap} className="bg-blue-500 text-white p-2 ml-2">Create</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 border-r pr-4">
          <ul>
            {maps.map(map => (
              <li key={map.id} 
                  className={`p-2 cursor-pointer ${selectedMap === map.id ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedMap(map.id)}>
                {map.name}
                <button onClick={(e) => {e.stopPropagation(); deleteMap(map.id)}} className="bg-red-500 text-white p-1 float-right">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          {selectedMap && <ProcessStepList mapId={selectedMap} />}
        </div>
      </div>
    </div>
  );
};

export default ValueStreamMapList;