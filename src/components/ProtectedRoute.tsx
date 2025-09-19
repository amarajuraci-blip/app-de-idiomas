import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const isAuth = loginStatus === 'true';
    setIsAuthenticated(isAuth);
    
    if (!isAuth) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <LoginPage />;
};

export default ProtectedRoute;