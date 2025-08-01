import { create } from 'zustand';
import { collection, doc, addDoc, deleteDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
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

  createMap: async (title) => {
    if (title.trim() !== '') {
      const docRef = await addDoc(collection(db, 'valueStreamMaps'), { 
        title, 
        createdAt: new Date().toISOString(),
        timeInMotion: 0,
        laborRate: 25, // Default labor rate
        processAccounting: {
          revenue: 0,
          inventory: 0,
          operatingExpenses: 0
        }
      });
      set({ selectedMapId: docRef.id });
    }
  },

  deleteMap: async (id) => {
    await deleteDoc(doc(db, 'valueStreamMaps', id));
    set({ selectedMapId: null });
  },

  setSelectedMapId: (id) => set({ selectedMapId: id }),

  updateMapDetails: async (key, value) => {
    const { selectedMapId } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      await updateDoc(mapRef, { [key]: value });
    }
  },

  addStep: async (stepName, time = 0, employeeFunction = '') => {
    const { selectedMapId } = get();
    if (stepName.trim() !== '' && selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const newStep = { id: Date.now().toString(), name: stepName, time, employeeFunction, cycleCost: 0, inventoryCosts: 0, risks: [] };
      
      await updateDoc(mapRef, {
        steps: arrayUnion(newStep)
      });
    }
  },

  updateStep: async (oldStep, newStep) => {
    const { selectedMapId, maps } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const currentMap = maps.find(map => map.id === selectedMapId);
      if (!currentMap) return;

      const updatedSteps = currentMap.steps.map(s =>
        s.id === oldStep.id ? newStep : s
      );

      await updateDoc(mapRef, {
        steps: updatedSteps
      });
    }
  },

  deleteStep: async (stepId) => {
    const { selectedMapId, maps } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const currentMap = maps.find(map => map.id === selectedMapId);
      if (!currentMap) return;

      const updatedSteps = currentMap.steps.filter(s => s.id !== stepId);

      await updateDoc(mapRef, {
        steps: updatedSteps
      });
    }
  },

  addRisk: async (step, riskDescription, timeImpact = 0, probability = 0, cost = 0) => {
    const { selectedMapId, maps } = get();
    if (riskDescription.trim() !== '' && selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const currentMap = maps.find(map => map.id === selectedMapId);
      const newRisk = { id: Date.now().toString(), description: riskDescription, timeImpact, probability, additionalCost: cost };
      const updatedSteps = currentMap.steps.map(s => 
        s.id === step.id ? { ...s, risks: [...(s.risks || []), newRisk] } : s
      );

      await updateDoc(mapRef, { steps: updatedSteps });
    }
  },

  deleteRisk: async (step, riskId) => {
    const { selectedMapId, maps } = get();
    if (selectedMapId) {
      const mapRef = doc(db, 'valueStreamMaps', selectedMapId);
      const currentMap = maps.find(map => map.id === selectedMapId);
      if (!currentMap) return;

      const updatedSteps = currentMap.steps.map(s => 
        s.id === step.id ? { ...s, risks: s.risks.filter(r => r.id !== riskId) } : s
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

  getTotalProcessTime: () => {
    const { getTotalTimeInMotion, selectedMapId, maps } = get();
    const currentMap = maps.find(map => map.id === selectedMapId);
    const timeInMotion = currentMap ? (currentMap.timeInMotion || 0) : 0;
    return getTotalTimeInMotion() + timeInMotion;
  },

  getTotalDefectCost: () => {
    const { selectedMapId, maps } = get();
    if (!selectedMapId) return 0;
    const currentMap = maps.find(map => map.id === selectedMapId);
    if (!currentMap || !currentMap.steps) return 0;
    const laborRate = currentMap.laborRate || 25; // Use map's labor rate or default
    return currentMap.steps.reduce((totalStepCost, step) => {
      const stepDefectCost = (step.risks || []).reduce((totalRiskCost, risk) => {
        const riskCost = (risk.timeImpact / 60) * laborRate + (risk.additionalCost || 0);
        return totalRiskCost + riskCost;
      }, 0);
      return totalStepCost + stepDefectCost;
    }, 0);
  },

  getTotalCycleCost: () => {
    const { selectedMapId, maps } = get();
    if (!selectedMapId) return 0;
    const currentMap = maps.find(map => map.id === selectedMapId);
    if (!currentMap || !currentMap.steps) return 0;
    const laborRate = currentMap.laborRate || 25; // Use map's labor rate or default
    return currentMap.steps.reduce((total, step) => {
      const defectCosts = (step.risks || []).reduce((totalRiskCost, risk) => {
        const riskCost = (risk.timeImpact / 60) * laborRate + (risk.additionalCost || 0);
        return totalRiskCost + riskCost;
      }, 0);
      return total + (step.cycleCost || 0) + (step.inventoryCosts || 0) + defectCosts;
    }, 0);
  },

  getThroughput: () => {
    const { selectedMapId, maps } = get();
    if (!selectedMapId) return 0;
    const currentMap = maps.find(map => map.id === selectedMapId);
    if (!currentMap || !currentMap.processAccounting) return 0;
    return currentMap.processAccounting.revenue - currentMap.processAccounting.inventory;
  },

  getEBITDA: () => {
    const { getThroughput, selectedMapId, maps } = get();
    const currentMap = maps.find(map => map.id === selectedMapId);
    if (!currentMap || !currentMap.processAccounting) return 0;
    return getThroughput() - currentMap.processAccounting.operatingExpenses;
  },

}));
