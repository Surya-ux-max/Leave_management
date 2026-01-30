import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

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
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
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
      
      {/* Right Side - Card */}
      <div style={{
        width: '500px',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#f8fafc'
      }}>
        {/* Main Content Card */}
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
            transition: 'transform 0.1s ease-out',
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              transform: `translateY(${mousePosition.y * -0.1}px)`,
              transition: 'transform 0.2s ease-out'
            }}>
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
            </div>
            
            <div style={{
              transform: `translateY(${mousePosition.y * -0.05}px)`,
              transition: 'transform 0.2s ease-out 0.1s'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '1.25rem'
              }}>
                Digital Leave Management Portal
              </h2>
              <p style={{
                color: '#4a5568',
                fontSize: '1rem',
                lineHeight: '1.7',
                fontWeight: '400'
              }}>
                Streamlined leave management system designed for educational institutions to enhance administrative efficiency and student experience.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            transform: `translateY(${mousePosition.y * -0.02}px)`,
            transition: 'transform 0.2s ease-out 0.2s'
          }}>
            <Link
              to="/login"
              style={{
                display: 'block',
                padding: '1.25rem 2.5rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.3)',
                textAlign: 'center'
              }}
              onMouseOver={e => {
                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.4)';
              }}
              onMouseOut={e => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.3)';
              }}
            >
              Access Dashboard
            </Link>

            <Link
              to="/register"
              style={{
                display: 'block',
                padding: '1.25rem 2.5rem',
                background: 'transparent',
                color: '#2e7d32',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1.1rem',
                border: '2px solid #2e7d32',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={e => {
                e.target.style.background = '#2e7d32';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#2e7d32';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Create Account
            </Link>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            transform: `translateY(${mousePosition.y * -0.01}px)`,
            transition: 'transform 0.2s ease-out 0.3s'
          }}>
            <div style={{
              textAlign: 'center',
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
  );
};

export default LandingPage;