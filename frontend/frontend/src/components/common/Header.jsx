import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/clg_logo[1].png';
import AnimatedText from './AnimatedText';
import Navigation from '../nav/Navigation';
import { typography, textColors } from '../../utils/typography';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'STUDENT': return '/student';
      case 'FACULTY': return '/faculty';
      case 'HOD': return '/hod';
      default: return '/';
    }
  };

  return (
    <header className="card" style={{ margin: 0, borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}>
      <div className="content-container">
        <div className="page-header" style={{ marginBottom: 0, paddingBottom: 0 }}>
          <div className="flex items-center gap-4" style={{ cursor: 'pointer' }} onClick={() => navigate(getDashboardPath())}>
            <img
              src={logo}
              alt="Sri Eshwar College Logo"
              style={{
                height: '120px',
                width: 'auto'
              }}
            />
            <h1 className="page-title" style={{ 
              margin: 0,
              fontFamily: typography.fontFamily.primary,
              fontSize: '2.5rem',
              fontWeight: typography.fontWeight.bold,
              color: textColors.primary
            }}>
              <AnimatedText text={'Sri Eshwar Leave Management System'} />
            </h1>
          </div>


          {user && (
            <div className="header-actions">
              <span className="badge badge-info" aria-hidden>{user.role}</span>
              <button className="btn btn-outline" onClick={handleLogout} aria-label="Logout" style={{
                ...typography.styles.button,
                backgroundColor: '#EF4444', 
                color: 'white', 
                borderColor: '#EF4444', 
                marginLeft: '24px'
              }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
