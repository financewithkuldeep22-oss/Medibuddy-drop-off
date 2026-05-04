export default function SummaryCards({ summary }) {
  return (
    <div className="summary-cards glass-card">
      <h3>Summary Overview</h3>
      <p>Summary cards component - displays key metrics from {summary?.length || 0} cities</p>
    </div>
  );
}
