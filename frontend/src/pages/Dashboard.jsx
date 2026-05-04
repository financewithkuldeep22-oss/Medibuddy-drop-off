import { useEffect, useRef } from 'react';
import { useDashboardStore } from '../hooks/useDashboardStore';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/DataTable';

/**
 * Dashboard Page Component
 * Premium Hyper-Glass 2.0 UI with GSAP Animations
 */
function Dashboard() {
  const { 
    fetchDashboardData, 
    isLoading, 
    error, 
    activeTab,
    setActiveTab
  } = useDashboardStore();
  
  const dashboardRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // GSAP Hyper-Glass Motion Initialization
  useEffect(() => {
    if (!window.gsap || !dashboardRef.current) return;

    const gsap = window.gsap;

    // Initialize Hyper-Glass Motion Engine
    const initHyperGlassMotion = () => {
      // Glass card tilt effect on mousemove
      const glassCards = document.querySelectorAll('.glass-card');
      
      glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 30;
          const rotateY = (centerX - x) / 30;

          gsap.to(card, {
            duration: 0.3,
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: 'power1.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            duration: 0.5,
            rotationX: 0,
            rotationY: 0,
            ease: 'power2.out'
          });
        });
      });

      // Magnetic button effect
      const buttons = document.querySelectorAll('.btn-apple, .icon-btn');
      
      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            duration: 0.3,
            scale: 1.05,
            ease: 'back.out(1.7)'
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            duration: 0.3,
            scale: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });

      // Stagger animation for table rows (handled in DataTable component)
      // Fade-in animation for the entire dashboard
      gsap.fromTo(dashboardRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out',
          delay: 0.1
        }
      );

      // Animate filter bar elements
      const filterElements = document.querySelectorAll('.seg-btn, .search-wrapper, .filter-select');
      gsap.fromTo(filterElements,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    };

    // Run initialization after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initHyperGlassMotion, 100);

    return () => clearTimeout(timeoutId);
  }, [activeTab, isLoading]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Syncing latest data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p className="error-message">{error}</p>
        <button className="btn-apple" onClick={() => fetchDashboardData()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page" ref={dashboardRef}>
      <FilterBar />
      
      <div className="table-container">
        <DataTable />
      </div>
    </div>
  );
}

export default Dashboard;
