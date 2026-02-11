import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Student endpoints
export const studentAPI = {
  applyLeave: (leaveData) => api.post('/student/apply', leaveData),
  getMyApplications: () => api.get('/student/applications'),
};

// Faculty endpoints
export const facultyAPI = {
  getPendingApplications: () => api.get('/faculty/applications'),
  getAllApplications: () => api.get('/faculty/all-applications'),
  getOverviewStats: () => api.get('/faculty/overview-stats'),
  reviewApplication: (applicationId, action, message = '') => api.put(`/faculty/${applicationId}/review`, { action, message }),
};

// HOD endpoints
export const hodAPI = {
  getAllApplications: () => api.get('/hod/applications'),
  getOverviewStats: () => api.get('/hod/overview-stats'),
  finalDecision: (applicationId, decisionData) => api.put(`/hod/${applicationId}/decision`, decisionData),
  deleteStudent: (studentId) => api.delete(`/student/${studentId}`),
};

export default api;