import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useProcessMapStore } from './useProcessMapStore';
import { collection, getDocs, doc, deleteDoc, connectFirestoreEmulator } from 'firebase/firestore';
import { db } from '@services/firebase';

// IMPORTANT: For these integration tests, ensure you are using a dedicated Firebase project
// for testing or the Firebase Emulator Suite to avoid polluting your development/production data.
//
// To use Firebase Emulator Suite:
// 1. Install Firebase CLI: `npm install -g firebase-tools`
// 2. In your project root, run `firebase init` and select Firestore emulator.
// 3. Start the emulator: `firebase emulators:start`
// 4. Configure your Firebase SDK to connect to the emulator.
//    In src/services/firebase.js, you might add:
//    if (window.location.hostname === "localhost") {
//      connectFirestoreEmulator(db, "localhost", 8080); // Use your emulator port
//    }

describe('useProcessMapStore Firebase Integration', () => {
  // Clean up Firestore before each test
  beforeEach(async () => {
    connectFirestoreEmulator(db, "localhost", 8080); // Explicitly connect to emulator
    const querySnapshot = await getDocs(collection(db, 'valueStreamMaps'));
    const deletePromises = querySnapshot.docs.map((d) => deleteDoc(doc(db, 'valueStreamMaps', d.id)));
    await Promise.all(deletePromises);
    useProcessMapStore.setState({ maps: [], selectedMapId: null }); // Reset Zustand store
  });

  it('should create and fetch a new map', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Test Map ' + Date.now();

    await store.createMap(mapName);

    // Fetch maps and check if the new map exists
    await new Promise(resolve => setTimeout(resolve, 500)); // Give Firebase time to sync
    const fetchedMaps = (await getDocs(collection(db, 'valueStreamMaps'))).docs.map(d => ({ id: d.id, ...d.data() }));
    expect(fetchedMaps.some(map => map.name === mapName)).toBe(true);
    expect(store.maps.some(map => map.name === mapName)).toBe(true);
  });

  it('should delete a map', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Map to Delete ' + Date.now();

    await store.createMap(mapName);
    await new Promise(resolve => setTimeout(resolve, 500)); // Give Firebase time to sync

    const initialMaps = (await getDocs(collection(db, 'valueStreamMaps'))).docs.map(d => ({ id: d.id, ...d.data() }));
    const mapToDelete = initialMaps.find(map => map.name === mapName);
    expect(mapToDelete).toBeDefined();

    await store.deleteMap(mapToDelete.id);
    await new Promise(resolve => setTimeout(resolve, 500)); // Give Firebase time to sync

    const remainingMaps = (await getDocs(collection(db, 'valueStreamMaps'))).docs.map(d => ({ id: d.id, ...d.data() }));
    expect(remainingMaps.some(map => map.name === mapName)).toBe(false);
    expect(store.maps.some(map => map.name === mapName)).toBe(false);
  });

  it('should add a step to a map', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Map for Steps ' + Date.now();
    await store.createMap(mapName);
    await new Promise(resolve => setTimeout(resolve, 500));
    const createdMap = store.maps.find(map => map.name === mapName);
    store.setSelectedMapId(createdMap.id);

    const stepName = 'New Step ' + Date.now();
    await store.addStep(stepName, 10, 'Engineer');
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedMap = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    expect(updatedMap.data().steps.some(step => step.name === stepName)).toBe(true);
  });

  it('should update a step in a map', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Map for Update Step ' + Date.now();
    await store.createMap(mapName);
    await new Promise(resolve => setTimeout(resolve, 500));
    const createdMap = store.maps.find(map => map.name === mapName);
    store.setSelectedMapId(createdMap.id);

    const stepName = 'Original Step ' + Date.now();
    await store.addStep(stepName, 10, 'Engineer');
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterAdd = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const originalStep = mapAfterAdd.data().steps.find(step => step.name === stepName);
    expect(originalStep).toBeDefined();

    const updatedStep = { ...originalStep, name: 'Updated Step Name', time: 20 };
    await store.updateStep(originalStep, updatedStep);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterUpdate = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    expect(mapAfterUpdate.data().steps.some(step => step.name === 'Updated Step Name')).toBe(true);
    expect(mapAfterUpdate.data().steps.some(step => step.name === stepName)).toBe(false);
  });

  it('should delete a step from a map', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Map for Delete Step ' + Date.now();
    await store.createMap(mapName);
    await new Promise(resolve => setTimeout(resolve, 500));
    const createdMap = store.maps.find(map => map.name === mapName);
    store.setSelectedMapId(createdMap.id);

    const stepName = 'Step to Delete ' + Date.now();
    await store.addStep(stepName, 10, 'Engineer');
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterAdd = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const stepToDelete = mapAfterAdd.data().steps.find(step => step.name === stepName);
    expect(stepToDelete).toBeDefined();

    await store.deleteStep(stepToDelete.id);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterDelete = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    expect(mapAfterDelete.data().steps.some(step => step.name === stepName)).toBe(false);
  });

  it('should add a risk to a step', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Map for Risks ' + Date.now();
    await store.createMap(mapName);
    await new Promise(resolve => setTimeout(resolve, 500));
    const createdMap = store.maps.find(map => map.name === mapName);
    store.setSelectedMapId(createdMap.id);

    const stepName = 'Step with Risk ' + Date.now();
    await store.addStep(stepName, 10, 'Engineer');
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterStepAdd = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const stepWithRisk = mapAfterStepAdd.data().steps.find(s => s.name === stepName);
    expect(stepWithRisk).toBeDefined();

    const riskDescription = 'New Risk ' + Date.now();
    await store.addRisk(stepWithRisk, riskDescription, 5, 0.5, 100);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterRiskAdd = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const updatedStep = mapAfterRiskAdd.data().steps.find(s => s.id === stepWithRisk.id);
    expect(updatedStep.risks.some(risk => risk.description === riskDescription)).toBe(true);
  });

  it('should delete a risk from a step', async () => {
    const store = useProcessMapStore.getState();
    const mapName = 'Map for Delete Risk ' + Date.now();
    await store.createMap(mapName);
    await new Promise(resolve => setTimeout(resolve, 500));
    const createdMap = store.maps.find(map => map.name === mapName);
    store.setSelectedMapId(createdMap.id);

    const stepName = 'Step with Risk to Delete ' + Date.now();
    await store.addStep(stepName, 10, 'Engineer');
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterStepAdd = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const stepWithRisk = mapAfterStepAdd.data().steps.find(s => s.name === stepName);
    expect(stepWithRisk).toBeDefined();

    const riskDescription = 'Risk to Delete ' + Date.now();
    await store.addRisk(stepWithRisk, riskDescription, 5, 0.5, 100);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterRiskAdd = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const updatedStep = mapAfterRiskAdd.data().steps.find(s => s.id === stepWithRisk.id);
    const riskToDelete = updatedStep.risks.find(risk => risk.description === riskDescription);
    expect(riskToDelete).toBeDefined();

    await store.deleteRisk(stepWithRisk, riskToDelete.id);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mapAfterRiskDelete = (await getDocs(collection(db, 'valueStreamMaps'))).docs.find(d => d.id === createdMap.id);
    const finalStep = mapAfterRiskDelete.data().steps.find(s => s.id === stepWithRisk.id);
    expect(finalStep.risks.some(risk => risk.description === riskDescription)).toBe(false);
  });
});
