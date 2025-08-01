import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@services/firebase';

const Metrics = ({ mapId }) => {
  const [metrics, setMetrics] = useState({ revenue: 0, inventory: 0, operatingExpenses: 0 });

  useEffect(() => {
    if (mapId) {
      const unsubscribe = onSnapshot(doc(db, 'valueStreamMaps', mapId), (doc) => {
        if (doc.exists()) {
          setMetrics(doc.data().metrics || { revenue: 0, inventory: 0, operatingExpenses: 0 });
        }
      });
      return () => unsubscribe();
    }
  }, [mapId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetrics(prevMetrics => ({ ...prevMetrics, [name]: Number(value) }));
  };

  const handleBlur = async () => {
    if (mapId) {
      const mapRef = doc(db, 'valueStreamMaps', mapId);
      await updateDoc(mapRef, { metrics });
    }
  };

  const throughput = metrics.revenue - metrics.inventory - metrics.operatingExpenses;
  const ebitda = throughput - metrics.operatingExpenses;

  return (
    <div className="border p-4">
      <h2 className="text-2xl font-bold mb-4">High-Level Metrics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">Revenue</label>
          <input type="number" name="revenue" value={metrics.revenue} onChange={handleChange} onBlur={handleBlur} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Inventory</label>
          <input type="number" name="inventory" value={metrics.inventory} onChange={handleChange} onBlur={handleBlur} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Operating Expenses</label>
          <input type="number" name="operatingExpenses" value={metrics.operatingExpenses} onChange={handleChange} onBlur={handleBlur} className="border p-2 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h3 className="text-xl font-bold">Throughput</h3>
          <p>{throughput}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">EBITDA</h3>
          <p>{ebitda}</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
