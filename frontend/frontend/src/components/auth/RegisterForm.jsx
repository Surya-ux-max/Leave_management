import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    role: 'STUDENT',
    college_email: '',
    password: '',
    name: '',
    roll_no: '',
    department: '',
    year: '',
    degree: '',
    section: '',
    faculty_id: '',
    assigned_year: '',
    assigned_section: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await register(formData);
    
    if (result.success) {
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const renderRoleSpecificFields = () => {
    const fieldStyle = { marginBottom: '1.5rem' };
    const labelStyle = {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    };
    const inputStyle = {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    };

    switch (formData.role) {
      case 'STUDENT':
        return (
          <>
            <div style={fieldStyle}>
              <label style={labelStyle}>Roll Number</label>
              <input
                type="text"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#22c55e'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Year</label>
              <select name="year" value={formData.year} onChange={handleChange} style={inputStyle}>
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                style={inputStyle}
                placeholder="e.g., B.Tech, B.Sc"
                onFocus={e => e.target.style.borderColor = '#22c55e'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                style={inputStyle}
                placeholder="e.g., A, B, C"
                onFocus={e => e.target.style.borderColor = '#22c55e'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </>
        );
      case 'FACULTY':
        return (
          <>
            <div style={fieldStyle}>
              <label style={labelStyle}>Faculty ID</label>
              <input
                type="text"
                name="faculty_id"
                value={formData.faculty_id}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#22c55e'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Assigned Year</label>
              <select name="assigned_year" value={formData.assigned_year} onChange={handleChange} style={inputStyle}>
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Assigned Section</label>
              <input
                type="text"
                name="assigned_section"
                value={formData.assigned_section}
                onChange={handleChange}
                style={inputStyle}
                placeholder="e.g., A, B, C"
                onFocus={e => e.target.style.borderColor = '#22c55e'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </>
        );
      case 'HOD':
        return (
          <div style={fieldStyle}>
            <label style={labelStyle}>Faculty ID</label>
            <input
              type="text"
              name="faculty_id"
              value={formData.faculty_id}
              onChange={handleChange}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#22c55e'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Left Side - Video with Ballpit */}
      <div style={{
        flex: '1',
        position: 'relative',
        overflow: 'hidden',
        transform: `translateY(${scrollY * 0.3}px)`,
        transition: 'transform 0.1s ease-out'
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/clg video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Right Side - Register Form */}
      <div style={{
        width: '500px',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#f8fafc'
      }}>
        {/* Register Form Card */}
        <div 
          style={{
            background: '#ffffff',
            padding: '2rem',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflowY: 'auto',
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px) translateY(${scrollY * -0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Create Your Account
            </h2>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '0'
            }}>
              Join Sri Eshwar Leave Management System
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              border: '1px solid #bbf7d0'
            }}>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>Select Your Role *</label>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>Choose your role in the institution</p>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="HOD">HOD</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>Full Name *</label>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>Enter your complete name as per official records</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>College Email *</label>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>Use your official college email address</p>
                <input
                  type="email"
                  name="college_email"
                  value={formData.college_email}
                  onChange={handleChange}
                  required
                  placeholder="your.name@sece.ac.in"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>Department *</label>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>Enter your department name</p>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="e.g., Computer Science, Mechanical"
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>Password *</label>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem'
                }}>Create a secure password (minimum 6 characters)</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a secure password"
                  minLength="6"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {renderRoleSpecificFields()}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#9ca3af' : '#22c55e',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  marginBottom: '1rem'
                }}
                onMouseEnter={e => !loading && (e.target.style.backgroundColor = '#16a34a')}
                onMouseLeave={e => !loading && (e.target.style.backgroundColor = '#22c55e')}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
          </form>

          <div style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{
                color: '#22c55e',
                textDecoration: 'none',
                fontWeight: '500'
              }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;