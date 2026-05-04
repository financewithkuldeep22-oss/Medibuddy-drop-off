export default function DataTable({ title, data, type, count }) {
  return (
    <div className="data-table glass-card">
      <div className="table-header">
        <h3>{title}</h3>
        <span className="badge">{count} records</span>
      </div>
      <div className="table-body">
        <p>Data table component for {type} - displays {data?.length || 0} records</p>
      </div>
    </div>
  );
}
