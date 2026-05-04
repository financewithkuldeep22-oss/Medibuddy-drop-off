import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { useDashboardStore } from './hooks/useDashboardStore';

/**
 * Main App Component with Routing
 */
function App() {
  const { user, initialize, isLoading } = useDashboardStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get user email from localStorage or prompt for it
    // In production, this would come from your auth provider
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedEmail) {
      initialize(storedEmail).then((success) => {
        setIsInitialized(true);
      });
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Initializing...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
