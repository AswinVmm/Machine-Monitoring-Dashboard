import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMachines,
  acknowledgeFault,
  selectMachine,
  clearSelectedMachine,
  setStatusFilter,
  setSearchTerm,
} from '../store/machinesSlice'
import MachineCard from './MachineCard'
import MachineDetail from './MachineDetail'
import Filters from './Filters'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { list, status, error, selectedId, statusFilter, searchTerm } = useSelector(
    (state) => state.machines
  )

  useEffect(() => {
    dispatch(fetchMachines())
  }, [dispatch])

  const filtered = list.filter((m) => {
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const selectedMachine = list.find((m) => m.id === selectedId) || null

  if (status === 'loading') return <p className="info-msg">Loading machines...</p>
  if (status === 'failed') return <p className="error-msg">Error: {error}</p>

  return (
    <div className="dashboard">
      <Filters
        statusFilter={statusFilter}
        searchTerm={searchTerm}
        onStatusChange={(val) => dispatch(setStatusFilter(val))}
        onSearchChange={(val) => dispatch(setSearchTerm(val))}
      />

      <div className="machine-grid">
        {filtered.length === 0 && <p className="info-msg">No machines match your filters.</p>}
        {filtered.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onSelect={(id) => dispatch(selectMachine(id))}
            onAcknowledge={(id) => dispatch(acknowledgeFault(id))}
          />
        ))}
      </div>

      <MachineDetail
        machine={selectedMachine}
        onClose={() => dispatch(clearSelectedMachine())}
        onAcknowledge={(id) => dispatch(acknowledgeFault(id))}
      />
    </div>
  )
}
