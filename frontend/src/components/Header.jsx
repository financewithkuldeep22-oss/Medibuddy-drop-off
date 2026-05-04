import { useDashboardStore } from '../hooks/useDashboardStore';

/**
 * Header Component
 */
function Header() {
  const { user, lastUpdated, isRealtimeEnabled } = useDashboardStore();

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="page-title">Dashboard</h2>
      </div>
      
      <div className="header-right">
        {isRealtimeEnabled && (
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>Live Sync</span>
          </div>
        )}
        
        {lastUpdated && (
          <span className="last-updated">
            Updated: {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
        
        <div className="user-menu">
          <span className="user-email">{user?.email}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
