import { useDashboardStore } from '../hooks/useDashboardStore';
import { useEffect, useState } from 'react';

/**
 * Premium Hyper-Glass FilterBar Component
 * Exact match from index.html toolbar structure
 */
export default function FilterBar() {
  const { 
    dateRange, 
    searchQuery, 
    activeTab,
    pendingTimeFilter,
    hideHighTat,
    tatBase,
    cities,
    partnerTypes,
    selectedUsers,
    setDateRange,
    setSearchQuery,
    setActiveTab,
    setPendingTimeFilter,
    setHideHighTat,
    setTatBase,
    refreshData
  } = useDashboardStore();
  
  const [pendingDropdownOpen, setPendingDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setPendingDropdownOpen(false);
      setCityDropdownOpen(false);
      setTypeDropdownOpen(false);
      setUserDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePendingTimeChange = (value) => {
    setPendingTimeFilter(value);
    let label = 'All Pending';
    if (value === 'OLD') label = 'Old Pending (Old)';
    if (value === 'TODAY') label = "Today's Pending";
    document.getElementById('pending-drop-text').innerText = label;
    setPendingDropdownOpen(false);
  };

  const tabs = [
    { id: 'pending', label: 'Pending' },
    { id: 'create', label: 'To Create' },
    { id: 'incomplete', label: 'Incomplete' },
    { id: 'shared', label: 'Shared' },
    { id: 'log', label: "Todays Logs" }
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-row">
        {/* Segmented Control */}
        <div className="segmented-control">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`seg-btn ${activeTab === tab.id ? 'active' : ''}`}
              id={`tab-${tab.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="search-wrapper">
          <span className="search-icon" id="search-icon">🔍</span>
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Search ID, Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>
      </div>

      <div className="toolbar-row">
        {/* Filters Row */}
        <div className="filter-row" style={{ flex: 1 }}>
          <input
            type="date"
            id="date-start"
            className="filter-input"
            value={dateRange.start}
            onChange={(e) => setDateRange(e.target.value, dateRange.end)}
          />
          <span>to</span>
          <input
            type="date"
            id="date-end"
            className="filter-input"
            value={dateRange.end}
            onChange={(e) => setDateRange(dateRange.start, e.target.value)}
          />
          
          <button 
            className="btn-apple btn-primary" 
            onClick={refreshData}
          >
            Apply
          </button>
          
          <button 
            className="btn-apple" 
            onClick={() => {
              setDateRange(new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]);
              setSearchQuery('');
              setPendingTimeFilter('ALL');
              setHideHighTat(false);
            }}
          >
            Reset
          </button>

          {/* Pending Time Multi-Select */}
          <div 
            className="custom-multi-select" 
            id="pending-select-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="cms-header" 
              onClick={(e) => {
                e.stopPropagation();
                setPendingDropdownOpen(!pendingDropdownOpen);
              }}
            >
              <span id="pending-drop-text">All Pending</span> ▾
            </div>
            <div 
              id="pending-drop" 
              className={`multi-drop-list ${pendingDropdownOpen ? 'show' : ''}`}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '180px' }}
            >
              <label>
                <input
                  type="radio"
                  name="pending_time"
                  value="ALL"
                  checked={pendingTimeFilter === 'ALL'}
                  onChange={() => handlePendingTimeChange('ALL')}
                />
                All Pending
              </label>
              <label>
                <input
                  type="radio"
                  name="pending_time"
                  value="OLD"
                  checked={pendingTimeFilter === 'OLD'}
                  onChange={() => handlePendingTimeChange('OLD')}
                />
                Old Pending (Old)
              </label>
              <label>
                <input
                  type="radio"
                  name="pending_time"
                  value="TODAY"
                  checked={pendingTimeFilter === 'TODAY'}
                  onChange={() => handlePendingTimeChange('TODAY')}
                />
                Today's Pending
              </label>
              <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
              <label style={{ color: '#ef4444', fontWeight: 700 }}>
                <input
                  type="checkbox"
                  id="no-high-tat-cb"
                  checked={hideHighTat}
                  onChange={(e) => setHideHighTat(e.target.checked)}
                />
                🚫 Hide High TAT
              </label>
            </div>
          </div>

          {/* City Multi-Select */}
          <div 
            className="custom-multi-select" 
            id="city-select-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="cms-header" 
              onClick={(e) => {
                e.stopPropagation();
                setCityDropdownOpen(!cityDropdownOpen);
              }}
            >
              <span id="city-drop-text">All Cities</span> ▾
            </div>
            <div 
              id="city-drop" 
              className={`multi-drop-list ${cityDropdownOpen ? 'show' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label>
                <input
                  type="checkbox"
                  value="ALL"
                  checked={!cities.some(c => c.selected)}
                  onChange={() => {}}
                />
                All Cities
              </label>
              {cities.map((city, idx) => (
                <label key={idx}>
                  <input
                    type="checkbox"
                    value={city.name || city}
                    onChange={() => {}}
                  />
                  {city.name || city}
                </label>
              ))}
            </div>
          </div>

          {/* Partner Type Multi-Select */}
          <div 
            className="custom-multi-select" 
            id="type-select-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="cms-header" 
              onClick={(e) => {
                e.stopPropagation();
                setTypeDropdownOpen(!typeDropdownOpen);
              }}
            >
              <span id="type-drop-text">All Partners</span> ▾
            </div>
            <div 
              id="type-drop" 
              className={`multi-drop-list ${typeDropdownOpen ? 'show' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label>
                <input
                  type="checkbox"
                  value="ALL"
                  onChange={() => {}}
                />
                All Partners
              </label>
              {partnerTypes.map((type, idx) => (
                <label key={idx}>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={() => {}}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* User Multi-Select */}
          <div 
            className="custom-multi-select" 
            id="user-select-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="cms-header" 
              onClick={(e) => {
                e.stopPropagation();
                setUserDropdownOpen(!userDropdownOpen);
              }}
            >
              <span id="user-drop-text">All Users</span> ▾
            </div>
            <div 
              id="user-drop" 
              className={`multi-drop-list ${userDropdownOpen ? 'show' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label>
                <input
                  type="checkbox"
                  value="ALL"
                  checked={true}
                  onChange={() => {}}
                />
                All Users
              </label>
              <label>
                <input
                  type="checkbox"
                  value="API"
                  onChange={() => {}}
                />
                API User
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Manual"
                  onChange={() => {}}
                />
                Manual User
              </label>
            </div>
          </div>
        </div>

        {/* TAT Base Toggle & Smart Export */}
        <div className="filter-row" style={{ gap: '10px', width: '100%', justifyContent: 'space-between' }}>
          <div className="tat-container">
            <span className="tat-label">TAT Base:</span>
            <div className="tat-toggle" style={{ background: '#f1f5f9', padding: '4px', borderRadius: '8px', display: 'inline-flex', gap: '4px' }}>
              <button
                className="tat-btn"
                id="tat-col"
                onClick={() => setTatBase('col')}
                style={{
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  background: tatBase === 'col' ? '#3b82f6' : 'transparent',
                  color: tatBase === 'col' ? '#fff' : '#64748b'
                }}
              >
                Col.
              </button>
              <button
                className="tat-btn"
                id="tat-sub"
                onClick={() => setTatBase('sub')}
                style={{
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  background: tatBase === 'sub' ? '#3b82f6' : 'transparent',
                  color: tatBase === 'sub' ? '#fff' : '#64748b'
                }}
              >
                Sub.
              </button>
              <button
                className="tat-btn"
                id="tat-creat"
                onClick={() => setTatBase('creat')}
                style={{
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  background: tatBase === 'creat' ? '#3b82f6' : 'transparent',
                  color: tatBase === 'creat' ? '#fff' : '#64748b'
                }}
              >
                Creat.
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              id="copy-trf-btn"
              onClick={() => {}}
              style={{
                display: 'none',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                transition: '0.2s'
              }}
            >
              📋 Copy Missing TRFs
            </button>

            <button
              className="btn-apple btn-primary"
              onClick={() => {}}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                padding: '8px 14px',
                fontSize: '13px'
              }}
            >
              ✨ Smart Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
