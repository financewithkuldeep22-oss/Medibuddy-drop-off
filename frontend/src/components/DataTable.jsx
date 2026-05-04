import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, FileText, Share2, AlertCircle, CheckCircle, Clock, User, Phone, MapPin, Calendar, Activity } from 'lucide-react';
import { useDashboardStore } from '../hooks/useDashboardStore';

const DataTable = () => {
  const { data, activeTab, isLoading, expandRow, collapseRow, expandedRows, openFullPage, refreshData } = useDashboardStore();
  const [localData, setLocalData] = useState([]);
  const tableRef = useRef(null);

  // Filter data based on active tab
  useEffect(() => {
    if (!data) return;
    
    let filtered = [];
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch(activeTab) {
      case 'pending':
        filtered = data.filter(r => r.Status === 'Pending');
        break;
      case 'to-create':
        filtered = data.filter(r => r.Status === 'To Create');
        break;
      case 'incomplete':
        filtered = data.filter(r => r.Status === 'Incomplete');
        break;
      case 'shared':
        filtered = data.filter(r => r.Status === 'Shared');
        break;
      case 'todays':
        filtered = data.filter(r => {
          if (!r.Date) return false;
          const rowDate = new Date(r.Date);
          return rowDate >= todayStart;
        });
        break;
      default:
        filtered = data;
    }
    setLocalData(filtered);
  }, [data, activeTab]);

  // GSAP Stagger Animation for Rows
  useEffect(() => {
    if (window.gsap && tableRef.current) {
      const rows = tableRef.current.querySelectorAll('.compact-row');
      window.gsap.fromTo(rows, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.03, 
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
  }, [localData, activeTab]);

  const toggleExpand = (id) => {
    if (expandedRows.includes(id)) {
      collapseRow(id);
    } else {
      expandRow(id);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'var(--status-pending-bg)';
      case 'to create': return 'var(--status-tocreate-bg)';
      case 'incomplete': return 'var(--status-incomplete-bg)';
      case 'shared': return 'var(--status-shared-bg)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusText = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'var(--status-pending-text)';
      case 'to create': return 'var(--status-tocreate-text)';
      case 'incomplete': return 'var(--status-incomplete-text)';
      case 'shared': return 'var(--status-shared-text)';
      default: return 'var(--text-primary)';
    }
  };

  const getTatColor = (hours) => {
    if (!hours) return 'var(--text-secondary)';
    if (hours < 4) return '#10b981'; // Green
    if (hours < 12) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className="table-container glass-card" ref={tableRef}>
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Syncing latest data...</p>
        </div>
      ) : localData.length === 0 ? (
        <div className="empty-state">
          <Activity size={48} className="empty-icon" />
          <h3>No records found</h3>
          <p>Try adjusting your filters or date range</p>
        </div>
      ) : (
        <>
          <div className="table-header-row">
            <div className="th-expand"></div>
            <div className="th-col">Patient Name</div>
            <div className="th-col">UHID / ID</div>
            <div className="th-col">Package</div>
            <div className="th-col">City</div>
            <div className="th-col">Collection Time</div>
            <div className="th-col">TAT</div>
            <div className="th-col">Status</div>
            <div className="th-col actions">Actions</div>
          </div>
          
          <div className="table-body">
            {localData.map((row, index) => {
              const isExpanded = expandedRows.includes(row.id || index);
              const tatHours = row.TAT ? parseFloat(row.TAT) : null;
              
              return (
                <React.Fragment key={row.id || index}>
                  <div className={`compact-row ${isExpanded ? 'expanded' : ''}`}>
                    <div className="td-expand" onClick={() => toggleExpand(row.id || index)}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    
                    <div className="td-col patient-info">
                      <div className="patient-name">{row.PatientName || 'N/A'}</div>
                      {row.Age && <span className="patient-meta">{row.Age}y • {row.Gender || 'N/A'}</span>}
                    </div>
                    
                    <div className="td-col">
                      <div className="uhid-badge">{row.UHID || row.ID || '---'}</div>
                    </div>
                    
                    <div className="td-col package-cell">
                      <div className="package-name">{row.PackageName || row.Package || 'N/A'}</div>
                      {row.SubPackage && <div className="sub-package">{row.SubPackage}</div>}
                    </div>
                    
                    <div className="td-col">
                      <span className="city-tag">{row.City || 'Unknown'}</span>
                    </div>
                    
                    <div className="td-col">
                      {row.CollectionTime ? (
                        <div className="time-cell">
                          <Clock size={14} className="time-icon" />
                          {new Date(row.CollectionTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      ) : (
                        <span className="no-data">--:--</span>
                      )}
                    </div>
                    
                    <div className="td-col">
                      {tatHours !== null ? (
                        <div className="tat-badge" style={{ color: getTatColor(tatHours), background: `${getTatColor(tatHours)}15` }}>
                          {tatHours.toFixed(1)}h
                        </div>
                      ) : (
                        <span className="no-data">--</span>
                      )}
                    </div>
                    
                    <div className="td-col">
                      <span 
                        className="status-badge" 
                        style={{ background: getStatusColor(row.Status), color: getStatusText(row.Status) }}
                      >
                        {row.Status || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="td-col actions-cell">
                      <button className="icon-btn" title="View Details" onClick={() => openFullPage(row)}>
                        <FileText size={16} />
                      </button>
                      <button className="icon-btn" title="Share Report" onClick={() => {/* Add share logic */}}>
                        <Share2 size={16} />
                      </button>
                      <button className="icon-btn more" title="More">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="expandable-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <User size={14} className="detail-icon" />
                          <span className="detail-label">Referring Doctor:</span>
                          <span className="detail-value">{row.Doctor || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <Phone size={14} className="detail-icon" />
                          <span className="detail-label">Contact:</span>
                          <span className="detail-value">{row.Phone || row.Mobile || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <MapPin size={14} className="detail-icon" />
                          <span className="detail-label">Address:</span>
                          <span className="detail-value">{row.Address || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <Calendar size={14} className="detail-icon" />
                          <span className="detail-label">Order Date:</span>
                          <span className="detail-value">{row.OrderDate ? new Date(row.OrderDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="detail-item full-width">
                          <AlertCircle size={14} className="detail-icon" />
                          <span className="detail-label">Remarks:</span>
                          <span className="detail-value">{row.Remarks || 'No remarks available'}</span>
                        </div>
                      </div>
                      
                      <div className="action-bar">
                        <button className="btn-apple btn-small" onClick={() => {/* Add TRF logic */}}>
                          <FileText size={14} /> Download TRF
                        </button>
                        <button className="btn-apple btn-small btn-secondary" onClick={() => {/* Add WhatsApp logic */}}>
                          <Share2 size={14} /> Send via WhatsApp
                        </button>
                        {row.Status === 'Incomplete' && (
                          <button className="btn-apple btn-small btn-warning" onClick={() => {/* Add Complete logic */}}>
                            <CheckCircle size={14} /> Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
