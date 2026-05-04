import { useLocation } from 'react-router-dom';
import { useDashboardStore } from '../hooks/useDashboardStore';
import { useEffect, useRef } from 'react';

/**
 * Premium Hyper-Glass Sidebar Component
 * Matches exact structure from index.html
 */
function Sidebar() {
  const location = useLocation();
  const { 
    user, 
    summary, 
    lastUpdated, 
    citySummary,
    collectionTrendData,
    toggleSidebar: toggleSidebarState 
  } = useDashboardStore();
  
  const sidebarRef = useRef(null);

  // Handle mobile sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidebarRef.current) {
        sidebarRef.current.classList.remove('active-mobile');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKpiClick = (tab) => {
    useDashboardStore.getState().setActiveTab(tab);
    if (window.innerWidth <= 768) {
      toggleSidebarState();
    }
  };

  const openModal = (modalId) => {
    useDashboardStore.getState().openModal(modalId);
  };

  const openFullPage = (pageId) => {
    useDashboardStore.getState().openFullPage(pageId);
  };

  return (
    <>
      <div id="mobile-overlay" className="mobile-overlay" onClick={() => toggleSidebarState()}></div>
      <aside className="sidebar" ref={sidebarRef} id="sidebar">
        {/* KPI Grid - Exact match from index.html */}
        <div className="kpi-grid">
          <div 
            className="glass-card full-width" 
            id="card-pending" 
            style={{ borderBottom: '3px solid var(--danger)' }}
            onClick={() => handleKpiClick('pending')}
          >
            <div className="kpi-num" style={{ color: 'var(--danger)' }}>
              {summary?.pendingCount || 0}
            </div>
            <div className="kpi-lbl">Pending</div>
          </div>
          
          <div 
            className="glass-card" 
            id="card-create" 
            style={{ borderBottom: '3px solid var(--primary)' }}
            onClick={() => handleKpiClick('create')}
          >
            <div className="kpi-num" style={{ color: 'var(--primary)' }}>
              {summary?.toCreateCount || 0}
            </div>
            <div className="kpi-lbl">To Create</div>
          </div>
          
          <div 
            className="glass-card" 
            id="card-incomplete" 
            style={{ borderBottom: '3px solid var(--warning)' }}
            onClick={() => handleKpiClick('incomplete')}
          >
            <div className="kpi-num" style={{ color: 'var(--warning)' }}>
              {summary?.incompleteCount || 0}
            </div>
            <div className="kpi-lbl">Incomplete</div>
          </div>
          
          <div 
            className="glass-card full-width" 
            id="card-shared" 
            style={{ borderBottom: '3px solid var(--success)' }}
            onClick={() => handleKpiClick('shared')}
          >
            <div className="kpi-num" style={{ color: 'var(--success)' }}>
              {summary?.sharedCount || 0}
            </div>
            <div className="kpi-lbl">Shared</div>
          </div>
          
          <div 
            className="glass-card full-width" 
            id="card-log" 
            style={{ borderBottom: '3px solid var(--text-main)' }}
            onClick={() => handleKpiClick('log')}
          >
            <div className="kpi-num">{summary?.todayLogCount || 0}</div>
            <div className="kpi-lbl">Todays Logs</div>
          </div>
        </div>

        {/* Last Synced Time */}
        <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-sub)', fontWeight: 600 }}>
          Last Synced: <span id="last-update" style={{ color: 'var(--text-main)' }}>
            {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '--:--'}
          </span>
        </div>

        {/* City Summary Box */}
        <div className="summary-box">
          <div className="summary-header">
            <span>CITY SUMMARY</span>
            <span style={{ cursor: 'pointer' }} onClick={() => openFullPage('cityFullPage')}>⤢</span>
          </div>
          <div className="city-list-wrapper" id="city-summary">
            {citySummary && citySummary.length > 0 ? (
              citySummary.slice(0, 5).map((city, idx) => (
                <div key={idx} className="city-row">
                  <span>{city.city || city.name}</span>
                  <span className="badge badge-total">{city.count}</span>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '11px', color: 'var(--text-sub)', padding: '8px' }}>No data</div>
            )}
          </div>
        </div>

        {/* Collection Trend Widget - Premium Design */}
        <div
          style={{
            background: 'var(--card-bg)',
            backdropFilter: 'blur(30px)',
            borderRadius: '18px',
            border: '1px solid var(--glass-border)',
            padding: '14px 14px 12px',
            marginTop: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            minHeight: '220px',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Premium top accent gradient bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 60%, transparent 100%)',
              borderRadius: '18px 18px 0 0',
              pointerEvents: 'none'
            }}
          ></div>
          
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 3px 8px rgba(16,185,129,0.35)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
                  Collection Trend
                </div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Last 5 days
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select 
                id="mini-chart-city" 
                onChange={() => {}}
                style={{
                  fontSize: '9px',
                  padding: '2px 5px',
                  borderRadius: '5px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  maxWidth: '76px'
                }}
              >
                <option value="ALL">All Cities</option>
              </select>
              <button 
                onClick={() => openFullPage('analyticsFullPage')}
                title="Full Analytics"
                style={{
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-sub)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  transition: '0.2s',
                  flexShrink: 0,
                  padding: 0
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.color = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'var(--border-light)';
                  e.target.style.color = 'var(--text-sub)';
                }}
              >
                ⤢
              </button>
            </div>
          </div>

          {/* KPI Stats: Total + PPMC/Retail Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.05))',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '10px',
                padding: '9px 11px'
              }}
            >
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>
                5-Day Total
              </div>
              <div id="mini-chart-badge" style={{ fontSize: '24px', fontWeight: 900, color: '#065f46', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                {collectionTrendData?.total || '--'}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '5px' }}>
              <div
                style={{
                  background: 'rgba(239,68,68,0.07)',
                  border: '1px solid rgba(239,68,68,0.18)',
                  borderRadius: '7px',
                  padding: '4px 8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.3px' }}>PPMC</span>
                <span id="mini-ppmc-badge" style={{ fontSize: '14px', fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>
                  {collectionTrendData?.ppmc || '--'}
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(59,130,246,0.07)',
                  border: '1px solid rgba(59,130,246,0.18)',
                  borderRadius: '7px',
                  padding: '4px 8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Retail</span>
                <span id="mini-retail-badge" style={{ fontSize: '14px', fontWeight: 900, color: '#2563eb', lineHeight: 1 }}>
                  {collectionTrendData?.retail || '--'}
                </span>
              </div>
            </div>
          </div>

          {/* Chart Canvas Placeholder */}
          <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: '95px' }}>
            <canvas id="miniTrendChart"></canvas>
          </div>
        </div>

        {/* Action Buttons - Exact match from index.html */}
        <button 
          className="btn-apple btn-primary" 
          style={{ marginBottom: '5px', boxShadow: '0 4px 10px rgba(0,122,255,0.3)' }}
          onClick={() => openModal('uploadCsvModal')}
        >
          📥 Import Data
        </button>
        
        <button 
          className="btn-apple" 
          style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', marginBottom: '5px' }}
          onClick={() => openModal('dropzoneModal')}
        >
          📂 Smart PDF Dropzone
        </button>
        
        <button 
          className="btn-apple" 
          style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', marginBottom: '5px' }}
          onClick={() => openModal('emailModal')}
        >
          📧 E-mail Generator
        </button>
        
        <button 
          className="btn-apple" 
          style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', marginBottom: '5px' }}
          onClick={() => {}}
        >
          🤖 API Auto-Match
        </button>
        
        <button 
          className="btn-apple" 
          style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)', marginBottom: '5px' }}
          onClick={() => openModal('waModal')}
        >
          📱 WA Export
        </button>

        <button 
          className="btn-apple" 
          style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', marginBottom: '5px' }}
          onClick={() => openFullPage('bulkTrfModal')}
        >
          📸 Bulk TRF Scanner
        </button>

        <button 
          className="btn-apple btn-danger" 
          onClick={() => openFullPage('auditFullPage')}
        >
          🚨 Daily Audit
        </button>

        {/* Sidebar Footer - User Info */}
        <div className="sidebar-footer">
          <div className="user-info">
            <img 
              id="user-avatar" 
              src={`https://ui-avatars.com/api/?name=${user?.email?.charAt(0) || 'U'}&background=007AFF&color=fff`} 
              alt="User" 
              className="user-avatar-img"
            />
            <div className="user-details">
              <p className="user-name">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="user-role">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
