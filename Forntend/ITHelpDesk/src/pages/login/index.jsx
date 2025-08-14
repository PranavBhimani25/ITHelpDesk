import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginCredentials from './components/LoginCredentials';
import SecurityBadges from './components/SecurityBadges';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Login Container */}
      <div className="relative w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
          <LoginHeader />
          <LoginForm />
          <LoginCredentials />
          <SecurityBadges />
        </div>
        
        {/* Loading Overlay */}
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-2xl hidden" id="loading-overlay">
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
              <span className="text-sm font-medium text-foreground">Signing you in...</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-success/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default LoginPage;