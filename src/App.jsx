import { useState } from 'react'
import './App.css'
import ValueStreamMapList from './features/ProcessMap/components/ValueStreamMapList.jsx'
import Metrics from './features/ProcessMap/components/Metrics.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Value Stream Mapping App</h1>
      <ValueStreamMapList />
      <Metrics />
    </div>
  )
}

export default App