
import './App.css'
import ValueStreamMapList from './features/ProcessMap/components/ValueStreamMapList.jsx'
import Metrics from './features/ProcessMap/components/Metrics.jsx'
import Card from './components/Card.jsx';

function App() {
  

  return (
    <div className="bg-background min-h-screen text-text p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-text">Value Stream Mapping App</h1>
      <div className="space-y-8">
        <ValueStreamMapList />
        <Metrics />
      </div>
    </div>
  )
}

export default App