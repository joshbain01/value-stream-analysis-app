import React from 'react';
import { useProcessMapStore } from '../useProcessMapStore';
import InputField from '../../../components/InputField.jsx';

const Metrics = () => {
  const { maps, selectedMapId, getTotalProcessTime, getTotalDefectCost, getTotalCycleCost, getThroughput, getEBITDA, updateMapDetails } = useProcessMapStore();
  const currentMap = maps.find(map => map.id === selectedMapId);

  if (!currentMap) {
    return <div className="text-text-muted">Select a map to see its metrics.</div>;
  }

  const { processAccounting = {}, timeInMotion = 0, laborRate = 25 } = currentMap;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    if (name === 'timeInMotion' || name === 'laborRate') {
      updateMapDetails(name, numericValue);
    } else {
      const updatedAccounting = {
        ...processAccounting,
        [name]: numericValue,
      };
      updateMapDetails('processAccounting', updatedAccounting);
    }
  };

  return (
    <div className="border border-muted p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-text">High-Level Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Revenue</label>
          <InputField type="number" name="revenue" value={processAccounting.revenue || 0} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Inventory</label>
          <InputField type="number" name="inventory" value={processAccounting.inventory || 0} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Operating Expenses</label>
          <InputField type="number" name="operatingExpenses" value={processAccounting.operatingExpenses || 0} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Time in Motion (min)</label>
          <InputField type="number" name="timeInMotion" value={timeInMotion} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Labor Rate ($/hr)</label>
          <InputField type="number" name="laborRate" value={laborRate} onChange={handleChange} className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4 pt-4 border-t border-muted">
        <div className="bg-surface p-3 rounded-md">
          <h3 className="text-lg font-semibold text-text">Total Process Time</h3>
          <p className="text-xl font-bold text-primary">{getTotalProcessTime()} minutes</p>
        </div>
        <div className="bg-surface p-3 rounded-md">
          <h3 className="text-lg font-semibold text-text">Total Defect Cost</h3>
          <p className="text-xl font-bold text-red-400">${getTotalDefectCost().toFixed(2)}</p>
        </div>
        <div className="bg-surface p-3 rounded-md">
          <h3 className="text-lg font-semibold text-text">Total Cycle Cost</h3>
          <p className="text-xl font-bold text-blue-400">${getTotalCycleCost().toFixed(2)}</p>
        </div>
        <div className="bg-surface p-3 rounded-md">
          <h3 className="text-lg font-semibold text-text">Throughput</h3>
          <p className="text-xl font-bold text-primary">${getThroughput().toFixed(2)}</p>
        </div>
        <div className="bg-surface p-3 rounded-md">
          <h3 className="text-lg font-semibold text-text">EBITDA</h3>
          <p className="text-xl font-bold text-green-400">${getEBITDA().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
