import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import HODSidebar from '../components/hod/HODSidebar';
import HODOverview from '../components/hod/HODOverview';
import AllApplications from '../components/hod/AllApplications';
import { typography, textColors } from '../utils/typography';
import Ballpit from '../components/common/Ballpit';

const HodDashboard = () => {
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

  const handleApplicationAction = () => {
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
    notification.innerHTML = '✓ Application decision processed successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);

    setRefreshKey(prev => prev + 1);
  };

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'overview': return { title: 'HOD Dashboard', subtitle: 'Department oversight and final approvals' };
      case 'all-applications': return { title: 'All Applications', subtitle: 'Review and manage all department leave requests' };
      case 'department-analytics': return { title: 'Department Analytics', subtitle: 'Reports and insights for your department' };
      case 'manage-users': return { title: 'Manage Users', subtitle: 'Faculty and student management' };
      default: return { title: 'HOD Dashboard', subtitle: 'Welcome to your dashboard' };
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
        transform: `translateY(${scrollY * 0.1}px) translateX(${mousePosition.x * 0.5}px)`,
        transition: 'transform 0.1s ease-out'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transform: `translateY(${scrollY * -0.05}px) rotateX(${mousePosition.y * 0.5}deg)`,
          transition: 'transform 0.2s ease-out'
        }}>
          <h1 style={{
            ...typography.styles.h1,
            background: `linear-gradient(135deg, ${textColors.primary} 0%, ${textColors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 0.5rem 0'
          }}>
            {pageInfo.title}
          </h1>
          <p style={{
            ...typography.styles.bodyLarge,
            color: textColors.secondary,
            margin: 0,
            fontWeight: typography.fontWeight.medium
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
              opacity: 0.6
            }}>
              <Ballpit
                count={80}
                gravity={0.02}
                friction={0.995}
                wallBounce={0.9}
                followCursor={true}
                colors={[0x3b82f6, 0x1d4ed8, 0x1e40af]}
              />
            </div>
            {contentWrapper(<HODOverview key={refreshKey} />)}
          </div>
        );
      case 'all-applications':
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.6
            }}>
              <Ballpit
                count={80}
                gravity={0.02}
                friction={0.995}
                wallBounce={0.9}
                followCursor={true}
                colors={[0x3b82f6, 0x1d4ed8, 0x1e40af]}
              />
            </div>
            {contentWrapper(
              <div>
                <AllApplications key={refreshKey} onAction={handleApplicationAction} />
              </div>
            )}
          </div>
        );
      case 'department-analytics':
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.6
            }}>
              <Ballpit
                count={80}
                gravity={0.02}
                friction={0.995}
                wallBounce={0.9}
                followCursor={true}
                colors={[0x3b82f6, 0x1d4ed8, 0x1e40af]}
              />
            </div>
            {contentWrapper(
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                padding: '3rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                textAlign: 'center',
                transform: `translateY(${scrollY * 0.15}px) scale(${1 + mousePosition.x * 0.01})`,
                transition: 'transform 0.3s ease-out'
              }}>
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
                  </svg>
                </div>
                <h3 style={{
                  ...typography.styles.h2,
                  color: textColors.primary,
                  margin: '0 0 1rem 0'
                }}>
                  Department Analytics
                </h3>
                <p style={{ 
                  ...typography.styles.bodyLarge,
                  color: textColors.secondary, 
                  margin: '0 0 1.5rem 0'
                }}>
                  Comprehensive analytics and reporting features for department-wide leave patterns, 
                  faculty performance metrics, and student attendance insights.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  {['Leave Trends', 'Faculty Reports', 'Student Analytics', 'Department Insights'].map((feature, index) => (
                    <div key={feature} style={{
                      padding: '1rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {feature}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        Coming soon
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'manage-users':
        return (
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              opacity: 0.6
            }}>
              <Ballpit
                count={80}
                gravity={0.02}
                friction={0.995}
                wallBounce={0.9}
                followCursor={true}
                colors={[0x3b82f6, 0x1d4ed8, 0x1e40af]}
              />
            </div>
            {contentWrapper(
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                padding: '3rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                textAlign: 'center',
                transform: `translateY(${scrollY * 0.12}px) rotateY(${mousePosition.x * 0.3}deg)`,
                transition: 'transform 0.3s ease-out'
              }}>
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
                  </svg>
                </div>
                <h3 style={{
                  ...typography.styles.h2,
                  color: textColors.primary,
                  margin: '0 0 1rem 0'
                }}>
                  User Management
                </h3>
                <p style={{ 
                  ...typography.styles.bodyLarge,
                  color: textColors.secondary, 
                  margin: '0 0 1.5rem 0'
                }}>
                  Manage faculty members and students in your department. 
                  Add new users, update profiles, and control access permissions.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  {['Faculty Management', 'Student Profiles', 'Role Assignments', 'Access Control'].map((feature, index) => (
                    <div key={feature} style={{
                      padding: '1rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {feature}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        Coming soon
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              opacity: 0.6
            }}>
              <Ballpit
                count={80}
                gravity={0.02}
                friction={0.995}
                wallBounce={0.9}
                followCursor={true}
                colors={[0x3b82f6, 0x1d4ed8, 0x1e40af]}
              />
            </div>
            {contentWrapper(<HODOverview key={refreshKey} />)}
          </div>
        );
    }
  };

  useEffect(() => {
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
      <HODSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} onToggle={setSidebarCollapsed} />
      
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
                  color: textColors.primary,
                  margin: '0 0 0.25rem 0'
                }}>
                  Sri Eshwar College of Engineering
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: textColors.secondary,
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
                {(user?.name || 'H').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{
                  ...typography.styles.h4,
                  color: textColors.primary,
                  margin: 0
                }}>
                  Welcome back, {user?.name || 'HOD'}!
                </h2>
                <p style={{
                  ...typography.styles.caption,
                  color: textColors.secondary,
                  margin: '0.25rem 0 0 0',
                  fontWeight: typography.fontWeight.medium
                }}>
                  {user?.department ? `${user.department} Department` : ''}
                  {user?.faculty_id && ` • ID: ${user.faculty_id}`}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                    HOD
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
                    const menu = document.getElementById('hod-user-menu');
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  {(user?.name || 'H').charAt(0).toUpperCase()}
                </button>
                
                <div
                  id="hod-user-menu"
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
                      {user?.name || 'HOD'}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      marginTop: '0.25rem'
                    }}>
                      {user?.department || 'HOD'}
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

export default HodDashboard;