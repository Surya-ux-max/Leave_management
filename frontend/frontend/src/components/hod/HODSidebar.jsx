import { useState } from 'react';

const HODSidebar = ({ activeMenu, setActiveMenu, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) onToggle(newState);
  };

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      ),
      description: 'Dashboard & Analytics'
    },
    {
      id: 'all-applications',
      label: 'All Applications',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,12H7V10H17V12M15,16H7V14H15V16M17,8H7V6H17V8Z"/>
        </svg>
      ),
      description: 'Review & Approve'
    },
    {
      id: 'department-analytics',
      label: 'Department Analytics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
        </svg>
      ),
      description: 'Reports & Insights'
    },
    {
      id: 'manage-users',
      label: 'Manage Users',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
        </svg>
      ),
      description: 'Faculty & Students'
    }
  ];

  return (
    <div style={{
      width: isCollapsed ? '80px' : '280px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      padding: '0',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10,
      boxShadow: '4px 0 12px rgba(0,0,0,0.05)',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #f3f4f6',
        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {!isCollapsed && (
            <div>
              <h2 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                margin: '0 0 0.25rem 0'
              }}>
                HOD Portal
              </h2>
              <p style={{
                fontSize: '0.875rem',
                opacity: 0.9,
                margin: 0
              }}>
                Department Management
              </p>
            </div>
          )}
          <button
            onClick={() => handleToggle()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav style={{ 
        padding: '1rem 0.75rem',
        flex: 1,
        overflowY: 'auto'
      }}>
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '0.75rem 0.5rem' : '0.75rem 1rem',
              marginBottom: '0.5rem',
              backgroundColor: activeMenu === item.id ? 
                'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 'transparent',
              color: activeMenu === item.id ? '#22c55e' : '#374151',
              border: activeMenu === item.id ? '1px solid #bbf7d0' : '1px solid transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeMenu === item.id ? '600' : '500',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              transform: activeMenu === item.id ? 'translateX(4px)' : 'translateX(0)',
              boxShadow: activeMenu === item.id ? '0 2px 8px rgba(34, 197, 94, 0.15)' : 'none'
            }}
            onMouseOver={(e) => {
              if (activeMenu !== item.id) {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.transform = 'translateX(2px)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }
            }}
            onMouseOut={(e) => {
              if (activeMenu !== item.id) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{ 
              marginRight: isCollapsed ? '0' : '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px'
            }}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '0.125rem' }}>
                  {item.label}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  opacity: 0.7,
                  color: activeMenu === item.id ? '#16a34a' : '#6b7280'
                }}>
                  {item.description}
                </div>
              </div>
            )}
            {activeMenu === item.id && (
              <div style={{
                position: 'absolute',
                right: '0.75rem',
                width: '3px',
                height: '16px',
                backgroundColor: '#22c55e',
                borderRadius: '2px'
              }} />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid #f3f4f6',
        background: '#f9fafb'
      }}>
        {!isCollapsed ? (
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '1.25rem', 
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#22c55e">
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"/>
              </svg>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: '0 0 0.5rem 0',
              fontWeight: '500'
            }}>
              Need Help?
            </p>
            <button style={{
              fontSize: '0.75rem',
              color: '#22c55e',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: '500'
            }}>
              Contact Support
            </button>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#22c55e">
              <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default HODSidebar;