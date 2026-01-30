import { useState, useEffect } from 'react';
import { hodAPI } from '../../services/api';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [decidingId, setDecidingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await hodAPI.getAllApplications();
      setApplications(response.data);
    } catch (error) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (applicationId, status) => {
    try {
      await hodAPI.finalDecision(applicationId, { status, message });
      setMessage('');
      setDecidingId(null);
      fetchApplications(); // Refresh the list
      alert(`Application ${status.toLowerCase()} successfully`);
    } catch (error) {
      alert('Failed to process decision');
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
      case 'PENDING_HOD': return 'Pending';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const pendingHodApplications = applications.filter(app => app.status === 'PENDING_HOD');
  const otherApplications = applications.filter(app => app.status !== 'PENDING_HOD');

  return (
    <div className="card mb-6">
      <div className="card-header">
        <h3 className="text-lg font-semibold">Department Applications</h3>
      </div>
      <div className="card-body">
      
      {pendingHodApplications.length > 0 && (
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>Pending Your Approval ({pendingHodApplications.length})</h4>
          <div style={listStyle}>
            {pendingHodApplications.map((app) => (
              <div key={app._id} style={cardStyle}>
                <div style={headerStyle}>
                  <div>
                    <h4 style={nameStyle}>{app.student_snapshot.name}</h4>
                    <p style={detailStyle}>
                      {app.student_snapshot.roll_no} | {app.student_snapshot.department} | 
                      Year {app.student_snapshot.year}
                    </p>
                  </div>
                  <span style={{...statusStyle, backgroundColor: getStatusColor(app.status)}}>
                    {formatStatus(app.status)}
                  </span>
                </div>
                
                <div style={contentStyle}>
                  {app.leave_type && <p><strong>Leave Type:</strong> {app.leave_type}</p>}
                  {app.from_date && app.to_date && (
                    <p>
                      <strong>From:</strong> {new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
                      {' '}<strong>To:</strong> {new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                  {app.number_of_days && <p><strong>Duration:</strong> {app.number_of_days} {app.number_of_days === 1 ? 'Day' : 'Days'}</p>}
                  <p><strong>Reason:</strong> {app.leave_reason}</p>
                  <p><strong>Parent Phone:</strong> {app.parent_phone}</p>
                  <p><strong>Submitted:</strong> {new Date(app.submitted_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  {app.faculty_action_at && (
                    <p><strong>Faculty Approved:</strong> {new Date(app.faculty_action_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  )}
                </div>

                {decidingId === app._id ? (
                  <div style={decisionFormStyle}>
                    <textarea
                      placeholder="Add optional message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={textareaStyle}
                      rows="3"
                    />
                    <div style={buttonGroupStyle}>
                      <button 
                        onClick={() => handleDecision(app._id, 'APPROVED')}
                        style={approveButtonStyle}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleDecision(app._id, 'REJECTED')}
                        style={rejectButtonStyle}
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => setDecidingId(null)}
                        style={cancelButtonStyle}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={actionStyle}>
                    <button 
                      onClick={() => setDecidingId(app._id)}
                      style={decisionButtonStyle}
                    >
                      Make Decision
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {otherApplications.length > 0 && (
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>All Applications ({otherApplications.length})</h4>
          <div style={listStyle}>
            {otherApplications.map((app) => (
              <div key={app._id} style={cardStyle}>
                <div style={headerStyle}>
                  <div>
                    <h4 style={nameStyle}>{app.student_snapshot.name}</h4>
                    <p style={detailStyle}>
                      {app.student_snapshot.roll_no} | {app.student_snapshot.department} | 
                      Year {app.student_snapshot.year}
                    </p>
                  </div>
                  <span style={{...statusStyle, backgroundColor: getStatusColor(app.status)}}>
                    {formatStatus(app.status)}
                  </span>
                </div>
                
                <div style={contentStyle}>
                  {app.leave_type && <p><strong>Leave Type:</strong> {app.leave_type}</p>}
                  {app.from_date && app.to_date && (
                    <p>
                      <strong>From:</strong> {new Date(app.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
                      {' '}<strong>To:</strong> {new Date(app.to_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                  {app.number_of_days && <p><strong>Duration:</strong> {app.number_of_days} {app.number_of_days === 1 ? 'Day' : 'Days'}</p>}
                  <p><strong>Reason:</strong> {app.leave_reason}</p>
                  <p><strong>Submitted:</strong> {new Date(app.submitted_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  {app.hod_action_at && (
                    <p><strong>Final Decision:</strong> {new Date(app.hod_action_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {applications.length === 0 && (
        <div className="text-center p-6 text-secondary">
          <p>No applications found for your department.</p>
        </div>
      )}
      </div>
    </div>
  );
};

// Keep only the styles still being used in the component
const sectionStyle = {
  marginBottom: '2rem'
};

const sectionTitleStyle = {
  marginBottom: '1rem',
  color: '#374151',
  borderBottom: '2px solid #e5e7eb',
  paddingBottom: '0.5rem'
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '1rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem'
};

const nameStyle = {
  margin: '0 0 0.25rem 0',
  color: '#1f2937'
};

const detailStyle = {
  margin: 0,
  color: '#6b7280',
  fontSize: '0.875rem'
};

const statusStyle = {
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '1rem',
  fontSize: '0.875rem',
  fontWeight: 'bold'
};

const contentStyle = {
  marginBottom: '1rem',
  lineHeight: '1.6'
};

const decisionFormStyle = {
  borderTop: '1px solid #e5e7eb',
  paddingTop: '1rem'
};

const textareaStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.25rem',
  marginBottom: '1rem',
  resize: 'vertical'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const approveButtonStyle = {
  backgroundColor: '#10b981',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer'
};

const rejectButtonStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  backgroundColor: '#6b7280',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer'
};

const actionStyle = {
  borderTop: '1px solid #e5e7eb',
  paddingTop: '1rem'
};

const decisionButtonStyle = {
  backgroundColor: '#dc2626',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer'
};

export default AllApplications;