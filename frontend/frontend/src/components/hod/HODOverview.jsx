import { useState, useEffect } from 'react';
import { hodAPI } from '../../services/api';

const HODOverview = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    pendingHod: 0,
    approved: 0,
    rejected: 0,
    total: 0,
    facultyMembers: 0,
    todayActions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await hodAPI.getAllApplications();
      const apps = response.data;
      setApplications(apps);
      
      const today = new Date().toDateString();
      const todayActions = apps.filter(app => 
        (app.status === 'APPROVED' || app.status === 'REJECTED') && 
        new Date(app.updated_at).toDateString() === today
      ).length;

      setStats({
        pendingHod: apps.filter(app => app.status === 'PENDING_HOD').length,
        approved: apps.filter(app => app.status === 'APPROVED').length,
        rejected: apps.filter(app => app.status === 'REJECTED').length,
        total: apps.length,
        facultyMembers: 0, // This would come from a separate API call
        todayActions
      });
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon, description }) => (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: '1.25rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        borderRadius: '50%',
        transform: 'rotate(45deg)'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: '2rem',
          marginBottom: '0.75rem',
          color: color,
          display: 'flex',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: color,
          margin: '0 0 0.5rem 0'
        }}>
          {loading ? (
            <div style={{
              width: '40px',
              height: '30px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              borderRadius: '6px',
              margin: '0 auto'
            }} />
          ) : value}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 0.25rem 0'
        }}>
          {title}
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          margin: 0,
          fontWeight: '500'
        }}>
          {description}
        </p>
      </div>
    </div>
  );

  const getRecentApplications = () => {
    return applications
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_FACULTY': return '#f59e0b';
      case 'PENDING_HOD': return '#3b82f6';
      case 'APPROVED': return '#22c55e';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'PENDING_FACULTY': return 'With Faculty';
      case 'PENDING_HOD': return 'Pending Decision';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div>
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <StatCard
          title="Pending Final Approval"
          value={stats.pendingHod}
          color="#ef4444"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
            </svg>
          }
          description="Awaiting your decision"
        />
        <StatCard
          title="Approved Applications"
          value={stats.approved}
          color="#22c55e"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
            </svg>
          }
          description="Applications approved"
        />
        <StatCard
          title="Rejected Applications"
          value={stats.rejected}
          color="#f59e0b"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
            </svg>
          }
          description="Applications rejected"
        />
        <StatCard
          title="Total Applications"
          value={stats.total}
          color="#3b82f6"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,12H7V10H17V12M15,16H7V14H15V16M17,8H7V6H17V8Z"/>
            </svg>
          }
          description="Department applications"
        />
        <StatCard
          title="Faculty Members"
          value={stats.facultyMembers}
          color="#8b5cf6"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
            </svg>
          }
          description="Under supervision"
        />
      </div>

      {/* Recent Applications */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#22c55e">
              <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,12H7V10H17V12M15,16H7V14H15V16M17,8H7V6H17V8Z"/>
            </svg>
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 0.25rem 0'
              }}>
                Recent Applications
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>
                Latest department leave requests
              </p>
            </div>
          </div>
          <div style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#22c55e'
          }}>
            {getRecentApplications().length} Recent
          </div>
        </div>
        
        {loading ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem' 
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: '60px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '8px'
              }} />
            ))}
          </div>
        ) : getRecentApplications().length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            borderRadius: '12px',
            border: '2px dashed #d1d5db'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              marginBottom: '0.75rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#6b7280">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 0.5rem 0'
            }}>
              No Recent Applications
            </h4>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>
              No applications in the department at the moment.
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gap: '0.75rem'
          }}>
            {getRecentApplications().map((app, index) => (
              <div key={app._id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                borderRadius: '8px',
                border: '1px solid #f3f4f6',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease',
                animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(app.status),
                    boxShadow: `0 0 0 2px ${getStatusColor(app.status)}20`
                  }} />
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {app.student_name} - {app.leave_type}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {formatDate(app.from_date)} - {formatDate(app.to_date)} • {app.number_of_days} days
                    </p>
                  </div>
                </div>
                <div style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '8px',
                  backgroundColor: getStatusColor(app.status) + '15',
                  color: getStatusColor(app.status),
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  border: `1px solid ${getStatusColor(app.status)}30`
                }}>
                  {formatStatus(app.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HOD Responsibilities */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#22c55e">
            <path d="M12,2A3,3 0 0,1 15,5V7A3,3 0 0,1 12,10A3,3 0 0,1 9,7V5A3,3 0 0,1 12,2M21,12V14A9,9 0 0,1 12,23A9,9 0 0,1 3,14V12A9,9 0 0,1 12,3A9,9 0 0,1 21,12Z"/>
          </svg>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>
            HOD Responsibilities
          </h3>
        </div>
        <ul style={{
          color: '#6b7280',
          paddingLeft: '1.5rem',
          lineHeight: '1.8',
          margin: 0
        }}>
          <li>Final approval/rejection of leave applications</li>
          <li>Monitor department-wide leave patterns</li>
          <li>Manage student and faculty profiles</li>
          <li>Generate reports and analytics</li>
          <li>Oversee the entire leave approval process</li>
        </ul>
      </div>
    </div>
  );
};

export default HODOverview;