import { useEffect } from 'react';
import { useDashboardStore } from '../hooks/useDashboardStore';
import SummaryCards from '../components/SummaryCards';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';

/**
 * Dashboard Page Component
 */
function Dashboard() {
  const { 
    fetchDashboardData, 
    isLoading, 
    error, 
    summary, 
    pending,
    log,
    create,
    incomplete,
    shared,
    cancelled
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={() => fetchDashboardData()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <FilterBar />
      
      <SummaryCards summary={summary} />
      
      <div className="tables-section">
        <DataTable 
          title="Pending Records" 
          data={pending} 
          type="pending"
          count={pending.length}
        />
        
        <DataTable 
          title="Today's Logs" 
          data={log} 
          type="log"
          count={log.length}
        />
        
        <DataTable 
          title="To Create" 
          data={create} 
          type="create"
          count={create.length}
        />
        
        <DataTable 
          title="Incomplete" 
          data={incomplete} 
          type="incomplete"
          count={incomplete.length}
        />
        
        <DataTable 
          title="Shared" 
          data={shared} 
          type="shared"
          count={shared.length}
        />
        
        <DataTable 
          title="Cancelled" 
          data={cancelled} 
          type="cancelled"
          count={cancelled.length}
        />
      </div>
    </div>
  );
}

export default Dashboard;
