import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDashboardStore } from '../hooks/useDashboardStore';
import Sidebar from './Sidebar';
import Header from './Header';
import gsap from 'gsap';

/**
 * Main Layout Component
 * Wraps all pages with Sidebar and Header
 */
function Layout() {
  const location = useLocation();
  const { user, enableRealtimeUpdates, disableRealtimeUpdates } = useDashboardStore();

  useEffect(() => {
    // Enable real-time updates when user is authenticated
    enableRealtimeUpdates();
    
    // GSAP entrance animation
    gsap.fromTo('.layout-container', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
    
    return () => {
      disableRealtimeUpdates();
    };
  }, []);

  useEffect(() => {
    // Page transition animation on route change
    gsap.fromTo('.page-content',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
