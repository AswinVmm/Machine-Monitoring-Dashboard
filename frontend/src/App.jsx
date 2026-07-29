import { useState } from 'react'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {

  return (
    <div className="app">
      <header className="app-header">
        <h1>IIoT Machine Monitoring Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  )
}

export default App
