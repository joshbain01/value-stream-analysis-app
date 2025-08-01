import { create } from 'zustand';
import { collection, doc, addDoc, deleteDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@services/firebase';

export const useProcessMapStore = create((set, get) => ({
  maps: [],
  selectedMapId: null,

  // Actions
  fetchMaps: () => {
    const unsubscribe = onSnapshot(collection(db, 'valueStreamMaps'), (snapshot) => {
      const mapsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ maps: mapsData });
    });
    return unsubscribe;
  },

  createMap: async (name) => {
    if (name.trim() !== '') {
      const docRef = await addDoc(collection(db, 'valueStreamMaps'), { name });
      set({ selectedMapId: docRef.id });
    }
  },

  deleteMap: async (id) => {
    await deleteDoc(doc(db, 'valueStreamMaps', id));
    set({ selectedMapId: null });
  },

  setSelectedMapId: (id) => set({ selectedMapId: id }),

  addStep: async (stepName, time = 0, employeeFunction = '') => {
    const { selectedMapId } = get();
    if (stepName.trim() !== '' && selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const newStep = { name: stepName, time, employeeFunction, risks: [] };
      
      await updateDoc(mapRef, {
        steps: arrayUnion(newStep)
      });
    }
  },

  updateStep: async (oldStep, newStep) => {
    const { selectedMapId } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      await updateDoc(mapRef, {
        steps: arrayRemove(oldStep)
      });
      await updateDoc(mapRef, {
        steps: arrayUnion(newStep)
      });
    }
  },

  deleteStep: async (step) => {
    const { selectedMapId } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      await updateDoc(mapRef, {
        steps: arrayRemove(step)
      });
    }
  },

  addRisk: async (step, riskDescription, timeImpact = 0, probability = 0, cost = 0) => {
    const { selectedMapId, maps } = get();
    if (riskDescription.trim() !== '' && selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const currentMap = maps.find(map => map.id === selectedMapId);
      const newRisk = { description: riskDescription, timeImpact, probability, cost };
      const updatedSteps = currentMap.steps.map(s => 
        s.name === step.name ? { ...s, risks: [...(s.risks || []), newRisk] } : s
      );

      await updateDoc(mapRef, { steps: updatedSteps });
    }
  },

  deleteRisk: async (step, riskDescription) => {
    const { selectedMapId, maps } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const currentMap = maps.find(map => map.id === selectedMapId);
      const updatedSteps = currentMap.steps.map(s => 
        s.name === step.name ? { ...s, risks: s.risks.filter(r => r.description !== riskDescription) } : s
      );

      await updateDoc(mapRef, { steps: updatedSteps });
    }
  },

  getTotalTimeInMotion: () => {
    const { selectedMapId, maps } = get();
    if (!selectedMapId) return 0;
    const currentMap = maps.find(map => map.id === selectedMapId);
    if (!currentMap || !currentMap.steps) return 0;
    return currentMap.steps.reduce((total, step) => total + (step.time || 0), 0);
  },

}));