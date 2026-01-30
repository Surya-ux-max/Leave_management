import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    college_email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (user) {
      const role = user.role;
      switch (role) {
        case 'STUDENT':
          navigate('/student', { replace: true });
          break;
        case 'FACULTY':
          navigate('/faculty', { replace: true });
          break;
        case 'HOD':
          navigate('/hod', { replace: true });
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

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

    const result = await login(formData);
    
    if (result.success) {
      const role = localStorage.getItem('role');
      switch (role) {
        case 'STUDENT':
          navigate('/student', { replace: true });
          break;
        case 'FACULTY':
          navigate('/faculty', { replace: true });
          break;
        case 'HOD':
          navigate('/hod', { replace: true });
          break;
        default:
          navigate('/login', { replace: true });
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Left Side - Video */}
      <div style={{
        flex: '1',
        position: 'relative',
        overflow: 'hidden'
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
      
      {/* Right Side - Login Form */}
      <div style={{
        width: '500px',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#f8fafc'
      }}>
        {/* Login Form Card */}
        <div 
          style={{
            background: '#ffffff',
            borderRadius: '0',
            padding: '3rem 2rem',
            boxShadow: 'none',
            border: 'none',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '0.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>
              Sri Eshwar College of Engineering
            </h1>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              borderRadius: '2px',
              margin: '1rem 0',
              boxShadow: '0 2px 4px rgba(34, 197, 94, 0.3)'
            }} />
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '0.5rem'
            }}>
              Sign in to your account
            </h2>
          </div>
          {/* Form */}
          <div>
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

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  College Email
                </label>
                <input
                  type="email"
                  name="college_email"
                  value={formData.college_email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  opacity: loading ? '0.7' : '1',
                  pointerEvents: loading ? 'none' : 'auto',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                }}
                onMouseOver={e => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)')}
                onMouseOut={e => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)')}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: '0 0 1rem 0'
              }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{
                    color: '#22c55e',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={e => e.target.style.color = '#16a34a'}
                  onMouseOut={e => e.target.style.color = '#22c55e'}
                >
                  Register here
                </Link>
              </p>
              <div style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                lineHeight: '1.5'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  © 2024 Sri Eshwar College of Engineering
                </p>
                <p style={{ margin: '0', fontWeight: '500' }}>
                  Empowering Education Through Technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;