import { useState, useEffect } from 'react';
import { facultyAPI } from '../../services/api';

const FacultyAllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      const response = await facultyAPI.getAllApplications();
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

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading applications...</div>;
  if (error) return <div style={{ color: '#ef4444', textAlign: 'center', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        All Applications ({applications.length})
      </h3>

      {applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No applications found for your department and year.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {applications.map((app) => (
            <div key={app._id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1.5rem',
              backgroundColor: '#ffffff'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h4 style={{
                    margin: '0 0 0.5rem 0',
                    color: '#1f2937',
                    fontSize: '1.125rem',
                    fontWeight: '600'
                  }}>
                    {app.student_snapshot.name}
                  </h4>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    {app.student_snapshot.roll_no} | {app.student_snapshot.department} | Year {app.student_snapshot.year}
                  </p>
                </div>
                <span style={{
                  backgroundColor: getStatusColor(app.status),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {formatStatus(app.status)}
                </span>
              </div>

              <div style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {app.leave_type && <p><strong>Leave Type:</strong> {app.leave_type}</p>}
                {app.from_date && app.to_date && (
                  <p>
                    <strong>Duration:</strong> {new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
                    {' to '} {new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                )}
                {app.number_of_days && <p><strong>Days:</strong> {app.number_of_days}</p>}
                <p><strong>Reason:</strong> {app.leave_reason}</p>
                <p><strong>Submitted:</strong> {new Date(app.submitted_at).toLocaleString('en-GB', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</p>
                {app.faculty_action_at && (
                  <p><strong>Faculty Action:</strong> {new Date(app.faculty_action_at).toLocaleString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</p>
                )}
                {app.hod_action_at && (
                  <p><strong>Final Decision:</strong> {new Date(app.hod_action_at).toLocaleString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyAllApplications;