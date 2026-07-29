export default function Filters({ statusFilter, searchTerm, onStatusChange, onSearchChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All statuses</option>
        <option value="running">Running</option>
        <option value="idle">Idle</option>
        <option value="fault">Fault</option>
      </select>
    </div>
  )
}
