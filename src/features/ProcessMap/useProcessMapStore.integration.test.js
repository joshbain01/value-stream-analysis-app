import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useProcessMapStore } from './useProcessMapStore';
import { db } from '../../services/firebase';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

// Helper function to clear the test database
const clearDatabase = async () => {
  const mapsCollection = collection(db, 'valueStreamMaps');
  const mapsSnapshot = await getDocs(mapsCollection);
  const deletePromises = mapsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
};

describe('useProcessMapStore integration tests', () => {
  let unsubscribe;

  beforeEach(async () => {
    await clearDatabase();
    // Reset the store state for a clean test environment
    act(() => {
      useProcessMapStore.setState({ maps: [], selectedMapId: null });
    });
  });

  afterEach(() => {
    // Clean up the listener after each test
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  it('should create a new map and fetch it', async () => {
    const { result } = renderHook(() => useProcessMapStore());

    // Set up the Firestore listener
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });

    // Create a new map
    await act(async () => {
      await result.current.createMap('Test Map');
    });

    // Wait for the onSnapshot listener to fire and update the state
    await waitFor(() => {
      expect(result.current.maps.length).toBe(1);
    });

    expect(result.current.maps[0].title).toBe('Test Map');
  });

  it('should delete a map', async () => {
    const { result } = renderHook(() => useProcessMapStore());
    let mapId;

    // Set up the Firestore listener
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });

    // Create a map to be deleted
    await act(async () => {
      mapId = await result.current.createMap('Map to Delete');
    });

    // Wait for the map to appear in the state
    await waitFor(() => {
      expect(result.current.maps.length).toBe(1);
      expect(result.current.maps.find(m => m.title === 'Map to Delete')).toBeDefined();
    });

    // Delete the map
    await act(async () => {
      await result.current.deleteMap(result.current.selectedMapId);
    });

    // Wait for the map to be removed from the state
    await waitFor(() => {
      expect(result.current.maps.length).toBe(0);
    });
  });

  it('should add a step to a map', async () => {
    const { result } = renderHook(() => useProcessMapStore());

    // Set up the Firestore listener
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });

    // Create a map
    await act(async () => {
      await result.current.createMap('Map with Steps');
    });

    // Wait for the map to be created
    await waitFor(() => {
      expect(result.current.maps.length).toBe(1);
    });

    // Add a step
    await act(async () => {
      await result.current.addStep('First Step', 10, 'Developer', 100, 50);
    });

    // Wait for the step to be added
    await waitFor(() => {
      const map = result.current.maps[0];
      expect(map.steps).toBeDefined();
      expect(map.steps.length).toBe(1);
    });

    const step = result.current.maps[0].steps[0];
    expect(step.name).toBe('First Step');
    expect(step.time).toBe(10);
    expect(step.employeeFunction).toBe('Developer');
    expect(step.cycleCost).toBe(100);
    expect(step.inventoryCosts).toBe(50);
  });

  it('should update a step', async () => {
    const { result } = renderHook(() => useProcessMapStore());
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });
    await act(async () => {
      await result.current.createMap('Map to Update Step');
    });
    await waitFor(() => expect(result.current.maps.length).toBe(1));
    await act(async () => {
      await result.current.addStep('Initial Step', 5, 'Tester', 50, 25);
    });
    await waitFor(() => expect(result.current.maps[0].steps.length).toBe(1));

    const oldStep = result.current.maps[0].steps[0];
    const newStep = { ...oldStep, name: 'Updated Step', time: 15 };

    await act(async () => {
      await result.current.updateStep(oldStep, newStep);
    });

    await waitFor(() => {
      const updatedStep = result.current.maps[0].steps[0];
      expect(updatedStep.name).toBe('Updated Step');
      expect(updatedStep.time).toBe(15);
    });
  });

  it('should delete a step', async () => {
    const { result } = renderHook(() => useProcessMapStore());
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });
    await act(async () => {
      await result.current.createMap('Map to Delete Step');
    });
    await waitFor(() => expect(result.current.maps.length).toBe(1));
    await act(async () => {
      await result.current.addStep('Step to be Deleted', 5, 'Tester', 50, 25);
    });
    await waitFor(() => expect(result.current.maps[0].steps.length).toBe(1));

    const stepToDelete = result.current.maps[0].steps[0];

    await act(async () => {
      await result.current.deleteStep(stepToDelete.id);
    });

    await waitFor(() => {
      expect(result.current.maps[0].steps.length).toBe(0);
    });
  });

  it('should add a risk to a step', async () => {
    const { result } = renderHook(() => useProcessMapStore());
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });
    await act(async () => {
      await result.current.createMap('Map with Risks');
    });
    await waitFor(() => expect(result.current.maps.length).toBe(1));
    await act(async () => {
      await result.current.addStep('Step with Risk', 10, 'QA', 100, 50);
    });
    await waitFor(() => expect(result.current.maps[0].steps.length).toBe(1));

    const step = result.current.maps[0].steps[0];
    await act(async () => {
      await result.current.addRisk(step, 'New Risk', 5, 50, 200);
    });

    await waitFor(() => {
      const updatedStep = result.current.maps[0].steps[0];
      expect(updatedStep.risks).toBeDefined();
      expect(updatedStep.risks.length).toBe(1);
    });

    const risk = result.current.maps[0].steps[0].risks[0];
    expect(risk.description).toBe('New Risk');
    expect(risk.timeImpact).toBe(5);
    expect(risk.probability).toBe(50);
    expect(risk.additionalCost).toBe(200);
  });

  it('should delete a risk from a step', async () => {
    const { result } = renderHook(() => useProcessMapStore());
    act(() => {
      unsubscribe = result.current.fetchMaps();
    });
    await act(async () => {
      await result.current.createMap('Map to Delete Risk');
    });
    await waitFor(() => expect(result.current.maps.length).toBe(1));
    await act(async () => {
      await result.current.addStep('Step with Risk to Delete', 10, 'QA', 100, 50);
    });
    await waitFor(() => expect(result.current.maps[0].steps.length).toBe(1));
    const step = result.current.maps[0].steps[0];
    await act(async () => {
      await result.current.addRisk(step, 'Risk to be Deleted', 5, 50, 200);
    });
    await waitFor(() => expect(result.current.maps[0].steps[0].risks.length).toBe(1));

    const riskToDelete = result.current.maps[0].steps[0].risks[0];
    await act(async () => {
      await result.current.deleteRisk(step, riskToDelete.id);
    });

    await waitFor(() => {
      const updatedStep = result.current.maps[0].steps[0];
      expect(updatedStep.risks.length).toBe(0);
    });
  });
});
