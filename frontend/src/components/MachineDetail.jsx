import StatusBadge from './StatusBadge'

export default function MachineDetail({ machine, onClose, onAcknowledge }) {
  if (!machine) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2>{machine.name}</h2>
        <StatusBadge status={machine.status} />
        <div className="modal-details">
          <p><strong>ID:</strong> {machine.id}</p>
          <p><strong>Temperature:</strong> {machine.temperature}&deg;C</p>
          <p><strong>Vibration:</strong> {machine.vibration} mm/s</p>
          <p><strong>Last Updated:</strong> {new Date(machine.lastUpdated).toLocaleString()}</p>
        </div>
        {machine.status === 'fault' && (
          <button className="ack-btn" onClick={() => onAcknowledge(machine.id)}>
            Acknowledge Fault
          </button>
        )}
      </div>
    </div>
  )
}
