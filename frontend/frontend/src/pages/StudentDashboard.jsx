import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentOverview from '../components/student/StudentOverview';
import LeaveApplicationForm from '../components/student/LeaveApplicationForm';
import ApplicationsList from '../components/student/ApplicationsList';
import { typography, textColors } from '../utils/typography';
import Ballpit from '../components/common/Ballpit';

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleApplicationSuccess = () => {
    // Modern success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
      z-index: 1000;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = '✓ Leave application submitted successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);

    setRefreshKey(prev => prev + 1);
    setActiveMenu('applications');
  };

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'overview': return { title: 'Dashboard Overview', subtitle: 'Track your leave applications and activity' };
      case 'apply-leave': return { title: 'Apply for Leave', subtitle: 'Submit a new leave application' };
      case 'applications': return { title: 'My Applications', subtitle: 'View and track your leave applications' };
      default: return { title: 'Dashboard', subtitle: 'Welcome to your dashboard' };
    }
  };

  const renderContent = () => {
    const pageInfo = getPageTitle();
    
    const contentWrapper = (children) => (
      <div style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        animation: 'fadeInUp 0.6s ease-out',
        transform: `translateY(${scrollY * 0.08}px) translateX(${mousePosition.x * 0.3}px)`,
        transition: 'transform 0.1s ease-out'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 0.5rem 0'
          }}>
            {pageInfo.title}
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            margin: 0,
            fontWeight: '500'
          }}>
            {pageInfo.subtitle}
          </p>
        </div>
        {children}
      </div>
    );

    switch (activeMenu) {
      case 'overview':
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.7
            }}>
              <Ballpit
                count={50}
                gravity={0.01}
                friction={0.9975}
                wallBounce={0.95}
                followCursor={false}
                colors={[0x22c55e, 0x16a34a, 0x15803d]}
              />
            </div>
            {contentWrapper(<StudentOverview key={refreshKey} />)}
          </div>
        );
      case 'apply-leave':
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.7
            }}>
              <Ballpit
                count={50}
                gravity={0.01}
                friction={0.9975}
                wallBounce={0.95}
                followCursor={false}
                colors={[0x22c55e, 0x16a34a, 0x15803d]}
              />
            </div>
            {contentWrapper(
              <div style={{ maxWidth: '900px' }}>
                <LeaveApplicationForm onSuccess={handleApplicationSuccess} />
              </div>
            )}
          </div>
        );
      case 'applications':
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.7
            }}>
              <Ballpit
                count={50}
                gravity={0.01}
                friction={0.9975}
                wallBounce={0.95}
                followCursor={false}
                colors={[0x22c55e, 0x16a34a, 0x15803d]}
              />
            </div>
            {contentWrapper(<ApplicationsList key={refreshKey} />)}
          </div>
        );
      default:
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.7
            }}>
              <Ballpit
                count={50}
                gravity={0.01}
                friction={0.9975}
                wallBounce={0.95}
                followCursor={false}
                colors={[0x22c55e, 0x16a34a, 0x15803d]}
              />
            </div>
            {contentWrapper(<StudentOverview key={refreshKey} />)}
          </div>
        );
    }
  };

  useEffect(() => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      @keyframes fadeInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%)',
      fontFamily: typography.fontFamily.primary
    }}>
      {/* Sidebar */}
      <StudentSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} onToggle={setSidebarCollapsed} />
      
      {/* Main Content */}
      <div style={{
        marginLeft: sidebarCollapsed ? '80px' : '280px',
        flex: 1,
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Enhanced Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
          borderBottom: '1px solid #e5e7eb',
          padding: '1.5rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 5,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img 
                src="/src/assets/clg_logo[1].png" 
                alt="College Logo" 
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'contain'
                }}
              />
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 0.25rem 0'
                }}>
                  Sri Eshwar College of Engineering
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Leave Management System
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
              }}>
                {(user?.name || 'S').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Welcome back, {user?.name || 'Student'}!
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: '0.25rem 0 0 0',
                  fontWeight: '500'
                }}>
                  {user?.department ? `${user.department} Department` : ''}
                  {user?.year && ` • Year ${user.year}`}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Quick Stats */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginRight: '1rem'
              }}>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '8px',
                  border: '1px solid #bbf7d0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: '600' }}>
                    ACTIVE
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#16a34a' }}>
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* User Menu */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => {
                    const menu = document.getElementById('user-menu');
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                  }}
                >
                  {(user?.name || 'S').charAt(0).toUpperCase()}
                </button>
                
                <div
                  id="user-menu"
                  style={{
                    display: 'none',
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e5e7eb',
                    minWidth: '200px',
                    zIndex: 1000,
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {user?.name || 'Student'}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      marginTop: '0.25rem'
                    }}>
                      {user?.department || 'Student'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('role');
                      window.location.href = '/';
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      color: '#ef4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#fef2f2';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H4v16h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h10z"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ minHeight: 'calc(100vh - 100px)' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;