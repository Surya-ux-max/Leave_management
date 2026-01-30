import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await studentAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_FACULTY': return '#f59e0b';
      case 'PENDING_HOD': return '#3b82f6';
      case 'APPROVED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'PENDING_FACULTY': return 'Pending Faculty Review';
      case 'PENDING_HOD': return 'Pending HOD Approval';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFilteredApplications = () => {
    if (filter === 'all') return applications;
    
    switch (filter) {
      case 'pending':
        return applications.filter(app => 
          app.status === 'PENDING_FACULTY' || app.status === 'PENDING_HOD'
        );
      case 'approved':
        return applications.filter(app => app.status === 'APPROVED');
      case 'rejected':
        return applications.filter(app => app.status === 'REJECTED');
      default:
        return applications;
    }
  };

  const filteredApplications = getFilteredApplications();

  const FilterButton = ({ value, label, count }) => (
    <button
      onClick={() => setFilter(value)}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: filter === value ? '#059669' : '#ffffff',
        color: filter === value ? '#ffffff' : '#374151',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
      onMouseOver={(e) => {
        if (filter !== value) {
          e.target.style.backgroundColor = '#f9fafb';
        }
      }}
      onMouseOut={(e) => {
        if (filter !== value) {
          e.target.style.backgroundColor = '#ffffff';
        }
      }}
    >
      {label}
      <span style={{
        backgroundColor: filter === value ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
        color: filter === value ? '#ffffff' : '#6b7280',
        padding: '0.125rem 0.375rem',
        borderRadius: '10px',
        fontSize: '0.75rem',
        fontWeight: '600'
      }}>
        {count}
      </span>
    </button>
  );

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem',
        color: '#6b7280'
      }}>
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        <FilterButton 
          value="all" 
          label="All Applications" 
          count={applications.length} 
        />
        <FilterButton 
          value="pending" 
          label="Pending" 
          count={applications.filter(app => 
            app.status === 'PENDING_FACULTY' || app.status === 'PENDING_HOD'
          ).length} 
        />
        <FilterButton 
          value="approved" 
          label="Approved" 
          count={applications.filter(app => app.status === 'APPROVED').length} 
        />
        <FilterButton 
          value="rejected" 
          label="Rejected" 
          count={applications.filter(app => app.status === 'REJECTED').length} 
        />
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '3rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 0.5rem 0'
          }}>
            No applications found
          </h3>
          <p style={{
            color: '#6b7280',
            margin: 0
          }}>
            {filter === 'all' 
              ? "You haven't submitted any leave applications yet."
              : `No ${filter} applications found.`
            }
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {filteredApplications
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((app) => (
            <div
              key={app._id}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {app.leave_type}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Applied on {formatDate(app.created_at)}
                  </p>
                </div>
                <div style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '12px',
                  backgroundColor: getStatusColor(app.status) + '20',
                  color: getStatusColor(app.status),
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  minWidth: '120px'
                }}>
                  {formatStatus(app.status)}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    From Date
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {formatDate(app.from_date)}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    To Date
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {formatDate(app.to_date)}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Duration
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {app.number_of_days} {app.number_of_days === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </div>

              <div>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Reason
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {app.leave_reason}
                </p>
              </div>

              {app.rejection_reason && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '6px',
                  border: '1px solid #fecaca'
                }}>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#dc2626',
                    margin: '0 0 0.25rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: '600'
                  }}>
                    Rejection Reason
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#dc2626',
                    margin: 0
                  }}>
                    {app.rejection_reason}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;