import { useDashboardStore } from '../hooks/useDashboardStore';

/**
 * Premium Hyper-Glass Header Component
 * Matches exact structure from index.html
 */
function Header() {
  const { 
    user, 
    lastUpdated, 
    isRealtimeEnabled,
    toggleTheme,
    darkMode 
  } = useDashboardStore();

  const handleLogout = (e) => {
    e.preventDefault();
    useDashboardStore.getState().logout();
  };

  return (
    <header className="title-bar" id="title-bar">
      <div className="app-title" id="dynamic-app-title">
        <div className="hamburger" onClick={() => useDashboardStore.getState().toggleSidebar()}>☰</div>
        <div className="branding-group">
          <div className="logos-wrapper">
            <img 
              src="https://lh3.googleusercontent.com/d/1rWGnTk485-dqc_ADtLn_RuSmDzgomV0U" 
              alt="Redcliffe Labs"
              className="brand-logo-img" 
              style={{ height: '28px', objectFit: 'contain' }}
            />
            <span className="spacer-x-char">✖</span>
            <img 
              src="https://www.medibuddy.in/assets/logos/medibuddyWithName.svg" 
              alt="MediBuddy"
              className="brand-logo-img"
            />
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="live-indicator" onClick={() => useDashboardStore.getState().refreshData()}>
          <div className="live-dot" id="sync-dot"></div>
          <span id="sync-text">Force Sync</span> 🔄
        </div>

        <div className="user-profile" onClick={handleLogout} title="Click to Logout">
          <img 
            id="user-avatar" 
            src={`https://ui-avatars.com/api/?name=${user?.email?.charAt(0) || 'U'}&background=007AFF&color=fff`} 
            alt="User" 
          />
          <span id="user-display-name">{user?.email?.split('@')[0] || 'Loading...'}</span>
        </div>

        <button 
          type="button" 
          className="theme-toggle" 
          id="dark-light-btn" 
          onClick={toggleTheme}
          title="Toggle Dark Mode"
          style={{ borderRadius: '50%', width: '36px', height: '36px' }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button 
            type="button" 
            className="theme-toggle"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('theme-dropdown')?.classList.toggle('show');
            }}
            title="Change Theme Colors"
            style={{ background: 'var(--glass-bg)', borderRadius: '50%', width: '36px', height: '36px' }}
          >
            🎨
          </button>

          <div 
            id="theme-dropdown" 
            className="multi-drop-list"
            onClick={(e) => e.stopPropagation()}
            style={{
              right: 0,
              left: 'auto',
              width: '180px',
              padding: '10px',
              borderRadius: '16px',
              background: 'var(--modal-bg)',
              backdropFilter: 'blur(25px)',
              border: '1px solid var(--glass-border)',
              top: '110%',
              display: 'none',
              zIndex: 1000
            }}
          >
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-sub)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Color Presets
            </div>
            {['theme-ocean', 'theme-emerald', 'theme-sunset', 'theme-aurora'].map((theme) => (
              <div
                key={theme}
                onClick={() => {
                  useDashboardStore.getState().setTheme(theme);
                  document.getElementById('theme-dropdown')?.classList.remove('show');
                }}
                style={{
                  padding: '6px 10px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  marginBottom: '6px',
                  background: theme === 'theme-ocean' ? '#e0f2fe' : 
                             theme === 'theme-emerald' ? '#d1fae5' :
                             theme === 'theme-sunset' ? '#ffedd5' : '#1e293b',
                  color: theme === 'theme-aurora' ? '#f8fafc' : 
                         theme === 'theme-ocean' ? '#0369a1' :
                         theme === 'theme-emerald' ? '#047857' : '#c2410c',
                  fontSize: '11px',
                  fontWeight: 700,
                  border: `1px solid ${theme === 'theme-aurora' ? '#334155' : 
                                              theme === 'theme-ocean' ? '#bae6fd' :
                                              theme === 'theme-emerald' ? '#a7f3d0' : '#fed7aa'}`,
                  transition: '0.2s'
                }}
                onMouseOver={(e) => e.target.style.filter = theme === 'theme-aurora' ? 'brightness(1.2)' : 'brightness(0.9)'}
                onMouseOut={(e) => e.target.style.filter = 'none'}
              >
                {theme === 'theme-ocean' ? '🌊 Ocean Glass' :
                 theme === 'theme-emerald' ? '🍃 Emerald Mist' :
                 theme === 'theme-sunset' ? '🌇 Sunset Liquid' : '🌌 Midnight Aurora'}
              </div>
            ))}
          </div>
        </div>

        <button 
          type="button" 
          className="theme-toggle" 
          id="theme-btn" 
          onClick={() => useDashboardStore.getState().openModal('themeCenterModal')}
          title="Advanced Settings" 
          style={{ borderRadius: '50%', width: '36px', height: '36px' }}
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}

export default Header;
