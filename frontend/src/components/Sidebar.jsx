import { Link, useLocation } from 'react-router-dom';
import { useDashboardStore } from '../hooks/useDashboardStore';

/**
 * Sidebar Navigation Component
 */
function Sidebar() {
  const location = useLocation();
  const { user } = useDashboardStore();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    ...(user?.role === 'Admin' ? [{ path: '/users', label: 'Users', icon: '👥' }] : []),
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">
          <span className="logo-icon">🧬</span>
          <span className="logo-text">Redcliffe x MediBuddy</span>
        </h1>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name">{user?.email?.split('@')[0]}</p>
            <p className="user-role">{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
