import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import HodDashboard from './pages/HodDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/faculty" 
              element={
                <ProtectedRoute allowedRoles={['FACULTY']}>
                  <FacultyDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/hod" 
              element={
                <ProtectedRoute allowedRoles={['HOD']}>
                  <HodDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/unauthorized" 
              element={
                <div className="flex flex-col justify-center items-center text-center" style={{height: '100vh', backgroundColor: 'var(--bg-primary)'}}>
                  <div className="card">
                    <div className="card-body text-center">
                      <h1 className="text-xl font-bold mb-4">Unauthorized Access</h1>
                      <p className="text-secondary mb-6">You don't have permission to access this page.</p>
                      <button 
                        onClick={() => window.location.href = '/login'}
                        className="btn btn-primary"
                      >
                        Go to Login
                      </button>
                    </div>
                  </div>
                </div>
              } 
            />
            
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
