import StatusBadge from './StatusBadge'

export default function MachineCard({ machine, onSelect, onAcknowledge }) {
  return (
    <div
      className={`machine-card status-border-${machine.status}`}
      onClick={() => onSelect(machine.id)}
    >
      <div className="machine-card-header">
        <h3>{machine.name}</h3>
        <StatusBadge status={machine.status} />
      </div>
      <div className="machine-card-body">
        <p><strong>ID:</strong> {machine.id}</p>
        <p><strong>Temperature:</strong> {machine.temperature}&deg;C</p>
        <p><strong>Vibration:</strong> {machine.vibration} mm/s</p>
      </div>
      {machine.status === 'fault' && (
        <button
          className="ack-btn"
          onClick={(e) => {
            e.stopPropagation() // don't also open the detail modal
            onAcknowledge(machine.id)
          }}
        >
          Acknowledge Fault
        </button>
      )}
    </div>
  )
}
